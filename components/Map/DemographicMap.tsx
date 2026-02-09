'use client';

import React from 'react';
import { worldMill } from '@react-jvectormap/world';
import dynamic from 'next/dynamic';

const VectorMap = dynamic(
  () => import('@react-jvectormap/core').then((mod) => mod.VectorMap),
  { ssr: false }
);

// Define the component props
interface CountryMapProps {
  mapColor?: string;
}

type MarkerStyle = {
  initial: {
    fill: string;
    r: number; // Radius for markers
  };
};

type Marker = {
  latLng: [number, number];
  name: string;
  style?: {
    fill: string;
    borderWidth: number;
    borderColor: string;
    stroke?: string;
    strokeOpacity?: number;
  };
};

const DemographicMap: React.FC<CountryMapProps> = ({ mapColor }) => {
  return (
    <VectorMap
      map={worldMill}
      backgroundColor="transparent"
      markerStyle={
        {
          initial: {
            fill: '#465FFF',
            r: 4 // Custom radius for markers
          } // Type assertion to bypass strict CSS property checks
        } as MarkerStyle
      }
      markersSelectable={false}
      markers={
        [
          {
            latLng: [37.2580397, -104.657039],
            name: 'United States',
            style: {
              fill: '#588157',
              borderColor: 'white',
              stroke: '#383f47'
            }
          }
        ] as Marker[]
      }
      zoomOnScroll={false}
      zoomMax={12}
      zoomMin={1}
      zoomAnimate={true}
      zoomStep={1.5}
      regionStyle={{
        initial: {
          fill: mapColor || '#D0D5DD',
          fillOpacity: 1,
          fontFamily: 'Outfit',
          stroke: 'none',
          strokeWidth: 0,
          strokeOpacity: 0
        },
        hover: {
          fillOpacity: 0.7,
          cursor: 'pointer',
          fill: '#588157',
          stroke: 'none'
        },
        selected: {
          fill: '#588157'
        },
        selectedHover: {}
      }}
      regionLabelStyle={{
        initial: {
          fill: '#588157',
          fontWeight: 500,
          fontSize: '13px',
          stroke: 'none'
        },
        hover: {},
        selected: {},
        selectedHover: {}
      }}
    />
  );
};

export default DemographicMap;
