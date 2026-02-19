'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ArrowBack() {
  const router = useRouter();
  return (
    <Button
      className="bg-white hover:bg-white/80 transition-all duration-300 cursor-pointer border-none"
      onClick={() => router.back()}
    >
      <ArrowLeft className="w-5 h-5 text-black dark:text-black" />
    </Button>
  );
}
