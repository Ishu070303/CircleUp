import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

import { SigninFormValidation } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";


const SigninForm = () => {

  const navigate = useNavigate();
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const { mutateAsync: signInAccount } = useSignInAccount();
  //1. define a form
  const form = useForm<z.infer<typeof SigninFormValidation>>({
    resolver: zodResolver(SigninFormValidation),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  //2. define a submit handler
  async function onSubmit(values: z.infer<typeof SigninFormValidation>){
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if(!session) {
      return toast({ title: "Sign Up failed, Please try again!"})
    }

    const isLoggedIn = await checkAuthUser();
    if(isLoggedIn) {
      form.reset();
      navigate("/")
    }
    else{
      return toast({ title: "Sign Up failed, Please try again!"})
    }
  }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-col flex-center h-screen">
        <img src="/assets/images/logomobile.png" className="mr-4" alt="logo" width="250px" height="100px" />

        <h2 className="md:h2-bold sm:h3-bold">
          Log in to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back! please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
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
            {isUserLoading ? (
                <div className="flex-center gap-2">
                  <Loader /> Loading...
                </div>
            ) : (
                "Sign In"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account?
            <Link to={"/sign-up"} className="text-primary-500 text-small-semibold ml-1"> Sign Up </Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SigninForm;