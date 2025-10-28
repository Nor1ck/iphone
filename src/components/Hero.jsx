import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { heroVideo, smallHeroVideo } from '../utils';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo)

  const handleVideoSrcSet = () => {
    if(window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo)
    } else {
      setVideoSrc(heroVideo)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleVideoSrcSet);

    return () => {
      window.removeEventListener('reisze', handleVideoSrcSet)
    }
  }, [])

  useGSAP(() => {
    gsap.to('#hero', { opacity: 1, delay: 2 })
    gsap.to('#cta', { opacity: 1, y: -50, delay: 2 })
  }, [])

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero" className="hero-title">Website Leasing</p>
        <div className="w-full px-4 md:px-0">
          <h1
            className="
              hero-heading block mx-auto max-w-5xl text-center text-6xl font-bold leading-[1.05] sm:text-[5.5rem] sm:leading-[1.08]
              animate-shine !bg-clip-text text-transparent tracking-tight
              [background:radial-gradient(circle_at_center,rgba(245,247,251,0.85),transparent)_-200%_50%_/_200%_100%_no-repeat,#555468ff]
              dark:[background:radial-gradient(circle_at_center,rgba(37, 40, 47, 0.85),transparent)_-200%_50%_/_200%_100%_no-repeat,#f5f7fb]
            "
          >
            High-End Website. Fixe Kosten.
          </h1>
        </div>
      </div>

      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20"
      >
        <a href="#highlights" className="btn">Jetzt Strategiesession anfragen</a>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  )
}

export default Hero
