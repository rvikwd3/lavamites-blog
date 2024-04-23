import TagPill from "@/components/TagPill/TagPill";
import styles from "./tagMultiSelect.module.css";
import CloseIconSvg from "@/svg/close60x.svg";
import SearchIconSvg from "@/svg/search24x.svg";
import { montserrat } from "@/font";
import { useState } from "react";
import { alphabeticalSort } from "app/util";

type Props = {
  listOfTags: string[];
  selectedTags: string[];
  tagCloseClick: (tagToRemove: string) => void;
  tagAddClick: (tagToRemove: string) => void;
};

export const TagMultiSelect = ({
  listOfTags,
  selectedTags,
  tagCloseClick,
  tagAddClick,
}: Props) => {
  const [tagSearchValue, setTagSearchValue] = useState("");
  const [availableTags, setAvailableTags] = useState<string[]>(
    listOfTags.filter((tag) => selectedTags.indexOf(tag) < 0)
  );

  const handleTagSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTagSearchValue(e.currentTarget.value);
    setAvailableTags(
      alphabeticalSort(
        listOfTags.filter(
          (tag) =>
            selectedTags.indexOf(tag) < 0 && tag.includes(e.currentTarget.value)
        )
      )
    );
  };

  const tagCloseClickHandler = (e: React.MouseEvent, tagToClose) => {
    e.preventDefault();
    e.stopPropagation();

    tagCloseClick(tagToClose);
  };

  const tagAddClickHandler = (e: React.MouseEvent, tagToAdd) => {
    e.preventDefault();
    e.stopPropagation();

    tagAddClick(tagToAdd);
  };

  const handleInputCloseIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setTagSearchValue("");
    setAvailableTags(
      alphabeticalSort(
        listOfTags.filter((tag) => selectedTags.indexOf(tag) < 0)
      )
    );
  };

  return (
    <div className={`${styles.root} ${montserrat.variable}`}>
      <div className={styles.selectedTagsContainer}>
        {selectedTags.length > 0 ? (
          selectedTags.map((tag) => (
            <TagPill
              type="hollowSmall"
              clickHandler={(e: React.MouseEvent) => {
                tagCloseClickHandler(e, tag);
                setAvailableTags(alphabeticalSort(availableTags.concat(tag)));
              }}
              key={tag}
            >
              <CloseIconSvg
                stroke="#fff"
                className={styles.selectedCloseIcon}
              />
              <span>{tag}</span>
            </TagPill>
          ))
        ) : (
          <div></div>
        )}
      </div>
      <div className={styles.inputContainer}>
        <SearchIconSvg stroke="#d9d9d9" />
        <input
          className={styles.input}
          value={tagSearchValue}
          onChange={handleTagSearchChange}
        ></input>
        {tagSearchValue.length > 0 ? (
          <CloseIconSvg
            stroke="#fff"
            className={styles.inputCloseIcon}
            onClick={handleInputCloseIconClick}
          />
        ) : (
          <></>
        )}
      </div>
      <ul className={`${styles.availableTagsContainer}`}>
        {availableTags.map((tag) => (
          <li
            key={tag}
            onClick={(e: React.MouseEvent) => {
              tagAddClickHandler(e, tag); // Add clicked tag to selected tags
              setTagSearchValue(""); // Reset tag search
              setAvailableTags(
                // Reset available tags, with the exclusion of just-clicked tag
                alphabeticalSort(
                  listOfTags
                    .filter(
                      // Remove selected tags from available tags
                      (tagFromList) => selectedTags.indexOf(tagFromList) < 0
                    )
                    .filter((tagFromList) => !tagFromList.includes(tag)) // Remove tag just selected from available tags
                )
              );
            }}
            className={styles.availableTag}
          >
            <span>{tag}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
