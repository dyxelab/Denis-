"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";

function useBrimShape() {
  return useMemo(() => {
    const shape = new THREE.Shape();
    const innerR = 0.8;
    const outerR = 1.32;
    const a0 = -Math.PI * 0.34;
    const a1 = Math.PI * 0.34;
    const steps = 24;
    shape.moveTo(Math.sin(a0) * innerR, Math.cos(a0) * innerR);
    shape.lineTo(Math.sin(a0) * outerR, Math.cos(a0) * outerR);
    for (let i = 0; i <= steps; i++) {
      const t = a0 + ((a1 - a0) * i) / steps;
      shape.lineTo(Math.sin(t) * outerR, Math.cos(t) * outerR);
    }
    shape.lineTo(Math.sin(a1) * innerR, Math.cos(a1) * innerR);
    for (let i = steps; i >= 0; i--) {
      const t = a0 + ((a1 - a0) * i) / steps;
      shape.lineTo(Math.sin(t) * innerR, Math.cos(t) * innerR);
    }
    return shape;
  }, []);
}

// Applies opacityRef.current to every mesh material under this group,
// each frame, so a group of several meshes fades as one unit.
function useGroupOpacity(opacityRef: RefObject<number>) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(() => {
    const value = opacityRef.current;
    groupRef.current?.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const material = child.material as THREE.MeshStandardMaterial;
        material.opacity = value;
        child.visible = value > 0.01;
      }
    });
  });
  return groupRef;
}

function Cap({ opacityRef }: { opacityRef: RefObject<number> }) {
  const groupRef = useGroupOpacity(opacityRef);
  const brimShape = useBrimShape();
  return (
    <group ref={groupRef} position={[0, 0.05, 0]} rotation={[0, Math.PI * 0.15, 0]}>
      {/* crown */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <sphereGeometry args={[0.85, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color="#d8d8dd" metalness={0.75} roughness={0.42} transparent opacity={1} />
      </mesh>
      {/* brim, flush with the crown's base rim, pointing forward */}
      <mesh position={[0, 0.13, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <extrudeGeometry args={[brimShape, { depth: 0.08, bevelEnabled: false }]} />
        <meshStandardMaterial color="#8b8b93" metalness={0.7} roughness={0.45} transparent opacity={1} />
      </mesh>
      {/* button */}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial
          color="#17ff6b"
          emissive="#17ff6b"
          emissiveIntensity={0.6}
          metalness={0.4}
          roughness={0.3}
          transparent
          opacity={1}
        />
      </mesh>
    </group>
  );
}

function Bag({ opacityRef }: { opacityRef: RefObject<number> }) {
  const groupRef = useGroupOpacity(opacityRef);
  return (
    <group ref={groupRef} position={[0, -0.05, 0]}>
      {/* body */}
      <mesh castShadow>
        <boxGeometry args={[1.3, 1.0, 0.55]} />
        <meshStandardMaterial color="#c9c9cf" metalness={0.85} roughness={0.3} transparent opacity={0} />
      </mesh>
      {/* handle */}
      <mesh position={[0, 0.5, 0]}>
        <torusGeometry args={[0.5, 0.05, 12, 32, Math.PI]} />
        <meshStandardMaterial color="#9a9aa0" metalness={0.8} roughness={0.35} transparent opacity={0} />
      </mesh>
      {/* clasp */}
      <mesh position={[0, 0.18, 0.29]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#17ff6b"
          emissive="#17ff6b"
          emissiveIntensity={0.6}
          metalness={0.4}
          roughness={0.3}
          transparent
          opacity={0}
        />
      </mesh>
    </group>
  );
}

function Scene({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const capOpacity = useRef(1);
  const bagOpacity = useRef(0);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
    }
    const target = hovered ? 0 : 1;
    capOpacity.current = THREE.MathUtils.damp(capOpacity.current, target, 4, delta);
    bagOpacity.current = THREE.MathUtils.damp(bagOpacity.current, 1 - target, 4, delta);
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={0.75} />
      <directionalLight position={[-4, 1, -2]} intensity={0.35} />
      <pointLight position={[-3, -1.5, 3]} intensity={0.7} color="#17ff6b" />
      <pointLight position={[2, -2, -3]} intensity={0.3} color="#ffffff" />
      <group ref={groupRef}>
        <Cap opacityRef={capOpacity} />
        <Bag opacityRef={bagOpacity} />
      </group>
    </>
  );
}

export default function HeroObject3D() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="pointer-events-auto h-48 w-48 sm:h-64 sm:w-64 lg:h-[26rem] lg:w-[26rem]"
    >
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 38 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Scene hovered={hovered} />
      </Canvas>
    </div>
  );
}
