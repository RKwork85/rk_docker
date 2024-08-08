<script setup lang="ts">

</script>

<template>

<div class="container pt-4 pb-4 animate__animated animate__fadeInDown">
	<div class="row">
		<div class="col-lg-6">
			<div class="card border-0 mb-4 box-shadow h-xl-300">              
				<div class="bgimg"></div>

				<div>
                </div>               
				<div class="card-body px-0 pb-0 d-flex flex-column align-items-start">
					<h2 class="h4 font-weight-bold">
					<a class="text-dark" >多轮对话（Multi-turn Dialogue）</a>
					</h2>
					<p class="card-text">
						多轮对话是指一系列连续的、有逻辑关联的对话回合，这些对话回合共同构成了一个完整的对话流程。与单轮对话（Single-turn Dialogue）不同，多轮对话需要系统能够理解和维持对话的上下文，以便在后续的对话回合中做出合适的响应。
					</p>
				</div>

			</div>
			<div class="card border-0 mb-0 box-shadow h-xl-300 pt-1 pb-1">              
				<div class="card-body px-0 pb-0 pt-0 d-flex flex-column align-items-start">
					<h2 class="h4 font-weight-bold mb-3" >
					<a class="text-dark ">多轮对话示例</a>
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
					<a  class="text-dark">注重对话的上下文关联</a>
					</h6>
					<p class="text-muted">
						符合对话逻辑，维持连续，一致的对话上下文
					</p>
					</span>
					</li>
					<li>
					<span>
					<h6 class="font-weight-bold">
					<a  class="text-dark">设计合理的对话流程</a>
					</h6>
					<p class="text-muted">
						模拟真实世界中的对话，并确保数据集具有现实可行性
					</p>
					</span>
					</li>
					<li>
					<span>
					<h6 class="font-weight-bold">
					<a  class="text-dark">编写多样化的对话样本</a>
					</h6>
					<p class="text-muted">
						具有泛化能力的多轮对话系统,依赖对话样本的多样化
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
background-image: url('../assets/img/demo/3.jpg');
background-repeat: no-repeat;
background-size: cover;
  }
</style>