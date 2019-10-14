import React from 'react';
import BlockHighlighted from 'components/BlockHighlighted';
// import ModalPlant from 'components/ModalPlant';

export default function Planta({ file }) {
  // const [ showModalPlant, setShowModalPlant ] = useState(false);

  return (
    <>
      {file && (
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
          onClickButton={() => window.open(file)}
        />
      )}

      {/* {showModalPlant && (
        <ModalPlant
          property={property}
          onClose={() => setShowModalPlant(false)}
        />
      )} */}
    </>
  );
}
