import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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

interface JobTitleInputProps {
  jobTitle: string
  onJobTitleChange: (title: string) => void
}

export function JobTitleInput({ jobTitle, onJobTitleChange }: JobTitleInputProps) {
  const selectJobTitle = (title: string) => {
    onJobTitleChange(title)
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="jobTitle" className="text-white">
        Job Title You're Applying For
      </Label>
      <Input
        id="jobTitle"
        placeholder="Enter a job title (e.g., 'Software Engineer')"
        value={jobTitle}
        onChange={(e) => onJobTitleChange(e.target.value)}
        className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
      />

      <div className="mt-3">
        <p className="text-xs text-slate-400 mb-2">Or select from common job titles:</p>
        <div className="flex flex-wrap gap-2">
          {JOB_TITLE_SUGGESTIONS.map((title) => (
            <Button
              key={title}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => selectJobTitle(title)}
              className={`text-xs ${
                jobTitle === title
                  ? "bg-purple-500/20 text-purple-300 border-purple-500"
                  : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
              }`}
            >
              {title}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
} 