import { useSelectCharactersCsv } from '../hooks/use-select-characters-csv';

export const SelectCharactersDrawer = () => {
  const {
    selectedCharactersCount,
    downloadLinkDownload,
    downloadLinkHref,
    isCharacterSelectionEmpty,
    clearSelectedCharacters,
  } = useSelectCharactersCsv();

  if (isCharacterSelectionEmpty) {
    return null;
  }

  return (
    <section className=" box select-characters-drawer level">
      <div>Selected {selectedCharactersCount} characters</div>

      <a href={downloadLinkHref} download={downloadLinkDownload}>
        <button className="button">Download</button>
      </a>

      <button className="button" onClick={clearSelectedCharacters}>
        Unselect all
      </button>
    </section>
  );
};
