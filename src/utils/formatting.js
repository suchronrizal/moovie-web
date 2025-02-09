export const formatCardMovie = (movie) => {
  const img = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : new URL("@/assets/no_images.png", import.meta.url).href;
  return {
    id: movie.id,
    title: movie.title,
    image: img,
    rating: movie.vote_average ? +movie.vote_average.toFixed(1) : 0,
    year: movie.release_date ? movie.release_date.split("-")[0] : "N/A",
    overview: movie.overview || "No overview available.",
    genres: movie.genres
      ? movie.genres.map((genre) => genre.name).join(", ")
      : "N/A",
  };
};

export const formatDetailMovie = (movie) => {
  if (!movie || Object.keys(movie).length === 0) {
    return {}; // Kembalikan object kosong jika movie belum ada
  }

  const productionCompany =
    movie.production_companies && movie.production_companies[0]?.name;

  return {
    id: movie.id || "N/A",
    title: movie.title || "Untitled",
    backdrop: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
      : new URL("@/assets/no_images.png", import.meta.url),
    year: movie.release_date ? movie.release_date.split("-")[0] : "N/A",
    language:
      movie.original_language === "en"
        ? "English"
        : movie.original_language || "Unknown",
    production: productionCompany || "N/A",
    image: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : new URL("@/assets/no_images.png", import.meta.url),
    rating: movie.vote_average ? +movie.vote_average.toFixed(1) : 0,
    vote: movie.vote_count || "0",
    overview: movie.overview || "No overview available.",
    budget: movie.budget
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(movie.budget)
      : "N/A",
    status: movie.status || "Unknown",
    genres: movie.genres
      ? movie.genres.map((genre) => genre.name).join(", ")
      : "N/A",
  };
};

export const formatReviews = (reviews) => {
  return reviews.map((review) => {
    const formattedDate = new Date(review.updated_at).toLocaleDateString(
      "en-US",
      {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }
    );
    return {
      ...review,
      updated_at: formattedDate,
      rating: review.author_details?.rating || "N/A",
      author_img:
        review.author_details?.avatar_path !== null
          ? `https://image.tmdb.org/t/p/w500/${review.author_details?.avatar_path}`
          : "https://placehold.co/50x50",
    };
  });
};
