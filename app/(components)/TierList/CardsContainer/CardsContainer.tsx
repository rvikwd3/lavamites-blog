import { getTierList } from "app/util";
import React from "react";
import { Suspense } from "react";
import { TierListCard as TierListCardType, TierListTiers } from "app/types";
import styles from "../TierListSection/tierListSection.module.css";
import TierListCard from "../TierListCard/TierListCard";

type ErrorBoundaryProps = {
  fallback: React.ReactNode;
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export const CardsContainer = async ({ tier }: { tier: TierListTiers }) => {
  const tierCards = (await getTierList(tier)) as TierListCardType[];

  return (
    <div className={styles.sectionCardsContainer}>
      {tierCards.map((card) => (
        <Suspense fallback={<div>Loading {card.malId}</div>}>
          <TierListCard tierListCard={card} key={card.malId} />
        </Suspense>
      ))}
    </div>
  );
};
