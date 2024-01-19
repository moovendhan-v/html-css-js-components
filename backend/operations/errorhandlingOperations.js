function jsonStatus({ errorStatus = false, statusCode = "", message = '', response = null, count = 0 }) {
    const data = { error: errorStatus, statusCode: statusCode, message: message, response: response, count: count };
    return data;
}

function jsonStatusSuccess({ errorStatus = false, statusCode = 200, message = '', response = null, count = 0 }) {
    const data = { error: errorStatus, statusCode: statusCode, message: message, response: response, count: count };
    return data;
}

function jsonStatusError({ errorStatus = true, statusCode = "", message = '', response = null, count = 0 }) {
    const data = { error: errorStatus, statusCode: statusCode, message: message, response: response, count: count };
    return data;
}

module.exports = {jsonStatus , jsonStatusSuccess, jsonStatusError};
