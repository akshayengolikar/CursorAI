import {
  Float,
  MeshDistortMaterial,
  Sparkles,
  Stars,
  Trail
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";

type OrbProps = {
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
};

function FloatingOrb({ position, color, scale, speed }: OrbProps) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const t = state.clock.getElapsedTime() * speed;
    groupRef.current.rotation.x = t * 0.28;
    groupRef.current.rotation.y = t * 0.38;
    groupRef.current.position.y = position[1] + Math.sin(t) * 0.3;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh>
        <icosahedronGeometry args={[1, 2]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          distort={0.38}
          speed={1.5}
          roughness={0.06}
          metalness={0.25}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}

function EnergyRing() {
  const ringRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) {
      return;
    }

    const t = state.clock.getElapsedTime();
    ringRef.current.rotation.x = Math.PI / 2.2;
    ringRef.current.rotation.y = t * 0.12;
    ringRef.current.rotation.z = Math.sin(t * 0.3) * 0.35;
  });

  return (
    <mesh ref={ringRef} position={[0, -0.2, -5]}>
      <torusGeometry args={[2.8, 0.045, 24, 260]} />
      <meshStandardMaterial
        color="#93c5fd"
        emissive="#60a5fa"
        emissiveIntensity={0.95}
        roughness={0.2}
        metalness={0.9}
        transparent
        opacity={0.75}
      />
    </mesh>
  );
}

function CameraRig() {
  useFrame(({ camera, pointer, clock }) => {
    const drift = Math.sin(clock.elapsedTime * 0.25) * 0.12;
    camera.position.x += (pointer.x * 0.7 - camera.position.x) * 0.03;
    camera.position.y += (pointer.y * 0.4 + drift - camera.position.y) * 0.03;
    camera.lookAt(0, 0, -2.8);
  });

  return null;
}

function SceneContents() {
  return (
    <>
      <color attach="background" args={["#020617"]} />
      <fog attach="fog" args={["#020617", 8, 32]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 2]} intensity={1.2} color="#93c5fd" />
      <pointLight position={[-4, -1.5, 2]} intensity={1.7} color="#a78bfa" />
      <pointLight position={[5, 2.2, -2]} intensity={1.3} color="#22d3ee" />

      <Stars
        radius={92}
        depth={56}
        count={4200}
        factor={4}
        saturation={0.35}
        fade
        speed={1.1}
      />
      <Sparkles count={65} scale={14} size={2.1} speed={0.28} color="#a5b4fc" />

      <EnergyRing />

      <Float speed={1.1} rotationIntensity={0.4} floatIntensity={1.05}>
        <Trail width={0.6} length={4.2} color="#818cf8" attenuation={(t) => t * t}>
          <FloatingOrb
            position={[-2.2, 0.5, -2.3]}
            color="#818cf8"
            scale={0.92}
            speed={1.15}
          />
        </Trail>
      </Float>

      <Float speed={0.95} rotationIntensity={0.5} floatIntensity={1}>
        <Trail width={0.7} length={4.8} color="#22d3ee" attenuation={(t) => t * t}>
          <FloatingOrb
            position={[2.25, -0.75, -3.5]}
            color="#22d3ee"
            scale={1.26}
            speed={0.87}
          />
        </Trail>
      </Float>

      <Float speed={1.22} rotationIntensity={0.42} floatIntensity={0.88}>
        <Trail width={0.45} length={3.4} color="#c084fc" attenuation={(t) => t * t}>
          <FloatingOrb
            position={[0.35, 1.35, -4.6]}
            color="#c084fc"
            scale={0.68}
            speed={1.32}
          />
        </Trail>
      </Float>

      <CameraRig />
    </>
  );
}

export default function CinematicScene() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false }}
        camera={{ position: [0, 0, 8], fov: 52 }}
      >
        <SceneContents />
      </Canvas>
    </div>
  );
}
