<template>
  <div class="auth-container">
    <h1 class="logo">FLO<span class="x">X</span></h1>
    <div class="form-box">
      <input v-model="username" type="text" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button @click="login">LOGIN</button>
      <p>
        Don’t have an account?
        <router-link to="/register">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      const res = await fetch(
        `http://localhost:3000/users?username=${this.username}&password=${this.password}`
      );
      const users = await res.json();
      if (users.length > 0) {
        localStorage.setItem('user', JSON.stringify(users[0]));
        window.location.href = '/'

      } else {
        alert('Invalid username or password');
      }
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
  margin-bottom: 15px;
  padding: 10px;
  background: #2a2a2a;
  border: none;
  color: white;
  outline: none;
}
button {
  padding: 10px;
  background: linear-gradient(to right, #7f00ff, #e100ff);
  border: none;
  color: white;
  cursor: pointer;
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
</style>
