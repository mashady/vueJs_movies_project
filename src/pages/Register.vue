<template>
  <div class="auth-container">
    <h1 class="logo">FLO<span class="x">X</span></h1>
    <div class="form-box">
      <input v-model="username" type="text" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="firstName" type="text" placeholder="First Name" />
      <input v-model="lastName" type="text" placeholder="Last Name" />
      <button @click="register">REGISTER</button>
      <p>
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: ''
    };
  },
  methods: {
    async register() {
      const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      });
      if (res.ok) {
        this.$router.push('/login');
      } else {
        alert('Failed to register');
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
