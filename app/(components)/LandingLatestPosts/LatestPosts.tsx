"use client";

import styles from "./latestPosts.module.css";
import { montserrat } from "../../font";
import { getPosts } from "../../util";
import LandingCard from "../LandingCard/LandingCard";
import ArrowRight from "../../../public/svg/arrowRight.svg";
import CustomScrollbar from "../CustomScrollbar/CustomScrollbar";
import Link from "next/link";
import { Post } from "app/types";

const getLandingCards = (
  style: "anime" | "other",
  posts: Post[]
): React.ReactNode => {
  switch (style) {
    case "anime":
      return posts
        .filter((post) => post.type.includes("anime"))
        .slice(0, 7)
        .map((post) => (
          <LandingCard
            postId={post.id}
            postImg={post.postImg}
            title={post.title}
            content={post.content}
            tags={post.tags}
            style={style}
            key={post.title}
          />
        ));
    case "other":
      return posts
        .filter((post) => !post.type.includes("anime"))
        .slice(0, 7)
        .map((post) => (
          <LandingCard
            postId={post.id}
            postImg={post.postImg}
            title={post.title}
            content={post.content}
            tags={post.tags}
            style={style}
            key={post.title}
          />
        ));
    default:
      return <div>Unexpected Post Type requested</div>;
  }
};

const PostsCategory = async ({ category }: { category: "anime" | "other" }) => {
  const posts = await getPosts();
  return (
    <div className={styles.postsRoot}>
      <span className={styles.postsTitle}>{category}</span>
      <CustomScrollbar className={styles.postsContainer}>
        {getLandingCards(category, posts)}
        <Link
          className={`${montserrat.variable} ${styles.viewMoreButton}`}
          href="#"
        >
          <ArrowRight stroke={"#fff"} className={styles.arrowRight} />
          <span className={styles.viewMoreText}>View More</span>
        </Link>
      </CustomScrollbar>
    </div>
  );
};

const LatestPosts = () => {
  return (
    <div className={`${montserrat.variable} ${styles.latestPostsRoot}`}>
      <span className={styles.latestPostsTitle}>latest posts</span>
      <PostsCategory category="anime" key="anime" />
      <PostsCategory category="other" key="other" />
    </div>
  );
};

export default LatestPosts;
