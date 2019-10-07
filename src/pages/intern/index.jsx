import React, { useState, useEffect } from 'react';
import Breadcrumb from 'components/Breadcrumb';
import Gallery from 'components/Gallery';
import Api from 'services';

import { Container } from './styles';

export default function Intern({ match }) {
  const { reference } = match.params;
  const [ property, setProperty ] = useState({});

  useEffect(() => {
    async function loadIntern() {
      const property = await Api.intern.loadIntern(reference);
      setProperty(property.building);
    }
    loadIntern();
  }, []);

  return (
    <Container>
      {Object.keys(property).length > 0 && (
        <Breadcrumb
          category={property.category}
          local={property.address.local}
          reference={property.reference}
          favorito={false}
        />
      )}
      <br />
      {property && property.gallery && (
        <Gallery items={property.gallery} tour360={property.tour360} />
      )}
    </Container>
  );
}
