import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import RotatingLogo from '../models/RotatingLogo';

// 매직 넘버 금지 - 상수로 분리
const CAMERA_POSITION = [0, 0, 5];
const CAMERA_FOV = 50;
const AMBIENT_LIGHT_INTENSITY = 0.5;
const DIRECTIONAL_LIGHT_POSITION = [10, 10, 5];
const DIRECTIONAL_LIGHT_INTENSITY = 1;

function HeroScene() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Canvas camera={{ position: CAMERA_POSITION, fov: CAMERA_FOV }}>
        <ambientLight intensity={AMBIENT_LIGHT_INTENSITY} />
        <directionalLight
          position={DIRECTIONAL_LIGHT_POSITION}
          intensity={DIRECTIONAL_LIGHT_INTENSITY}
        />

        <Suspense fallback={null}>
          <RotatingLogo />
        </Suspense>

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

export default HeroScene;
