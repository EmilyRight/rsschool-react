export type TFetchedCardInfo = {
  count: number;
  pages: number;
  next: string;
  prev: null;
};

export type TFetchedCards = {
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

export type TFetchedCardResults = {
  info: TFetchedCardInfo;
  results: TFetchedCards[];
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
