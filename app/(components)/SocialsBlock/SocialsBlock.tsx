import { montserrat, varela } from "../../font";
import Link from "next/link";
import styles from "./socialsBlock.module.css";
import TwitterBrand from "../../../public/svg/twitter_brand.svg";
import InstagramBrand from "../../../public/svg/instagram.svg";
import MediumBrand from "../../../public/svg/medium_brand.svg";

const FramedIcon = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <Link className={styles.iconContainer} href={href}>
      {children}
    </Link>
  );
};

const SocialsBlock = () => {
  return (
    <div className={styles.socialsRoot}>
      <span className={`${styles.socialsTitle} ${montserrat.variable}`}>
        Stay Updated
      </span>
      <p className={`${styles.socialsSubtitle} ${varela.variable}`}>
        {`Stay up to date with the latest posts.  
        Follow the blog on these socials`}
      </p>
      <div className={styles.socialButtonsContainer}>
        <FramedIcon href="#">
          <TwitterBrand
            stroke="#fff"
            className={`${styles.twitterIcon} ${styles.icon}`}
          />
        </FramedIcon>
        <FramedIcon href="#">
          <InstagramBrand className={styles.icon} />
        </FramedIcon>
        <FramedIcon href="#">
          <MediumBrand className={styles.icon} />
        </FramedIcon>
      </div>
    </div>
  );
};

export default SocialsBlock;
