
import React, { useState } from 'react';
import { SearchIcon } from './icons/SearchIcon';

interface SearchInputProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="O que você procura? Ex: restaurantes, farmácias, parques..."
        className="w-full px-5 py-4 pr-16 bg-gray-800 border-2 border-gray-700 rounded-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-colors duration-300 placeholder-gray-500"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="absolute top-1/2 right-3 -translate-y-1/2 p-2.5 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-emerald-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300"
        aria-label="Buscar"
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <SearchIcon className="h-5 w-5" />
        )}
      </button>
    </form>
  );
};

export default SearchInput;
