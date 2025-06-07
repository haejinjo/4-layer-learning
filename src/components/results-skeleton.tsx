import { Skeleton } from "@/components/ui/skeleton"

export function ResultsSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-7 w-48 mb-2" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Skeleton className="h-6 w-32" />
          <div className="grid gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <Skeleton className="h-5 w-40 mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
