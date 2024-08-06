export interface IImage {
  url: string;
  publicId: string;
}
export type User = {
  createdAt: string;
  email: string;
  updatedAt: string;
  username: string;
  verified: boolean;
  bio: string;
  profile: IImage;
  __v: number;
  _id: string;
  totalReactions: number;
  totalVisits: number;
  blogPublished: number;
  likedBlogs: string[];
  bookmarkedBlogs: string[];
};
export interface Blog {
  _id: string;
  banner: {
    url: string;
    publicId: string;
  };
  title: string;
  author: Pick<User, "profile" | "username" | "_id">;
  content: string;
  totalReaction: number;
  totalBookmark: number;
  readingTime: number;
  createdAt: string;
  updatedAt: string;
  likes: Pick<User, "profile" | "username" | "_id">[];
  bookmarks: Pick<User, "profile" | "username" | "_id">[];
  totalVisit: number;
}
