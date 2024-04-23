import styles from "./post.module.css";
import Image from "next/image";
import CalendarIconSvg from "../../../../public/svg/calendar24x.svg";
import { fira_sans, varela } from "../../../font";

type Props = {
  imgSrc: string;
  title: string;
  datePosted: string;
  content: string;
};

export const Post = ({ imgSrc, title, datePosted, content }: Props) => {
  return (
    <div className={styles.post}>
      <div className={styles.postImage}>
        <Image src={imgSrc} fill={true} sizes="10vw" alt="Post Image" />
      </div>
      <div className={styles.postContent}>
        <div className={`${styles.postTitle} ${fira_sans.variable}`}>
          {title}
        </div>
        <div className={`${styles.postDetails} ${fira_sans.variable}`}>
          <CalendarIconSvg fill="#d9d9d9" />
          <span>{datePosted}</span>
        </div>
        <div className={`${styles.postContentText} ${varela.variable}`}>
          <span>{content}</span>
        </div>
      </div>
    </div>
  );
};
