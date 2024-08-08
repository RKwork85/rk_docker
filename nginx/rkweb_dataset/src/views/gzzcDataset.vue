<script setup>
    import Header from '../components/header.vue'
    import Footer from '../components/footer.vue'

</script>


<template>
    <!-- <Header /> -->
    <router-view/>   
    <!-- <Footer /> -->
</template>

<!--

    rooter 和 view 是根据不同的子路由加载不同的子页面
    header 和 footer 是共享的组件
-->