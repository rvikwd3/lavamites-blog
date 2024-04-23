"use client";

import styles from "./postImageModal.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import CloseIconSvg from "../../../../public/svg/close60x.svg";

type Props = {
  imgSrc: string;
};

export const PostImageModal = ({ imgSrc }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const uriWithoutParam = pathname.replace(`/.*$`, "");
  return (
    <div
      className={styles.root}
      onClick={() => router.replace(uriWithoutParam)}
    >
      <div className={styles.content}>
        <div>
          <img src={imgSrc} />
          <CloseIconSvg
            stroke="#fff"
            onClick={() => router.replace(uriWithoutParam)}
          />
        </div>
      </div>
    </div>
  );
};
