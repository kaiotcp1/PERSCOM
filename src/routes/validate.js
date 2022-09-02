const Joi = require('joi');

const ebValidate = (data) => {
    
    const Schema = Joi.object({
        name: Joi.string().required().min(4).max(30),
        patent: Joi.string().required().min(4).max(30),
        squad: Joi.string().required().min(4).max(30),
        weapon: Joi.string().required().min(4).max(50),
        status: Joi.string().required().min(4).max(30),
        steam: Joi.string().min(4)
    })
    return Schema.validate(data)
};

module.exports.ebValidate = ebValidate;