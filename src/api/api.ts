const HOST = 'https://rickandmortyapi.com/api/character/';

export const fetchItems = async (searchTerm: string = '') => {
  const response = await fetch(`${HOST}/${searchTerm}`, { method: 'GET' });
  console.log('fetchItems', `${HOST}/${searchTerm}`);

  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  return response.json();
};
