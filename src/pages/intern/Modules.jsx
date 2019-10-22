import React, { Fragment } from 'react';
import HowWeLove from 'components/HowWeLove';
import Planta from './Planta';
import DestaquesSection from 'components/DestaquesSection';
import SlickText from 'components/SlickText';
import Section from 'components/Section';
import Around from '../../components/Around';

export default function Modules({ modules }) {
  const renderModules = (type, component) => {
    // porque-adoramos
    // destaque-1
    // destaque-2
    // destaque-3
    // galeria-imagens-texto
    // imagem-destaque
    // destaque-texto
    // destaque-texto-bullets
    // plantas

    switch (type) {
      case 'porque-adoramos':
        return <HowWeLove reasons={component.data} />;
      case 'destaque-1':
      case 'destaque-2':
      case 'destaque-3':
        return <DestaquesSection type={type} item={component.data} />;
      case 'galeria-imagens-texto':
        return <SlickText type={type} items={component.data} />;
      case 'imagem-destaque':
        return (
          <DestaquesSection
            showHorizontalRule={false}
            type={type}
            item={component.data}
          />
        );
      case 'destaque-texto':
      case 'destaque-texto-bullets':
        return <Section type={type} item={component.data} />;
      case 'plantas':
        return <Planta file={component.data.file} />;
      case 'vizinhanca':
        return (
          <Around cep={component.data.cep} text={component.data.text} />
        );
    }
  };

  return (
    <>
      {modules.map((component, index) => (
        <Fragment key={index}>
          {renderModules(component.module.slug, component)}
          <br />
        </Fragment>
      ))}
    </>
  );
}
