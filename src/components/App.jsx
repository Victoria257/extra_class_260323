import { Button } from './Button/Button';
import { fetchMovies } from 'servises/moviesApi';
import { MoviesList } from './MoviesList/MoviesList';
import { useState } from 'react';
import { useEffect } from 'react';
import { Loader } from './loader/Loader';

export const App = () => {
  const [isListShown, setIsListShown] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(
    data => {
      if (isListShown) {
        setIsLoading(true);
        fetchMovies(page)
          .then(data => {
            setMovies(prev => {
              return [...prev, ...data.data.results];
            });
          })
          .catch(error => console.log(error))
          .finally(() => setIsLoading(false));
      } else if (!isListShown) {
        setMovies([]);
        setPage(1);
      }
    },
    [page, isListShown]
  );

  const handleClick = () => {
    setIsListShown(prev => {
      return !prev;
    });
  };

  const loadMore = () => {
    setPage(prev => {
      return prev + 1;
    });
  };

  const handleButtonDelete = id => {
    setMovies(prevState => prevState.filter(movie => movie.id !== id));
  };

  return (
    <div>
      <Button
        text={isListShown ? 'Hide List Show' : 'Show moves list'}
        handleClick={handleClick}
      />
      {isListShown && (
        <div>
          <MoviesList movies={movies} handleClick={handleButtonDelete} />
          {!isLoading && <Button text="Load more" handleClick={loadMore} />}
        </div>
      )}
      {isLoading && <Loader />}
    </div>
  );
};
