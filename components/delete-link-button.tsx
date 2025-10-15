"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2, Loader2 } from "lucide-react"

interface DeleteLinkButtonProps {
  linkId: string
  linkTitle: string
}

export function DeleteLinkButton({ linkId, linkTitle }: DeleteLinkButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.from("links").delete().eq("id", linkId)

      if (error) throw error

      router.refresh()
    } catch (error) {
      console.error("Error deleting link:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background dark:bg-background border border-popover dark:border-popover">
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Link</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir o link <strong>{linkTitle}</strong>?
            Esta ação não pode ser desfeita e todas as estatísticas associadas
            serão perdidas.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-4">
          <AlertDialogCancel className="bg-popover/60 dark:bg-popover/60 border-popover-foreground dark:border-popover-foreground hover:bg-popover/50 dark:hover:bg-popover/50">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            {isDeleting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {isDeleting ? 'Excluindo...' : 'Excluir'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
