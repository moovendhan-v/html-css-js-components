// customResponses.js

const customResponsesMiddleware = (req, res, next) => {
    res.success = (
        {error = false, code=200, message="success", response=null, count = 0} = {}
    ) => res.status(code).json({
        error,
        code,
        message,
        response,
        count
    });

    res.error = (
        {error = true, code=400, message="something went wrong", response=null, count = 0} = {}
    ) => res.status(code).json({
        error,
        code,
        message,
        response,
        count
    });

    res.badreq = ({error, code=400, message="Bad request", response=null, count = 0} = {}) => res.status(code).json({
        error,
        code,
        message,
        response,
        count
    });

    res.forbidden = (
        { error = {}, code = 403, message = "Forbidden", response = {}, count = 0,} = {}
    ) => res.status(403).json({
        error,
        code,
        message,
        response,
        count
    });

    res.unauth = (
        { error = {}, code = 401, message = "Unauthorised", response = null, count = 0} = {}
    ) => res.status(code).json({
        error,
        code,
        message,
        response,
        count
    });

    res.internalerr = (
        { error = {}, code = 500, message = "Internal Server Error", response = null, count = 0} = {}
    ) => res.status(code).json({
        error,
        code,
        message,
        response,
        count
    });

    res.notFount = (
        { error = {}, code = 404, message = "Not found", response = null, count = 0 } = {}
    ) => res.status(code).json({
        error,
        code,
        message,
        response,
        count
    });

    next();
};

export { customResponsesMiddleware };
