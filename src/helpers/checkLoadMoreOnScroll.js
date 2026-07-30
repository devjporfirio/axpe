import { useState, useEffect, useRef } from 'react';

function useCheckLoadMoreOnScroll() {
  const [ isActive, setIsActive ] = useState(false);
  const ticking = useRef(false);

  function handleScroll() {
    if (ticking.current) return;
    ticking.current = true;

    requestAnimationFrame(() => {
      const elementFooter = document.querySelector('.load-more-button');
      if (elementFooter) {
        const elementFooterTop = elementFooter.offsetTop;
        const tempIsActive =
          ((window.innerHeight * 2) + window.scrollY) >= elementFooterTop;

        setIsActive(tempIsActive);
      }
      ticking.current = false;
    });
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isActive;
}

export default useCheckLoadMoreOnScroll;
