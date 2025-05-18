import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ErrorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  errorMessage: string
}

export function ErrorDialog({ open, onOpenChange, errorMessage }: ErrorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center text-red-400">
            <AlertCircle className="h-5 w-5 mr-2" />
            Analysis Error
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-slate-300 py-4">{errorMessage}</DialogDescription>
        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)} className="bg-purple-600 hover:bg-purple-700 text-white">
            Try Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 