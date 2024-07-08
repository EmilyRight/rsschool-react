const HOST = 'https://rickandmortyapi.com/api/character/';
import { TFetchedCard, TFetchedCardResults } from '../types/types';

export const fetchItems = async (searchTerm: string = '') => {
  const response = await fetch(`${HOST}/${searchTerm}`, { method: 'GET' });
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  return response.json();
};
