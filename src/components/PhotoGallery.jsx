import { useState, useEffect, useRef } from "react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "yet-another-react-lightbox";
import { Thumbnails } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PhotoGallery() {
  const titleRef = useRef(null);
  const titleRefs = useRef([]);
  const galleryRefs = useRef([]);
  const [index, setIndex] = useState(-1);
  const [allImages, setAllImages] = useState([]);
  const [images, setImages] = useState({
    kocky: [],
    velikonoce: [],
    kvetinyAVazy: [],
    zahrada: [],
    vanoce: [],
    podzim: [],
    miskyATacky: [],
  });

  useEffect(() => {
    // Manually call `import.meta.glob()` for each folder
    const _images = {
      kocky: Object.values(
        import.meta.glob("/src/assets/images/gallery/kocky/*.{jpg,jpeg}", {
          eager: true,
        })
      ),
      velikonoce: Object.values(
        import.meta.glob("/src/assets/images/gallery/velikonoce/*.{jpg,jpeg}", {
          eager: true,
        })
      ),
      kvetinyAVazy: Object.values(
        import.meta.glob(
          "/src/assets/images/gallery/kvetinyAVazy/*.{jpg,jpeg}",
          {
            eager: true,
          }
        )
      ),
      zahrada: Object.values(
        import.meta.glob("/src/assets/images/gallery/zahrada/*.{jpg,jpeg}", {
          eager: true,
        })
      ),
      vanoce: Object.values(
        import.meta.glob("/src/assets/images/gallery/vanoce/*.{jpg,jpeg}", {
          eager: true,
        })
      ),
      podzim: Object.values(
        import.meta.glob("/src/assets/images/gallery/podzim/*.{jpg,jpeg}", {
          eager: true,
        })
      ),
      miskyATacky: Object.values(
        import.meta.glob("/src/assets/images/gallery/misky/*.{jpg,jpeg}", {
          eager: true,
        })
      ),
    };

    // Convert each category into an array of image objects
    const formattedImages = Object.fromEntries(
      Object.entries(_images).map(([category, modules]) => [
        category,
        modules.map((module) => ({
          src: module.default,
          thumbnail: module.default, // If you have separate thumbnails, replace this
        })),
      ])
    );

    setImages(formattedImages);
    setAllImages(Object.values(formattedImages).flat());
  }, []);

  const handleClick = (index, item) => {
    const globalIndex = allImages.findIndex((img) => img.src === item.src);
    setIndex(globalIndex);
  };

  useGSAP(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
          once: true,
        },
      }
    );

    titleRefs.current.forEach((title) => {
      if (!title) return;

      gsap.fromTo(
        title,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: title,
            start: "top 70%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    });

    galleryRefs.current.forEach((gallery) => {
      if (!gallery) return;

      gsap.fromTo(
        gallery,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gallery,
            start: "top 70%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <section id="gallery" className="container mx-auto mt-40 mb-40 px-4">
      <h1 ref={titleRef} className="text-5xl text-center mb-16">
        Fotogalerie
      </h1>

      {[
        { title: "Velikonoce", key: "velikonoce" },
        { title: "Květiny a vázy", key: "kvetinyAVazy" },
        { title: "Zahrada", key: "zahrada" },
        { title: "Vánoce", key: "vanoce" },
        { title: "Podzim", key: "podzim" },
        { title: "Misky a tácky", key: "miskyATacky" },
        { title: "Kočky", key: "kocky" },
      ].map(({ title, key }, i) => (
        <div key={key} className="mb-24">
          <h1
            className="text-4xl mb-16 opacity-0"
            ref={(el) => (titleRefs.current[i] = el)}
          >
            {title}
          </h1>

          <div
            ref={(el) => (galleryRefs.current[i] = el)}
            className="opacity-0"
          >
            <Gallery
              images={images[key]}
              onClick={handleClick}
              enableImageSelection={false}
            />
          </div>
        </div>
      ))}

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={allImages.map((image) => ({ src: image?.src }))}
        index={index}
        plugins={[Thumbnails]}
      />
    </section>
  );
}
