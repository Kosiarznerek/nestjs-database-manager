/**
 * Contains available user roles in backend application
 */
export const enum AuthorizationEnum {

    /**
     * Has permissions only for Database Manager
     */
    DatabaseAdmin = 'DatabaseAdmin',

    /**
     * Has permissions only for Application API
     */
    ApplicationUser = 'ApplicationUser',

}
