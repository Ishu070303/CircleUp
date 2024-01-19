import { useDeleteSavedPosts, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite"
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useLocation } from "react-router-dom";

type PostStatsProps = {
    post?: Models.Document;
    userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {

  const location = useLocation();
  const likesList = post?.likes.map((user: Models.Document) => user.$id);

  const [ likes, setLikes ] = useState<string[]>(likesList);
  const [ isSaved, setIsSaved ] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSaved } = useDeleteSavedPosts();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.saves.find((record: Models.
  Document) => record.post.$id === post?.$id);

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);
    if(hasLiked) {
        newLikes = newLikes.filter((id) => id !== userId);
    } else {
        newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post?.$id || '', likesArray: newLikes })
  };


  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if(savedPostRecord) {
        setIsSaved(false);

        return deleteSavedPost(savedPostRecord.$id);
    };

    savePost({ postId: post?.$id || '', userId: userId });
    setIsSaved(true);
  };

  const containerStyles = location.pathname.startsWith("/profile")
  ? "w-full"
  : "";


  return (
    <div className={`flex justify-between items-center z-20 ${containerStyles}`}>
        {/* For liked  */}
        <div className="flex gap-2 mr-5">
           <img 
              src={checkIsLiked( likes, userId ) ? 
                "/assets/icons/liked.svg"
                : "/assets/icons/like.svg"}
              alt="like"
              width={20}
              height={20}
              onClick={(e) => handleLikePost(e)}
              className="cursor-pointer"
            />
            <p className="small-medium lg:base-medium">{likes.length}</p>
        </div>

        {/* for saved */}
        <div className="flex gap-2">
        {isSavingPost || isDeletingSaved 
            ? <Loader /> 
            : <img 
              src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
              alt="save"
              width={20}
              height={20}
              onClick={(e) => handleSavePost(e)}
              className="cursor-pointer"
            />
        }
        </div>
    </div>
  )
}

export default PostStats;