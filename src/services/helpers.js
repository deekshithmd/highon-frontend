import { updatePost } from "./services";

export const handleLike = async ({post, userName}) => {
  let newData, res;
  if (post?.likedBy?.includes(userName)) {
    newData = {
      ...post,
      likes: post?.likes - 1,
      likedBy: post?.likedBy?.filter((user) => user !== userName),
    };
  } else {
    newData = {
      ...post,
      likes: post?.likes + 1,
      likedBy: post?.likedBy?.concat([userName]),
    };
  }
  try {
    res = await updatePost({ id: post?._id, post: newData });
  } catch (e) {
    console.log("error occured", e);
  }
  return res;
};
