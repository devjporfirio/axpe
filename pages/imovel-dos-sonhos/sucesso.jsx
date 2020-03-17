import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// actions
import { setMain } from 'store/modules/main/actions';

// styles
import {
  Container
} from 'pages/Register/Success/styles'

function DreamBuildingSuccess() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setMain({
        modalContactSuccess: true
      })
    );

  }, []);

  return (
    <Container></Container>
  )
}

export default DreamBuildingSuccess;
