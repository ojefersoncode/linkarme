'use client';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';
import { Card } from '../ui/card';

function getDesc(code: number): string {
  if (code === 0) return 'Céu limpo';
  if (code <= 3) return 'Parcialmente nublado';
  if (code <= 48) return 'Nublado / neblina';
  if (code <= 55) return 'Garoa';
  if (code <= 67) return 'Chuva';
  if (code <= 77) return 'Neve';
  if (code <= 82) return 'Pancadas de chuva';
  if (code <= 99) return 'Tempestade';
  return 'Desconhecido';
}

function getIcon(code: number): string {
  if (code === 0) return '☀️';
  if (code <= 3) return '⛅';
  if (code <= 48) return '☁️';
  if (code <= 55) return '🌦️';
  if (code <= 67) return '🌧️';
  if (code <= 77) return '❄️';
  if (code <= 82) return '🌦️';
  if (code <= 99) return '⛈️';
  return '🌡️';
}

export default function HeaderClima() {
  const [weather, setWeather] = useState<{
    temp: number;
    desc: string;
    icon: string;
  } | null>(null);
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(true);

  // Atualiza o relógio a cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Busca clima via Open-Meteo (sem API key)
  useEffect(() => {
    async function loadWeather() {
      try {
        // Coordenadas de Ponte Nova - MG
        const url =
          'https://api.open-meteo.com/v1/forecast' +
          '?latitude=-20.4128' +
          '&longitude=-42.9083' +
          '&current=temperature_2m,weathercode' +
          '&timezone=America/Sao_Paulo';

        const res = await fetch(url);
        const data = await res.json();

        const temp = Math.round(data.current.temperature_2m);
        const code = data.current.weathercode;

        setWeather({
          temp,
          desc: getDesc(code),
          icon: getIcon(code)
        });
      } catch (err) {
        console.error('Erro ao buscar clima:', err);
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, []);

  const hora = time.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
  const periodo = time.getHours() >= 12 ? 'PM' : 'AM';

  if (loading) {
    return (
      <Skeleton className="h-40 md:h-48 bg-slate-200 aspect-video w-full" />
    );
  }

  return (
    <Card className="bg-gradient-to-bl md:bg-gradient-to-l to-40%  md:to-30% from-cyan-200 to-white text-black shadow shadow-primary border-none px-4 md:px-6">
      <div className="flex justify-between w-full ">
        <div className="flex flex-col">
          <h1 className="text-2xl max-md:text-xl font-bold">
            Bem vindo, Jeferson!
          </h1>
          <h2 className="text-sm font-medium">
            Vamos para mais um dia produtivo!
          </h2>
          <div className="flex gap-2 pt-8">
            <span className="text-6xl max-md:text-4xl font-bold">{hora}</span>
            <p className="text-lg max-md:text-sm pt-8 max-md:pt-4">{periodo}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 justify-end">
            <span className="text-5xl max-md:text-4xl">
              {weather?.icon ?? '🌡️'}
            </span>
            <h2 className="text-6xl max-md:text-5xl font-bold">
              {weather?.temp !== undefined ? `${weather.temp}°` : '--°'}
            </h2>
          </div>
          <div className="flex flex-col">
            <span className="text-end text-sm md:text-base font-medium text-black">
              {weather?.desc ?? ''}
            </span>
            <span className="text-end text-sm md:text-base font-medium">
              Ponte Nova
            </span>
            <span className="text-end text-nowrap text-sm md:text-base font-medium text-black">
              {time.toLocaleDateString('pt-BR', {
                weekday: 'long',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
