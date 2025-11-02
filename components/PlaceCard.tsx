
import React from 'react';
import { MapData } from '../types';
import { MapPinIcon } from './icons/MapPinIcon';

interface PlaceCardProps {
  mapData: MapData;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ mapData }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-md overflow-hidden flex flex-col h-full transform hover:-translate-y-1 transition-transform duration-300">
      <div className="p-5 flex-grow">
        <h3 className="text-xl font-bold text-gray-100 mb-2">{mapData.title}</h3>
        {mapData.placeAnswerSources?.places?.[0]?.reviewSnippets?.[0]?.text &&
            <blockquote className="text-sm text-gray-400 italic border-l-2 border-emerald-500 pl-3">
                "{mapData.placeAnswerSources.places[0].reviewSnippets[0].text}"
            </blockquote>
        }
      </div>
      <div className="p-4 bg-gray-800/50 mt-auto">
        <a
          href={mapData.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-emerald-400 hover:bg-emerald-500 transition-colors"
        >
          <MapPinIcon className="w-5 h-5 mr-2" />
          Ver no Mapa
        </a>
      </div>
    </div>
  );
};

export default PlaceCard;
