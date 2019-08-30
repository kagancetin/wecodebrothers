var Blog = require("../../model/blog");
var Tag = require("../../model/tag");
var User = require("../../model/user");
var timeDate = require("../../helper/timedate");
module.exports = {
  getBlogs: async (req, res, next) => {
    var title = req.params.title ? { title: req.params.title } : {};
    Blog.find(title)
      .populate("author", "author")
      .populate("tag")
      .exec((err, rs) => {
        if (err) {
          res.status(200).json({
            error: "Blog cannot found.",
            success: false
          });
        } else {
          res.send({ data: rs });
        }
      });
  },
  postgetBlog: async (req, res, next) => {
    Blog.find({})
      .populate("author", "author")
      .populate("tag")
      .exec((err, rs) => {
        if (err) {
          res.status(200).json({
            error: "Blog cannot found.",
            success: false
          });
        } else {
          console.log("rs is: ", rs);
          res.send(rs);
        }
      });
  },
  addBlog: async (req, res, next) => {
    let tagIds = await getTags(req.body.tag);
    Blog({
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      author: req.session.myid,
      createdAt: timeDate.getNow(),
      tag: tagIds,
      thumbnail: req.body.thumbnail
    }).save((err, rs) => {
      if (err) {
        res.status(200).json({
          error: "Blog cannot created.",
          success: false
        });
      } else {
        addBlogToTags(rs._id, tagIds);
        addBlogToUsers(rs._id);
        res.status(200).json({
          success: true
        });
      }
    });
  },
  getBlogByTitle: async (req, res, next) => {
    Blog.find({ title: req.params.title }, (err, rs) => {
      if (err) {
        res.status(200).json({
          error: "Blog cannot found.",
          success: false
        });
      } else {
        res.status(200).json({
          data: rs,
          success: true
        });
      }
    });
  },
  getBlogPageByTitle: (req, res, next) => {
    Blog.find({ title: req.params.title }, (err, rs) => {
      if (err) {
      } else {
        if (rs != "") res.render("pages/post", { data: rs });
        else res.render("pages/404");
      }
    });
  },
  putBlogByTitle: async (req, res, next) => {
    console.log(req.body);
    let oldTagIds = await getTags(req.body.oldTags);
    let newTagIds = await getTags(req.body.tag);

    pullBlogFromTags(req.body._id, oldTagIds);
    addBlogToTags(req.body._id, newTagIds);
    const blog = {
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      author: req.body.author,
      createdAt: getTime(),
      tag: newTagIds,
      thumbnail: req.body.thumbnail
    };
    Blog.findOneAndReplace({ _id: req.body._id }, blog, (err, rs) => {
      if (err) {
        res.status(200).json({
          error: "Blog cannot modified.",
          success: false
        });
      } else {
        res.status(200).json({
          data: rs,
          success: true
        });
      }
    });
  },
  patchBlogByTitle: async (req, res, next) => {},
  deleteBlogByTitle: async (req, res, next) => {
    const { title } = req.params;
    const blog = await Blog.findOneAndDelete({ title: title });
    const oldTagIds = blog.tag;
    await pullBlogFromTags(blog._id, oldTagIds);
    pullBlogFromUsers(blog._id, blog.author);
    res.status(200).json({
      success: true
    });
  }
};
var pullBlogFromTags = async function(blogId, tags) {
  if (tags != "") {
    const result = await Tag.find(
      {
        _id: { $in: tags }
      },
      async function(err, data) {
        for (let i = 0; i < tags.length; i++) {
          data[i].blog.pull(blogId);
          data[i].save();
        }
      }
    );
  }
};
var pullBlogFromUsers = async function(blogId, author) {
  User.find(
    {
      author: author
    },
    err,
    data => {
      data.blog.pull(blogId);
      data.save();
    }
  );
};
var addBlogToTags = async (blogId, tags) => {
  if (tags != "") {
    await Tag.find(
      {
        _id: { $in: tags }
      },
      (err, data) => {
        for (let i = 0; i < tags.length; i++) {
          data[i].blog.push(blogId);
          data[i].save();
        }
      }
    );
  }
};
var addBlogToUsers = async blogId => {
  await User.find(
    {
      _id: req.session.myid
    },
    (err, data) => {
      data.blog.push(blogId);
      data.save();
    }
  );
};
//! Olmayan tag'i ekleme
var addTags = async function(tag) {
  const tags = Tag({
    name: tag
  });

  tags.save(function(err, rs) {
    if (err) throw err;
  });
  return tags._id;
};
//! Blogun yeni tag id'leri
var getTags = async function(tag) {
  var tagId = [];
  if (tag != "") {
    await Tag.find(
      {
        name: { $in: tag }
      },
      async function(err, names) {
        for (let i = 0; i < tag.length; i++) {
          if (compareTag(tag[i], names) == false) {
            tagId.push(await addTags(tag[i]));
          } else {
            tagId.push(names[i]._id);
          }
        }
      }
    );
  }
  return tagId; //?blogun Yeni tag idleri
};
function compareTag(name, names) {
  for (let i = 0; i < names.length; i++) {
    if (names[i].name == name) return true;
  }
  return false;
}
