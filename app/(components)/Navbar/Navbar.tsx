"use client";

import styles from "./Navbar.module.css";
import { montserrat } from "../../font";
import Link from "next/link";
import Hamburger from "public/svg/hamburger.svg";
import { useState } from "react";

type ActiveLinks =
  | "Home"
  | "All Posts"
  | "Tier List"
  | "Other Projects"
  | "About";

type Link = {
  text: string;
  target: string;
};

const leftLinks = [
  {
    text: "Home",
    target: "#",
  },
  {
    text: "All Posts",
    target: "#",
  },
  {
    text: "Tier List",
    target: "#",
  },
];
const rightLinks = [
  {
    text: "Other Projects",
    target: "#",
  },
  {
    text: "About",
    target: "#",
  },
];

const getNavlinks = (linkList: Link[], active: ActiveLinks): React.ReactNode =>
  linkList.map((link) =>
    active.includes(link.text) ? (
      <Link
        href={link.target}
        className={`${styles.navLink} ${styles.navHighlighted}`}
        key={link.text}
      >
        {link.text}
      </Link>
    ) : (
      <Link href={link.target} className={styles.navLink} key={link.text}>
        {link.text}
      </Link>
    )
  );

const HamburgerDiv = ({
  onClick,
}: {
  onClick: (e: React.MouseEvent) => void;
}) => {
  return (
    <div className={styles.hamburger} onClick={onClick}>
      <Hamburger />
    </div>
  );
};

const FullNavbar = ({
  active,
  handleHamburgerClick,
}: {
  active: ActiveLinks;
  handleHamburgerClick: (e: React.MouseEvent) => void;
}) => {
  return (
    <nav
      className={`${styles.fullNavbar} ${styles.navbar} ${montserrat.variable}`}
    >
      <div className={styles.navbarPart}>
        <HamburgerDiv onClick={handleHamburgerClick} />
        {getNavlinks(leftLinks, active)}
      </div>
      <div className={styles.navbarPart}>{getNavlinks(rightLinks, active)}</div>
    </nav>
  );
};

const CollapsedNavbar = ({
  handleHamburgerClick,
}: {
  handleHamburgerClick: (e: React.MouseEvent) => void;
}) => {
  return (
    <nav className={`${styles.collapsedNavbar} ${styles.navbar}`}>
      <div className={styles.collapsedNavbarContent}>
        <HamburgerDiv onClick={handleHamburgerClick} />
      </div>
    </nav>
  );
};

const Navbar = ({ active }: { active: ActiveLinks }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleHamburgerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsCollapsed(!isCollapsed);
  };

  return isCollapsed ? (
    <CollapsedNavbar handleHamburgerClick={handleHamburgerClick} />
  ) : (
    <FullNavbar active={active} handleHamburgerClick={handleHamburgerClick} />
  );
};

export default Navbar;
