import type { THEMES } from './constants';

export type T_THEMES = (typeof THEMES)[keyof typeof THEMES];

export interface IRickMortyCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface IResponseInfo {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface IRickMortyResponse {
  info: IResponseInfo;
  results: IRickMortyCharacter[];
}
