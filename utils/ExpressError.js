class ExpressError extends Error {
    constructor (statusCode, message){
        super(); // Call parent Error constructor
        this.statusCode = statusCode; // Set HTTP status code
        this.message = message; // Set error message
    }
}

module.exports = ExpressError;