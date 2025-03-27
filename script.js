function showForm(formType) {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const sessionUser = JSON.parse(localStorage.getItem("questifyCurrentUser"));
  if (sessionUser && window.location.pathname.includes("index.html")) {
    window.location.href = "home.html";
  }

  if (formType === "login") {
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
  } else {
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
  }
}

function getUsers() {
  const users = localStorage.getItem("questifyUsers");
  return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
  localStorage.setItem("questifyUsers", JSON.stringify(users));
}

function handleSignup(event) {
  event.preventDefault();
  const inputs = event.target.elements;
  const username = inputs[0].value.trim();
  const email = inputs[1].value.trim();
  const password = inputs[2].value;
  const confirmPassword = inputs[3].value;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  let users = getUsers();

  const existingUser = users.find(
    user => user.email.toLowerCase() === email.toLowerCase()
  );
  if (existingUser) {
    alert("An account with this email already exists.");
    return;
  }

  const newUser = { username, email: email.toLowerCase(), password };
  users.push(newUser);
  saveUsers(users);
  localStorage.setItem("questifyCurrentUser", JSON.stringify(newUser));
  window.location.href = "home.html";
}

function handleLogin(event) {
  event.preventDefault();
  const inputs = event.target.elements;
  const email = inputs[0].value.trim().toLowerCase();
  const password = inputs[1].value;

  const users = getUsers();

  const foundUser = users.find(
    user => user.email === email && user.password === password
  );

  if (foundUser) {
    alert("Login successful! Welcome, " + foundUser.username + " 🎉");
    localStorage.setItem("questifyCurrentUser", JSON.stringify(foundUser));
    window.location.href = "home.html";
  } else {
    alert("Incorrect email or password.");
  }
}

// Live password match check
const passwordInput = document.getElementById("signup-password");
const confirmInput = document.getElementById("confirm-password");
const errorText = document.getElementById("password-error");

if (passwordInput && confirmInput && errorText) {
  const checkMatch = () => {
    const match = passwordInput.value === confirmInput.value;
    errorText.classList.toggle("hidden", match);
  };

  passwordInput.addEventListener("input", checkMatch);
  confirmInput.addEventListener("input", checkMatch);
}
