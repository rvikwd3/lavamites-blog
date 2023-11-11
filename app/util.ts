import posts from "../data/posts.json";

export const getAnimePosts = () => {
  return posts.filter((post) => post.type.includes("anime"));
};

export const getOtherPosts = () => {
  return posts.filter((post) => !post.type.includes("anime"));
};
