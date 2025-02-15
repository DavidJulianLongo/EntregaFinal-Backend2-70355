import BaseDao  from './base.dao.js';
import { ticketModel } from './models/ticket.model.js';


class TicketDao  extends BaseDao {
    constructor() {
        super(ticketModel);
    }
}

export const ticketDao = new TicketDao();
