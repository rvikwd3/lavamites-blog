import { TierListCard } from "app/types";
import styles from "./tierListCard.module.css";
import Image from "next/image";

const getMalData = async (malId) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_MAL_ANIME_CARD_ID_REQUEST.replace("<malId>", malId),
    { headers: { "X-MAL-CLIENT-ID": process.env.MAL_CLIENT_ID } }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch MAL ID: ${malId}`);
  }

  return res.json();
};

const TierListCard = async ({
  tierListCard,
}: {
  tierListCard: TierListCard;
}) => {
  const malData = await getMalData(tierListCard.malId);
  const cardImageUrl = malData.main_picture.large ?? "about:blank";
  const cardTitle = malData.title;

  return (
    <div className={styles.cardRoot}>
      <Image src={cardImageUrl} alt={cardTitle} width={225} height={318} />
    </div>
  );
};

export default TierListCard;
