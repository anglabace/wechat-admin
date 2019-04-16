<template>
  <div>
    <Menu/>
    <Headers/>
    <mu-container>
      <router-view></router-view>
      <!-- <Member/> -->
    </mu-container>
  </div>
</template>

<script>
import Menu from "./common/Menu";
import Headers from "./common/Headers";
import Member from "./Member/Member";
import axios from "axios";
import CookieUtils from "../utils/CookieUtils";
export default {
  name: "Home",
  components: {
    Menu,
    Headers,
    Member
  },
  data() {
    return {};
  },
  methods: {
    getData() {
      // 请求数据
    }
  },
  mounted() {
    console.log(this)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 1400px;
}
</style>
