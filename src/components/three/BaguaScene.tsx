import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { Hexagram } from '../../types/hexagram';

interface BaguaSceneProps {
  hexagram: Hexagram | null;
  onComplete?: () => void;
}

// 八卦符號對應的二進制 (陽爻=1, 陰爻=0)
const TRIGRAM_BINARY: Record<string, [number, number, number]> = {
  '乾': [1, 1, 1],  // ☰
  '兌': [1, 1, 0],  // ☱
  '離': [1, 0, 1],  // ☲
  '震': [1, 0, 0],  // ☳
  '巽': [0, 1, 1],  // ☴
  '坎': [0, 1, 0],  // ☵
  '艮': [0, 0, 1],  // ☶
  '坤': [0, 0, 0],  // ☷
};

export function BaguaScene({ hexagram, onComplete }: BaguaSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0f);

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 八卦盤 (八個卦象圍成圓形)
    const baguaGroup = new THREE.Group();
    const baguaRadius = 3;
    const trigramSymbols = ['乾', '巽', '坎', '艮', '坤', '震', '離', '兌'];
    
    trigramSymbols.forEach((name, i) => {
      const angle = (i * Math.PI * 2) / 8 - Math.PI / 2;
      const x = Math.cos(angle) * baguaRadius;
      const y = Math.sin(angle) * baguaRadius;
      
      // 創建卦象符號 (用 3 條線表示)
      const trigramGroup = new THREE.Group();
      const binary = TRIGRAM_BINARY[name];
      
      binary.forEach((isYang, lineIndex) => {
        const yOffset = (1 - lineIndex) * 0.3;
        
        if (isYang) {
          // 陽爻：實線
          const geometry = new THREE.PlaneGeometry(0.6, 0.08);
          const material = new THREE.MeshBasicMaterial({ color: 0xd4a84b });
          const line = new THREE.Mesh(geometry, material);
          line.position.y = yOffset;
          trigramGroup.add(line);
        } else {
          // 陰爻：兩段虛線
          const geometry = new THREE.PlaneGeometry(0.25, 0.08);
          const material = new THREE.MeshBasicMaterial({ color: 0xd4a84b });
          const left = new THREE.Mesh(geometry, material);
          left.position.set(-0.17, yOffset, 0);
          trigramGroup.add(left);
          
          const right = new THREE.Mesh(geometry, material);
          right.position.set(0.17, yOffset, 0);
          trigramGroup.add(right);
        }
      });
      
      trigramGroup.position.set(x, y, 0);
      baguaGroup.add(trigramGroup);
    });

    // 中心太極小圖
    const centerGeometry = new THREE.CircleGeometry(0.5, 32);
    const centerMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x1a1a2e,
      transparent: true,
      opacity: 0.8
    });
    const center = new THREE.Mesh(centerGeometry, centerMaterial);
    baguaGroup.add(center);

    scene.add(baguaGroup);

    // 六爻顯示區域
    const hexagramGroup = new THREE.Group();
    hexagramGroup.position.set(0, -0.5, 1);
    scene.add(hexagramGroup);

    // Particles
    const particleCount = 300;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5 - 3;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xd4a84b,
      size: 0.02,
      transparent: true,
      opacity: 0.4,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Animation
    let rotationSpeed = 0.02;
    let animationId: number;
    let startTime = Date.now();
    
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      const elapsed = Date.now() - startTime;
      
      // 八卦盤旋轉 (開始快，然後減速)
      if (elapsed < 3000) {
        rotationSpeed = Math.max(0.002, 0.02 - elapsed * 0.000006);
      }
      baguaGroup.rotation.z += rotationSpeed;
      
      // 粒子
      particles.rotation.y += 0.001;
      
      renderer.render(scene, camera);
    };
    animate();

    // 逐一顯示六爻
    if (hexagram) {
      const upperBinary = TRIGRAM_BINARY[hexagram.upperTrigram.name] || [1, 1, 1];
      const lowerBinary = TRIGRAM_BINARY[hexagram.lowerTrigram.name] || [0, 0, 0];
      const allLines = [...lowerBinary, ...upperBinary]; // 從下到上

      // 清除舊的
      while (hexagramGroup.children.length > 0) {
        hexagramGroup.remove(hexagramGroup.children[0]);
      }

      let lineIndex = 0;
      const interval = setInterval(() => {
        if (lineIndex >= 6) {
          clearInterval(interval);
          setTimeout(() => onComplete?.(), 1000);
          return;
        }

        const isYang = allLines[lineIndex] === 1;
        const yOffset = (lineIndex - 2.5) * 0.4;
        const isChanging = hexagram.changingLine === lineIndex + 1;

        if (isYang) {
          const geometry = new THREE.PlaneGeometry(1.2, 0.12);
          const material = new THREE.MeshBasicMaterial({ 
            color: isChanging ? 0xc73e3e : 0xd4a84b 
          });
          const line = new THREE.Mesh(geometry, material);
          line.position.y = yOffset;
          hexagramGroup.add(line);
        } else {
          const geometry = new THREE.PlaneGeometry(0.5, 0.12);
          const material = new THREE.MeshBasicMaterial({ 
            color: isChanging ? 0xc73e3e : 0xd4a84b 
          });
          const left = new THREE.Mesh(geometry, material);
          left.position.set(-0.35, yOffset, 0);
          hexagramGroup.add(left);

          const right = new THREE.Mesh(geometry, material);
          right.position.set(0.35, yOffset, 0);
          hexagramGroup.add(right);
        }

        lineIndex++;
      }, 500);

      return () => {
        clearInterval(interval);
        cancelAnimationFrame(animationId);
        renderer.dispose();
        container.removeChild(renderer.domElement);
      };
    }

    // Resize
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [hexagram, onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    />
  );
}
