
export interface ReviewSnippet {
  text: string;
}

export interface Place {
  place: string;
  name: string;
  reviewSnippets: ReviewSnippet[];
}

export interface MapData {
  uri: string;
  title: string;
  placeAnswerSources: {
    places: Place[];
  };
}

export interface GroundingChunk {
  maps: MapData;
}

export interface SearchResult {
  summary: string;
  places: GroundingChunk[];
}
