import { createClient } from 'pexels';
const API_KEY = 'vXqyR8NCJTxpSKsofnbE8OuWPsT6OqypgtVZV969xcBNF6NoRI76CHOs';
const page = Math.floor(Math.random() * 10);

export const pexels = async (query: string, perPage: number = 1) => {
  try {
    const client = createClient(API_KEY);
    const res = await client.photos.search({ query, page, per_page: perPage });
    if ('photos' in res) {
      const photo = res.photos[0];
      return {
        src: photo.src.large2x,
        photographer: photo.photographer,
        link: photo.url,
      };
    }
  } catch (error) {
    console.error(error);
  }
};
