<template>
  <div>
    <mu-container>
      <mu-paper :z-depth="1">
        <mu-data-table
          stripe
          :columns="columns"
          :sort.sync="sort"
          @sort-change="handleSortChange"
          :data="list.slice(0, 7)"
        >
          <template slot-scope="scope">
            <td>{{scope.row.id}}</td>
            <td>{{scope.row.username}}</td>
            <td>{{scope.row.online_time}}</td>
            <td>{{scope.row.online_ip}}</td>
            <td>{{scope.row.role}}</td>
            <td>{{scope.row.create_time}}</td>
            <td>{{scope.row.remark}}</td>
            <td>
              <mu-button color="primary" @click="showConfirm">更新用户</mu-button>
              <mu-button color="error" @click="deleteUser(scope.row.id,scope.row.username)">删除用户</mu-button>
            </td>
          </template>
        </mu-data-table>
      </mu-paper>
    </mu-container>
  </div>
</template>
<script>
import CookieUtils from "../../utils/CookieUtils";
import Edit from "./Edit";
import axios from "axios";
export default {
  data() {
    return {
      sort: {
        name: "",
        order: "asc"
      },
      columns: [
        { title: "用户id", name: "id" },
        {
          title: "用户名称",
          name: "username",
          sortable: true
        },
        {
          title: "最近上线时间",
          name: "online_time",
          sortable: true
        },
        {
          title: "最近上线IP",
          name: "online_ip",
          sortable: true
        },
        {
          title: "用户角色",
          name: "role",
          sortable: true
        },
        {
          title: "创建时间",
          name: "create_time",
          sortable: true
        },
        {
          title: "备注",
          name: "remark",
          sortable: true
        },
        {
          title: "操作",
          name: "create_time",
          sortable: true
        }
      ],
      list: []
    };
  },
  props: {
    userList: this.list
  },
  methods: {
    handleSortChange({ name, order }) {
      this.list = this.list.sort((a, b) =>
        order === "asc" ? a[name] - b[name] : b[name] - a[name]
      );
    },
    loadList() {
      // 调用请求数据的方法
      let _this = this;
      console.log(_this);
      let token = CookieUtils.getCookie("token");
      axios({
        method: "post",
        url: "/apis/api/manage/backend/get/userList",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        data: {
          search: "",
          sort: "create_time",
          order: "desc",
          start: 0,
          length: 20
        }
      })
        .then(function(response) {
          console.log(response);
          let code = response.data.code;
          let dataList = response.data.data;
          if (code === 1) {
            _this.list = dataList;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleUpdate(data) {
      console.log(data);
    },
    showConfirm() {
      let _this = this;
      this.$confirm(
        function(props) {
          console.log(_this);
          return <Edit userMsg={_this.list} />;
        },
        {
          title: "用户信息更新",
          successIcon: "check_circle", // 成功图标
          infoIcon: "info", // 信息图标
          warningIcon: "priority_high", // 提醒图标
          errorIcon: "warning", // 错误图标
          iconSize: 24, // 图标大小
          width: 350, // 对话框的宽度
          maxWidth: "80%", // 对话框最大宽度
          className: "", // 对话框的样式
          okLabel: "确定", // 对话框确定按钮文字
          cancelLabel: "取消", // 对话框取消按钮文字
          transition: "scale" // 对话框显示的动画 'slide-left', 'slide-right', 'fade', 'scale'
        }
      )
        .then(function(result) {
          console.log(result);
          if (result) {
            //点击确定，提交更新
            console.log(_this.list);
          } else {
            //点击取消，取消更新
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deleteUser(id, name) {
      let _this = this;
      let token = CookieUtils.getCookie("token");
      _this.$confirm(`是否删除:  ${name}`, "删除用户")
      .then(function(result) {
        axios({
          method: "post",
          url: "/apis/api/manage/backend/delete/user",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          data: {
            ids: `${id}`
          }
        })
          .then(function(response) {
            console.log(response);
            let code = response.data.code;
            if (code === 1) {
              _this.$toast.message("删除成功");
            } else {
              _this.$toast.error("删除失败，请重试！");
            }
          })
          .catch(function(error) {
            console.log(error);
            _this.$toast.error("系统错误，请联系管理员！");
          });
      });
    }
  },
  mounted() {
    this.loadList();
  }
};
</script>
<style lang="less">
</style>


