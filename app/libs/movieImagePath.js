export const movieImagePath = (path, original) => {
  return `https://image.tmdb.org/t/p/${original ? 'original' : 'w500'}${path}`;
};
