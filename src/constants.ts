export const API_URL = 'https://rickandmortyapi.com/api/character';

export const LOCALSTORAGE_SEARCH_QUERY_KEY = 'search-query';

export const ROUTES = {
  NOT_FOUND: '*',
  ROOT: '/',
  ABOUT: '/about',
  CHARACTER_ID_PARAM: '/:characterId',
};

export const API_SEARCH_PARAM_PAGE = 'page';
export const API_FIRST_PAGE = 1;

export const API_SEARCH_PARAM_DETAIL = 'detail';

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;
