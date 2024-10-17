import {z} from 'zod'

export const usernameValidation=z
    .string()
    .min(2,"Username must be at least 2 characters")
    .max(20,"Username must be at most 20 characters")


export const  signUpSchema =z.object({
    username:usernameValidation,
    email:z.string().email({message:"Invalid Email Address"}),//email validation
    password:z.string().min(6,{message:"password must be at least 6 characters"}),//password validation
})
