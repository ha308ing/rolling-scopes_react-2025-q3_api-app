import { API_URL } from '../constants';

export const fetchRickMorty = async (queryString: string) => {
  const response = await fetch(`${API_URL}${queryString}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};
