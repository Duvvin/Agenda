const senhaInput = document.getElementById('senha');

const lengthRule = document.getElementById('length');
const uppercaseRule = document.getElementById('uppercase');
const lowercaseRule = document.getElementById('lowercase');
const numberRule = document.getElementById('number');
const specialRule = document.getElementById('special');

senhaInput.addEventListener('input', () => {
    const senha = senhaInput.value;

    updateRule(lengthRule, senha.length >= 8);
    updateRule(uppercaseRule, /[A-Z]/.test(senha));
    updateRule(lowercaseRule, /[a-z]/.test(senha));
    updateRule(numberRule, /\d/.test(senha));
    updateRule(specialRule, /[!@#$%^&*()_\-+=]/.test(senha));
});

function updateRule(element, valid) {
    if (valid) {
        element.classList.remove('invalid');
        element.classList.add('valid');
        element.textContent = element.textContent.replace('✗', '✓');
    } else {
        element.classList.remove('valid');
        element.classList.add('invalid');
        element.textContent = element.textContent.replace('✓', '✗');
    }
}