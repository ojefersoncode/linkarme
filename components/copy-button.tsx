'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Button
      size="sm"
      onClick={handleCopy}
      className="bg-foreground hover:bg-foreground h-8 w-8 p-0"
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-200 dark:text-green-200" />
      ) : (
        <Copy className="h-4 w-4 text-white dark:text-white" />
      )}
    </Button>
  );
}
