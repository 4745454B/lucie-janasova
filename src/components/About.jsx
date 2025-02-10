import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="container mx-auto mt-40 flex flex-wrap items-center gap-8 px-8"
    >
      <div ref={textRef} className="max-w-2xl flex-1 min-w-[350px] opacity-0">
        <h1 className="text-5xl">Můj příběh</h1>
        <p className="mt-5">
          Od malička mě vždy bavilo všelijaké vyrábění, pak přišla puberta,
          svatba a děti. Teprve po mateřské jsem se mohla začít věnovat tomu, co
          mne naplňuje. A to je práce s dětmi a tvoření. Postupně jsem se
          vypracovala a dnes mám svojí soukromou dílnu, kam dochází tvořit a
          vyrábět děti i dospělí. Vedu také keramické kurzy ve školách a
          školkách.
        </p>
      </div>

      <div ref={imageRef} className="flex-1 min-w-[350px] opacity-0">
        <img
          src="/images/aboutUs.webp"
          alt="About us"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
}
