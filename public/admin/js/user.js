var action;

var getUserforProfile = function (username) {
  var inputs = {
    name: document.getElementById("name"),
    about: document.getElementById("about"),
    author: document.getElementById("author"),
    email: document.getElementById("email"),
    profile_photo: document.getElementById("profile_photo"),
    username: document.getElementById("inputUsername")
  };

  $.ajax({
    type: "POST",
    url: "/user/" + username,
    success: function (res) {
      inputs.name.value = res.name;
      inputs.about.value = res.about;
      inputs.author.value = res.author;
      inputs.email.value = res.email;
      inputs.username.value = res.username;
    },
    dataType: "json"
  });
};

var patchUserforProfile = function (username) {
  var inputs = {
    name: document.getElementById("name"),
    about: document.getElementById("about"),
    author: document.getElementById("author"),
    email: document.getElementById("email"),
    profile_photo: document.getElementById("profile_photo"),
    username: document.getElementById("inputUsername"),
    password: document.getElementById("password"),
    newpass: document.getElementById("newpass"),
    checkpass: document.getElementById("checkpass")
  };
  var data;
  switch (action) {
    case 0:
      data = {
        action: 0,
        name: inputs.name.value,
        about: inputs.about.value,
        author: inputs.author.value,
        email: inputs.email.value,
        profile_photo: inputs.profile_photo.value,
        password: inputs.password.value
      };
      break;
    case 1:
      data = {
        action: 1,
        username: inputs.username.value,
        password: inputs.password.value
      };
      break;
    case 2:
      data = {
        action: 2,
        password: inputs.password.value,
        newpass: inputs.newpass.value,
        checkpass: inputs.checkpass.value
      };
      break;
    default:
      // code block
  }
  $.ajax({
    type: "PATCH",
    url: "/user/" + username,
    data: data,
    success: function (res, textStatus, jqXHR) {
      const status = jqXHR.status;
      if (res.success == true) {
        removeMessage();
        var successMessage = document.getElementById("successMessage")
        successMessage.style.display = "block";
        successMessage.innerHTML = "Bilgileriniz güncellendi.";
        pullBorderInput();
      } else if (res.success == false) {
        removeMessage();
        if (status == "201") {
          pullBorderInput();
          pushBorderInput(res.error.errorPath);
          var errorMessage = document.getElementById("errorMessage")
          errorMessage.style.display = "block";
          errorMessage.innerHTML = res.error.errorText;
        } else {
          var errorMessage = document.getElementById("errorMessage")
          errorMessage.style.display = "block";
          errorMessage.innerHTML = res.error;
        }



      }
    },
    dataType: "json"
  });
};

var pushBorderInput = function (id) {
  var errorInput = document.getElementById(id);
  errorInput.classList.add("border-bottom-warning");
  errorInput.focus();
}

var pullBorderInput = function () {
  var oldErrorInput = document.getElementsByClassName("border-bottom-warning");
  for (i = 0; i < oldErrorInput.length; i++) {
    oldErrorInput[i].classList.remove("border-bottom-warning");
  }
}

var removeMessage = function () {
  var errorMessage = document.getElementById("errorMessage");
  var successMessage = document.getElementById("successMessage");
  errorMessage.style.display = "none";
  successMessage.style.display = "none";
}