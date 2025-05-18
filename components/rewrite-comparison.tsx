"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type RewriteComparisonProps = {
  original: string
  improved: string
  index: number
}

export default function RewriteComparison({ original, improved, index }: RewriteComparisonProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(improved)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="flex items-center mb-2">
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium mr-2">
          {index}
        </div>
        <h3 className="text-white font-medium">Bullet Point Improvement</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center mb-2">
              <div className="text-xs font-medium uppercase text-slate-500 tracking-wider">Original</div>
            </div>
            <p className="text-slate-300 text-sm">{original}</p>
          </CardContent>
        </Card>

        <div className="relative">
          <div className="hidden md:flex absolute -left-7 top-1/2 transform -translate-y-1/2 text-purple-400">
            <ArrowRight className="h-5 w-5" />
          </div>

          <Card className="bg-slate-800 border-purple-700/50 relative">
            <div className="absolute top-0 right-0 bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded-bl-lg font-medium">
              Improved
            </div>
            <CardContent className="p-4 pt-8">
              <p className="text-slate-300 text-sm">{improved}</p>

              <Button
                size="sm"
                variant="ghost"
                onClick={copyToClipboard}
                className="mt-3 text-xs text-slate-400 hover:text-white hover:bg-slate-700"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 mr-1" />
                    Copied!
                  </>
                ) : (
                  "Copy to clipboard"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
