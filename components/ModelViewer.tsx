"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import "../styles/model.css"; // le fichier CSS associé

function Model() {
  const gltf = useGLTF("/models/the_dice.glb");
  return <primitive object={gltf.scene} scale={2.5} />;
}

export default function ModelViewer() {
  return (
    <section className="model-section">
      <div className="model-view">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={1} />
          <directionalLight position={[2, 2, 2]} />
          <Model />
          <OrbitControls />
          <Environment preset="city" />
        </Canvas>
      </div>
      <div className="model-text">
        <h2>Défiez votre esprit</h2>
        <p>
          Explorez notre univers de jeux de société conçus pour stimuler votre imagination,
          renforcer votre logique et passer des moments inoubliables en famille ou entre amis.
        </p>
        <a
          href="https://www.logicieleducatif.fr/jeux/domaine/logique"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>Défiez-vous !</button>
        </a>
      </div>
    </section>
  );
}
