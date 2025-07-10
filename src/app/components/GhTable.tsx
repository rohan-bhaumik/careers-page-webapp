import { useEffect, useState } from "react";
import textInputBlockStyles from "@/devlink/TextInputBlock.module.css";
import styles from "./GhTable.module.css";

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
  movies?: Movie[];
}

export function GhTable({ movieName, movies = [] }: GhTableProps) {
  const [selectedMovie, setSelectedMovie] = useState<string>("all");

  // Reset movie filter when movieName changes
  useEffect(() => {
    if (movieName && movies.length > 0) {
      setSelectedMovie("all");
    }
  }, [movieName, movies]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMovie(e.target.value);
  };

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

      {/* Cast Members */}
      {movies
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
