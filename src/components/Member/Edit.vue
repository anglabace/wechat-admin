<template>
  <div>
    <mu-form
      :model="form"
      :inline="true"
      class="mu-demo-form"
      :label-position="labelPosition"
      label-width="75"
    >
      <mu-form-item prop="id" label="用户id">
        <mu-text-field v-model="form.id" v-on:change="handleInput"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="username" label="用户名称">
        <mu-text-field v-model="form.username"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="password" label="用户密码">
        <mu-text-field type="password" v-model="form.password"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="role" label="角色权限">
        <mu-text-field  v-model="form.role"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="remark" label="备注信息">
        <mu-text-field v-model="form.remark"></mu-text-field>
      </mu-form-item>
    </mu-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: "left",
      form: {
        id: "",
        username: "",
        password: "",
        role: "",
        remark: ""
      }
    };
  },
  mounted() {
    console.log(this.$attrs.userMsg[0]);
    let userMsg = this.$attrs.userMsg[0];
    this.form = userMsg;
    console.log(this.form);
  },
  methods: {
    handleInput: function(e) {
      this.$emit("event", e);
    }
  }
};
</script>
<style>
.mu-demo-form {
  width: 100%;
  max-width: 460px;
}
</style>