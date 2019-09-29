import {BeforeInsert, BeforeUpdate, Column, PrimaryGeneratedColumn} from 'typeorm';
import {BaseGridEntity} from '../base-grid/base-grid.entity';

/**
 * Base entity
 */
export abstract class BaseFilesEntity implements BaseGridEntity {

    @PrimaryGeneratedColumn()
    id: number;

    /**
     * Name of file selected by user
     */
    @Column()
    name: string;

    /**
     * File extension  eg. jpg, pdf
     */
    @Column()
    extension: string;

    /**
     * File content type (eg. application/pdf)
     */
    @Column()
    contentType: string;

    /**
     * Last change of files data eg. name
     */
    @Column({
        name: 'lastUpdateDate',
        nullable: true,
        default: null,
    })
    private _lastUpdateDate: Date;
    get lastUpdateDate(): Date {
        return this._lastUpdateDate;
    }

    /**
     * File upload date
     */
    @Column({
        name: 'uploadDate',
    })
    private _uploadDate: Date;
    get uploadDate(): Date {
        return this._uploadDate;
    }

    /**
     * Set upload date before insert
     */
    @BeforeInsert()
    private setUploadDate(): void {
        this._uploadDate = new Date();
    }

    /**
     * Sets update date before update
     */
    @BeforeUpdate()
    private setLastUpdateDate() {
        this._lastUpdateDate = new Date();
    }

    /**
     * Gets file display name
     * Used in chips and autocompletes when entity has relations
     */
    public getDisplayName(): string | Promise<string> {
        return `${this.name}.${this.extension}`;
    }

}
