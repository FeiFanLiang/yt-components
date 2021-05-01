<template>
    <div>
        测试组件1
        <span>
            {{name}}
        </span>
    </div>
</template>
<script>
export default {
    name:"TestComponent",
    props:{
        name:{
            type:String,
            default:'default'
        }
    },
    data(){
        return {

        }
    }
}
</script>