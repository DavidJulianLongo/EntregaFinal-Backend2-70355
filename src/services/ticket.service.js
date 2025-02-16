import { ticketDao } from "../dao/mongo/ticket.dao.js";
import { v4 as uuidv4 } from 'uuid';
import { CustomError } from '../utils/customError.js';
import { sendTicketEmail } from "../config/mailer/mailer.config.js";


class TicketService {

    async createTicket(amount, purchaser){
        try {
            const code = uuidv4();

            const ticket = await ticketDao.create({
                code,
                amount,
                purchaser
            });    
            
            if(!ticket) throw new CustomError("Failed to create ticket", 500);
        
            await sendTicketEmail(purchaser, ticket);
            return ticket;
        } catch (error) {
            throw error
        }
    }

}

export const ticketService = new TicketService();