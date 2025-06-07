import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, BookOpen, FileText, Brain, Download } from "lucide-react"
import { VocabularyResults } from "@/components/vocabulary-results"
import { ResultsSkeleton } from "@/components/results-skeleton"

export default function ResultsPage({
  searchParams,
}: {
  searchParams: { filename: string; type: string }
}) {
  const filename = searchParams.filename || "document"
  const documentType = searchParams.type || "textbook"

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export Results
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          {documentType === "textbook" && <BookOpen className="h-6 w-6 text-primary" />}
          {documentType === "article" && <FileText className="h-6 w-6 text-primary" />}
          {documentType === "lecture" && <Brain className="h-6 w-6 text-primary" />}
          <div>
            <h1 className="text-2xl font-bold">{filename}</h1>
            <p className="text-sm text-muted-foreground capitalize">{documentType}</p>
          </div>
        </div>

        <Suspense fallback={<ResultsSkeleton />}>
          <VocabularyResults filename={filename} documentType={documentType} />
        </Suspense>
      </Card>
    </main>
  )
}
