"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useLightMotion } from "@/lib/hooks/use-light-motion";

type NetworkConstellationProps = {
  className?: string;
  showLogLines?: boolean;
};

/* ------------------------------------------------------------------ */
/* SVG Network Topology — data                                         */
/* ------------------------------------------------------------------ */

const HUB = { x: 500, y: 250, r: 28, color: "#1e293b", label: "INSLAB" };

const pillars = [
  { id: "data",    x: 500, y: 100, color: "#0d9488", label: "DATA" },
  { id: "system",  x: 680, y: 370, color: "#2563eb", label: "SYSTEM" },
  { id: "service", x: 320, y: 370, color: "#7c3aed", label: "SERVICE" },
];

const memberNodes: { id: string; x: number; y: number; pillar: string }[] = [
  { id: "d1", x: 380, y: 50,  pillar: "data" },
  { id: "d2", x: 500, y: 30,  pillar: "data" },
  { id: "d3", x: 620, y: 50,  pillar: "data" },
  { id: "s1", x: 740, y: 310, pillar: "system" },
  { id: "s2", x: 790, y: 400, pillar: "system" },
  { id: "s3", x: 720, y: 460, pillar: "system" },
  { id: "v1", x: 260, y: 310, pillar: "service" },
  { id: "v2", x: 210, y: 400, pillar: "service" },
  { id: "v3", x: 280, y: 460, pillar: "service" },
];

const spokeEdges = pillars.map((p, i) => ({
  id: `spoke-${p.id}`,
  d: `M ${HUB.x} ${HUB.y} L ${p.x} ${p.y}`,
  delay: 0.4 + i * 0.2,
}));

const interPillarEdges = [
  {
    id: "ip-ds",
    d: `M ${pillars[0].x} ${pillars[0].y} Q 620 230 ${pillars[1].x} ${pillars[1].y}`,
    delay: 1.2,
  },
  {
    id: "ip-sv",
    d: `M ${pillars[1].x} ${pillars[1].y} Q 500 420 ${pillars[2].x} ${pillars[2].y}`,
    delay: 1.4,
  },
  {
    id: "ip-vd",
    d: `M ${pillars[2].x} ${pillars[2].y} Q 380 230 ${pillars[0].x} ${pillars[0].y}`,
    delay: 1.6,
  },
];

const memberEdges = memberNodes.map((m, i) => {
  const p = pillars.find((pl) => pl.id === m.pillar)!;
  return {
    id: `me-${m.id}`,
    d: `M ${p.x} ${p.y} L ${m.x} ${m.y}`,
    delay: 1.0 + i * 0.1,
  };
});

const packets = pillars.map((p, i) => ({
  id: `pkt-${p.id}`,
  color: p.color,
  delay: 2.5 + i * 0.6,
  dur: 1.8,
  xs: [HUB.x, p.x],
  ys: [HUB.y, p.y],
}));

const logLines = [
  { text: "nodes: 12 active",       x: "28%", y: "72%", delay: 2.8 },
  { text: "✓ data pipeline healthy", x: "6%",  y: "44%", delay: 3.2 },
  { text: "latency: 4ms avg",       x: "72%", y: "28%", delay: 3.6 },
  { text: "throughput: 1.2k ops/s",  x: "62%", y: "76%", delay: 4.0 },
];

/* ------------------------------------------------------------------ */
/* Component                                                            */
/* ------------------------------------------------------------------ */

export function NetworkConstellation({
  className,
  showLogLines = false,
}: NetworkConstellationProps) {
  const shouldReduceMotion = useLightMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const show = inView || shouldReduceMotion;

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      <svg
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        {/* Spoke edges: hub → pillars */}
        {spokeEdges.map((e) => (
          <motion.path
            key={e.id}
            d={e.d}
            stroke="#dde6f0"
            strokeWidth={1.5}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={show ? { pathLength: 1, opacity: 1 } : undefined}
            transition={{ duration: 1.2, delay: e.delay, ease: "easeInOut" }}
          />
        ))}

        {/* Inter-pillar edges (dashed curves) */}
        {interPillarEdges.map((e) => (
          <motion.path
            key={e.id}
            d={e.d}
            stroke="#94a3b8"
            strokeWidth={1}
            strokeLinecap="round"
            strokeDasharray="5 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={show ? { pathLength: 1, opacity: 1 } : undefined}
            transition={{ duration: 1.2, delay: e.delay, ease: "easeInOut" }}
          />
        ))}

        {/* Member edges: pillar → member */}
        {memberEdges.map((e) => (
          <motion.path
            key={e.id}
            d={e.d}
            stroke="#dde6f0"
            strokeWidth={1}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={show ? { pathLength: 1, opacity: 1 } : undefined}
            transition={{ duration: 0.8, delay: e.delay, ease: "easeInOut" }}
          />
        ))}

        {/* Orbital ring around hub */}
        {!shouldReduceMotion && show && (
          <motion.circle
            cx={HUB.x}
            cy={HUB.y}
            r={45}
            stroke="#94a3b8"
            strokeWidth={0.8}
            strokeDasharray="4 6"
            fill="none"
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }}
          />
        )}

        {/* Hub node */}
        <motion.circle
          cx={HUB.x}
          cy={HUB.y}
          r={HUB.r}
          fill="white"
          stroke={HUB.color}
          strokeWidth={2}
          initial={{ scale: 0, opacity: 0 }}
          animate={show ? { scale: 1, opacity: 1 } : undefined}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 18,
            delay: 0.2,
          }}
        />
        <motion.circle
          cx={HUB.x}
          cy={HUB.y}
          r={12}
          fill={HUB.color}
          initial={{ scale: 0, opacity: 0 }}
          animate={show ? { scale: 1, opacity: 0.9 } : undefined}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 18,
            delay: 0.3,
          }}
        />
        <motion.text
          x={HUB.x}
          y={HUB.y + 46}
          textAnchor="middle"
          fontSize="11"
          fill="#64748b"
          fontFamily="system-ui, sans-serif"
          fontWeight="600"
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : undefined}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {HUB.label}
        </motion.text>

        {/* Pillar nodes */}
        {pillars.map((p, i) => (
          <g key={p.id}>
            {!shouldReduceMotion && show && (
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={16}
                fill={p.color}
                opacity={0.08}
                animate={{
                  r: [16, 26, 16],
                  opacity: [0.08, 0.18, 0.08],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={13}
              fill="white"
              stroke={p.color}
              strokeWidth={2}
              initial={{ scale: 0, opacity: 0 }}
              animate={show ? { scale: 1, opacity: 1 } : undefined}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 18,
                delay: 0.6 + i * 0.18,
              }}
            />
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={6}
              fill={p.color}
              initial={{ scale: 0, opacity: 0 }}
              animate={show ? { scale: 1, opacity: 0.9 } : undefined}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 18,
                delay: 0.7 + i * 0.18,
              }}
            />
            <text
              x={p.x}
              y={p.y + 28}
              textAnchor="middle"
              fontSize="10"
              fill="#64748b"
              fontFamily="system-ui, sans-serif"
              fontWeight="500"
            >
              {p.label}
            </text>
          </g>
        ))}

        {/* Member satellite nodes */}
        {memberNodes.map((m, i) => {
          const p = pillars.find((pl) => pl.id === m.pillar)!;
          return (
            <motion.circle
              key={m.id}
              cx={m.x}
              cy={m.y}
              r={6}
              fill="white"
              stroke={p.color}
              strokeWidth={1.5}
              initial={{ scale: 0, opacity: 0 }}
              animate={show ? { scale: 1, opacity: 1 } : undefined}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 18,
                delay: 1.2 + i * 0.08,
              }}
            />
          );
        })}

        {/* Data packets */}
        {!shouldReduceMotion &&
          show &&
          packets.map((pk) => (
            <motion.circle
              key={pk.id}
              r={3}
              fill={pk.color}
              animate={{
                cx: pk.xs,
                cy: pk.ys,
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: pk.dur,
                delay: pk.delay,
                repeat: Infinity,
                repeatDelay: 2.0,
                ease: "linear",
                times: [0, 0.08, 0.88, 1],
              }}
            />
          ))}
      </svg>

      {/* Log lines */}
      {showLogLines &&
        !shouldReduceMotion &&
        show &&
        logLines.map((line) => (
          <motion.div
            key={line.text}
            className="absolute font-mono text-[10px] font-medium text-slate-400"
            style={{ left: line.x, top: line.y }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: [0, 0.7, 0.7, 0] }}
            transition={{
              duration: 5,
              delay: line.delay,
              repeat: Infinity,
              repeatDelay: 8,
              times: [0, 0.1, 0.8, 1],
            }}
          >
            {line.text}
          </motion.div>
        ))}
    </div>
  );
}
