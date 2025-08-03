import type { IRickMortyCharacter } from '../types';
import { useSelectCharactersStore } from './use-select-characters-store';

const csvFields: (keyof IRickMortyCharacter)[] = [
  'id',
  'name',
  'gender',
  'status',
  'species',
  'url',
];

const csvLineEndSymbol = `\n`;
const csvDelimeter = `;`;
const csvHeaderString = csvFields.join(csvDelimeter);

export const useSelectCharactersCsv = () => {
  const { selectedCharacters, clear } = useSelectCharactersStore();

  const selectedCharactersCount = selectedCharacters.size;

  const isCharacterSelectionEmpty = selectedCharactersCount === 0;

  const selectedCharactersValues = [...selectedCharacters.values()];

  const csvSelectedCharactersString = selectedCharactersValues
    .map((character) =>
      csvFields.map((field) => character[field]).join(csvDelimeter)
    )
    .join(csvLineEndSymbol);

  const downloadLinkHref = `data:text/csv;charset=utf-8,${csvHeaderString}${csvLineEndSymbol}${csvSelectedCharactersString}`;

  const downloadLinkDownload = `${selectedCharactersCount}_items.csv`;

  return {
    selectedCharactersCount,
    isCharacterSelectionEmpty,
    downloadLinkHref,
    downloadLinkDownload,
    clearSelectedCharacters: clear,
  };
};
