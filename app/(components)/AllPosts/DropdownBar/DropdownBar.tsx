"use client";

import styles from "./dropdownBar.module.css";
import ChevronDownIconSvg from "@/svg/chevronDown24x.svg";
import { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

type Props = {
  barFlexElements: React.ReactNode;
  dropdownElements: React.ReactNode;
  style: React.CSSProperties;
};
export const DropdownBar = ({
  barFlexElements,
  dropdownElements,
  style,
}: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleBarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setShowDropdown(!showDropdown);
  };
  return (
    <div className={styles.root} style={style}>
      <div className={styles.bar} onClick={handleBarClick}>
        <div className={styles.barElements}>
          {barFlexElements}
          <ChevronDownIconSvg
            stroke="#d9d9d9"
            style={{ flexShrink: 0, width: 24, height: 24 }}
          />
        </div>
      </div>
      <CSSTransition
        nodeRef={dropdownRef}
        in={showDropdown}
        timeout={300}
        classNames={{
          enter: styles.dropdownEnter,
          enterActive: styles.dropdownEnterActive,
          enterDone: styles.dropdownEnterDone,
          exit: styles.dropdownExit,
          exitActive: styles.dropdownExitActive,
          exitDone: styles.dropdownExitDone,
        }}
        unmountOnExit
        mountOnEnter
      >
        <div className={styles.dropdownRoot} ref={dropdownRef}>
          {dropdownElements}
        </div>
      </CSSTransition>
    </div>
  );
};
