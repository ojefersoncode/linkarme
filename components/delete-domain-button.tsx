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

interface DeleteDomainButtonProps {
  domainId: string
  domainName: string
}

export function DeleteDomainButton({ domainId, domainName }: DeleteDomainButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.from("domains").delete().eq("id", domainId)

      if (error) throw error

      router.refresh()
    } catch (error) {
      console.error("Error deleting domain:", error)
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
          <AlertDialogTitle className="text-white">
            Excluir Domínio
          </AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir o domínio{' '}
            <strong>{domainName}</strong>? Esta ação não pode ser desfeita e
            todos os links associados a este domínio serão removidos.
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
