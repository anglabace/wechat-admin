//后台管理系统组件
import Home from "@/components/Home"
import Login from "@/components/Login"
import Register from "@/components/Register"
import Member from "@/components/Member/Member"
import ApplyList from "@/components/Member/ApplyList"


export const admin = [
  //后台管理系统组件
  {
    path: "/login",
    name: "login",
    meta: { keepAlive: true },
    component: Login
  },
  {
    path: "/register",
    name: "register",
    meta: { keepAlive: true },
    component: Register
  },
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { keepAlive: true },
    component: resolve => require(['@/components/Home'], resolve),
    children: [
      {
        path: '/Member',
        name: "member",
        component: Member,
        title:"会员管理",
        component: resolve => require(['@/components/Member/Member'], resolve)
      },
      {
        path: '/ApplyList',
        name: "applyList",
        component: ApplyList,
        component: resolve => require(['@/components/Member/ApplyList'], resolve)
      },
    ]
  },
];


// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  ...admin
];
