import React from "react";
import { PostItem } from "./PostItem";
export const PostFeed = ({ posts }) => {
  return posts?.map((item, index) => (
    <PostItem post={item} key={index} showAction={true} />
  ));
};
