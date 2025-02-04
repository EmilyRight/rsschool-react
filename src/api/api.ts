const HOST = 'https://rickandmortyapi.com/api/character/';

export const fetchItems = async <T>(searchTerm: string = ''): Promise<T> => {
  const response = await fetch(`${HOST}/${searchTerm}`, { method: 'GET' });
      if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  return response.json() as T;
};
