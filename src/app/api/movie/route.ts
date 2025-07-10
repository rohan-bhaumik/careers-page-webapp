// src/app/api/movie/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const movieName = searchParams.get("movieName") || "";
  
  if (!movieName) {
    return NextResponse.json(
      { error: "Movie name is required" },
      { status: 400 }
    );
  }

  try {
    // Using TMDb API for better cast information with photos
    // TMDb API is free but requires registration at https://www.themoviedb.org/settings/api
    const tmdbApiKey = ""; // Add your TMDb API key here for production
    
    // For demo purposes, we'll use a public demo approach
    // In production, you should get a free API key from TMDb
    
    // Step 1: Search for the movie
    const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieName)}&api_key=8265bd1679663a7ea12ac168da84d2e8`;
    
    const searchResponse = await fetch(searchUrl, { 
      cache: 'force-cache' // Cache the response
    });
    
    if (!searchResponse.ok) {
      return NextResponse.json(
        { error: "Failed to search for movie" },
        { status: searchResponse.status }
      );
    }
    
    const searchData = await searchResponse.json() as any;
    
    if (!searchData.results || searchData.results.length === 0) {
      return NextResponse.json({ movies: [] });
    }
    
    // Get the first movie result
    const movie = searchData.results[0];
    
    // Step 2: Get cast information for the movie
    const creditsUrl = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=8265bd1679663a7ea12ac168da84d2e8`;
    
    const creditsResponse = await fetch(creditsUrl, { 
      cache: 'force-cache' // Cache the response
    });
    
    if (!creditsResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch cast information" },
        { status: creditsResponse.status }
      );
    }
    
    const creditsData = await creditsResponse.json() as any;
    
    // Format cast members with photos
    const castMembers = creditsData.cast ? creditsData.cast.slice(0, 15).map((castMember: any) => ({
      id: castMember.id,
      name: castMember.name,
      character: castMember.character || "Unknown Role",
      profile_path: castMember.profile_path ? `https://image.tmdb.org/t/p/w185${castMember.profile_path}` : null,
      order: castMember.order || 0
    })) : [];
    
    const result = {
      movies: [{
        id: movie.id.toString(),
        title: movie.title || movieName,
        year: movie.release_date ? movie.release_date.substring(0, 4) : "Unknown",
        cast: castMembers
      }]
    };
    
    return NextResponse.json(result);
    
  } catch (error) {
    console.error("Movie search error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// export const runtime = "edge"; 