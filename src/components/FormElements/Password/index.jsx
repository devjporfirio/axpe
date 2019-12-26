import React, { useState } from 'react';

// image
import IEye from 'assets/icons/eye';

// styles
import { Input, SVGEye } from '../styles';

export default function Password({ useEye, type, ...props }) {
  const [ showPass, setshowPass ] = useState(false);
  return (
    <>
      {useEye && <SVGEye src={IEye} onClick={() => setshowPass(!showPass)} />}
      <Input type={showPass ? 'text' : 'password'} {...props} />
    </>
  );
}
