import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { TCard, TCardResponse } from '../../types/types';
import { HOST } from '../../constants/constants';
export interface GetAllPersonsQueryParams {
  currentPage?: string;
}

export const api = createApi({
  reducerPath: 'cards',
  baseQuery: fetchBaseQuery({ baseUrl: `${HOST}` }),
  endpoints: builder => ({
    getAllPersons: builder.query<TCardResponse, GetAllPersonsQueryParams>({
      query: ({ currentPage = '1' } = {}) => `character/?page=${currentPage}`,
    }),
    getPersonById: builder.query<TCard, number>({
      query: id => `character/${id}`,
    }),
  }),
});

type UseGetAllPersonsQuery = typeof api.endpoints.getAllPersons.useQuery;
type UseGetPersonByIdQuery = typeof api.endpoints.getPersonById.useQuery;

export const useGetAllPersonsQuery: UseGetAllPersonsQuery = api.endpoints.getAllPersons.useQuery;
export const useGetPersonByIdQuery: UseGetPersonByIdQuery = api.endpoints.getPersonById.useQuery;
