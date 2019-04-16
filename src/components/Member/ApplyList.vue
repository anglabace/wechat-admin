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
            <td>{{scope.row.create_time}}</td>
            <td>{{scope.row.game_character}}</td>
            <td>{{scope.row.game_grade}}</td>
            <td>{{scope.row.game_hero}}</td>
            <td>{{scope.row.game_score}}</td>
            <td>{{scope.row.game_style}}</td>
            <td>{{scope.row.game_type}}</td>
            <td>{{scope.row.is_champion}}</td>
            <td>{{scope.row.is_check}}</td>
            <td>{{scope.row.is_upload}}</td>
            <td>{{scope.row.join_time}}</td>
            <td>{{scope.row.result_img_url}}</td>
            <td>{{scope.row.wx_nickname}}</td>
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
        {
          title: "创建时间",
          name: "create_time"
        },
        {
          title: "游戏位置",
          name: "game_character",
          sortable: true
        },
        {
          title: "游戏段位",
          name: "game_grade",
          sortable: true
        },
        {
          title: "游戏英雄",
          name: "game_hero",
          sortable: true
        },
        {
          title: "比赛积分",
          name: "game_score",
          sortable: true
        },
        {
          title: "游戏风格",
          name: "game_style",
          sortable: true
        },
        {
          title: "赛事类型",
          name: "game_type",
          sortable: true
        },
        {
          title: "是否是最高得分者",
          name: "is_champion",
          sortable: true
        },
        {
          title: "是否已审核结果",
          name: "is_check",
          sortable: true
        },
        {
          title: "是否已上传比赛结果",
          name: "is_upload",
          sortable: true
        },
        {
          title: "参赛时间",
          name: "join_time",
          sortable: true
        },
        {
          title: "比赛结果地址",
          name: "result_img_url",
          sortable: true
        },
        {
          title: "用户昵称",
          name: "wx_nickname",
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
      // console.log(_this);
      let token = CookieUtils.getCookie("token");
      axios({
        method: "post",
        url: "/apis/api/manage/backend/get/gameApply/list",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        data: {
          stime: "2019-04-02 00:00:00",
          etime: "2019-04-03 00:00:00",
          search: "",
          is_join: 0,
          is_champion: 0,
          is_check: 0,
          is_upload: 0,
          game_type: 1,
          start: 0,
          length: 10,
          sort: "create_time",
          order: "asc"
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
      _this.$confirm(`是否删除:  ${name}`, "删除用户").then(function(result) {
        console.log(result);
        if (result.result) {
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
        } else {
          console.log("点击了取消");
        }
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


