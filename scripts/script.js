// 定義語言
let pwdLol = "Password Strength: This is too weak for hackers to break into!"
let pwdWeak = "Password Strength: This is weak, but it's better than nothing!"
let letpwdStrong = "Password Strength: This is strong, but it can be stronger!"
let pwdGood = "Password Strength: This is good, not easy to be hacked"
let pwdAwesome = "Password Strength: Awesome, this can't be hacked at all, right?"
let lang = "en"
let errorMessage = "Error: Please select at least one character type."

// 定義網頁物件
const labelUppercase = document.querySelector('label[for="includeUppercase"]');
const labelLowercase = document.querySelector('label[for="includeLowercase"]');
const labelNumbers = document.querySelector('label[for="includeNumbers"]');
const labelCommonSymbols = document.querySelector('label[for="includeCommonSymbols"]');
const labelRareSymbols = document.querySelector('label[for="includeRareSymbols"]');
// 按鈕
const generateButton = document.getElementById('generateButton');
const copyButton = document.getElementById('copyButton');
const languageButton = document.getElementById('languageDropdown');

// 生成密碼
document.getElementById('generateButton').addEventListener('click', function() {
    const passwordLength = parseInt(document.getElementById('passwordLength').value);
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeCommonSymbols = document.getElementById('includeCommonSymbols').checked;
    const includeRareSymbols = document.getElementById('includeRareSymbols').checked;

    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const commonSymbols = '!@#$%^&*()_+[]{}|;:,.<>?';
    const rareSymbols = '`~\'"\\/=-';

    let validChars = '';

    if (includeUppercase) {
        validChars += uppercaseLetters;
    }
    if (includeLowercase) {
        validChars += lowercaseLetters;
    }
    if (includeNumbers) {
        validChars += numbers;
    }
    if (includeCommonSymbols) {
        validChars += commonSymbols;
    }
    if (includeRareSymbols) {
        validChars += rareSymbols;
    }

    let generatedPassword = '';

    if (validChars.length === 0) {
        alert(errorMessage);
        return;
    }

    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * validChars.length);
        generatedPassword += validChars[randomIndex];
    }

    document.getElementById('generatedPassword').textContent = generatedPassword;
    updateProgressBar();
});

// 複製密碼
document.getElementById('copyButton').addEventListener('click', function() {
    const generatedPasswordElement = document.getElementById('generatedPassword');
    const password = generatedPasswordElement.textContent;

    if (password) {
        const textarea = document.createElement('textarea');
        textarea.value = password;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
});

// 密碼分數
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');

function updateProgressBar() {
    const generatedPasswordElement = document.getElementById('generatedPassword');
    const password = generatedPasswordElement.textContent;

    // 将密码长度设置为passwordLength的值
    const passwordLength = password.length;
    document.getElementById('passwordLength').value = passwordLength;

    // 检测大小写和符号列表
    const includeUppercase = /[A-Z]/.test(password);
    const includeLowercase = /[a-z]/.test(password);
    const includeNumbers = /[0-9]/.test(password);
    const includeCommonSymbols = /[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password);
    const includeRareSymbols = /[`~'"\\/-]/.test(password);

    // 更新复选框状态
    document.getElementById('includeUppercase').checked = includeUppercase;
    document.getElementById('includeLowercase').checked = includeLowercase;
    document.getElementById('includeNumbers').checked = includeNumbers;
    document.getElementById('includeCommonSymbols').checked = includeCommonSymbols;
    document.getElementById('includeRareSymbols').checked = includeRareSymbols;

    // 计算密码分数
    let score = 0;

    // 长度部分
    if (passwordLength >= 6) score += 10;
    if (passwordLength > 8) score += 5;
    if (passwordLength > 10) score += 20;

    // 文本部分
    if (includeUppercase) score += 10;
    if (includeLowercase) score += 10;
    if (includeNumbers) score += 10;
    if (includeCommonSymbols) score += 10;
    if (includeRareSymbols) score += 10;

    // 底分
    score += 20;

    if (score >= 100) score = 100;
    // 更新进度条
    progressBar.style.width = `${score}%`;
    if (score <= 20) {
        progressBar.classList.remove('bg-warning', 'bg-info', 'bg-success');
        progressBar.classList.add('bg-danger');
        passwordStrength.textContent = pwdLol;
    } else if (score <= 40) {
        progressBar.classList.remove('bg-danger', 'bg-info', 'bg-success');
        progressBar.classList.add('bg-warning');
        passwordStrength.textContent = pwdWeak;
    } else if (score <= 60) {
        progressBar.classList.remove('bg-danger', 'bg-warning', 'bg-success');
        progressBar.classList.add('bg-info');
        passwordStrength.textContent = pwdStrong;
    } else if (score <= 80) {
        progressBar.classList.remove('bg-danger', 'bg-warning', 'bg-info');
        progressBar.classList.add('bg-success');
        passwordStrength.textContent = pwdGood;
    } else if (score >= 80) {
        progressBar.classList.remove('bg-danger', 'bg-warning', 'bg-info');
        progressBar.classList.add('bg-success');
        passwordStrength.textContent = pwdAwesome;
    }

    progressText.textContent = `${score}%`;
};

// 重置所有内容
function resetAllThing() {
    const generatedPasswordElement = document.getElementById('generatedPassword');
    const generatedPassword = generatedPasswordElement.textContent;

    if (generatedPassword.trim() !== '') {
        updateProgressBar();
    }
}


document.getElementById('switchToChinese').addEventListener('click', function() {
    // 更新页面内容为中文
    lang = "zh-tw"
    pwdLol = "密碼強度：這太弱了，駭客可以破解！"
    pwdWeak = "密碼強度：這很弱，但總比沒有好！"
    pwdStrong = "密碼強度：這很強，但可以更強！"
    pwdGood = "密碼強度：這很好，不容易被駭客破解"
    pwdAwesome = "密碼強度：太棒了，這根本無法被破解，對吧？"
    // 設定勾選框與頁面元素的語言
    labelUppercase.textContent = "包含大寫字母";
    labelLowercase.textContent = "包含小寫字母";
    labelNumbers.textContent = "包含數字";
    labelCommonSymbols.textContent = "包含常用符號";
    labelRareSymbols.textContent = "包含罕見符號";
    generateButton.textContent = "生成密碼";
    copyButton.textContent = "複製密碼";
    languageButton.textContent = "切換語言";
    errorMessage = "錯誤！\n密碼長度必須介於6到20之間";
    // 重置所有内容
    resetAllThing();
});

document.getElementById('switchToEnglish').addEventListener('click', function() {
    // 更新页面内容为英文
    lang = "en"
    pwdLol = "Password Strength: This is too weak for hackers to break into!"
    pwdWeak = "Password Strength: This is weak, but it's better than nothing!"
    pwdStrong = "Password Strength: This is strong, but it can be stronger!"
    pwdGood = "Password Strength: This is good, not easy to be hacked"
    pwdAwesome = "Password Strength: Awesome, this can't be hacked at all, right?"
    // 設定勾選框與頁面元素的語言
    labelUppercase.textContent = "Include Uppercase Letters";
    labelLowercase.textContent = "Include Lowercase Letters";
    labelNumbers.textContent = "Include Numbers";
    labelCommonSymbols.textContent = "Include Common Symbols";
    labelRareSymbols.textContent = "Include Rare Symbols";
    generateButton.textContent = "Generate Password";
    copyButton.textContent = "Copy Password";
    languageButton.textContent = "Language";
    errorMessage = "Error:\nPlease select at least one character type."
    // 重置所有内容
    resetAllThing();
});