import React from 'react';

// components
import BlockHighlighted from 'components/BlockHighlighted';
import Contact from 'components/Contact';

// styles
import { Container, List } from 'pages/RegisterProperty/styles';

function RegisterProperty() {
  return (
    <Container>
      <BlockHighlighted type="registerPropertyWhite" />

      <List>
        <div>
          <p>Residencial em São Paulo</p>
        </div>
        <div>
          <p>Comercial em São Paulo</p>
        </div>
        <div>
          <p>Praia</p>
        </div>
        <div>
          <p>Campo</p>
        </div>
        <div>
          <p>Internacional</p>
        </div>
      </List>

      <BlockHighlighted type="registerPropertyTransform" />
      <Contact />
    </Container>
  );
}

export default RegisterProperty;
