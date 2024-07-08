export type TFetchedCardResults = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;

  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];

  url: string;
  created: string;
};

export type TFetchedCard = {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: null;
  };
  results: TFetchedCardResults[];
};

export type TCardProps = {
  id: number;
  name: string;
  species: string;
  gender: string;
  image: string;
};

export type Card = {
  id: number;
  name: string;
  species: string;
  gender: string;
  image: string;
};
