import React from 'react';
import Api from 'services';

import DreamPages from 'pages/Dream/data.json';
import SITE_URL from 'helpers/siteUrl';

const MAX_SITEMAP_URLS = 50000;

const escapeXml = (value) =>
  String(value).replace(/[<>&'"]/g, (char) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  }[char]));

const renderXml = ({ buildings, landings, favoriteLists }) => {
  const siteUrl = SITE_URL;
  const pages = [
    `<url><loc>${siteUrl}/sobre</loc><priority>0.80</priority></url>`,
    `<url><loc>${siteUrl}/contato</loc><priority>0.80</priority></url>`,
    `<url><loc>${siteUrl}/so-quero-sonhar</loc><priority>0.60</priority></url>`,
    `<url><loc>${siteUrl}/politica-de-privacidade</loc><priority>0.60</priority></url>`,
    `<url><loc>${siteUrl}/termos-de-uso</loc><priority>0.60</priority></url>`,
  ];

  if(landings && landings.length) {
    landings.forEach(item => {
      pages.push(`<url><loc>${siteUrl}/landing/${escapeXml(item.slug)}</loc><priority>0.60</priority></url>`);
    })
  }

  if(DreamPages['data'] && DreamPages['data'].length) {
    DreamPages['data'].forEach(item => {
      pages.push(`<url><loc>${siteUrl}/so-quero-sonhar/${escapeXml(item.slug)}</loc><priority>0.60</priority></url>`);
    })
  }

  if(buildings['all'] && buildings['all'].length) {
    buildings['all'].forEach(item => {
      pages.push(`<url><loc>${siteUrl}/${escapeXml(item.slug)}</loc><priority>0.80</priority></url>`);
    })
  }

  if(favoriteLists && favoriteLists.length) {
    favoriteLists.forEach(item => {
      pages.push(`<url><loc>${siteUrl}/minha-lista-de-favoritos/${escapeXml(item.id)}/${escapeXml(item.slug)}</loc><priority>0.50</priority></url>`);
    })
  }

  const truncated = pages.length > MAX_SITEMAP_URLS - 1;
  const finalPages = truncated ? pages.slice(0, MAX_SITEMAP_URLS - 1) : pages;

  if (truncated) {
    console.error(
      `sitemap.xml: ${pages.length} URLs geradas, acima do limite de ${MAX_SITEMAP_URLS}. ` +
      'Truncando — migrar para sitemap-index com múltiplos arquivos.'
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="//www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${siteUrl}</loc>
      <priority>1.00</priority>
    </url>
    ${finalPages.join('')}
  </urlset>`;
};

export default class SiteMapFile extends React.Component {
  static async getInitialProps({ res }) {
    const [response, favoriteLists] = await Promise.all([
      Api.SiteMap.getPage(),
      Api.SiteMap.getFavoriteLists(),
    ]);

    res.setHeader('Content-Type', 'text/xml');
    res.write(renderXml({ ...response, favoriteLists }));
    res.end();
  }
}
