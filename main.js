const wrapper = document.querySelector('main');
const loggedInText = document.querySelector('#logged-in-text');
const loginLogoutBtn = document.querySelector('#login-logout-btn');

loginLogoutBtn.addEventListener("click", () => {
    console.log(getCookie('isLoggedIn'));
    // on btn click
    if (getCookie('isLoggedIn') != null) {
        deleteCookie('isLoggedIn');
        logout();
    } else {
        setCookie('isLoggedIn', true, 5);
        login();
    }
});


setLoginLogoutState();
function setLoginLogoutState() {
    if (getCookie('isLoggedIn') != null) {
        login();
    } else {
        logout();
    }
}


function login() {
    loggedInText.textContent = 'Logged in :)';
    loginLogoutBtn.textContent = 'Logout';

    wrapper.classList.add("loggedin");
}
function logout() {
    loggedInText.textContent = 'Logged out :(';
    loginLogoutBtn.textContent = 'Login';
    
    wrapper.classList.remove("loggedin");
}



// Cookie functions
function setCookie(name, value, minutesToLive){
    const date = new Date();
    date.setTime(date.getTime() +  (minutesToLive * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`
}
function deleteCookie(name){
    setCookie(name, null, null);
}
function getCookie(name){
    const cDecoded = decodeURIComponent(document.cookie);
    const cArray = cDecoded.split("; ");
    let result = null;
    
    cArray.forEach(element => {
        if(element.indexOf(name) == 0){
            result = element.substring(name.length + 1)
        }
    })
    return result;
}

listenCookieChange(()=> {
    // some cookie changed
    setLoginLogoutState();
}, 1000);
function listenCookieChange(callback, interval = 1000) {
    let lastCookie = document.cookie;
    setInterval(()=> {
        let cookie = document.cookie;
        if (cookie !== lastCookie) {
            try {
                callback();
            } finally {
                lastCookie = cookie;
            }
        }
    }, interval);
}
