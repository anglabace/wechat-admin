<template>
  <mu-container>
    <mu-form ref="form" :model="validateForm" class="mu-demo-form">
      <mu-form-item label help-text prop="username" :rules="usernameRules">
        <mu-text-field v-model="validateForm.username" prop="username" placeholder="用户名"></mu-text-field>
      </mu-form-item>
      <mu-form-item label prop="password" :rules="passwordRules" class="form-input">
        <mu-text-field
          type="password"
          v-model="validateForm.password"
          prop="password"
          placeholder="用户密码"
        ></mu-text-field>
      </mu-form-item>
      <mu-form-item class="button-content">
        <mu-button color="primary" @click="submit">提交</mu-button>
        <mu-button @click="clear">重置</mu-button>
      </mu-form-item>
    </mu-form>
  </mu-container>
</template>
<script>
import CookieUtils from "../utils/CookieUtils";
import axios from "axios";
export default {
  data() {
    return {
      usernameRules: [
        { validate: val => !!val, message: "必须填写用户名" },
        { validate: val => val.length >= 3, message: "用户名长度大于3" }
      ],
      passwordRules: [
        { validate: val => !!val, message: "必须填写密码" },
        {
          validate: val => val.length >= 3 && val.length <= 10,
          message: "密码长度大于3小于10"
        }
      ],
      validateForm: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    submit() {
      let _this = this;
      this.$refs.form.validate().then(result => {
        console.log("form valid: ", result);
        if (!result) return false;
        console.log(this.validateForm.username, this.validateForm.password);
        let username = this.validateForm.username;
        let password = this.validateForm.password;
        axios({
          method: "post",
          url: "/apis/api/manage/backend/login",
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            username: this.validateForm.username,
            password: this.validateForm.password
          }
        })
          .then(function(response) {
            console.log(response);
            let code = response.data.code;
            let token = response.data.token;
            if(code === 1){
              CookieUtils.setCookie("token",token);
              _this.$router.push('/member');
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    },
    clear() {
      this.$refs.form.clear();
      this.validateForm = {
        username: "",
        password: ""
      };
    }
  },
  mounted: function() {
    //获取token存到cookie当中
  }
};
</script>
<style>
.mu-demo-form {
  width: 100%;
  max-width: 460px;
  margin: 250px auto 0 auto;
  padding: 41px;
  box-shadow: 2px -2px 20px #ccc;
}
.button-content {
  margin-top: 30px;
}
.mu-text-field-input {
  height: 50px;
}
</style>
