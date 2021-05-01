import Test from './test-component';

const install = (Vue,options) => {
    Vue.component(Test.name,Test)
}

export default {
    install
}