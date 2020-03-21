import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

// components
import PasswordNewModal from 'components/Modals/PasswordNew';

// actions
import { setMain } from 'store/modules/main/actions';

// styles
import {
  Container
} from 'pages/PasswordNew/styles'

function PasswordNew() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { query: { hash } } = router;

  useEffect(() => {
    dispatch(
      setMain({
        modalPasswordNew: true
      })
    );
  }, []);

  return (
    <Container>
      <PasswordNewModal hash={hash} />
    </Container>
  )
}

export default PasswordNew
