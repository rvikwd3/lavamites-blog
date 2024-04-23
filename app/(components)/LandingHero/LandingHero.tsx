"use client";

import styles from "./landingHero.module.css";
import Image from "next/image";
import { josefin_sans, fira_sans } from "../../font";
import CarouselIndicators from "../CarouselIndicators/CarouselIndicators";
import SubcontentButton from "../SubcontentButton/SubcontentButton";
import NextHeroChevronSvg from "public/svg/nextHeroChevron.svg";

import { useState } from "react";

const heroContent = [
  {
    title: "Lavamites",
    subtitle:
      "I write blog posts about anime reviews and other miscellaneous things that interest me.",
    subcontent: (
      <SubcontentButton target="/allPosts" buttonText="all posts →" />
    ),
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

const LandingHero = () => {
  const [currentHero, setCurrentHero] = useState<number>(0);
  return (
    <div className={styles.heroRoot}>
      <div className={styles.heroSplashContainer}>
        <Image
          fill={true}
          src={"/splash/unsplash-anime.jpg"}
          alt="Hero Background"
          className={styles.heroImage}
        />
      </div>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
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
    </div>
  );
};

export default LandingHero;
