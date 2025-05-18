import { useState } from "react"
import { Upload, FileText } from "lucide-react"
import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"

interface FileUploadProps {
  file: File | null
  onFileChange: (file: File | null) => void
  onError: (message: string) => void
}

export function FileUpload({ file, onFileChange, onError }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    if (selectedFile && !selectedFile.name.toLowerCase().endsWith(".pdf")) {
      onError("Please upload a PDF file")
      onFileChange(null)
      return
    }
    onFileChange(selectedFile)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && !droppedFile.name.toLowerCase().endsWith(".pdf")) {
      onError("Please upload a PDF file")
      return
    }

    onFileChange(droppedFile)
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="resume" className="text-white">
        Upload Your Resume (PDF)
      </Label>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragging
            ? "border-purple-500 bg-purple-500/10"
            : file
              ? "border-green-500 bg-green-500/10"
              : "border-slate-600 hover:border-purple-500 hover:bg-purple-500/5"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("resume")?.click()}
      >
        <input type="file" id="resume" accept=".pdf" onChange={handleFileChange} className="hidden" />

        <motion.div
          initial={{ scale: 1 }}
          animate={{
            scale: isDragging ? 1.05 : 1,
            y: isDragging ? -5 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="flex flex-col items-center space-y-3"
        >
          {file ? (
            <>
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <FileText className="h-8 w-8 text-green-400" />
              </div>
              <div>
                <p className="text-green-400 font-medium">{file.name}</p>
                <p className="text-slate-400 text-sm mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-slate-400" />
              </div>
              <div>
                <p className="text-slate-300 font-medium">
                  {isDragging ? "Drop your PDF here" : "Drag & drop your resume here"}
                </p>
                <p className="text-slate-400 text-sm mt-1">or click to browse files (PDF only)</p>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
} 