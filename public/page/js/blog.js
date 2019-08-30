var blog;
var blogAdd = function() {
  var data = {
    title: $("#blogTitle").val(),
    description: $("#blogDescription").val(),
    content: CKEDITOR.instances.blogContent.getData(),
    author: "eng",
    tag: $("#blogTag")
      .val()
      .split(","),
    thumbnail: $("#blogThumbnail").val()
  };
  $.ajax({
    type: "POST",
    url: "/blog",
    data: data,
    success: function(res) {},
    dataType: "json"
  });
};
var blogs = function() {
  $.ajax({
    type: "GET",
    url: "/blog",
    success: function(res) {
      blog = res;
      for (let i = 0; i < res.length; i++) {
        document.getElementById("blogTable").innerHTML +=
          "<tr>\
      <td>" +
          res[i].author +
          "</td>\
      <td>" +
          res[i].title +
          '</td>\
      <td><img style="height:50px;" src="/admin/img/undraw_posting_photo.svg" alt="resim" /></td>\
      <td>\
        <a href="#" class="btn btn-info btn-circle">\
          <i class="fas fa-info-circle"></i>\
        </a>\
        <a href="#" onclick="openNav(\'' +
          i +
          '\');"class="btn btn-warning btn-circle">\
          <i class="fas fa-exclamation-triangle"></i>\
        </a>\
        <a href="#" onclick="deleteBlog(\'' +
          res[i].title +
          '\')" class="btn btn-danger btn-circle">\
          <i class="fas fa-trash"></i>\
        </a>\
      </td>\
    </tr>';
      }
    },
    dataType: "json"
  });
};

var updateBlog = function(id, tags) {
  console.log("anan");
  var data = {
    _id: id,
    title: $("#blogTitle").val(),
    description: $("#blogDescription").val(),
    content: CKEDITOR.instances.blogContent.getData(),
    author: "eng",
    tag: $("#blogTag")
      .val()
      .split(","),
    thumbnail: $("#blogThumbnail").val(),
    oldTags: tags.split(",")
  };

  $.ajax({
    type: "PUT",
    url: "/blog/" + data.title,
    data: data,
    success: function(res) {
      alert("ANANDINIZ");
    },
    dataType: "json"
  });
};
function deleteBlog(title) {
  console.log(title);

  $.ajax({
    type: "DELETE",
    url: "/blog/" + title,
    success: function(res) {
      alert("silindi");
    },
    dataType: "json"
  });
}

//! modal
/* Open */

function openNav(blogIndex) {
  var str = "";
  blog[blogIndex].tag.forEach(tag => {
    str += tag.name + ",";
  });
  str = str.slice(0, -1);
  $("#blogUpdate").attr(
    "onclick",
    "updateBlog('" + blog[blogIndex]._id + "','" + str + "');"
  );
  $("#blogDescription").val(blog[blogIndex].description);
  $("#blogTitle").val(blog[blogIndex].title);
  CKEDITOR.instances.blogContent.setData(blog[blogIndex].content);

  $("#blogTag").val(str);

  document.getElementById("myNav").style.display = "block";
}

/* Close */
function closeNav() {
  document.getElementById("myNav").style.display = "none";
}
