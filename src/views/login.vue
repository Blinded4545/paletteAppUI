<template>
  <div id="login">
    <div id="wrapper">
      <div id="logintxt">
        <h1>Log In</h1>
      </div>
      <!---Cambia el como se ve, ya tienes la idea de como-->
      <div>
        <input class="form" placeholder="User" v-model="usr" />
      </div>
      <div>
        <input class="form" placeholder="Password" v-model="pwd" />
      </div>
      <div>
        <button id="logInbutton" @click="login">Log In</button>
      </div>
      <div>
        <button id="register" @click="register">Register</button>
      </div>
    </div>
    <div v-if="badLogin">
      <h3 class="bg-red">Usuario o contrasena incorrecta</h3>
    </div>
    <div v-if="badRegister">
      <h3 class="bg-red">Error</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "loginView",
  data() {
    return {
      usr: "",
      pwd: "",
      badLogin: false,
      badRegister: false,
    };
  },
  methods: {
    login() {
      fetch("http://192.168.1.8:3000/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          usr: this.usr,
          pw: this.pwd,
        }),
      }).then((response) => {
        if (response.status == 200) {
          this.$router.push("/home");
        } else {
          this.badLogin = true;
          this.badRegister = false;
        }
      });
    },
    register() {
      fetch("http://192.168.1.8:3000/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          usr: this.usr,
          pw: this.pwd,
        }),
      }).then((response) => {
        if (response.status == 200) {
          this.$router.push("/home");
        } else {
          this.badRegister = true;
        }
      });
    },
  },
};
</script>

<style>
#login {
  width: 100%;
  height: 100vh;
  margin: 0;
  display: grid;
  text-align: center;
  align-content: center;
  justify-content: center;
  background: linear-gradient(0deg, #072541, #5272f2);
}

#wrapper {
  border-radius: 10px;
  width: fit-content;
  background-color: rgba(26, 188, 156, 0.5);
  backdrop-filter: blur(100%);
  justify-items: center;
  display: grid;
}

#logintxt {
  margin-top: 4rem;
  margin-bottom: 3rem;
  background-color: rgba(248, 189, 235, 0.3);
  backdrop-filter: blur(40px);
  width: 12rem;
  border-radius: 70px;
}

.form {
  transform: scale(1.2);
  padding: 5px;
  margin: 5px 5rem 1.5rem 5rem;
  border-radius: 10px;
  border: none;
  transition: all 0.3s ease;
  background-color: #fbecb2;
}
.form:hover {
  transform: scale(1.4);
}
.form:focus {
  transform: scale(1.4);
  background-color: #f8bdeb;
  outline: none;
}
.form::placeholder {
  padding-left: 5%;
  transform: scale(1.1);
  border: none;
}

#logInbutton {
  font-size: 1.8rem;
}
#logInbutton,
#register {
  padding: 5px 15px;
  border: none;
  border-radius: 20px;
  margin-bottom: 10px;
  transition: all 0.3s linear;
  background-color: rgba(248, 189, 235, 0.3);
}
#logInbutton {
  margin-top: 0.75rem;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
}
#register {
  margin-top: calc(1rem - 5px);
  margin-bottom: 3rem;
}

#logInbutton:hover {
  transform: scale(1.2);
  background-color: rgba(248, 189, 235, 0.8);
}
#register:hover {
  transform: scale(1.2);
  background-color: rgba(248, 189, 235, 0.8);
}
</style>
