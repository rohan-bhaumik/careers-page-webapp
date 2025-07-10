import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import textInputBlockStyles from "@/devlink/TextInputBlock.module.css";
import styles from "./GhTable.module.css";

const basePath = "/castSearch";

// Types
export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
};

export type Movie = {
  id: string;
  title: string;
  year: string;
  cast: CastMember[];
};

interface GhTableProps {
  movieName: string;
}

async function fetchMovieCast(
  movieName: string
): Promise<{ movies: Movie[] }> {
  const res = await fetch(
    `${basePath}/api/movie?movieName=${encodeURIComponent(movieName)}`
  );
  if (!res.ok)
    throw new Error("Could not find cast information for this movie");
  return res.json();
}

export function GhTable({ movieName }: GhTableProps) {
  const [selectedMovie, setSelectedMovie] = useState<string>("all");

  const { data, isLoading, error } = useQuery({
    queryKey: ["movies", movieName],
    queryFn: () => fetchMovieCast(movieName),
    staleTime: 60 * 1000, // 1 minute
    enabled: !!movieName, // Only run query if movieName is provided
  });

  // Reset movie filter when movieName changes
  useEffect(() => {
    if (movieName && data) {
      setSelectedMovie("all");
    }
  }, [movieName, data]);

  const movies = data?.movies?.filter((m: Movie) => m.cast.length > 0) ?? [];
  console.log(movies);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMovie(e.target.value);
  };

  // Show message if no movie name provided
  if (!movieName) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>
          Enter a movie name above to view cast members
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Filter Dropdown - Only show if we have multiple movies */}
      {movies.length > 1 && (
        <div className={styles.filterSection}>
          <label
            htmlFor="movie-filter"
            className={`w-form-label ${textInputBlockStyles["input-label"]}`}
          >
            Filter by movie:
          </label>
          <select
            id="movie-filter"
            value={selectedMovie}
            onChange={handleFilterChange}
            data-movie="filter"
            className={`w-select ${styles.darkSelect}`}
          >
            <option value="all">All Movies</option>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.title} ({movie.year})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div data-movie="loading" className={styles.loadingState}>
          Loading cast information...
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className={styles.errorState}>
          Could not find cast information for this movie
        </div>
      )}

      {/* Cast Members */}
      {!isLoading &&
        !error &&
        movies
          .filter(
            (movie) =>
              selectedMovie === "all" ||
              movie.id === selectedMovie
          )
          .map((movie) => (
            <section
              key={movie.id}
              data-movie="section-wrapper"
              id={movie.id}
              className={styles.departmentSection}
            >
              <h2
                data-movie="section-heading"
                className={styles.departmentHeading}
              >
                {movie.title} ({movie.year})
              </h2>
              <ul
                data-movie="container"
                aria-label={`${movie.title} cast members`}
                className={styles.jobsContainer}
              >
                {movie.cast.map((castMember) => (
                  <li key={castMember.id} className={styles.jobListItem}>
                    <div
                      data-movie="listing"
                      id={String(castMember.id)}
                      className={styles.jobListing}
                    >
                      <div className={styles.castMemberInfo}>
                        <div className={styles.castMemberPhoto}>
                          {castMember.profile_path ? (
                            <img
                              src={castMember.profile_path}
                              alt={castMember.name}
                              className={styles.profileImage}
                            />
                          ) : (
                            <div className={styles.noPhotoPlaceholder}>
                              <span>No Photo</span>
                            </div>
                          )}
                        </div>
                        <div className={styles.castMemberDetails}>
                          <span data-movie="actor-name" className={styles.jobTitle}>
                            {castMember.name}
                          </span>
                          <span
                            data-movie="character"
                            className={styles.jobLocation}
                          >
                            {castMember.character}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
    </div>
  );
}
