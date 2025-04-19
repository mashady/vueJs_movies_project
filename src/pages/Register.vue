<template>
  <div class="auth-container">
    <div class="form-box needs-validation" novalidate>
      <input
        v-model="username"
        :class="['form-control', validation.username === false ? 'is-invalid' : validation.username === true ? 'is-valid' : '']"
        type="text"
        placeholder="Username"
        @blur="validateField('username')"
      />
      <div v-if="validation.username === false" class="invalid-feedback">
        Username is required.
      </div>

      <input
        v-model="password"
        :class="['form-control', validation.password === false ? 'is-invalid' : validation.password === true ? 'is-valid' : '']"
        type="password"
        placeholder="Password"
        @blur="validateField('password')"
      />
      <div v-if="validation.password === false" class="invalid-feedback">
        Password must be at least 6 characters.
      </div>

      <input
        v-model="email"
        :class="['form-control', validation.email === false ? 'is-invalid' : validation.email === true ? 'is-valid' : '']"
        type="email"
        placeholder="Email"
        @blur="validateField('email')"
      />
      <div v-if="validation.email === false" class="invalid-feedback">
        Enter a valid email address.
      </div>

      <input
        v-model="firstName"
        :class="['form-control', validation.firstName === false ? 'is-invalid' : validation.firstName === true ? 'is-valid' : '']"
        type="text"
        placeholder="First Name"
        @blur="validateField('firstName')"
      />
      <div v-if="validation.firstName === false" class="invalid-feedback">
        First name is required.
      </div>

      <input
        v-model="lastName"
        :class="['form-control', validation.lastName === false ? 'is-invalid' : validation.lastName === true ? 'is-valid' : '']"
        type="text"
        placeholder="Last Name"
        @blur="validateField('lastName')"
      />
      <div v-if="validation.lastName === false" class="invalid-feedback">
        Last name is required.
      </div>

      <button class="btn btn-primary" @click="register">REGISTER</button>

      <p class="mt-3">
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
      lastName: '',
      validation: {
        username: null,
        password: null,
        email: null,
        firstName: null,
        lastName: null
      }
    };
  },
  methods: {
    validateField(field) {
      const value = this[field];
      switch (field) {
        case 'username':
        case 'firstName':
        case 'lastName':
          this.validation[field] = value.trim().length > 0;
          break;
        case 'password':
          this.validation[field] = value.length >= 6;
          break;
        case 'email':
          this.validation[field] = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          break;
      }
    },
    validateAll() {
      ['username', 'password', 'email', 'firstName', 'lastName'].forEach(this.validateField);
      return Object.values(this.validation).every(Boolean);
    },
    async register() {
      if (!this.validateAll()) {
        return;
      }

      try {
        const res = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName
          })
        });

        if (res.ok) {
          this.$router.push('/login');
        } else {
          console.log('Failed to register');
        }
      } catch (err) {
        console.log('Something went wrong');
      }
    }
  }
};
</script>

<style scoped>
.auth-container {
  background: #151515;
  color: white;
  height: 80vh;
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
