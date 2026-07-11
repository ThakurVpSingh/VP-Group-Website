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
  Phone
} from 'lucide-react';
import ProjectNavbar from '../components/ProjectNavbar';
import Footer from '../components/Footer';

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


export default function VPGroup() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
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
    // Ping backend on load
    fetch(getApiUrl('/api/contact')).catch(() => {});
  }, []);

  useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setScrollY(scrollPos);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
    <div style={{ minHeight: '100vh', background: '#0A0B0F', color: '#F2F4F8', fontFamily: H.font, position: 'relative', overflowX: 'hidden' }}>
      
      {/* ── PROJECT NAVBAR ────────────────────────────────────── */}
      <ProjectNavbar />

      {/* ── MAIN CONTENT substrate ───────────────────────────────── */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        
        {/* ── SPLASH HERO SECTION ─────────────────────────────────── */}
        <section style={{ 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          position: 'relative',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}>
          {/* Interactive low-level system background */}
          <SystemVisualization scrollY={scrollY} />

          {/* Centered Motive Title Block */}
          <div style={{
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
            pointerEvents: 'none'
          }}>
            <h1 style={{
              fontFamily: H.font,
              fontWeight: 950,
              color: '#F2F4F8',
              letterSpacing: '-0.04em',
              fontSize: '12vw',
              lineHeight: 1,
              margin: '0 0 16px 0',
              textShadow: '0 0 40px rgba(91, 107, 255, 0.1)',
              textTransform: 'uppercase'
            }}>
              VP GROUP
            </h1>
            <div style={{
              fontFamily: H.mono,
              fontSize: 'clamp(0.8rem, 2vw, 1.2rem)',
              fontWeight: 700,
              color: '#5B6BFF',
              letterSpacing: '12px',
              textTransform: 'uppercase',
              opacity: 0.9,
              paddingLeft: '12px'
            }}>
              BE TECHNICAL
            </div>
          </div>

          {/* Small scroll indicator */}
          <div style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '0.7rem',
            fontWeight: 800,
            letterSpacing: '4px',
            color: '#9AA0AE',
            textTransform: 'uppercase',
            zIndex: 2,
            animation: 'bounce 2s infinite'
          }}>
            SCROLL &darr;
          </div>
        </section>

        {/* ── SECONDARY DETAIL SECTION ─────────────────────────── */}
        <section style={{ 
          minHeight: '80vh', 
          display: 'flex', 
          alignItems: 'center', 
          padding: '120px 24px', 
          boxSizing: 'border-box',
          position: 'relative',
          background: '#14151C',
          borderTop: '1px solid #2A2D38',
          zIndex: 11
        }} id="intro-details">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }} className="nothin-grid-2">
            <div>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.1, margin: '0 0 24px 0', color: '#F2F4F8' }}>
                Web & Software<br />
                At Infinite Scale.
              </h2>
              <p style={{ fontSize: '0.9375rem', color: '#9AA0AE', lineHeight: 1.6, maxWidth: '440px', margin: '0 0 32px 0' }}>
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
                  style={{ background: 'transparent', border: '1px solid #2A2D38', color: '#F2F4F8' }}
                >
                  Our Services
                </button>
              </div>
            </div>

            {/* Code Window visualizer */}
            <div style={{ width: '100%', maxWidth: '400px', background: '#1E2029', border: '1px solid #2A2D38', borderRadius: '16px', padding: '24px', boxSizing: 'border-box', boxShadow: '0 16px 40px rgba(0,0,0,0.3)' }} className="home-desktop-only">
              <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
                {['#FF3A5C','#F5D547','#2BE08C'].map(c => <div key={c} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />)}
              </div>
              <div style={{ fontFamily: H.mono, fontSize: '0.75rem', lineHeight: 1.6, color: '#9AA0AE' }}>
                <span style={{ color: '#F2F4F8', fontWeight: 600 }}>service</span> WebDevelopment {'{'}<br />
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

        {/* ── MISSION STATEMENT SECTIONS ─────────────────────────── */}
        <section style={{ padding: '160px 24px', display: 'flex', flexDirection: 'column', gap: '80px', maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#F2F4F8', margin: 0, maxWidth: '900px' }}>
            Most agencies build templates.<br />
            We prefer engineering.
          </h2>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#F2F4F8', margin: 0, maxWidth: '900px', alignSelf: 'flex-end', textAlign: 'right' }}>
            Good software communicates.<br />
            Great software surprises.
          </h2>
        </section>

        {/* ── WORKS SECTION (PORTFOLIO) ─────────────────────────── */}
        <section style={{ padding: '120px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #2A2D38', paddingBottom: '16px', marginBottom: '60px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>Selected Works</span>
            <span style={{ fontSize: '0.8rem', color: '#9AA0AE' }}>The Portfolio</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '120px' }}>
            {/* VexioGate Card */}
            <div className="nothin-project-row">
              <div className="project-img-wrapper">
                <div className="project-img-placeholder" style={{ background: '#14151C', border: '1px solid #2A2D38', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '3rem', fontWeight: 900, color: 'rgba(255,255,255,0.03)', letterSpacing: '4px' }}>VEXIOGATE</span>
                </div>
              </div>
              <div className="project-meta">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
                  <span style={{ fontSize: '2.5rem', fontFamily: H.mono, fontWeight: 300, color: '#5C6170' }}>01</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '2px', padding: '4px 10px', background: '#1E2029', borderRadius: '4px', color: '#2BE08C' }}>LIVE</span>
                </div>
                <h3 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '16px', color: '#F2F4F8' }}>VexioGate IAM Ecosystem</h3>
                <p style={{ fontSize: '0.95rem', color: '#9AA0AE', lineHeight: 1.6, marginBottom: '28px' }}>
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
                <div className="project-img-placeholder" style={{ background: '#14151C', border: '1px solid #2A2D38', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '3rem', fontWeight: 900, color: 'rgba(255,255,255,0.03)', letterSpacing: '4px' }}>NEURAL CORE</span>
                </div>
              </div>
              <div className="project-meta">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
                  <span style={{ fontSize: '2.5rem', fontFamily: H.mono, fontWeight: 300, color: '#5C6170' }}>02</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '2px', padding: '4px 10px', background: '#1E2029', borderRadius: '4px', color: '#5B6BFF' }}>DEV</span>
                </div>
                <h3 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '16px', color: '#F2F4F8' }}>Neural Core Platform</h3>
                <p style={{ fontSize: '0.95rem', color: '#9AA0AE', lineHeight: 1.6, marginBottom: '28px' }}>
                  Future integration module. Our ecosystem is actively expanding to include autonomous neural tracking and semantic reasoning loops.
                </p>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
                  {['AI', 'Agents', 'RAG'].map(t => <span key={t} className="nothin-tag">{t}</span>)}
                </div>
                <div className="nothin-tag" style={{ display: 'inline-block', color: '#5C6170', background: '#1E2029' }}>
                  In Development
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PARTNERSHIPS SECTION ──────────────────────────────── */}
        <section style={{ padding: '120px 24px', background: '#14151C', borderTop: '1px solid #2A2D38', borderBottom: '1px solid #2A2D38' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #2A2D38', paddingBottom: '16px', marginBottom: '60px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>Partnerships</span>
              <span style={{ fontSize: '0.8rem', color: '#9AA0AE' }}>Visionary Clients</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }} className="nothin-grid-2">
              <div style={{ background: '#1E2029', border: '1px solid #2A2D38', padding: '48px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#5B6BFF', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Maternal E-Commerce</div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px', color: '#F2F4F8' }}>Mother Bliss</h3>
                  <p style={{ fontSize: '0.95rem', color: '#9AA0AE', lineHeight: 1.6, marginBottom: '32px' }}>
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

              <div style={{ border: '2px dashed #2A2D38', padding: '48px', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justify: 'center', marginBottom: '24px' }}>
                  <Users size={20} color="#9AA0AE" />
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 8px 0', color: '#F2F4F8' }}>New Partner Socket</h4>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '1.5px', background: '#1E2029', padding: '4px 10px', borderRadius: '20px', marginBottom: '16px', color: '#5C6170' }}>AWAITING PROVISIONING</div>
                <p style={{ fontSize: '0.875rem', color: '#9AA0AE', lineHeight: 1.5, margin: 0, maxWidth: '280px' }}>
                  Open socket for future enterprise partnerships. Join the infrastructure that moves the world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES SECTION ─────────────────────────────────── */}
        <section id="services" style={{ padding: '120px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #2A2D38', paddingBottom: '16px', marginBottom: '60px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>Services</span>
            <span style={{ fontSize: '0.8rem', color: '#9AA0AE' }}>Our Capabilities</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2px', background: '#2A2D38', border: '1px solid #2A2D38' }}>
            {[
              { path: '/services/web-development', title: 'Web Development', desc: 'Fluid React interfaces and robust e-commerce ecosystems engineered for high-velocity conversion.' },
              { path: '/services/software-engineering', title: 'Software Engineering', desc: 'Custom enterprise software solutions, mission-critical IAM platforms, and scalable backends.' },
              { path: '/services/technical-support', title: 'Technical Support', desc: '24/7 dedicated support mesh ensuring your digital infrastructure remains resilient and secure.' },
              { path: '/services/seo-analytics-setup', title: 'SEO & Analytics', desc: 'Google Search Console, Analytics (GA4), and Tag Manager setup to index your site and track growth.' },
              { path: '/services/ai-automation', title: 'AI Automation', desc: 'Autonomous AI agents, semantic RAG retrieval systems, and customized workflow automations.' },
            ].map((s, i) => (
              <div key={i} onClick={() => navigate(s.path)} className="nothin-service-card">
                <span style={{ fontSize: '0.8rem', fontFamily: H.mono, color: '#5C6170', display: 'block', marginBottom: '24px' }}>0{i+1}</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px', letterSpacing: '-0.015em', color: '#F2F4F8' }}>{s.title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#9AA0AE', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                <div className="nothin-service-arrow">
                  <ArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── DNA & CULTURE SECTION ────────────────────────────── */}
        <section style={{ padding: '120px 24px', background: '#14151C', borderTop: '1px solid #2A2D38', borderBottom: '1px solid #2A2D38' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'center' }} className="nothin-grid-2">
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#9AA0AE', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>OUR DNA</div>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 850, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '24px', color: '#F2F4F8' }}>Strategic Aim & Culture</h2>
              <p style={{ fontSize: '1.05rem', color: '#9AA0AE', lineHeight: 1.7, margin: 0 }}>
                At VP Group, our mission is to democratize high-end engineering. We combine enterprise-grade security and scale with accessible pricing models, ensuring every business has access to top-tier digital infrastructure.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ background: '#1E2029', border: '1px solid #2A2D38', padding: '32px', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 12px 0', color: '#F2F4F8' }}>Working Culture</h4>
                <p style={{ fontSize: '0.9rem', color: '#9AA0AE', lineHeight: 1.5, margin: 0 }}>We thrive on radical transparency. Every engineer is a decision-maker in our flat-hierarchy network.</p>
              </div>
              <div style={{ background: '#1E2029', border: '1px solid #2A2D38', padding: '32px', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 12px 0', color: '#F2F4F8' }}>Industry Standing</h4>
                <p style={{ fontSize: '0.9rem', color: '#9AA0AE', lineHeight: 1.5, margin: 0 }}>Positioned at the intersection of security and performance, solving the "Infinite Scale" problem.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT & COMMUNICATIONS SECTION ─────────────────── */}
        <section id="contact" style={{ padding: '120px 24px 200px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #2A2D38', paddingBottom: '16px', marginBottom: '80px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>Direct Communication</span>
            <span style={{ fontSize: '0.8rem', color: '#9AA0AE' }}>Command Center</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginBottom: '80px' }}>
            {[
              { label: 'Command Center', val: 'contact.vpsdev@gmail.com', tag: '24/7 Monitoring' },
              { label: 'Headquarters', val: 'Pratapgarh, Uttar Pradesh, India', tag: 'Regional Hub' },
              { label: 'Business Line', val: 'Inquiry via Email Recommended', tag: 'Support Mesh' }
            ].map((c, i) => (
              <div key={i} style={{ background: '#14151C', border: '1px solid #2A2D38', padding: '40px 32px', borderRadius: '16px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '220px' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#9AA0AE', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>{c.label}</span>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 16px 0', color: '#F2F4F8', wordBreak: 'break-word' }}>{c.val}</h4>
                <div style={{ display: 'inline-block', alignSelf: 'flex-start', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '1px', background: '#1E2029', padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase', color: '#9AA0AE' }}>{c.tag}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '60px' }} className="nothin-grid-2">
            <div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '16px', color: '#F2F4F8' }}>Secure Transmission</h3>
              <p style={{ fontSize: '0.95rem', color: '#9AA0AE', lineHeight: 1.6, margin: 0 }}>
                Our communication lines are encrypted via end-to-end protocols. Your inquiries are routed directly to our specialized operational nodes. We typically reply within 24-48 hours.
              </p>
            </div>

            <div style={{ background: '#14151C', padding: '40px', borderRadius: '16px', border: '1px solid #2A2D38' }}>
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
                <p style={{ marginTop: '16px', fontSize: '0.7rem', color: '#5C6170', textAlign: 'center', lineHeight: '1.4', margin: '16px 0 0 0' }}>
                  By submitting this form, you agree to our <Link to="/terms-conditions" style={{ color: '#F2F4F8', textDecoration: 'underline', fontWeight: 600 }}>Terms & Conditions</Link> and <Link to="/privacy-policy" style={{ color: '#F2F4F8', textDecoration: 'underline', fontWeight: 600 }}>Privacy Policy</Link>.
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
          color: #9AA0AE;
          background: #1E2029;
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
          color: #F2F4F8;
          border: 1px solid #2A2D38;
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
          background: #1E2029;
          border-color: #5B6BFF;
        }
        .nothin-service-card {
          background: #14151C;
          padding: 48px;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
        }
        .nothin-service-card:hover {
          background: #1E2029;
        }
        .nothin-service-arrow {
          position: absolute;
          bottom: 32px;
          right: 32px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #2A2D38;
          color: #F2F4F8;
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
          background: #1E2029;
          border: 1px solid #2A2D38;
          border-radius: 8px;
          padding: 14px;
          color: #F2F4F8;
          font-size: 0.95rem;
          transition: all 0.2s;
        }
        .nothin-input:focus {
          border-color: #5B6BFF;
          outline: none;
          background: #1E2029;
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
