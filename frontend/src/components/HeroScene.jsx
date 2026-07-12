import { useEffect, useRef } from "react";
import * as THREE from "three";

const lerp = (a, b, t) => a + (b - a) * t;

export default function HeroScene({ scrollYRef }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // -- Renderer ----------------------------------------------
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // -- Scene & Camera ----------------------------------------
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0b0f, 0.011);

    const camera = new THREE.PerspectiveCamera(70, mount.clientWidth / mount.clientHeight, 0.1, 300);
    camera.position.set(0, 0, 50);

    // -- Lights ------------------------------------------------
    scene.add(new THREE.AmbientLight(0x5b6bff, 0.3));
    const pL1 = new THREE.PointLight(0x3dd7e5, 2, 80);
    pL1.position.set(20, 20, 30);
    scene.add(pL1);
    const pL2 = new THREE.PointLight(0xff3a5c, 1.2, 60);
    pL2.position.set(-20, -10, 10);
    scene.add(pL2);

    // -- Particles ---------------------------------------------
    const COUNT = 1200;
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const sz  = new Float32Array(COUNT);
    const palette = [
      new THREE.Color(0x5b6bff), new THREE.Color(0x3dd7e5),
      new THREE.Color(0x2be08c), new THREE.Color(0xffffff), new THREE.Color(0xff3a5c)
    ];
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 20 + Math.random() * 60;
      pos[i*3]   = Math.cos(theta) * r * (0.5 + Math.random() * 0.5);
      pos[i*3+1] = (Math.random() - 0.5) * 80;
      pos[i*3+2] = -Math.random() * 120;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b;
      sz[i] = 0.5 + Math.random() * 1.8;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    pGeo.setAttribute("color",    new THREE.BufferAttribute(col, 3));
    pGeo.setAttribute("size",     new THREE.BufferAttribute(sz,  1));
    const pMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        attribute float size; attribute vec3 color;
        varying vec3 vColor; varying float vAlpha;
        uniform float uTime;
        void main() {
          vColor = color;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          float d = -mv.z;
          vAlpha = clamp(1.0 - d / 120.0, 0.05, 1.0) * 0.85;
          gl_PointSize = size * (120.0 / d);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        varying vec3 vColor; varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float a = smoothstep(0.5, 0.1, d) * vAlpha;
          gl_FragColor = vec4(vColor, a);
        }`,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // -- Wireframe solids --------------------------------------
    const wMat = (hex, op) => new THREE.MeshBasicMaterial({ color: hex, wireframe: true, transparent: true, opacity: op });
    const solids = [
      { m: new THREE.Mesh(new THREE.IcosahedronGeometry(4,1), wMat(0x5b6bff,0.22)), p:[-28,8,-8],   r:[0.003,0.005,0.002] },
      { m: new THREE.Mesh(new THREE.TorusKnotGeometry(3.5,0.8,80,12), wMat(0x3dd7e5,0.16)), p:[32,-6,-15],  r:[0.004,0.002,0.006] },
      { m: new THREE.Mesh(new THREE.OctahedronGeometry(6,0),  wMat(0xff3a5c,0.10)), p:[18,20,-45],  r:[0.002,0.004,0.001] },
      { m: new THREE.Mesh(new THREE.IcosahedronGeometry(7,1), wMat(0x2be08c,0.08)), p:[-40,-18,-60],r:[0.001,0.003,0.004] },
      { m: new THREE.Mesh(new THREE.TorusKnotGeometry(8,1.5,60,8), wMat(0x5b6bff,0.05)), p:[-10,-5,-100],r:[0.0015,0.003,0.001] }
    ];
    solids.forEach(s => { s.m.position.set(...s.p); scene.add(s.m); });

    // -- Grid --------------------------------------------------
    const grid = new THREE.GridHelper(200, 40, 0x2a2d38, 0x1a1c24);
    grid.position.y = -30;
    grid.material.transparent = true; grid.material.opacity = 0.25;
    scene.add(grid);

    // -- Mouse -------------------------------------------------
    const tgt = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
    const onMM = (e) => {
      tgt.x = ((e.clientX / window.innerWidth) * 2 - 1) * 5;
      tgt.y = (-(e.clientY / window.innerHeight) * 2 + 1) * 3;
    };
    window.addEventListener("mousemove", onMM);

    // -- Resize ------------------------------------------------
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // -- Animate -----------------------------------------------
    let rafId, last = 0;
    const tick = (time) => {
      rafId = requestAnimationFrame(tick);
      last = time;
      const t = time * 0.001;
      pMat.uniforms.uTime.value = t;

      cur.x = lerp(cur.x, tgt.x, 0.055);
      cur.y = lerp(cur.y, tgt.y, 0.055);

      const scrollZ = (scrollYRef?.current ?? 0) * 0.045;
      camera.position.x = cur.x;
      camera.position.y = cur.y;
      camera.position.z = 50 - scrollZ;
      camera.lookAt(cur.x * 0.08, cur.y * 0.08, camera.position.z - 10);

      solids.forEach(s => { s.m.rotation.x += s.r[0]; s.m.rotation.y += s.r[1]; s.m.rotation.z += s.r[2]; });
      particles.rotation.y += 0.00012;
      particles.rotation.x = Math.sin(t * 0.07) * 0.018;

      pL1.intensity = 1.5 + Math.sin(t * 1.4) * 0.5;
      pL2.intensity = 0.8 + Math.cos(t * 0.9) * 0.4;

      renderer.render(scene, camera);
    };
    rafId = requestAnimationFrame(tick);

    // -- Cleanup -----------------------------------------------
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMM);
      window.removeEventListener("resize", onResize);
      pGeo.dispose(); pMat.dispose();
      solids.forEach(s => { s.m.geometry.dispose(); s.m.material.dispose(); });
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }} />
  );
}
