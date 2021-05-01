<template>
    <div class="yt-demo-block">
        <div class="yt-demo-show">
            <slot name="source"></slot>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    }
}
</script>
<style lang="scss">
.yt-demo-block {
    border: 1px solid #ccc;
}
</style>