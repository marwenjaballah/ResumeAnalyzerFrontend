"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

type KeywordMatchProps = {
  keywordMatch: Record<string, number>
}

export default function KeywordMatchChart({ keywordMatch }: KeywordMatchProps) {
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

    const labels = Object.keys(keywordMatch).map((key) =>
      key
        .split(/(?=[A-Z])/)
        .join(" ")
        .replace(/^\w/, (c) => c.toUpperCase()),
    )
    const data = Object.values(keywordMatch)

    chartInstance.current = new Chart(ctx, {
      type: "radar",
      data: {
        labels,
        datasets: [
          {
            label: "Keyword Match",
            data,
            backgroundColor: "rgba(168, 85, 247, 0.2)",
            borderColor: "rgba(168, 85, 247, 0.8)",
            borderWidth: 2,
            pointBackgroundColor: "rgba(45, 212, 191, 1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(168, 85, 247, 1)",
            pointRadius: 4,
          },
        ],
      },
      options: {
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              display: false,
            },
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            angleLines: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            pointLabels: {
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
              label: (context) => `Match: ${context.raw}%`,
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
  }, [keywordMatch])

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
