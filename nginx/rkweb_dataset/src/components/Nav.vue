<script setup lang="ts">
import { getCurrentInstance,  ref } from 'vue';
import { useUuidStore } from '../store/uuidStore.js'
import { useDataStore } from '../store/dataStore'

import { dsNotification } from '../libs/util.toast'

import { authLogin } from '../api/modules/api.auth'
import { dataset_Synchronize } from '../api/modules/api.datasets'

const { proxy } = getCurrentInstance()

const strMultiple = 'multiple'
const strSingle = 'single'
function toggleMultiple() {
	proxy.$emit('toggleMultiple', strMultiple)
}
function toggleSingle() {
	proxy.$emit('toggleSingle', strSingle)
}
const uuidStore = useUuidStore()
const dataStore = useDataStore()


let loginInfo = ref('加入我们')

const setLogin = () => {
	uuidStore.logined = true           //展示当前登录的状态  
	uuidStore.showlogin = false

	let loginData = {						//构造数据
		uuid: `${uuidStore.uuid}`,
	}
	console.log("开始发送数据")
	authLogin(loginData).then(res => {
		if (res.status === 200) {//向后端发送登录请求
			console.log(res)
			uuidStore.access_token = res.data.access_token   //存储uuidStore

			// dataset_List().then(res => {



			// 	console.log('从后端请求来用户的所有数据',res.data.allDataset)
			// })
			// console.log('你好',useDataStore().data.dataset.length)       // 检查localStore是否为空
			if (dataStore.data.dataset.length != 0) {      			// 在登录之前浏览器中存储有数据

				let allLocalData = []

				// console.log(dataStore.data.dataset)
				for (let dataset of dataStore.data.dataset) {		//构造传输的数据
					// console.log('打印出存储在浏览器中原有的数据',dataset)

					let data = {
						'instruction': dataset[1].instruction,
						'output': dataset[1].output
					}
					// console.log(data)
					allLocalData.unshift(data)
				}
				console.log(allLocalData)								//是逆序的原因是，用户在添加数据时，添加到了数组的前面；所以在循环的时候，是逆序的

				let data = {
					'datasets': allLocalData
				}
				dataset_Synchronize(data).then(res => {
					console.log('从前端同步到后端后，用户数据库中的所有数据', res.data.allDataset)
					dataStore.data.dataset = [...res.data.allDataset].reverse()

					console.log(dataStore.data.dataset)
					dsNotification.success("登录成功", "您的本地的数据已同步到数据库")

				})

			}
			else {

			}

		}
	})

	console.log(uuidStore.logined)		// 显示登录状态 改变显示设置注销
	loginInfo.value = '注销'
}
const setLogout = () => {
	uuidStore.showlogin = true
	uuidStore.logined = false
	console.log(uuidStore.logined)
	loginInfo.value = '加入我们'
}

// 我并不希望每次刷新请求所有的数据
// onMounted(() => {
//     getDataset().then(res => {
//         console.log('向后端发送请求挂载后：单条数据请求')
//         console.log('返回的单条数据格式',res)
//         dataset = res.data
//         num.value++
//         return dataset
//     })
//     getDatasetAll().then(res => {
//         console.log('向后端发送请求挂载后：所有数据请求')
//         console.log('返回的所有数据格式',res)

//         // allData = res.data.data
//         // console.log('allData内容：', allData)
//         // console.log('alldata的类型是： ',typeof (allData))
//         // let name = 'rkwork'
//         // allData.unshift(name)
//         // return allData

//         const newData: any[] = res.data.data;
//         allData.push(...newData);
//     })
// })



</script>

<template>

	<nav class="topnav navbar navbar-expand-lg navbar-light bg-black fixed-top ">
		<div class="container">
			<img src="../assets/img/favicon.ico" width="30px">&nbsp
			<a class="navbar-brand" href="#/home" style="color: white;"><strong>众承数据集制作站</strong></a>
			<button class="navbar-toggler collapsed bg-warning" type="button" data-toggle="collapse"
				data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false"
				aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="navbar-collapse collapse" id="navbarColor02">
				<ul class="navbar-nav mr-auto d-flex align-items-center">
					<li class="nav-item">
						<div class="dropdown">
							<button class="btn btn-dark dropdown-toggle" type="button" data-toggle="dropdown"
								aria-expanded="false" style="background-color: #000000; border: none;"
								@click="toggleSingle">
								单轮对话
							</button>
							<div class="dropdown-menu">
								<a class="dropdown-item" href="#" onmouseover="this.style.backgroundColor='#d6ebd8';"
									onmouseout="this.style.backgroundColor='#fff';">案例一</a>
								<a class="dropdown-item" href="#" onmouseover="this.style.backgroundColor='#d6ebd8';"
									onmouseout="this.style.backgroundColor='#fff';">案例二</a>
								<a class="dropdown-item" href="#" onmouseover="this.style.backgroundColor='#d6ebd8';"
									onmouseout="this.style.backgroundColor='#fff';">案例三</a>
							</div>
						</div>
					</li>

					<li class="nav-item">
						<a class="nav-link" href="#" style="color: white;" @click="toggleMultiple">多轮对话</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#/format" style="color: white;">格式转换</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#/crawler" style="color: white;">在线爬取</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#/datasetground" style="color: white;">数据集广场</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#/userspace" style="color: white;">用户空间</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="http://www.gzcedu.com/InfoPages_1001.html"
							style="color: white;">关于我们</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#/login" style="color: white;"> <span
								class="badge badge-secondary">docs</span></a>
					</li>
				</ul>

				<ul class="navbar-nav ml-auto d-flex align-items-center">
					<!-- <li class="nav-item highlight"> -->
					<a class="btn btn-warning" id="loginInterface" v-show="uuidStore.showlogin"
						@click="setLogin">加入我们</a>
					<a class="btn btn-warning" id="loginInterface" v-show="uuidStore.logined"
						@click="setLogout">注销账号</a>

					<!-- </li> -->
				</ul>
			</div>
		</div>
	</nav>





</template>

<style scoped></style>

<!-- 1 dropdown 内元素样式可优化 -->