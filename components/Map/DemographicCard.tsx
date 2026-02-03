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
            <button className="bg-background hover:bg-background/80 transition-all duration-200 cursor-pointer rounded-sm text-accent font-medium text-xs md:text-sm py-1 px-2">
              1d
            </button>
            <button className="bg-background hover:bg-background/80 transition-all duration-200 cursor-pointer rounded-sm text-accent font-medium text-xs md:text-sm py-1 px-2">
              7d
            </button>
            <button className="bg-background hover:bg-background/80 transition-all duration-200 cursor-pointer rounded-sm text-accent font-medium text-xs md:text-sm py-1 px-2">
              30d
            </button>
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
