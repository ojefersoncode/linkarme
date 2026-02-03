'use client';

import { Button } from '../ui/button';
import DemographicMap from './DemographicMap';

export default function DemographicCard() {
  return (
    <div className="w-full flex-1 bg-foreground rounded-lg p-4">
      <div className="w-full rounded-2xl">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white dark:text-white">
            Dados demográficos
          </h3>
          <div className="flex items-center gap-2">
            <Button className="bg-background hover:bg-background/80 transition-all duration-200 cursor-pointer text-accent font-medium text-xs md:text-sm ">
              24h
            </Button>
            <Button className="bg-background hover:bg-background/80 transition-all duration-200 cursor-pointer text-accent font-medium text-xs md:text-sm ">
              7d
            </Button>
            <Button className="bg-background hover:bg-background/80 transition-all duration-200 cursor-pointer text-accent font-medium text-xs md:text-sm ">
              30d
            </Button>
          </div>
        </div>
        <div className="w-full flex-1 py-6 overflow-hidden">
          <div
            id="mapOne"
            className="flex flex-1 justify-center mapOne map-btn md:w-[920px] h-[280px] sm:-mx-6 "
          >
            <DemographicMap />
          </div>
        </div>
      </div>
    </div>
  );
}
