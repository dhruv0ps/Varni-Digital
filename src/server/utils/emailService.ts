// import nodemailer from 'nodemailer';
// import { emailHost, emailPort, emailUser, emailPass } from '../../env';

// const transporter = nodemailer.createTransport({
//     host: emailHost,
//     port: Number(emailPort),
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: emailUser,
//         pass: emailPass,
//     },
// });

// export const sendPanelEmail = async (recipientEmail: string, pdfBuffer: Buffer) => {
//     const mailOptions = {
//         from: emailUser,
//         to: recipientEmail,
//         subject: 'Your Customized Panel Details',
//         text: 'Attached is the PDF of your customized panel details.',
//         attachments: [
//             {
//                 filename: 'panel-details.pdf',
//                 content: pdfBuffer,
//             },
//         ],
//     };

//     await transporter.sendMail(mailOptions);
// };

