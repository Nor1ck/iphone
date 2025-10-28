import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";

import * as THREE from "three";
import Lights from "./Lights";
import Loader from "./Loader";
import IPhone from "./IPhone";
import { Suspense } from "react";

const DEFAULT_SCALE = [17, 17, 17];

const ModelView = ({
  gsapId,
  groupRef,
  controlRef,
  setRotationState,
  size,
  item,
}) => {
  return (
    <View id={gsapId} className="w-full h-full absolute">
      {/* Ambient Light */}
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => {
          const angle = controlRef.current?.getAzimuthalAngle?.() || 0;
          setRotationState(angle);
        }}
      />

      <group ref={groupRef} name={gsapId} position={[0, 0, 0]}>
        <Suspense fallback={<Loader />}>
          <IPhone
            scale={DEFAULT_SCALE}
            item={item}
            size={size}
            rotation={[0, Math.PI, 0]}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
