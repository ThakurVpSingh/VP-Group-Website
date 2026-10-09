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
    '[SEC_GATEWAY] FULL-TRUST ACTIVE',
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
        ctx.fillText('FULL-TRUST GATEWAY', shieldX, shieldY - 24);

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
            'SHIELD_INTEGRITY: 100% [FULL_TRUST]',
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
              addLog('FULL-TRUST: BLOCKED MALICIOUS UPLINK');
              
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
  const [serviceCategory, setServiceCategory] = useState('ALL');

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
        
        {/* ── CORPORATE HERO BAND (Adapts completely to light & dark modes) ── */}
        <section
          className="corp-hero-band-dark"
          style={{
            minHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            padding: '110px 24px 80px',
            backgroundColor: 'var(--color-canvas)',
          }}
        >
          {/* Subtle architectural tech grid */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(var(--color-hairline) 1px, transparent 1px), linear-gradient(90deg, var(--color-hairline) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
            opacity: 0.5,
            pointerEvents: 'none',
          }} />

          {/* Central Hero Text */}
          <div
            ref={heroTextRef}
            style={{
              textAlign: 'center',
              position: 'relative',
              zIndex: 5,
              maxWidth: '1040px',
              padding: '0 12px',
            }}
          >
            {/* Eyebrow Label */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '24px',
            }}>
              <span style={{ width: '8px', height: '8px', background: 'var(--color-primary)', display: 'inline-block' }} />
              <span className="corp-label-uppercase" style={{ color: 'var(--color-primary)', letterSpacing: '2px' }}>
                VP Group & Technologies — Corporate Engineering
              </span>
            </div>

            {/* Display XL Headline: Heavy 700 weight, 1.05 line height, 0 tracking */}
            <h1
              className="corp-display-xl"
              style={{
                color: 'var(--color-ink)',
                margin: '0 0 24px 0',
                textTransform: 'uppercase',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: 0,
              }}
            >
              ENGINEERING INFINITE SCALE.
            </h1>

            {/* Light 300 Body Copy */}
            <p
              className="corp-body-md"
              style={{
                color: 'var(--color-body)',
                maxWidth: '820px',
                margin: '0 auto 40px',
                fontSize: '17px',
                lineHeight: 1.6,
                fontWeight: 300,
              }}
            >
              We engineer custom AI-driven ERPs, modernize legacy monoliths with zero downtime, and build high-performance software and cloud systems for ambitious global enterprises.
            </p>

            {/* Primary & Secondary Buttons: Strictly 0px Rectangular */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '48px',
            }}>
              <button
                onClick={() => {
                  const el = document.getElementById('services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else navigate('/services/ai-custom-erp');
                }}
                className="corp-btn-primary"
              >
                <span>EXPLORE ARCHITECTURE</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => navigate('/consultation/book')}
                className="corp-btn-secondary"
              >
                <span>BOOK CONSULTATION</span>
              </button>
            </div>

            {/* Live capability tickers */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              flexWrap: 'wrap',
              borderTop: '1px solid var(--color-hairline)',
              paddingTop: '24px',
            }}>
              {['AI Custom ERP', 'Legacy Modernization', 'AI & Automation', 'Software Engineering', 'Cloud & DevOps', 'Plug-ins & Integrations'].map((s, i) => (
                <span key={i} className="corp-label-uppercase" style={{ fontSize: '11px', color: 'var(--color-muted)', letterSpacing: '1.5px' }}>
                  {i > 0 && <span style={{ marginRight: '24px', color: 'var(--color-primary)' }}>•</span>}{s}
                </span>
              ))}
            </div>
          </div>

          {/* Precision Tricolor Stripe Divider at bottom of hero band */}
          <div className="corp-tricolor-stripe" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }} />
        </section>

        {/* ── TECHNICAL SPECIFICATION CELLS (spec-cell) ───────────── */}
        <section style={{ backgroundColor: 'var(--color-canvas)', borderBottom: '1px solid var(--color-hairline)' }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1px',
            backgroundColor: 'var(--color-hairline)',
          }}>
            {[
              { val: '99.99%', label: 'ENTERPRISE UPTIME SLA', desc: 'Zero unplanned downtime microservices' },
              { val: '< 45MS', label: 'MEDIAN API LATENCY', desc: 'Optimized high-throughput pipelines' },
              { val: 'FULL TRUST', label: 'SECURITY ARCHITECTURE', desc: 'Continuous cryptographic authorization & guaranteed data integrity' },
              { val: 'PROPRIETARY', label: '100% CLIENT IP OWNERSHIP', desc: 'Bespoke code with zero SaaS license lock-in' },
            ].map((spec, i) => (
              <div key={i} className="corp-spec-cell" style={{ backgroundColor: 'var(--color-canvas)', padding: '36px 32px' }}>
                <div className="corp-display-sm" style={{ color: 'var(--color-primary)', marginBottom: '6px' }}>{spec.val}</div>
                <div className="corp-label-uppercase" style={{ color: 'var(--color-ink)', marginBottom: '6px' }}>{spec.label}</div>
                <div className="corp-body-sm" style={{ color: 'var(--color-muted)' }}>{spec.desc}</div>
              </div>
            ))}
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
          background: 'var(--color-surface-soft)',
          borderTop: '1px solid var(--color-hairline)',
          zIndex: 11
        }} id="intro-details">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }} className="nothin-grid-2">
            <div>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.1, margin: '0 0 24px 0', color: 'var(--color-ink)' }}>
                Web & Software<br />
                At Infinite Scale.
              </h2>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-muted)', lineHeight: 1.6, maxWidth: '440px', margin: '0 0 32px 0' }}>
                We specialize in high-fidelity web development, mission-critical software engineering, and 24/7 technical support. We build platforms that move the world.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="corp-btn-primary"
                >
                  <span>LAUNCH PROJECT</span>
                  <ArrowRight size={15} />
                </button>
                <button 
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="corp-btn-secondary"
                >
                  <span>OUR ARCHITECTURES</span>
                </button>
              </div>
            </div>

            {/* Code Window visualizer */}
            <div style={{ width: '100%', maxWidth: '400px', background: 'var(--color-surface-card)', border: '1px solid var(--color-hairline)', padding: '24px', boxSizing: 'border-box' }} className="home-desktop-only">
              <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
                {['#e22718','#f59e0b','#22c55e'].map(c => <div key={c} style={{ width: '8px', height: '8px', background: c }} />)}
              </div>
              <div style={{ fontFamily: H.mono, fontSize: '0.75rem', lineHeight: 1.6, color: 'var(--color-body)' }}>
                <span style={{ color: 'var(--color-ink)', fontWeight: 700 }}>service</span> WebDevelopment {'{'}<br />
                &nbsp;&nbsp;<span style={{ color: 'var(--color-primary)' }}>get</span> expertise() {'{'}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#e22718' }}>return</span> ['Web', 'Enterprise ERP', 'Cloud'];<br />
                &nbsp;&nbsp;{'}'}<br />
                &nbsp;&nbsp;async build() {'{'}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#e22718' }}>return</span> await this.deploy(sla: <span style={{ color: '#22c55e' }}>'99.99%'</span>);<br />
                &nbsp;&nbsp;{'}'}<br />
                {'}'}
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS BAR (Clean corporate rectangular dialect) ────────── */}
        <section style={{ background: 'var(--color-canvas)', padding: '80px 24px', borderTop: '1px solid var(--color-hairline)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {[
              { num: '20+', label: 'PROJECTS SHIPPED', sub: 'Across 3 continents' },
              { num: '99.99%', label: 'UPTIME SLA', sub: 'Zero unplanned outages' },
              { num: '100%', label: 'CLIENT SATISFACTION', sub: 'Net Promoter: Excellent' },
              { num: '3+', label: 'YEARS ENGINEERING', sub: 'Established pedigree' },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  padding: '36px 32px',
                  background: 'var(--color-surface-card)',
                  border: '1px solid var(--color-hairline)',
                  position: 'relative',
                }}
              >
                <div className="corp-display-md" style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>
                  {s.num}
                </div>
                <div className="corp-label-uppercase" style={{ color: 'var(--color-ink)', marginBottom: '6px' }}>{s.label}</div>
                <div className="corp-body-sm" style={{ color: 'var(--color-muted)' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── MISSION CAROUSEL ─────────────────────────────────────── */}
        <MissionCarousel />


        {/* ── WORKS SECTION (PORTFOLIO — 0px rectangular dialect) ──── */}
        <section id="works" style={{ padding: '80px 24px', maxWidth: '1440px', margin: '0 auto', background: 'var(--color-canvas)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--color-hairline)', paddingBottom: '20px', marginBottom: '60px' }}>
            <div>
              <span className="corp-label-uppercase" style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '8px' }}>PORTFOLIO EXCELLENCE</span>
              <h2 className="corp-display-lg" style={{ margin: 0, color: 'var(--color-ink)' }}>Selected Works</h2>
            </div>
            <span className="corp-body-sm" style={{ color: 'var(--color-muted)' }}>Engineered by VP Group</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
            {/* VexioGate Card */}
            <div className="nothin-project-row" style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-hairline)', padding: '40px' }}>
              <div className="project-img-wrapper">
                <div className="project-img-placeholder" style={{ background: 'var(--color-canvas)', border: '1px solid var(--color-hairline)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
                  <span className="corp-label-uppercase" style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>LIVE ENTERPRISE IAM</span>
                  <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-ink)', letterSpacing: '2px' }}>VEXIOGATE</span>
                </div>
              </div>
              <div className="project-meta">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
                  <span style={{ fontSize: '2rem', fontFamily: 'Inter, sans-serif', fontWeight: 700, color: 'var(--color-primary)' }}>01</span>
                  <span className="corp-label-uppercase" style={{ fontSize: '11px', padding: '4px 10px', background: '#22c55e', color: '#ffffff' }}>LIVE PRODUCTION</span>
                </div>
                <h3 className="corp-title-lg" style={{ marginBottom: '12px', color: 'var(--color-ink)' }}>VexioGate IAM Ecosystem</h3>
                <p className="corp-body-md" style={{ color: 'var(--color-body)', marginBottom: '24px' }}>
                  Next-generation identity tracking, secure workforce dashboard, and automated gateway provisioning for modern distributed enterprises.
                </p>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
                  {['React', 'MERN Stack', 'Full-Trust Security', 'RBAC'].map(t => (
                    <span key={t} className="corp-caption" style={{ background: 'var(--color-canvas)', border: '1px solid var(--color-hairline)', padding: '6px 12px', color: 'var(--color-ink)' }}>
                      {t}
                    </span>
                  ))}
                </div>
                <button onClick={() => navigate('/portfolio/vault-iam')} className="corp-btn-primary">
                  <span>VIEW CASE STUDY</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Neural Core */}
            <div className="nothin-project-row" style={{ flexDirection: 'row-reverse', background: 'var(--color-surface-card)', border: '1px solid var(--color-hairline)', padding: '40px' }}>
              <div className="project-img-wrapper">
                <div className="project-img-placeholder" style={{ background: 'var(--color-canvas)', border: '1px solid var(--color-hairline)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
                  <span className="corp-label-uppercase" style={{ color: 'var(--color-muted)', marginBottom: '8px' }}>AUTONOMOUS PIPELINE</span>
                  <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-ink)', letterSpacing: '2px' }}>NEURAL CORE</span>
                </div>
              </div>
              <div className="project-meta">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
                  <span style={{ fontSize: '2rem', fontFamily: 'Inter, sans-serif', fontWeight: 700, color: 'var(--color-muted)' }}>02</span>
                  <span className="corp-label-uppercase" style={{ fontSize: '11px', padding: '4px 10px', background: 'var(--color-primary)', color: '#ffffff' }}>IN DEVELOPMENT</span>
                </div>
                <h3 className="corp-title-lg" style={{ marginBottom: '12px', color: 'var(--color-ink)' }}>Neural Core Platform</h3>
                <p className="corp-body-md" style={{ color: 'var(--color-body)', marginBottom: '24px' }}>
                  Future integration module. Our ecosystem is actively expanding to include autonomous neural tracking, semantic reasoning loops, and multi-agent consensus.
                </p>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
                  {['AI Agents', 'RAG Engine', 'Vector Search', 'LangGraph'].map(t => (
                    <span key={t} className="corp-caption" style={{ background: 'var(--color-canvas)', border: '1px solid var(--color-hairline)', padding: '6px 12px', color: 'var(--color-ink)' }}>
                      {t}
                    </span>
                  ))}
                </div>
                <button onClick={() => navigate('/services/ai-automation')} className="corp-btn-secondary">
                  <span>LEARN MORE ABOUT AI</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── PARTNERSHIPS SECTION (0px rectangular dialect) ────── */}
        <section style={{ padding: '80px 24px', background: 'var(--color-surface-soft)', borderTop: '1px solid var(--color-hairline)', borderBottom: '1px solid var(--color-hairline)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--color-hairline)', paddingBottom: '20px', marginBottom: '48px' }}>
              <div>
                <span className="corp-label-uppercase" style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '8px' }}>ECOSYSTEM NETWORK</span>
                <h2 className="corp-display-md" style={{ margin: 0, color: 'var(--color-ink)' }}>Strategic Partnerships</h2>
              </div>
              <span className="corp-body-sm" style={{ color: 'var(--color-muted)' }}>Visionary Clients & Collaborations</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }} className="nothin-grid-2">
              <div style={{ background: 'var(--color-canvas)', border: '1px solid var(--color-hairline)', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div className="corp-label-uppercase" style={{ color: 'var(--color-primary)', marginBottom: '12px' }}>MATERNAL E-COMMERCE</div>
                  <h3 className="corp-title-lg" style={{ marginBottom: '12px', color: 'var(--color-ink)' }}>Mother Bliss</h3>
                  <p className="corp-body-md" style={{ color: 'var(--color-body)', marginBottom: '32px' }}>
                    A comprehensive maternal care ecosystem engineered by VP Group. We architected the full-stack infrastructure for seamless commerce and global scalability.
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <a href="https://wwwmotherbliss-dd920f26.vercel.app/" target="_blank" rel="noopener noreferrer" className="corp-btn-primary" style={{ textDecoration: 'none' }}>
                    <span>PRODUCTION REALM</span>
                    <ExternalLink size={14} />
                  </a>
                  <a href="https://thakurvpsingh.github.io/mothers-bliss/" target="_blank" rel="noopener noreferrer" className="corp-btn-secondary" style={{ textDecoration: 'none' }}>
                    <span>LEGACY ARCHIVE</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              <div style={{ border: '2px dashed var(--color-hairline-strong)', background: 'var(--color-surface-card)', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', background: 'var(--color-canvas)', border: '1px solid var(--color-hairline)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Users size={20} color="var(--color-primary)" />
                </div>
                <h4 className="corp-title-md" style={{ margin: '0 0 8px 0', color: 'var(--color-ink)' }}>New Partner Socket</h4>
                <div className="corp-label-uppercase" style={{ fontSize: '11px', background: 'var(--color-canvas)', border: '1px solid var(--color-hairline)', padding: '4px 10px', marginBottom: '16px', color: 'var(--color-muted)' }}>AWAITING PROVISIONING</div>
                <p className="corp-body-sm" style={{ color: 'var(--color-muted)', margin: '0 0 24px 0', maxWidth: '320px' }}>
                  Open socket for future enterprise partnerships. Join the infrastructure engineered for infinite scale.
                </p>
                <button onClick={() => navigate('/apply-partnership')} className="corp-btn-secondary">
                  <span>APPLY FOR PARTNERSHIP</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── CORE SERVICES & PLATFORMS (model-card grid on canvas) ── */}
        {/* ── CORE SERVICES & PLATFORMS (model-card grid on canvas) ── */}
        <section id="services" style={{
          backgroundColor: 'var(--color-canvas)',
          borderTop: '1px solid var(--color-hairline)',
          borderBottom: '1px solid var(--color-hairline)',
          padding: '80px 24px',
          position: 'relative',
        }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>

            {/* Section header */}
            <div style={{ marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ width: '8px', height: '8px', background: '#1c69d4', display: 'inline-block' }} />
                <span className="corp-label-uppercase" style={{ color: '#1c69d4' }}>CAPABILITIES & ARCHITECTURES</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
                <h2 className="corp-display-lg" style={{ margin: 0, maxWidth: '720px' }}>
                  Intelligent Software & Platforms We Deliver.
                </h2>
                <p className="corp-body-md" style={{ margin: 0, maxWidth: '440px', color: 'var(--color-muted)' }}>
                  From bespoke enterprise ERPs to autonomous AI automation, legacy modernization, and multi-cloud infrastructure.
                </p>
              </div>
            </div>

            {/* Category tabs: category-tab and category-tab-active */}
            <div style={{
              display: 'flex',
              gap: '12px',
              borderBottom: '1px solid var(--color-hairline)',
              marginBottom: '36px',
              overflowX: 'auto',
            }}>
              {[
                { id: 'ALL', label: 'ALL ARCHITECTURES' },
                { id: 'AI', label: 'ENTERPRISE AI & ERP' },
                { id: 'CORE', label: 'CORE SOFTWARE' },
                { id: 'CLOUD', label: 'CLOUD & DEVOPS' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setServiceCategory(tab.id)}
                  className={`corp-category-tab ${serviceCategory === tab.id ? 'active' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Service cards grid: 3-up/4-up model-card dialect */}
            <div ref={serviceCardsRef} style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '24px',
            }}>
              {[
                {
                  path: '/services/ai-custom-erp',
                  icon: <Sparkles size={28} color="#1c69d4" />,
                  category: 'AI',
                  num: '01',
                  badge: 'FLAGSHIP PLATFORM',
                  title: 'AI Custom ERP',
                  desc: 'Tailored enterprise resource planning powered by AI. Seamlessly integrates inventory forecasting, automated finance, HR, and custom operational pipelines with zero per-seat licensing.',
                  tags: ['Predictive Supply Chain', 'Automated Invoicing', 'Custom Workflows', 'Multi-Entity Ledger'],
                },
                {
                  path: '/services/legacy-modernization',
                  icon: <RefreshCw size={28} color="#1c69d4" />,
                  category: 'CORE',
                  num: '02',
                  badge: 'TRANSFORMATION',
                  title: 'Legacy Modernization',
                  desc: 'Safely transform slow, monolithic legacy architectures into agile cloud-native microservices. Eliminate technical debt and modernize databases with zero business downtime.',
                  tags: ['Strangler Fig Pattern', 'Cloud Replatforming', 'Zero Downtime', 'API Encapsulation'],
                },
                {
                  path: '/services/ai-automation',
                  icon: <Zap size={28} color="#1c69d4" />,
                  category: 'AI',
                  num: '03',
                  badge: 'AUTONOMOUS AI',
                  title: 'AI & Automation',
                  desc: 'Autonomous AI agents, semantic RAG knowledge retrieval, and custom LLM integrations that automate complex business workflows and eliminate operational bottlenecks.',
                  tags: ['Autonomous Agents', 'RAG Knowledge Bases', 'Document OCR', 'Process Automation'],
                },
                {
                  path: '/services/software-engineering',
                  icon: <Terminal size={28} color="#1c69d4" />,
                  category: 'CORE',
                  num: '04',
                  badge: 'CORE ENGINEERING',
                  title: 'Software Engineering',
                  desc: 'Full-stack enterprise application engineering. High-performance web and mobile products, robust REST/GraphQL APIs, and resilient distributed systems designed for infinite scale.',
                  tags: ['Full-Stack Web', 'Mobile Apps', 'Microservices', 'Distributed Systems'],
                },
                {
                  path: '/services/cloud-devops',
                  icon: <Cpu size={28} color="#1c69d4" />,
                  category: 'CLOUD',
                  num: '05',
                  badge: 'INFRASTRUCTURE',
                  title: 'Cloud & DevOps',
                  desc: 'Multi-cloud architecture on AWS, Google Cloud, and Azure. Kubernetes orchestration, Infrastructure as Code, continuous integration/deployment (CI/CD), and 99.99% uptime SLAs.',
                  tags: ['AWS / GCP / Azure', 'Kubernetes', 'CI/CD Pipelines', 'Zero-Downtime Releases'],
                },
                {
                  path: '/services/plugin-integrations',
                  icon: <Plug size={28} color="#1c69d4" />,
                  category: 'CORE',
                  num: '06',
                  badge: 'INTEGRATIONS',
                  title: 'Plug-ins & Integrations',
                  desc: 'High-throughput enterprise connectors, custom middleware, and marketplace plugins for Salesforce, Shopify, Stripe, Adobe Creative Cloud, Figma, Slack, and Jira.',
                  tags: ['Shopify / Salesforce', 'Stripe Connectors', 'Adobe / Figma Plugins', 'Real-time Webhooks'],
                }
              ]
              .filter(s => serviceCategory === 'ALL' || s.category === serviceCategory)
              .map((s, i) => (
                <div
                  key={i}
                  className="corp-card"
                  onClick={() => navigate(s.path)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Photo / Render Plate (model-card-photo) */}
                  <div className="corp-card-plate">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        background: 'var(--color-canvas)',
                        border: '1px solid var(--color-hairline)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {s.icon}
                      </div>
                      <span className="corp-label-uppercase" style={{ fontSize: '11px', color: 'var(--color-muted)', letterSpacing: '2px' }}>
                        SYS ARCHITECTURE // {s.num}
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <h3 className="corp-title-md" style={{ margin: 0 }}>{s.title}</h3>
                      <span className="corp-caption" style={{ color: '#1c69d4', fontWeight: 700 }}>{s.badge}</span>
                    </div>
                    <p className="corp-body-sm" style={{ margin: 0, color: 'var(--color-body)' }}>{s.desc}</p>
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                    {s.tags.map(tag => (
                      <span key={tag} className="corp-caption" style={{
                        background: 'var(--color-surface-soft)',
                        border: '1px solid var(--color-hairline)',
                        padding: '4px 8px',
                        color: 'var(--color-ink)',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA Text Link: button-text-link */}
                  <div style={{ borderTop: '1px solid var(--color-hairline)', paddingTop: '16px' }}>
                    <span className="corp-link-blue">
                      <span>EXPLORE ARCHITECTURE</span>
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Section Action Band */}
            <div style={{
              marginTop: '48px',
              padding: '24px 32px',
              background: 'var(--color-surface-soft)',
              border: '1px solid var(--color-hairline)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px',
            }}>
              <div>
                <div className="corp-title-sm" style={{ marginBottom: '4px' }}>Custom Architectural Consultation</div>
                <p className="corp-body-sm" style={{ margin: 0, color: 'var(--color-muted)' }}>
                  Looking for custom web development, dedicated engineering teams, or 24/7 technical support?
                </p>
              </div>
              <button
                onClick={() => navigate('/consultation/book')}
                className="corp-btn-primary"
              >
                <span>DISCUSS REQUIREMENTS</span>
                <ArrowRight size={15} />
              </button>
            </div>

          </div>
        </section>


        {/* ── TECHNOLOGIES WE WORK ON SECTION (0px rectangular dialect) ──── */}
        <section id="technologies" style={{ padding: '80px 24px', background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div style={{ marginBottom: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ width: '8px', height: '8px', background: '#1c69d4', display: 'inline-block' }} />
                <span className="corp-label-uppercase" style={{ color: '#1c69d4' }}>TECHNICAL STACK & PROTOCOLS</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
                <h2 className="corp-display-lg" style={{ margin: 0, maxWidth: '720px' }}>
                  Technologies & Frameworks We Deploy.
                </h2>
                <p className="corp-body-md" style={{ margin: 0, maxWidth: '440px', color: 'var(--color-muted)' }}>
                  We engineer scalable enterprise solutions using battle-tested, high-performance distributed technologies.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
              {[
                {
                  category: 'Frontend & Mobile Apps',
                  icon: <Globe size={22} color="#1c69d4" />,
                  desc: 'Responsive, lightning-fast interfaces and multi-platform mobile apps built for precision.',
                  techs: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'React Native', 'Flutter']
                },
                {
                  category: 'Backend & Microservices',
                  icon: <Terminal size={22} color="#1c69d4" />,
                  desc: 'High-throughput APIs and distributed service architectures designed for heavy concurrency.',
                  techs: ['Node.js', 'Python (FastAPI)', 'Go', 'NestJS', 'REST APIs', 'GraphQL', 'gRPC']
                },
                {
                  category: 'AI & Autonomous Systems',
                  icon: <Sparkles size={22} color="#1c69d4" />,
                  desc: 'Generative AI models, autonomous agents, and proprietary knowledge retrieval pipelines.',
                  techs: ['OpenAI GPT-4', 'Google Gemini', 'Anthropic Claude', 'LangChain', 'LlamaIndex', 'Pinecone']
                },
                {
                  category: 'Cloud & DevOps Infrastructure',
                  icon: <Cpu size={22} color="#1c69d4" />,
                  desc: 'Automated CI/CD pipelines, container orchestration, and multi-cloud resilience with 99.99% uptime.',
                  techs: ['Amazon Web Services', 'Google Cloud', 'Microsoft Azure', 'Docker', 'Kubernetes', 'Terraform']
                },
                {
                  category: 'Databases & Storage',
                  icon: <Boxes size={22} color="#1c69d4" />,
                  desc: 'Secure relational and NoSQL databases optimized for high read/write speeds and zero data loss.',
                  techs: ['PostgreSQL', 'MongoDB', 'Redis', 'ClickHouse', 'TimescaleDB', 'Supabase']
                },
                {
                  category: 'Plug-ins & Enterprise Connectors',
                  icon: <Plug size={22} color="#1c69d4" />,
                  desc: 'Two-way synchronization and marketplace plugins linking your enterprise tools seamlessly.',
                  techs: ['Shopify Apps', 'Salesforce Integrations', 'Stripe Payments', 'Adobe CC', 'Figma Plugins']
                }
              ].map((group, idx) => (
                <div key={idx} style={{ padding: '32px', background: 'var(--color-surface-card)', border: '1px solid var(--color-hairline)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '40px', height: '40px', background: 'var(--color-canvas)', border: '1px solid var(--color-hairline)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {group.icon}
                    </div>
                    <h3 className="corp-title-md" style={{ margin: 0 }}>{group.category}</h3>
                  </div>
                  <p className="corp-body-sm" style={{ color: 'var(--color-body)', marginBottom: '20px' }}>{group.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {group.techs.map(t => (
                      <span key={t} className="corp-caption" style={{ background: 'var(--color-canvas)', border: '1px solid var(--color-hairline)', padding: '5px 10px', color: 'var(--color-ink)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TALENT & ENGAGEMENT SOLUTIONS (0px rectangular dialect) ──── */}
        <section id="talent" style={{ padding: '80px 24px', background: 'var(--color-surface-soft)', borderTop: '1px solid var(--color-hairline)', borderBottom: '1px solid var(--color-hairline)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px', marginBottom: '48px' }}>
              <div>
                <span className="corp-label-uppercase" style={{ color: '#1c69d4', display: 'block', marginBottom: '8px' }}>FLEXIBLE ENGAGEMENT MODELS</span>
                <h2 className="corp-display-lg" style={{ margin: 0 }}>
                  Talent & Team Augmentation
                </h2>
              </div>
              <p className="corp-body-md" style={{ color: 'var(--color-muted)', maxWidth: '440px', margin: 0 }}>
                Scale your technical capabilities on-demand with senior software developers, cloud architects, and AI engineers.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {[
                {
                  title: 'Staff Augmentation',
                  model: 'staff-augmentation',
                  desc: 'Seamlessly add senior full-stack developers, DevOps, and QA engineers to your in-house engineering team to meet sprint deadlines faster.',
                  tag: 'IMMEDIATE VELOCITY'
                },
                {
                  title: 'Dedicated Teams',
                  model: 'dedicated-teams',
                  desc: 'Self-sufficient, autonomous engineering squads complete with Tech Leads, developers, and QA dedicated 100% to your product roadmap.',
                  tag: 'AUTONOMOUS DELIVERY'
                },
                {
                  title: 'Build-Operate-Transfer',
                  model: 'build-operate-transfer',
                  desc: 'We recruit, set up, and operate an offshore engineering center for your enterprise, and then transfer full operational ownership to you.',
                  tag: 'LONG-TERM SCALE'
                },
                {
                  title: 'Contract-to-Hire',
                  model: 'contract-to-hire',
                  desc: 'Evaluate top technical talent in real production workflows before committing to full-time permanent employment offers.',
                  tag: 'ZERO HIRING RISK'
                },
                {
                  title: 'Hire AI Engineers',
                  model: 'hire-ai-engineers',
                  desc: 'Specialized machine learning and generative AI engineers ready to deploy custom LLMs, autonomous agents, and RAG pipelines.',
                  tag: 'AI SPECIALISTS'
                }
              ].map((item, idx) => (
                <div key={idx} style={{ padding: '32px', background: 'var(--color-canvas)', border: '1px solid var(--color-hairline)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span className="corp-label-uppercase" style={{ fontSize: '11px', color: '#1c69d4', display: 'inline-block', marginBottom: '12px' }}>
                      {item.tag}
                    </span>
                    <h3 className="corp-title-md" style={{ marginBottom: '12px' }}>{item.title}</h3>
                    <p className="corp-body-sm" style={{ color: 'var(--color-body)', marginBottom: '24px' }}>{item.desc}</p>
                  </div>
                  <Link to={`/apply-partnership?model=${item.model}`} className="corp-link-blue" style={{ textDecoration: 'none' }}>
                    <span>INQUIRE ABOUT THIS MODEL</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DNA & CULTURE SECTION ────────────────────────────── */}
        <section style={{ padding: '80px 24px', background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)', borderBottom: '1px solid var(--color-hairline)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '64px', alignItems: 'center' }} className="nothin-grid-2">
            <div>
              <span className="corp-label-uppercase" style={{ color: '#1c69d4', display: 'block', marginBottom: '12px' }}>OUR PHILOSOPHY</span>
              <h2 className="corp-display-lg" style={{ marginBottom: '20px' }}>Strategic Aim & Culture</h2>
              <p className="corp-body-md" style={{ color: 'var(--color-body)', margin: 0 }}>
                At VP Group & Technologies, our mission is to democratize high-end engineering. We combine enterprise-grade security and scale with accessible, transparent pricing models, ensuring every business has access to top-tier digital infrastructure.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-hairline)', padding: '32px' }}>
                <h4 className="corp-label-uppercase" style={{ color: 'var(--color-ink)', margin: '0 0 10px 0' }}>Working Culture</h4>
                <p className="corp-body-sm" style={{ color: 'var(--color-muted)', margin: 0 }}>We thrive on radical transparency. Every engineer is a decision-maker in our flat-hierarchy network.</p>
              </div>
              <div style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-hairline)', padding: '32px' }}>
                <h4 className="corp-label-uppercase" style={{ color: 'var(--color-ink)', margin: '0 0 10px 0' }}>Industry Standing</h4>
                <p className="corp-body-sm" style={{ color: 'var(--color-muted)', margin: 0 }}>Positioned at the intersection of security and performance, solving the "Infinite Scale" problem.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT & COMMUNICATIONS SECTION ─────────────────── */}
        <section id="contact" style={{ padding: '80px 24px', maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--color-hairline)', paddingBottom: '20px', marginBottom: '60px' }}>
            <div>
              <span className="corp-label-uppercase" style={{ color: '#1c69d4', display: 'block', marginBottom: '8px' }}>DIRECT COMMUNICATION</span>
              <h2 className="corp-display-lg" style={{ margin: 0 }}>Command Center</h2>
            </div>
            <span className="corp-body-sm" style={{ color: 'var(--color-muted)' }}>Encrypted Channels</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '60px' }}>
            {[
              { label: 'COMMAND CENTER', val: 'contact.vpsdev@gmail.com', tag: '24/7 MONITORING' },
              { label: 'HEADQUARTERS', val: 'Pratapgarh, Uttar Pradesh, India', tag: 'REGIONAL HUB' },
              { label: 'BUSINESS LINE', val: 'Inquiry via Email Recommended', tag: 'GLOBAL SUPPORT' }
            ].map((c, i) => (
              <div key={i} style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-hairline)', padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '180px' }}>
                <span className="corp-label-uppercase" style={{ color: 'var(--color-muted)', fontSize: '11px', marginBottom: '8px' }}>{c.label}</span>
                <h4 className="corp-title-md" style={{ margin: '0 0 14px 0', wordBreak: 'break-word' }}>{c.val}</h4>
                <div className="corp-label-uppercase" style={{ alignSelf: 'flex-start', fontSize: '10px', background: 'var(--color-canvas)', border: '1px solid var(--color-hairline)', padding: '4px 10px', color: '#1c69d4' }}>{c.tag}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '60px' }} className="nothin-grid-2">
            <div>
              <h3 className="corp-title-lg" style={{ marginBottom: '16px' }}>Secure Transmission</h3>
              <p className="corp-body-md" style={{ color: 'var(--color-muted)', margin: 0 }}>
                Our communication lines are encrypted via end-to-end protocols. Your inquiries are routed directly to our specialized operational nodes. We typically reply within 24-48 hours.
              </p>
            </div>

            <div style={{ background: 'var(--color-surface-card)', padding: '40px', border: '1px solid var(--color-hairline)' }}>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }} className="nothin-grid-2">
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="corp-input"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="corp-input"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <input 
                  type="text" 
                  placeholder="Subject" 
                  className="corp-input" 
                  style={{ marginBottom: '16px' }}
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                />
                <textarea 
                  placeholder="Message Payload..." 
                  className="corp-input" 
                  style={{ minHeight: '120px', marginBottom: '24px', resize: 'none' }}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                ></textarea>
                <button 
                  type="submit" 
                  className="corp-btn-primary"
                  style={{ width: '100%' }}
                  disabled={loading}
                >
                  <span>{loading ? 'TRANSMITTING...' : 'INITIALIZE UPLINK'}</span>
                  <ArrowRight size={15} />
                </button>
                <p className="corp-caption" style={{ marginTop: '16px', color: 'var(--color-muted)', textAlign: 'center' }}>
                  By submitting this form, you agree to our <Link to="/terms-conditions" style={{ color: 'var(--color-ink)', fontWeight: 700 }}>Terms & Conditions</Link> and <Link to="/privacy-policy" style={{ color: 'var(--color-ink)', fontWeight: 700 }}>Privacy Policy</Link>.
                </p>
                {status && <div style={{ marginTop: '20px', textAlign: 'center', color: status.includes('Success') ? '#22c55e' : '#dc2626', fontWeight: '700' }}>{status}</div>}
              </form>
            </div>
          </div>
        </section>

        {/* ── PRE-FOOTER CTA BAND (Adapts completely to light & dark modes) ─ */}
        <section style={{ 
          padding: '80px 24px', 
          textAlign: 'center', 
          position: 'relative', 
          background: 'var(--color-surface-soft)', 
          borderTop: '1px solid var(--color-hairline)' 
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span className="corp-label-uppercase" style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '16px' }}>
              READY TO ACCELERATE
            </span>
            <h2 className="corp-display-md" style={{ color: 'var(--color-ink)', marginBottom: '20px' }}>
              Architect Your Next Enterprise Leap With VP Group.
            </h2>
            <p className="corp-body-md" style={{ color: 'var(--color-body)', marginBottom: '36px', maxWidth: '640px', margin: '0 auto 36px' }}>
              Deploy high-throughput microservices, bespoke AI ERPs, and cloud automation engineered for infinite scale and zero downtime.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/consultation/book')} className="corp-btn-primary">
                <span>SCHEDULE ARCHITECTURAL AUDIT</span>
                <ArrowRight size={15} />
              </button>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="corp-btn-secondary">
                <span>DIRECT UPLINK</span>
              </button>
            </div>
          </div>
          {/* M Tricolor engineering stripe at the base */}
          <div className="corp-tricolor-stripe" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
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
          gap: 48px;
          align-items: center;
        }
        .project-img-wrapper {
          flex: 1.2;
          width: 100%;
        }
        .project-img-placeholder {
          width: 100%;
          aspect-ratio: 16/10;
          border-radius: 0px !important;
        }
        .project-meta {
          flex: 0.8;
          width: 100%;
        }
        .nothin-tag {
          font-family: 'Inter', sans-serif !important;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-ink, #262626);
          background: var(--color-canvas, #ffffff);
          border: 1px solid var(--color-hairline, #e6e6e6);
          padding: 6px 12px;
          border-radius: 0px !important;
          letter-spacing: 0.5px;
        }
        .nothin-btn-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #1c69d4;
          color: #FFFFFF;
          border: none;
          border-radius: 0px !important;
          padding: 14px 32px;
          font-weight: 700;
          cursor: pointer;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .nothin-btn-pill:hover {
          background: #0653b6;
        }
        .nothin-btn-pill-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #1c69d4;
          color: #FFFFFF;
          border: none;
          border-radius: 0px !important;
          padding: 14px 24px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          text-align: center;
          font-size: 0.875rem;
          text-transform: uppercase;
        }
        .nothin-btn-pill-action:hover {
          background: #0653b6;
        }
        .nothin-btn-pill-action-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: var(--color-canvas, #ffffff);
          color: var(--color-ink, #262626);
          border: 1px solid var(--color-hairline, #cccccc);
          border-radius: 0px !important;
          padding: 14px 24px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          text-align: center;
          font-size: 0.875rem;
          text-transform: uppercase;
        }
        .nothin-btn-pill-action-secondary:hover {
          background: var(--color-surface-soft, #fafafa);
        }
        .nothin-input {
          width: 100%;
          background: var(--color-canvas, #ffffff);
          border: 1px solid var(--color-hairline, #e6e6e6);
          border-radius: 0px !important;
          padding: 14px 16px;
          color: var(--color-ink, #262626);
          font-size: 1rem;
        }
        .nothin-input:focus {
          border-color: var(--color-primary, #1c69d4);
          outline: none;
        }
        .nothin-btn-submit {
          width: 100%;
          padding: 14px 32px;
          height: 48px;
          background: #1c69d4;
          color: #FFFFFF;
          border: none;
          border-radius: 0px !important;
          font-weight: 700;
          font-size: 0.875rem;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .nothin-btn-submit:hover:not(:disabled) {
          background: #0653b6;
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
      `}</style>
    </div>
  );
}
