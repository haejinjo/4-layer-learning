export const toast = (props: {
  title: string
  description?: string
  variant?: "default" | "destructive"
}) => {
  // In a real implementation, this would display a toast notification
  console.log("Toast:", props)
}
