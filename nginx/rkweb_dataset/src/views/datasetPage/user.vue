<script setup>
    const name = '个人主页'

</script>
<template>
    {{ name }}<hr>
    id:{{ $route.params.id }} <hr>
    name:{{ $route.params.name }} <hr>


</template>
