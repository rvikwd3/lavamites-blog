import styles from "./allPostsPage.module.css";
import Navbar from "@/components/Navbar/Navbar";

import { FilterPostsWSidebar } from "../(components)/AllPosts/FilterPostsWSidebar/FilterPostsWSidebar";
import { Post } from "app/types";

async function getPosts() {
  const res = await fetch(`http://localhost:3004/posts`);
  if (!res.ok) {
    throw new Error(`Failed to fetch posts`);
  }
  return res.json();
}

type Props = {
  searchParams: Record<string, string> | null | undefined;
};

export default async function Page({ searchParams }: Props) {
  const postsData = (await getPosts()) as Post[];
  const searchFilter = searchParams?.query;

  return (
    <div className={styles.root}>
      <Navbar active="All Posts" />
      <div>
        <FilterPostsWSidebar postsData={postsData} query={searchFilter} />
      </div>
    </div>
  );
}
