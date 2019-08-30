var User = require("../model/user");

module.exports = {
  sessionCheck: async (req, res, next) => {
    //console.log("burda mısın:" + req.session.myid)
    if (req.session.myid) {
      next();
    } else {
      res.redirect("/admin/signin");
    }
  },
  sessionSave: async (req, res, next) => {
    console.log(req.value);
    var users;
    await User.find({
        username: req.value.body.username,
        password: req.value.body.password
      },
      function (err, data) {
        if (err) {
          console.log("Kullanıcı bulunamadı")
        } else {
          if (data.length != 1) {
            let result = {};
            result.errorPath = "username"
            result.errorType = "user not find";
            result.errorText = "Kullanıcı bulunamadı ya da hatalı giriş yaptınız!"
            res.status(202).json({
              success: false,
              error: result
            });
          } else {
            req.session.myid = data[0]._id;
            req.session.author = data[0].author;
            req.session.username = data[0].username;
            req.session.password = data[0].password;
            req.session.admin = data[0].admin;
            res.send(true);
          }
        }
      }
    );
  },
  sessionKill: async (req, res, next) => {
    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
      }
    });
    res.send(true);
  },
  sessionCheckPost: async (req, res, next) => {
    //console.log("burda mısın:" + req.session.myid)
    if (req.session.myid) {
      res.send("Admin panelini kullan artık");
    } else {
      res.send("Hack mi bu?");
    }
  }
};