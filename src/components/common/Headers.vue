<template>
  <div>
    <mu-appbar class="header" color="primary">
      <mu-button icon slot="left">
        <!-- <mu-icon value="menu"></mu-icon> -->
      </mu-button>
      <mu-menu cover placement="bottom-end" @click="open = !open" slot="right">
        <mu-button flat>LOGIN</mu-button>
        <mu-list slot="content">
          <mu-list-item button>
            <mu-list-item-title>设置</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-title>退出登录</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-menu>
    </mu-appbar>
    <mu-container>
      <mu-breadcrumbs>
        <mu-breadcrumbs-item
          v-for="item in items"
          :key="item.text"
          :disabled="item.disabled"
        >{{item.text}}</mu-breadcrumbs-item>
      </mu-breadcrumbs>
    </mu-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      open: false,
      items: [
        {
          text: "会员管理",
          disabled: false
        },
        {
          text: "会员积分",
          disabled: false
        },
        {
          text: "会员详情",
          disabled: true
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.header {
  margin-left: 360px;
}
</style>


