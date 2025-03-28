import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function FracturedCeramicCat(
  { trigger, position, rotation, scale },
  ...props
) {
  const { nodes, materials } = useGLTF("/fracturedCeramicCat.glb");
  const groupRef = useRef();
  const pieceRefs = useRef([]);
  const initialPositions = [];

  useEffect(() => {
    if (!groupRef.current) return;

    pieceRefs.current.forEach((mesh, index) => {
      if (!mesh) return;
      initialPositions[index] = mesh.position.clone();

      // Set to a slightly randomized scattered position (1px max deviation)
      gsap.set(mesh.position, {
        x: initialPositions[index].x + (Math.random() - 0.6) * 1,
        y: initialPositions[index].y + (Math.random() - 0.6) * 1 + 0.5,
        z: initialPositions[index].z + (Math.random() - 0.6) * 1,
      });
    });

    pieceRefs.current.forEach((mesh, index) => {
      if (!mesh) return;

      gsap.to(mesh.position, {
        scrollTrigger: {
          trigger: trigger.current,
          start: "top top",
          end: "bottom 20%",
          scrub: 1,
        },
        x: initialPositions[index].x,
        y: initialPositions[index].y,
        z: initialPositions[index].z,
        duration: 2 + index * 0.2,
        ease: "power3.out",
      });
    });
  }, []);

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
      dispose={null}
    >
      {Object.entries(nodes).map(([key, node], index) => (
        <mesh
          key={key}
          ref={(el) => (pieceRefs.current[index] = el)}
          castShadow
          receiveShadow
          geometry={node.geometry}
          material={materials.Material_0}
          position={node.position}
        />
      ))}
    </group>
  );
}

useGLTF.preload("/fracturedCeramicCat.glb");
