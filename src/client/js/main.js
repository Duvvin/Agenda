const API_BASE = '/api';

const apiStatusEl = document.getElementById('api-status');
const userForm = document.getElementById('user-form');
const userNameInput = document.getElementById('user-name');
const userEmailInput = document.getElementById('user-email');
const userListEl = document.getElementById('user-list');

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erro na requisição');
  }

  return data;
}

async function checkApiHealth() {
  try {
    const data = await fetchJson(`${API_BASE}/health`);
    apiStatusEl.textContent = data.message;
    apiStatusEl.className = 'success';
  } catch {
    apiStatusEl.textContent = 'API indisponível';
    apiStatusEl.className = 'error';
  }
}

async function loadUsers() {
  try {
    const { data: users } = await fetchJson(`${API_BASE}/users`);

    if (users.length === 0) {
      userListEl.innerHTML = '<li class="empty">Nenhum usuário cadastrado</li>';
      return;
    }

    userListEl.innerHTML = users
      .map(
        (user) =>
          `<li><strong>${user.name}</strong><br><span class="email">${user.email}</span></li>`
      )
      .join('');
  } catch (error) {
    userListEl.innerHTML = `<li class="empty">${error.message}</li>`;
  }
}

userForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = userNameInput.value.trim();
  const email = userEmailInput.value.trim();

  try {
    await fetchJson(`${API_BASE}/users`, {
      method: 'POST',
      body: JSON.stringify({ name, email }),
    });

    userNameInput.value = '';
    userEmailInput.value = '';
    await loadUsers();
  } catch (error) {
    alert(error.message);
  }
});

checkApiHealth();
loadUsers();
