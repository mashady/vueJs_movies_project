<template>
  <div class="auth-container">
    <div class="form-box">
      <input v-model="username" type="text" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button @click="login">LOGIN</button>
      <p>
        Don’t have an account?
        <router-link to="/register">Register</router-link>
      </p>
    </div>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <p>Invalid username or password</p>
        <button @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      showModal: false
    };
  },
  methods: {
    async login() {
  if (!this.username || !this.password) {
    this.showModal = true;
    return;
  }

  const res = await fetch(
    `http://localhost:3000/users?username=${this.username}&password=${this.password}`
  );
  const users = await res.json();

  if (users.length > 0) {
    localStorage.setItem('user', JSON.stringify(users[0]));
    window.location.href = '/';
  } else {
    this.showModal = true;
  }
}
,
    closeModal() {
      this.showModal = false;
    }
  }
}
</script>

<style scoped>
.auth-container {
  background: #151515;
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  font-size: 48px;
  margin-bottom: 30px;
  color: #a249f5;
}

.x {
  color: #ff2f92;
}

.form-box {
  display: flex;
  flex-direction: column;
  width: 280px;
}

input {
  margin-bottom: 10px;
  padding: 10px;
  background: #2a2a2a;
  border: 1px solid #444;
  color: white;
  outline: none;
  border-radius: 4px;
}
input::placeholder {
  color: #888;
}
input:focus {
  background-color: #2a2a2a;
  color: white;
}
input.is-invalid {
  border-color: #dc3545;
}
input.is-valid {
  border-color: #28a745;
}
.invalid-feedback {
  font-size: 12px;
  color: #dc3545;
  margin-bottom: 10px;
}

button {
  padding: 10px;
  background: linear-gradient(to right, #7f00ff, #e100ff);
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 10px;
}

p {
  font-size: 14px;
  text-align: center;
}

a {
  color: #e100ff;
  text-decoration: none;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background-color: #222;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  color: white;
  width: 300px;
}

.modal-content button {
  margin-top: 15px;
  background: #e100ff;
  padding: 8px 16px;
  border: none;
  color: white;
  cursor: pointer;
}
</style>
