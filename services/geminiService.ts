
import { GoogleGenAI } from "@google/genai";
import { SearchResult, GroundingChunk } from '../types';

// Coordinates for São José do Rio Preto, Brazil
const SAO_JOSE_DO_RIO_PRETO_COORDS = {
  latitude: -20.8202,
  longitude: -49.3792,
};

export const findPlaces = async (query: string): Promise<SearchResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Encontre ${query} em São José do Rio Preto, Brasil. Forneça um breve resumo e uma lista de locais.`,
      config: {
        tools: [{ googleMaps: {} }],
      },
      toolConfig: {
        retrievalConfig: {
          latLng: {
            latitude: SAO_JOSE_DO_RIO_PRETO_COORDS.latitude,
            longitude: SAO_JOSE_DO_RIO_PRETO_COORDS.longitude,
          }
        }
      }
    });

    const summary = response.text;
    const groundingChunks = (response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[] || [])
      .filter(chunk => chunk.maps); // Ensure we only get map-related chunks

    return {
      summary,
      places: groundingChunks
    };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Não foi possível buscar os locais. Verifique sua conexão e a chave de API.");
  }
};
