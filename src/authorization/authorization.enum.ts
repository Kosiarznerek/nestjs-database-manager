/**
 * Contains available user roles in backend application
 */
export enum AuthorizationEnum {

    /**
     * Has permissions only for Database Manager API
     */
    DatabaseAdmin = 'DatabaseAdmin',

    /**
     * Has permissions only for Application API
     */
    ApplicationUser = 'ApplicationUser',

}
