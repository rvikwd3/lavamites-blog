"use client";

import styles from "./indicators.module.css";
import Indicator from "public/svg/indicator.svg";

const CarouselIndicators = ({
  num,
  current,
  setCurrent,
}: {
  num: number;
  current: number;
  setCurrent: (number) => void;
}) => {
  return Array.from(Array(num).keys()).map((i) =>
    i === current ? (
      <Indicator className={styles.highlighted} key={i} />
    ) : (
      <Indicator
        className={styles.indicator}
        key={i}
        onClick={() => setCurrent(i)}
      />
    )
  );
};

export default CarouselIndicators;
