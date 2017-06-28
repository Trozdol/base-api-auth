// BASE JSON RESPONSE OBJECT:
//
module.exports = {

    base : {
        code: null,
        message: null,
        success: true,
        data: []
    },

    statusCodes : {
        123: { code: '123', message: 'Value Too Short' },
        200: { code: '200', message: 'OK' },
        202: { code: '202', message: 'Accepted' },
        204: { code: '204', message: 'No Content' },
        225: { code: '225', message: 'Password Lacks a Letter, Number, or Puncuation Character.' },
        226: { code: '226', message: 'Passwords Do Not Match.' },
        227: { code: '227', message: 'Password Cannot be One of Last Five Passwords.' },
        403: { code: '403', message: 'Forbidden' },
        404: { code: '404', message: 'Not Found' },
        409: { code: '409', message: 'Conflict' }
    }
};
