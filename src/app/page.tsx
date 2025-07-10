"use client";

import { Section } from "@/devlink/_Builtin";
import navbarStyles from "@/devlink/Navbar.module.css";
import { GhTable, type Movie } from "./components/GhTable";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useState, useRef } from "react";
import styles from "./page.module.css";

// Move fetch function to page level
async function fetchMovieCast(movieName: string): Promise<{ movies: Movie[] }> {
  const res = await fetch(
    `/castSearch/api/movie?movieName=${encodeURIComponent(movieName)}`
  );
  if (!res.ok)
    throw new Error("Could not find cast information for this movie");
  return res.json();
}

function MovieSearchContent() {
  const [movieName, setMovieName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Fetch movie data at page level
  const { data, isLoading, error } = useQuery({
    queryKey: ["movies", movieName],
    queryFn: () => fetchMovieCast(movieName),
    staleTime: 60 * 1000, // 1 minute
    enabled: !!movieName, // Only run query if movieName is provided
  });

  const movies = data?.movies?.filter((m: Movie) => m.cast.length > 0) ?? [];
  const hasResults = movies.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMovieName = inputRef.current?.value || "";
    setMovieName(newMovieName);

    // Scroll to results section after a brief delay to ensure content is rendered
    if (newMovieName) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 500); // Increased delay to account for loading
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>Movie Cast Search</h1>
          <p>
            This is a Webflow Cloud NextJS example app for searching movie cast members
          </p>

          {/* Movie Search Form */}
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                id="movie-name"
                ref={inputRef}
                type="text"
                placeholder={`Enter movie name (e.g. "The Matrix")`}
                className={`w-input ${styles.darkInput}`}
              />
              <button type="submit" className={`button ${navbarStyles.button}`}>
                Search Cast
              </button>
            </form>
          </div>
        </div>

        {/* Scroll indicator - only show when there are results or loading */}
        {(hasResults || isLoading) && (
          <div className={styles.scrollIndicator}>
            <div className={styles.scrollText}>
              {isLoading ? "Loading..." : "Scroll for results"}
            </div>
            <div className={styles.scrollCaret}>⌄</div>
          </div>
        )}
      </div>

      {/* Results Section - Only show when there are results, loading, or error */}
      {(hasResults || isLoading || error) && (
        <div ref={resultsRef} className={styles.resultsSection}>
          <Section
            tag="section"
            style={{
              minHeight: "50vh",
              maxWidth: "100vw",
              padding: "40px 0",
            }}
          >
            {isLoading && (
              <div style={{ textAlign: "center", padding: "40px 0", color: "white" }}>
                Loading cast information...
              </div>
            )}
            
            {error && (
              <div style={{ textAlign: "center", padding: "40px 0", color: "#dc2626" }}>
                Could not find cast information for this movie
              </div>
            )}
            
            {hasResults && <GhTable movieName={movieName} movies={movies} />}
          </Section>
        </div>
      )}
    </>
  );
}

export default function Home() {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      <MovieSearchContent />
    </QueryClientProvider>
  );
}
