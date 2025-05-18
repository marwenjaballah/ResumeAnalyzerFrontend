"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/file-upload"
import { JobTitleInput } from "@/components/job-title-input"
import { ErrorDialog } from "@/components/error-dialog"

// Common job title suggestions
const JOB_TITLE_SUGGESTIONS = [
  "Software Engineer",
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "DevOps Engineer",
  "Data Scientist",
  "Product Manager",
  "UX Designer",
  "Web3 Developer",
  "Mobile Developer",
  "Cloud Architect",
]

// Create a global state for analysis data
let globalAnalysisData: any = null

export function setAnalysisData(data: any) {
  globalAnalysisData = data
}

export function getAnalysisData() {
  return globalAnalysisData
}

export default function UploadForm() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [jobTitle, setJobTitle] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const showError = (message: string) => {
    setErrorMessage(message)
    setShowErrorDialog(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      showError("Please upload your resume")
      return
    }

    if (!jobTitle.trim()) {
      showError("Please enter a job title")
      return
    }

    setIsLoading(true)

    try {
      // Create a FormData object to send the file and other data
      const formData = new FormData()
      formData.append("resume", file)
      formData.append("jobTitle", jobTitle)

      const API_URL = "http://localhost:5207/api/resume/analyze-gemini"
      console.log("Sending request to:", API_URL)
      console.log("FormData contents:", {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        jobTitle: jobTitle
      })

      // Make the actual API call
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        },
      })

      console.log("Response status:", response.status)
      console.log("Response headers:", Object.fromEntries(response.headers.entries()))

      let analysisData
      try {
        analysisData = await response.json()
        console.log("Analysis data received:", analysisData)

        // Check for error in successful response
        if (analysisData.error) {
          let errorMessage = "Failed to analyze resume"
          switch (analysisData.error) {
            case "Job description is inexistent or invalid":
              errorMessage = "Please enter a valid job title"
              break
            case "Resume is too short or not provided":
              errorMessage = "Please upload a valid resume file"
              break
            default:
              errorMessage = analysisData.error
          }
          throw new Error(errorMessage)
        }

        // Ensure the data structure matches what we expect
        const formattedData = {
          score: analysisData.score || 0,
          missingSkills: analysisData.missingSkills || [],
          suggestions: analysisData.suggestions || [],
          analysis: analysisData.analysis || '',
          keywordMatch: analysisData.keywordMatch || {},
          missingKeywords: analysisData.missingKeywords || [],
          rewrites: analysisData.rewrites || [],
          sectionScores: analysisData.sectionScores || {}
        }

        // Store the analysis data in our global state
        setAnalysisData({
          analysis: formattedData,
          jobTitle,
          fileName: file.name
        })

        // Navigate to results page
        router.push("/results")
      } catch (e) {
        console.error("Error parsing response:", e)
        if (e instanceof Error) {
          showError(e.message)
        } else {
          throw new Error("Invalid response format from server")
        }
      }
    } catch (err) {
      console.error("Full error details:", err)
      let errorMessage = "An error occurred while analyzing your resume. Please try again."
      
      if (err instanceof Error) {
        if (err.message === "Failed to fetch") {
          errorMessage = "Unable to connect to the server. Please check if the server is running and try again."
        } else {
          errorMessage = err.message
        }
      }
      
      showError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FileUpload
          file={file}
          onFileChange={setFile}
          onError={showError}
        />

        <JobTitleInput
          jobTitle={jobTitle}
          onJobTitleChange={setJobTitle}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Resume...
            </>
          ) : (
            "Analyze My Resume"
          )}
        </Button>
      </form>

      <ErrorDialog
        open={showErrorDialog}
        onOpenChange={setShowErrorDialog}
        errorMessage={errorMessage}
      />
    </>
  )
}
