import { BookOpen, Brain, FileText } from "lucide-react"

export function PageHeader() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Brain className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Layer 1 Vocabulary Extractor</h1>
      </div>
      <p className="text-muted-foreground max-w-3xl">
        Upload a study document to extract high-level vocabulary terms with beginner-friendly definitions. This tool
        helps you build a foundational understanding before diving deeper into a subject.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="flex items-start gap-2 p-4 rounded-lg border bg-card">
          <BookOpen className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-medium">Textbooks</h3>
            <p className="text-sm text-muted-foreground">Extract key terms from textbook chapters</p>
          </div>
        </div>
        <div className="flex items-start gap-2 p-4 rounded-lg border bg-card">
          <FileText className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-medium">Articles</h3>
            <p className="text-sm text-muted-foreground">Identify important concepts from academic articles</p>
          </div>
        </div>
        <div className="flex items-start gap-2 p-4 rounded-lg border bg-card">
          <Brain className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-medium">Lecture Notes</h3>
            <p className="text-sm text-muted-foreground">Extract key vocabulary from lecture materials</p>
          </div>
        </div>
      </div>
    </div>
  )
}
