import { ticketDao } from "../dao/mongo/ticket.dao.js";
import { v4 as uuidv4 } from 'uuid';
import { CustomError } from '../utils/customError.js';


class TicketService {

    async createTicket(amount, purchase){
        try {
            const code = uuidv4();

            const ticket = await ticketDao.create({
                code,
                amount,
                purchase
            });    

            if(!ticket) throw new CustomError("Failed to create ticket", 500);
            return ticket;
        } catch (error) {
            throw error
        }
    }

}

export const ticketService = new TicketService();