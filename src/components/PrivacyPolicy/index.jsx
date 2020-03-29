import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';

// helpers
import { Link } from 'helpers/routes';

// styles
import {
  Container,
  Header,
  Wrapper,
  ButtonClose,
  ButtonCloseLink,
  Body,
  Text
} from './styles';

function PrivacyPolicy({ onDemand, active, onClose }) {
  const router = useRouter();
  const [ oldUrl, setOldUrl ] = useState(null);

  function handleClose() {
    if(typeof onClose === 'function') {
      onClose();
    }
  }

  useEffect(() => {
    if(active) {
      router.push(Router.pathname, '/politica-de-privacidade', {
        shallow: true
      });
      setOldUrl(Router.pathname);
    } else if(oldUrl) {
      router.push(oldUrl, oldUrl, {
        shallow: true
      });
    }
  }, [ active ]);

  return ((onDemand && active) || !onDemand) ? (
    <Container>
      <Wrapper>
        <Header>
          <h2><strong>Política de</strong> privacidade</h2>
          {onDemand ? (
            <ButtonClose type="button" onClick={handleClose}>Fechar</ButtonClose>
          ) : (
            <Link route="/" passHref>
              <ButtonCloseLink>Fechar</ButtonCloseLink>
            </Link>
          )}
        </Header>
        <Body>
          <Text>
            <p>Fusce non sapien a metus porta fringilla. Ut quis justo tempus, tempor libero ut, lacinia velit. Nunc efficitur massa justo, id fermentum eros vestibulum vulputate. Etiam vel mauris eget felis egestas suscipit. Donec maximus velit vel ipsum euismod, sit amet molestie augue aliquam. In consectetur sollicitudin lorem, eu condimentum lacus hendrerit ut. Aliquam finibus risus felis, id varius leo lacinia vel. Nam a purus odio. Quisque dapibus fringilla lectus vitae egestas. Donec imperdiet egestas convallis.</p>
            <p>Donec aliquam mauris eget nisi semper, ut facilisis metus efficitur. Aenean leo purus, posuere id urna ut, feugiat tincidunt leo. Phasellus finibus tincidunt est quis viverra. Cras sed turpis tortor. Mauris at varius mi. Suspendisse potenti. Vivamus venenatis massa quis est vulputate, in venenatis erat laoreet. Nunc vestibulum velit ac elit aliquam, eu posuere lectus molestie. Pellentesque ut ligula sit amet dolor auctor tristique. Donec iaculis aliquet ex, vitae scelerisque orci. Donec vehicula sem a imperdiet porttitor.</p>
            <p>Donec non lectus eros. Integer vel nunc nunc. Etiam at justo tincidunt, congue nisl vel, ornare tellus. Phasellus id vulputate sapien. In sed tristique augue, vitae posuere tortor. Pellentesque sit amet sodales est. Morbi vestibulum vitae mauris id vehicula. Proin fermentum faucibus pulvinar. Etiam sed ipsum consectetur, sollicitudin urna eu, cursus lacus. Sed at turpis mauris. Sed et ante imperdiet, vulputate arcu a, tincidunt nunc. Sed sit amet diam ut nisi vehicula mollis sed sed diam. Proin pulvinar, est in placerat volutpat, metus velit ornare purus, nec molestie eros neque at ante. Vestibulum ut tincidunt nisi.</p>
            <p>Etiam at arcu porttitor, convallis lectus at, malesuada lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque lobortis id leo vel laoreet. Sed consectetur iaculis elementum. Etiam sagittis arcu ut massa scelerisque, quis rutrum libero congue. Aliquam euismod neque vitae sem molestie vehicula. Duis lacinia ex massa, nec aliquet felis elementum ut. Nullam a blandit orci. Vestibulum varius id dolor eu vestibulum. Aliquam urna lorem, dictum eget fringilla suscipit, efficitur vel mauris. Praesent sed elit lacus.</p>
            <p>Donec erat metus, tincidunt nec massa sed, sodales mollis nulla. Donec eleifend dignissim purus, pretium posuere mauris convallis vel. Quisque mattis ut augue eget lacinia. Sed viverra, orci et suscipit aliquam, sem neque tempus libero, vitae luctus elit mauris a tortor. Maecenas ante lacus, accumsan vel congue in, molestie vitae nunc. In imperdiet nibh id leo venenatis rhoncus. Mauris pulvinar volutpat risus. Fusce dignissim nunc vel leo lacinia pharetra.</p>
            <p>Nullam id scelerisque magna. Proin ornare, metus non egestas varius, metus diam bibendum leo, quis dapibus metus justo id elit. Nunc congue, tellus consequat consectetur suscipit, orci nibh sodales enim, ut tempor sapien est quis urna. Curabitur tristique a leo a tincidunt. Sed a scelerisque lacus. Suspendisse varius turpis fermentum sagittis elementum. Quisque sit amet venenatis tortor, et blandit ligula.</p>
            <p>Morbi vestibulum elit vitae enim sodales, placerat efficitur purus elementum. Maecenas tristique metus ut risus pretium, sed ullamcorper justo fringilla. Ut consequat suscipit felis eget sollicitudin. Mauris vulputate purus a suscipit commodo. Pellentesque egestas, dolor id interdum pulvinar, dui augue condimentum nulla, in mattis orci tellus quis massa. Fusce suscipit nibh ex, eu consequat ante efficitur sit amet. In at ex sagittis, facilisis dolor tincidunt, rhoncus purus. Phasellus in urna lorem. Sed arcu tortor, tempor at ultricies eu, lacinia ac lectus. Ut sed leo sed sem lacinia gravida et eu orci. Suspendisse orci lorem, tempus eu risus tincidunt, gravida condimentum magna. Sed ultrices est id tortor mollis malesuada. Aliquam venenatis justo at nisi pretium, sed elementum dui convallis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus laoreet luctus vulputate.</p>
          </Text>
        </Body>
      </Wrapper>
    </Container>
  ) : null;
}

export default PrivacyPolicy;