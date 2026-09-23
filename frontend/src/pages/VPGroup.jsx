import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getApiUrl } from '../config';
import { submitContactForm } from '../services/formService';
import { 
  ArrowRight, 
  ExternalLink,
  Users,
  Terminal,
  Shield,
  Layers,
  Globe,
  MapPin,
  Mail,
  Phone,
  Sparkles,
  Cpu,
  ShieldCheck,
  Activity,
  Zap,
  Play,
  RefreshCw,
  Plug,
  Puzzle,
  Boxes,
  Workflow,
  Briefcase
} from 'lucide-react';
import ProjectNavbar from '../components/ProjectNavbar';
import Footer from '../components/Footer';
import HeroScene from '../components/HeroScene';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const H = { font: "'Inter', sans-serif", mono: "'JetBrains Mono', ui-monospace, monospace" };

const SystemVisualization = ({ scrollY }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Mouse coordinates with damping
  const targetMousePosRef = useRef({ x: -9999, y: -9999 });
  const currentMousePosRef = useRef({ x: -9999, y: -9999 });

  // Mode state variables
  const driftItemsRef = useRef([]);
  const memoryCellsRef = useRef({});
  const packetsRef = useRef([]);
  
  // Performance mode variables
  const waveOffsetRef = useRef(0);
  const chartDataRef = useRef(Array.from({ length: 80 }, () => 40 + Math.random() * 20));
  
  // Security mode variables
  const secPacketsRef = useRef([]);
  const secLogsRef = useRef([
    '[SEC_GATEWAY] MONITORING PORT 443...',
    '[SEC_GATEWAY] ZERO-TRUST ACTIVE',
    '[SEC_GATEWAY] BOOT PROTOCOL: COMPLETE'
  ]);
  const lastLogTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId;

    const resizeCanvas = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const w = Math.max(100, canvas.width / window.devicePixelRatio);
    const h = Math.max(100, canvas.height / window.devicePixelRatio);

    // Initialize floating syntax/registry items (using light grey/blue for dark theme)
    const vocab = [
      '0xFF', '0x7E', '0x2C', '0x00', '0xAD', '0xDE', '0xBE', '0xEF',
      'const', 'await', 'async', 'import', 'return', 'class', 'fetch', '=>',
      '0101', '1100', '1010', '0011', 'alloc()', 'sync()', 'push()', 'ack'
    ];
    driftItemsRef.current = Array.from({ length: 25 }, () => ({
      text: vocab[Math.floor(Math.random() * vocab.length)],
      x: Math.random() * w,
      y: Math.random() * h,
      speed: 0.25 + Math.random() * 0.35,
      opacity: 0.05 + Math.random() * 0.1,
      size: 9 + Math.floor(Math.random() * 4)
    }));

    // Initialize servers/nodes
    const nodes = [
      { id: 'A', name: 'Cloud Hub', x: 0.15, y: 0.3 },
      { id: 'B', name: 'Database', x: 0.82, y: 0.25 },
      { id: 'C', name: 'Auth Server', x: 0.48, y: 0.72 },
      { id: 'D', name: 'RAG Pipeline', x: 0.28, y: 0.8 },
      { id: 'E', name: 'API Server', x: 0.76, y: 0.84 }
    ];

    const paths = [
      { from: 'A', to: 'E' },
      { from: 'E', to: 'C' },
      { from: 'C', to: 'D' },
      { from: 'D', to: 'A' },
      { from: 'B', to: 'E' },
      { from: 'B', to: 'A' }
    ];

    // Seed packets
    const packetLabels = ['[DATA]', '[SYN]', '[ACK]', '[JSON]', '[TOKEN]', '[IP]', '[GET]'];
    packetsRef.current = Array.from({ length: 8 }, () => {
      const path = paths[Math.floor(Math.random() * paths.length)];
      return {
        path,
        progress: Math.random(),
        speed: 0.0025 + Math.random() * 0.003,
        color: ['#ff3a5c', '#5b6bff', '#3dd7e5', '#2be08c', '#f5d547'][Math.floor(Math.random() * 5)],
        label: packetLabels[Math.floor(Math.random() * packetLabels.length)]
      };
    });

    const addLog = (logMsg) => {
      const date = new Date();
      const timeStr = date.toTimeString().split(' ')[0];
      secLogsRef.current.push(`[${timeStr}] ${logMsg}`);
      if (secLogsRef.current.length > 6) {
        secLogsRef.current.shift();
      }
    };

    const animate = (time) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.bottom < 0) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const wCurr = Math.max(100, rect.width);
      const hCurr = Math.max(100, rect.height);
      const dpr = window.devicePixelRatio;

      // Handle resizing if bounds change
      if (canvas.style.width !== `${rect.width}px` || canvas.style.height !== `${rect.height}px`) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, wCurr, hCurr);

      // Smoothly update current mouse position (liquid damping)
      const targetMouse = targetMousePosRef.current;
      const currentMouse = currentMousePosRef.current;
      if (targetMouse.x === -9999) {
        currentMouse.x = -9999;
        currentMouse.y = -9999;
      } else {
        if (currentMouse.x === -9999) {
          currentMouse.x = targetMouse.x;
          currentMouse.y = targetMouse.y;
        } else {
          currentMouse.x += (targetMouse.x - currentMouse.x) * 0.08;
          currentMouse.y += (targetMouse.y - currentMouse.y) * 0.08;
        }
      }

      // Determine visualizer mode based on scroll height
      // SYSTEM (0 to 700), PERFORMANCE (700 to 1800), SECURITY (> 1800)
      const currentMode = scrollY < 700 ? 'SYSTEM' : (scrollY < 1900 ? 'PERFORMANCE' : 'SECURITY');

      // 3D Parallax shift multipliers
      const dxParallax = currentMouse.x === -9999 ? 0 : (currentMouse.x - wCurr / 2) * 0.04;
      const dyParallax = currentMouse.y === -9999 ? 0 : (currentMouse.y - hCurr / 2) * 0.04;

      if (currentMode === 'SYSTEM') {
        // ── MODE: SYSTEM OPERATIONS ───────────────────────────
        
        // 1. Grid (Parallax Layer 1)
        ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.scale(dpr, dpr);
        ctx.translate(dxParallax * 0.3, dyParallax * 0.3);

        const cellSize = wCurr < 768 ? 20 : 35;
        const cols = Math.ceil(wCurr / cellSize) + 2;
        const rows = Math.ceil(hCurr / cellSize) + 2;

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        for (let c = -1; c <= cols; c++) {
          ctx.moveTo(c * cellSize, -cellSize);
          ctx.lineTo(c * cellSize, hCurr + cellSize);
        }
        for (let r = -1; r <= rows; r++) {
          ctx.moveTo(-cellSize, r * cellSize);
          ctx.lineTo(wCurr + cellSize, r * cellSize);
        }
        ctx.stroke();

        // Random memory allocations
        if (Math.random() < 0.04) {
          const c = Math.floor(Math.random() * cols);
          const r = Math.floor(Math.random() * rows);
          const key = `${c},${r}`;
          if (!memoryCellsRef.current[key]) {
            memoryCellsRef.current[key] = {
              glow: 0,
              targetGlow: 0.15 + Math.random() * 0.3,
              phase: 'in',
              color: ['rgba(91,107,255,', 'rgba(255,58,92,', 'rgba(61,215,229,'][Math.floor(Math.random() * 3)]
            };
          }
        }

        // Mouse grid allocation triggers
        if (currentMouse.x !== -9999) {
          const mc = Math.floor((currentMouse.x - dxParallax * 0.3) / cellSize);
          const mr = Math.floor((currentMouse.y - dyParallax * 0.3) / cellSize);
          for (let dc = -1; dc <= 1; dc++) {
            for (let dr = -1; dr <= 1; dr++) {
              const tc = mc + dc;
              const tr = mr + dr;
              if (tc >= 0 && tc < cols && tr >= 0 && tr < rows) {
                const key = `${tc},${tr}`;
                const distFactor = 1 - (Math.abs(dc) + Math.abs(dr)) * 0.3;
                if (Math.random() < 0.3) {
                  if (!memoryCellsRef.current[key] || memoryCellsRef.current[key].glow < distFactor * 0.4) {
                    memoryCellsRef.current[key] = {
                      glow: distFactor * 0.3,
                      targetGlow: distFactor * 0.5,
                      phase: 'hold',
                      color: 'rgba(91,107,255,'
                    };
                  }
                }
              }
            }
          }
        }

        // Draw cells
        Object.keys(memoryCellsRef.current).forEach((key) => {
          const cell = memoryCellsRef.current[key];
          if (!cell) return;
          const [cStr, rStr] = key.split(',');
          const col = parseInt(cStr);
          const row = parseInt(rStr);

          if (cell.phase === 'in') {
            cell.glow += 0.015;
            if (cell.glow >= cell.targetGlow) cell.phase = 'out';
          } else if (cell.phase === 'hold') {
            cell.glow -= 0.005;
            if (cell.glow <= cell.targetGlow * 0.6) cell.phase = 'out';
          } else {
            cell.glow -= 0.008;
            if (cell.glow <= 0) {
              delete memoryCellsRef.current[key];
              return;
            }
          }
          ctx.fillStyle = `${cell.color}${cell.glow.toFixed(3)})`;
          ctx.fillRect(col * cellSize + 1, row * cellSize + 1, cellSize - 1, cellSize - 1);
        });

        // 2. Wires & Hubs (Parallax Layer 2)
        ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.scale(dpr, dpr);
        ctx.translate(dxParallax * 0.7, dyParallax * 0.7);

        const calculatedNodes = nodes.map(n => ({
          id: n.id,
          name: n.name,
          x: n.x * wCurr,
          y: n.y * hCurr
        }));

        // Draw connections
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
        ctx.lineWidth = 1;
        paths.forEach((path) => {
          const fromNode = calculatedNodes.find(n => n.id === path.from);
          const toNode = calculatedNodes.find(n => n.id === path.to);
          if (fromNode && toNode) {
            ctx.beginPath();
            ctx.moveTo(fromNode.x, fromNode.y);
            ctx.lineTo(toNode.x, toNode.y);
            ctx.stroke();
          }
        });

        // Draw hubs
        calculatedNodes.forEach((node) => {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
          ctx.beginPath(); ctx.arc(node.x, node.y, 16, 0, Math.PI * 2); ctx.stroke();
          ctx.beginPath(); ctx.arc(node.x, node.y, 8, 0, Math.PI * 2); ctx.stroke();
          ctx.beginPath(); ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.fill();

          ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.font = `800 6.5px ${H.mono}`;
          ctx.textAlign = 'center';
          ctx.fillText(node.name.toUpperCase(), node.x, node.y - 12);
        });

        // 3. Floating syntax & hex codes (Parallax Layer 3)
        ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.scale(dpr, dpr);
        ctx.translate(dxParallax * 1.1, dyParallax * 1.1);

        const items = driftItemsRef.current;
        items.forEach((item) => {
          if (!item) return;
          item.y += item.speed;
          if (item.y > hCurr) {
            item.y = -20;
            item.x = Math.random() * wCurr;
          }

          if (currentMouse.x !== -9999) {
            const dx = item.x - (currentMouse.x - dxParallax * 1.1);
            const dy = item.y - (currentMouse.y - dyParallax * 1.1);
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 0 && dist < 90) {
              const force = (90 - dist) / 90;
              item.x += (dx / dist) * force * 2.5;
            }
          }

          ctx.fillStyle = `rgba(255, 255, 255, ${item.opacity.toFixed(3)})`;
          ctx.font = `500 ${item.size}px ${H.mono}`;
          ctx.fillText(item.text, item.x, item.y);
        });

        // 4. Packet Pulses (Parallax Layer 4)
        ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.scale(dpr, dpr);
        ctx.translate(dxParallax * 1.4, dyParallax * 1.4);

        const packets = packetsRef.current;
        packets.forEach((pkt) => {
          if (!pkt || !pkt.path) return;
          const fromNode = calculatedNodes.find(n => n.id === pkt.path.from);
          const toNode = calculatedNodes.find(n => n.id === pkt.path.to);
          if (!fromNode || !toNode) return;

          pkt.progress += pkt.speed;
          if (pkt.progress >= 1) {
            pkt.progress = 0;
            pkt.speed = 0.0025 + Math.random() * 0.003;
            pkt.path = paths[Math.floor(Math.random() * paths.length)];
          }

          const px = fromNode.x + (toNode.x - fromNode.x) * pkt.progress;
          const py = fromNode.y + (toNode.y - fromNode.y) * pkt.progress;

          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = pkt.color;
          ctx.fill();

          ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
          ctx.font = `700 5.5px ${H.mono}`;
          ctx.textAlign = 'left';
          ctx.fillText(pkt.label, px + 5, py + 2);
        });

      } else if (currentMode === 'PERFORMANCE') {
        // ── MODE: PERFORMANCE WAVES & DATA GRAPHS ──────────────
        
        ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.scale(dpr, dpr);
        ctx.translate(dxParallax * 0.6, dyParallax * 0.6);

        // Draw real-time background wave grid
        ctx.strokeStyle = 'rgba(91, 107, 255, 0.015)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x < wCurr; x += 40) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, hCurr);
        }
        for (let y = 0; y < hCurr; y += 40) {
          ctx.moveTo(0, y);
          ctx.lineTo(wCurr, y);
        }
        ctx.stroke();

        // Update wave offset
        waveOffsetRef.current += 0.02;

        // Render 3 running sinusoids
        const waves = [
          { color: 'rgba(91, 107, 255, 0.08)', amp: 35, freq: 0.004, speed: 0.8 },
          { color: 'rgba(61, 215, 229, 0.06)', amp: 20, freq: 0.007, speed: 1.2 },
          { color: 'rgba(255, 58, 92, 0.05)', amp: 15, freq: 0.011, speed: 0.6 }
        ];

        waves.forEach((w) => {
          ctx.strokeStyle = w.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          for (let x = 0; x < wCurr; x += 5) {
            const y = (hCurr * 0.4) + Math.sin(x * w.freq + waveOffsetRef.current * w.speed) * w.amp;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        });

        // Live Transaction Peak Line Chart (center-bottom)
        const chartY = hCurr * 0.7;
        const chartH = 120;
        const chartW = Math.min(600, wCurr - 48);
        const chartX = (wCurr - chartW) / 2;

        // Update chart data points
        if (Math.random() < 0.2) {
          const lastVal = chartDataRef.current[chartDataRef.current.length - 1];
          const newVal = Math.max(10, Math.min(100, lastVal + (Math.random() - 0.5) * 16));
          chartDataRef.current.push(newVal);
          chartDataRef.current.shift();
        }

        // Draw chart background area
        ctx.fillStyle = 'rgba(20, 21, 28, 0.6)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(chartX, chartY - chartH, chartW, chartH, 8);
        ctx.fill();
        ctx.stroke();

        // Draw chart grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.01)';
        ctx.beginPath();
        for (let i = 1; i < 4; i++) {
          const y = chartY - (chartH / 4) * i;
          ctx.moveTo(chartX, y);
          ctx.lineTo(chartX + chartW, y);
        }
        ctx.stroke();

        // Draw line chart
        const data = chartDataRef.current;
        const step = chartW / (data.length - 1);
        ctx.strokeStyle = '#5b6bff';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        data.forEach((val, idx) => {
          const x = chartX + idx * step;
          const y = chartY - (val / 100) * (chartH - 20) - 10;
          if (idx === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Gradient fill under the line
        const grad = ctx.createLinearGradient(chartX, chartY - chartH, chartX, chartY);
        grad.addColorStop(0, 'rgba(91, 107, 255, 0.15)');
        grad.addColorStop(1, 'rgba(91, 107, 255, 0.0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        data.forEach((val, idx) => {
          const x = chartX + idx * step;
          const y = chartY - (val / 100) * (chartH - 20) - 10;
          if (idx === 0) ctx.moveTo(x, chartY);
          ctx.lineTo(x, y);
        });
        ctx.lineTo(chartX + chartW, chartY);
        ctx.closePath();
        ctx.fill();

        // Add real-time text readouts inside chart
        ctx.fillStyle = '#9aa0ae';
        ctx.font = `600 7px ${H.mono}`;
        ctx.textAlign = 'left';
        ctx.fillText('LIVE_TRANSACTION_LOAD: ACTIVE', chartX + 12, chartY - chartH + 16);
        ctx.fillText('THROUGHPUT: 1.48 GB/S', chartX + 12, chartY - chartH + 28);
        ctx.fillText(`MEM_BLOCK_ALLOC: 0x${Math.floor(time * 0.05).toString(16).toUpperCase()}`, chartX + 12, chartY - chartH + 40);

        ctx.textAlign = 'right';
        ctx.fillStyle = '#2be08c';
        ctx.fillText('STATUS: HEALTHY_OK', chartX + chartW - 12, chartY - chartH + 16);

      } else {
        // ── MODE: ZERO-TRUST FIREWALL & LOG STREAMS ───────────
        
        ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.scale(dpr, dpr);
        ctx.translate(dxParallax * 0.5, dyParallax * 0.5);

        const shieldX = wCurr / 2;
        const shieldY = hCurr * 0.45;
        const shieldRadius = 60;

        // Draw central gateway node
        ctx.beginPath();
        ctx.arc(shieldX, shieldY, 12, 0, Math.PI * 2);
        ctx.fillStyle = '#5b6bff';
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#5b6bff';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Rotating Shield Segments
        const rotateSpeed = time * 0.001;
        ctx.lineWidth = 2.5;

        // Inner Shield (Clockwise)
        ctx.strokeStyle = 'rgba(61, 215, 229, 0.4)';
        ctx.beginPath();
        ctx.arc(shieldX, shieldY, shieldRadius, rotateSpeed, rotateSpeed + Math.PI * 0.6);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(shieldX, shieldY, shieldRadius, rotateSpeed + Math.PI, rotateSpeed + Math.PI * 1.6);
        ctx.stroke();

        // Outer Shield (Counter-Clockwise)
        ctx.strokeStyle = 'rgba(91, 107, 255, 0.2)';
        ctx.beginPath();
        ctx.arc(shieldX, shieldY, shieldRadius + 10, -rotateSpeed * 1.4, -rotateSpeed * 1.4 + Math.PI * 0.8);
        ctx.stroke();

        // Title
        ctx.fillStyle = '#f2f4f8';
        ctx.font = `800 8px ${H.mono}`;
        ctx.textAlign = 'center';
        ctx.fillText('ZERO-TRUST GATEWAY', shieldX, shieldY - 24);

        // Security packets update
        if (Math.random() < 0.05 && secPacketsRef.current.length < 15) {
          const angle = Math.random() * Math.PI * 2;
          const spawnDist = Math.max(wCurr, hCurr);
          secPacketsRef.current.push({
            x: shieldX + Math.cos(angle) * spawnDist,
            y: shieldY + Math.sin(angle) * spawnDist,
            vx: -Math.cos(angle) * (1.2 + Math.random() * 1.8),
            vy: -Math.sin(angle) * (1.2 + Math.random() * 1.8),
            isApproved: Math.random() > 0.35, // 65% approved, 35% malicious
            radius: 3 + Math.random() * 2,
            flashTime: 0
          });
        }

        // Draw and update logs
        if (time - lastLogTimeRef.current > 4000) {
          lastLogTimeRef.current = time;
          const logOpts = [
            'AUTH_SUCCESS: API_SESSION_GRANTED',
            'BLOCKED_ATTEMPT: UNKNOWN_NODE_REJECTED',
            'SHIELD_INTEGRITY: 100% [ZERO_TRUST]',
            'UPLINK_SECURED: END_TO_END_OK',
            'DATABASE_SYNC: SUCCESS [REG_04]'
          ];
          addLog(logOpts[Math.floor(Math.random() * logOpts.length)]);
        }

        const secPackets = secPacketsRef.current;
        for (let i = secPackets.length - 1; i >= 0; i--) {
          const p = secPackets[i];
          p.x += p.vx;
          p.y += p.vy;

          const dx = p.x - shieldX;
          const dy = p.y - shieldY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Shield boundary check
          if (dist <= shieldRadius + 5) {
            if (p.isApproved) {
              // Approved packet passes through and decays
              if (dist <= 12) {
                addLog('CREDENTIALS_VERIFIED: SESSION_ESTABLISHED');
                secPackets.splice(i, 1);
                continue;
              }
              // Render fading green approved state
              ctx.fillStyle = '#2be08c';
              ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill();
            } else {
              // Malicious packet repelled
              p.vx = -p.vx * 1.2;
              p.vy = -p.vy * 1.2;
              p.isApproved = true; // prevent double trigger
              addLog('ZERO-TRUST: BLOCKED MALICIOUS UPLINK');
              
              // Alert flash ring
              ctx.strokeStyle = 'rgba(255, 58, 92, 0.4)';
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.arc(shieldX, shieldY, shieldRadius + 12, 0, Math.PI * 2);
              ctx.stroke();
            }
          } else {
            ctx.fillStyle = p.isApproved ? '#5b6bff' : '#ff3a5c';
            ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill();
          }

          // Out of bounds cleanup
          if (Math.abs(p.x - shieldX) > wCurr || Math.abs(p.y - shieldY) > hCurr) {
            secPackets.splice(i, 1);
          }
        }

        // Render logs terminal window (bottom left)
        const logX = 24;
        const logY = hCurr - 110;
        ctx.fillStyle = 'rgba(20, 21, 28, 0.85)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(logX, logY, Math.min(360, wCurr - 48), 90, 8);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ff3a5c';
        ctx.beginPath(); ctx.arc(logX + 16, logY + 14, 3, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#f2f4f8';
        ctx.font = `700 7px ${H.mono}`;
        ctx.textAlign = 'left';
        ctx.fillText('GATEWAY_LOG_STREAM', logX + 26, logY + 17);

        ctx.fillStyle = '#9aa0ae';
        ctx.font = `600 6.5px ${H.mono}`;
        secLogsRef.current.forEach((logLine, idx) => {
          const color = logLine.includes('BLOCKED') || logLine.includes('REJECTED') ? '#ff3a5c' : 
                        (logLine.includes('VERIFIED') || logLine.includes('SUCCESS') ? '#2be08c' : '#9aa0ae');
          ctx.fillStyle = color;
          ctx.fillText(logLine, logX + 16, logY + 34 + (idx * 9));
        });
      }

      // ── Layer 5: Pointer Field Pulse ───────────────────────
      if (currentMouse.x !== -9999) {
        ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.scale(dpr, dpr);
        ctx.strokeStyle = 'rgba(91, 107, 255, 0.03)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(currentMouse.x, currentMouse.y, 45, 0, Math.PI * 2); ctx.stroke();
        ctx.strokeStyle = 'rgba(91, 107, 255, 0.01)';
        ctx.beginPath(); ctx.arc(currentMouse.x, currentMouse.y, 80, 0, Math.PI * 2); ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [scrollY]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    targetMousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseLeave = () => {
    targetMousePosRef.current = { x: -9999, y: -9999 };
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'auto',
        overflow: 'hidden'
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  );
};


const MISSION_SLIDES = [
  {
    eyebrow: 'Philosophy',
    line1: 'Most agencies build templates.',
    line2: 'We prefer engineering.',
    accent: '#5B6BFF',
    align: 'left',
  },
  {
    eyebrow: 'Standard',
    line1: 'Good software communicates.',
    line2: 'Great software surprises.',
    accent: '#3DD7E5',
    align: 'right',
  },
  {
    eyebrow: 'Velocity',
    line1: 'Speed is a feature.',
    line2: 'We ship faster than deadlines.',
    accent: '#2BE08C',
    align: 'center',
  },
  {
    eyebrow: 'Reliability',
    line1: 'Uptime is non-negotiable.',
    line2: 'Zero-downtime is the baseline.',
    accent: '#F5D547',
    align: 'left',
  },
  {
    eyebrow: 'Scale',
    line1: 'Start lean, scale infinite.',
    line2: 'Architecture that grows with you.',
    accent: '#5B6BFF',
    align: 'right',
  },
  {
    eyebrow: 'Security',
    line1: 'Trust is engineered,',
    line2: 'not assumed.',
    accent: '#FF3A5C',
    align: 'center',
  },
  {
    eyebrow: 'Vision',
    line1: 'We don\'t follow roadmaps.',
    line2: 'We draw them.',
    accent: '#3DD7E5',
    align: 'left',
  },
  {
    eyebrow: 'Outcome',
    line1: 'Code is craft.',
    line2: 'Delivery is art.',
    accent: '#2BE08C',
    align: 'right',
  },
];

const SLIDE_DURATION = 4000; // ms

const MissionCarousel = () => {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(null);
  const [dir, setDir] = useState(1); // 1 = forward, -1 = backward
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const startTimeRef = useRef(null);
  const total = MISSION_SLIDES.length;

  const goTo = (idx, direction = 1) => {
    setPrev(active);
    setDir(direction);
    setActive(idx);
    setProgress(0);
    startTimeRef.current = performance.now();
  };

  const next = () => goTo((active + 1) % total, 1);
  const prev_ = () => goTo((active - 1 + total) % total, -1);

  // Auto-advance
  useEffect(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive(a => {
        const n = (a + 1) % total;
        setPrev(a);
        setDir(1);
        return n;
      });
      setProgress(0);
      startTimeRef.current = performance.now();
    }, SLIDE_DURATION);
    return () => clearInterval(timerRef.current);
  }, [total]);

  // Progress bar rAF
  useEffect(() => {
    startTimeRef.current = performance.now();
    const tick = (now) => {
      const elapsed = now - startTimeRef.current;
      setProgress(Math.min(elapsed / SLIDE_DURATION, 1));
      progressRef.current = requestAnimationFrame(tick);
    };
    progressRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(progressRef.current);
  }, [active]);

  const slide = MISSION_SLIDES[active];
  const textAlign = slide.align === 'right' ? 'right' : slide.align === 'center' ? 'center' : 'left';
  const justifyContent = slide.align === 'right' ? 'flex-end' : slide.align === 'center' ? 'center' : 'flex-start';

  return (
    <section style={{
      position: 'relative',
      padding: '0',
      background: 'var(--halo-surface)',
      borderTop: '1px solid var(--halo-border)',
      borderBottom: '1px solid var(--halo-border)',
      overflow: 'hidden',
      minHeight: '480px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Slide content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: justifyContent,
        padding: 'clamp(80px, 12vw, 160px) clamp(24px, 8vw, 120px)',
        textAlign,
        position: 'relative',
        minHeight: '400px',
      }}>
        {/* Slide number pill — clean, no bracket labels */}
        <div key={`pill-${active}`} style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '32px',
          opacity: 0,
          animation: 'mc-fade-in 0.5s ease forwards',
        }}>
          <span style={{
            width: '28px',
            height: '2px',
            background: slide.accent,
            display: 'inline-block',
            borderRadius: '2px',
          }} />
          <span style={{
            fontFamily: H.mono,
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '3px',
            color: slide.accent,
            textTransform: 'uppercase',
          }}>{slide.eyebrow}</span>
        </div>

        {/* Line 1 */}
        <h2 key={`l1-${active}`} style={{
          fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          color: 'var(--halo-on-surface)',
          margin: '0 0 8px 0',
          maxWidth: '1000px',
          opacity: 0,
          animation: 'mc-slide-up 0.6s cubic-bezier(0.22,1,0.36,1) forwards 0.1s',
        }}>
          {slide.line1}
        </h2>

        {/* Line 2 */}
        <h2 key={`l2-${active}`} style={{
          fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          color: slide.accent,
          margin: '0',
          maxWidth: '1000px',
          opacity: 0,
          animation: 'mc-slide-up 0.65s cubic-bezier(0.22,1,0.36,1) forwards 0.18s',
        }}>
          {slide.line2}
        </h2>

        {/* Decorative number */}
        <div style={{
          position: 'absolute',
          top: '50%',
          right: slide.align === 'right' ? 'auto' : 'clamp(24px, 8vw, 120px)',
          left: slide.align === 'right' ? 'clamp(24px, 8vw, 120px)' : 'auto',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(8rem, 20vw, 18rem)',
          fontFamily: H.mono,
          fontWeight: 900,
          color: 'var(--halo-border)',
          opacity: 0.35,
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
        }}>
          {String(active + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Bottom control bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        padding: '20px clamp(24px, 8vw, 120px)',
        borderTop: '1px solid var(--halo-border)',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* Prev */}
        <button onClick={prev_} style={{
          background: 'none',
          border: '1px solid var(--halo-border)',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--halo-muted)',
          flexShrink: 0,
          transition: 'border-color 0.2s, color 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#5B6BFF'; e.currentTarget.style.color = '#5B6BFF'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--halo-border)'; e.currentTarget.style.color = 'var(--halo-muted)'; }}
          aria-label="Previous slide"
        >
          ←
        </button>

        {/* Dot indicators */}
        <div style={{ display: 'flex', gap: '8px', flex: 1, alignItems: 'center' }}>
          {MISSION_SLIDES.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > active ? 1 : -1)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === active ? '28px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: i === active ? slide.accent : 'var(--halo-border)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'width 0.35s ease, background 0.35s ease',
                flexShrink: 0,
              }}
            />
          ))}
        </div>

        {/* Slide counter */}
        <span style={{
          fontFamily: H.mono,
          fontSize: '0.72rem',
          fontWeight: 700,
          color: 'var(--halo-muted)',
          letterSpacing: '2px',
          flexShrink: 0,
        }}>
          {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>

        {/* Next */}
        <button onClick={next} style={{
          background: 'none',
          border: '1px solid var(--halo-border)',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--halo-muted)',
          flexShrink: 0,
          transition: 'border-color 0.2s, color 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#5B6BFF'; e.currentTarget.style.color = '#5B6BFF'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--halo-border)'; e.currentTarget.style.color = 'var(--halo-muted)'; }}
          aria-label="Next slide"
        >
          →
        </button>
      </div>

      {/* Progress bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: '2px',
        width: `${progress * 100}%`,
        background: slide.accent,
        transition: 'background 0.4s ease',
        zIndex: 20,
      }} />

      {/* Keyframe styles injected once */}
      <style>{`
        @keyframes mc-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes mc-slide-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};


export default function VPGroup() {

  const navigate = useNavigate();
  // Use a ref for scrollY so the 3D scene can read it without React re-renders on every frame
  const scrollYRef = useRef(0);
  const heroTextRef = useRef(null);
  const heroSubRef  = useRef(null);
  const heroScrollRef = useRef(null);
  const serviceCardsRef = useRef(null);

  const [winWidth, setWinWidth] = useState(window.innerWidth);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "VP Group & Technologies | Engineering Infinite Scale";
    fetch(getApiUrl('/api/contact')).catch(() => {});
  }, []);

  useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Write scroll to ref (no re-render)
  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY || window.pageYOffset || 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Smooth entrance animations (non-destructive, zero opacity hiding) ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle entrance for hero text without opacity vanishing
      if (heroTextRef.current) {
        gsap.fromTo(heroTextRef.current,
          { y: 20, opacity: 0.8 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Transmitting...');
    
    const result = await submitContactForm(formData, {
        source: 'Main Landing Page'
    });

    if (result.success) {
      setStatus('Success! Message received.');
      alert(`Thanks for reaching out to us, ${formData.name}. We'll get back to you shortly within 24-48 hours.`);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setStatus(`Error: ${result.error || 'Failed'}`);
      alert(result.error || "Submission failed. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--halo-bg)', color: 'var(--halo-on-surface)', fontFamily: H.font, position: 'relative', overflowX: 'hidden' }}>
      
      {/* ── PROJECT NAVBAR ────────────────────────────────────── */}
      <ProjectNavbar />

      {/* ── MAIN CONTENT substrate ───────────────────────────────── */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        
        {/* ── CINEMATIC HERO (STATIC ENTERPRISE BACKDROP) ────────────────────── */}
        <section style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: '120px 20px 60px'
        }}>
          {/* Static Clean Corporate Backdrop */}
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'var(--halo-bg)',
            overflow: 'hidden',
            pointerEvents: 'none'
          }}>
            {/* Ambient Radial Mesh Gradient Lights */}
            <div style={{
              position: 'absolute',
              top: '-15%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '85vw',
              height: '650px',
              background: 'radial-gradient(ellipse at center, rgba(91, 107, 255, 0.15) 0%, rgba(61, 215, 229, 0.08) 45%, transparent 70%)',
              filter: 'blur(60px)',
              pointerEvents: 'none'
            }} />
            
            <div style={{
              position: 'absolute',
              bottom: '0%',
              left: '15%',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(255, 58, 92, 0.08) 0%, transparent 70%)',
              filter: 'blur(80px)',
              pointerEvents: 'none'
            }} />

            <div style={{
              position: 'absolute',
              bottom: '0%',
              right: '15%',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(43, 224, 140, 0.06) 0%, transparent 70%)',
              filter: 'blur(80px)',
              pointerEvents: 'none'
            }} />

            {/* Subtle Tech Grid Pattern */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
              opacity: 0.5,
              maskImage: 'radial-gradient(ellipse at 50% 50%, black 35%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 35%, transparent 80%)'
            }} />
          </div>

          {/* Central Hero Text */}
          <div
            style={{
              textAlign: 'center',
              position: 'relative',
              zIndex: 5,
              pointerEvents: 'auto',
              maxWidth: '960px',
            }}
          >
            {/* Main title */}
            <h1 style={{
              fontFamily: H.font,
              fontWeight: 950,
              letterSpacing: '-0.045em',
              fontSize: 'clamp(3rem, 10vw, 8.5rem)',
              lineHeight: 0.95,
              margin: '0 0 24px 0',
              textTransform: 'uppercase',
              background: 'var(--halo-hero-title)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              VP GROUP
            </h1>

            {/* Subtitle Badge with 100% legibility */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 24px',
              borderRadius: '30px',
              background: 'var(--halo-elevated)',
              border: '1px solid var(--halo-border)',
              color: 'var(--halo-primary)',
              fontFamily: H.mono,
              fontSize: 'clamp(0.78rem, 1.8vw, 0.92rem)',
              fontWeight: 800,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '24px',
              boxShadow: 'var(--halo-shadow-sm)'
            }}>
              <span>AI Custom ERP</span>
              <span style={{ opacity: 0.4 }}>•</span>
              <span>Software Engineering</span>
              <span style={{ opacity: 0.4 }}>•</span>
              <span>Cloud Systems</span>
            </div>

            <p style={{
              fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
              lineHeight: 1.7,
              color: 'var(--halo-muted)',
              maxWidth: '780px',
              margin: '0 auto 36px',
              fontWeight: 500,
            }}>
              We engineer custom AI-driven ERPs, modernize legacy monoliths, and build high-performance software and cloud platforms for ambitious enterprises worldwide.
            </p>

            {/* Main Interactive Action Buttons (CTAs) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '36px'
            }}>
              <button
                onClick={() => {
                  const el = document.getElementById('services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else navigate('/services/ai-custom-erp');
                }}
                style={{
                  padding: '16px 36px',
                  borderRadius: '30px',
                  background: 'linear-gradient(135deg, #6366F1 0%, #06B6D4 100%)',
                  color: '#ffffff',
                  fontSize: '0.92rem',
                  fontWeight: 800,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 4px 25px rgba(99, 102, 241, 0.45)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="hero-cta-btn"
              >
                <span>Explore Our Services</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => navigate('/consultation/book')}
                style={{
                  padding: '16px 32px',
                  borderRadius: '30px',
                  background: 'var(--halo-elevated)',
                  color: 'var(--halo-on-surface)',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  border: '1px solid var(--halo-border)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.3s ease',
                  boxShadow: 'var(--halo-shadow-sm)'
                }}
                className="hero-secondary-btn"
              >
                <Play size={15} color="var(--halo-primary)" />
                <span>Book Free Consultation</span>
              </button>
            </div>

            {/* Live data ticker */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              opacity: 0.85,
              flexWrap: 'wrap'
            }}>
              {['AI Custom ERP', 'Legacy Modernization', 'AI & Automation', 'Software Engineering', 'Cloud & DevOps', 'Plug-ins & Integrations'].map((s, i) => (
                <span key={i} style={{ fontFamily: H.mono, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '1.5px', color: 'var(--halo-muted)', textTransform: 'uppercase' }}>
                  {i > 0 && <span style={{ marginRight: '20px', color: '#5B6BFF' }}>•</span>}{s}
                </span>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            ref={heroScrollRef}
            style={{
              position: 'absolute', bottom: '32px', left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
              opacity: 0, zIndex: 4, pointerEvents: 'auto', cursor: 'pointer'
            }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <span style={{ fontFamily: H.mono, fontSize: '0.62rem', fontWeight: 700, letterSpacing: '3px', color: '#64748b', textTransform: 'uppercase' }}>Scroll</span>
            <div style={{
              width: '1.5px', height: '40px',
              background: 'linear-gradient(to bottom, #5B6BFF, transparent)',
              animation: 'hero-line-pulse 2s ease-in-out infinite',
            }} />
            <style>{`
              @keyframes hero-line-pulse {
                0%, 100% { opacity: 0.4; transform: scaleY(1); }
                50% { opacity: 1; transform: scaleY(1.15); }
              }
              .hero-hud-card:hover {
                border-color: rgba(91, 107, 255, 0.6) !important;
                box-shadow: 0 25px 60px rgba(0,0,0,0.6), 0 0 30px rgba(91, 107, 255, 0.25) !important;
              }
              .hero-cta-btn:hover {
                transform: translateY(-3px) scale(1.03);
                box-shadow: 0 0 45px rgba(61, 215, 229, 0.6) !important;
              }
              .hero-secondary-btn:hover {
                background: rgba(255, 255, 255, 0.12) !important;
                border-color: rgba(61, 215, 229, 0.5) !important;
                transform: translateY(-2px);
              }
            `}</style>
          </div>
        </section>

        {/* ── TECH MARQUEE STRIP (21st.dev inspired) ──────────────── */}
        <div style={{ overflow: 'hidden', background: 'var(--halo-bg)', borderTop: '1px solid var(--halo-border)', borderBottom: '1px solid var(--halo-border)', padding: '18px 0', position: 'relative', zIndex: 11 }}>
          {/* Fade edges */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(to right, var(--halo-bg), transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(to left, var(--halo-bg), transparent)', zIndex: 2, pointerEvents: 'none' }} />

          {/* Row 1 — forward scroll */}
          <div style={{ display: 'flex', gap: 0, marginBottom: '10px', willChange: 'transform' }}>
            <div style={{ display: 'flex', gap: '0', animation: 'marquee-fwd 28s linear infinite', whiteSpace: 'nowrap', flexShrink: 0 }}>
              {['React', 'Three.js', 'Node.js', 'PostgreSQL', 'Next.js', 'TypeScript', 'AWS', 'GSAP', 'Docker', 'MongoDB', 'Redis', 'GraphQL'].concat(
               ['React', 'Three.js', 'Node.js', 'PostgreSQL', 'Next.js', 'TypeScript', 'AWS', 'GSAP', 'Docker', 'MongoDB', 'Redis', 'GraphQL']).map((t, i) => (
                <span key={i} style={{ fontFamily: H.mono, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: i % 2 === 0 ? 'var(--halo-primary)' : 'var(--halo-muted)', padding: '0 28px', borderRight: '1px solid var(--halo-border)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: i % 2 === 0 ? 'var(--halo-primary)' : 'var(--halo-border)', display: 'inline-block', flexShrink: 0 }} />{t}
                </span>
              ))}
            </div>
          </div>

          {/* Row 2 — reverse scroll */}
          <div style={{ display: 'flex', gap: 0, willChange: 'transform' }}>
            <div style={{ display: 'flex', gap: '0', animation: 'marquee-rev 22s linear infinite', whiteSpace: 'nowrap', flexShrink: 0 }}>
              {['Zero Downtime', 'Infinite Scale', 'Security First', 'Performance', 'Clean Code', 'Be Technical', 'Enterprise Grade', 'Open Source', 'AI-Powered', 'Edge Ready'].concat(
               ['Zero Downtime', 'Infinite Scale', 'Security First', 'Performance', 'Clean Code', 'Be Technical', 'Enterprise Grade', 'Open Source', 'AI-Powered', 'Edge Ready']).map((t, i) => (
                <span key={i} style={{ fontFamily: H.mono, fontSize: '0.62rem', fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--halo-muted)', padding: '0 24px', borderRight: '1px solid var(--halo-border)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--halo-border)', display: 'inline-block', flexShrink: 0 }} />{t}
                </span>
              ))}
            </div>
          </div>

          <style>{`
            @keyframes marquee-fwd {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes marquee-rev {
              0%   { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
          `}</style>
        </div>


        <section style={{ 
          minHeight: '80vh', 
          display: 'flex', 
          alignItems: 'center', 
          padding: '120px 24px', 
          boxSizing: 'border-box',
          position: 'relative',
          background: 'var(--halo-surface)',
          borderTop: '1px solid var(--halo-border)',
          zIndex: 11
        }} id="intro-details">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }} className="nothin-grid-2">
            <div>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.1, margin: '0 0 24px 0', color: 'var(--halo-on-surface)' }}>
                Web & Software<br />
                At Infinite Scale.
              </h2>
              <p style={{ fontSize: '0.9375rem', color: 'var(--halo-muted)', lineHeight: 1.6, maxWidth: '440px', margin: '0 0 32px 0' }}>
                We specialize in high-fidelity web development, mission-critical software engineering, and 24/7 technical support. We build platforms that move the world.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="nothin-btn-pill"
                >
                  Launch Project <ArrowRight size={16} />
                </button>
                <button 
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="nothin-btn-pill"
                  style={{ background: 'transparent', border: '1px solid var(--halo-border)', color: 'var(--halo-on-surface)' }}
                >
                  Our Services
                </button>
              </div>
            </div>

            {/* Code Window visualizer */}
            <div style={{ width: '100%', maxWidth: '400px', background: 'var(--halo-elevated)', border: '1px solid var(--halo-border)', borderRadius: '16px', padding: '24px', boxSizing: 'border-box', boxShadow: 'var(--halo-shadow-md)' }} className="home-desktop-only">
              <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
                {['#FF3A5C','#F5D547','#2BE08C'].map(c => <div key={c} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />)}
              </div>
              <div style={{ fontFamily: H.mono, fontSize: '0.75rem', lineHeight: 1.6, color: 'var(--halo-muted)' }}>
                <span style={{ color: 'var(--halo-on-surface)', fontWeight: 600 }}>service</span> WebDevelopment {'{'}<br />
                &nbsp;&nbsp;<span style={{ color: '#5B6BFF' }}>get</span> expertise() {'{'}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#FF3A5C' }}>return</span> ['Web', 'Software', 'Support'];<br />
                &nbsp;&nbsp;{'}'}<br />
                &nbsp;&nbsp;async build() {'{'}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#FF3A5C' }}>return</span> await this.deploy(budget: <span style={{ color: '#2BE08C' }}>'Affordable'</span>);<br />
                &nbsp;&nbsp;{'}'}<br />
                {'}'}
              </div>
            </div>
          </div>
        </section>

        {/* ── GLASS STATS BAR (21st.dev glass-cards inspired) ────────── */}
        <section style={{ background: 'var(--halo-bg)', padding: '80px 24px', borderTop: '1px solid var(--halo-border)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {[
              { num: '20+', label: 'Projects Shipped', accent: '#5B6BFF', sub: 'Across 3 continents' },
              { num: '99.9%', label: 'Uptime SLA', accent: '#2BE08C', sub: 'Zero unplanned outages' },
              { num: '100%', label: 'Client Satisfaction', accent: '#3DD7E5', sub: 'Net Promoter: Excellent' },
              { num: '3+', label: 'Years Engineering', accent: '#F5D547', sub: 'Since 2021' },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  position: 'relative',
                  borderRadius: '20px',
                  padding: '3px',
                  background: `conic-gradient(from ${i * 90}deg, transparent 0deg, ${s.accent}55 60deg, ${s.accent}33 120deg, transparent 180deg, ${s.accent}22 240deg, transparent 360deg)`,
                  animation: `glass-spin-${i} ${8 + i * 2}s linear infinite`,
                }}
              >
                <div style={{
                  borderRadius: '18px',
                  padding: '32px 28px',
                  background: 'var(--halo-surface)',
                  backdropFilter: 'blur(24px) saturate(180%)',
                  border: '1px solid var(--halo-border)',
                  boxShadow: 'var(--halo-shadow-md)',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Top shimmer line */}
                  <div style={{ position: 'absolute', top: '10px', left: '12px', right: '12px', height: '1px', background: `linear-gradient(90deg, transparent, ${s.accent}44, transparent)`, borderRadius: '1px' }} />
                  {/* Number */}
                  <div style={{ fontSize: 'clamp(2.4rem, 5vw, 3.2rem)', fontWeight: 900, letterSpacing: '-0.04em', color: s.accent, lineHeight: 1, marginBottom: '8px', fontFamily: H.font }}>
                    {s.num}
                  </div>
                  {/* Label */}
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--halo-on-surface)', marginBottom: '6px', letterSpacing: '-0.01em' }}>{s.label}</div>
                  {/* Sub */}
                  <div style={{ fontSize: '0.72rem', fontFamily: H.mono, color: 'var(--halo-muted)', letterSpacing: '0.5px' }}>{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <style>{`
            @keyframes glass-spin-0 { to { background-position: 360deg; } }
            @keyframes glass-spin-1 { to { background-position: 360deg; } }
            @keyframes glass-spin-2 { to { background-position: 360deg; } }
            @keyframes glass-spin-3 { to { background-position: 360deg; } }
          `}</style>
        </section>

        {/* ── MISSION CAROUSEL ─────────────────────────────────────── */}
        <MissionCarousel />


        {/* ── WORKS SECTION (PORTFOLIO) ─────────────────────────── */}
        <section style={{ padding: '120px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--halo-border)', paddingBottom: '16px', marginBottom: '60px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--halo-on-surface)' }}>Selected Works</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--halo-muted)' }}>The Portfolio</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '120px' }}>
            {/* VexioGate Card */}
            <div className="nothin-project-row">
              <div className="project-img-wrapper">
                <div className="project-img-placeholder" style={{ background: 'var(--halo-elevated)', border: '1px solid var(--halo-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--halo-border)', letterSpacing: '4px', opacity: 0.5 }}>VEXIOGATE</span>
                </div>
              </div>
              <div className="project-meta">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
                  <span style={{ fontSize: '2.5rem', fontFamily: H.mono, fontWeight: 300, color: 'var(--halo-muted)' }}>01</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '2px', padding: '4px 10px', background: 'var(--halo-elevated)', borderRadius: '4px', color: '#2BE08C', border: '1px solid var(--halo-border)' }}>LIVE</span>
                </div>
                <h3 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '16px', color: 'var(--halo-on-surface)' }}>VexioGate IAM Ecosystem</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--halo-muted)', lineHeight: 1.6, marginBottom: '28px' }}>
                  Next-generation identity tracking, secure workforce dashboard, and automated gateway provisioning for modern enterprises.
                </p>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
                  {['React', 'MERN', 'Security'].map(t => <span key={t} className="nothin-tag">{t}</span>)}
                </div>
                <button onClick={() => navigate('/portfolio/vault-iam')} className="nothin-btn-pill">
                  View Case Study <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Neural Core */}
            <div className="nothin-project-row" style={{ flexDirection: 'row-reverse' }}>
              <div className="project-img-wrapper">
                <div className="project-img-placeholder" style={{ background: 'var(--halo-elevated)', border: '1px solid var(--halo-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--halo-border)', letterSpacing: '4px', opacity: 0.5 }}>NEURAL CORE</span>
                </div>
              </div>
              <div className="project-meta">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
                  <span style={{ fontSize: '2.5rem', fontFamily: H.mono, fontWeight: 300, color: 'var(--halo-muted)' }}>02</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '2px', padding: '4px 10px', background: 'var(--halo-elevated)', borderRadius: '4px', color: '#5B6BFF', border: '1px solid var(--halo-border)' }}>DEV</span>
                </div>
                <h3 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '16px', color: 'var(--halo-on-surface)' }}>Neural Core Platform</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--halo-muted)', lineHeight: 1.6, marginBottom: '28px' }}>
                  Future integration module. Our ecosystem is actively expanding to include autonomous neural tracking and semantic reasoning loops.
                </p>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
                  {['AI', 'Agents', 'RAG'].map(t => <span key={t} className="nothin-tag">{t}</span>)}
                </div>
                <div className="nothin-tag" style={{ display: 'inline-block', color: 'var(--halo-muted)', background: 'var(--halo-elevated)' }}>
                  In Development
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PARTNERSHIPS SECTION ──────────────────────────────── */}
        <section style={{ padding: '120px 24px', background: 'var(--halo-surface)', borderTop: '1px solid var(--halo-border)', borderBottom: '1px solid var(--halo-border)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--halo-border)', paddingBottom: '16px', marginBottom: '60px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--halo-on-surface)' }}>Partnerships</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--halo-muted)' }}>Visionary Clients</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }} className="nothin-grid-2">
              <div style={{ background: 'var(--halo-elevated)', border: '1px solid var(--halo-border)', padding: '48px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#5B6BFF', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Maternal E-Commerce</div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px', color: 'var(--halo-on-surface)' }}>Mother Bliss</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--halo-muted)', lineHeight: 1.6, marginBottom: '32px' }}>
                    A comprehensive maternal care ecosystem engineered by VP Group. We architected the full-stack infrastructure for seamless commerce and global scalability.
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <a href="https://wwwmotherbliss-dd920f26.vercel.app/" target="_blank" rel="noopener noreferrer" className="nothin-btn-pill-action">
                    Production Realm <ExternalLink size={14} />
                  </a>
                  <a href="https://thakurvpsingh.github.io/mothers-bliss/" target="_blank" rel="noopener noreferrer" className="nothin-btn-pill-action-secondary">
                    Legacy Archive <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              <div style={{ border: '2px dashed var(--halo-border)', background: 'var(--halo-surface)', padding: '48px', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--halo-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <Users size={20} color="var(--halo-muted)" />
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--halo-on-surface)' }}>New Partner Socket</h4>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '1.5px', background: 'var(--halo-elevated)', border: '1px solid var(--halo-border)', padding: '4px 10px', borderRadius: '20px', marginBottom: '16px', color: 'var(--halo-muted)' }}>AWAITING PROVISIONING</div>
                <p style={{ fontSize: '0.875rem', color: 'var(--halo-muted)', lineHeight: 1.5, margin: 0, maxWidth: '280px' }}>
                  Open socket for future enterprise partnerships. Join the infrastructure that moves the world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES SECTION ─────────────────────────────────── */}
        <section id="services" style={{
          background: 'var(--halo-surface)',
          borderTop: '1px solid var(--halo-border)',
          borderBottom: '1px solid var(--halo-border)',
          padding: '120px 0 140px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Subtle radial glow behind header */}
          <div style={{
            position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
            width: '800px', height: '400px',
            background: 'radial-gradient(ellipse at 50% 0%, rgba(91,107,255,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

            {/* Section header */}
            <div style={{ marginBottom: '60px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ width: '32px', height: '2px', background: 'var(--halo-primary)', borderRadius: '2px', display: 'inline-block' }} />
                <span style={{ fontFamily: H.mono, fontSize: '0.75rem', fontWeight: 800, letterSpacing: '3px', color: 'var(--halo-primary)', textTransform: 'uppercase' }}>Our Services</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
                <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--halo-on-surface)', margin: 0, maxWidth: '650px' }}>
                  Intelligent Software & Platforms We Deliver.
                </h2>
                <p style={{ fontSize: '1.05rem', color: 'var(--halo-muted)', lineHeight: 1.7, margin: 0, maxWidth: '380px' }}>
                  From custom enterprise ERPs to AI automation, legacy modernization, and cloud infrastructure.
                </p>
              </div>
            </div>

            {/* Service cards grid */}
            <div ref={serviceCardsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
              {[
                {
                  path: '/services/ai-custom-erp',
                  icon: <Sparkles size={24} color="#FF3A5C" />,
                  accent: '#FF3A5C',
                  num: '01',
                  badge: 'Flagship ERP',
                  title: 'AI Custom ERP',
                  desc: 'Tailored enterprise resource planning powered by AI. Seamlessly integrates inventory forecasting, automated finance, HR, and custom operational pipelines with zero per-seat licensing.',
                  tags: ['Predictive Supply Chain', 'Automated Invoicing', 'Custom Workflows', 'Multi-Entity Ledger'],
                },
                {
                  path: '/services/legacy-modernization',
                  icon: <RefreshCw size={24} color="#5B6BFF" />,
                  accent: '#5B6BFF',
                  num: '02',
                  badge: 'Transformation',
                  title: 'Legacy Modernization',
                  desc: 'Safely transform slow, monolithic legacy architectures into agile cloud-native microservices. Eliminate technical debt and modernize databases with zero business downtime.',
                  tags: ['Strangler Fig Pattern', 'Cloud Replatforming', 'Zero Downtime', 'API Encapsulation'],
                },
                {
                  path: '/services/ai-automation',
                  icon: <Zap size={24} color="#3DD7E5" />,
                  accent: '#3DD7E5',
                  num: '03',
                  badge: 'Intelligent AI',
                  title: 'AI & Automation',
                  desc: 'Autonomous AI agents, semantic RAG knowledge retrieval, and custom LLM integrations that automate complex business workflows and eliminate operational bottlenecks.',
                  tags: ['Autonomous Agents', 'RAG Knowledge Bases', 'Document OCR', 'Process Automation'],
                },
                {
                  path: '/services/software-engineering',
                  icon: <Terminal size={24} color="#2BE08C" />,
                  accent: '#2BE08C',
                  num: '04',
                  badge: 'Core Engineering',
                  title: 'Software Engineering',
                  desc: 'Full-stack enterprise application engineering. High-performance web and mobile products, robust REST/GraphQL APIs, and resilient distributed systems designed for infinite scale.',
                  tags: ['Full-Stack Web', 'Mobile Apps', 'Microservices', 'Distributed Systems'],
                },
                {
                  path: '/services/cloud-devops',
                  icon: <Cpu size={24} color="#F5D547" />,
                  accent: '#F5D547',
                  num: '05',
                  badge: 'Infrastructure',
                  title: 'Cloud & DevOps',
                  desc: 'Multi-cloud architecture on AWS, Google Cloud, and Azure. Kubernetes orchestration, Infrastructure as Code, continuous integration/deployment (CI/CD), and 99.99% uptime SLAs.',
                  tags: ['AWS / GCP / Azure', 'Kubernetes', 'CI/CD Pipelines', 'Zero-Downtime Releases'],
                },
                {
                  path: '/services/plugin-integrations',
                  icon: <Plug size={24} color="#FF3A5C" />,
                  accent: '#FF3A5C',
                  num: '06',
                  badge: 'Connectivity',
                  title: 'Plug-ins & Integrations',
                  desc: 'High-throughput enterprise connectors, custom middleware, and marketplace plugins for Salesforce, Shopify, Stripe, Adobe Creative Cloud, Figma, Slack, and Jira.',
                  tags: ['Shopify / Salesforce', 'Stripe Connectors', 'Adobe / Figma Plugins', 'Real-time Webhooks'],
                }
              ].map((s, i) => (
                <div
                  key={i}
                  className="svc-card-3d"
                  onClick={() => navigate(s.path)}
                  style={{
                    background: 'var(--halo-surface)',
                    border: '1px solid var(--halo-border)',
                    borderRadius: '16px',
                    padding: '36px 32px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    transition: 'all 0.25s ease',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = s.accent;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
                    const arrow = e.currentTarget.querySelector('.svc-arrow');
                    if (arrow) { arrow.style.opacity = '1'; arrow.style.transform = 'translate(0, 0)'; }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--halo-border)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    const arrow = e.currentTarget.querySelector('.svc-arrow');
                    if (arrow) { arrow.style.opacity = '0'; arrow.style.transform = 'translate(-6px, 6px)'; }
                  }}
                >
                  {/* Top row: number, badge, icon */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontFamily: H.mono, fontSize: '0.8rem', fontWeight: 800, color: 'var(--halo-muted)' }}>{s.num}</span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', background: `${s.accent}14`, color: s.accent, padding: '3px 10px', borderRadius: '20px' }}>
                        {s.badge}
                      </span>
                    </div>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '12px',
                      background: `${s.accent}12`,
                      border: `1px solid ${s.accent}24`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {s.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: 'var(--halo-on-surface)',
                    margin: '0 0 12px 0',
                    lineHeight: 1.25,
                  }}>{s.title}</h3>

                  {/* Description */}
                  <p style={{
                    fontSize: '0.95rem',
                    color: 'var(--halo-muted)',
                    lineHeight: 1.65,
                    margin: '0 0 24px 0',
                    flex: 1,
                  }}>{s.desc}</p>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                    {s.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'var(--halo-on-surface)',
                        background: 'var(--halo-elevated)',
                        border: '1px solid var(--halo-border)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                      }}>{tag}</span>
                    ))}
                  </div>

                  {/* Explore button */}
                  <div className="svc-arrow" style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    fontSize: '0.82rem', fontWeight: 800,
                    color: s.accent, textTransform: 'uppercase',
                    opacity: 0,
                    transform: 'translate(-6px, 6px)',
                    transition: 'all 0.25s ease',
                  }}>
                    <span>Explore Service Details</span> <ArrowRight size={14} />
                  </div>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <p style={{ fontSize: '1.05rem', color: 'var(--halo-muted)', margin: 0 }}>
                Looking for website development, custom UI/UX design, or 24/7 support? We engineer complete solutions.
              </p>
              <button
                onClick={() => navigate('/consultation/book')}
                className="nothin-btn-pill"
              >
                Discuss Your Requirements <ArrowRight size={15} />
              </button>
            </div>

          </div>
        </section>

        {/* ── TECHNOLOGIES WE WORK ON SECTION ──────────────────── */}
        <section id="technologies" style={{ padding: '100px 24px', background: 'var(--halo-bg)', borderTop: '1px solid var(--halo-border)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '30px', background: 'rgba(91, 107, 255, 0.1)', color: 'var(--halo-primary)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>
                <Cpu size={14} />
                <span>MODERN TECH STACK</span>
              </div>
              <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 900, color: 'var(--halo-on-surface)', letterSpacing: '-0.02em', margin: '0 0 16px 0' }}>
                Technologies We Work On
              </h2>
              <p style={{ color: 'var(--halo-muted)', fontSize: '1.1rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
                We engineer scalable solutions using modern, secure, and battle-tested technologies.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {[
                {
                  category: 'Frontend & Mobile Apps',
                  icon: <Globe size={22} className="text-cyan-500" />,
                  desc: 'Responsive, lightning-fast interfaces and multi-platform mobile apps with pixel-perfect precision.',
                  techs: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js', 'React Native', 'Flutter']
                },
                {
                  category: 'Backend & Microservices',
                  icon: <Terminal size={22} className="text-emerald-500" />,
                  desc: 'High-throughput APIs and distributed service architectures designed for heavy concurrency.',
                  techs: ['Node.js', 'Python (FastAPI / Django)', 'Go', 'NestJS', 'REST APIs', 'GraphQL', 'gRPC']
                },
                {
                  category: 'AI & Machine Learning',
                  icon: <Sparkles size={22} className="text-pink-500" />,
                  desc: 'Cutting-edge generative AI models, autonomous agents, and proprietary knowledge retrieval pipelines.',
                  techs: ['OpenAI GPT-4', 'Google Gemini', 'Anthropic Claude', 'LangChain', 'LlamaIndex', 'Pinecone', 'PyTorch']
                },
                {
                  category: 'Cloud & DevOps Infrastructure',
                  icon: <Cpu size={22} className="text-amber-500" />,
                  desc: 'Automated CI/CD pipelines, container orchestration, and multi-cloud resilience with 99.99% uptime.',
                  techs: ['Amazon Web Services (AWS)', 'Google Cloud (GCP)', 'Microsoft Azure', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions']
                },
                {
                  category: 'Databases & Storage',
                  icon: <Boxes size={22} className="text-indigo-500" />,
                  desc: 'Secure relational and NoSQL databases optimized for high read/write speeds and zero data loss.',
                  techs: ['PostgreSQL', 'MongoDB', 'Redis', 'ClickHouse', 'TimescaleDB', 'Supabase', 'Elasticsearch']
                },
                {
                  category: 'Plug-ins & Enterprise Connectors',
                  icon: <Plug size={22} className="text-violet-500" />,
                  desc: 'Two-way synchronization and marketplace plugins linking your enterprise tools seamlessly.',
                  techs: ['Shopify Apps', 'Salesforce Integrations', 'Stripe Payments', 'Adobe CC Plugins', 'Figma Plugins', 'Slack & Teams Bots']
                }
              ].map((group, idx) => (
                <div key={idx} style={{ padding: '32px', background: 'var(--halo-surface)', border: '1px solid var(--halo-border)', borderRadius: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--halo-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {group.icon}
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--halo-on-surface)', margin: 0 }}>{group.category}</h3>
                  </div>
                  <p style={{ fontSize: '0.92rem', color: 'var(--halo-muted)', lineHeight: 1.55, marginBottom: '20px' }}>{group.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {group.techs.map(t => (
                      <span key={t} style={{ fontSize: '0.78rem', fontWeight: 700, background: 'var(--halo-elevated)', color: 'var(--halo-on-surface)', padding: '5px 12px', borderRadius: '8px', border: '1px solid var(--halo-border)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TALENT & ENGAGEMENT SOLUTIONS (FROM REFERENCE IMAGE) ── */}
        <section id="talent" style={{ padding: '100px 24px', background: 'var(--halo-surface)', borderTop: '1px solid var(--halo-border)', borderBottom: '1px solid var(--halo-border)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px', marginBottom: '56px' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '30px', background: 'rgba(43, 224, 140, 0.1)', color: 'var(--halo-success)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>
                  <Users size={14} />
                  <span>FLEXIBLE ENGAGEMENT MODELS</span>
                </div>
                <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 900, color: 'var(--halo-on-surface)', letterSpacing: '-0.02em', margin: 0 }}>
                  Talent & Team Augmentation
                </h2>
              </div>
              <p style={{ color: 'var(--halo-muted)', fontSize: '1.05rem', maxWidth: '420px', margin: 0, lineHeight: 1.6 }}>
                Scale your technical capabilities on-demand with senior software developers, cloud architects, and AI engineers.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {[
                {
                  title: 'Staff Augmentation',
                  model: 'staff-augmentation',
                  desc: 'Seamlessly add senior full-stack developers, DevOps, and QA engineers to your in-house engineering team to meet sprint deadlines faster.',
                  tag: 'Immediate Velocity'
                },
                {
                  title: 'Dedicated Teams',
                  model: 'dedicated-teams',
                  desc: 'Self-sufficient, autonomous engineering squads complete with Tech Leads, developers, and QA dedicated 100% to your product roadmap.',
                  tag: 'Autonomous Delivery'
                },
                {
                  title: 'Build-Operate-Transfer',
                  model: 'build-operate-transfer',
                  desc: 'We recruit, set up, and operate an offshore engineering center for your enterprise, and then transfer full operational ownership to you.',
                  tag: 'Long-term Scale'
                },
                {
                  title: 'Contract-to-Hire',
                  model: 'contract-to-hire',
                  desc: 'Evaluate top technical talent in real production workflows before committing to full-time permanent employment offers.',
                  tag: 'Zero Hiring Risk'
                },
                {
                  title: 'Hire AI Engineers',
                  model: 'hire-ai-engineers',
                  desc: 'Specialized machine learning and generative AI engineers ready to deploy custom LLMs, autonomous agents, and RAG pipelines.',
                  tag: 'AI Specialists'
                }
              ].map((item, idx) => (
                <div key={idx} style={{ padding: '32px', background: 'var(--halo-bg)', border: '1px solid var(--halo-border)', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ display: 'inline-block', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', background: 'rgba(91, 107, 255, 0.1)', color: 'var(--halo-primary)', padding: '3px 10px', borderRadius: '20px', marginBottom: '14px' }}>
                      {item.tag}
                    </span>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--halo-on-surface)', marginBottom: '12px' }}>{item.title}</h3>
                    <p style={{ fontSize: '0.92rem', color: 'var(--halo-muted)', lineHeight: 1.6, marginBottom: '24px' }}>{item.desc}</p>
                  </div>
                  <Link to={`/apply-partnership?model=${item.model}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--halo-primary)', fontWeight: 800, fontSize: '0.9rem', textDecoration: 'none' }}>
                    <span>Inquire About This Model</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DNA & CULTURE SECTION ────────────────────────────── */}
        <section style={{ padding: '120px 24px', background: 'var(--halo-surface)', borderTop: '1px solid var(--halo-border)', borderBottom: '1px solid var(--halo-border)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'center' }} className="nothin-grid-2">
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--halo-muted)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>OUR DNA</div>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 850, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '24px', color: 'var(--halo-on-surface)' }}>Strategic Aim & Culture</h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--halo-muted)', lineHeight: 1.7, margin: 0 }}>
                At VP Group, our mission is to democratize high-end engineering. We combine enterprise-grade security and scale with accessible pricing models, ensuring every business has access to top-tier digital infrastructure.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ background: 'var(--halo-elevated)', border: '1px solid var(--halo-border)', padding: '32px', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 12px 0', color: 'var(--halo-on-surface)' }}>Working Culture</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--halo-muted)', lineHeight: 1.5, margin: 0 }}>We thrive on radical transparency. Every engineer is a decision-maker in our flat-hierarchy network.</p>
              </div>
              <div style={{ background: 'var(--halo-elevated)', border: '1px solid var(--halo-border)', padding: '32px', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 12px 0', color: 'var(--halo-on-surface)' }}>Industry Standing</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--halo-muted)', lineHeight: 1.5, margin: 0 }}>Positioned at the intersection of security and performance, solving the "Infinite Scale" problem.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT & COMMUNICATIONS SECTION ─────────────────── */}
        <section id="contact" style={{ padding: '120px 24px 200px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--halo-border)', paddingBottom: '16px', marginBottom: '80px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--halo-on-surface)' }}>Direct Communication</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--halo-muted)' }}>Command Center</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginBottom: '80px' }}>
            {[
              { label: 'Command Center', val: 'contact.vpsdev@gmail.com', tag: '24/7 Monitoring' },
              { label: 'Headquarters', val: 'Pratapgarh, Uttar Pradesh, India', tag: 'Regional Hub' },
              { label: 'Business Line', val: 'Inquiry via Email Recommended', tag: 'Support Mesh' }
            ].map((c, i) => (
              <div key={i} style={{ background: 'var(--halo-surface)', border: '1px solid var(--halo-border)', padding: '40px 32px', borderRadius: '16px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '220px' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--halo-muted)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>{c.label}</span>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 16px 0', color: 'var(--halo-on-surface)', wordBreak: 'break-word' }}>{c.val}</h4>
                <div style={{ display: 'inline-block', alignSelf: 'flex-start', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '1px', background: 'var(--halo-elevated)', border: '1px solid var(--halo-border)', padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase', color: 'var(--halo-muted)' }}>{c.tag}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '60px' }} className="nothin-grid-2">
            <div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '16px', color: 'var(--halo-on-surface)' }}>Secure Transmission</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--halo-muted)', lineHeight: 1.6, margin: 0 }}>
                Our communication lines are encrypted via end-to-end protocols. Your inquiries are routed directly to our specialized operational nodes. We typically reply within 24-48 hours.
              </p>
            </div>

            <div style={{ background: 'var(--halo-surface)', padding: '40px', borderRadius: '16px', border: '1px solid var(--halo-border)' }}>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }} className="nothin-grid-2">
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="nothin-input"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="nothin-input"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <input 
                  type="text" 
                  placeholder="Subject" 
                  className="nothin-input" 
                  style={{ marginBottom: '16px' }}
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                />
                <textarea 
                  placeholder="Message Payload..." 
                  className="nothin-input" 
                  style={{ minHeight: '120px', marginBottom: '24px', resize: 'none' }}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                ></textarea>
                <button 
                  type="submit" 
                  className="nothin-btn-submit"
                  disabled={loading}
                >
                  {loading ? 'Transmitting...' : 'Initialize Uplink'}
                </button>
                <p style={{ marginTop: '16px', fontSize: '0.7rem', color: 'var(--halo-muted)', textAlign: 'center', lineHeight: '1.4', margin: '16px 0 0 0' }}>
                  By submitting this form, you agree to our <Link to="/terms-conditions" style={{ color: 'var(--halo-on-surface)', textDecoration: 'underline', fontWeight: 600 }}>Terms & Conditions</Link> and <Link to="/privacy-policy" style={{ color: 'var(--halo-on-surface)', textDecoration: 'underline', fontWeight: 600 }}>Privacy Policy</Link>.
                </p>
                {status && <div style={{ marginTop: '20px', textAlign: 'center', color: status.includes('Success') ? '#2BE08C' : '#FF3A5C', fontWeight: '700' }}>{status}</div>}
              </form>
            </div>
          </div>
        </section>

        {/* Original Footer */}
        <Footer />
      </main>

      <style>{`
        .nothin-docking-title {
          transition: color 0.2s ease, opacity 0.2s ease !important;
          -webkit-transition: color 0.2s ease, opacity 0.2s ease !important;
        }
        .nothin-project-row {
          display: flex;
          gap: 64px;
          align-items: center;
        }
        .project-img-wrapper {
          flex: 1.2;
          width: 100%;
        }
        .project-img-placeholder {
          width: 100%;
          aspect-ratio: 16/10;
          border-radius: 12px;
          border: 1px solid #2A2D38;
        }
        .project-meta {
          flex: 0.8;
          width: 100%;
        }
        .nothin-tag {
          font-family: ${H.mono};
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--halo-muted);
          background: var(--halo-elevated);
          border: 1px solid var(--halo-border);
          padding: 6px 12px;
          border-radius: 40px;
          letter-spacing: 0.5px;
        }
        .nothin-btn-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #5B6BFF;
          color: #FFFFFF;
          border: none;
          border-radius: 30px;
          padding: 12px 24px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.85rem;
        }
        .nothin-btn-pill:hover {
          background: #7886FF;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(91, 107, 255, 0.25);
        }
        .nothin-btn-pill-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #5B6BFF;
          color: #FFFFFF;
          border: none;
          border-radius: 12px;
          padding: 16px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          text-align: center;
          transition: all 0.2s ease;
          font-size: 0.875rem;
        }
        .nothin-btn-pill-action:hover {
          background: #7886FF;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(91, 107, 255, 0.25);
        }
        .nothin-btn-pill-action-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: transparent;
          color: var(--halo-on-surface);
          border: 1px solid var(--halo-border);
          border-radius: 12px;
          padding: 16px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          text-align: center;
          transition: all 0.2s ease;
          font-size: 0.875rem;
        }
        .nothin-btn-pill-action-secondary:hover {
          background: var(--halo-elevated);
          border-color: #5B6BFF;
        }
        .nothin-service-card {
          background: var(--halo-surface);
          border: 1px solid var(--halo-border);
          padding: 48px;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
        }
        .nothin-service-card:hover {
          background: var(--halo-elevated);
        }
        .nothin-service-arrow {
          position: absolute;
          bottom: 32px;
          right: 32px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--halo-border);
          color: var(--halo-on-surface);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }
        .nothin-service-card:hover .nothin-service-arrow {
          opacity: 1;
          transform: translateX(0);
        }
        .nothin-input {
          width: 100%;
          background: var(--halo-elevated);
          border: 1px solid var(--halo-border);
          border-radius: 8px;
          padding: 14px;
          color: var(--halo-on-surface);
          font-size: 0.95rem;
          transition: all 0.2s;
        }
        .nothin-input:focus {
          border-color: #5B6BFF;
          outline: none;
          background: var(--halo-elevated);
        }
        .nothin-btn-submit {
          width: 100%;
          padding: 16px;
          background: #5B6BFF;
          color: #FFFFFF;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .nothin-btn-submit:hover:not(:disabled) {
          background: #7886FF;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(91, 107, 255, 0.25);
        }

        .home-desktop-only {
          display: block;
        }

        @media (max-width: 960px) {
          .nothin-project-row {
            flex-direction: column !important;
            gap: 32px;
          }
          .nothin-grid-2 {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .home-desktop-only {
            display: none !important;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -90%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -100%) scale(1);
          }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translate(-50%, 0);
          }
          40% {
            transform: translate(-50%, -10px);
          }
          60% {
            transform: translate(-50%, -5px);
          }
        }
      `}</style>
    </div>
  );
}
