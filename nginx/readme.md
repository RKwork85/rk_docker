## Dockerfile
>此为docker镜像1.0 将Vue应用挂载到nginx上，与后端通信还未实现
docker build -f Dockerfile  -t dsnginx:3.0 . //换成内部网络host dsflask

这个dockerfile是原始的将改变后的数据打包到官方镜像


## Dockerfile2.0

> 此为docker镜像2.0 将Vue应用挂载到nginx上，实现docker自定义网络与后端通信
docker build -f Dockerfile2  -t dsnginx:4.0 .