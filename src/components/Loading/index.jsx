import React from 'react'
import { connect, useSelector } from 'react-redux';
import SVG from 'react-inlinesvg';
import { Container } from './styles';

// assets
import AxpeFullLogoSVG from 'assets/axpe-full-logo.svg';

function Loading(props) {
  const { active, type } = useSelector(state => state.loading);

  return (
    <Container active={active} type={type}>
      <SVG src={AxpeFullLogoSVG} />
    </Container>
  )
}

export default connect()(Loading);