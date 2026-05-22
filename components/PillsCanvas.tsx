"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── Shaders ──────────────────────────────────────────────────────────────────

const VERTEX_SHADER = `
  varying float vLocalY;
  varying vec3  vNormal;
  varying vec3  vMvPos;
  varying vec3  vLocalPos;

  void main() {
    vLocalY   = position.y;
    vLocalPos = position;
    vNormal   = normalize(normalMatrix * normal);
    vec4 mv   = modelViewMatrix * vec4(position, 1.0);
    vMvPos    = mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAGMENT_SHADER = `
  uniform vec3 uColorLight;
  uniform vec3 uColorDark;

  varying float vLocalY;
  varying vec3  vNormal;
  varying vec3  vMvPos;
  varying vec3  vLocalPos;

  float hash(vec2 p) {
    p = fract(p * vec2(127.1, 311.7));
    p += dot(p, p + 17.5);
    return fract(p.x * p.y);
  }

  void main() {
    // 1. Hard bicolor split
    float split    = step(0.0, vLocalY);
    vec3 baseColor = mix(uColorDark, uColorLight, split);

    // 2. Lambertian shading
    vec3  L1      = normalize(vec3(0.6, 0.9, 0.7));
    vec3  L2      = normalize(vec3(-0.7, -0.4, 0.5));
    float diff1   = max(dot(vNormal, L1), 0.0);
    float diff2   = max(dot(vNormal, L2), 0.0) * 0.25;
    float lighting = 0.28 + diff1 * 0.65 + diff2;

    // 3. Rim light
    vec3  viewDir = normalize(-vMvPos);
    float rim     = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0) * 0.22;

    vec3 litColor = baseColor * lighting + rim;

    // 4. Surface grain — two frequencies: fine detail + coarse roughness
    float g1     = hash(vLocalPos.xy * 90.0 + vLocalPos.z * 45.0);
    float g2     = hash(vLocalPos.yz * 75.0 + vLocalPos.x * 38.0);
    float g3     = hash(vLocalPos.xz * 18.0 + vLocalPos.y * 12.0);
    float grain  = (g1 * 0.5 + g2 * 0.3 + g3 * 0.2 - 0.5) * 0.18;
    litColor     = clamp(litColor + grain, 0.0, 1.0);

    // 5. Distance fog
    float fog  = clamp((-vMvPos.z - 12.0) / 9.0, 0.0, 0.88);
    litColor   = mix(litColor, vec3(0.0), fog);

    gl_FragColor = vec4(litColor, 1.0);
  }
`;

// ─── Pill ─────────────────────────────────────────────────────────────────────

interface PillData {
  id:            number;
  position:      [number, number, number];
  rotation:      [number, number, number];
  rotationSpeed: [number, number, number];
  fallSpeed:     number;
  scale:         number;
  colorLight:    number;
  colorDark:     number;
}

function Pill({ position, rotation, rotationSpeed, fallSpeed, scale, colorLight, colorDark }: PillData) {
  const meshRef = useRef<THREE.Mesh>(null);
  const posY    = useRef(position[1]);

  const uniforms = useMemo(() => ({
    uColorLight: { value: new THREE.Color(colorLight, colorLight, colorLight) },
    uColorDark:  { value: new THREE.Color(colorDark,  colorDark,  colorDark)  },
  }), [colorLight, colorDark]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    posY.current -= fallSpeed * delta;
    if (posY.current < -14) posY.current = 14 + Math.random() * 8;
    meshRef.current.position.y  = posY.current;
    meshRef.current.rotation.x += rotationSpeed[0] * delta;
    meshRef.current.rotation.y += rotationSpeed[1] * delta;
    meshRef.current.rotation.z += rotationSpeed[2] * delta;
  });

  return (
    <mesh
      ref={meshRef}
      position={[position[0], position[1], position[2]]}
      rotation={new THREE.Euler(...rotation)}
      scale={scale}
    >
      <capsuleGeometry args={[0.28, 0.9, 12, 24]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
      />
    </mesh>
  );
}

// ─── Scene ────────────────────────────────────────────────────────────────────

function PillScene() {
  const pills = useMemo<PillData[]>(() => {
    return Array.from({ length: 35 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 10 - 3,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ] as [number, number, number],
      rotationSpeed: [
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.15,
      ] as [number, number, number],
      fallSpeed:  0.18 + Math.random() * 0.22,
      scale:      0.5  + Math.random() * 0.9,
      colorLight: 0.50 + Math.random() * 0.30,
      colorDark:  0.15 + Math.random() * 0.18,
    }));
  }, []);

  return <>{pills.map((p) => <Pill key={p.id} {...p} />)}</>;
}

// ─── Canvas ───────────────────────────────────────────────────────────────────

export default function PillsCanvas() {
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    const hasWebGL = !!window.WebGLRenderingContext;
    setEnabled(!mobile && hasWebGL);
  }, []);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: "none" }}
      >
        <PillScene />
      </Canvas>
    </div>
  );
}
