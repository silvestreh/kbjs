<template>
    <div class="wrapper">
        <router-view :is="view" class="animated" transition="main" transition-mode="out-in"></router-view>
    </div>
</template>

<script>
import store from './vuex/store';

export default {
    store,
};
</script>

<style lang="scss" src="./stylesheets/main.scss"></style>
