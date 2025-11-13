import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import { animateWithGsap } from '../utils/animations';
import { explore1Img, explore2Img, exploreVideo, 
  highlightFirstVideo, highlightSecondVideo, 
  highlightThirdVideo, highlightFourthVideo } from '../utils';
import gsap from 'gsap';

const Features = () => {
  const videoRef = useRef();

  useGSAP(() => {
    gsap.to('#exploreVideo', {
      scrollTrigger: {
        trigger: '#exploreVideo',
        toggleActions: 'play pause reverse restart',
        start: '-10% bottom',
      },
      onComplete: () => {
        videoRef.current.play();
      }
    })

    animateWithGsap('#features_title', { y:0, opacity:1})
    animateWithGsap(
      '.g_grow',
      { scale: 1, opacity: 1, ease: 'power1' },
      { scrub: 5.5 }
    );
    animateWithGsap(
      '.g_text',
      {y:0, opacity: 1,ease: 'power2.inOut',duration: 1}
    )
  }, []);

  return (
    <section className="h-full common-padding bg-zinc relative overflow-hidden">
      <div className="screen-max-wdith">
        <div className="mb-12 w-full">
          <h1 id="features_title" className="section-heading">Alles aus einer Hand</h1>
        </div>
        
        <div className="flex flex-col justify-center items-center overflow-hidden">

          <div className="flex-center flex-col sm:px-10">
            <div className="relative h-[50vh] w-full flex items-top">
              <video playsInline loop id="exploreVideo" className="w-full h-full object-cover object-center" preload="none" muted autoPlay ref={videoRef}>
                <source src={highlightSecondVideo} type="video/mp4" />
              </video>
            </div>

            <div className="flex flex-col w-full relative">
              <div className="feature-video-container">
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img src={explore1Img} alt="titanium" className="feature-video g_grow" />
                </div>
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img src={explore2Img} alt="titanium 2" className="feature-video g_grow" />
                </div>
              </div>

              <div className="feature-text-container">
                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    Bei uns kriegst du alles, was du für deine Website brauchst. Wir haben {' '}
                    <span className="text-white">
                      professionelle Designer, Entwickler und Contentmanager
                    </span>,
                     die deine Website so bauen, dass sie nicht nur gut aussieht, sondern auch konvertiert.
                  </p>
                </div>

                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    Mach dir keine Sorgen über lange Kommunikationswege {' '}
                    <span className="text-white">
                       du hast einen festen Ansprechpartner
                    </span>
                    , der unser Team aus Experten koordiniert, sodass deine Website pünktlich und in höchster Qualität fertiggestellt wird.
                  </p>
                </div>
              </div>
              <div className="flex-center mt-16">
                <a href="#highlights" className="btn">Jetzt Strategiesession anfragen</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features