import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Scene() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 6;

    const group = new THREE.Group();
    const outer = new THREE.Mesh(new THREE.IcosahedronGeometry(1.8, 1), new THREE.MeshBasicMaterial({ color: 0x7c5cff, wireframe: true }));
    const inner = new THREE.Mesh(new THREE.OctahedronGeometry(0.9, 0), new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true }));
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.012, 8, 120), new THREE.MeshBasicMaterial({ color: 0xa5b4fc }));
    ring.rotation.x = Math.PI / 2.4;
    group.add(outer, inner, ring);
    scene.add(group);

    const n = 600, pos = new Float32Array(n * 3);
    for (let i = 0; i < pos.length; i++) pos[i] = (Math.random() - 0.5) * 18;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const stars = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.03, color: 0xa5b4fc }));
    scene.add(stars);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = el;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      group.position.x = w > 800 ? 2.2 : 0;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const mouse = { x: 0, y: 0 };
    const onMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove);

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf;
    const tick = (t) => {
      const s = t * 0.001;
      if (!still) {
        outer.rotation.set(s * 0.25, s * 0.35, 0);
        inner.rotation.set(-s * 0.5, s * 0.4, 0);
        ring.rotation.z = s * 0.2;
        stars.rotation.y = s * 0.02;
      }
      group.rotation.y += (mouse.x * 0.4 - group.rotation.y) * 0.04;
      group.rotation.x += (mouse.y * 0.3 - group.rotation.x) * 0.04;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      geo.dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);
  return <div className="scene" ref={ref} aria-hidden="true" />;
}
