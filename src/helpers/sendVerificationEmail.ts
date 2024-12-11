import nodemailer from "nodemailer";
import { google } from "googleapis";
import VerificationEmail from "../../emails/VerificationEmail";
import { apiResponse } from "@/types/apiResponse";


const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID, 
  process.env.CLIENT_SECRET, 
  "https://developers.google.com/oauthplayground" 
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<apiResponse> {
  try {
    console.log("sending email....");
    console.log(email);

    const accessToken = await oauth2Client.getAccessToken();

  
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can change this if using another provider
      auth: {
        type: "OAuth2",
        user: "umeshpotha123@gmail.com", // Your Gmail address
        clientId: process.env.CLIENT_ID, // OAuth2 client ID
        clientSecret: process.env.CLIENT_SECRET, // OAuth2 client secret
        refreshToken: process.env.REFRESH_TOKEN, // OAuth2 refresh token
        accessToken: accessToken.token || "", // Access token fetched from OAuth2 client
      },
    });

    // Generate the email content from the React component
    // const emailContent = VerificationEmail({ username, otp: verifyCode });

    // Send the email
    const info =  transporter.sendMail({
      from: '"doctorspointofficial" <umeshpotha123@gmail.com>', 
      to: email, 
      subject: "Verification Code",
      html:`
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .header {
            background-color: #007bff;
            color: white;
            padding: 10px;
            font-size: 24px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }

        .content {
            padding: 20px;
            font-size: 18px;
        }

        .code-box {
            font-size: 32px;
            font-weight: bold;
            padding: 20px;
            background-color: #f1f1f1;
            border-radius: 8px;
            display: inline-block;
            margin-top: 10px;
        }

        .footer {
            margin-top: 20px;
            color: #888888;
            font-size: 14px;
        }

        .footer p {
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            Doctors Point -Email Verification
        </div>

        <div class="content">
            <p>Hello,${username}</p>
            <p>Your verification code is:</p>
            
            <div class="code-box">${verifyCode}</div>

            <p>Please enter this code to verify your email address.</p>
        </div>

        <div class="footer">
            <p>Thank you!<br>The Doctors Point Team</p>
        </div>
    </div>
</body>
</html>`, 
    });

    console.log("Email sent: %s", (await info).messageId);

    return { success: true, message: "Verification Email Sent Successfully" };
  } catch (emailerror) {
    console.error("Error Sending verification Email", emailerror);

    return { success: false, message: "Error Sending Verification Email" };
  }
}


// import { resend } from "@/lib/resend";
// import VerificationEmail from "../../emails/VerificationEmail";
// import { apiResponse } from "@/types/apiResponse";
// export async function sendVerificationEmail(
//     email:string,
//     username:string,
//     verifyCode:string
// ):Promise<apiResponse>{

//     try{
//         console.log("sending email....")
//         console.log(email)
//         await resend.emails.send({
//           from: 'onboarding@resend.dev',
//           to: 'umeshpotha123@gmail.com',
//           subject: 'Verification Code',
//           react: VerificationEmail({username,otp:verifyCode}),
//         });
//         console.log

//         return{success:true, message:"Error Sending Verification Email"}

//     }
//     catch(emailerror){
//         console.error("Error Sending verification Email",emailerror);

//         return{success:false, message:"Error Sending Verification Email"}
//     }
// }