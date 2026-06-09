import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SPHERE_CONFIGS = [
  { position: [-3.8, 1.8, -1.0], radius: 1.4, color: '#D4956A', opacity: 0.88 },
  { position: [3.5, -0.6, -2.0], radius: 1.05, color: '#E8A87C', opacity: 0.72 },
  { position: [-1.6, -2.2, -0.5], radius: 0.55, color: '#F0C8A0', opacity: 0.92 },
  { position: [2.8, 2.5, -1.8], radius: 0.48, color: '#C47840', opacity: 0.62 },
  { position: [-3.2, 2.8, -2.2], radius: 0.85, color: '#EDD5B8', opacity: 0.68 },
  { position: [1.4, -2.8, -0.8], radius: 0.38, color: '#D4956A', opacity: 0.78 },
  { position: [5.0, 0.6, -4.0], radius: 1.7, color: '#F0C8A0', opacity: 0.42 },
  { position: [-5.0, -1.8, -3.0], radius: 1.15, color: '#E8A87C', opacity: 0.52 },
  { position: [0.6, 3.2, -1.2], radius: 0.32, color: '#C47840', opacity: 0.68 },
  { position: [-0.5, -3.3, -1.8], radius: 0.28, color: '#D4956A', opacity: 0.62 },
  { position: [4.0, -2.8, -2.5], radius: 0.65, color: '#EDD5B8', opacity: 0.58 },
  { position: [-2.8, 0.2, -3.5], radius: 0.95, color: '#F0C8A0', opacity: 0.38 },
  { position: [1.8, 1.2, 0.5], radius: 0.22, color: '#C47840', opacity: 0.75 },
  { position: [-0.9, 1.8, 0.8], radius: 0.18, color: '#E8A87C', opacity: 0.80 },
];

function FloatingSphere({ position, radius, color, opacity, phaseOffset }) {
  const meshRef = useRef(null);
  const [px, py, pz] = position;

  const geometry = useMemo(() => new THREE.SphereGeometry(radius, 32, 32), [radius]);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        transparent: true,
        opacity,
        roughness: 0.2,
        metalness: 0.05,
      }),
    [color, opacity]
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * 0.45 + phaseOffset;
    meshRef.current.position.y = py + Math.sin(t) * 0.18;
    meshRef.current.position.x = px + Math.cos(t * 0.7) * 0.08;
    meshRef.current.rotation.y += 0.002;
    meshRef.current.rotation.z += 0.001;
  });

  return <mesh ref={meshRef} position={[px, py, pz]} geometry={geometry} material={material} />;
}

export default function FloatingSpheres() {
  return (
    <>
      {SPHERE_CONFIGS.map((config, i) => (
        <FloatingSphere key={i} {...config} phaseOffset={i * 0.85} />
      ))}
    </>
  );
}
