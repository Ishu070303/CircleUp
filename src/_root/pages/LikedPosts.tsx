import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
import Loader  from "@/components/shared/Loader";
import GridPostList from "@/components/shared/GridPostList";

const LikedPosts = () => {
  
  const { data: currentUser } = useGetCurrentUser();

  if(!currentUser) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  };
  
  return (
   <>
   {currentUser.liked.length === 0 && (
    <p className="text-light-4 m-4">No liked posts</p>
   )}

   <div className="m-auto">
   <GridPostList  posts={currentUser.liked} showStats={false} />
   </div>
   </>
  )
}

export default LikedPosts;