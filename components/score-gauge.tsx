"use client"

import { motion } from "framer-motion"

export default function ScoreGauge({ score }: { score: number }) {
  // Calculate the color based on the score
  const getColor = (score: number) => {
    if (score >= 80) return "#10b981" // green
    if (score >= 60) return "#f59e0b" // amber
    return "#ef4444" // red
  }

  const color = getColor(score)

  // Calculate the angle for the gauge needle
  const angle = (score / 100) * 180 - 90

  return (
    <div className="relative w-32 h-32">
      {/* Background circle */}
      <div className="absolute inset-0 rounded-full bg-slate-700 border border-slate-600"></div>

      {/* Gauge background */}
      <svg className="absolute inset-0" viewBox="0 0 100 100">
        <path d="M50 85 A 35 35 0 1 1 50 15" fill="none" stroke="#4b5563" strokeWidth="6" strokeLinecap="round" />
        <path
          d="M50 85 A 35 35 0 1 1 50 15"
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="180"
          strokeDashoffset={180 - (score / 100) * 180}
        />
      </svg>

      {/* Needle */}
      <motion.div
        initial={{ rotate: -90 }}
        animate={{ rotate: angle }}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 15,
          delay: 0.5,
        }}
        className="absolute top-1/2 left-1/2 w-[3px] h-[40px] bg-white rounded-full origin-bottom transform -translate-x-1/2 -translate-y-full"
        style={{ transformOrigin: "bottom center" }}
      >
        <div
          className="absolute -top-1 left-1/2 w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          style={{ backgroundColor: color }}
        ></div>
      </motion.div>

      {/* Score text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 15,
            delay: 0.7,
          }}
          className="text-center"
        >
          <div className="text-3xl font-bold" style={{ color }}>
            {score}
          </div>
          <div className="text-xs text-slate-400 mt-1">MATCH SCORE</div>
        </motion.div>
      </div>
    </div>
  )
}
