import Link from "next/link";
import { fira_sans } from "../../font";
import styles from "./footer.module.css";
import constants from "../../../data/constants.json";

const Footer = () => {
  return (
    <div className={`${styles.footerRoot} ${fira_sans.variable}`}>
      <span className={styles.devVanityText}>
        Designed & Developed by{" "}
        <Link href={constants.devVanityLink} className={styles.devVanityLink}>
          Ravikiran Kawade
        </Link>
      </span>
    </div>
  );
};

export default Footer;
