import {PrimaryGeneratedColumn} from 'typeorm';

export abstract class BaseGridEntity {

    @PrimaryGeneratedColumn()
    id: number;

    abstract getDisplayName(): string | Promise<string>;

}
