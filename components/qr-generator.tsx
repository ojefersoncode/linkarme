'use client';

import { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog';
import { ImageIcon } from 'lucide-react';

export function QrGenerator() {
  const ref = useRef<HTMLDivElement | null>(null);
  const qrCodeRef = useRef<any>(null);
  const [color, setColor] = useState('#000000');
  const [image, setImage] = useState<string | null>(null);

  const [url, setUrl] = useState('');
  const [generated, setGenerated] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    qrCodeRef.current = new QRCodeStyling({
      width: 240,
      height: 240,
      data: '',
      type: 'canvas',
      dotsOptions: { color: '#000', type: 'rounded' },
      backgroundOptions: { color: '#fff' }
    });
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (ref.current && qrCodeRef.current) {
          qrCodeRef.current.append(ref.current);
        }
      }, 50);
    }
  }, [open]);

  function generate() {
    if (!url) return;

    qrCodeRef.current.update({
      data: url,
      dotsOptions: { color },
      image: image || undefined
    });

    setGenerated(true);
    setOpen(true);
  }

  function download() {
    qrCodeRef.current.download({ extension: 'png' });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
      <div className="flex flex-col gap-4">
        <div className="text-black">
          <h1 className="text-xl font-semibold">Detalhes</h1>
          <h2 className="text-base font-medium">10 QRcodes restantes</h2>
        </div>

        <Label className="text-black font-medium">URL de destino</Label>

        <Input
          className="py-3 bg-white dark:bg-white border text-black placeholder:text-black/50 border-black/40"
          placeholder="https://exemplo.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <div className="flex flex-col gap-2 pt-4">
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 items-center ">
            <div className="flex flex-col gap-2">
              <Label className="text-black font-medium">
                Definir uma imagem
              </Label>

              <div className="relative w-fit">
                <Input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const reader = new FileReader();
                    reader.onload = () => setImage(reader.result as string);
                    reader.readAsDataURL(file);
                  }}
                />

                <Button
                  type="button"
                  onClick={() => document.getElementById('fileInput')?.click()}
                  className="flex items-center gap-2 cursor-pointer border border-black/5 px-4 py-2  text-black/80 bg-background hover:bg-background/70"
                >
                  <ImageIcon className="w-5 h-5" />
                  <span>Selecionar imagem</span>
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-black font-medium">Definir uma cor</Label>

              <input
                className="w-8 h-8 rounded-full border-none cursor-pointer bg-white dark:bg-white"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={generate}
              className="bg-foreground text-white w-44 py-3 hover:bg-foreground/80"
            >
              Gerar QR Code
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="hidden">
          <span />
        </DialogTrigger>

        <DialogContent className="flex flex-col items-center gap-6 border-none bg-white">
          <DialogHeader>
            <DialogTitle className="text-center text-black font-bold">
              Seu QR Code
            </DialogTitle>
          </DialogHeader>

          <div
            ref={ref}
            className="w-[240px] h-[240px] flex items-center justify-center bg-white"
          />

          {generated && (
            <Button
              onClick={download}
              className="bg-black hover:bg-black/80 text-white py-2 w-60 rounded-md"
            >
              Baixar PNG
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
