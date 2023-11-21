import nodemailer from 'nodemailer';

var emailTransport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "0dcea2ff7850ca",
      pass: "0e4d7ada31f948"
    }
});

async function sendVerification(email: string, verificationLink: string) {
    await emailTransport.sendMail({
        from: 'admin@gmail.com',
        to: email,
        subject: 'Verify Your Account',
        html: `<p>Click the following link to verify your account: <a href='${verificationLink}'>${verificationLink}</a></p>`,
    })
}

export {
    sendVerification
};