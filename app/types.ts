export type Post = {
  id: string;
  type: "anime" | "other" | "animeMulti";
  author: string;
  datePosted: string;
  tags: string[];
  title: string;
  subtitle: string;
  content: string;
  postImg: string;
  bannerImg: string;
  malId: number;
};

export type MalRatingDetails = {
  id: number;
  title: string;
  main_picture: {
    small?: string;
    medium?: string;
    large?: string;
  };
  mean: number;
  rank: number;
  popularity: number;
  rating: string;
};

export enum PostSortTypes {
  OLDEST_DATE = "Oldest Date",
  NEWEST_DATE = "Newest Date",
}

export enum TierListTiers {
  S = "S",
  A_PLUS = "A+",
  A = "A",
  A_MINUS = "A-",
  B_PLUS = "B+",
  B = "B",
  B_MINUS = "B-",
  C_PLUS = "C+",
  C = "C",
  C_MINUS = "C-",
  D_PLUS = "D+",
  D = "D",
  D_MINUS = "D-",
  F = "F",
}

export type TierListCard = {
  malId: string;
  grade: TierListTiers;
  reviewId: string;
};
