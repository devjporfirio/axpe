import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Slider from 'react-slick';

// styles
import { CategoryBannerContainer, Container, CategoryItem, CategoryItemWrapper, CategoryLink, TitleList, TitleItem } from './styles';
import Image from 'next/image';

const SliderVertical = forwardRef(({
  children,
  onChange,
  type = 'vertical',
  settings = {
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    autoplay: true,
    dots: false,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 800,
    stopOnHover: false,
  },
}, ref) => {
  const localRef = useRef(null);
  useImperativeHandle(ref, () => localRef.current);

  return (
    <Container type={type}>
      <Slider
        {...settings}
        afterChange={onChange}
        ref={localRef}
      >
        {children}
      </Slider>
    </Container>
  );
});

function CategoryBannerVertical({ categoryItems }) {
  const [ currentSlide, setCurrentSlide ] = useState(0);
  const [ isVisible, setIsVisible ] = useState(false);
  const containerRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([ entry ]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const handleAfterChange = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  const handleTitleClick = (index) => {
    if (sliderRef.current) {
      setCurrentSlide(index);
      sliderRef.current.slickGoTo(index);
    }
  };
  const reorderedTitles = [
    ...categoryItems.slice(currentSlide),
    ...categoryItems.slice(0, currentSlide)
  ];

  return (
    <CategoryBannerContainer ref={containerRef}>
      <h2 className={'with-separator'}>
        Onde você procura um imóvel?
      </h2>
      {isVisible && (

      <SliderVertical
        ref={sliderRef}
        onChange={handleAfterChange}
        type="full"
      >
        {categoryItems.map((item, itemIndex) => (
          <CategoryItem key={`category-item-${itemIndex}`}>
            {item.link &&
              item.link.url &&
              (item.link.target === 'blank' ||
                item.link.target === 'self') && (
                <CategoryLink
                  href={`/busca?source=${item.link.url}`}
                  target={`_${item.link.target}`}
                >
                  <CategoryItemWrapper>
                    <div className="category-image mobile">
                      <Image
                        src={item.images.mobile}
                        alt={item.title}
                        layout="fill"
                        objectFit="cover"
                        priority={itemIndex === 0}
                        unoptimized
                      />
                    </div>
                    <div className="category-image desktop">
                      <Image
                        src={item.images.desktop}
                        alt={item.title}
                        layout="fill"
                        objectFit="cover"
                        priority={itemIndex === 0}
                        unoptimized
                      />
                    </div>
                  </CategoryItemWrapper>
                </CategoryLink>
              )}
          </CategoryItem>
        ))}
      </SliderVertical>
      )}

      <TitleList>
        {reorderedTitles.map((item, idx) => {
          const originalIndex = (currentSlide + idx) % categoryItems.length;
          return (
            <TitleItem
              key={`title-${item}-${idx}`}
              active={idx === 0}
              onClick={() => handleTitleClick(originalIndex)}
            >
              {item.title}
            </TitleItem>
          );
        })}
      </TitleList>
    </CategoryBannerContainer>
  )
}

export default CategoryBannerVertical