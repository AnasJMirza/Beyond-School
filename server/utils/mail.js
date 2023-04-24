import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import otpGenerator from "otp-generator";

dotenv.config();

export const generateOTP = () => {
  return otpGenerator.generate(4, {
    upperCase: false,
    specialChars: false,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    digits: true,
  });
};

export const mailTransport = () => {
  return nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "9ff8e1a3035939",
      pass: "72f8f4c8a501da",
    },
  });
};

export const generateEmailTemplate = (otp, username) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Email Verification Template</title>
        <style>
            /* Header */
            .header {
                background-color: black;
                color: white;
                padding: 10px;
                text-align: center;
            }
    
            /* Logo */
            .logo {
                margin: 0 auto;
            }
    
            /* Headline */
            .headline {
                text-align: center;
                font-size: 24px;
                margin: 20px 0;
            }
    
            /* Welcome Message */
            .welcome {
                font-size: 16px;
                line-height: 1.5;
                margin: 20px 0;
            }
    
            /* Footer */
            .footer {
                background-color: #f7f7f7;
                padding: 20px;
                text-align: center;
                display: flex; /* Add flex property */
                justify-content: center; /* Center the footer__container elements horizontally */
            }
    
            .footer__container {
                margin: 0 20px;
                flex: 1; /* Make each footer__container element take up equal space */
            }
    
            .footer__icon {
                display: block;
                margin: 0 auto;
                max-width: 50px;
            }
    
            .footer__email {
                margin: 10px 0;
            }
    
            .footer__social {
                font-size: 24px;
                margin: 10px 0;
            }
                .verification-code {
                display: block;
                margin: 0 auto;
                margin-top: 20px;
                font-size: 36px;
                text-align: center;
                padding: 10px;
                border: 2px solid #000;
                border-radius: 10px;
                width: fit-content;
            }
        </style>
    </head>
    <body style="width: 600px; height: 739px; margin: 0 auto; font-family: 'arial'">
        <div class="header">
        </div>
        
  <img src='https://i.pinimg.com/originals/1b/fc/6b/1bfc6b102f4918992a3943c75ddea067.png' width='100%'/>


        <h2 class="headline">Welcome to Beyond-School!</h2>
    
        <p class="welcome">Dear ${username},<br>
        <br>
        Welcome to Beyond School! To complete the registration, please enter the verification code:<br>
        <br><strong>${otp}</strong><br>
        If you have any questions, our support team is here to help.<br> <br>
        Best regards,<br>
        Team beyond-school!</p>
    
        <div class="footer">
            <div class="footer__container">
                <img class="footer__icon" src="https://www.iconpacks.net/icons/1/free-mail-icon-142-thumb.png" alt="Mail Icon">
                <p class="footer__email">beyond-school@gmail.com</p>
            </div>
        </div>
    </body>
    `;
};


export const generateWelcomeEmailTemplate = (username) => {
    return  `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Welcome</title>
        <style>
            /* Header */
            .header {
                background-color: black;
                color: white;
                padding: 10px;
                text-align: center;
            }
    
            /* Logo */
            .logo {
                margin: 0 auto;
                height: 100%;
            }
    
            /* Headline */
            .headline {
                text-align: center;
                font-size: 24px;
                margin: 20px 0;
            }
    
            /* Welcome Message */
            .welcome {
                font-size: 16px;
                line-height: 1.5;
                margin: 20px 0;
            }
    
            /* Footer */
            .footer {
                background-color: #f7f7f7;
                padding: 20px;
                text-align: center;
                display: flex; /* Add flex property */
                justify-content: center; /* Center the footer__container elements horizontally */
            }
    
            .footer__container {
                margin: 0 20px;
                flex: 1; /* Make each footer__container element take up equal space */
                max-width: 250px; /* Add a maximum width to prevent the footer from becoming too wide */
            }
    
            .footer__icon {
                display: block;
                margin: 0 auto;
                max-width: 50px;
            }
    
            .footer__email {
                margin: 10px 0;
            }
    
            .footer__social {
                font-size: 24px;
                margin: 10px 0;
            }
                .verification-code {
                display: block;
                margin: 0 auto;
                margin-top: 20px;
                font-size: 36px;
                text-align: center;
                padding: 10px;
                border: 2px solid #000;
                border-radius: 10px;
                width: fit-content;
            }
        </style>
    </head>
    <body style="width: 600px; height: 739px; margin: 0 auto; font-family: 'arial'">
        <div class="header">
        </div>
        <div class="footer">
        </div>
        
  <img src='https://i.pinimg.com/originals/1b/fc/6b/1bfc6b102f4918992a3943c75ddea067.png' width='100%'/>

        </div>
        <h2 class="headline">Verification Successfull</h2>
    
        <p class="welcome">Dear ${username},<br>
        <br>
        Welcome to Beyond School! Email verification is successfull <br>
        
        If you have any questions, our support team is here to help.<br> <br>
        Best regards,<br>
        Team beyond-school!</p>
    
        <div class="footer">
            <div class="footer__container">
                <img class="footer__icon" src="https://www.iconpacks.net/icons/1/free-mail-icon-142-thumb.png" alt="Mail Icon">
                <p class="footer__email">beyond-school@gmail.com</p>
            </div>
        </div>
    </body>
    `;
}  


export const resetPasswordEmailTemplate = (username, otp) => {
    return  `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Welcome</title>
        <style>
            /* Header */
            .header {
                background-color: black;
                color: white;
                padding: 10px;
                text-align: center;
            }
    
            /* Logo */
            .logo {
                margin: 0 auto;
                height: 100%;
            }
    
            /* Headline */
            .headline {
                text-align: center;
                font-size: 24px;
                margin: 20px 0;
            }
    
            /* Welcome Message */
            .welcome {
                font-size: 16px;
                line-height: 1.5;
                margin: 20px 0;
            }
    
            /* Footer */
            .footer {
                background-color: #f7f7f7;
                padding: 20px;
                text-align: center;
                display: flex; /* Add flex property */
                justify-content: center; /* Center the footer__container elements horizontally */
            }
    
            .footer__container {
                margin: 0 20px;
                flex: 1; /* Make each footer__container element take up equal space */
                max-width: 250px; /* Add a maximum width to prevent the footer from becoming too wide */
            }
    
            .footer__icon {
                display: block;
                margin: 0 auto;
                max-width: 50px;
            }
    
            .footer__email {
                margin: 10px 0;
            }
    
            .footer__social {
                font-size: 24px;
                margin: 10px 0;
            }
                .verification-code {
                display: block;
                margin: 0 auto;
                margin-top: 20px;
                font-size: 36px;
                text-align: center;
                padding: 10px;
                border: 2px solid #000;
                border-radius: 10px;
                width: fit-content;
            }
        </style>
    </head>
    <body style="width: 600px; height: 739px; margin: 0 auto; font-family: 'arial'">
        <div class="header">
        </div>
        <div class="footer">
        </div>
        
  <img src='https://i.pinimg.com/originals/1b/fc/6b/1bfc6b102f4918992a3943c75ddea067.png' width='100%'/>

        </div>
        <h2 class="headline">Reset Password</h2>
    
        <p class="welcome">Dear ${username},<br>
        <br>
        Here is your reset password code. don't share it with anyone<br>
        <p><strong>${otp}</strong></p>
        If you have any questions, our support team is here to help.<br> <br>
        Best regards,<br>
        Team beyond-school!</p>
    
        <div class="footer">
            <div class="footer__container">
                <img class="footer__icon" src="https://www.iconpacks.net/icons/1/free-mail-icon-142-thumb.png" alt="Mail Icon">
                <p class="footer__email">beyond-school@gmail.com</p>
            </div>
        </div>
    </body>
    `;
}