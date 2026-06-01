// VideoCard.jsx

import React, { useEffect, useState } from 'react';
import Api from 'services';

import {
  Wrapper,
  VideoThumb,
  Overlay,
  VideoInfo,
  PlayButton,
} from './styles';

import ModalVideo from 'components/ModalVideo';

const VideoCard = ({ reference }) => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  const [openVideo, setOpenVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const getYoutubeVideoId = (url) => {
    if (!url) return null;

    const regex =
      /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)([^?&/]+)/;

    const match = url.match(regex);

    return match ? match[1] : null;
  };

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);

        const response = await Api.Videos.getVideoById(reference);

        setVideo(response?.data || null);
      } catch (error) {
        console.error('Erro ao buscar vídeo:', error);
      } finally {
        setLoading(false);
      }
    };

    if (reference) {
      fetchVideo();
    }
  }, [reference]);

  if (loading) {
    return null;
  }

  if (!video) {
    return null;
  }

  const youtubeId = getYoutubeVideoId(video?.video_url);

  const handleOpenVideo = () => {
    setVideoUrl(youtubeId);
    setOpenVideo(true);
  };

  return (
    <>
      <Wrapper>
        <VideoThumb onClick={handleOpenVideo}>
          <Overlay />

          {youtubeId && (
            <iframe
              width="100%"
              height="517"
              src={`https://www.youtube.com/embed/${youtubeId}?controls=0&modestbranding=1&rel=0&fs=0&iv_load_policy=3&disablekb=1`}
              title={video?.video_title}
              frameBorder="0"
              allow="encrypted-media"
              allowFullScreen
              pointerEvents="none"
            />
          )}
          <PlayButton>
            ▶
          </PlayButton>
        </VideoThumb>

        <VideoInfo>
          { video?.video_title && video?.video_description && (
            <>
              <h3>{video?.video_title}</h3>

              <p>{video?.video_description}</p>
            </>
          )}
        </VideoInfo>
      </Wrapper>

      <ModalVideo
        open={openVideo}
        onClose={() => setOpenVideo(false)}
        videoId={videoUrl}
      />
    </>
  );
};

export default VideoCard;