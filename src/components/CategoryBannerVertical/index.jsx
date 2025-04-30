import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import Slider from 'react-slick';

// styles
import { CategoryBannerContainer, Container, CategoryImage, CategoryItem, CategoryItemWrapper, CategoryLink, TitleList, TitleItem } from './styles';

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
  const sliderRef = useRef(null);

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
    <CategoryBannerContainer>
      <h2 className={'with-separator'}>
        Onde você procura um imóvel?
      </h2>
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
                  href={item.link.url}
                  target={`_${item.link.target}`}
                >
                  <CategoryItemWrapper>
                    <CategoryImage mq="mobile" src={item.images.mobile} alt={item.title} />
                    <CategoryImage mq="desktop" src={item.images.desktop} alt={item.title} />
                  </CategoryItemWrapper>
                </CategoryLink>
              )}
          </CategoryItem>
        ))}
      </SliderVertical>

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