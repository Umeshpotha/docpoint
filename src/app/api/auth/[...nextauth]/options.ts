import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";



export  const authOptions:NextAuthOptions={
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"Credentials",
            credentials:{
                email:{label:"Email",type:"text",placeholder:"Enter your email"},
                password:{label:"Password",type:"password",placeholder:"Enter your password"}
            },
            async authorize(credentials:any):Promise<any>{
                await dbConnect();
                try{
                    const user=await UserModel.findOne({$or :[{email:credentials.identifier},{username:credentials.identifier}]})
                    if(!user){
                        throw new Error("User not found")
                    }
                    if(!user.isVerified){
                        throw new Error("User is not verified Please Verify User ")
                    }
                    const isPasswordCorrect=await bcrypt.compare(credentials.password,user.password)
                    if(!isPasswordCorrect){
                        throw new Error("Invalid Password")
                    }
                    return user



                }
                catch(err:any){
                    throw new Error(err.message)

                }
                
                
                
            }
        })

    ],
    callbacks:{
        async session({session,token}){
            if(token){
                session.user._id=token._id;
                session.user.username=token.username;
                session.user.isVerified=token.isVerified;
            }
            return session
        },
        async jwt({token,user}){
            if(user){
                token._id=user._id?.toString();
                token.email=user.email;
                token.username=user.username
                token.isVerified=user.isVerified
            }
            return token

        },

    },
    pages:{
        signIn:"sign-in"
    },
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET
}