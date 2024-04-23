"use client";

import { montserrat } from "@/font";
import SearchIconSvg from "@/svg/search24x.svg";
import DescendingSortIconSvg from "@/svg/sortDescending24x.svg";
import TagIconSvg from "@/svg/tag24x.svg";
import { PostSortTypes, Post as PostType } from "app/types";
import {
  alphabeticalSort,
  newestPostsFirstSort,
  oldestPostsFirstSort,
} from "app/util";
import { useEffect, useState } from "react";
import { DropdownBar } from "../DropdownBar/DropdownBar";
import { Post } from "../Post/Post";
import { TagMultiSelect } from "../TagMultiSelect/TagMultiSelect";
import styles from "./filterPostsWSidebar.module.css";
import { SortMultiSelect } from "../SortMultiSelect/SortMultiSelect";

type Props = {
  postsData: PostType[];
  query: string;
};

export const FilterPostsWSidebar = ({ postsData, query }: Props) => {
  const [searchbarQuery, setSearchbarQuery] = useState<string>(query ?? "");
  const [tagsSelected, setTagsSelected] = useState<string[]>([]);
  const [sortSelected, setSortSelected] = useState<PostSortTypes>(
    PostSortTypes.NEWEST_DATE
  );

  const sortPosts = (postsArray: PostType[]) => {
    console.log(`Sorting with sortType: ${sortSelected}`);
    var newSortedPosts = postsArray;
    switch (sortSelected) {
      case PostSortTypes.NEWEST_DATE:
        newSortedPosts = newestPostsFirstSort(postsArray);
        break;
      case PostSortTypes.OLDEST_DATE:
        newSortedPosts = oldestPostsFirstSort(postsArray);
        break;
      default:
        console.error(
          `Post sort type ${sortSelected} not found. Did you mean PostSortTypes.NEWEST_DATE?`
        );
    }

    return newSortedPosts;
  };

  const [postsToFilter, setPostsToFilter] = useState<PostType[]>(
    query
      ? sortPosts(
          postsData.filter(
            (post) => post.title.search(new RegExp(query, "i")) != -1
          )
        )
      : sortPosts(postsData)
  );

  // Filter posts based on tags and search input
  useEffect(() => {
    console.log("FilterPostsWSidebar UseEffect triggered");
    var newPostsToFilter = postsToFilter;

    // Filter posts based on search input
    if (searchbarQuery !== "") {
      newPostsToFilter = newPostsToFilter.filter(
        (post) => post.title.search(new RegExp(searchbarQuery, "i")) != -1
      );
    } else if (searchbarQuery == "") {
      newPostsToFilter = postsData;
    }

    // Filter posts based on selected tags (all tags selected should be in post)
    if (tagsSelected.length > 0) {
      newPostsToFilter = newPostsToFilter.filter((post) =>
        tagsSelected.every((tag) => post.tags.includes(tag))
      );
    }

    setPostsToFilter(sortPosts(newPostsToFilter));
  }, [searchbarQuery, JSON.stringify(tagsSelected)]); // JSON.stringify is slow for larger arrays, be careful

  useEffect(() => {
    console.log("SortPosts useEffect triggered");
    var newSortedPosts = structuredClone(sortPosts(postsToFilter));

    setPostsToFilter(newSortedPosts);
  }, [sortSelected]);

  const handleSearchbarChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchbarQuery(e.currentTarget.value);
  };

  const tagCloseClickHandler = (tagToRemove: string) => {
    setTagsSelected(
      alphabeticalSort(
        tagsSelected.filter((tag) => !tag.match(new RegExp(tagToRemove)))
      )
    );
  };

  const tagAddClickHandler = (tagToAdd: string) => {
    let newTagsSelected = tagsSelected;
    if (!tagsSelected.includes(tagToAdd)) {
      newTagsSelected = tagsSelected.concat(new Array(tagToAdd));
    }

    setTagsSelected(alphabeticalSort(newTagsSelected));
  };

  const handleSortTypeClick = (sortToSelect: PostSortTypes) => {
    setSortSelected(sortToSelect);
  };

  return (
    <>
      <div className={styles.postsContainer}>
        {postsToFilter.map((post) => (
          <Post
            imgSrc={post.postImg}
            title={post.title}
            datePosted={post.datePosted}
            content={post.content}
            key={post.id}
          />
        ))}
      </div>
      <div className={`${styles.sidebarRoot} ${montserrat.variable}`}>
        <div className={styles.sidebarSearch}>
          <SearchIconSvg stroke="#d9d9d9" />
          <input
            className={styles.sidebarSearchInput}
            onChange={handleSearchbarChange}
            value={searchbarQuery}
          ></input>
          <div className={styles.sidebarSearchBackground}></div>
        </div>
        <DropdownBar
          barFlexElements={
            <div className={styles.dropdownBarElements}>
              <DescendingSortIconSvg stroke="#d9d9d9" />
              <span>{sortSelected}</span>
            </div>
          }
          dropdownElements={
            <SortMultiSelect
              listOfSorts={[
                PostSortTypes.NEWEST_DATE,
                PostSortTypes.OLDEST_DATE,
              ]}
              selectedSort={sortSelected}
              sortClick={handleSortTypeClick}
            />
          }
          style={{ zIndex: 20 }}
        />
        <DropdownBar
          barFlexElements={
            tagsSelected.length > 0 ? (
              <div className={styles.dropdownBarElements}>
                <TagIconSvg stroke="#d9d9d9" style={{ flexShrink: 0 }} />
                <div style={{ display: "block" }}>
                  <span>{tagsSelected.join(", ")}</span>
                </div>
              </div>
            ) : (
              <div className={styles.dropdownBarElements}>
                <TagIconSvg stroke="#d9d9d9" />
                <span>Tags</span>
              </div>
            )
          }
          dropdownElements={
            <TagMultiSelect
              // Get all tags from all posts
              listOfTags={alphabeticalSort(
                postsData.reduce(
                  (acc, curr) =>
                    acc.concat(curr.tags.filter((tag) => acc.indexOf(tag) < 0)), // Duplicate tag is filtered out
                  []
                )
              )}
              selectedTags={tagsSelected}
              tagCloseClick={tagCloseClickHandler}
              tagAddClick={tagAddClickHandler}
            />
          }
          style={{ zIndex: 10 }}
        />
      </div>
    </>
  );
};
