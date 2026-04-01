import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useScroll } from "framer-motion";

function Fridge() {

  const leftDoor = useRef();
  const rightDoor = useRef();
  const { scrollYProgress } = useScroll();

  useFrame(() => {
const progress = scrollYProgress.get();

// simulate magnetic gasket resistance
const resistance = Math.pow(progress, 2);

// max opening angle (90°) and frontangle not working
const openAngle = resistance * (Math.PI / 2);

if(leftDoor.current){
  leftDoor.current.rotation.y = -openAngle;
}

if(rightDoor.current){
  rightDoor.current.rotation.y = openAngle;
}

  });

  return (

    <group>

      {/* BACK WALL */}
      <mesh position={[0,0,-1]}>
        <boxGeometry args={[3,4,0.1]} />
        <meshStandardMaterial
          color="#e6e6e6"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* LEFT WALL */}
      <mesh position={[-1.5,0,0]}>
        <boxGeometry args={[0.1,4,2]} />
        <meshStandardMaterial
          color="#e6e6e6"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* RIGHT WALL */}
      <mesh position={[1.5,0,0]}>
        <boxGeometry args={[0.1,4,2]} />
        <meshStandardMaterial
          color="#e6e6e6"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* TOP */}
      <mesh position={[0,2,0]}>
        <boxGeometry args={[3,0.1,2]} />
        <meshStandardMaterial color="#e6e6e6"/>
      </mesh>

      {/* BOTTOM */}
      <mesh position={[0,-2,0]}>
        <boxGeometry args={[3,0.1,2]} />
        <meshStandardMaterial color="#e6e6e6"/>
      </mesh>

      {/* GLASS SHELF */}
      <mesh position={[0,0.5,0]}>
        <boxGeometry args={[2.8,0.05,1.8]} />
        <meshPhysicalMaterial
          color="white"
          transmission={1}
          roughness={0}
          thickness={0.3}
        />
      </mesh>
      {/* SODA CANS */}

<mesh position={[-1,0.9,0]}>
  <cylinderGeometry args={[0.12,0.12,0.4,32]} />
  <meshStandardMaterial color="red"/>
</mesh>

<mesh position={[-0.8,0.9,0]}>
  <cylinderGeometry args={[0.12,0.12,0.4,32]} />
  <meshStandardMaterial color="red"/>
</mesh>


{/* APPLES */}

<mesh position={[0.2,0.9,0]}>
  <sphereGeometry args={[0.15,32,32]} />
  <meshStandardMaterial color="red"/>
</mesh>

<mesh position={[0.4,0.9,0]}>
  <sphereGeometry args={[0.15,32,32]} />
  <meshStandardMaterial color="green"/>
</mesh>


{/* CHEESE */}

<mesh position={[0.9,0.85,0]}>
  <boxGeometry args={[0.3,0.15,0.25]} />
  <meshStandardMaterial color="#ffd966"/>
</mesh>


{/* JUICE BOTTLE */}

<mesh position={[-0.2,-0.4,0]}>
  <cylinderGeometry args={[0.12,0.12,0.6,32]} />
  <meshStandardMaterial color="orange"/>
</mesh>

<mesh position={[-0.2,-0.05,0]}>
  <cylinderGeometry args={[0.05,0.05,0.15,32]} />
  <meshStandardMaterial color="white"/>
</mesh>


{/* LETTUCE */}

<mesh position={[0.5,-0.5,0]}>
  <sphereGeometry args={[0.25,32,32]} />
  <meshStandardMaterial color="#2ecc71"/>
</mesh>


{/* TOMATO */}

<mesh position={[0.9,-0.5,0]}>
  <sphereGeometry args={[0.15,32,32]} />
  <meshStandardMaterial color="#ff4d4d"/>
</mesh>

      {/* FRIDGE LIGHT */}
      <pointLight
        position={[0,1.5,0]}
        intensity={3}
        color="#ffffff"
      />

      {/* MILK BOTTLE */}
      <mesh position={[-0.6,0.9,0]}>
        <cylinderGeometry args={[0.15,0.15,0.7,32]} />
        <meshStandardMaterial color="white"/>
      </mesh>

      {/* MILK CAP */}
      <mesh position={[-0.6,1.25,0]}>
        <cylinderGeometry args={[0.05,0.05,0.15,32]} />
        <meshStandardMaterial color="blue"/>
      </mesh>

      {/* EGGS */}
      <mesh position={[0.6,0.9,0]}>
        <sphereGeometry args={[0.12,32,32]} />
        <meshStandardMaterial color="#fff2cc"/>
      </mesh>

      <mesh position={[0.8,0.9,0]}>
        <sphereGeometry args={[0.12,32,32]} />
        <meshStandardMaterial color="#fff2cc"/>
      </mesh>

      {/* VEGETABLE */}
      <mesh position={[0,-0.5,0]}>
        <sphereGeometry args={[0.25,32,32]} />
        <meshStandardMaterial color="#2ecc71"/>
      </mesh>

      <mesh position={[0,-0.8,0]}>
        <cylinderGeometry args={[0.05,0.05,0.3,32]} />
        <meshStandardMaterial color="#3d9970"/>
      </mesh>

     {/* LEFT DOOR */}

<group ref={leftDoor} position={[-1.5,0,1]}>

  <mesh position={[0.75,0,0]}>
    <boxGeometry args={[1.5,4,0.1]} />
    <meshStandardMaterial
      color="#f5f5f5"
      metalness={0.7}
      roughness={0.3}
    />
  </mesh>

  {/* HANDLE */}
  <mesh position={[1.3,0,0.1]}>
    <cylinderGeometry args={[0.05,0.05,2.5,32]} />
    <meshStandardMaterial color="#bfbfbf"/>
  </mesh>

</group>

     {/* RIGHT DOOR */}

<group ref={rightDoor} position={[1.5,0,1]}>

  <mesh position={[-0.75,0,0]}>
    <boxGeometry args={[1.5,4,0.1]} />
    <meshStandardMaterial
      color="#f5f5f5"
      metalness={0.7}
      roughness={0.3}
    />
  </mesh>

  {/* HANDLE */}
  <mesh position={[-1.3,0,0.1]}>
    <cylinderGeometry args={[0.05,0.05,2.5,32]} />
    <meshStandardMaterial color="#bfbfbf"/>
  </mesh>

</group>

    </group>

  );
}

function Fridge3D() {

  return (

    <Canvas
      shadows
      camera={{ position:[6,3,6], fov:50 }}
      style={{ height:"100vh", width:"100%" }}
    >

      <ambientLight intensity={0.8}/>

      <directionalLight
        position={[5,5,5]}
        intensity={2}
        castShadow
      />

      <Fridge/>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
      />

    </Canvas>

  );

}

export default Fridge3D;
