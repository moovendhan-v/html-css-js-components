// customResponses.js

const customResponsesMiddleware = function(req, res, next) {
    res.success = function({error = false, code=200, message="success", response=null, count = 0} = {}) {
        return res.status(code).json({
            error,
            code,
            message,
            response,
            count
        });
    };

    res.error = function({error = true, code=400, message="something went wrong", response=null, count = 0} = {}) {
        return res.status(code).json({
            error,
            code,
            message,
            response,
            count
        });
    };

    res.badreq = function({error, code=400, message="Bad request", response=null, count = 0} = {}) {
        return res.status(code).json({
            error,
            code,
            message,
            response,
            count
        });
    };

    res.forbidden = function({ error = {}, code = 403, message = "Forbidden", response = {}, count = 0,} = {}) {
        return res.status(403).json({
            error,
            code,
            message,
            response,
            count
        });
    };

    res.unauth = function({ error = {}, code = 401, message = "Unauthorised", response = null, count = 0} = {}) {
        return res.status(code).json({
            error,
            code,
            message,
            response,
            count
        });
    };

    res.internalerr = function({ error = {}, code = 500, message = "Internal Server Error", response = null, count = 0} = {}) {
        return res.status(code).json({
            error,
            code,
            message,
            response,
            count
        });
    };

    res.notFount = function({ error = {}, code = 404, message = "Not found", response = null, count = 0 } = {}) {
        return res.status(code).json({
            error,
            code,
            message,
            response,
            count
        });
    };

    next();
};

module.exports = { customResponsesMiddleware };
