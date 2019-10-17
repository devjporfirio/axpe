import React, { Fragment } from 'react';
import HowWeLove from './HowWeLove';
import Planta from './Planta';
import Destaques from './Destaques';
import SlickText from 'components/SlickText';

export default function Modules({ modules }) {
  const renderModules = (type, component) => {
    // porque-adoramos
    // destaque-1
    // destaque-2
    // destaque-3
    // galeria-imagens-texto
    // imagem-destaque
    // destaque-texto
    // destaque-texto-bullets
    // plantas

    switch (type) {
      case 'plantas':
        return <Planta file={component.data.file} />;
      case 'porque-adoramos':
        return <HowWeLove reasons={component.data} />;
      case 'destaque-1':
      case 'destaque-2':
      case 'destaque-3':
        return <Destaques type={type} item={component.data} />;
      case 'galeria-imagens-texto':
        return <SlickText type={type} items={component.data} />;
    }
  };

  return (
    <>
      {modules.map((component, index) => (
        <Fragment key={index}>
          {renderModules(component.module.slug, component)}
          <br />
        </Fragment>
      ))}
    </>
  );
}
