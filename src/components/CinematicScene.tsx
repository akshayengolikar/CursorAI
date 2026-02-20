import { Float, MeshDistortMaterial, Sparkles, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

type OrbProps = {
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
};

function Orb({ position, color, scale, speed }: OrbProps) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const t = state.clock.getElapsedTime() * speed;
    groupRef.current.rotation.x = t * 0.25;
    groupRef.current.rotation.y = t * 0.35;
    groupRef.current.position.y = position[1] + Math.sin(t) * 0.25;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh>
        <icosahedronGeometry args={[1, 2]} />
        <MeshDistortMaterial
          color={color}
          distort={0.35}
          speed={1.4}
          roughness={0.08}
          metalness={0.25}
          transparent
          opacity={0.68}
        />
      </mesh>
    </group>
  );
}

function SceneObjects() {
  return (
    <>
      <color attach="background" args={["#020617"]} />
      <fog attach="fog" args={["#020617", 10, 28]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 4, 2]} intensity={1.1} color="#93c5fd" />
      <pointLight position={[-5, -2, 3]} intensity={1.8} color="#a78bfa" />
      <pointLight position={[5, 2, -2]} intensity={1.35} color="#22d3ee" />

      <Stars
        radius={85}
        depth={55}
        count={3600}
        factor={4}
        saturation={0.4}
        fade
        speed={0.9}
      />
      <Sparkles count={55} scale={12} size={2.1} speed={0.3} color="#a5b4fc" />

      <Float speed={1.05} rotationIntensity={0.45} floatIntensity={0.95}>
        <Orb position={[-2.1, 0.45, -2]} color="#818cf8" scale={0.95} speed={1.1} />
      </Float>
      <Float speed={1.2} rotationIntensity={0.55} floatIntensity={1.05}>
        <Orb position={[1.95, -0.7, -3.2]} color="#22d3ee" scale={1.25} speed={0.85} />
      </Float>
      <Float speed={0.95} rotationIntensity={0.35} floatIntensity={0.75}>
        <Orb position={[0.35, 1.25, -4.3]} color="#c084fc" scale={0.72} speed={1.35} />
      </Float>
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
        <SceneObjects />
      </Canvas>
    </div>
  );
}
