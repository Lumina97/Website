import { TImageItem, TRedditPost } from "@/types";
const isLinkImage = (link: string) => {
  return (
    link.includes(".jpg") || link.includes(".png") || link.includes(".jpeg")
  );
};

const createImageItem = (post: TRedditPost) => {
  let thumbnail = "";
  if (post.data.preview) {
    const resolutions = post.data.preview.images[0].resolutions;
    if (resolutions.length > 0) {
      thumbnail = resolutions[2].url.replace(/&amp;/g, "&");
    }
  }
  return {
    url: { preview: thumbnail, main: post.data.url },
    size: {
      width: post.data.preview.images[0].source.width,
      height: post.data.preview.images[0].source.height,
    },
    isSelected: false,
    isFavorite: false,
  };
};

export const fetchImages = async (subreddit: string) => {
  if (subreddit.length === 0) {
    return [];
  }

  try {
    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}/new/.json`
    );
    const { data } = await response.json();
    const posts = data.children as TRedditPost[];
    const image_links: TImageItem[] = [];

    for (const post of posts) {
      if (post.kind === "t3" && isLinkImage(post.data.url)) {
        image_links.push(createImageItem(post));
      }
    }
    return image_links;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};
