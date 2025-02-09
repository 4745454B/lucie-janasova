import Hero from "./components/Hero.jsx";
import Nav from "./components/Nav.jsx";
import { Canvas } from "@react-three/fiber";
import { FracturedCeramicCat } from "./components/FracturedCeramicCat.jsx";
import { Leva } from "leva";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import classes from "./App.module.scss";
import About from "./components/About.jsx";
import Courses from "./components/Courses.jsx";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const canvasContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const quoteRef = useRef(null);
  const [position, setPosition] = useState([0, 0.5, 0]);
  const [scale, setScale] = useState(0.8);

  useEffect(() => {
    const updatePosition = () => {
      if (window.innerWidth <= 500) {
        setPosition([0, 0, 0]);
        setScale(0.6);
      } else if (window.innerHeight <= 958) {
        setPosition([0, 0.2, 0]);
        setScale(0.8);
      } else {
        setPosition([0, 0.55, 0]);
        setScale(0.8);
      }
    };

    updatePosition(); // Call on mount
    window.addEventListener("resize", updatePosition);

    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  useGSAP(() => {
    gsap.to(canvasRef.current, {
      scrollTrigger: {
        trigger: canvasRef.current,
        start: "+=600",
        end: "+=3000",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        pinType: "transform",
      },
    });

    gsap.fromTo(
      quoteRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 80%",
          end: "+=300",
          scrub: 1,
        },
      }
    );
  });

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Nav />
      <Hero />

      <section ref={canvasContainerRef} className="canvas-container">
        <Canvas
          ref={canvasRef}
          perspective="true"
          shadows
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [0, 1, 4],
          }}
        >
          <color attach="background" args={["#171717"]} />
          {/* Lighting */}
          <ambientLight intensity={1} />
          <directionalLight position={[1, 3, 6]} intensity={10} />
          <Leva collapsed hidden />
          <FracturedCeramicCat
            trigger={canvasContainerRef}
            scale={scale}
            rotation={[0, Math.PI * 1.85, 0]}
            position={position}
          />
        </Canvas>
        <div ref={quoteRef} className={classes.quote}>
          Keramika učí trpělivosti. Každý kousek má své místo.
        </div>
      </section>

      <About />
      <Courses />
    </main>
  );
}

export default App;
