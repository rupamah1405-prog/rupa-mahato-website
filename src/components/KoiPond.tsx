import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Floater {
  id: string;
  name: string;
  x: number;
  y: number;
}

interface Bubble {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  life: number;
  maxLife: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

interface Spot {
  segIndex: number;
  offsetAngle: number;
  offsetDist: number;
  radius: number;
  color: string;
}

interface Koi {
  name: 'Rupa';
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  targetAngle: number;
  spine: { x: number; y: number }[];
  segmentLength: number;
  bodyRadii: number[];
  colorBase: string; // Base body color (with alpha)
  colorAccent: string; // Spot color
  colorFin: string; // Fin base color
  spots: Spot[];
  tailWave: number;
  tailWaveSpeed: number;
  speed: number;
  baseSpeed: number;
  maxSpeed: number;
  state: 'swimming' | 'spooked' | 'bursting' | 'invisible' | 'appearing';
  alpha: number;
  cooldownTimer: number;
  swimCycle: number;
  scale: number;
}

export const KoiPond: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [floaters, setFloaters] = useState<Floater[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, lastX: -1000, lastY: -1000, speed: 0 });
  const koisRef = useRef<Koi[]>([]);
  const bubblesRef = useRef<Bubble[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current;
      const dx = e.clientX - mouse.lastX;
      const dy = e.clientY - mouse.lastY;
      mouse.speed = Math.min(25, Math.hypot(dx, dy));
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const mouse = mouseRef.current;
        mouse.x = touch.clientX;
        mouse.y = touch.clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rAFId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initializing custom spinal segments for realistic wave deformation
    const createSpine = (startX: number, startY: number, count = 10, segLen = 5) => {
      const spine = [];
      for (let i = 0; i < count; i++) {
        spine.push({ x: startX - i * segLen, y: startY });
      }
      return spine;
    };

    // Body thickness along segments (head to tail tapering)
    const bodyRadii = [6.5, 8.5, 9.5, 9, 8, 6.5, 4.8, 3.2, 2, 1.2];

    const generateSpots = (accentColor: string): Spot[] => {
      return [
        { segIndex: 1, offsetAngle: -0.3, offsetDist: 3, radius: 4.5, color: accentColor },
        { segIndex: 3, offsetAngle: 0.5, offsetDist: 2, radius: 6, color: accentColor },
        { segIndex: 5, offsetAngle: -0.4, offsetDist: 1.5, radius: 4, color: accentColor },
        { segIndex: 6, offsetAngle: 0.2, offsetDist: 1, radius: 2.8, color: accentColor },
        // White highlights inside spots for pearlescent accent
        { segIndex: 3, offsetAngle: 0.3, offsetDist: 1, radius: 2.5, color: 'rgba(255,255,255,0.7)' },
        { segIndex: 1, offsetAngle: -0.2, offsetDist: 1.5, radius: 1.8, color: 'rgba(255,255,255,0.6)' }
      ];
    };

    // Instantiate Rupa with safe centered coordinates
    const initialKois: Koi[] = [
      {
        name: 'Rupa', // Majestic, realistic single koi fish: Rust Orange base, beautiful rose pink spots, glowing silky white-pink fins
        x: width * 0.5,
        y: height * 0.5,
        vx: 1,
        vy: -0.5,
        angle: -0.5,
        targetAngle: -0.5,
        spine: createSpine(width * 0.5, height * 0.5, 10, 5.8),
        segmentLength: 5.8,
        bodyRadii: [...bodyRadii],
        colorBase: 'rgba(181, 82, 57, 0.95)', // Rust Orange base
        colorAccent: '#FDA1A2', // Elegant Rose Pink spots
        colorFin: 'rgba(253, 161, 162, 0.4)', // Silk glowing rose fins
        spots: generateSpots('#FDA1A2'),
        tailWave: 0,
        tailWaveSpeed: 0.13,
        speed: 1.5,
        baseSpeed: 1.45,
        maxSpeed: 4.6,
        state: 'swimming',
        alpha: 1,
        cooldownTimer: 0,
        swimCycle: Math.random() * Math.PI * 2,
        scale: 1.5
      }
    ];

    koisRef.current = initialKois;

    const spawnBurst = (x: number, y: number) => {
      // Create ripples
      ripplesRef.current.push({
        x,
        y,
        radius: 5,
        maxRadius: 75,
        alpha: 1
      });

      // Spawn bubbles
      const bubbleCount = 18 + Math.floor(Math.random() * 8);
      for (let i = 0; i < bubbleCount; i++) {
        const randomAngle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 3.5;
        bubblesRef.current.push({
          x,
          y,
          vx: Math.cos(randomAngle) * speed + (Math.random() - 0.5) * 0.6,
          vy: Math.sin(randomAngle) * speed - 1.2, // Floats upward trend
          radius: 1.5 + Math.random() * 4.5,
          alpha: 0.8 + Math.random() * 0.2,
          life: 0,
          maxLife: 40 + Math.floor(Math.random() * 50)
        });
      }
    };

    const runLoop = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const kois = koisRef.current;
      const bubbles = bubblesRef.current;
      const ripples = ripplesRef.current;

      // Update & Draw Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += (r.maxRadius - r.radius) * 0.08;
        r.alpha -= 0.022;

        if (r.alpha <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(253, 161, 162, ${r.alpha * 0.25})`;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(255, 255, 255, ${r.alpha * 0.15})`;
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius * 0.7, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Update & Draw bubbles
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        b.x += b.vx;
        b.y += b.vy;
        b.vy -= 0.035; // Slow ambient upward float
        b.vx *= 0.96; // Water drag
        b.life++;

        b.alpha = 1 - b.life / b.maxLife;

        if (b.life >= b.maxLife || b.alpha <= 0) {
          bubbles.splice(i, 1);
          continue;
        }

        // Render bubble with glassy highlight
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(
          b.x - b.radius * 0.3,
          b.y - b.radius * 0.3,
          b.radius * 0.1,
          b.x,
          b.y,
          b.radius
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${b.alpha * 0.85})`);
        grad.addColorStop(0.35, `rgba(253, 161, 162, ${b.alpha * 0.35})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${b.alpha * 0.08})`);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.strokeStyle = `rgba(255, 255, 255, ${b.alpha * 0.4})`;
        ctx.lineWidth = 0.55;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Update & Draw Koi
      for (let k = 0; k < kois.length; k++) {
        const koi = kois[k];

        if (koi.cooldownTimer > 0) {
          koi.cooldownTimer--;
        }

        // Floating Label and Rebirth Cycle
        if (koi.state === 'invisible') {
          continue;
        }

        if (koi.state === 'bursting') {
          spawnBurst(koi.spine[0].x, koi.spine[0].y);

          // Add clean HTML relative floating name tag
          const fx = koi.spine[0].x;
          const fy = koi.spine[0].y;
          const labelName = 'Rupa 🐠';

          setFloaters((prev) => [
            ...prev,
            { id: `${koi.name}-${Date.now()}`, name: labelName, x: fx, y: fy }
          ]);

          koi.state = 'invisible';
          koi.alpha = 0;

          // Graceful rebirth timing (after 5.5 seconds, return nearby)
          const index = k;
          setTimeout(() => {
            if (!canvasRef.current) return;
            const freshKoi = koisRef.current[index];
            if (!freshKoi) return;
            const angles = [Math.random() * Math.PI * 2, Math.random() * Math.PI * 2];
            
            // Reappear gracefully away from previous pointer position
            let rx = Math.random() * window.innerWidth;
            let ry = Math.random() * window.innerHeight;
            while (Math.hypot(rx - mouseRef.current.x, ry - mouseRef.current.y) < 220) {
              rx = Math.random() * window.innerWidth;
              ry = Math.random() * window.innerHeight;
            }

            freshKoi.x = rx;
            freshKoi.y = ry;
            freshKoi.angle = angles[0];
            freshKoi.targetAngle = angles[1];
            freshKoi.spine = createSpine(rx, ry, 10, freshKoi.segmentLength);
            freshKoi.state = 'appearing';
            freshKoi.alpha = 0;
            freshKoi.cooldownTimer = 90; // Prevent instant trigger on spawn
          }, 5500);

          continue;
        }

        if (koi.state === 'appearing') {
          koi.alpha += 0.015;
          if (koi.alpha >= 1) {
            koi.alpha = 1;
            koi.state = 'swimming';
          }
        }

        // Steer & wander logic
        koi.swimCycle += 0.038;

        // Dynamic boundaries correction
        const pad = 120;
        let boundaryForceX = 0;
        let boundaryForceY = 0;

        if (koi.x < pad) {
          boundaryForceX = (pad - koi.x) / pad;
        } else if (koi.x > width - pad) {
          boundaryForceX = (width - pad - koi.x) / pad;
        }
        if (koi.y < pad) {
          boundaryForceY = (pad - koi.y) / pad;
        } else if (koi.y > height - pad) {
          boundaryForceY = (height - pad - koi.y) / pad;
        }

        if (boundaryForceX !== 0 || boundaryForceY !== 0) {
          // Guide target angle away from screen edge smoothly
          koi.targetAngle = Math.atan2(height / 2 - koi.y, width / 2 - koi.x);
        } else {
          // Delicate noise-guided wandering paths
          if (Math.random() < 0.008) {
            koi.targetAngle = koi.angle + (Math.random() - 0.5) * Math.PI * 1.5;
          } else {
            koi.targetAngle += Math.sin(koi.swimCycle * 0.4) * 0.014;
          }
        }

        // Handle Pointer dodging / approach steering
        const dx = koi.x - mouse.x;
        const dy = koi.y - mouse.y;
        const distToMouse = Math.hypot(dx, dy);

        if (distToMouse < 180 && distToMouse > 24) {
          koi.state = 'spooked';
          const escapeAngle = Math.atan2(dy, dx);
          // Strong push away from mouse
          koi.targetAngle = escapeAngle + Math.sin(koi.swimCycle * 2) * 0.22;
          koi.speed += (koi.maxSpeed - koi.speed) * 0.09;
        } else if (distToMouse <= 24 && koi.state !== 'appearing' && koi.cooldownTimer === 0) {
          koi.state = 'bursting';
        } else {
          if (koi.state === 'spooked') koi.state = 'swimming';
          // Gliding pulse movement physics
          const targetSwimSpeed = koi.baseSpeed * (1.15 + 0.35 * Math.sin(koi.swimCycle));
          koi.speed += (targetSwimSpeed - koi.speed) * 0.05;
        }

        // Align heading angle
        let angleDiff = koi.targetAngle - koi.angle;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        koi.angle += angleDiff * 0.082; // Turning responsive factor

        // Step forward
        koi.x += Math.cos(koi.angle) * koi.speed;
        koi.y += Math.sin(koi.angle) * koi.speed;

        // Kinematic tail/spine propagation
        koi.spine[0].x = koi.x;
        koi.spine[0].y = koi.y;
        for (let i = 1; i < koi.spine.length; i++) {
          const prev = koi.spine[i - 1];
          const curr = koi.spine[i];
          const segDx = prev.x - curr.x;
          const segDy = prev.y - curr.y;
          const segDist = Math.hypot(segDx, segDy);

          if (segDist > koi.segmentLength) {
            curr.x = prev.x - (segDx / segDist) * koi.segmentLength;
            curr.y = prev.y - (segDy / segDist) * koi.segmentLength;
          }
        }

        // Continuous waving animation phase proportional to velocity
        koi.tailWave += koi.speed * koi.tailWaveSpeed;

        // --- DRAWING PORTION (PREMIUM GLOW + GRADIENT EXTRACTION) ---
        ctx.save();
        ctx.globalAlpha = koi.alpha;

        const scale = koi.scale;

        // 1. Draw beautiful dark dropshadow under the body to give 3D floating volume
        ctx.shadowColor = 'rgba(29, 24, 66, 0.45)';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 12;
        ctx.shadowOffsetY = 15;

        // Generate the body skin contour path
        const bodyContour = (): Path2D => {
          const path = new Path2D();
          const leftPoints: { x: number; y: number }[] = [];
          const rightPoints: { x: number; y: number }[] = [];

          // Spine coordinate tracing with left/right offsets
          for (let i = 0; i < koi.spine.length; i++) {
            const curr = koi.spine[i];
            const next = koi.spine[Math.min(i + 1, koi.spine.length - 1)];
            const angle = Math.atan2(next.y - curr.y, next.x - curr.x);
            const perp = angle + Math.PI / 2;

            const r = koi.bodyRadii[i] * scale;

            leftPoints.push({
              x: curr.x + Math.cos(perp) * r,
              y: curr.y + Math.sin(perp) * r
            });
            rightPoints.push({
              x: curr.x - Math.cos(perp) * r,
              y: curr.y - Math.sin(perp) * r
            });
          }

          // Move to head bulb start
          path.moveTo(leftPoints[0].x, leftPoints[0].y);

          // Front head rounded bulb
          const headAngle = Math.atan2(koi.spine[1].y - koi.spine[0].y, koi.spine[1].x - koi.spine[0].x);
          const headCenter = koi.spine[0];
          const headR = koi.bodyRadii[0] * scale;
          path.arc(headCenter.x, headCenter.y, headR, headAngle + Math.PI / 2, headAngle - Math.PI / 2, true);

          // Left Outline
          for (let i = 1; i < leftPoints.length; i++) {
            path.lineTo(leftPoints[i].x, leftPoints[i].y);
          }

          // Tail point
          const lastPoint = koi.spine[koi.spine.length - 1];
          path.lineTo(lastPoint.x, lastPoint.y);

          // Right Outline (bottom-up back to head)
          for (let i = rightPoints.length - 1; i >= 1; i--) {
            path.lineTo(rightPoints[i].x, rightPoints[i].y);
          }

          path.closePath();
          return path;
        };

        const fullPath = bodyContour();

        // 2. Clear drop shadows before layering glowing light fins
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Pectoral Fins (flowing and waving elegantly near head seg 1)
        const pecLeftAngle = koi.angle - Math.PI / 2.8 - Math.sin(koi.tailWave) * 0.12;
        const pecRightAngle = koi.angle + Math.PI / 2.8 + Math.sin(koi.tailWave) * 0.12;

        const drawPecFin = (leftSide: boolean, angle: number) => {
          const startPt = koi.spine[1];
          const finLength = 26 * scale;
          const finWidth = 14 * scale;

          ctx.beginPath();
          ctx.moveTo(startPt.x, startPt.y);

          const tipX = startPt.x + Math.cos(angle) * finLength;
          const tipY = startPt.y + Math.sin(angle) * finLength;

          const controlAngle = angle + (leftSide ? -0.4 : 0.4);
          const cpX = startPt.x + Math.cos(controlAngle) * (finLength * 0.85);
          const cpY = startPt.y + Math.sin(controlAngle) * (finLength * 0.85);

          ctx.quadraticCurveTo(cpX, cpY, tipX, tipY);
          ctx.bezierCurveTo(
            tipX - Math.cos(angle) * 4,
            tipY - Math.sin(angle) * 4,
            startPt.x - Math.cos(koi.angle) * (finWidth * 0.5),
            startPt.y - Math.sin(koi.angle) * (finWidth * 0.5),
            startPt.x,
            startPt.y
          );

          const finGrad = ctx.createLinearGradient(startPt.x, startPt.y, tipX, tipY);
          finGrad.addColorStop(0, koi.colorBase);
          finGrad.addColorStop(0.3, koi.colorFin);
          finGrad.addColorStop(1, 'rgba(255,255,255,0.02)');

          ctx.fillStyle = finGrad;
          ctx.fill();

          ctx.strokeStyle = `rgba(255,255,255, ${leftSide ? 0.22 : 0.14})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        };

        drawPecFin(true, pecLeftAngle);
        drawPecFin(false, pecRightAngle);

        // Ventral/Pelvic micro fins (seg 5)
        const drawPelvicFin = (leftSide: boolean) => {
          const startPt = koi.spine[5];
          const finAngle = koi.angle + (leftSide ? -Math.PI / 2.1 : Math.PI / 2.1) + Math.sin(koi.tailWave) * 0.08;
          const len = 12 * scale;

          ctx.beginPath();
          ctx.moveTo(startPt.x, startPt.y);
          const tipX = startPt.x + Math.cos(finAngle) * len;
          const tipY = startPt.y + Math.sin(finAngle) * len;
          ctx.lineTo(tipX, tipY);
          ctx.lineTo(startPt.x - Math.cos(koi.angle) * 3, startPt.y - Math.sin(koi.angle) * 3);

          const grad = ctx.createLinearGradient(startPt.x, startPt.y, tipX, tipY);
          grad.addColorStop(0, koi.colorBase);
          grad.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = grad;
          ctx.fill();
        };
        drawPelvicFin(true);
        drawPelvicFin(false);

        // Huge waving Silk Tail Fin (seg 9)
        const tailJoint = koi.spine[koi.spine.length - 1];
        const tailJointPrev = koi.spine[koi.spine.length - 2];
        const segAngle = Math.atan2(tailJoint.y - tailJointPrev.y, tailJoint.x - tailJointPrev.x);
        const tailAngleOffset = Math.sin(koi.tailWave) * 0.42;
        const mainTailAngle = segAngle + tailAngleOffset;

        const drawTailFin = () => {
          const finLen = 38 * scale;
          const spread = 20 * scale;

          ctx.beginPath();
          ctx.moveTo(tailJoint.x, tailJoint.y);

          // Flowing bezier lines forming a gorgeous curtain fin
          const tip1X = tailJoint.x + Math.cos(mainTailAngle - 0.22) * finLen;
          const tip1Y = tailJoint.y + Math.sin(mainTailAngle - 0.22) * finLen;

          const tip2X = tailJoint.x + Math.cos(mainTailAngle + 0.22) * finLen;
          const tip2Y = tailJoint.y + Math.sin(mainTailAngle + 0.22) * finLen;

          const waveFactorX = Math.cos(koi.tailWave * 0.5) * 5;
          const waveFactorY = Math.sin(koi.tailWave * 0.5) * 5;

          ctx.bezierCurveTo(
            tailJoint.x + Math.cos(mainTailAngle - 0.1) * (finLen * 0.4),
            tailJoint.y + Math.sin(mainTailAngle - 0.1) * (finLen * 0.4),
            tip1X - 8 + waveFactorX,
            tip1Y + waveFactorY,
            tip1X,
            tip1Y
          );

          ctx.bezierCurveTo(
            tailJoint.x + Math.cos(mainTailAngle) * (finLen * 0.8) + waveFactorX * 0.5,
            tailJoint.y + Math.sin(mainTailAngle) * (finLen * 0.8) + waveFactorY * 0.5,
            tip2X - 5,
            tip2Y,
            tip2X,
            tip2Y
          );

          ctx.bezierCurveTo(
            tailJoint.x + Math.cos(mainTailAngle + 0.1) * (finLen * 0.5),
            tailJoint.y + Math.sin(mainTailAngle + 0.1) * (finLen * 0.5),
            tailJoint.x,
            tailJoint.y,
            tailJoint.x,
            tailJoint.y
          );

          const tailGrad = ctx.createLinearGradient(tailJoint.x, tailJoint.y, tip2X, tip2Y);
          tailGrad.addColorStop(0, koi.colorBase);
          tailGrad.addColorStop(0.35, koi.colorFin);
          tailGrad.addColorStop(1, 'rgba(255,255,255,0.01)');

          ctx.fillStyle = tailGrad;
          ctx.fill();

          ctx.strokeStyle = `rgba(255,255,255,0.2)`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        };
        drawTailFin();

        // 3. Re-apply drop shadow for main body contour and clipping mask
        ctx.shadowColor = 'rgba(15, 11, 46, 0.45)';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetX = 6 * scale;
        ctx.shadowOffsetY = 10 * scale;

        // Draw body shape and fill base pearlescent tone
        ctx.beginPath();
        ctx.fillStyle = koi.colorBase;
        // Draw using the Path2D built contour
        ctx.fill(fullPath);

        // Turn off shadows for interior spots
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Clipping spots inside body for natural organic shape wrapping
        ctx.save();
        ctx.clip(fullPath);

        // Draw spots
        for (let s = 0; s < koi.spots.length; s++) {
          const spot = koi.spots[s];
          const seg = koi.spine[spot.segIndex];
          const nextSeg = koi.spine[Math.min(spot.segIndex + 1, koi.spine.length - 1)];
          const segAngle = Math.atan2(nextSeg.y - seg.y, nextSeg.x - seg.x);

          const finalSpotAngle = segAngle + spot.offsetAngle;
          const spotX = seg.x + Math.cos(finalSpotAngle) * spot.offsetDist * scale;
          const spotY = seg.y + Math.sin(finalSpotAngle) * spot.offsetDist * scale;

          ctx.beginPath();
          ctx.arc(spotX, spotY, spot.radius * scale, 0, Math.PI * 2);
          ctx.fillStyle = spot.color;
          ctx.fill();
        }

        ctx.restore(); // Stop Body clipping

        // Draw Dorsal/Back Fin (segment 2 to 7 line with soft white edge)
        ctx.beginPath();
        ctx.moveTo(koi.spine[2].x, koi.spine[2].y);
        for (let i = 3; i <= 7; i++) {
          ctx.lineTo(koi.spine[i].x, koi.spine[i].y);
        }
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.lineWidth = 1.3 * scale;
        ctx.stroke();

        // Draw beautiful eyes on Head with detailed tiny sparkles
        const headH = koi.spine[0];
        const eyRad = 1.6 * scale;
        const eyOffset = 5.2 * scale;
        const eyAngle = koi.angle + Math.PI / 2.3;

        const leftEyeX = headH.x + Math.cos(eyAngle) * eyOffset;
        const leftEyeY = headH.y + Math.sin(eyAngle) * eyOffset;
        const rightEyeX = headH.x - Math.cos(eyAngle) * eyOffset;
        const rightEyeY = headH.y - Math.sin(eyAngle) * eyOffset;

        ctx.fillStyle = '#0F0E26'; // Deep glossy obsidian black eyes
        ctx.beginPath();
        ctx.arc(leftEyeX, leftEyeY, eyRad, 0, Math.PI * 2);
        ctx.arc(rightEyeX, rightEyeY, eyRad, 0, Math.PI * 2);
        ctx.fill();

        // White reflection sparkles
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.beginPath();
        ctx.arc(leftEyeX - eyRad * 0.35, leftEyeY - eyRad * 0.35, eyRad * 0.4, 0, Math.PI * 2);
        ctx.arc(rightEyeX - eyRad * 0.35, rightEyeY - eyRad * 0.35, eyRad * 0.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore(); // Restore base transform matrix
      }

      rAFId = requestAnimationFrame(runLoop);
    };

    rAFId = requestAnimationFrame(runLoop);

    return () => {
      cancelAnimationFrame(rAFId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Clean floaters stack, dropping those old
  const handleFloaterAnimationComplete = (id: string) => {
    setFloaters((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <>
      {/* Absolute canvas layout that takes 0 clicks/pointer interference */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-screen h-screen z-0 pointer-events-none"
        id="koi-ponder"
      />

      {/* Dynamic Animated Presence for Name labels */}
      <div className="fixed inset-0 w-screen h-screen z-10 pointer-events-none overflow-hidden">
        <AnimatePresence>
          {floaters.map((floater) => (
            <motion.div
              key={floater.id}
              initial={{ opacity: 0, scale: 0.8, y: floater.y - 10, x: floater.x - 50 }}
              animate={{ opacity: 1, scale: 1.1, y: floater.y - 45 }}
              exit={{ opacity: 0, scale: 0.9, y: floater.y - 75 }}
              onAnimationComplete={() => {
                // Remove from state beautifully
                setTimeout(() => handleFloaterAnimationComplete(floater.id), 2600);
              }}
              transition={{
                duration: 0.6,
                ease: [0.34, 1.56, 0.64, 1] // Warm springy bounce
              }}
              className="absolute bg-[#1D1842]/85 backdrop-blur-md border border-rose-pink/30 px-4 py-1.5 rounded-full shadow-[0_12px_24px_rgba(253,161,162,0.15)] flex items-center justify-center pointer-events-none"
            >
              <span className="text-[10px] md:text-xs font-serif italic text-white font-semibold tracking-wider select-none pr-1">
                {floater.name}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

