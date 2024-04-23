import Image from "next/image";
import Navbar from "../../(components)/Navbar/Navbar";
import styles from "./postPage.module.css";
import { fira_sans, josefin_sans, noto_serif } from "../../font";
import { MalRatingDetails, Post } from "app/types";

/* Icons */
import CalendarIconSvg from "../../../public/svg/calendar24x.svg";
import PencilIconSvg from "../../../public/svg/pencil24x.svg";
import CommentIconSvg from "../../../public/svg/comment24x.svg";

/* Components */
import TagPill from "../../(components)/TagPill/TagPill";
import PostCardImage from "../../(components)/Post/PostCardImage/PostCardImage";
import PostMalRating from "../../(components)/Post/PostMalRating/PostMalRating";
import { PostAnimeHeroImage } from "../../(components)/Post/PostAnimeHeroImage/PostAnimeHeroImage";
import { PostImageModal } from "../../(components)/Post/PostImageModal/PostImageModal";

async function getData(postId) {
  const res = await fetch(`http://localhost:3004/posts/${postId}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch ${postId}`);
  }

  return res.json();
}

async function getMalRating(malId: number) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_MAL_ANIME_ID_REQUEST.replace(
      "<malId>",
      malId.toString()
    ),
    { headers: { "X-MAL-CLIENT-ID": process.env.MAL_CLIENT_ID } }
  );
  return res.ok ? res.json() : undefined;
}

export default async function Page({
  params,
}: {
  params: {
    postId: string;
    uriParams: Record<string, string> | null | undefined;
  };
}) {
  const postData = (await getData(params.postId)) as Post;

  // Don't get MAL rating if post doesn't have a MAL ID
  let malRatingDetails: MalRatingDetails | undefined;
  if (postData.malId) {
    malRatingDetails = (await getMalRating(postData.malId)) as
      | MalRatingDetails
      | undefined;
  }

  const isMultiPostType = postData.type.includes("animeMulti");
  const showModal = params.uriParams?.modal;

  return (
    <>
      {showModal && <PostImageModal imgSrc={postData.postImg} />}
      <div className={styles.pageRoot}>
        <Navbar active="All Posts" />
        <div className={styles.headerBanner}>
          <Image src={postData.bannerImg} fill={true} alt="Post Banner Image" />
        </div>
        <div className={styles.postRoot}>
          {isMultiPostType && (
            <PostAnimeHeroImage
              className={styles.animeMultiImage}
              imgSrc={postData.postImg}
            />
          )}

          <div className={`${styles.postHeader}`}>
            <div>
              {!isMultiPostType && (
                <>
                  <PostCardImage
                    postImgSrc={postData.postImg}
                    malId={postData.malId}
                  />
                  <PostMalRating
                    malRatingMean={malRatingDetails?.mean}
                    malId={postData.malId}
                  />
                </>
              )}
            </div>
            <div>
              <div
                className={`${styles.headerTitle} ${josefin_sans.variable} ${noto_serif.variable}`}
              >
                <span>{postData.title}</span>
                <span>{postData.subtitle}</span>
              </div>
              <div
                className={`${styles.headerPostDetails} ${fira_sans.variable}`}
              >
                <div>
                  <CalendarIconSvg />
                  <span>{postData.datePosted}</span>
                </div>
                <div className={styles.detailsSeparator}></div>
                <div>
                  <PencilIconSvg stroke="#d9d9d9" />
                  <span>{postData.author}</span>
                </div>
              </div>
              <div className={`${styles.headerTagList}`}>
                {postData.tags.map((tag) => (
                  <TagPill type="hollow">{tag}</TagPill>
                ))}
              </div>
            </div>
          </div>
          <div className={`${styles.postContent} ${noto_serif.variable}`}>
            {postData.content}
          </div>
          <div className={`${styles.postFooter} ${fira_sans.variable}`}>
            <div>
              <PencilIconSvg stroke="#d9d9d9" />
              <span>{postData.author}</span>
            </div>
            <div>
              <CommentIconSvg stroke="#d9d9d9" />
              <span>Leave a comment</span>
            </div>
            <div>
              <CalendarIconSvg fill="#d9d9d9" />
              <span>{postData.datePosted}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
