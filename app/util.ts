import { Post, TierListTiers } from "./types";

export const getPosts = async () => {
  const res = await fetch(`http://localhost:3004/posts`);
  if (!res.ok) {
    throw new Error(`Unable to retreive posts from JSON server`);
  }

  return res.json();
};

export const getTierList = async (tier?: TierListTiers) => {
  let res;
  res = await fetch(`http://localhost:3004/tierList`);
  if (!res.ok) {
    throw new Error(`Unable to retreive tierList from JSON server`);
  }

  if (tier) {
    const json = await res.json();
    // console.log(`JSON for tier: ${tier.toLowerCase()}\n`);
    // console.log(json[tier.toLowerCase()]);
    return json[tier.toLowerCase()];
  }

  return res.json();
};

export const getAnimePosts = async () => {
  const res = await fetch(`http://localhost:3004/posts`);

  if (!res.ok) {
    throw new Error(`Unable to retreive posts from JSON server`);
  }

  return res.json().then((data) => {
    console.log("ANIME");
    return data.filter((post) => post.type.includes("anime"));
  });
};

export const getOtherPosts = async () => {
  const res = await fetch(`http://localhost:3004/posts`);

  if (!res.ok) {
    throw new Error(`Unable to retreive posts from JSON server`);
  }

  return res.json().then((data) => {
    console.log("OTHER");
    return data.filter((post) => post.type.includes("other"));
  });
};

export const redirectToMalPage = (malId) => {
  if (malId) {
    window
      .open(
        process.env.NEXT_PUBLIC_MAL_ANIME_ID_PAGE.replace(
          "<malId>",
          malId.toString()
        ),
        "_blank"
      )
      .focus();
  }
};

export const alphabeticalSort = (arrayToSort: string[]) =>
  arrayToSort.sort((a, b) => a.localeCompare(b));

export const newestPostsFirstSort = (postsToSort: Post[]) => {
  var newSortedPosts = postsToSort.sort((postA, postB) => {
    const dateA = new Date(
      Date.parse(postA.datePosted) ?? Date.parse("2019-01-01T00:00:00")
    );
    const dateB = new Date(
      Date.parse(postB.datePosted) ?? Date.parse("2019-01-01T00:00:00")
    );

    return dateA > dateB ? -1 : 1;
  });
  return newSortedPosts;
};

export const oldestPostsFirstSort = (postsToSort: Post[]) => {
  var newSortedPosts = postsToSort.sort((postA, postB) => {
    const dateA = new Date(
      Date.parse(postA.datePosted) ?? Date.parse("2019-01-01T00:00:00")
    );
    const dateB = new Date(
      Date.parse(postB.datePosted) ?? Date.parse("2019-01-01T00:00:00")
    );

    return dateA > dateB ? 1 : -1;
  });
  return newSortedPosts;
};

export const fetchData = (url, headers) => {
  const promise = fetch(url, headers)
    .then((res) => res.json())
    .then((res) => res.data);

  let status = "pending";
  let response;

  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    }
  );

  const read = () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "error":
        throw response;
      default:
        return response;
    }
  };

  return { read };
};
