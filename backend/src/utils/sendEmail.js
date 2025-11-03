import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {

    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: "Vichaar",
            link: "https://Vichaar.com",
        }
    });

    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
    const emailHtml = mailGenerator.generate(options.mailgenContent);

    var transport = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS
        }
    });

    const mail = {
        from: "no-reply@vichaar.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHtml
    };

    try {
        await transport.sendMail(mail);
        console.log("✅ Email send successfully to : ", options.email);
    } catch (error) {
        console.log("Failed to transport email.", error);
        throw error;
    }
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to Vichaar",
            action: {
                intstruction: "To verify your email please click on the following button.",
                button: {
                    color: "#25e351",
                    text: "Verify your email",
                    link: verificationUrl
                },
            },
            outro: "Nedd help, or have questions? Just reply to this email, we'd love to help.",
        },
    };
};

const forgetPasswordMailgenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "Reset the Password",
            action: {
                instructions: "To reset the password click the following button.",
                button: {
                    color: "#dd4422",
                    text: "Reset Password",
                    link: passwordResetUrl,
                },
            },
            outro: "Nedd help, or have questions? Just reply to this email, we'd love to help.",
        },
    };
};

export { emailVerificationMailgenContent, forgetPasswordMailgenContent, sendEmail };