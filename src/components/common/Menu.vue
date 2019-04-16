<template>
  <div>
    <mu-paper :z-depth="1" class="demo-list-wrap menu-content">
      <mu-list toggle-nested>
        <mu-list-item
          button
          :ripple="false"
          nested
          :open="open === 'send'"
          @toggle-nested="open = arguments[0] ? 'send' : ''"
        >
          <mu-list-item-action>
            <mu-icon value="send"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>用户管理</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon class="toggle-icon" size="24" value="keyboard_arrow_down"></mu-icon>
          </mu-list-item-action>
          <mu-list-item button :ripple="false" slot="nested">
            <mu-list-item-title>
              <router-link to="/member">用户列表</router-link>
            </mu-list-item-title>
          </mu-list-item>
          <mu-list-item button :ripple="false" slot="nested">
            <mu-list-item-title>
              <router-link to="/applyList">申请列表</router-link>
            </mu-list-item-title>
          </mu-list-item>
        </mu-list-item>
        <mu-list-item
          button
          :ripple="false"
          nested
          :open="open === 'drafts'"
          @toggle-nested="open = arguments[0] ? 'drafts' : ''"
        >
          <mu-list-item-action>
            <mu-icon value="drafts"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>战队</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon class="toggle-icon" size="24" value="keyboard_arrow_down"></mu-icon>
          </mu-list-item-action>
          <mu-list-item button :ripple="false" slot="nested">
            <mu-list-item-title>战队排名</mu-list-item-title>
          </mu-list-item>
        </mu-list-item>
        <mu-list-item
          button
          :ripple="false"
          nested
          :open="open === 'inbox'"
          @toggle-nested="open = arguments[0] ? 'inbox' : ''"
        >
          <mu-list-item-action>
            <mu-icon value="inbox"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>充值</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon class="toggle-icon" size="24" value="keyboard_arrow_down"></mu-icon>
          </mu-list-item-action>
          <mu-list-item button :ripple="false" slot="nested">
            <mu-list-item-title>充值列表</mu-list-item-title>
          </mu-list-item>
        </mu-list-item>
        <mu-list-item
          button
          :ripple="false"
          nested
          :open="open === 'stared'"
          @toggle-nested="open = arguments[0] ? 'stared' : ''"
        >
          <mu-list-item-action>
            <mu-icon value="grade"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>赛事类型</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon class="toggle-icon" size="24" value="keyboard_arrow_down"></mu-icon>
          </mu-list-item-action>
          <mu-list-item button :ripple="false" slot="nested">
            <mu-list-item-title>赛事</mu-list-item-title>
          </mu-list-item>
        </mu-list-item>
      </mu-list>
    </mu-paper>
  </div>
</template>
<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      open: "send",
      items: [
        {
          text: "用户管理",
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
  },
  methods: {
    handleSortChange({ name, order }) {
      this.list = this.list.sort((a, b) =>
        order === "asc" ? a[name] - b[name] : b[name] - a[name]
      );
    },
    removeSelect(selectIndex) {
      const index = this.selects.indexOf(selectIndex);
      this.selects.splice(index, 1);
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.demo-list-wrap {
  width: 100%;
  max-width: 360px;
  overflow: hidden;
}
.menu-content {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
}
.mu-paper {
  height: 100%;
}
.header {
  margin-left: 360px;
}
</style>