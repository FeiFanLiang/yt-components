## 测试文档

测试文档第一部分

### 这是一个测试文档

测试文档第二部分

:::yt-doc 这是一个doc介绍，在此处填写组件文档在此处填写组件文档在此处填写组件文档在此处填写组件文档在此处填写组件文档

```html
<template>
    <div>
        <test-component />
        <span class="span">
        {{ a }}
        </span>
        <el-button type="primary" size="mini" @click="handleClick">点击</el-button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            a:1
        }
    },
    methods:{
        handleClick(){
            this.a+=1
        }
    }
}
</script>
```
:::

## 组件示例1

:::yt-doc demo说明开头不能换行,中间不能主动使用回车进行换行，中间需要连续下来，像这样,下面是html代码，会被vue-loader解析。
```html
<template>
    <div class="wrap">
        <test-component />
        <span>
            {{ b }}
        </span>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                b:"2"
            }
        }
    }
</script>
<style>
    .wrap {
        border:1px solid #ccc;
    }
</style>
```
:::

## 组件示例2

:::yt-doc demo说明开头不能换行,中间不能主动使用回车进行换行，中间需要连续下来，像这样,下面是html代码，会被vue-loader解析。
```html
<template>
    <div class="wrap">
        <test-component />
        <span>
            {{ b }}
        </span>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                b:'2'
            }
        }
    }
</script>
<style>
    .wrap {
        border:1px solid #ccc;
    }
</style>
```
:::

## 组件示例3

:::yt-doc demo说明开头不能换行,中间不能主动使用回车进行换行，中间需要连续下来，像这样,下面是html代码，会被vue-loader解析。
```html
<template>
    <div class="wrap">
        <test-component />
        <span>
            {{b}}
        </span>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                b:"2"
            }
        }
    }
</script>
<style>
    .wrap {
        border:1px solid #ccc;
    }
</style>
```
:::