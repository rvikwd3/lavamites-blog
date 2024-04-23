import { PostSortTypes } from "app/types";
import styles from "./sortMultiSelect.module.css";
import { montserrat } from "@/font";

type Props = {
  listOfSorts: PostSortTypes[];
  selectedSort: PostSortTypes;
  sortClick: (sortMethod: PostSortTypes) => void;
};

export const SortMultiSelect = ({
  listOfSorts,
  selectedSort,
  sortClick,
}: Props) => {
  const handleSortTypeClick = (
    e: React.MouseEvent,
    sortType: PostSortTypes
  ) => {
    e.preventDefault();
    e.stopPropagation();

    sortClick(sortType);
  };
  return (
    <div className={`${styles.root} ${montserrat.variable}`}>
      {listOfSorts.map((sortType) => {
        return (
          <div
            className={`${styles.sortType} ${
              selectedSort.includes(sortType) ? styles.selectedSortType : ""
            }`}
            onClick={(e: React.MouseEvent) => handleSortTypeClick(e, sortType)}
            key={sortType}
          >
            <span>{sortType}</span>
          </div>
        );
      })}
    </div>
  );
};
