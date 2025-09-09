// Utility to wrap async route handlers and pass errors to Express
module.exports = (fn) => {
    return function(req, res, next) {
        fn(req, res, next).catch(next); // Catch errors and pass to next
    };
};