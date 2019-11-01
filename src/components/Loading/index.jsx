import React from 'react'
import { connect, useSelector } from 'react-redux';
import SVG from 'react-inlinesvg';
import { Container } from './styles';

// assets
import AxpeFullLogoSVG from 'assets/axpe-full-logo.svg';

function Loading(props) {
  const { active } = useSelector(state => state.loading);

  return (
    <Container active={active}>
      <SVG src={AxpeFullLogoSVG} />
    </Container>
  )
}

export default connect()(Loading);