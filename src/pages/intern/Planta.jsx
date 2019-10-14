import React, { useState } from 'react';
import BlockHighlighted from 'components/BlockHighlighted';
import ModalPlant from 'components/ModalPlant';

export default function Planta({ property }) {
  const [ showModalPlant, setShowModalPlant ] = useState(false);

  return (
    <>
      {property.components &&
        property.components.plantas &&
        property.components.plantas.length > 0 && (
          <BlockHighlighted
            texts={[
              {
                text: 'Veja a ',
                color: 'white',
                fontFamily: 'BitterBold'
              },
              {
                text: 'planta ',
                color: 'greenLight',
                fontFamily: 'RalewayMedium'
              },
              {
                text: 'desse imóvel',
                color: 'white',
                fontFamily: 'BitterBold'
              }
            ]}
            colorButton="greenLight"
            message="E descubra se ela é a ideal
        para você"
            labelButton="Veja as plantas"
            onClickButton={() => setShowModalPlant(true)}
          />
        )}

      {showModalPlant && (
        <ModalPlant
          property={property}
          onClose={() => setShowModalPlant(false)}
        />
      )}
    </>
  );
}
