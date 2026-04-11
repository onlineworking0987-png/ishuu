"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function PlexusGeometry() {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Create icosahedron vertices for point distribution
  const { positions, lineIndices } = useMemo(() => {
    const icosahedron = new THREE.IcosahedronGeometry(2, 2); // Low-poly with subdivisions
    const positionAttribute = icosahedron.getAttribute("position");
    const vertices: THREE.Vector3[] = [];

    // Extract unique vertices
    for (let i = 0; i < positionAttribute.count; i++) {
      const vertex = new THREE.Vector3(
        positionAttribute.getX(i),
        positionAttribute.getY(i),
        positionAttribute.getZ(i)
      );
      // Check if vertex already exists (avoid duplicates)
      const exists = vertices.some((v) => v.distanceTo(vertex) < 0.01);
      if (!exists) {
        vertices.push(vertex);
      }
    }

    // Create positions array for points
    const positions = new Float32Array(vertices.length * 3);
    vertices.forEach((v, i) => {
      positions[i * 3] = v.x;
      positions[i * 3 + 1] = v.y;
      positions[i * 3 + 2] = v.z;
    });

    // Calculate connections between nearby points
    const maxDistance = 1.2; // Only connect points within this distance
    const lineIndices: number[] = [];
    
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const distance = vertices[i].distanceTo(vertices[j]);
        if (distance < maxDistance) {
          lineIndices.push(i, j);
        }
      }
    }

    return { positions, lineIndices, vertices };
  }, []);

  // Create line positions from indices
  const linePositions = useMemo(() => {
    const linePos = new Float32Array(lineIndices.length * 3);
    for (let i = 0; i < lineIndices.length; i++) {
      const vertexIndex = lineIndices[i];
      linePos[i * 3] = positions[vertexIndex * 3];
      linePos[i * 3 + 1] = positions[vertexIndex * 3 + 1];
      linePos[i * 3 + 2] = positions[vertexIndex * 3 + 2];
    }
    return linePos;
  }, [positions, lineIndices]);

  // Slow, elegant rotation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Points/Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#EC4899"
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>

      {/* Connecting Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#EC4899"
          transparent
          opacity={0.15}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
}

export function PlexusSphere() {
  return (
    <div className="absolute -top-32 left-0 right-0 bottom-0 pointer-events-none overflow-visible z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        {/* Position sphere to the right and slightly up */}
        <group position={[2.5, 0.8, 0]}>
          <PlexusGeometry />
        </group>
      </Canvas>
    </div>
  );
}
