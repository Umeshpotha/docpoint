import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User} from "next-auth";


export async function POST(request:Request){
    await dbConnect()

    const session =await getServerSession(authOptions);
    const user:User =session?.user as User;

    if(!session||!session.user){
        return Response.json(
            {
                success:false,
                message:"Unauthorized"
            },
            {
                status:401
            }
        )
    }
    const userid=user._id;
    const {acceptMessages}=await request.json();
    

    try {
       const updatedUser= await UserModel.findByIdAndUpdate(userid,{isAcceptingMessages:acceptMessages},{new:true})

       if(!updatedUser){
        return Response.json(
            {
                success:false,
                message:"Error Accepting Messages"
            },
            {
                status:401
            }
        )
       }
       else{
        return Response.json(
            {
                success:true,
                message:"User status updated to accept messages",
                updatedUser
            },
            {
                status:200
            }
        )
       }
        
    } catch (error) {
        console.log("failed to update user status to accept messages ",error);
        return Response.json(
            {
                success:false,
                message:"failed to update user status to accept messages"
            },
            {
                status:500
            }
        )
    }




}


export async function GET(request:Request){

    await dbConnect()

    const session =await getServerSession(authOptions);
    const user:User =session?.user as User;

    if(!session||!session.user){
        return Response.json(
            {
                success:false,
                message:"Unauthorized"
            },
            {
                status:401
            }
        )
    }
    const userid=user._id;

    
    try {
        const user=await UserModel.findById(userid);
        if(!user){
            return Response.json(
                {
                    success:false,
                    message:"User not found"
                },
                {
                    status:404
                }
            )
        }
        else{
            return Response.json(
                {
                    success:true,
                    message:"User status fetched successfully",
                    isAcceptingMessages:user.isAcceptingMessages
                },
                {
                    status:200
                }
            )
        }

    } catch (error) {
        console.log("Error fetching user status ",error);
        return Response.json(
            {
                success:false,
                message:"Error fetching user status"
            },
            {
                status:500
            }
        )
    }
    
}