// src/api.js

import axios from 'axios';

const API_URL = 'https://run.mocky.io/v3/f24ebab2-b908-4866-87d1-094d6ad27fd4'; // Replace with your mock API URL

export const fetchEvents = () => {
  return axios.get(API_URL);
};
