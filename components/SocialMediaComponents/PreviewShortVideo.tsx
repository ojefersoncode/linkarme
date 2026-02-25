'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '../ui/card';
import { Bookmark, Heart, MessageCircle, Send } from 'lucide-react';

export function PreviewVideo() {
  return (
    <Card className="border-none shadow-none p-0 gap-2 bg-white text-white w-full">
      <CardContent className="p-0">
        <div className="flex w-full rounded-lg relative justify-center">
          <video
            className="rounded-lg relative object-cover md:w-[280px] md:h-[500px]"
            src="/video/vertical.mp4"
            width="100%"
            height="100"
            autoPlay
            muted
            loop
            playsInline
            controls
          ></video>
        </div>
      </CardContent>
    </Card>
  );
}
