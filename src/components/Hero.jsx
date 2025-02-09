import classes from "./Hero.module.scss";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const keramikaTextRef = useRef(null);
  const paragraphRef = useRef(null);
  const heroRef = useRef(null);

  useGSAP(() => {
    gsap.from(keramikaTextRef.current.children, {
      opacity: 0,
      y: 20,
      duration: 0.75,
      ease: "power2.out",
      stagger: {
        amount: 2,
        from: "random",
      },
    });

    gsap.from(paragraphRef.current.children, {
      opacity: 0,
      y: 20,
      duration: 0.75,
      ease: "power2.out",
      stagger: {
        amount: 2,
        from: "random",
      },
    });
  });

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "53% 50%",
        scrub: true,
      },
    });

    tl.to(
      textRef.current,
      {
        y: -800,
      },
      "a"
    )
      .to(
        heroRef.current,
        {
          scale: 1.2,
        },
        "a"
      )
      .to(
        containerRef.current,
        {
          y: 200,
        },
        "a"
      );
  });

  return (
    <section ref={containerRef} className={classes.container}>
      <div ref={textRef} className={classes.text}>
        <h1 ref={keramikaTextRef}>
          {"KERAMIKA".split("").map((letter, index) => (
            <span key={index} style={{ display: "inline-block" }}>
              {letter}
            </span>
          ))}
        </h1>
        <p ref={paragraphRef}>
          {"Kurzy pro děti i dospělé".split("").map((letter, index) => (
            <span key={index} style={{ display: "inline-block" }}>
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </p>
      </div>

      <div ref={heroRef} className={classes.hero} />
    </section>
  );
}
