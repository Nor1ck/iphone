import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModelView from "./ModelView";
import { createRef, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { sizes } from "../constants";

const DEFAULT_TITLE = "iPhone 15 Pro in Natural Titanium";

const Model = () => {
  const sizeKeys = useMemo(() => sizes.map((size) => size.value), []);
  const defaultSize = sizeKeys[0] || "mini";

  const [activeSize, setActiveSize] = useState(defaultSize);
  const [previousSize, setPreviousSize] = useState(null);

  const groupRefs = useMemo(
    () => sizeKeys.map(() => createRef()),
    [sizeKeys]
  );

  const controlRefs = useMemo(
    () => sizeKeys.map(() => createRef()),
    [sizeKeys]
  );

  const rotationStatesRef = useRef(sizeKeys.map(() => 0));

  const timelineRef = useRef(
    gsap.timeline({ defaults: { ease: "power2.inOut", duration: 1.2 } })
  );
  const initialisedRef = useRef(false);

  useEffect(() => {
    if (initialisedRef.current) return;
    sizeKeys.forEach((value) => {
      if (value !== activeSize) {
        gsap.set(`#view-${value}`, { xPercent: 100 });
      }
    });
    initialisedRef.current = true;
  }, [activeSize, sizeKeys]);

  useEffect(() => {
    if (!previousSize || previousSize === activeSize) return;

    const timeline = timelineRef.current;
    timeline.clear();

    const previousIndex = sizeKeys.indexOf(previousSize);
    const activeIndex = sizeKeys.indexOf(activeSize);

    const outgoingRef = groupRefs[previousIndex]?.current;
    const incomingRef = groupRefs[activeIndex]?.current;
    const rotationStates = rotationStatesRef.current;

    if (!outgoingRef || !incomingRef) return;

    timeline
      .to(outgoingRef.rotation, {
        y: rotationStates[previousIndex],
        duration: 0.5,
      })
      .to(
        `#view-${previousSize}`,
        {
          xPercent: -100,
          duration: 0.5,
        },
        "<"
      )
      .set(`#view-${activeSize}`, { xPercent: 100 })
      .to(
        incomingRef.rotation,
        {
          y: rotationStates[activeIndex],
          duration: 1,
        },
        "<"
      )
      .to(
        `#view-${activeSize}`,
        {
          xPercent: 0,
          duration: 0.5,
        },
        "<"
      );
  }, [activeSize, previousSize]);

  useGSAP(() => {
    gsap.to("#heading", { y: 0, opacity: 1 });
  }, []);

  const updateRotationState = (sizeValue, angle) => {
    const sizeIndex = sizeKeys.indexOf(sizeValue);
    if (sizeIndex === -1) return;
    rotationStatesRef.current[sizeIndex] = angle;
  };

  const handleSizeSelect = (value) => {
    if (value === activeSize) return;
    setPreviousSize(activeSize);
    setActiveSize(value);
  };

  const activeSizeData =
    sizes.find((size) => size.value === activeSize) ?? sizes[0];

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Vollständig Responsive
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            {sizeKeys.map((value, index) => {
              const sizeData = sizes[index];
              if (!sizeData?.bg) {
                throw new Error(
                  `Missing background image for size "${value}". Please define "bg" in sizes.`
                );
              }

              const item = {
                title: sizeData.title ?? DEFAULT_TITLE,
                img: sizeData.bg,
              };

              return (
                <ModelView
                  key={value}
                  gsapId={`view-${value}`}
                  groupRef={groupRefs[index]}
                  controlRef={controlRefs[index]}
                  setRotationState={(angle) => updateRotationState(value, angle)}
                  item={item}
                  size={value}
                />
              );
            })}

            <Canvas
              className="w-full h-full"
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }}
              eventSource={document.getElementById("root")}
            >
              <View.Port />
            </Canvas>
          </div>

          <div className="mx-auto w-full">
            <p className="text-s font-light text-center mb-5">
              {activeSizeData?.title ?? DEFAULT_TITLE}
            </p>

            <div className="flex-center">
              <button className="size-btn-container">
                {sizes.map(({ icon, value }) => (
                  <span
                    key={value}
                    className="size-btn"
                    style={{
                      backgroundColor:
                        activeSize === value ? "#04165e" : "transparent",
                      color: activeSize === value ? "black" : "white",
                    }}
                    onClick={() => handleSizeSelect(value)}
                  >
                    <img
                      src={icon}
                      alt={`${value} icon`}
                      className="h-10 w-10 object-contain"
                    />
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
