// customResponses.js

const customResponsesMiddleware = function(req, res, next) {
    res.success = function ({result={}, code=200, message=""}) {
        return res.json({
            result,
            code,
            message
        });
    };

    res.error = function({errors={}, code=400, message="", result={}}) {
        return res.json({
            errors,
            code,
            message,
            result
        });
    };

    res.badreq = function({errors={}, code=400, message="", result={}} = {}) {
        return res.status(400).json({
            errors,
            code,
            message,
            result
        });
    };

    res.forbidden = function({ errors = {}, code = 403, message = "Forbidden", result = {} } = {}) {
        return res.status(403).json({
            errors,
            code,
            message,
            result
        });
    };


    res.unauth = function({errors={}, code=401, message="", result={}}) {
        return res.status(401).error({ errors, code, message, result });
    };

    res.internal = function({errors={}, code=500, message="", result={}}) {
        return res.status(500).error({ errors, code, message, result });
    };

    res.notfound = function({errors={}, code=404, message="", result={}}) {
        return res.status(404).error({ errors, code, message, result });
    };

    res.conflict = function({errors={}, code=409, message="", result={}}) {
        return res.status(409).error({ errors, code, message, result });
    };

    res.created = function ({result={}, code=201, message=""}) {
        return res.status(201).json({
            result,
            code,
            message
        });
    };

    next();
};

module.exports = { customResponsesMiddleware };
