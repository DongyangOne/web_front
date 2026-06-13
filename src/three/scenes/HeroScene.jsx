import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import FloatingSpheres from '../models/FloatingSpheres';

const CAMERA_POSITION = [0, 0, 7.5];
const CAMERA_FOV = 55;

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: CAMERA_POSITION, fov: CAMERA_FOV }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={1.4} color="#FFF5EC" />
      <directionalLight position={[6, 8, 6]} intensity={0.9} color="#FFD0A0" />
      <directionalLight position={[-6, -4, 3]} intensity={0.5} color="#FF9060" />
      <pointLight position={[0, 0, 4]} intensity={0.3} color="#FFEBCC" />
      <Suspense fallback={null}>
        <FloatingSpheres />
      </Suspense>
    </Canvas>
  );
}
