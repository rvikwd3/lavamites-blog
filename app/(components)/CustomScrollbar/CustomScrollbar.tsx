"use client";

import styles from "./customScrollbar.module.css";
import { useState, useRef, useEffect, useCallback } from "react";
import ChevronLeft from "../../../public/svg/chevronLeft16x.svg";
import ChevronRight from "../../../public/svg/chevronRight16x.svg";

const CustomScrollbar = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);
  const observer = useRef<ResizeObserver | null>(null);
  const [thumbWidth, setThumbWidth] = useState(20);
  const [scrollStartPosition, setScrollStartPosition] = useState<number | null>(
    null
  );
  const [initialScrollLeft, setInitialScrollLeft] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Resize client scrollbar on DOM load
  const handleResize = (ref: HTMLDivElement, trackSize: number) => {
    const { clientWidth, scrollWidth } = ref;
    setThumbWidth(Math.max((clientWidth / scrollWidth) * trackSize, 20));
  };

  // Clicking the left/right arrows should move content by 1 card
  const handleScrollButton = (direction: "left" | "right") => {
    const scrollBy = 18 * 14; // 16rem width card + 2rem width postsContainer column gap
    const { current } = contentRef;
    if (current) {
      const scrollAmount = direction === "right" ? scrollBy : -scrollBy;

      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // move scrollbar thumb on content scroll
  const handleThumbPosition = useCallback(() => {
    if (
      !contentRef.current ||
      !scrollTrackRef.current ||
      !scrollThumbRef.current
    ) {
      return;
    }

    const { scrollLeft: contentLeft, scrollWidth: contentWidth } =
      contentRef.current;
    const { clientWidth: trackWidth } = scrollTrackRef.current;

    // on scroll, move thumb to new proportional position
    let newLeft = (+contentLeft / +contentWidth) * trackWidth;
    newLeft = Math.min(newLeft, trackWidth - thumbWidth); // dont let thumb move off of track to the right

    const thumb = scrollThumbRef.current;
    thumb.style.left = `${newLeft}px`;
  }, []);

  /*
   * Clicking on track should scroll content to position
   */
  const handleTrackClick = useCallback(
    (e: React.MouseEvent) => {
      // stop mouse click from affecting other elements
      e.preventDefault();
      e.stopPropagation();

      const { current: trackCurrent } = scrollTrackRef;
      const { current: contentCurrent } = contentRef;

      if (trackCurrent && contentCurrent) {
        // Where did we click
        const { clientX } = e;

        // Distance b/w left of track and click
        const target = e.target as HTMLDivElement;
        const rect = target.getBoundingClientRect();
        const trackLeft = rect.left;

        // middle of thumb goes in new position, not beginning
        // => need thumbOffset to move middle of thumb to new position
        const thumbOffset = -(thumbWidth / 2);

        // Ratio of new position to total content length
        const clickRatio =
          (clientX - trackLeft + thumbOffset) / trackCurrent.clientWidth;

        // Amount content should scroll by
        const scrollAmount = Math.floor(
          clickRatio * contentCurrent.scrollWidth
        );

        // Scroll content by scrollamount
        contentCurrent.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    },
    [thumbWidth]
  );

  // When mouse clicks on thumb set initial thumb position to check how much it moves
  const handleThumbMouseDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    // check if click is within scroll thumb div bounds
    const elementBounds = scrollThumbRef.current.getBoundingClientRect();
    if (
      e.clientX >= elementBounds.left &&
      e.clientX <= elementBounds.right &&
      e.clientY >= elementBounds.top &&
      e.clientY <= elementBounds.bottom
    ) {
      setScrollStartPosition(e.clientX);

      if (contentRef.current)
        setInitialScrollLeft(contentRef.current.scrollLeft);
      setIsDragging(true);
    }
  }, []);

  // When mouse lifts from thumb reset isDragging
  const handleThumbMouseUp = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (isDragging) {
        setIsDragging(false);
      }
    },
    [isDragging]
  );

  const handleThumbMouseMove = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (isDragging) {
        const {
          scrollWidth: contentScrollWidth,
          offsetWidth: contentOffsetWidth,
        } = contentRef.current;

        // Get distance between initial position and current mouse drag position
        // Multiply distance with ratio of content width to thumb width
        const deltaX =
          (e.clientX - scrollStartPosition) * (contentOffsetWidth / thumbWidth);

        // Calculate new content scroll position
        // Min of actual scroll vs top-most possible scroll
        const newScrollLeft = Math.min(
          initialScrollLeft + deltaX,
          contentScrollWidth - contentOffsetWidth
        );

        contentRef.current.scrollLeft = newScrollLeft;
      }
    },
    [isDragging, scrollStartPosition, thumbWidth]
  );

  // If the content and the scrollbar track exist, use a ResizeObserver to adjust height of thumb and listen for scroll event to move the thumb
  useEffect(() => {
    if (contentRef.current && scrollTrackRef.current) {
      const ref = contentRef.current;
      const { clientWidth: trackSize } = scrollTrackRef.current;

      // Resize track to container width
      observer.current = new ResizeObserver(() => {
        handleResize(ref, trackSize);
      });
      observer.current.observe(ref);

      // Move thumb automatically when content is scrolled
      ref.addEventListener("scroll", handleThumbPosition);

      /* Cleanup */
      return () => {
        observer.current?.unobserve(ref);
        ref.removeEventListener("scroll", handleThumbPosition);
      };
    }
  }, []);

  // Listen to scrollbar mouse events
  useEffect(() => {
    document.addEventListener("mousemove", handleThumbMouseMove);
    document.addEventListener("mouseup", handleThumbMouseUp);
    document.addEventListener("mousedown", handleThumbMouseDown);
    return () => {
      document.removeEventListener("mousemove", handleThumbMouseMove);
      document.removeEventListener("mouseup", handleThumbMouseUp);
      document.removeEventListener("mousedown", handleThumbMouseDown);
    };
  }, [handleThumbMouseMove, handleThumbMouseUp]);

  return (
    <div className={`${styles.root}`}>
      <div
        className={`${styles.contentContainer} ${className}`}
        ref={contentRef}
        {...props}
      >
        {children}
      </div>

      <div className={styles.scrollbarRoot}>
        <button
          className={styles.scrollbarButton}
          onClick={() => handleScrollButton("left")}
        >
          <ChevronLeft className={styles.scrollButtonSvg} />
        </button>
        <div className={styles.scrollbarCommon}>
          <div
            className={styles.track}
            ref={scrollTrackRef}
            onClick={handleTrackClick}
            style={{ cursor: isDragging ? "grabbing" : "pointer" }}
          ></div>
          <div
            className={styles.thumb}
            ref={scrollThumbRef}
            style={{
              width: `${thumbWidth}px`,
              cursor: isDragging ? "grabbing" : "grab",
            }}
            onMouseDown={handleThumbMouseDown}
          ></div>
        </div>
        <button
          className={styles.scrollbarButton}
          onClick={() => handleScrollButton("right")}
        >
          <ChevronRight className={styles.scrollButtonSvg} />
        </button>
      </div>
    </div>
  );
};

export default CustomScrollbar;
