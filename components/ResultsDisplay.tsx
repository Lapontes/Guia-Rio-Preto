
import React from 'react';
import { SearchResult } from '../types';
import LoadingSpinner from './LoadingSpinner';
import PlaceCard from './PlaceCard';

interface ResultsDisplayProps {
  isLoading: boolean;
  error: string | null;
  searchResult: SearchResult | null;
  hasSearched: boolean;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ isLoading, error, searchResult, hasSearched }) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center p-6 bg-red-900/20 border border-red-500 rounded-lg text-red-300">{error}</div>;
  }
  
  if (!hasSearched) {
      return (
        <div className="text-center text-gray-500 py-10">
            <p>Faça uma busca para encontrar locais incríveis na cidade.</p>
        </div>
      );
  }

  if (!searchResult || (!searchResult.summary && searchResult.places.length === 0)) {
    return <div className="text-center text-gray-500 py-10">Nenhum resultado encontrado. Tente uma busca diferente.</div>;
  }

  return (
    <div className="space-y-8">
      {searchResult.summary && (
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h2 className="text-2xl font-semibold mb-3 text-emerald-400">Resumo da Busca</h2>
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{searchResult.summary}</p>
        </div>
      )}

      {searchResult.places.length > 0 && (
         <div>
            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Locais Encontrados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResult.places.map((chunk, index) => (
                    <PlaceCard key={`${chunk.maps.uri}-${index}`} mapData={chunk.maps} />
                ))}
            </div>
         </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
