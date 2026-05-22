import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// components
import Slider from 'components/Slider';
import GalleryNav from './GalleryNav';
import GalleryFull from './GalleryFull';
import DotsPagination from 'components/DotsPagination';
import GalleryItem from './GalleryItem';
import OptimizedBuildingImage from 'components/OptimizedImage';
import ModalVideo from 'components/ModalVideo';

// services
import Api from 'services';

// assets
import I360 from 'assets/icons/simplification.svg';
import PlayIcon from 'assets/icons/play-button.svg';
import PlayVideo from 'assets/icons/play-video.svg';

// styles
import {
  Container,
  Tour360,
  PlayButton,
  SliderButton,
  Button360,
  ActionsWrapper,
  VideoButton
} from './styles';

function Gallery({
  items,
  center = true,
  tour360,
  showSizeGallery = true,
  className,
  propsArrow = { position: 'center', backgroundColor: 'white' },
  showClickImage = true,
  category,
  local,
  reference,
  videoId
}) {
  const [showGalleryNav, setShowGalleryNav] = useState(false);
  const [showGalleryFull, setShowGalleryFull] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);
  const [showTour, setShowTour] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openVideo, setOpenVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState(false);

  const sliderRef = useRef(null);

const getYoutubeVideoId = (url) => {
  if (!url) return null;

  const regex =
    /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)([^?&/]+)/;

  const match = url.match(regex);

  return match ? match[1] : null;
};

useEffect(() => {
  let isMounted = true;

  const fetchVideo = async () => {
    try {
      console.log('videoId', reference);

      const videoData = await Api.Videos.getVideoById(reference);
      console.log("videoData:",videoData)
      
      setVideoUrl(videoData?.data || null);

      const NewvideoId = getYoutubeVideoId(videoData?.data?.video_url);
      if (NewvideoId) {
        setVideoUrl(NewvideoId);
      }
    } catch (error) {
      console.error('Erro ao buscar vídeo:', error);
    }
  };

  fetchVideo();

  return () => {
    isMounted = false;
  };
}, [videoId]);
  const linkTour = tour360
    ? tour360
    : `https://www.banibconecta.com/site/tour/axpe-imoveis-especiais/${reference}/autostart`;

  return (
    <Container className={className}>
      {/* ACTIONS */}
      {(tour360 || videoUrl) && (
        <ActionsWrapper>

          {/* VIDEO */}
          {videoUrl && (
            <VideoButton
              type="button"
              onClick={() => setOpenVideo(true)}
            >
              <img
                src={PlayVideo}
                alt="Ver vídeo"
              />
            </VideoButton>
          )}

          {videoUrl && tour360 && (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="1" height="17" viewBox="0 0 1 17" fill="none">
                <path d="M0.5 0.5V16.5" stroke="#C3CCCD" stroke-linecap="round" />
              </svg>
            </>
          )
          }

          {/* TOUR 360 */}
          {tour360 && (
            <Button360
              type="button"
              onClick={() => setShowTour(true)}
            >
              <img
                src={I360}
                alt="Tour 360"
              />
            </Button360>
          )}


        </ActionsWrapper>
      )}

      {/* MODAL VIDEO */}
      {videoUrl && (
        <ModalVideo
          open={openVideo}
          onClose={() => setOpenVideo(false)}
          videoId={videoUrl}
        />
      )}

      {/* TOUR 360 */}
      {showTour && (
        <Tour360
          close={() => setShowTour(false)}
          category={category}
          local={local}
        >
          <iframe
            title="tour360"
            src={linkTour}
          />
        </Tour360>
      )}

      {/* SLIDER */}
      <Slider
        reference={sliderRef}
        lazyLoad={false}
        propsArrow={propsArrow}
        slidesToShow={1}
        centerMode={true}
        className={center ? 'center' : ''}
        variableWidth={true}
        afterChange={index => setCurrentSlide(index)}
        responsive={[
          {
            breakpoint: 769,
            settings: {
              centerMode: false,
              variableWidth: false
            }
          }
        ]}
      >
        {items &&
          items.length > 0 &&
          items.map((item, index) => (
            <SliderButton
              type="button"
              key={`building-gallery-btn-${index}`}
              onClick={() => {
                if (showClickImage) {
                  setImageSelected(index);
                  setShowGalleryFull(true);
                }
              }}
            >
              {item.tipo === 'video' && (
                <PlayButton
                  className="play-button"
                  src={PlayIcon}
                  alt="Assistir vídeo"
                />
              )}

              <GalleryItem item={item} />
            </SliderButton>
          ))}
      </Slider>

      {/* DOTS */}
      <DotsPagination
        currentSlide={currentSlide}
        slideCount={items ? items.length : 0}
        onDotClick={index => sliderRef.current.slickGoTo(index)}
      />

      {/* GALLERY NAV */}
      {showGalleryNav && (
        <GalleryNav
          items={items}
          onClose={() => setShowGalleryNav(false)}
          category={category}
          local={local}
        />
      )}

      {/* GALLERY FULL */}
      {showGalleryFull && (
        <GalleryFull
          initialSlide={imageSelected}
          items={items}
          onClose={() => setShowGalleryFull(false)}
          category={category}
          local={local}
        />
      )}
    </Container>
  );
}

Gallery.propTypes = {
  items: PropTypes.array.isRequired,
  center: PropTypes.bool,
  tour360: PropTypes.string,
  showSizeGallery: PropTypes.bool,
  className: PropTypes.string,
  propsArrow: PropTypes.object,
  showClickImage: PropTypes.bool,
  category: PropTypes.string,
  local: PropTypes.string,
  reference: PropTypes.string,
  videoId: PropTypes.string
};

export default Gallery;