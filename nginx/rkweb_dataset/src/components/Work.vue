<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useDataStore } from '../store/dataStore'
import { useUuidStore } from '../store/uuidStore'

import { fileDownload } from '../api/modules/api.file'

import { dsNotification } from '../libs/util.toast'

import { dataset_Create,  dataset_Delete, dataset_Update } from '../api/modules/api.datasets'

const dataStore = useDataStore()
const uuidStore = useUuidStore()

const centerDialogVisible = ref(false)
interface Data {
	instruction: string
	output: string
	info: boolean
	infotarget: string
	dataset: [number, object][]
	hover: boolean
}

const data = reactive<Data>({
	instruction: '',
	output: '',
	info: false,
	infotarget: '',
	dataset: [[1, { "instruction": "你好", "input": "", "output": "您好，我是 木子AI，一个由 广东众承人工智能有限公司 打造的人工智能助手，请问有什么可以帮助您的吗？" }], [3, { "instruction": "你好", "input": "", "output": "您好，我是 木子AI，一个由 广东众承人工智能有限公司 打造的人工智能助手，请问有什么可以帮助您的吗？" }]],
	hover: true,

})

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
	item: -1,
	id: null,
	instruction: '',
	output: '',
})

const generateDataset = () => {

	if (data.instruction == '' || data.output == '') {    // 检测是否填入数据
		console.log('未检测到数据')
		$('#exampleModal').modal('show')
	}
	else {
		if (uuidStore.logined) {								// 填入了检查是否登录 如果是 获取登录的用户的数据     不应该在这里获取所用数据， 应该是发送请求添加数据

			let dataset = {											//构造数据
				"instruction": data.instruction,
				"output": data.output
			}
			dataset_Create(dataset).then(res => {
				console.log(res.data.dataset)
				dataStore.data.dataset.unshift(res.data.dataset)
				// dbAddInfo(res.data.dataset[0])
				dsNotification.success('数据库操作：添加数据', '数据成功添加到数据库！')
			}).catch(err => {
				console.log(err)
			})
		} else {
			let dataset = { "instruction": `${data.instruction}`, "input": "", "output": `${data.output}` }
			let datasetItem = [uuidStore.login ? 0 : -1, dataset]

			dataStore.data.dataset.unshift(datasetItem)
			dsNotification.success('添加数据', '数据添加成功')

			console.log(dataStore.data.dataset)
		}
		// 清空输入框内容
		data.instruction = ''
		data.output = ''
	}
}

const editForm = () => {
	// 在这里,您可以访问 this.form 中的表单数据
	if (uuidStore.logined) {
		let dataset = {											//构造数据
			"instruction": form.instruction,
			"output": form.output
		}
		let id = form.id
		console.log("正在编辑的数据集id:", id)
		dataset_Update(id, dataset).then(res => {
			console.log(res.data.msg)
			console.log(res.data.newDataset)

			dataStore.data.dataset[form.item] = res.data.newDataset

			dsNotification.success('数据库操作：修改数据', `数据库中id为${res.data.newDataset[0]}的数据修改成功！`)


			form.instruction = ''
			form.output = ''

		}).catch(err => {
			console.log(err)
		})

	} else {

		let dataset = { "instruction": `"${form.instruction}"`, "input": "", "output": `"${form.output}"` }
		let datasetItem = [data.dataset.length, dataset]

		dataStore.data.dataset[form.item] = datasetItem
		console.log(dataStore.data.dataset[form.item])
		// 清空输入框内容
		form.instruction = ''
		form.output = ''

		dsNotification.success('修改数据', `id为 ${form.item + 1} 的数据已修改`)
	}

	// 您还可以调用一个函数来将数据保存到服务器,更新用户界面等
	dialogFormVisible.value = false; // 关闭对话框
}


const dbdelete = (index, id) => {					//提示框代码可优化

	dataStore.data.dataset.splice(index, 1)
	console.log('deleteItem: Deleted item at index:', index)
	dataset_Delete(id).then(res => {

		console.log(res.data.msg)

		dsNotification.success('数据库操作：删除数据', `数据库中id为${id}的数据删除成功！`)

	})
}
const deleteindex = (index) => {					//提示框代码可优化

	dataStore.data.dataset.splice(index, 1)

	console.log('deleteindex:Deleted item at index:', index)

	dsNotification.success('删除数据', `id为 ${index + 1} 的数据已删除`)

}

const showDialog = (index, id) => {
	form.item = index,
		form.id = id
	dialogFormVisible.value = true;
	console.log(form.item)
}


const downloadFile = () => {                        //入口
	try {
		let filename = 'dataset.jsonl'

		fileDownload(filename).then(res => {
			console.log(res)
			const url = window.URL.createObjectURL(new Blob([res.data]))    //请求  耗时操作
			const link = document.createElement('a')
			link.href = url
			link.setAttribute('download', filename)

			// 添加动画效果



			// 延时2秒后执行下载操作
			setTimeout(() => {
				document.body.appendChild(link);
				link.click();
				link.remove();
				centerDialogVisible.value = true

			}, 2000);

		});

	} catch (error) {
		console.error('Error downloading file:', error)
	}
}

</script>
<template>


	<div>
		<!-- 导出数据集提示框 -->
		<el-dialog v-model="centerDialogVisible" title="导出成功" width="500" align-center>
			<span>您制作的数据集导出成功！</span>
			<template #footer>
				<div class="dialog-footer">
					
					<el-button type="primary" @click="centerDialogVisible = false">
						确定
					</el-button>
				</div>
			</template>
		</el-dialog>
		<!-- 修改框 -->
		<el-dialog v-model="dialogFormVisible" title="修改数据" width="800" align-center>
			<el-form :model="form">
				<el-form-item label="Human" :label-width="formLabelWidth">
					<el-input v-model="form.instruction" autocomplete="off" />
				</el-form-item>
				<el-form-item label="Assistant" :label-width="formLabelWidth">
					<el-input v-model="form.output" autocomplete="off" />
				</el-form-item>
			</el-form>
			<template #footer>
				<div class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取消</el-button>
					<el-button type="primary" @click="editForm">
						确认修改
					</el-button>
				</div>
			</template>
		</el-dialog>

		<!-- Button trigger modal -->
		<!-- Modal -->
		<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">信息提示</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body text-center text-dark">
						<b>未检测到数据！</b>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">关闭窗口</button>
						<!-- <button type="button" class="btn btn-primary">Save changes</button> -->
					</div>
				</div>
			</div>
		</div>

		<div class="container">
			<div class="row justify-content-between ">
				<div class="col-8 pr-0">
					<h5 id="rk_work" class="font-weight-bold spanborder mb-3 "><span>工作台</span></h5>
					<div class="mb-3 d-flex justify-content-between">
						<div class="pr-3">
							<h2 class="mb-1 h4 font-weight-bold">
								<a class="text-dark">开始数据集的制作！</a>
							</h2>
							<p>
								左侧是文本生成区域，右侧为工具栏，可以增删改查
							</p>

						</div>
						<!-- <img height="120" src="../assets/img/demo/blog8.jpg"> -->
					</div>
					<div class="jumbotron jumbotron-fluid pt-3 pb-3 pb-0 bg-lightblue position-relative">


						<div class="d-flex justify-content-center">
							<button type="submit" class="btn btn-secondary btn-default d-block"
								@click="generateDataset">确认生成</button>

						</div>
						<form class="mb-3">
							<div class="form-group">
								<span style="color: rgb(171, 227, 56); " class="bg-black">&nbsp;Human: &nbsp;</span>
								<input type="text" class="form-control " id="instruction" aria-describedby="emailHelp"
									v-model="data.instruction">
							</div>

							<div class="form-group">
								<span style="color: rgb(171, 227, 56);" class="bg-black">&nbsp;Assistant:&nbsp;</span>
								<input type="text" class="form-control" id="output"
									style="padding: none;outline-color: none;" v-model="data.output">
							</div>

						</form>
						<button class="btn btn-primary btn-default d-block " @click="downloadFile()"
							v-if="uuidStore.logined">导出数据集文件</button>
						<!-- <button v-show="false">点击我</button> -->
					</div>

				</div>
				<img class="col-4 pl-0 pr-0 d-block  justify-content-between" src="../assets/img/demo/blog8.jpg"
					alt="加载失败">

			</div>





			<!-- table -->
			<div class="row">
				<table class="table">
					<thead class="thead-dark">
						<tr>
							<th class="col-1 align-self-center" scope="col"> 序号 </th>
							<th class="col-9 " style="text-align:center" scope="col"> 广东众承人工智能客服数据集 </th>
							<th class="col-2  pr-5" style="text-align:right" scope="col"> 操作 </th>

						</tr>
					</thead>

					<!-- 需要把这个静态的表格变成动态的 -->
					<tbody>
						<!-- <tr v-for="(item, index) in dataStore.data.dataset" :key="index"> -->
						<tr v-for="(item, index) in dataStore.data.dataset" :key="index">

							<td class="border-bottom border-dark  " scope="row">{{ index + 1 }}</td>
							<td class="border-bottom border-dark " onmouseover="this.style.backgroundColor = '#d6ebd8'"
								onmouseout="this.style.backgroundColor = '#fff'">
								<span style="color: #801dae;">{</span>
								"<span style="color: #4b5cc4;">instruction</span>"
								:
								"<span style="color: #2edfa3;">{{ item[1].instruction.replace(/"/g, '') }}</span>",

								"<span style="color: #4b5cc4;">input</span>"
								: "",
								"<span style="color: #4b5cc4;">output</span>"
								:
								"<span style="color: #2edfa3;">{{ item[1].output.replace(/"/g, '') }}</span>"

								<span style="color: #801dae;">}</span>

							</td>
							<td class="pl-5 pr-0 border-bottom border-dark " style="text-align:right">

								<button class="btn btn-outline-primary btn-sm "
									@click="showDialog(index, item[0])">编辑</button>
								<button class="btn btn-outline-danger btn-sm"
									@click="uuidStore.logined ? dbdelete(index, item[0]) : deleteindex(index)">删除</button>

							</td>
						</tr>

					</tbody>

					<!-- <tbody>
					<tr v-for="(item, index) in dataStore.data.dataset" :key="index">
						<th class="border-bottom border-dark" scope="row">{{ index + 1 }}</th>
						<td class="border-bottom border-dark d-flex justify-content-between align-items-center" onmouseover="this.style.backgroundColor = '#d6ebd8'" onmouseout="this.style.backgroundColor = '#fff'">
						{{ item[1] }}
						<div>
							<button class="btn btn-primary mr-2" style="box-shadow: none;">编辑</button>
							<button class="btn btn-danger" style="box-shadow: none;">删除</button>
						</div>
						</td>
					</tr>
					</tbody> -->

					<!-- 样式有效 -->
					<!-- <tbody> 
				<tr> 
					<th scope="row" > 1 </th> 
						<td onmouseover="this.style.backgroundColor='#d6ebd8';" onmouseout="this.style.backgroundColor='#fff';"> {"instruction": "你好", "input": "", "output": "您好，我是 木子AI，一个由 广东众承人工智能有限公司 打造的人工智能助手，请问有什么可以帮助您的吗？"} </td> 
				</tr> 
			</tbody> -->

				</table>
			</div>
			<!-- 轮播图 -->
			<div id="carouselExampleIndicators" class="carousel slide carousel-fade" data-ride="carousel">
				<ol class="carousel-indicators">
					<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
				</ol>
				<div class="carousel-inner shadow-sm rounded">
					<div class="carousel-item active">
						<img class="d-block w-100" src="../assets/img/demo/slide1.jpg" alt="First slide">
						<div class="carousel-caption d-none d-md-block">
							<h5>Mountains, Nature Collection</h5>
						</div>
					</div>
					<div class="carousel-item">
						<img class="d-block w-100" src="../assets/img/demo/slide2.jpg" alt="Second slide">
						<div class="carousel-caption d-none d-md-block">
							<h5>Freedom, Sea Collection</h5>
						</div>
					</div>
					<div class="carousel-item">
						<img class="d-block w-100" src="../assets/img/demo/slide3.jpg" alt="Third slide">
						<div class="carousel-caption d-none d-md-block">
							<h5>Living the Dream, Lost Island</h5>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>
<style>
.input {
	background-color: #212121;
	max-width: 190px;
	height: 40px;
	padding: 10px;
	/* text-align: center; */
	border: 2px solid white;
	border-radius: 5px;
	/* box-shadow: 3px 3px 2px rgb(249, 255, 85); */
}

.input:focus {
	color: rgb(0, 255, 255);
	background-color: #212121;
	outline-color: none;
	box-shadow: none;
	transition: .1s;
	transition-property: none;
}
</style>