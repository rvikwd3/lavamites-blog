import Navbar from "@/components/Navbar/Navbar";
import styles from "./tierListPage.module.css";
import { TierListTiers } from "app/types";
import TierListSection from "@/components/TierList/TierListSection/TierListSection";

type Props = {};

export default function Page({}: Props) {
  const tiers: TierListTiers[] = [
    TierListTiers.S,
    // TierListTiers.A,
    // TierListTiers.B,
    // TierListTiers.C,
    // TierListTiers.D,
    // TierListTiers.F,
  ];
  return (
    <div className={styles.root}>
      <Navbar active="Tier List" />
      {tiers.map((tier) => (
        <TierListSection tier={tier} />
      ))}
    </div>
  );
}
