"use client";

import { Section } from "@/devlink/_Builtin";
import navbarStyles from "@/devlink/Navbar.module.css";
import { GhTable } from "./components/GhTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useRef } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [queryClient] = useState(() => new QueryClient());
  const [movieName, setMovieName] = useState<string>("The Matrix");
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMovieName = inputRef.current?.value || "";
    setMovieName(newMovieName);

    // Scroll to results section after a brief delay to ensure content is rendered
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <QueryClientProvider client={queryClient}>
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

        {/* Scroll indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollText}>Scroll for results</div>
          <div className={styles.scrollCaret}>⌄</div>
        </div>
      </div>

      {/* Results Section - Below the fold */}
      <div ref={resultsRef} className={styles.resultsSection}>
        <Section
          tag="section"
          style={{
            minHeight: "100vh",
            maxWidth: "100vw",
            padding: "40px 0",
          }}
        >
          <GhTable movieName={movieName} />
        </Section>
      </div>
    </QueryClientProvider>
  );
}
