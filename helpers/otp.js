const nodemailer = require('nodemailer');

function generateOTP(length) {
    let otp = Math.floor(Math.random() * 1000000).toString();

    while (otp.length < length) {
        otp = '0' + otp;
    }

    return otp;
}

function sendOTPByEmail(email) {
    const otp = generateOTP(6);
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'serverhacker471@gmail.com',
                pass: 'zcghwsilfrbrwcla',
            },
        });

        const mailOptions = {
            from: 'serverhacker471@gmail.com',
            to: email,
            subject: 'OTP Verification',
            text: 'Your OTP: ' + otp,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

module.exports = { sendOTPByEmail };