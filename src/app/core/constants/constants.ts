export const authHeader = 'Authorization';
export const contentType = 'Content-Type';
export const acceptLanguage = 'Accept-Language';

// error status codes 

export enum StatusCode {
    Ok = 200,
    Created = 201,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    InteralServerError = 500
}
