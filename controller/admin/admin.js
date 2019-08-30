var Tag = require("../../model/tag");

module.exports = {
    getDashboard: (req, res, next) => {
        var data = {
            author: req.session.author,
            username: author = req.session.username,
            admin: req.session.admin
        }
        res.render('admin/dashboard', {
            data: data
        });
    },
    goDashboard: (req, res, next) => {
        res.redirect('/admin/dashboard');
    },
    getSignIn: (req, res, next) => {
        res.render('admin/signin');
    },
    goSignIn: (req, res, next) => {
        res.redirect('/admin/signin');
    },
    getForgot: (req, res, next) => {
        res.render('admin/forgot-password');
    },
    getBlogs: (req, res, next) => {
        var data = {
            author: req.session.author,
            username: author = req.session.username,
            admin: req.session.admin
        }
        res.render('admin/blogs', {
            data: data
        });
    },
    getBlogAdd: (req, res, next) => {
        var data = {
            author: req.session.author,
            username: author = req.session.username,
            admin: req.session.admin
        }
        res.render('admin/blogadd', {
            data: data
        });
    },
    getImages: (req, res, next) => {
        var data = {
            author: req.session.author,
            username: author = req.session.username,
            admin: req.session.admin
        }
        res.render('admin/images', {
            data: data
        });
    },
    getProfile: (req, res, next) => {
        var data = {
            author: req.session.author,
            username: author = req.session.username,
            admin: req.session.admin
        }
        res.render('admin/profile', {
            data: data
        });
    },
    getpagesIndex: (req, res, next) => {
        var data = {
            author: req.session.author,
            username: author = req.session.username,
            admin: req.session.admin
        }
        res.render('admin/pagesIndex', {
            data: data
        });
    },
    getpagesAbout: (req, res, next) => {
        var data = {
            author: req.session.author,
            username: author = req.session.username,
            admin: req.session.admin
        }
        res.render('admin/pagesAbout', {
            data: data
        });
    },
    getpagesContact: (req, res, next) => {
        var data = {
            author: req.session.author,
            username: author = req.session.username,
            admin: req.session.admin
        }
        res.render('admin/pagesContact', {
            data: data
        });
    },
    getpagesBlog: (req, res, next) => {
        var data = {
            author: req.session.author,
            username: author = req.session.username,
            admin: req.session.admin
        }
        res.render('admin/pagesBlog', {
            data: data
        });
    },
    getpagesWorks: (req, res, next) => {
        var data = {
            author: req.session.author,
            username: author = req.session.username,
            admin: req.session.admin
        }
        res.render('admin/pagesWorks', {
            data: data
        });
    },
    getUserSettings: (req, res, next) => {
        var data = {
            author: req.session.author,
            username: author = req.session.username,
            admin: req.session.admin
        }
        res.render('admin/userSettings', {
            data: data
        });
    }
};