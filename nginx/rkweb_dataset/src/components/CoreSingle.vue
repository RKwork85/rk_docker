<script setup lang="ts">

</script>

<template>

<div class="container pt-4 pb-4 animate__animated animate__fadeIn">
	<div class="row">
		<div class="col-lg-6">
			<div class="card border-0 mb-4 box-shadow h-xl-300">              
				<div class="bgimg"></div>

				<div>
                </div>               
				<div class="card-body px-0 pb-0 d-flex flex-column align-items-start">
					<h2 class="h4 font-weight-bold">
					<a class="text-dark" >单轮对话</a>
					</h2>
					<p class="card-text">
						每一个对话对由两行组成,第一行是用户的输入,第二行是模型生成的响应。这种单轮对话格式可以用于训练对话系统,让模型学会如何根据用户的输入生成自然、合理的回复。
					</p>
				</div>

			</div>
			<div class="card border-0 mb-0 box-shadow h-xl-300 pt-1 pb-1">              
				<div class="card-body px-0 pb-0 pt-0 d-flex flex-column align-items-start">
					<h2 class="h4 font-weight-bold mb-3" >
					<a class="text-dark ">单轮对话示例</a>
					</h2>
					
					<div class="rk-st-dialogue mb-4" style="background-color: black;  width: 100%;"  >
						<span style="color: rgb(171, 227, 56);">&nbsp;Human: </span><span style="color: rgb(245, 171, 53);"><用户的问题或对话内容><br></span>
						<span style="color: rgb(171, 227, 56);">&nbsp;Assistant:</span><span style="color: rgb(245, 171, 53);"> <模型生成的响应></span>
					</div>
						
					<div>
						<small class="d-block mb-1"><a class="text-muted" >Example:</a></small>

					</div>
					<div class="rk-st-dialogue mb-4 " style="background-color: black;  width: 100%;"  >
						<span style="color: rgb(171, 227, 56);">&nbsp;Human: </span><span style="color: rgb(245, 171, 53);">你好<br></span>
						<span style="color: rgb(171, 227, 56);">&nbsp;Assistant:</span><span style="color: rgb(245, 171, 53);"> 你好，我是木子AI，有什么可以帮到你的吗？</span>
					</div>
				</div>
			</div>
			
		</div>

		<div class="col-lg-6 pl-lg-6 ">
				<h5 class="font-weight-bold spanborder"><span>制作要点</span></h5>
				<ol class="list-featured">
					<li>
					<span>
					<h6 class="font-weight-bold">
					<a  class="text-dark">定义对话目标和领域</a>
					</h6>
					<p class="text-muted">
						确定对话数据集所需涵盖的主题、问题类型和交互要素
					</p>
					</span>
					</li>
					<li>
					<span>
					<h6 class="font-weight-bold">
					<a  class="text-dark">设计对话场景和角色</a>
					</h6>
					<p class="text-muted">
						模拟真实世界中的对话，并确保数据集具有现实可行性
					</p>
					</span>
					</li>
					<li>
					<span>
					<h6 class="font-weight-bold">
					<a  class="text-dark">考虑多样性和边缘情况</a>
					</h6>
					<p class="text-muted">
						努力使数据集具有多样性并涵盖各种情况
					</p>
					</span>
					</li>
				</ol>
			<div class="pt-5 mt-5 d-flex align-items-center justify-content-center">  
   			 <a href="#rk_work" class="btn btn-dark btn-lg">开始制作</a>  
			</div>
		</div>
	</div>
</div>


<!-- 下面是工作区 -->
</template>

<style scoped>

.bgimg{

height: 150px;
background-image: url('../assets/img/demo/1.jpg');
background-repeat: no-repeat;
background-size: cover;
  }
</style>