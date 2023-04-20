// References

let userlink = document.getElementById('userlink');
let leaderboardlink = document.getElementById('leaderboardlink')
let signoutmainlink = document.getElementById('signoutmainlink');
var currentuser = null;

// Gets the username and checks to see if the user wants to be kept logged in or not

function getUsername() {
    let keepLoggedIn = localStorage.getItem("keepLoggedIn");

    if (keepLoggedIn == "yes") {
        currentuser = JSON.parse(localStorage.getItem('user'));
    }
    else {
        currentuser = JSON.parse(sessionStorage.getItem('user'));
    }
}

// When the "signOut" function gets called, the user is logged out and is redirected to the homepage

function signOut() {
    sessionStorage.removeItem('user');
    localStorage.removeItem('user');
    localStorage.removeItem('keepLoggedIn');
    window.location = "/CodeRacer/index.html";
}

// Loads Windows

// If the user is signed in, it will display the username under the profile icon
window.onload = function () {
    getUsername();
    if (currentuser != null) {
        userlink.innerText = currentuser.username;
        userlink.classList.replace("btn", "nav-link");
        userlink.classList.add("btn-primary");
        userlink.href = 'CodeRacer/profile/profile.html';
        link.href = 'style.css';
    }
}

// Allows the user to sign out from the homepage

var submitButton = document.getElementById('signoutmainlink');
    submitButton.addEventListener('click', function handleClick() {
        signoutmainlink.href = "javascript:signOut()";
});

const colorThemes = document.querySelectorAll('[name="theme"]');

// store theme
const storeTheme = function (theme) {
    localStorage.setItem("theme", theme);
};

// set theme when visitor returns
const setTheme = function () {
    const activeTheme = localStorage.getItem("theme");
    colorThemes.forEach((themeOption) => {
      if (themeOption.id === activeTheme) {
        themeOption.checked = true;
      }
    });
    // fallback for no :has() support
    document.documentElement.className = activeTheme;
};

colorThemes.forEach((themeOption) => {
    themeOption.addEventListener("click", () => {
      storeTheme(themeOption.id);
      // fallback for no :has() support
      document.documentElement.className = themeOption.id;
    });
});

document.onload = setTheme();
