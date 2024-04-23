import { TierListTiers } from "app/types";
import styles from "./tierListSection.module.css";
import { montserrat } from "@/font";
import ChevronDownSvg from "@/svg/chevronDown24x.svg";
import { CardsContainer } from "../CardsContainer/CardsContainer";
import React from "react";

type Props = {
  tier: TierListTiers;
};

const TierListSection = ({ tier }: Props) => {
  return (
    <div className={styles.sectionRoot}>
      <div className={styles.sectionHeader}>
        <div className={`${styles.sectionTitle} ${montserrat.variable}`}>
          {tier}
        </div>
        <div className={styles.dropdownButton}>
          <ChevronDownSvg
            className={styles.chevronDownIcon}
            stroke="white"
            viewBox="0 0 24 24"
          />
        </div>
      </div>
      <CardsContainer tier={tier} />
    </div>
  );
};

export default TierListSection;
