import React from 'react';
import HowWeLove from 'components/HowWeLove';
import BlockHighlighted from 'components/BlockHighlighted';
import DestaquesSection from 'components/DestaquesSection';
import SlickText from 'components/SlickText';
import Section from 'components/Section';
import Around from 'components/Around';

import { Module } from './styles';

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
      case 'porque-adoramos':
        return <HowWeLove reasons={component.data ? component.data : component} />;
      case 'destaque-1':
      case 'destaque-2':
      case 'destaque-3':
        return <DestaquesSection type={type} item={component.data} />;
      case 'galeria-imagens-texto':
        return <SlickText type={type} items={component.data} />;
      case 'imagem-destaque':
        return (
          <DestaquesSection
            showHorizontalRule={false}
            type={type}
            item={component.data}
          />
        );
      case 'destaque-texto':
      case 'destaque-texto-bullets':
        return <Section type={type} item={component.data} />;
      case 'plantas':
        return <BlockHighlighted type="planta" href={component.data.file} />;
      case 'vizinhanca':
        return <Around cep={component.data.cep} text={component.data.texto || component.data.text} />;
      default:
          return null;
    }
  };

  return (
    <>
      {Array.isArray(modules) && modules.map((component, index) => (
        <Module key={index}>
          {renderModules(component.module.slug, component)}
        </Module>
      ))}

      {!Array.isArray(modules) && Object.keys(modules).map((componentKey, index) => (
        <Module key={`building-module-${index}-${componentKey}`}>
          {renderModules(componentKey, modules[componentKey])}
        </Module>
      ))}
    </>
  );
}
