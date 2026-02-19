'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '../ui/card';
import { Bookmark, Heart, MessageCircle, Send } from 'lucide-react';

export function PreviewPost() {
  return (
    <Card className="border shadow-none p-4 gap-2 bg-white text-black w-full">
      <CardContent className="p-0">
        <div className="w-full flex items-center gap-2">
          <div className="p-1 rounded-full bg-gradient-to-bl from-orange-500 to-pink-700">
            <img
              className="w-7 h-7 rounded-full bg-white"
              src="/icon.png"
              alt="profile"
            />
          </div>

          <span>Nome do usuario</span>
        </div>
      </CardContent>

      <CardContent className="p-0">
        <div className="flex w-full justify-center">
          <img
            className="w-[600px] h-[300px] object-contain"
            src="/icon.png"
            alt="profile"
          />
        </div>
      </CardContent>

      <CardContent className="flex w-full items-center justify-between px-0">
        <div className="flex gap-4 w-full">
          <Button className="bg-transparent hover:bg-transparent text-black dark:text-black cursor-pointer border-none p-0">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 p-0" />
              <span>1,200</span>
            </div>
          </Button>

          <Button className="bg-transparent hover:bg-transparent text-black dark:text-black cursor-pointer border-none p-0">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5  p-0" /> <span>29</span>
            </div>
          </Button>

          <Button className="bg-transparent hover:bg-transparent text-black dark:text-black cursor-pointer border-none p-0">
            <Send className="w-5 h-5 p-0" />
          </Button>
        </div>

        <Button className="bg-transparent hover:bg-transparent text-black dark:text-black cursor-pointer border-none p-0">
          <Bookmark className="w-5 h-5  p-0" />
        </Button>
      </CardContent>

      <div className="flex w-full justify-start gap-2">
        <h1 className="text-xs font-bold">Seunomeaqui</h1>
        <p className="text-xs font-normal text-black/70 dark:text-black/70">
          Sua descrição vai ficar assim quando fizer o post
        </p>
      </div>
    </Card>
  );
}
