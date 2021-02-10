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
} from './styles';

function RemoveFavoriteModal({ active, buildingRef, action, onClose, user }) {
  const [ isRemoving, setIsRemoving ] = useState(false);

  const handleRemoval = useCallback(
    async () => {
      
      setIsRemoving(true);
      await Api.MyAccount.postFavorite(user.access_token, buildingRef, false);
      setIsRemoving(false);
      onClose(true);

  }, [ user.logged ]);

  return (
    <Container active={active} onClose={onClose}>
      <InnerModal>
        <h2>Excluir favorito</h2>

        <ConfirmationText>
          Tem certeza que deseja remover esse favorito?
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

export default RemoveFavoriteModal;