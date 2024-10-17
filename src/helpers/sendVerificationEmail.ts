import nodemailer from "nodemailer";
import { google } from "googleapis";
import VerificationEmail from "../../emails/VerificationEmail";
import { apiResponse } from "@/types/apiResponse";

// OAuth2 setup
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID, 
  process.env.CLIENT_SECRET, 
  "https://developers.google.com/oauthplayground" 
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN, // Refresh Token from Google OAuth Playground
});

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<apiResponse> {
  try {
    console.log("sending email....");
    console.log(email);

    // Get the access token
    const accessToken = await oauth2Client.getAccessToken();

    // Create a transporter object using OAuth2
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
      from: '"docpointofficial" <umeshpotha123@gmail.com>', 
      to: email, 
      subject: "Verification Code",
      html:`<html lang="en" dir="ltr">
        <head>
          <title>Verification Code</title>
          <Font
            fontFamily="Roboto"
            fallbackFontFamily="Verdana"
            webFont={{
              url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
              format: 'woff2',
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </head>
        <preview>Here&apos;s your verification code: ${verifyCode} </preview>
        <section>
          <row>
            <Heading as="h2">Hello ${username},</Heading>
          </row>
          <row>
            <text>
              Thank you for registering. Please use the following verification
              code to complete your registration:
            </text>
          </row>
          
          <row>
            <text>
              If you did not request this code, please ignore this email.
            </text>
          </row>
        </section>
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