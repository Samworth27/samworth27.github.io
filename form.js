// Contact Form

const form = document.getElementById("contact-form");
let nameElement = form.querySelector("#name");
let emailElement = form.querySelector("#email");
let subjectElement = form.querySelector("#subject");
let messageElement = form.querySelector("#message");

const isRequired = (value) => (value === "" ? false : true);

const isEmailValid = (email) => {
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const showError = (input, message) => {
  let fieldset = input.parentElement;
  let inputElement = fieldset.querySelector("input, textarea");
  // add the error class
  inputElement.classList.remove(
    "bg-gray-400/25",
    "border-black",
    "bg-green-700/25",
    "border-green-700"
  );
  inputElement.classList.add("bg-red-700/25", "border-red-700");

  // show the error message
  let errorElement = fieldset.querySelector("span");
  errorElement.textContent = message;
};

const showSuccess = (input) => {
  // get the form-field element
  let fieldset = input.parentElement;
  let inputElement = fieldset.querySelector("input, textarea");

  // remove the error class
  inputElement.classList.remove(
    "bg-gray-400/25",
    "border-black",
    "bg-red-700/25",
    "border-red-700"
  );
  inputElement.classList.add("bg-green-700/25", "border-green-700");

  // hide the error message
  let errorElement = fieldset.querySelector("span");
  errorElement.textContent = "";
};

// Input Functions
const checkName = () => {
  let valid = false;
  const valueName = nameElement.value.trim();
  if (!isRequired(valueName)) {
    showError(nameElement, "\xa0\xa0 * Name cannot be empty");
  } else {
    showSuccess(nameElement);
    valid = true;
  }
  return valid;
};

const checkEmail = () => {
  let valid = false;
  const valueEmail = emailElement.value.trim();
  if (!isRequired(valueEmail)) {
    showError(emailElement, "\xa0\xa0 * Email cannot be empty");
  } else if (!isEmailValid(valueEmail)) {
    showError(emailElement, "\xa0\xa0  * Email not valid");
  } else {
    showSuccess(emailElement);
    valid = true;
  }
  return valid;
};

const checkSubject = () => {
  let valid = false;
  const valueSubject = subjectElement.value.trim();
  if (!isRequired(valueSubject)) {
    showError(subjectElement, "\xa0\xa0 * Subject cannot be empty");
  } else {
    showSuccess(subjectElement);
    valid = true;
  }
  return valid;
};

const checkMessage = () => {
  let valid = false;
  const valueMessage = messageElement.value.trim();
  if (!isRequired(valueMessage)) {
    showError(messageElement, "\xa0\xa0 * Message cannot be empty");
  } else {
    showSuccess(messageElement);
    valid = true;
  }
  return valid;
};

async function handleSubmit(event) {
  event.preventDefault();
  let isNameValid = checkName(),
    isEmailValid = checkEmail(),
    isSubjectValid = checkSubject(),
    isMessageValid = checkMessage();

  let isFormValid =
    isNameValid && isEmailValid && isSubjectValid && isMessageValid;

  if (isFormValid) {
    var data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          form.innerHTML = "Thanks, your message was sent successfully";
        } else {
          form.reset();
          form.innerHTML = "There was an error sending your message, please try again";
        }
      })
      .catch((error) => {
        form.innerHTML = "Something's gone wrong. Please email your message to sam@xxvii.dev";
      });
  }
}

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "name":
        checkName();
        break;
      case "email":
        checkEmail();
        break;
      case "subject":
        checkSubject();
        break;

      case "message":
        checkMessage();
        break;
    }
  })
);

form.addEventListener("onautocomplete", (e) => {
  let id = e.target.id;
  let clone = e.target.cloneNode(true);
  let parent = e.target.parentNode;
  e.target.remove();
  parent.appendChild(clone);
  console.log(id);
  switch (id) {
    case "name":
      nameElement = clone;
      checkName();
      break;
    case "email":
      emailElement = clone;
      checkEmail();
      break;
    case "subject":
      subjectElement = clone;
      checkSubject();
      break;
    case "message":
      messageElement = clone;
      checkSubject();
      break;
  }
});

form.addEventListener("submit", handleSubmit);
