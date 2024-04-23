"use client";

import { redirectToMalPage } from "../../../util";
import styles from "./postCardImage.module.css";

import Image from "next/image";

type Props = {
  postImgSrc: string;
  malId: number | undefined;
};

const PostCardImage = ({ postImgSrc, malId }: Props) => {
  const handleRedirectToMalId = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    redirectToMalPage(malId);
  };
  return (
    <div
      className={`${styles.cardImage} ${malId && styles.clickable}`}
      onClick={handleRedirectToMalId}
    >
      <Image src={postImgSrc} alt="Post Image" fill={true} />
    </div>
  );
};

export default PostCardImage;
