"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Power, PowerOff, Loader2 } from "lucide-react"

interface ToggleLinkButtonProps {
  linkId: string
  currentStatus: boolean
}

export function ToggleLinkButton({ linkId, currentStatus }: ToggleLinkButtonProps) {
  const [isToggling, setIsToggling] = useState(false)
  const router = useRouter()

  const handleToggle = async () => {
    setIsToggling(true)

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from("links")
        .update({
          active: !currentStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", linkId)

      if (error) throw error

      router.refresh()
    } catch (error) {
      console.error("Error toggling link:", error)
    } finally {
      setIsToggling(false)
    }
  }

  return (
    <Button
      variant={'default'}
      className="text-muted dark:text-muted bg-transparent dark:bg-transparent hover:bg-transparent dark:hover:bg-transparent"
      size="sm"
      onClick={handleToggle}
      disabled={isToggling}
    >
      {isToggling ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : currentStatus ? (
        <PowerOff className="h-4 w-4" />
      ) : (
        <Power className="h-4 w-4" />
      )}
    </Button>
  );
}
