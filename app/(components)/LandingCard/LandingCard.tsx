"use client";

import Image from "next/image";
import styles from "./landingCard.module.css";
import { fira_sans, montserrat, varela } from "../../font";
import { useRouter } from "next/navigation";

const Pill = ({ text, style }: { text: string; style: "anime" | "other" }) => {
  return (
    <div className={`${styles.cardPill} ${styles[style]}`}>
      <span className={`${styles.cardPillText} ${montserrat.variable}`}>
        {text}
      </span>
    </div>
  );
};

const LandingCard = ({
  postId,
  postImg,
  title,
  tags,
  content,
  style,
}: {
  postId: string;
  postImg: string;
  title: string;
  tags: string[];
  content: string;
  style: "anime" | "other";
}) => {
  const router = useRouter();
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    router.push(`/blog/${encodeURIComponent(postId)}`);
  };
  return (
    <div className={styles.cardRoot} onClick={handleCardClick}>
      <div className={styles.cardTop}>
        <div className={styles.headerImage}>
          <Image
            src={postImg}
            alt="Post image"
            fill={true}
            sizes="14rem"
            className={styles.cardImage}
          />
          <div className={styles.headerGradient}></div>
        </div>
        <span className={`${styles.cardTitle} ${fira_sans.variable}`}>
          {title}
        </span>
      </div>
      <div className={`${styles.cardBottom} ${styles[style]}`}>
        <div className={styles.tagContainer}>
          {tags.slice(0, 2).map((tag) => (
            <Pill text={tag} style={style} key={tag} />
          ))}
        </div>
        <div className={styles.cardContentContainer}>
          <span className={`${styles.cardContent} ${varela.variable}`}>
            {content}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LandingCard;
