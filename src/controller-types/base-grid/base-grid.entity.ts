import {PrimaryGeneratedColumn} from 'typeorm';

/**
 * Base entity
 */
export abstract class BaseGridEntity {

    @PrimaryGeneratedColumn()
    id: number;

    /**
     * Used in chips and autocompletes when entity has relations
     */
    abstract getDisplayName(): string | Promise<string>;

}
