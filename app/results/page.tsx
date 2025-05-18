"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, FileText, Award, Lightbulb, BarChart, RefreshCw, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import ScoreGauge from "@/components/score-gauge"
import KeywordMatchChart from "@/components/keyword-match-chart"
import SectionScoresChart from "@/components/section-scores-chart"
import RewriteComparison from "@/components/rewrite-comparison"
import { getAnalysisData } from "@/components/upload-form"

type ResumeAnalysis = {
  score: number
  missingSkills: string[]
  suggestions: string[]
  analysis: string
  keywordMatch: Record<string, number>
  missingKeywords: string[]
  rewrites: Array<{ original: string; improved: string }>
  sectionScores: Record<string, number>
}

type AnalysisData = {
  analysis: ResumeAnalysis
  jobTitle: string
  fileName: string
}

export default function ResultsPage() {
  const router = useRouter()
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const analysisData = getAnalysisData()
      
      if (!analysisData) {
        console.error("No analysis data found")
        router.push("/")
        return
      }

      // Validate the analysis data structure
      if (!analysisData.analysis || !analysisData.jobTitle || !analysisData.fileName) {
        console.error("Invalid analysis data structure:", analysisData)
        setError("Invalid analysis data received")
        setLoading(false)
        return
      }

      setAnalysis(analysisData)
      setLoading(false)
    } catch (err) {
      console.error("Error loading analysis data:", err)
      setError("Failed to load analysis results")
      setLoading(false)
    }
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-white">Loading your analysis...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <Alert variant="destructive" className="bg-red-900/20 border-red-800 mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button
            onClick={() => router.push("/")}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (!analysis) {
    return null
  }

  const { analysis: resumeAnalysis, jobTitle, fileName } = analysis

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.push("/")} className="text-slate-300 hover:text-white mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Upload
        </Button>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold tracking-tight"
            >
              Resume Analysis Results
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center mt-2 text-slate-300"
            >
              <FileText className="h-4 w-4 mr-2" />
              <span className="mr-2">{fileName}</span>
              <span className="mx-2">•</span>
              <span>Job: {jobTitle}</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ScoreGauge score={resumeAnalysis.score} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-white">Overall Analysis</CardTitle>
              <CardDescription className="text-slate-400">AI-generated summary of your resume</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 leading-relaxed">{resumeAnalysis.analysis}</p>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="suggestions" className="w-full">
          <TabsList className="bg-slate-800 border border-slate-700 p-1 mb-8">
            <TabsTrigger
              value="suggestions"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              Suggestions
            </TabsTrigger>
            <TabsTrigger
              value="keywords"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300"
            >
              <BarChart className="h-4 w-4 mr-2" />
              Keyword Match
            </TabsTrigger>
            <TabsTrigger
              value="rewrites"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Rewrites
            </TabsTrigger>
            <TabsTrigger
              value="sections"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300"
            >
              <Award className="h-4 w-4 mr-2" />
              Section Scores
            </TabsTrigger>
          </TabsList>

          <TabsContent value="suggestions" className="mt-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 gap-4"
            >
              {resumeAnalysis.suggestions?.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Alert className="bg-purple-900/10 border border-purple-800/30">
                    <Lightbulb className="h-4 w-4 text-purple-400" />
                    <AlertDescription className="text-slate-300">{suggestion}</AlertDescription>
                  </Alert>
                </motion.div>
              ))}

              {resumeAnalysis.missingSkills?.length > 0 ? (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3 text-white">Missing Skills</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {resumeAnalysis.missingSkills.map((skill, index) => (
                      <Alert key={index} className="bg-amber-900/10 border border-amber-800/30">
                        <AlertCircle className="h-4 w-4 text-amber-400" />
                        <AlertDescription className="text-slate-300">{skill}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </div>
              ) : (
                <Alert className="bg-green-900/10 border border-green-800/30 mt-6">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <AlertDescription className="text-slate-300">
                    Great job! No missing skills were identified for the jobs you're targeting.
                  </AlertDescription>
                </Alert>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="keywords" className="mt-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Keyword Match</CardTitle>
                  <CardDescription className="text-slate-400">
                    How well your resume matches job keywords
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <KeywordMatchChart keywordMatch={resumeAnalysis.keywordMatch} />
                </CardContent>
              </Card>

              <div className="space-y-6">
                <h3 className="text-lg font-medium text-white">Keyword Details</h3>
                {Object.entries(resumeAnalysis.keywordMatch || {}).map(([keyword, score], index) => (
                  <motion.div
                    key={keyword}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 capitalize">{keyword}</span>
                      <span
                        className={`text-sm font-medium ${
                          score >= 80 ? "text-green-400" : score >= 60 ? "text-amber-400" : "text-red-400"
                        }`}
                      >
                        {score}%
                      </span>
                    </div>
                    <Progress
                      value={score}
                      className={`h-2 bg-slate-700 [&>div]:${
                        score >= 80 ? "bg-green-500" : score >= 60 ? "bg-amber-500" : "bg-red-500"
                      }`}
                    />
                  </motion.div>
                ))}

                {resumeAnalysis.missingKeywords?.length > 0 ? (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-3 text-white">Missing Keywords</h3>
                    <div className="space-y-3">
                      {resumeAnalysis.missingKeywords.map((keyword, index) => (
                        <Alert key={index} className="bg-amber-900/10 border border-amber-800/30">
                          <AlertCircle className="h-4 w-4 text-amber-400" />
                          <AlertDescription className="text-slate-300">{keyword}</AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Alert className="bg-green-900/10 border border-green-800/30 mt-8">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <AlertDescription className="text-slate-300">
                      Great job! Your resume includes all the important keywords.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="rewrites" className="mt-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <p className="text-slate-300">
                Our AI has suggested improvements to your resume bullet points. Compare the original text with the
                enhanced versions below.
              </p>

              {resumeAnalysis.rewrites?.map((rewrite, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <RewriteComparison original={rewrite.original} improved={rewrite.improved} index={index + 1} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="sections" className="mt-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Section Scores</CardTitle>
                  <CardDescription className="text-slate-400">How each section of your resume performs</CardDescription>
                </CardHeader>
                <CardContent>
                  <SectionScoresChart sectionScores={resumeAnalysis.sectionScores} />
                </CardContent>
              </Card>

              <div className="space-y-6">
                <h3 className="text-lg font-medium text-white">Section Details</h3>
                {Object.entries(resumeAnalysis.sectionScores || {}).map(([section, score], index) => (
                  <motion.div
                    key={section}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 capitalize">{section}</span>
                      <span
                        className={`text-sm font-medium ${
                          score >= 80 ? "text-green-400" : score >= 60 ? "text-amber-400" : "text-red-400"
                        }`}
                      >
                        {score}/100
                      </span>
                    </div>
                    <Progress
                      value={score}
                      className={`h-2 bg-slate-700 [&>div]:${
                        score >= 80 ? "bg-green-500" : score >= 60 ? "bg-amber-500" : "bg-red-500"
                      }`}
                    />
                    <p className="text-xs text-slate-400">
                      {score >= 80
                        ? "Excellent"
                        : score >= 60
                          ? "Good, but could be improved"
                          : "Needs significant improvement"}
                    </p>
                  </motion.div>
                ))}

                <div className="mt-6 p-4 bg-slate-800 rounded-lg border border-slate-700">
                  <h4 className="text-white font-medium mb-2">Improvement Tips</h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>
                        <strong>Summary:</strong> Keep it concise, targeted, and highlight your most relevant skills and
                        achievements.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>
                        <strong>Experience:</strong> Use action verbs and quantify achievements with specific metrics.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>
                        <strong>Education:</strong> Include dates, relevant coursework, and academic achievements.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>
                        <strong>Skills:</strong> Organize skills by category and highlight those most relevant to your
                        target jobs.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 flex justify-center">
          <Button
            onClick={() => router.push("/")}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200"
          >
            Analyze Another Resume
          </Button>
        </div>
      </div>
    </main>
  )
}
