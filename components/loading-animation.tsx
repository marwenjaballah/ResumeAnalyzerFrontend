"use client"

import { motion } from "framer-motion"

export default function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-24 h-24">
        {[0, 1, 2, 3].map((index) => (
          <motion.div
            key={index}
            className="absolute top-0 left-0 w-full h-full border-4 border-transparent rounded-full"
            style={{
              borderTopColor: index % 2 === 0 ? "#a855f7" : "#2dd4bf",
              rotate: index * 45,
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: index * 0.2,
            }}
          />
        ))}
      </div>
      <p className="mt-4 text-slate-300 animate-pulse">Analyzing your resume...</p>
    </div>
  )
}
