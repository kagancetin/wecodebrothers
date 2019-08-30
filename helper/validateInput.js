const Joi = require('joi');

module.exports = {
    validateBody: (schema) => {
        return async (req, res, next) => {
            let pushSchema;
            let action = req.body.action;
            console.log(req.body);
            if (action) {
                pushSchema = schema[action];
            } else {
                pushSchema = schema;
            }

            await Joi.validate(req.body, pushSchema, (err, data) => {
                console.log("data:", data);
                if (err) {
                    res.status(201).json({
                        success: false,
                        error: validateError(err)
                    });

                    return
                } else {
                    if (!req.value) {
                        req.value = {};
                    }
                    if (!req.value['body']) {
                        req.value['body'] = {};
                    }

                    req.value['body'] = data;
                    next();
                }

            });

        }

    },


    schemas: {
        signinSchema: Joi.object().keys({
            username: Joi.string().required(),
            password: Joi.string().required()
        }),
        profileSchema: [
            Joi.object().keys({
                action: Joi.string().required(),
                name: Joi.string().required(),
                about: Joi.string().required(),
                author: Joi.string().required(),
                email: Joi.string().email().required(),
                profile_photo: [Joi.string().optional(),
                    Joi.allow(null)
                ],
                password: Joi.string().required()
            }),
            Joi.object().keys({
                action: Joi.string().required(),
                username: Joi.string().required(),
                password: Joi.string().required()
            }),
            Joi.object().keys({
                action: Joi.string().required(),
                password: Joi.string().required(),
                newpass: Joi.string().required(),
                checkpass: Joi.string().required()
            })
        ],
        userSchema: Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required()
        }),
        userOptinalSchema: Joi.object().keys({
            firstName: Joi.string(),
            lastName: Joi.string(),
            email: Joi.string().email()
        }),
        userCarSchema: Joi.object().keys({
            make: Joi.string().required(),
            model: Joi.string().required(),
            year: Joi.number().required()
        }),

        carSchema: Joi.object().keys({
            seller: Joi.string().regex(/^[0-9a-fA-f]{24}$/).required(),
            make: Joi.string().required(),
            model: Joi.string().required(),
            year: Joi.number().required()
        }),

        putCarSchema: Joi.object().keys({
            make: Joi.string().required(),
            model: Joi.string().required(),
            year: Joi.number().required()
        }),
        patchCarSchema: Joi.object().keys({
            make: Joi.string(),
            model: Joi.string(),
            year: Joi.number()
        }),
        idSchema: Joi.object().keys({
            param: Joi.string().regex(/^[0-9a-fA-f]{24}$/).required()
        })
    }
}

var validateError = function (error) {
    let result = {};
    switch (error.details[0].type.split(".")[1]) {
        case "email":
            result.errorText = "E-mail girmediniz ya da uygun formatta değil!"
            break;
        default:
            result.errorText = "Eksik ya da hatalı giriş yaptınız!"
            break;
    }
    console.log(error.details[0].type);
    result.errorPath = error.details[0].path[0];
    result.errorType = error.details[0].type;

    return result;
}

var valueBody

/*
validateParam: (schema, name) => {
        return (req, res, next) => {
            const result = Joi.validate({
                param: req['params'][name]
            }, schema);

            if (result.error) {
                //error happened
                return res.status(400).json(result.error);
            } else {

                if (!req.value)
                    req.value = {};
                if (!req.value['params'])
                    req.value['params'] = {};

                req.value['params'][name] = result.value.param;
                next();
            }
        }
    },
*/