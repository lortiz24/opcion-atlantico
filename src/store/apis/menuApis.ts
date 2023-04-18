import axios from 'axios'



import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const menuApi = createApi({
    reducerPath: 'menuapi',

    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),

    endpoints: (builder) => ({

        getModules: builder.query({

            query: () => '/todos'
        }),

        getModule: builder.query({
            query: (todoId) => `/todos/${todoId}`
        }),

        setModule: builder.mutation({
            query: () => ''
        }),
        getPokemonByName: builder.query({
            query: (name) => `pokemon/${name}`,
        }),

    })
})

export const { useGetModuleQuery, useGetModulesQuery, useSetModuleMutation, useGetPokemonByNameQuery } = menuApi;