import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThreeCanvas from "../components/ThreeCanvas";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.normalizeScroll(true);

export default function Hero() {
  const heroRef = useRef(null);
  const leftDoorRef = useRef(null);
  const rightDoorRef = useRef(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const leftDoor = leftDoorRef.current;
    const rightDoor = rightDoorRef.current;

    const ctx = gsap.context(() => {
      // Initial OPEN state
      gsap.set(leftDoor, { xPercent: -100 });
      gsap.set(rightDoor, { xPercent: 100 });

      gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=60%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onLeave: () => {
            // optional: add any non-crashing logic here
            document.querySelector(".about-bg")?.classList.add("active");
          },
          onEnterBack: () => {
            document.querySelector(".about-bg")?.classList.remove("active");
          }
        }
      })
      .to(leftDoor, { xPercent: 0, ease: "none" }, 0)
      .to(rightDoor, { xPercent: 0, ease: "none" }, 0)

      // Border turns black when shutters meet
      .to(leftDoor, {
        borderRightColor: "#000",
        ease: "none"
      }, 0.9)

      .to(rightDoor, {
        borderLeftColor: "#000",
        ease: "none"
      }, 0.9);

    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={heroRef} className="hero relative">
      
      {/* 3D Logo / Spinning Canvas */}
      <ThreeCanvas />

      {/* Center Text */}
      <div className="hero-content absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-4">
        <h1
          className="hero-text text-5xl md:text-8xl font-bold tracking-[0.2em] text-white text-center mb-4"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          CELISTA
        </h1>

        <p
          className="hero-sub text-lg md:text-2xl text-gray-300 tracking-widest text-center"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          From Department of AI & DS
        </p>
      </div>

      {/* Shutters */}
      <div ref={leftDoorRef} className="shutter left" />
      <div ref={rightDoorRef} className="shutter right" />

    </section>
  );
}