import { create } from 'zustand';
import type { IRickMortyCharacter } from '../types';

interface ISelectCharactersState {
  selectedCharacters: Map<number, IRickMortyCharacter>;
  select: (character: IRickMortyCharacter) => void;
  unselect: (character: IRickMortyCharacter) => void;
  clear: () => void;
}

export const useSelectCharactersStore = create<ISelectCharactersState>()(
  (set) => ({
    selectedCharacters: new Map(),
    select: (character) =>
      set((state) => ({
        selectedCharacters: new Map(state.selectedCharacters).set(
          character.id,
          character
        ),
      })),
    unselect: (character) =>
      set((state) => {
        const tempMap = new Map(state.selectedCharacters);

        tempMap.delete(character.id);

        return {
          selectedCharacters: new Map(tempMap),
        };
      }),
    clear: () => set(() => ({ selectedCharacters: new Map() })),
  })
);
