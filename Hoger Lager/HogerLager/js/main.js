// Auteur: Dawid Kaprol 1M 

const nicknameInputField = document.querySelector('.nickname-input');
const submitButton = document.querySelector('.submit-button');
const ageConfirmTickBox = document.querySelector('.age-check');
const nicknameErrorField = document.querySelector('.nickname-error');

const loginWindow = document.querySelector('.login');
const gameWindow = document.querySelector('.game');

let nickname;

let playing = false;

function checkAge() {
    return ageConfirmTickBox.checked;
}

function getNickname() {
    return nicknameInputField.value;
}

function displayNicknameError(errMessage) {
    nicknameErrorField.innerHTML = errMessage;
}

function clearNicknameError() {
    nicknameErrorField.innerHTML = '';
}

function checkNickname(nickname) {
    return ((nickname.length != 0) && (nickname.length >= 4 && nickname.length < 9));
}
 

function login() {
    nickname = getNickname();
    const isOfAge = checkAge(); 
    if (isOfAge){
        if (checkNickname(nickname)) {
            clearNicknameError();
            loginWindow.style.display = 'none';
            gameWindow.style.display = 'block';
            initGame();
        } else {
            displayNicknameError('Your nickname has to be between 4 and 8 characters long!');
        }
    } else {
        displayNicknameError('You have to be 18 or older in order to play this game!');
    }
}

nicknameInputField.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        login();
    }
})

submitButton.addEventListener('click', login);