import React, { useEffect, useState } from "react";
import {
  Wrapper,
  VideoThumb,
  VideoWrapper,
  Overlay,
  Content,
  PlayButton,
} from "./styles";
import Api from "services";

const InforcardVideo = () => {
  const baseUrl = "https://listafavoritos-admin.axpe.com.br/api";
  

  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [hoveredVideo, setHoveredVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await Api.Videos.getVideoHome();
        console.log("response: ", response)
        
        setVideos(response?.data || []);
      } catch (error) {
        console.error("Erro ao buscar vídeos:", error);
      }
    };

    fetchVideos();
  }, []);

  const getYoutubeId = (url = "") => {
    const regExp =
      /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;

    const match = url.match(regExp);

    return match && match[1].length === 11 ? match[1] : null;
  };

  return (
    <>
      {videos?.map((item) => {
        const videoId = getYoutubeId(item?.video_url);

        return (
          <Wrapper
            key={item?.id}
            onMouseEnter={() => setHoveredVideo(item?.id)}
            onMouseLeave={() => setHoveredVideo(null)}
          >
            <VideoThumb>
              {activeVideo !== item?.id ? (
                <>
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                    alt={item?.video_title}
                  />

                  <Overlay className="active" />

                  <Content
                    className={
                      hoveredVideo === item?.id ? "active" : ""
                    }
                  >
                    {item?.video_title && (
                      <h2>{item?.video_title}</h2>
                    )}

                    {item?.video_description && (
                      <p>{item?.video_description}</p>
                    )}

                    {item?.cta_url && (
                      <a href={item?.cta_url}>
                        {item?.cta_title || "Saiba mais"}
                      </a>
                    )}
                  </Content>

                  <PlayButton
                    onClick={() => setActiveVideo(item?.id)}
                  >
                    ▶
                  </PlayButton>
                </>
              ) : (
                <>
                  <VideoWrapper>
                    <iframe
                      width="100%"
                      height="517"
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&iv_load_policy=3&disablekb=1`}
                      title={item?.video_title}
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                  </VideoWrapper>

                  <Overlay
                    className={
                      hoveredVideo === item?.id ? "active" : ""
                    }
                  />

                  <Content
                    className={
                      hoveredVideo === item?.id ? "active" : ""
                    }
                  >
                    {item?.video_title && (
                      <h2>{item?.video_title}</h2>
                    )}

                    {item?.video_description && (
                      <p>{item?.video_description}</p>
                    )}

                    {item?.cta_url && (
                      <a href={item?.cta_url}>
                        {item?.cta_title || "Saiba mais"}
                      </a>
                    )}
                  </Content>
                </>
              )}
            </VideoThumb>
          </Wrapper>
        );
      })}
    </>
  );
};

export default InforcardVideo;