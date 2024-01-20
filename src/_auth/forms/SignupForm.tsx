import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupFormValidation } from "@/lib/validation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const SignupForm = () => {

  const navigate = useNavigate();
  const { toast } = useToast();
  const { checkAuthUser }  = useUserContext();
  const { mutateAsync: createUserAccount, isPending: isCreatingUser } = useCreateUserAccount();
  const { mutateAsync: signInAccount } = useSignInAccount();

  //Define your Form
  const form = useForm<z.infer<typeof SignupFormValidation>>({
    resolver: zodResolver(SignupFormValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupFormValidation>) {
    const newAccount = await createUserAccount(values);

    if(!newAccount){
      return toast({ title: "Sign Up failed, Please try again!"});
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password
    });

    if(!session){
      return toast({ title: "Sign Up failed, Please try again!"});
    };

    const isLoggedIn = await checkAuthUser();
    if(isLoggedIn){
      form.reset();
      navigate("/");
    }
    else{
      return toast({ title: "Sign Up failed, Please try again!"});
    }


  }
  
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-col flex-center h-screen">
        <img src="/assets/images/circleup.png" className="mb-2 mr-5" alt="logo" width="250px" height="100px" />

        <h2 className="md:h2-bold">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use Circle-up, please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          {/* name input  */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           
          {/* username input */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* email input */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* password input */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isCreatingUser ? (
                <div className="flex-center gap-2">
                  <Loader /> Loading...
                </div>
            ) : (
                "Sign Up"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center">
            Already have an account?
            <Link to={"/sign-in"} className="text-primary-500 text-small-semibold ml-1">Log in</Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
