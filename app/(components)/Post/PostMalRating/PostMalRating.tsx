"use client";

import { montserrat } from "../../../font";
import { redirectToMalPage } from "../../../util";
import styles from "./postMalRating.module.css";

type Props = {
  malRatingMean: number;
  malId: number;
};

const PostMalRating = ({ malRatingMean, malId }: Props) => {
  const handleRedirectToMalId = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    redirectToMalPage(malId);
  };
  return (
    <>
      {malRatingMean && (
        <div
          className={`${styles.cardMal} ${montserrat.variable}`}
          onClick={handleRedirectToMalId}
        >
          <span>MAL</span>
          <div>
            <span>{malRatingMean}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default PostMalRating;
