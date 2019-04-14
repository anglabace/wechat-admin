//后台管理系统组件
import Home from "@/components/Home"
import Login from "@/components/Login"
import Register from "@/components/Register"
import Member from "@/components/Member/Member"


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
        component: resolve => require(['@/components/Member/Member'], resolve)
      },
    ]
  },
];


// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  ...admin
];
