import { NextApiRequest, NextApiResponse } from 'next';
// import { sendPanelEmail } from '../../../server/utils/emailService';
import { jsPDF } from 'jspdf';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { panelData, recipientEmail } = req.body;

            // Generate PDF using jsPDF
            const doc = new jsPDF();
            doc.text('Panel Customization Details', 10, 10);
            doc.text(JSON.stringify(panelData), 10, 20); // Adjust as needed

            const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

            // Send the email
         //   await sendPanelEmail(recipientEmail, pdfBuffer);

            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Failed to send email' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

