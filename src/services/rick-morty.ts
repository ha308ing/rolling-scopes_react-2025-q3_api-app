import { API_URL } from '../constants';
import type { IResponseInfo, IRickMortyCharacter } from '../types';

export interface IRickMortyResponse {
  info: IResponseInfo;
  results: IRickMortyCharacter[];
}

const savedResults = new Map();

export const getRickMortyCharacterByName = (
  characterName: string,
  page: number
) => {
  const abortController = new AbortController();

  const request = new Promise<
    | { success: true; data: IRickMortyResponse }
    | { success: false; data: string }
  >((resolve) => {
    const queryString = `/?name=${characterName}&page=${page}`;

    if (savedResults.has(queryString)) {
      return resolve(savedResults.get(queryString));
    }

    fetch(`${API_URL}${queryString}`, {
      signal: abortController.signal,
    })
      .then((response) => {
        if (!response.ok) {
          return resolve({
            success: false,
            data: response.status + response.statusText,
          });
        }
        return response.json();
      })
      .then((data) => {
        const result = { success: true, data };
        savedResults.set(queryString, result);
        resolve(result);
      })
      .catch(
        (error: Error) =>
          error.name != 'AbortError' &&
          resolve({ success: false, data: error.message })
      );
  });

  return [request, abortController] as const;
};
