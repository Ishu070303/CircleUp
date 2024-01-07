// usequery for fetching the data 
// useMutation for modifying the data
import {
    useQuery,
    useMutation,
    useInfiniteQuery,
    useQueryClient
} from "@tanstack/react-query";
import { QUERY_KEYS } from './queryKeys'; 
import { createUserAccount, signInAccount, signOutAccount, createPost, getRecentPosts } from "../appwrite/api";
import { INewPost, INewUser } from "@/types";

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn : (user: INewUser) => createUserAccount(user)
    });
};

export const useSignInAccount = () => {
    return useMutation({
        mutationFn : (user : { 
            email: string;
            password: string; 
        }) => signInAccount(user)
    })
}

export const useSignOutAccount = () => {
    return useMutation({
        mutationFn : signOutAccount
    })
};

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (post: INewPost) => createPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            })
        }
    })
};

export const useGetRecentPosts = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        queryFn: getRecentPosts
    })
};