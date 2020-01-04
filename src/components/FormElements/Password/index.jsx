import React, { useState } from 'react';

// image
import IEye from 'assets/icons/eye';

// styles
import { Input, ButtonEye, SVGEye } from '../styles';

export default function Password({ useEye, type, ...props }) {
  const [ showPass, setShowPass ] = useState(false);
  return (
    <>
      {useEye && (
        <ButtonEye type="button" onClick={() => setShowPass(!showPass)}>
          <SVGEye active={showPass} src={IEye} />
        </ButtonEye>
      )}
      <Input type={showPass ? 'text' : 'password'} {...props} />
    </>
  );
}
