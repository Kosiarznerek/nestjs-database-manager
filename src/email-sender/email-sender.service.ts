import {Injectable} from '@nestjs/common';
import {createTransport, Transporter} from 'nodemailer';
import {TransportOptions} from './email-sender.options';
import {Email} from './email.sender.service.models';

@Injectable()
export class EmailSenderService {

    private readonly _transporter: Transporter;

    constructor() {

        // Creating transporter
        this._transporter = createTransport(TransportOptions);

    }

    /**
     * Sends mail
     * @param options
     */
    public async sendEmail(options: Email): Promise<boolean> {

        return this._transporter.sendMail(Object.assign({
            from: 'support@database-manager.pl',
        }, options))
            .then(r => true)
            .catch((e) => false);

    }

}
