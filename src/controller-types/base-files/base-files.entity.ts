import {BeforeInsert, BeforeUpdate, Column, PrimaryGeneratedColumn} from 'typeorm';

/**
 * Base entity
 */
export abstract class BaseFilesEntity {

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
     * Is file deletable
     */
    @Column({default: true})
    deletable: boolean;

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

}
