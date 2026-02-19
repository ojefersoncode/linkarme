'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '../ui/card';
import { Bookmark, Heart, MessageCircle, Send } from 'lucide-react';

export function PreviewVideo() {
  return (
    <Card className="border shadow-none p-4 gap-2 bg-white text-black w-full">
      <CardContent className="p-0">
        <div className="flex w-full relative justify-center">
          <img
            className="w-[400px] h-[600px] object-contain"
            src="/icon.png"
            alt="profile"
          />

          <CardContent className="flex flex-col gap-4 z-10 absolute bottom-5 right-0 items-center px-0">
            <img
              className="w-10 h-10 rounded-full bg-white"
              src="/icon.png"
              alt="profile"
            />
            <Button className="bg-transparent hover:bg-transparent text-black dark:text-black cursor-pointer border-none p-0">
              <Heart className="size-7 p-0" />
            </Button>

            <Button className="bg-transparent hover:bg-transparent text-black dark:text-black cursor-pointer border-none p-0">
              <MessageCircle className="size-7  p-0" />
            </Button>

            <Button className="bg-transparent hover:bg-transparent text-black dark:text-black cursor-pointer border-none p-0">
              <Send className="size-7 p-0" />
            </Button>

            <Button className="bg-transparent hover:bg-transparent text-black dark:text-black cursor-pointer border-none p-0">
              <Bookmark className="size-7 p-0" />
            </Button>
          </CardContent>
        </div>
      </CardContent>

      <CardContent className="flex items-center gap-4 p-0">
        <span className="font-bold text-base">Nome do usuario</span>

        <button className="bg-transparent hover:bg-transparent text-black dark:text-black cursor-pointer py-1 px-4 text-xs font-semibold border rounded-md">
          Seguir
        </button>
      </CardContent>

      <CardContent className="flex w-full justify-start gap-2 p-0">
        <p className="text-xs font-normal text-black/70 dark:text-black/70">
          Sua descrição vai ficar assim quando fizer o post
        </p>
      </CardContent>
    </Card>
  );
}
