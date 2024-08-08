# 构建项目也要看教程 哭了
npm create vite@latest my-vue-app -- --template vue-ts

(就这个救命稻草)[https://dstweihao.cn/posts/vue%E5%BC%80%E5%8F%91/vue3-+-vite-+-typescript-+-bootstrap5-%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/]

main： vite + vue3 + bootstrap +  pinia + axios 来构建前端页面


先有个大体的规划吧：

>路由 + 视图 

根路由   view 
/work    ../view/client.vue

子路由               
/client     ../view/client.vue
/contract   ../view/contract.vue
/advertise  ../view/advertise.vue


>组件components
导航栏 + 网站介绍 + 工作台  |不变 

数据集格式    数据集内容   |改变

>持久化存储

用户信息，子路由做的数据集

>axios 就是和后台对接接口




now:
    undo list

    1 要抓紧把前端页面整合到项目中来  √ 渲染有问题  √
    summary: 

        1 首先把静态网页中引入需要的外部资源 比如说：js脚本， css文件， cdn； 在Vue根目录下的index.html引入

        2 js 文件后面有个 //# sourceMappingURL=popper.min.js.map 删除掉就不报错了
        3 路径替换掉 用style 去设置图片背景  要转换为 img标签
        4 还是有一些显示问题 我的天，de了两个bug，都是图片的显示问题... 

    2 实现整体的逻辑     localstore √ 

    3 前后端结合         

        初步 √： 实现了 点击“加入我们” 后，同步本地localStore数据到后端服务器中，并且返回该用户数据到前端逆序渲染；

            和上个版本（v1.1.7）有较大区别（我写代码写的都忘记更新了仓库了。。。）

            main: axios 实例创建改变，参照其他仓库代码，优化了src/api/ 目录下的内容，详见代码记录；v1.1.8 实现的的是component/Nav.vue代码的登录验证授权逻辑，同步通信逻辑，数据渲染逻辑（别被吓到了，就是几行代码，hhh~）

        初步2.0 √： 实现了登录后增加单条数据集，删除单条数据集 function

        main: 优化了/component/Work.vue 中构建数据集的格式；表格中数据集显示css样式高度可控； 删除 和 添加数据接口的完善；

        初步3.0 √： 最后一个更新数据的代码完成

            main： v1.2.0 实现了 前后端之间的数据交互（增删改）


    4 前后端服务 docker 打包

    5 图片懒加载 分块加载 动态加载内容     //好像没什么用，待定

    6 动态特效  单轮对话 多轮对话 切换动效   √

    7 轻量弹框代码优化：  新增： libs/utils.toast.js  √

    8 下载数据集功能        √

    9 数据进行密文处理


    others:

    1 数据表格显示，关键字颜色动态 undo       √

    2 静态资源文件清理 undo         √


## 打包

> npm run build 

优化了下代码，打包路由使用的是hash模式，图省事，路由真的很丑陋，先这样吧，待处理

镜像order：

docker run -d --name muzi -p 88:80 -v /home/rkwork/work_place/project/fff/rk_fk/ds/rkweb_dataset/dist:/usr/share/nginx/html -v ngconf:/etc/nginx  nginx

docker commit -m '众承数据集工作站-dsnginx' d2b  dsnginx:1.0

docker run -d --name muzihhh -p 88:80 -v ngconf:/etc/nginx 


>docker run -d --name muzi -p 88:80  -v ngconf:/etc/nginx  dsnginx:2.0

还有就是问题是web端如何使用内部网络实现docker镜像的打包 ?

解决了半天也没解决好，那最终的方案就是

通过本地的web应用通过端口映射在本地的5000端口去访问数据库

