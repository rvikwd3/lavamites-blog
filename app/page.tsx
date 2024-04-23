import styles from "./landing.module.css";

import Navbar from "./(components)/Navbar/Navbar";
import LatestPosts from "./(components)/LandingLatestPosts/LatestPosts";
import SocialsBlock from "./(components)/SocialsBlock/SocialsBlock";
import LandingHero from "./(components)/LandingHero/LandingHero";

export default function Page() {
  debugger;
  return (
    <div className={styles.landingRoot}>
      <Navbar active="Home" />
      <LandingHero />
      <LatestPosts />
      <SocialsBlock />
    </div>
  );
}
