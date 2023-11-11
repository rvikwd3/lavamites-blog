"use client";

import styles from "./landing.module.css";

import { useState } from "react";

import Navbar from "./(components)/Navbar/Navbar";
import CarouselIndicators from "./(components)/CarouselIndicators/CarouselIndicators";
import { fira_sans, josefin_sans } from "./font";
import SubcontentButton from "./(components)/SubcontentButton/SubcontentButton";
import NextHeroChevronSvg from "public/svg/nextHeroChevron.svg";
import LatestPosts from "./(components)/LandingLatestPosts/LatestPosts";
import SocialsBlock from "./(components)/SocialsBlock/SocialsBlock";

const heroContent = [
  {
    title: "Lavamites",
    subtitle:
      "I write blog posts about anime reviews and other miscellaneous things that interest me.",
    subcontent: <SubcontentButton target="#" buttonText="all posts →" />,
  },
  {
    title: "Ignite",
    subtitle:
      "NINTENDO LAWYERS ITS NOT POKEMON fan game built from the ground up.",
    subcontent: <SubcontentButton target="#" buttonText="updates →" />,
  },
];

const Hero = ({
  title,
  subtitle,
  subcontent,
}: {
  title: string;
  subtitle: string;
  subcontent: React.ReactNode;
}) => {
  return (
    <div className={styles.heroTextContainer}>
      <span className={`${josefin_sans.variable} ${styles.heroTitle}`}>
        {title}
      </span>
      <p className={`${fira_sans.variable} ${styles.heroSubtitle}`}>
        {subtitle}
      </p>
      {subcontent}
    </div>
  );
};

const HeroLogo = () => {
  return <div className={styles.heroLogo}></div>;
};

const NextHeroChevron = ({ nextHero }: { nextHero: () => void }) => {
  return (
    <div className={styles.nextHeroChevron} onClick={nextHero}>
      <NextHeroChevronSvg stroke="#fff" />
    </div>
  );
};

export default function Page() {
  const [currentHero, setCurrentHero] = useState<number>(0);
  return (
    <div className={styles.landingRoot}>
      <Navbar active="Home" />
      <div className={styles.heroRoot}>
        <div className={styles.heroContainer}>
          <Hero {...heroContent[currentHero]} />
          <HeroLogo />
        </div>
        <NextHeroChevron
          nextHero={() =>
            setCurrentHero((currentHero + 1) % heroContent.length)
          }
        />
        <div className={styles.indicatorContainer}>
          <CarouselIndicators
            current={currentHero}
            num={heroContent.length}
            setCurrent={setCurrentHero}
          />
        </div>
      </div>
      <LatestPosts />
      <SocialsBlock />
    </div>
  );
}
