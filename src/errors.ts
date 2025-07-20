export class CardanoUriError extends Error {
    type: string;
    details?: any;

    constructor(type: string, message: string, details?: any) {
        super(message);
        this.name = 'Errors';
        this.type = type;
        this.details = details;
    }
}