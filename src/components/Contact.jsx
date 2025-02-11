import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const boxRef = useRef(null);

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
            start: "top 90%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        boxRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
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
      id="contact"
      className="flex flex-col items-center justify-center py-12"
    >
      <h1 ref={textRef} className="text-5xl mb-16">
        Kontakt
      </h1>
      <div
        ref={boxRef}
        className="bg-white shadow-lg p-6 rounded-lg w-full max-w-md text-center"
      >
        <p className="text-xl font-semibold text-gray-700">Lucie Janášová</p>
        <p className="text-gray-600">Lektorka</p>
        <p className="mt-3 text-lg text-blue-600">
          <a href="tel:+420602278377" className="hover:underline">
            +420 602 278 377
          </a>
        </p>
        <p className="mt-1 text-lg text-blue-600">
          <a href="mailto:luciejanasova@seznam.cz" className="hover:underline">
            luciejanasova@seznam.cz
          </a>
        </p>
      </div>
    </section>
  );
};

export default Contact;
