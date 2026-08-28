import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
 
export const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
 
  // Position of the actual mouse cursor
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
 
  // Buttery-smooth spring settings
  // The center dot follows almost instantly
  const dotSpringConfig = { stiffness: 800, damping: 50, mass: 0.15 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);
 
  // The outer ring has an organic lagging/bubble floating physics
  const circleSpringConfig = { stiffness: 120, damping: 22, mass: 0.65 };
  const circleX = useSpring(mouseX, circleSpringConfig);
  const circleY = useSpring(mouseY, circleSpringConfig);
 
  useEffect(() => {
    // Detect if the device is touch-enabled (pointer: coarse)
    const checkTouchDevice = () => {
      const hasTouch = window.matchMedia('(pointer: coarse)').matches || 
                       'ontouchstart' in window || 
                       navigator.maxTouchPoints > 0;
      setIsTouchDevice(hasTouch);
    };
 
    checkTouchDevice();
 
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }
 
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };
 
    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };
 
    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };
 
    // Robust delegation query for any relevant interactive element
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
 
      const interactive = target.closest('a, button, [role="button"], input, select, textarea, img, .project-card, [cursor-pointer], [onClick]');
      if (interactive) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };
 
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeaveWindow);
    window.addEventListener('mouseenter', handleMouseEnterWindow);
    window.addEventListener('mouseover', handleMouseOver);
 
    // Dynamic style insertion to hide standard browser cursor on interactive devices with pointers
    const style = document.createElement('style');
    style.id = 'custom-cursor-hide-style';
    style.innerHTML = `
      @media (pointer: fine) {
        body, a, button, [role="button"], input, select, textarea, [class*="cursor-pointer"], .cursor-pointer {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(style);
 
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeaveWindow);
      window.removeEventListener('mouseenter', handleMouseEnterWindow);
      window.removeEventListener('mouseover', handleMouseOver);
      const injectedStyle = document.getElementById('custom-cursor-hide-style');
      if (injectedStyle) injectedStyle.remove();
    };
  }, [isVisible, isTouchDevice]);
 
  if (isTouchDevice || !isVisible) return null;
 
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Outer Lagrangian Ring with luxurious blur/scaling and magnetic float */}
      <motion.div
        className="absolute rounded-full border border-rose-pink/30 mix-blend-difference pointer-events-none"
        style={{
          x: circleX,
          y: circleY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 56 : 28,
          height: isHovered ? 56 : 28,
          backgroundColor: isHovered ? 'rgba(239, 59, 51, 0.15)' : 'rgba(253, 161, 162, 0.02)',
          borderColor: isHovered ? 'rgba(239, 59, 51, 0.8)' : 'rgba(253, 161, 162, 0.4)',
          boxShadow: isHovered ? '0 0 16px rgba(239, 59, 51, 0.3)' : '0 0 0px rgba(0, 0, 0, 0)',
        }}
        transition={{
          width: { type: 'spring', stiffness: 220, damping: 25 },
          height: { type: 'spring', stiffness: 220, damping: 25 },
          backgroundColor: { duration: 0.15 },
          borderColor: { duration: 0.15 },
          boxShadow: { duration: 0.2 },
        }}
      />
 
      {/* Inner Precision Target Dot */}
      <motion.div
        className="absolute rounded-full bg-orange-brand pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 6 : 5,
          height: isHovered ? 6 : 5,
        }}
        transition={{
          width: { type: 'spring', stiffness: 350, damping: 28 },
          height: { type: 'spring', stiffness: 350, damping: 28 },
        }}
      />
    </div>
  );
};
