"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

type SectionScoresProps = {
  sectionScores: Record<string, number>
}

export default function SectionScoresChart({ sectionScores }: SectionScoresProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    const labels = Object.keys(sectionScores).map((key) => key.charAt(0).toUpperCase() + key.slice(1))
    const data = Object.values(sectionScores)

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Section Score",
            data,
            backgroundColor: "rgba(168, 85, 247, 0.8)",
            borderColor: "rgba(168, 85, 247, 1)",
            borderWidth: 1,
            borderRadius: 6,
            barThickness: 30,
          },
        ],
      },
      options: {
        indexAxis: "y",
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.7)",
            },
          },
          y: {
            grid: {
              display: false,
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.7)",
              font: {
                size: 12,
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            titleColor: "rgba(255, 255, 255, 0.9)",
            bodyColor: "rgba(255, 255, 255, 0.9)",
            borderColor: "rgba(168, 85, 247, 0.5)",
            borderWidth: 1,
            padding: 10,
            displayColors: false,
            callbacks: {
              label: (context) => `Score: ${context.raw}/100`,
            },
          },
        },
        maintainAspectRatio: false,
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [sectionScores])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[300px]"
    >
      <canvas ref={chartRef} />
    </motion.div>
  )
}
