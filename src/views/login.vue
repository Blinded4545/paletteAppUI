<template>
  <div id="login">
    <div id="wrapper">
      <div id="logintxt">
        <h1>Log In</h1>
      </div>
      <div>
        <input class="form" placeholder="User" v-model="usr"/>
      </div>
      <div>
        <input class="form" placeholder="Password" v-model="pwd"/>
      </div>
      <div>
        <button id="logInbutton" @click="login">Log In</button>
      </div>
      <div>
        <button id="register" @click="register">Register</button>
      </div>
    </div>
  </div>
</template>

<script>

export default{
  name: "loginView",
  data(){
    return {
      usr: "",
      pwd: "",
      badLogin: false
    }
  },
  methods: {
    login(){
      console.log(this.usr, this.pwd);
    },
    register(){

    }
  }
}

</script>

<style>

#login{
  width: 100%;
  height: 100vh;
  margin: 0;
  display: grid;
  align-content: center;
  justify-content: center;
  background: linear-gradient(260deg, #2874A6, #148F77);
}

#wrapper{
  border: 1px black solid;
  border-radius: 10px;
  width:fit-content;
  background-color: rgba(26, 188, 156, .6);
}

#logintxt{
  margin: 10px;
}

.form{
  padding: 5px;
  margin: 5px 20px 10px 20px;
  border-radius: 10px;
  border: none;
  transition: all .3s ease;
}
.form:hover{
  transform: scale(1.1);
}
.form:focus{
  transform: scale(1.1);
  background-color: #58D68D;
  outline: none;
}
.form::placeholder{
  padding-left: 5%;
  transform: scale(1.1);
  border: none;
}

#logInbutton{
  
  font-size: 1.25rem;
}
#logInbutton, #register{
  padding: 5px 15px;
  border: none;
  border-radius: 10px;
  margin-bottom: 10px;
  transition: all 0.3s linear;
}
#register{
  margin-bottom: 15px;
}

#logInbutton:hover{
  transform: scale(1.3);
}
#register:hover{
  transform: scale(1.3);
}

</style>