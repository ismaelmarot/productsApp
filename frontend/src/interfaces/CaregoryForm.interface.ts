export interface CategoryFormProps {
  onSuccess: () => void
  categoryToEdit: { id: number; name: string } | null
  onCancel: () => void
}