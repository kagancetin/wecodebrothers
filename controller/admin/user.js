const User = require('../../model/user');

module.exports = {
    getUser: (req, res, next) => {
        User.find({
                username: req.params.username
            }, {
                password: false
            },
            function (err, rs) {
                if (err) throw err;
                res.send({
                    data: rs[0]
                });
            }
        );
    },
    getUsers: (req, res, next) => {
        User.find({}, {
                password: false
            },
            function (err, rs) {
                if (err) throw err;
                res.send({
                    data: rs
                });
            }
        );
    },
    addUsers: (req, res, next) => {

    },
    updateUser: (req, res, next) => {

    },
    updateUserProfile: async (req, res, next) => {
        const username = req.params;

        var data;
        console.log("valubody:", req.value.body);
        if (req.body.password == req.session.password) {
            switch (req.body.action) {
                case "0":
                    data = {
                        name: req.body.name,
                        about: req.body.about,
                        author: req.body.author,
                        email: req.body.email,
                        profile_photo: req.body.profile_photo
                    };
                    break;
                case "1":
                    req.session.username = req.body.username;
                    data = {
                        username: req.body.username
                    };
                    break;
                case "2":
                    if (req.body.newpass == req.body.checkpass) {
                        req.session.password = req.body.newpass;
                        data = {
                            password: req.body.newpass
                        };
                    } else {
                        res.status(202).json({
                            success: false,
                            error: "Yeni şifreleriniz aynı değil!"
                        });
                    }

                    break;
                default:
                    // code block
            }
            await User.findOneAndUpdate(username, data, (err, rs) => {
                if (err) {
                    res.status(202).json({
                        success: true,
                        error: "Veritabanı hatası"
                    });
                } else {
                    res.status(200).json({
                        success: true
                    });
                }
            });
        } else {
            res.status(202).json({
                success: false,
                error: "Şifreniz Hatalı!"
            });
        }
    },
    deleteUser: (req, res, next) => {

    }
};