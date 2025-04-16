import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import Slider from 'react-slick';

// styles
import { CategoryBannerContainer, Container, CategoryImage, CategoryItem, CategoryItemWrapper, CategoryLink, TitleList, TitleItem } from './styles';


const mockedCategoryItems = [
  {
    title: 'São Paulo',
    images: {
      desktop:
        'https://admin.axpe.com.br/uploads/images/home/main/desktop/5 - ARQUITETO - DESKTOPAX147340-IIU7wcyv3X.png',
      mobile:
        'https://admin.axpe.com.br/uploads/images/home/main/mobile/5 - ARQUITETO - MOBILEAX147340-ku7djPgp4Z.png',
    },
    link: {
      target: 'self',
      external: false,
      url: 'https://www.axpe.com.br/landing/imoveis-assinados-por-arquitetos',
    },
    label: null,
  },
  {
    title: 'Praia',
    images: {
      desktop:
        'https://admin.axpe.com.br/uploads/images/home/main/desktop/4 - ITAIM BIBI - DESKTOP-ttAlGL2Z8E.png',
      mobile:
        'https://admin.axpe.com.br/uploads/images/home/main/mobile/4 - ITAIM BIBI - MOBILE-kalIlbVkFQ.png',
    },
    link: {
      target: 'blank',
      external: true,
      url: 'https://www.axpe.com.br/landing/imoveis-itaim-bibi',
    },
    label: null,
  },
  {
    title: 'Campo',
    images: {
      desktop:
        'https://admin.axpe.com.br/uploads/images/home/main/desktop/AXPE - DUPPLEX - CAPA SITE 2-6XmmzeAKcF.png',
      mobile:
        'https://admin.axpe.com.br/uploads/images/home/main/mobile/Capa site - Mobile-sqSZ9OXuhg.jpg',
    },
    link: {
      target: 'blank',
      external: true,
      url: 'https://www.axpe.com.br/landing/coberturas-especiais',
    },
    label: null,
  },
  {
    title: 'Montanha',
    images: {
      desktop:
        'https://admin.axpe.com.br/uploads/images/home/main/desktop/2 - PRAIA - DESKTOP-IuXXxPmKhx.png',
      mobile:
        'https://admin.axpe.com.br/uploads/images/home/main/mobile/2 - PRAIA - MOBILE-eYhNXvRRnR.png',
    },
    link: {
      target: 'blank',
      external: true,
      url:
        'https://www.axpe.com.br/landing/comprar-casas-na-praia?utm_source=Site&utm_medium=capa&utm_campaign=junho_capa_Praia_Axpe',
    },
    label: null,
  },
  {
    title: 'Exterior',
    images: {
      desktop:
        'https://admin.axpe.com.br/uploads/images/home/main/desktop/5 - JARDINS - DESKTOP-voD4DPeKc9.png',
      mobile:
        'https://admin.axpe.com.br/uploads/images/home/main/mobile/5 - JARDINS - MOBILE-6ZlBt9Mh7h.png',
    },
    link: {
      target: 'blank',
      external: true,
      url: 'https://www.axpe.com.br/landing/imoveis-jardins',
    },
    label: null,
  },
];

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

  const mergedItems = categoryItems.map((item) => {
    const mocked = mockedCategoryItems.find(
      (mock) => mock.title.toLowerCase() === item.title.toLowerCase()
    );
  
    return {
      ...item,
      images: mocked?.images || item.images,
    };
  });

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
    ...mergedItems.slice(currentSlide),
    ...mergedItems.slice(0, currentSlide)
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
        {mergedItems.map((item, itemIndex) => (
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
          const originalIndex = (currentSlide + idx) % mockedCategoryItems.length;
          return (
            <TitleItem
              key={`title-${originalIndex}`}
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