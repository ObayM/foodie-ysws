'use client';

import React, { useRef, useMemo, useState, useEffect} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Image from 'next/image';

function BackgroundShaders() {
  const material = useRef(null);

  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#FEFEFA') }, 
      uColor2: { value: new THREE.Color('#F0F8FF') },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      varying vec2 vUv;

      float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.y * u.x;
      }
      
      float fbm(vec2 st) {
          float value = 0.0;
          float amplitude = 0.5;

          for (int i = 0; i < 4; i++) {
              value += amplitude * noise(st);
              st *= 2.0;
              amplitude *= 0.5;
          }
          return value;
      }

      void main() {
        vec2 st = vUv * 1.0;


        float slowTime = uTime * 0.02;

        float noisePattern = fbm(st + slowTime);

        float mixFactor = smoothstep(0.3, 0.7, noisePattern);
        vec3 color = mix(uColor1, uColor2, mixFactor);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `
  }), []);

  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={material} args={[shaderArgs]} />
    </mesh>
  );
}


export default function Background() {
const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 


  const style1 = {
    transition: 'transform 0.1s linear', 
    transform: `translateY(${scrollY * 0.05}px) rotate(${6 + scrollY * 0.01}deg)` //sushi
  };
  
  const style2 = {
    transition: 'transform 0.1s linear',
    transform: `translateY(${scrollY * 0.05}px) rotate(${12 - scrollY * 0.02}deg)` //burger
  };
  
  const style3 = {
    transition: 'transform 0.1s linear',
    transform: `translateY(${scrollY * -0.05}px) rotate(${8 + scrollY * 0.015}deg)` // pizza
  };
  
  const style4 = {
    transition: 'transform 0.1s linear',
    transform: `translateY(${scrollY * -0.05}px) rotate(${10 - scrollY * 0.01}deg)` //shawwerma
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-20">
      
      <Image style={style1} className="absolute top-1/8 left-1/12 z-1" width={240} height={240} alt="sushi" src={"/sushi.png"}/>
      <Image style={style2} className="absolute top-1/7 right-1/14 z-1" width={240} height={240} alt="burger" src={"/burger.png"}/>
      <Image style={style3} className="absolute bottom-1/9 left-1/15 z-1" width={240} height={240} alt="pizza" src={"/pizza.png"}/>
      <Image style={style4} className="absolute bottom-1/10 right-1/16 z-1" width={240} height={240} alt="shawwerma" src={"/shawwerma.png"}/>
      
      <Canvas>
        <BackgroundShaders />
    </Canvas>
  </div>
  );
}