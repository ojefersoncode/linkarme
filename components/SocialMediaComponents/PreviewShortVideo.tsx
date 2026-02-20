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

          <CardContent className="flex flex-col gap-4 md:gap-2 z-10 absolute bottom-30 md:bottom-20 right-2 md:right-14 items-center p-0">
            <img
              className="h-10 w-10 md:w-7 md:h-7 rounded-full bg-white"
              src="/icon.png"
              alt="profile"
            />
            <Button className="bg-transparent hover:bg-transparent text-white dark:text-white cursor-pointer border-none p-0">
              <Heart className="size-7 md:size-5 p-0" />
            </Button>

            <Button className="bg-transparent hover:bg-transparent text-white dark:text-white cursor-pointer border-none p-0">
              <MessageCircle className="size-7 md:size-5 p-0" />
            </Button>

            <Button className="bg-transparent hover:bg-transparent text-white dark:text-white cursor-pointer border-none p-0">
              <Send className="size-7 md:size-5 p-0" />
            </Button>

            <Button className="bg-transparent hover:bg-transparent text-white dark:text-white cursor-pointer border-none p-0">
              <Bookmark className="size-7 md:size-5 p-0" />
            </Button>
          </CardContent>

          <div className="flex flex-col gap-2 justify-start z-10 absolute bottom-12 md:bottom-5 left-4 md:left-16">
            <CardContent className="flex items-center gap-4 p-0">
              <span className="font-semibold text-base md:text-xs">
                Nome do usuario
              </span>

              <button className="bg-transparent hover:bg-transparent text-white dark:text-white cursor-pointer py-1 md:py-0.5 px-4 md:px-2 font-semibold border border-white rounded-md md:rounded text-xs md:text-[0.60rem]">
                Seguir
              </button>
            </CardContent>

            <CardContent className="flex w-full justify-start gap-2 p-0">
              <p className="text-xs md:text-[0.50rem] max-w-xs md:w-40 truncate font-normal text-white dark:text-white">
                Sua descrição vai ficar assim quando fizer o post em nas
                plataformas
              </p>
            </CardContent>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
