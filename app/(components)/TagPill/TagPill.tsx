"use client";

import { useEffect, useState } from "react";
import { montserrat } from "../../font";
import styles from "./tagPill.module.css";

type Props = {
  type: "hollow" | "hollowSmall" | undefined;
  clickHandler?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
};

const TagPill = ({ type, clickHandler, children }: Props) => {
  const [typeStyle, setTypeStyle] = useState<string>("");

  useEffect(() => {
    // Dynamically select a pill style
    switch (type) {
      case "hollowSmall":
        setTypeStyle(
          `${styles.hollowPillType} ${styles.smallSizeContent} ${montserrat.variable} `
        );
        return;
      case "hollow":
        setTypeStyle(
          `${styles.hollowPillType} ${styles.normalSizeContent} ${montserrat.variable}`
        );
        return;
      default:
    }
  }, [typeStyle]);

  return (
    <div
      onClick={clickHandler}
      className={`${styles.root} ${styles.pillContent} ${typeStyle}`}
    >
      {children}
    </div>
  );
};

export default TagPill;
