import type { IRickMortyCharacter } from '../types';
import { useSelectCharactersStore } from './use-select-characters-store';

export const useSelectCharacter = (character: IRickMortyCharacter) => {
  const { select, unselect, selectedCharacters } = useSelectCharactersStore();

  const isSelected = selectedCharacters.has(character.id);

  const handleSelect = () => {
    if (isSelected) {
      unselect(character);
    } else {
      select(character);
    }
  };

  return { isSelected, handleSelect };
};
