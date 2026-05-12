import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ROTATION_SPEED = 0.005;
const BOX_SIZE = [1.5, 1.5, 1.5];
const MATERIAL_COLOR = '#3B82F6';

/**
 * 회전하는 로고 큐브 예시.
 * Three.js 컨벤션의 핵심 패턴을 보여준다:
 * - useMemo로 geometry/material 재사용
 * - useEffect cleanup으로 메모리 해제
 * - 매직 넘버 상수화
 */
function RotatingLogo() {
  const meshRef = useRef(null);

  // geometry와 material은 매 렌더마다 새로 만들면 안 된다 -> useMemo
  const geometry = useMemo(() => new THREE.BoxGeometry(...BOX_SIZE), []);
  const material = useMemo(() => new THREE.MeshStandardMaterial({ color: MATERIAL_COLOR }), []);

  // 메모리 누수 방지: 컴포넌트 언마운트 시 GPU 리소스 해제
  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += ROTATION_SPEED;
    meshRef.current.rotation.y += ROTATION_SPEED;
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
}

export default RotatingLogo;
