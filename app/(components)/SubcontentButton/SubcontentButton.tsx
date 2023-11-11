import Link from "next/link";

import styles from "./subcontentButton.module.css";
import { fira_sans } from "../../font";

const SubcontentButton = ({
  target,
  buttonText,
}: {
  target: string;
  buttonText: string;
}) => {
  return (
    <Link
      className={`${styles.buttonRoot} ${fira_sans.variable}`}
      href={target}
    >
      {buttonText}
    </Link>
  );
};

export default SubcontentButton;
