import React from 'react';
import Link from 'next/link';

// styles
import {
  Container,
  Wrapper,
  Header,
  List
} from './styles';

function Guidelines() {
  return (
    <Container>
      <Wrapper>

        <Header>
          <h1>Axpe</h1>
        </Header>

        <Header>
          <h2>Guidelines</h2>
        </Header>

        <List>
          <li>
            <Link href="/guildelines/buildings" passHref>Buildings: List, Card (Horizontal and Vertical)</Link>
          </li>
        </List>

      </Wrapper>
    </Container>
  )
}

export default Guidelines;
