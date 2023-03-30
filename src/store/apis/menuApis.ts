import axios from 'axios'



import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const menuApi = createApi({
    reducerPath: 'todos',

    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),

    endpoints: (builder) => ({

        getModules: builder.query({

            query: () => '/todos'
        }),

        getModule: builder.query({
            query: (todoId) => `/todos/${todoId}`
        }),

        setModule: builder.query({
            query: () => ''
        }),
        getPokemonByName: builder.query({
            query: (name) => `pokemon/${name}`,
        }),

    })
})

export const { useGetModuleQuery, useGetModulesQuery, useSetModuleQuery, useGetPokemonByNameQuery } = menuApi;