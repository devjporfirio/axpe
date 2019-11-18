import React from 'react';
import Api from 'services';

// styles
import { Container } from 'pages/Landing/styles';

function Landing({ slug, page }) {
  return slug ? (
    <Container>
      Slug: {slug} page: {page.title}
    </Container>
  ) : null;
}

Landing.getInitialProps = async ({ query }) => {
  const slug = query.slug;
  const response = await Api.Landing.getPage(slug);

  return {
    slug,
    page: response
  };
};

export default Landing;
