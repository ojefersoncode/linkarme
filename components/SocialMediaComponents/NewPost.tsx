'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Facebook,
  ImageIcon,
  Instagram,
  Music2,
  Video,
  X,
  Youtube
} from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import Link from 'next/link';

export function NewPost() {
  return (
    <form>
      <Card className="border-none shadow-none p-0 bg-white text-black w-full">
        <CardHeader className="px-0">
          <CardTitle className="text-xl font-bold">Novo Post</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <Label htmlFor="name-1">Nome do post</Label>
          <Input
            className="mt-2 text-black/70 dark:text-black/70 bg-white dark:bg-white border border-black/40 placeholder:text-black/40"
            id="post-name"
            name="post-name"
            placeholder="Nome do post não aparece para os seguidores"
          />
        </CardContent>

        <CardContent className="px-0">
          <Label htmlFor="plataforma">Plataformas integradas</Label>
          <div className="pt-2">
            <ToggleGroup variant="outline" type="multiple">
              <ToggleGroupItem value="bold" aria-label="Toggle bold">
                <Music2 />
              </ToggleGroupItem>
              <ToggleGroupItem value="bold" aria-label="Toggle bold">
                <Instagram />
              </ToggleGroupItem>

              <ToggleGroupItem
                value="strikethrough"
                aria-label="Toggle strikethrough"
              >
                <Facebook />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="strikethrough"
                aria-label="Toggle strikethrough"
              >
                <Youtube />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Toggle italic">
                <X />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </CardContent>

        <CardContent className="px-0">
          <Label htmlFor="username-1">Selecione o arquivo</Label>
          <div className="flex items-center gap-4 pt-2">
            <div className="relative ">
              <Input
                id="fileInput"
                type="file"
                className="hidden"
                accept="image/video/*"
              />

              <Button
                type="button"
                onClick={() => document.getElementById('fileInput')?.click()}
                className="flex items-center gap-2 cursor-pointer border border-black/5 px-4 py-2 text-black/80 bg-background hover:bg-background/70"
              >
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  <span>Imagem</span>
                </div>
              </Button>
            </div>

            <div className="relative w-full">
              <Input
                id="fileInput"
                type="file"
                className="hidden"
                accept="image/video/*"
              />

              <Button
                type="button"
                onClick={() => document.getElementById('fileInput')?.click()}
                className="flex items-center gap-2 cursor-pointer border border-black/5 px-4 py-2 text-black/80 bg-background hover:bg-background/70"
              >
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  <span>Video</span>
                </div>
              </Button>
            </div>
          </div>
        </CardContent>

        <CardContent className="px-0">
          <Label htmlFor="username-1">Descrição do post</Label>
          <Textarea
            className="mt-2 text-black/70 dark:text-black/70 bg-white dark:bg-white border border-black/40 placeholder:text-black/40 resize-none"
            id="description"
            name="description"
            placeholder="Descrição"
            rows={3}
          />
        </CardContent>

        <div className="flex pt-2 pb-4 gap-4 md:gap-6 w-full justify-between">
          <Link className="flex flex-1 w-full" href="/dashboard/social-media/">
            <Button className="flex-1 bg-red-600 hover:bg-red-500 text-white dark:text-white cursor-pointer border-none py-5 text-base font-semibold">
              Cancelar
            </Button>
          </Link>

          <Button
            type="submit"
            className="flex-1 bg-foreground hover:bg-foreground text-white dark:text-white cursor-pointer border-none py-5 text-base font-semibold"
          >
            Postar
          </Button>
        </div>
      </Card>
    </form>
  );
}
