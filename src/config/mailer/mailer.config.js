import nodemailer from "nodemailer";

export const sendTicketEmail = async (email, ticket) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });

    // Configurar el envío del email
    await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Ticket de compra",
        html: `
            <div style="width: 50%; margin: auto; padding: 20px; border: 1px solid #ccc; text-align: center;">
                <h2>Gracias por tu compra!</h2>
                <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #ddd; padding: 10px;">Descripción</th>
                            <th style="border: 1px solid #ddd; padding: 10px;">Ticket de compra</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 10px;"><strong>Código de Ticket:</strong></td>
                            <td style="border: 1px solid #ddd; padding: 10px;">${ticket.code}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 10px;"><strong>Monto:</strong></td>
                            <td style="border: 1px solid #ddd; padding: 10px;">$${ticket.amount}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 10px;"><strong>Fecha de Compra:</strong></td>
                            <td style="border: 1px solid #ddd; padding: 10px;">${ticket.purchase_datetime}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `
    });

    console.log(`Correo enviado a: ${email}`);

};