import * as z from "zod";

export const SignupFormValidation = z.object({
    name: z.string().min(2, { message: "To shortt"}),
    username: z.string().min(2, { message: "To shortt"}),
    email: z.string().email(),
    password: z.string().min(8, { message: "Passord should at least 8 characters"}),
});