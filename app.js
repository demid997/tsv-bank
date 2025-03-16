// Firebase конфигурация
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.getElementById('login').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('cardSection').style.display = 'block';
        })
        .catch((error) => {
            alert('Ошибка при входе: ' + error.message);
        });
});

document.getElementById('generateCardButton').addEventListener('click', () => {
    const cardNumber = generateCardNumber();
    document.getElementById('cardNumber').innerText = "Ваша карта: " + cardNumber;
    document.getElementById('downloadCardButton').style.display = 'block';
});

document.getElementById('downloadCardButton').addEventListener('click', () => {
    const cardNumber = document.getElementById('cardNumber').innerText.split(": ")[1];
    const cardBlob = new Blob([cardNumber], { type: 'text/plain' });
    const url = URL.createObjectURL(cardBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'card.txt';
    a.click();
});

function generateCardNumber() {
    return "4000 " + Math.floor(1000 + Math.random() * 9000) + " " +
           Math.floor(1000 + Math.random() * 9000) + " " +
           Math.floor(1000 + Math.random() * 9000);
}
