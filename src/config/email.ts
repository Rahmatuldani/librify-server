import nodemailer from 'nodemailer';

var emailTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "b2023032@dicoding.org",
      pass: "qnyvqtsmodocivui"
    }
});

async function sendVerification(email: string, verificationLink: string) {
    await emailTransport.sendMail({
        from: 'b2023032@dicoding.org',
        to: email,
        subject: 'Verify Your Account',
        html: `<p>Click the following link to verify your account: <a href='${verificationLink}'>${verificationLink}</a></p>`,
    })
}

export {
    sendVerification
};