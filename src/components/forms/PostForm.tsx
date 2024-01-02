import { Models } from "appwrite";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useNavigate } from "react-router-dom";


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { PostValidation } from "@/lib/validation";
import { useCreatePost } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "../ui/use-toast";



type PostFromProps = {
  post?: Models.Document;
}
 
const PostForm = ({ post }: PostFromProps) => {

  // const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();
  const { user } = useUserContext();

  const { toast } = useToast();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post?.tags.join(',') : ''
    },
  });
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    // const newPost = await createPost({
    //   ...values,
    //   userId: user.id,
    // });

    // if(!newPost) {
    //   toast({
    //     title: "Please try again"
    //   })
    // };

    // navigate('/');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        {/* Caption area */}
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea custom-scrollbar" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        {/* File area */}
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />                 
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        {/* location area */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field}  />               
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        {/* tags area */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Tags
              (seperated by comma " , ")
              </FormLabel>
              <FormControl>
                <Input 
                  type="text"
                  className="shad-input"
                  placeholder="JS, Expression, Learn"
                  {...field} 
                />               
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        {/* Button area */}
        <div className="flex gap-4 items-center justify-end">
            <Button 
                type="button"
                className="shad-button_dark_4"
            >
                Cancel
            </Button>

            <Button 
               type="submit"
               className="shad-button_primary whitespace-nowrap"
            > 
               Submit
            </Button>
        </div>
      </form>
    </Form>
  )
}

export default PostForm;