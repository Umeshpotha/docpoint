import {z} from 'zod'

export const usernameValidation=z
    .string()
    .min(2,"Username must be at least 2 characters")
    .max(20,"Username must be at most 20 characters")


export const  signUpSchema =z.object({
    username:usernameValidation,
    email:z.string().email({message:"Invalid Email Address"}),//email validation
    password: z.string().min(8, "Password must be at least 8 characters long").refine((value) => {
        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSymbol = /[!@#$%^&*]/.test(value);
        return hasUppercase && hasLowercase && hasNumber && hasSymbol;
      }, "Password must contain uppercase, lowercase, numbers, and symbols"),//password validation
})
