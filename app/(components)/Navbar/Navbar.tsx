"use client";

import styles from "./Navbar.module.css";
import { montserrat } from "../../font";
import Link from "next/link";
import Hamburger from "public/svg/hamburger.svg";
import { forwardRef, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

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
    target: "/",
  },
  {
    text: "All Posts",
    target: "/allPosts",
  },
  {
    text: "Tier List",
    target: "/tierList",
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

type FullNavbarProps = {
  handleHamburgerClick: (e: React.MouseEvent) => void;
  active: ActiveLinks;
};
type FullNavbarRef = HTMLDivElement;
const FullNavbar = forwardRef<FullNavbarRef, FullNavbarProps>((props, ref) => {
  return (
    <nav
      className={`${styles.fullNavbar} ${styles.navbar} ${montserrat.variable}`}
    >
      <div className={styles.fullNavbarContent} ref={ref}>
        <div className={styles.navbarPart}>
          <HamburgerDiv onClick={props.handleHamburgerClick} />
          {getNavlinks(leftLinks, props.active)}
        </div>
        <div className={styles.navbarPart}>
          {getNavlinks(rightLinks, props.active)}
        </div>
      </div>
    </nav>
  );
});

type CollapsedNavbarProps = {
  handleHamburgerClick: (e: React.MouseEvent) => void;
};
type CollapsedNavbarRef = HTMLDivElement;

const CollapsedNavbar = forwardRef<CollapsedNavbarRef, CollapsedNavbarProps>(
  (props, ref) => {
    return (
      <nav className={`${styles.collapsedNavbar} ${styles.navbar}`}>
        <div className={styles.collapsedNavbarContent} ref={ref}>
          <HamburgerDiv onClick={props.handleHamburgerClick} />
        </div>
      </nav>
    );
  }
);

const Navbar = ({ active }: { active: ActiveLinks }) => {
  const [isCollapsedNavbarVisible, setIsCollapsedNavbarVisible] =
    useState(false);
  const [isFullNavbarVisible, setIsFullNavbarVisible] = useState(true);
  const collapsedNavbarRef = useRef<HTMLDivElement>(null);
  const fullNavbarRef = useRef<HTMLDivElement>(null);

  const handleCollapsedHamburgerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsCollapsedNavbarVisible(false);
  };

  const handleFullHamburgerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsFullNavbarVisible(false);
  };

  return (
    <>
      <CSSTransition
        nodeRef={collapsedNavbarRef}
        in={isCollapsedNavbarVisible}
        timeout={200}
        onExited={() => setIsFullNavbarVisible(true)}
        classNames={{
          enter: styles.collapsedEnter,
          enterActive: styles.collapsedEnterActive,
          enterDone: styles.collapsedEnterDone,
          exit: styles.collapsedExit,
          exitActive: styles.collapsedExitActive,
          exitDone: styles.collapsedExitDone,
        }}
        unmountOnExit={true}
      >
        <CollapsedNavbar
          handleHamburgerClick={handleCollapsedHamburgerClick}
          ref={collapsedNavbarRef}
        />
      </CSSTransition>
      <CSSTransition
        nodeRef={fullNavbarRef}
        in={isFullNavbarVisible}
        timeout={400}
        onExited={() => setIsCollapsedNavbarVisible(true)}
        classNames={{
          enter: styles.fullEnter,
          enterActive: styles.fullEnterActive,
          enterDone: styles.fullEnterDone,
          exit: styles.fullExit,
          exitActive: styles.fullExitActive,
          exitDone: styles.fullExitDone,
        }}
        unmountOnExit={true}
      >
        <FullNavbar
          active={active}
          handleHamburgerClick={handleFullHamburgerClick}
          ref={fullNavbarRef}
        />
      </CSSTransition>
    </>
  );
};

export default Navbar;
