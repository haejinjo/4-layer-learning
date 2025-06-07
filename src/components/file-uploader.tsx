"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Upload, Loader2 } from "lucide-react"
import { processDocument } from "@/lib/actions"
import { toast } from "@/components/ui/use-toast"

export function FileUploader() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [documentType, setDocumentType] = useState<string>("textbook")
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      const fileType = selectedFile.type

      // Check if file type is supported
      if (
        fileType === "application/pdf" ||
        fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        fileType === "text/plain"
      ) {
        setFile(selectedFile)
      } else {
        toast({
          title: "Unsupported file type",
          description: "Please upload a PDF, DOCX, or TXT file.",
          variant: "destructive",
        })
        e.target.value = ""
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // In a real app, we would upload and process the file here
      // For this prototype, we'll simulate processing with a delay
      await processDocument(file.name, documentType)

      // Navigate to results page
      router.push(`/results?filename=${encodeURIComponent(file.name)}&type=${documentType}`)
    } catch (error) {
      toast({
        title: "Processing failed",
        description: "There was an error processing your document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="document-type">Document Type</Label>
          <RadioGroup
            id="document-type"
            value={documentType}
            onValueChange={setDocumentType}
            className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="textbook" id="textbook" />
              <Label htmlFor="textbook">Textbook</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="article" id="article" />
              <Label htmlFor="article">Article</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lecture" id="lecture" />
              <Label htmlFor="lecture">Lecture Notes</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="file">Upload Document</Label>
          <div className="border rounded-md p-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-10 w-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Drag and drop your file here or click to browse</p>
              <p className="text-xs text-muted-foreground">Supported formats: PDF, DOCX, TXT</p>
              <Input
                id="file"
                type="file"
                className="mt-2 max-w-xs"
                accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                onChange={handleFileChange}
              />
              {file && <p className="text-sm font-medium mt-2">Selected: {file.name}</p>}
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={!file || isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Extract Vocabulary"
          )}
        </Button>
      </form>
    </Card>
  )
}
