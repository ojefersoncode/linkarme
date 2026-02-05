import DemographicMap from './DemographicMap';
import { FilterDateMap } from './filter-date-map';

export default function DemographicCard() {
  return (
    <div className="w-full flex-1 bg-white p-4 shadow-xl/40 shadow-primary rounded-lg">
      <div className="w-full rounded-2xl">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-accent dark:text-accent">
            Dados demográficos
          </h3>
          <div className="flex items-center gap-2">
            <FilterDateMap />
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
