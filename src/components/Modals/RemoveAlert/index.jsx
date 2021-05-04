import React, { useState, useCallback } from 'react';
import Api from 'services';

// styles
import {
  Container,
  InnerModal,
  ConfirmationText,
  ButtonContainer,
  ButtonSave,
  ButtonCancel
} from '../RemoveFavorite/styles';

function RemoveAlertModal({ active, alertRef, onClose, user }) {
  const [ isRemoving, setIsRemoving ] = useState(false);

  const handleRemoval = useCallback(
    async () => {
      
      setIsRemoving(true);
      const responseRemove = await Api.MyAccount.deleteAlert(
        user.access_token,
        alertRef
      );
      setIsRemoving(false);
      
      onClose(responseRemove.status);

  }, [ user.logged, alertRef ]);

  return (
    <Container active={active} onClose={onClose}>
      <InnerModal>
        <h2>Excluir alerta</h2>

        <ConfirmationText>
					Tem certeza que deseja excluir o alerta?
        </ConfirmationText>

        <ButtonContainer>
          <ButtonSave
            disabled={isRemoving}
            onClick={handleRemoval}
            type="submit"
            className="holos-form-submit"
            data-type="Remover Favorito"
          >
            Sim
          </ButtonSave>
          <ButtonCancel
              onClick={onClose}
          >
            Não
          </ButtonCancel>
        </ButtonContainer>
      </InnerModal>
    </Container>
  );
}

export default RemoveAlertModal;