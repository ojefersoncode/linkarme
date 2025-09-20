"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface VerifyDomainButtonProps {
  domainId: string
}

export function VerifyDomainButton({ domainId }: VerifyDomainButtonProps) {
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleVerify = async () => {
    setIsVerifying(true)
    setError(null)

    try {
      const response = await fetch(`/api/domains/${domainId}/verify`, {
        method: "POST",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao verificar domínio")
      }

      if (data.verified) {
        router.refresh()
      } else {
        setError("Verificação falhou. Verifique se configurou corretamente e tente novamente.")
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Erro ao verificar domínio")
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="space-y-2">
      <Button onClick={handleVerify} disabled={isVerifying}>
        {isVerifying && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
        {isVerifying ? "Verificando..." : "Verificar Domínio"}
      </Button>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
