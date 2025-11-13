import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { useEffect, useRef, useState } from "react";

import { hightlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  // video and indicator
  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  useGSAP(() => {
    // slider animation to move the video out of the screen and bring the next video in
    gsap.to(".carousel-slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut", // show visualizer https://gsap.com/docs/v3/Eases
    });

    // video animation to play the video when it is in the view
    gsap.to(".carousel-video", {
      scrollTrigger: {
        trigger: ".carousel-video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (!startPlay) return;

    const spanEl = videoSpanRef.current[videoId];
    const dotEl = videoDivRef.current[videoId];
    const videoEl = videoRef.current[videoId];

    if (!spanEl || !dotEl || !videoEl) return;

    const indicatorWidth =
      window.innerWidth < 760
        ? "10vw"
        : window.innerWidth < 1200
        ? "10vw"
        : "4vw";

    const duration =
      hightlightsSlides[videoId]?.videoDuration || videoEl.duration || 1;

    let hasCompletedAnimation = false;

    const updateIndicator = () => {
      const progress = (videoEl.currentTime / duration) * 100;
      const safeProgress = Math.max(0, Math.min(progress, 100));

      if (safeProgress >= 100) {
        if (!hasCompletedAnimation) {
          hasCompletedAnimation = true;
          gsap.to(dotEl, { width: "12px" });
          gsap.to(spanEl, { backgroundColor: "#afafaf" });
        }
        return;
      }

      hasCompletedAnimation = false;

      gsap.set(dotEl, { width: indicatorWidth });
      gsap.set(spanEl, { width: `${safeProgress}%`, backgroundColor: "white" });
    };

    // set initial state so the indicator reflects the current time immediately
    updateIndicator();

    if (isPlaying) {
      gsap.ticker.add(updateIndicator);
    }

    return () => {
      gsap.ticker.remove(updateIndicator);
    };
  }, [videoId, startPlay, isPlaying]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  // vd id is the id for every video until id becomes number 3
  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;

      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true, isPlaying: false }));
        break;

      case "video-reset":
        setVideo((pre) => ({
          ...pre,
          videoId: 0,
          isLastVideo: false,
          isEnd: false,
          isPlaying: true,
        }));
        break;

      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      default:
        return video;
    }
  };

  const handleLoadedMetaData = (i, e) => {
    e.target.currentTime = 0;
    setLoadedData((pre) => [...pre, e]);
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} className="carousel-slider sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <div className="absolute inset-0 opacity-80 bg-[linear-gradient(to_top,black_0%,black_10%,transparent_40%,transparent_100%)]"></div>
                <video
                  playsInline={true}
                  className={`carousel-video pointer-events-none`}
                  preload="auto"
                  muted
                  ref={(el) => (videoRef.current[i] = el)}
                  onEnded={() =>
                    i !== 3
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last")
                  }
                  onPlay={() =>
                    setVideo((pre) => ({ ...pre, isPlaying: true }))
                  }
                  onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              <div className="absolute left-8 bottom-8 z-20">
                {list.textLists.map((text, i) => (
                  <p key={i} className="md:text-3xl text-xl font-bold uppercase text-shadow-strong text-center text-gray-200">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              ref={(el) => (videoDivRef.current[i] = el)}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>

        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
