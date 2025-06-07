import { getVocabularyTerms } from "@/lib/actions"
import { Badge } from "@/components/ui/badge"

export async function VocabularyResults({
  filename,
  documentType,
}: {
  filename: string
  documentType: string
}) {
  const data = await getVocabularyTerms(filename, documentType)

  // Group terms by category if they have categories
  const hasCategories = data.terms.some((term) => term.category)

  const groupedTerms = hasCategories
    ? data.terms.reduce(
        (acc, term) => {
          const category = term.category || "General"
          if (!acc[category]) {
            acc[category] = []
          }
          acc[category].push(term)
          return acc
        },
        {} as Record<string, typeof data.terms>,
      )
    : { "Key Terms": data.terms }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Layer 1 Vocabulary</h2>
        <p className="text-sm text-muted-foreground">
          These are the high-level vocabulary terms extracted from your document. Use this list as a reference to build
          your foundational understanding.
        </p>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedTerms).map(([category, terms]) => (
          <div key={category} className="space-y-3">
            {hasCategories && <h3 className="text-lg font-medium">{category}</h3>}
            <div className="grid gap-3">
              {terms.map((term, index) => (
                <div key={index} className="p-4 border rounded-lg bg-card">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h4 className="text-base font-semibold">{term.term}</h4>
                    {term.category && (
                      <Badge variant="outline" className="text-xs">
                        {term.category}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{term.definition}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-sm text-muted-foreground pt-4 border-t">
        <p>
          <strong>Note:</strong> This is a Layer 1 extraction focused on high-level vocabulary. It provides orientation
          rather than mastery, helping you build a big-picture reference before diving deeper into the subject.
        </p>
      </div>
    </div>
  )
}
