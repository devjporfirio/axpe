import React from 'react';
import BlockHighlighted from 'components/BlockHighlighted';
// import ModalPlant from 'components/ModalPlant';

export default function Planta({ file }) {
  // const [ showModalPlant, setShowModalPlant ] = useState(false);

  return (
    <>
      {file && <BlockHighlighted type="planta" />}

      {/* {showModalPlant && (
        <ModalPlant
          property={property}
          onClose={() => setShowModalPlant(false)}
        />
      )} */}
    </>
  );
}
