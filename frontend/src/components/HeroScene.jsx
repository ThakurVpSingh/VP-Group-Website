import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, Layers, RefreshCw, Cpu, Activity, Zap } from "lucide-react";

const lerp = (a, b, t) => a + (b - a) * t;

export default function HeroScene({ scrollYRef, onModeChange }) {
  const mountRef = useRef(null);
  const [sceneMode, setSceneMode] = useState("quantum"); // quantum | cyber | galaxy
  const [isSpinning, setIsSpinning] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  // Store refs for animation loop access without re-binding
  const modeRef = useRef(sceneMode);
  const spinRef = useRef(isSpinning);

  useEffect(() => { modeRef.current = sceneMode; }, [sceneMode]);
  useEffect(() => { spinRef.current = isSpinning; }, [isSpinning]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // -- Renderer ----------------------------------------------
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    mount.appendChild(renderer.domElement);

    // -- Scene & Camera ----------------------------------------
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0b0f, 0.009);

    const camera = new THREE.PerspectiveCamera(65, mount.clientWidth / mount.clientHeight, 0.1, 400);
    camera.position.set(0, 0, 52);

    // -- Lights ------------------------------------------------
    const ambLight = new THREE.AmbientLight(0x404870, 0.6);
    scene.add(ambLight);

    const pL1 = new THREE.PointLight(0x3dd7e5, 3, 100);
    pL1.position.set(30, 25, 35);
    scene.add(pL1);

    const pL2 = new THREE.PointLight(0x5b6bff, 3.5, 90);
    pL2.position.set(-30, -20, 25);
    scene.add(pL2);

    const pL3 = new THREE.PointLight(0xff3a5c, 2.5, 70);
    pL3.position.set(0, 30, -10);
    scene.add(pL3);

    // -- Container Group for 3D Drag Rotation ------------------
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // ==========================================================
    // 1. QUANTUM CORE MODE OBJECTS
    // ==========================================================
    const quantumGroup = new THREE.Group();
    worldGroup.add(quantumGroup);

    // Central Core Sphere/Icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(7, 2);
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0x5b6bff,
      emissive: 0x1a2255,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
      shininess: 90
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    quantumGroup.add(coreMesh);

    // Inner Glowing Solid
    const innerGeo = new THREE.OctahedronGeometry(4, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x3dd7e5,
      wireframe: false,
      transparent: true,
      opacity: 0.4
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    quantumGroup.add(innerMesh);

    // Outer Torus Knot
    const knotGeo = new THREE.TorusKnotGeometry(14, 0.8, 120, 16);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x3dd7e5,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    quantumGroup.add(knotMesh);

    // Secondary Gyroscope Ring
    const gyroGeo = new THREE.TorusGeometry(20, 0.25, 16, 100);
    const gyroMat = new THREE.MeshBasicMaterial({
      color: 0x2be08c,
      transparent: true,
      opacity: 0.35
    });
    const gyroMesh = new THREE.Mesh(gyroGeo, gyroMat);
    gyroMesh.rotation.x = Math.PI / 3;
    quantumGroup.add(gyroMesh);

    // Floating Polyhedron Orbits
    const solids = [
      { m: new THREE.Mesh(new THREE.IcosahedronGeometry(2.5, 1), new THREE.MeshBasicMaterial({ color: 0x5b6bff, wireframe: true, transparent: true, opacity: 0.4 })), p: [-26, 12, -8], r: [0.01, 0.015, 0.005] },
      { m: new THREE.Mesh(new THREE.TorusKnotGeometry(2, 0.5, 60, 8), new THREE.MeshBasicMaterial({ color: 0x3dd7e5, wireframe: true, transparent: true, opacity: 0.35 })), p: [28, -10, -12], r: [0.008, 0.012, 0.01] },
      { m: new THREE.Mesh(new THREE.DodecahedronGeometry(3, 0), new THREE.MeshBasicMaterial({ color: 0xff3a5c, wireframe: true, transparent: true, opacity: 0.3 })), p: [18, 22, -30], r: [0.005, 0.008, 0.012] },
      { m: new THREE.Mesh(new THREE.TetrahedronGeometry(4, 0), new THREE.MeshBasicMaterial({ color: 0x2be08c, wireframe: true, transparent: true, opacity: 0.25 })), p: [-32, -18, -40], r: [0.004, 0.01, 0.006] },
    ];
    solids.forEach(s => { s.m.position.set(...s.p); quantumGroup.add(s.m); });

    // ==========================================================
    // 2. CYBER MESH MODE OBJECTS
    // ==========================================================
    const cyberGroup = new THREE.Group();
    cyberGroup.visible = false;
    worldGroup.add(cyberGroup);

    const cubeCount = 64;
    const cubeMeshes = [];
    const cubeGeo = new THREE.BoxGeometry(1.8, 1.8, 1.8);
    const cubeMatTemplate = new THREE.MeshStandardMaterial({
      color: 0x3dd7e5,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });

    for (let i = 0; i < cubeCount; i++) {
      const mesh = new THREE.Mesh(cubeGeo, cubeMatTemplate.clone());
      const u = (i % 8) - 3.5;
      const v = Math.floor(i / 8) - 3.5;
      mesh.position.set(u * 7.5, v * 7.5, (Math.random() - 0.5) * 20);
      mesh.userData = {
        origZ: mesh.position.z,
        speed: 0.5 + Math.random() * 1.5,
        offset: Math.random() * Math.PI * 2
      };
      cyberGroup.add(mesh);
      cubeMeshes.push(mesh);
    }

    // Line network connecting grid nodes
    const lineMat = new THREE.LineBasicMaterial({ color: 0x5b6bff, transparent: true, opacity: 0.2 });
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(cubeCount * 6);
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const cyberLines = new THREE.LineSegments(lineGeo, lineMat);
    cyberGroup.add(cyberLines);

    // ==========================================================
    // 3. GALAXY NEBULA PARTICLE SYSTEM (Shared/Adapts per mode)
    // ==========================================================
    const COUNT = 2500;
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const sz  = new Float32Array(COUNT);
    const origPos = new Float32Array(COUNT * 3);

    const palette = [
      new THREE.Color(0x5b6bff),
      new THREE.Color(0x3dd7e5),
      new THREE.Color(0x2be08c),
      new THREE.Color(0xffffff),
      new THREE.Color(0xff3a5c),
      new THREE.Color(0x9333ea)
    ];

    for (let i = 0; i < COUNT; i++) {
      // Spiral vortex galaxy distribution
      const theta = Math.random() * Math.PI * 2 * 3;
      const radius = 5 + Math.random() * 85;
      const armOffset = (i % 3) * ((Math.PI * 2) / 3);
      
      const x = Math.cos(theta + armOffset) * radius + (Math.random() - 0.5) * 6;
      const y = (Math.random() - 0.5) * 60;
      const z = Math.sin(theta + armOffset) * radius * 0.6 + (Math.random() - 0.5) * 70 - 20;

      pos[i * 3]     = origPos[i * 3]     = x;
      pos[i * 3 + 1] = origPos[i * 3 + 1] = y;
      pos[i * 3 + 2] = origPos[i * 3 + 2] = z;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      sz[i] = 0.6 + Math.random() * 2.2;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    pGeo.setAttribute("color",    new THREE.BufferAttribute(col, 3));
    pGeo.setAttribute("size",     new THREE.BufferAttribute(sz,  1));

    const pMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMode: { value: 0.0 } // 0: Quantum, 1: Cyber, 2: Galaxy
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        uniform float uMode;

        void main() {
          vColor = color;
          vec3 p = position;
          
          if (uMode > 1.5) {
            // Galaxy wave expansion
            p.x += sin(uTime * 0.5 + p.z * 0.05) * 2.0;
            p.y += cos(uTime * 0.4 + p.x * 0.05) * 2.0;
          }

          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          float d = -mv.z;
          vAlpha = clamp(1.0 - d / 150.0, 0.08, 1.0) * 0.9;
          gl_PointSize = size * (140.0 / d);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float a = smoothstep(0.5, 0.05, d) * vAlpha;
          gl_FragColor = vec4(vColor, a);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(pGeo, pMat);
    worldGroup.add(particles);

    // ==========================================================
    // 4. FLOATING HORIZON GRID FLOOR
    // ==========================================================
    const grid = new THREE.GridHelper(300, 50, 0x5b6bff, 0x1f2438);
    grid.position.y = -35;
    grid.material.transparent = true;
    grid.material.opacity = 0.22;
    worldGroup.add(grid);

    // ==========================================================
    // MOUSE & DRAG PHYSICS
    // ==========================================================
    const tgt = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let dragStart = { x: 0, y: 0 };
    let rotTarget = { x: 0, y: 0 };
    let rotCurrent = { x: 0, y: 0 };

    const onPointerMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      tgt.x = ((clientX / window.innerWidth) * 2 - 1) * 6;
      tgt.y = (-(clientY / window.innerHeight) * 2 + 1) * 4;

      if (isDragging) {
        const deltaX = (clientX - dragStart.x) * 0.006;
        const deltaY = (clientY - dragStart.y) * 0.006;
        rotTarget.y += deltaX;
        rotTarget.x += deltaY;
        dragStart = { x: clientX, y: clientY };
      }
    };

    const onPointerDown = (e) => {
      if (e.target.closest('.hero-hud-control')) return;
      setIsDragging(true);
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      dragStart = { x: clientX, y: clientY };
    };

    const onPointerUp = () => setIsDragging(false);

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

    // -- Resize Handler ----------------------------------------
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // -- Animation Loop ----------------------------------------
    let rafId;
    const tick = (time) => {
      rafId = requestAnimationFrame(tick);
      const t = time * 0.001;
      pMat.uniforms.uTime.value = t;

      // Mode switching uniforms & visibilities
      const currentMode = modeRef.current;
      quantumGroup.visible = currentMode === "quantum";
      cyberGroup.visible = currentMode === "cyber";
      pMat.uniforms.uMode.value = currentMode === "quantum" ? 0.0 : currentMode === "cyber" ? 1.0 : 2.0;

      // Damped mouse follow
      cur.x = lerp(cur.x, tgt.x, 0.05);
      cur.y = lerp(cur.y, tgt.y, 0.05);

      // Rotational physics
      rotCurrent.x = lerp(rotCurrent.x, rotTarget.x, 0.08);
      rotCurrent.y = lerp(rotCurrent.y, rotTarget.y, 0.08);

      worldGroup.rotation.x = rotCurrent.x;
      worldGroup.rotation.y = rotCurrent.y;

      // Camera parallax positioning
      const scrollZ = (scrollYRef?.current ?? 0) * 0.045;
      camera.position.x = cur.x;
      camera.position.y = cur.y;
      camera.position.z = 52 - scrollZ;
      camera.lookAt(cur.x * 0.06, cur.y * 0.06, camera.position.z - 10);

      // Auto rotation when spin enabled
      if (spinRef.current) {
        if (currentMode === "quantum") {
          coreMesh.rotation.y += 0.008;
          coreMesh.rotation.x += 0.004;
          innerMesh.rotation.y -= 0.012;
          knotMesh.rotation.y += 0.006;
          knotMesh.rotation.z += 0.003;
          gyroMesh.rotation.z += 0.004;
          solids.forEach(s => {
            s.m.rotation.x += s.r[0];
            s.m.rotation.y += s.r[1];
            s.m.rotation.z += s.r[2];
          });
        } else if (currentMode === "cyber") {
          cyberGroup.rotation.y += 0.003;
          cubeMeshes.forEach(cube => {
            cube.position.z = cube.userData.origZ + Math.sin(t * cube.userData.speed + cube.userData.offset) * 4;
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
          });
        } else if (currentMode === "galaxy") {
          particles.rotation.y += 0.0018;
          particles.rotation.z = Math.sin(t * 0.2) * 0.08;
        }
      }

      // Dynamic light intensity pulsation
      pL1.intensity = 2.5 + Math.sin(t * 1.6) * 0.8;
      pL2.intensity = 3.0 + Math.cos(t * 1.1) * 0.7;
      pL3.intensity = 2.0 + Math.sin(t * 2.1) * 0.5;

      pL1.position.x = 30 + Math.sin(t * 0.8) * 10;
      pL2.position.y = -20 + Math.cos(t * 0.7) * 10;

      renderer.render(scene, camera);
    };

    rafId = requestAnimationFrame(tick);

    // -- Cleanup -----------------------------------------------
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", onResize);

      pGeo.dispose(); pMat.dispose();
      coreGeo.dispose(); coreMat.dispose();
      innerGeo.dispose(); innerMat.dispose();
      knotGeo.dispose(); knotMat.dispose();
      gyroGeo.dispose(); gyroMat.dispose();
      solids.forEach(s => { s.m.geometry.dispose(); s.m.material.dispose(); });
      cubeGeo.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  const handleModeSwitch = (e, newMode) => {
    if (e) e.stopPropagation();
    setSceneMode(newMode);
    if (onModeChange) onModeChange(newMode);
  };

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden" }}>
      {/* Three.js Canvas Container */}
      <div ref={mountRef} style={{ width: "100%", height: "100%", pointerEvents: "none" }} />

      {/* Interactive HUD Control Pill (Bottom-Right) */}
      <div 
        className="hero-hud-control"
        style={{
          position: "absolute",
          bottom: "32px",
          right: "32px",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "rgba(10, 12, 20, 0.75)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(91, 107, 255, 0.25)",
          borderRadius: "40px",
          padding: "8px 14px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(91, 107, 255, 0.15)",
          pointerEvents: "auto",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      >
        {/* Mode Buttons */}
        <div style={{ display: "flex", gap: "6px" }}>
          {[
            { id: "quantum", label: "Quantum", icon: Cpu, color: "#5B6BFF" },
            { id: "cyber", label: "Cyber Mesh", icon: Layers, color: "#3DD7E5" },
            { id: "galaxy", label: "Galaxy", icon: Sparkles, color: "#2BE08C" }
          ].map((mode) => {
            const Icon = mode.icon;
            const active = sceneMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={(e) => handleModeSwitch(e, mode.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: active ? `linear-gradient(135deg, ${mode.color}22, rgba(255,255,255,0.05))` : "transparent",
                  border: active ? `1px solid ${mode.color}` : "1px solid transparent",
                  color: active ? "#ffffff" : "#94a3b8",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  boxShadow: active ? `0 0 12px ${mode.color}40` : "none"
                }}
              >
                <Icon size={13} color={active ? mode.color : "#94a3b8"} />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>

        <div style={{ width: "1px", height: "18px", background: "rgba(255,255,255,0.15)", margin: "0 2px" }} />

        {/* Auto-Spin Toggle */}
        <button
          onClick={() => setIsSpinning(!isSpinning)}
          title="Toggle 3D Orbit Spin"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: isSpinning ? "rgba(91, 107, 255, 0.2)" : "rgba(255,255,255,0.05)",
            border: `1px solid ${isSpinning ? "#5B6BFF" : "rgba(255,255,255,0.1)"}`,
            color: isSpinning ? "#5B6BFF" : "#64748b",
            cursor: "pointer",
            transition: "all 0.25s ease"
          }}
        >
          <RefreshCw size={13} style={{ animation: isSpinning ? "spin 6s linear infinite" : "none" }} />
        </button>

        {/* Drag Hint indicator */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.6rem",
          color: isDragging ? "#3DD7E5" : "#64748b",
          paddingLeft: "4px",
          textTransform: "uppercase",
          letterSpacing: "1px"
        }}>
          <Activity size={12} className={isDragging ? "animate-pulse" : ""} />
          <span>{isDragging ? "DRAGGING 3D" : "DRAG TO ROTATE"}</span>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
