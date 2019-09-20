import {Module} from '@nestjs/common';
import {AboutProgramController} from './about-program.controller';
import {AboutProgramService} from './about-program.service';

@Module({
    controllers: [AboutProgramController],
    providers: [AboutProgramService],
})
export class AboutProgramModule {
}
