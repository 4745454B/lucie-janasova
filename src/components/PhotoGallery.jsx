import { useState, useEffect } from "react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "yet-another-react-lightbox";
import { Thumbnails } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function PhotoGallery() {
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
        import.meta.glob(
          "/src/assets/images/gallery/miskyATacky/*.{jpg,jpeg}",
          {
            eager: true,
          }
        )
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
    console.log("item: ", item);

    const globalIndex = allImages.findIndex((img) => img.src === item.src);
    console.log("globalIndex: ", globalIndex);

    setIndex(globalIndex);
  };

  return (
    <section id="about" className="container mx-auto mt-40 mb-40 px-4">
      <h1 className="text-5xl text-center mb-16">Fotogalerie</h1>

      <h1 className="text-4xl mb-16">Velikonoce</h1>

      <Gallery
        images={images.velikonoce}
        onClick={handleClick}
        enableImageSelection={false}
      />

      <h1 className="text-4xl mt-24 mb-16">Květiny a vázy</h1>
      <Gallery
        images={images.kvetinyAVazy}
        onClick={handleClick}
        enableImageSelection={false}
      />

      <h1 className="text-4xl mt-24 mb-16">Zahrada</h1>
      <Gallery
        images={images.zahrada}
        onClick={handleClick}
        enableImageSelection={false}
      />

      <h1 className="text-4xl mt-24 mb-16">Vánoce</h1>
      <Gallery
        images={images.vanoce}
        onClick={handleClick}
        enableImageSelection={false}
      />

      <h1 className="text-4xl mt-24 mb-16">Podzim</h1>
      <Gallery
        images={images.podzim}
        onClick={handleClick}
        enableImageSelection={false}
      />

      <h1 className="text-4xl mt-24 mb-16">Misky a tácky</h1>
      <Gallery
        images={images.miskyATacky}
        onClick={handleClick}
        enableImageSelection={false}
      />

      <h1 className="text-4xl mt-24 mb-16">Kočky</h1>
      <Gallery
        images={images.kocky}
        onClick={handleClick}
        enableImageSelection={false}
      />

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
