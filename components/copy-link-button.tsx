"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

interface CopyLinkButtonProps {
  url: string
}

export function CopyLinkButton({ url }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy URL: ", err)
    }
  }

  return (
    <Button
      size="sm"
      onClick={handleCopy}
      className="h-6 w-6 p-0 text-muted dark:text-muted bg-transparent dark:bg-transparent hover:bg-transparent dark:hover:bg-transparent"
    >
      {copied ? (
        <Check className="h-3 w-3 text-accent" />
      ) : (
        <Copy className="h-3 w-3 text-secondary" />
      )}
    </Button>
  );
}
