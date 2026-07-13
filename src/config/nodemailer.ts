import { createTransport } from "nodemailer";
import config from ".";

// Create a transporter using SMTP

const transporter = createTransport({
    // host: "smtp-relay.brevo.com",
    // port: 587,
    // secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    service: "gmail",
    auth: {
        user: config.smtp_user,
        pass: config.smtp_pass,
    },
});

await transporter.verify();
console.log("SMTP connected");

const sendEmail = async ({
    to,
    subject,
    body,
}: {
    to: string;
    subject: string;
    body: string;
}) => {
    const response = await transporter.sendMail({
        from: `"Grocery Delivery" < ${config.sender_email} >`,
        to,
        subject,
        html: body,
    });

    return response;
};

export default sendEmail;
