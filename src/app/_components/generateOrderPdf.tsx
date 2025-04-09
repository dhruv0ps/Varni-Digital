import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface GenerateOrderPdfProps {
    logoUrl: any,
    email: string,
    userName: string,
    totalQty: number,
    finalPrice: number,
}

export const generateOrderPdf = async ({
    logoUrl,
    email,
    userName,
    totalQty,
    finalPrice
}: GenerateOrderPdfProps) => {

    // Step 1: Get the DOM elements for DragDropArea and OrderSummary
    const dragDropElement = document.getElementById('drag-drop-area');
    const orderSummaryElement = document.getElementById('order-summary-area');

    if (!dragDropElement || !orderSummaryElement) {
        console.error('Could not find one or more elements!');
        return;
    }

    // Get the current date and time to generate a unique filename
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];  // Format: YYYY-MM-DD
    const timeStr = today?.toTimeString().split(' ')[0]?.replace(/:/g, '-') ?? '';  // Format: HH-MM-SS (using optional chaining)
    const filename = `Switchcraft_${dateStr}-${timeStr}.pdf`;

    // Create a new jsPDF instance with A4 size (210mm x 297mm)
    const doc = new jsPDF('p', 'mm', 'a4');

    // Get page width and height
    const pageWidth = 210;
    const pageHeight = 297;

    let yPosition = 10; // Starting Y position for the first content (for logo)

    // Adding logo on the top of the first page
    const logoWidth = 40;
    const logoHeight = 15;
    const centerLogoX = (pageWidth - logoWidth) / 2;
    doc.addImage(logoUrl, 'PNG', centerLogoX, yPosition, logoWidth, logoHeight);
    yPosition += logoHeight + 10;  // Adjust the Y position after adding the logo

    // Step 2: Capture the DragDropArea component with high resolution
    try {
        const dragDropCanvas = await html2canvas(dragDropElement, { scale: 2 });
        const dragDropImgData = dragDropCanvas.toDataURL('image/png'); // Convert canvas to image data

        // Get original width and height of dragDropElement
        const dragDropOriginalWidth = dragDropElement.offsetWidth;
        const dragDropOriginalHeight = dragDropElement.offsetHeight;

        // Calculate the aspect ratio
        const dragDropAspectRatio = dragDropOriginalWidth / dragDropOriginalHeight;

        // Scale to fit within the page while maintaining the aspect ratio
        let dragDropWidth = pageWidth - 20; // Leave some margin
        let dragDropHeight = dragDropWidth / dragDropAspectRatio;

        // If the calculated height is larger than the page height, scale down the height
        if (dragDropHeight > pageHeight - yPosition - 10) {
            dragDropHeight = pageHeight - yPosition - 10;
            dragDropWidth = dragDropHeight * dragDropAspectRatio;
        }

        // Add DragDropArea to the PDF with the calculated width and height
        doc.addImage(dragDropImgData, 'PNG', 10, yPosition, dragDropWidth, dragDropHeight);
        yPosition += dragDropHeight + 10; // Move down after DragDropArea

        // Step 3: Capture the OrderSummary component with high resolution
        const orderSummaryCanvas = await html2canvas(orderSummaryElement, { scale: 3 });
        const orderSummaryImgData = orderSummaryCanvas.toDataURL('image/png');

        // Get original width and height of orderSummaryElement
        const orderSummaryOriginalWidth = orderSummaryElement.offsetWidth;
        const orderSummaryOriginalHeight = orderSummaryElement.offsetHeight;

        // Calculate the aspect ratio
        const orderSummaryAspectRatio = orderSummaryOriginalWidth / orderSummaryOriginalHeight;

        // Scale to fit within the page while maintaining the aspect ratio
        let orderSummaryWidth = pageWidth - 20; // Leave some margin
        let orderSummaryHeight = orderSummaryWidth / orderSummaryAspectRatio;

        // Check if the order summary fits on the current page
        const remainingSpace = pageHeight - yPosition - 20;  // Top margin + other content
        console.log(orderSummaryHeight)
        console.log(remainingSpace)
        console.log(yPosition)
        if (orderSummaryHeight > remainingSpace) {
            // If not, add a new page and reset the Y position
            doc.addPage();
            yPosition = 20; // Start from the top of the new page
        }

        // Add OrderSummary to the PDF with the calculated width and height
        const centerOrderSummaryX = (pageWidth - orderSummaryWidth) / 2;
        doc.addImage(orderSummaryImgData, 'PNG', centerOrderSummaryX, yPosition, orderSummaryWidth, orderSummaryHeight);
        yPosition += orderSummaryHeight + 10; // Move down after OrderSummary

        // Step 4: Calculate the position for the text (Name, Email, Quantity, Price)
        const nameText = `Name: ${userName}`;
        const emailText = `Email: ${email}`;
        const totalQtyText = `Quantity: ${totalQty}`;

        // Set the font for the text
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);

        // Check if there's enough space for the text after OrderSummary
        let textY = yPosition;

        if (yPosition + 20 + 10 > pageHeight) {
            // If not, add a new page and reset the Y position
            doc.addPage();
            yPosition = 20;
            textY = yPosition;
        }

        // Position the text (name, email, qty, price)
        const textWidth = doc.getTextWidth(nameText);
        const textX = (pageWidth - textWidth) / 2; // Center the text
        doc.text(nameText, textX, textY);
        doc.text(emailText, textX, textY + 5);
        doc.text(totalQtyText, textX, textY + 10);
        doc.text(`Total Price: ₹${finalPrice}`, textX, textY + 15);

        // Saving the PDF
        doc.save(filename);

        // Step 5: Create a Blob URL for the PDF file
        const pdfBlob = doc.output('blob'); // Get PDF as a Blob
        const pdfBlobUrl = URL.createObjectURL(pdfBlob); // Convert Blob to Blob URL

        // Step 6: Open the PDF in a new tab
        const printWindow = window.open(pdfBlobUrl, '_blank');

        // Ensure that the PDF content is fully loaded before printing
        if (printWindow) {
            printWindow.onload = () => {
                setTimeout(() => {
                    // Trigger the print dialog after a slight delay to ensure the PDF is fully loaded
                    printWindow.print();
                }, 500); // Adjust the delay as necessary
            };
        } else {
            console.error('Failed to open a new window');
        }

    } catch (error) {
        console.error('Error generating PDF:', error);
    }
};
