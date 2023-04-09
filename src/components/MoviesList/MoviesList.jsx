export const MoviesList = ({ movies, handleClick }) => {
  return (
    <ul>
      {movies.map(({ title, vote_count, id }) => (
        <li key={id}>
          <h3>{title}</h3>
          <p>{vote_count}</p>
          <button type="button" onClick={() => handleClick(id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
