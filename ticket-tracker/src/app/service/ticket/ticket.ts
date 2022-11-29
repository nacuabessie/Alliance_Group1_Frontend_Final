export interface Ticket{
    ticket_id: number,
    assignee_id: number,
    sender_id: number,
    ticket_category:number,
    status_id: number,
    subject: string,
    description: string,
    file_location: string,
}