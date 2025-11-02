
import React, { useState, useCallback } from 'react';
import { SearchResult } from './types';
import { findPlaces } from './services/geminiService';
import SearchInput from './components/SearchInput';
import ResultsDisplay from './components/ResultsDisplay';
import { MapPinIcon } from './components/icons/MapPinIcon';

const App: React.FC = () => {
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setError("Por favor, digite o que você deseja buscar.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setSearchResult(null);
    setHasSearched(true);

    try {
      const result = await findPlaces(query);
      setSearchResult(result);
    } catch (e: any) {
      setError(e.message || "Ocorreu um erro desconhecido.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-8">
          <div className="flex justify-center items-center gap-4 mb-2">
            <MapPinIcon className="h-10 w-10 text-emerald-400" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
              Guia Rio Preto
            </h1>
          </div>
          <p className="text-lg text-gray-400">
            Encontre os melhores estabelecimentos em São José do Rio Preto.
          </p>
        </header>

        <div className="max-w-2xl mx-auto">
          <SearchInput onSearch={handleSearch} isLoading={isLoading} />
        </div>

        <div className="mt-10 max-w-4xl mx-auto">
          <ResultsDisplay
            isLoading={isLoading}
            error={error}
            searchResult={searchResult}
            hasSearched={hasSearched}
          />
        </div>
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Desenvolvido com IA do Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;
