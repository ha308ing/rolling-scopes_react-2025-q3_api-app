import { useThemeChange } from '../hooks/use-theme-change';

export const ThemeChangeButton = () => {
  const changeThemeHandler = useThemeChange();

  return (
    changeThemeHandler && (
      <button className="button" onClick={changeThemeHandler}>
        Toggle Theme
      </button>
    )
  );
};
