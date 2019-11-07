import { useState, useEffect, useRef } from 'react';

function useScrollPosition() {
  const oldTop = useRef(0);
  const [ curTop, setCurTop ] = useState(0);

  function handleScroll() {
    const tempCurTop = window.pageYOffset || document.documentElement.scrollTop;

    setCurTop(tempCurTop);

    oldTop.current = tempCurTop;
  }

  useEffect(() => {
    if (window.addEventListener) {
      window.addEventListener('scroll', handleScroll, true);
    } else {
      window.attachEvent('onscroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  return [ curTop, oldTop.current ];
}

export default useScrollPosition;
