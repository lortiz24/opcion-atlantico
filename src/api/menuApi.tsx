import axios from 'axios'

export const menuApi = axios.create({baseURL: 'https://pokeapi.co/api/v2'})