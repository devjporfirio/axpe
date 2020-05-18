import { useState, useEffect } from 'react';

function useCheckLoadMoreOnScroll() {
  const [ isActive, setIsActive ] = useState(false);

  function handleScroll() {
    const tempIsActive = ((window.innerHeight * 2) + window.scrollY) >= document.body.offsetHeight;

    setIsActive(tempIsActive);
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

  return isActive;
}

export default useCheckLoadMoreOnScroll;
