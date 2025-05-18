import type React from "react"
import { Suspense } from "react"
import { Upload, Zap, FileText, Search } from "lucide-react"
import UploadForm from "@/components/upload-form"
import LoadingAnimation from "@/components/loading-animation"

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="bg-slate-800 p-4 rounded-full">
            <Zap className="h-12 w-12 text-purple-400" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">AI Resume Analyzer</h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-2xl">
            Upload your resume and discover how well it matches your dream job with our AI-powered analysis
          </p>

          <div className="w-full max-w-3xl mt-8">
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="flex items-center space-x-2 text-purple-400">
                  <FileText className="h-5 w-5" />
                  <span>Upload Resume</span>
                </div>
                <div className="h-px w-8 bg-slate-700"></div>
                <div className="flex items-center space-x-2 text-purple-400">
                  <Search className="h-5 w-5" />
                  <span>Match Job</span>
                </div>
              </div>

              <Suspense fallback={<LoadingAnimation />}>
                <UploadForm />
              </Suspense>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            <FeatureCard
              icon={<Upload className="h-6 w-6 text-purple-400" />}
              title="Easy Upload"
              description="Simply upload your PDF resume and let our AI do the work"
            />
            <FeatureCard
              icon={<Search className="h-6 w-6 text-purple-400" />}
              title="Job Matching"
              description="Select the job you're targeting for tailored analysis"
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-purple-400" />}
              title="Smart Insights"
              description="Get actionable suggestions to improve your resume"
            />
          </div>
        </div>
      </div>
    </main>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-all duration-300">
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="p-3 bg-slate-700 rounded-full">{icon}</div>
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>
    </div>
  )
}
