import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";

import {
  Form, 
  FormControl,
  FormField, 
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import ProfileUploader from "@/components/shared/ProfileUploader";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById, useUpdateUser } from "@/lib/react-query/queriesAndMutations";
import { ProfileValidation } from "@/lib/validation";

const UpdateProfile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, setUser } = useUserContext();
  const form = useForm<z.infer <typeof ProfileValidation>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      file: [],

    }
  })
  return (
    <div>UpdateProfile</div>
  )
}

export default UpdateProfile;