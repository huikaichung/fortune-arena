import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface TaijiSceneProps {
  onReady?: () => void;
}

export function TaijiScene({ onReady }: TaijiSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    taiji: THREE.Group;
    particles: THREE.Points;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0f);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Taiji (太極) - 使用兩個半圓組成
    const taiji = new THREE.Group();

    // 白色半圓
    const whiteGeometry = new THREE.CircleGeometry(1.5, 64, 0, Math.PI);
    const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xf5f5f5, side: THREE.DoubleSide });
    const whiteSemi = new THREE.Mesh(whiteGeometry, whiteMaterial);
    whiteSemi.rotation.z = Math.PI / 2;
    taiji.add(whiteSemi);

    // 黑色半圓
    const blackGeometry = new THREE.CircleGeometry(1.5, 64, 0, Math.PI);
    const blackMaterial = new THREE.MeshBasicMaterial({ color: 0x1a1a2e, side: THREE.DoubleSide });
    const blackSemi = new THREE.Mesh(blackGeometry, blackMaterial);
    blackSemi.rotation.z = -Math.PI / 2;
    taiji.add(blackSemi);

    // 小白點 (在黑色區域)
    const whiteSmallGeometry = new THREE.CircleGeometry(0.35, 32);
    const whiteSmall = new THREE.Mesh(whiteSmallGeometry, whiteMaterial);
    whiteSmall.position.y = -0.75;
    whiteSmall.position.z = 0.01;
    taiji.add(whiteSmall);

    // 小黑點 (在白色區域)
    const blackSmallGeometry = new THREE.CircleGeometry(0.35, 32);
    const blackSmall = new THREE.Mesh(blackSmallGeometry, blackMaterial);
    blackSmall.position.y = 0.75;
    blackSmall.position.z = 0.01;
    taiji.add(blackSmall);

    // S曲線分隔 (用兩個小圓弧)
    const curveWhite = new THREE.CircleGeometry(0.375, 32, 0, Math.PI);
    const curveWhiteMesh = new THREE.Mesh(curveWhite, whiteMaterial);
    curveWhiteMesh.position.y = 0.75;
    curveWhiteMesh.position.z = 0.005;
    curveWhiteMesh.rotation.z = Math.PI / 2;
    taiji.add(curveWhiteMesh);

    const curveBlack = new THREE.CircleGeometry(0.375, 32, 0, Math.PI);
    const curveBlackMesh = new THREE.Mesh(curveBlack, blackMaterial);
    curveBlackMesh.position.y = -0.75;
    curveBlackMesh.position.z = 0.005;
    curveBlackMesh.rotation.z = -Math.PI / 2;
    taiji.add(curveBlackMesh);

    // 外圈
    const ringGeometry = new THREE.RingGeometry(1.5, 1.55, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xd4a84b, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    taiji.add(ring);

    scene.add(taiji);

    // Particles (星空背景)
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.03,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    sceneRef.current = { scene, camera, renderer, taiji, particles };

    // Animation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // 太極緩慢旋轉
      taiji.rotation.z += 0.003;
      
      // 粒子緩慢移動
      particles.rotation.y += 0.0005;
      
      renderer.render(scene, camera);
    };
    animate();

    // 延遲後觸發 onReady
    setTimeout(() => onReady?.(), 500);

    // Resize handler
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [onReady]);

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
