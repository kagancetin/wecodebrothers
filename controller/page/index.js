module.exports = {

    index: async (req, res, next) => {
        res.render('page/index');
    },
    about: async (req, res, next) => {
        res.render('page/about');
    },
    contact: async (req, res, next) => {
        res.render('page/contact');
    },
    post: async (req, res, next) => {
        res.render('page/post');
    }
}