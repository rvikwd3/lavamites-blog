import styles from "./latestPosts.module.css";
import { montserrat } from "../../font";
import { getAnimePosts, getOtherPosts } from "../../util";
import LandingCard from "../LandingCard/LandingCard";
import ArrowRight from "../../../public/svg/arrowRight.svg";
import CustomScrollbar from "../CustomScrollbar/CustomScrollbar";

const getLandingCards = (style: "anime" | "other"): React.ReactNode => {
  switch (style) {
    case "anime":
      return getAnimePosts()
        .slice(0, 7)
        .map((post) => (
          <LandingCard
            postImg={post.postImg}
            title={post.title}
            content={post.content}
            tags={post.tags}
            style={style}
            key={post.title}
          />
        ));
    case "other":
      return getOtherPosts()
        .slice(0, 7)
        .map((post) => (
          <LandingCard
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

const PostsCategory = ({ category }: { category: "anime" | "other" }) => {
  return (
    <div className={styles.postsRoot}>
      <span className={styles.postsTitle}>{category}</span>
      <CustomScrollbar className={styles.postsContainer}>
        {getLandingCards(category)}
        <div className={`${montserrat.variable} ${styles.viewMoreButton}`}>
          <ArrowRight stroke={"#fff"} className={styles.arrowRight} />
          <span className={styles.viewMoreText}>View More</span>
        </div>
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
