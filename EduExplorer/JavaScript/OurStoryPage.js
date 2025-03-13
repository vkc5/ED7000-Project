//RegistrationForm
document.addEventListener("DOMContentLoaded", function () {
  const showRegistration = document.getElementById("showRegistration");
  const registrationForm = document.getElementById("registrationForm");
  const messageDiv = document.getElementById("message");
  const submitButton = registrationForm.querySelector('button[type="submit"]');
  const userNameElement = document.getElementById("userName");

  showRegistration.addEventListener("click", function (event) {
    event.preventDefault();
    registrationForm.style.display =
      registrationForm.style.display === "none" ? "block" : "none";
    //Call checkFormValidity() here to initially disable the button if fields are empty.
    checkFormValidity();
  });

  // Input field validation
  const inputFields = registrationForm.querySelectorAll(
    'input[type="text"], input[type="tel"], input[type="email"]'
  );
  inputFields.forEach((field) => {
    field.addEventListener("input", function () {
      validateField(this);
      checkFormValidity();
    });
  });

  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    messageDiv.textContent = "";

    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var email = document.getElementById("email").value;

    if (checkFormValidity()) {
      messageDiv.textContent = "Registration successful!";
      submitButton.style.backgroundColor = "lightgreen";
      messageDiv.style.color = "darkgreen";

      handleRegistrationSuccess(firstName, lastName);
    } else {
      messageDiv.style.color = "red";
    }
    // Remove the form
    var formContainer = document.getElementById("registrationForm");
    formContainer.style.display = "none";

    // Remove the icon
    var getStartedButton = document.getElementById("showRegistration");
    if (getStartedButton) {
      getStartedButton.style.display = "none";
    }
  });

  function validateField(field) {
    const isValid = validateInput(field);
    field.style.backgroundColor = isValid ? "white" : "lightcoral";
  }

  function validateInput(field) {
    const id = field.id;
    const value = field.value;
    let isValid = true;

    switch (id) {
      case "firstName":
      case "lastName":
        isValid = value.length >= 3; 
        break;
      case "phoneNumber":
        isValid = value.length === 8 && /^\d+$/.test(value); 
        break;
      case "email":
        isValid = value.includes("@"); 
        break;
    }
    return isValid;
  }

  function checkFormValidity() {
    const allValid = Array.from(inputFields).every(validateInput);
    submitButton.disabled = !allValid;
    submitButton.style.backgroundColor = allValid ? "lightgreen" : "grey";
    return allValid;
  }

  // Call checkExistingUser() on page load
  checkExistingUser();
});

function displayUserName(firstName, lastName) {
  var userNameElement = document.getElementById("userName");
  userNameElement.innerHTML =`Welcome, ${firstName} ${lastName}!`;
  userNameElement.style.display = "inline";
}

// Function to handle registration success and display welcome message
function handleRegistrationSuccess(firstName, lastName) {
  // Store user's name in local storage
  sessionStorage.setItem("firstName", firstName);
  sessionStorage.setItem("lastName", lastName);

  // Display the welcome message
  displayUserName(firstName, lastName);

  // Hide the registration form and icon
  registrationForm.style.display = "none";
  showRegistration.style.display = "none";
}

// Function to check for existing user and display welcome message on page load
function checkExistingUser() {
  const firstName = sessionStorage.getItem("firstName");
  const lastName = sessionStorage.getItem("lastName");
  if (firstName && lastName) {
    handleRegistrationSuccess(firstName, lastName); 
  }
}

document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');

    // Toggle the dropdown on click
    dropdownToggle.addEventListener('click', function (event) {
        event.preventDefault();
        dropdown.classList.toggle('open');
    });

    // Close the dropdown when clicking outside
    document.addEventListener('click', function (event) {
        if (!dropdown.contains(event.target) && dropdown.classList.contains('open')) {
            dropdown.classList.remove('open');
        }
    });
});
