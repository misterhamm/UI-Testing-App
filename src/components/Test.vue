<template>
<b-row>
    <b-col class="test">
        <h2>Test <slot></slot></h2>
        <label>Test Name</label>
        <input class="testName form-control" placeholder="Test name here" type="text">

        <input @click="addAction" class="btn btn-secondary" v-b-popover.hover="'Add an action to the test'" type="button" value="Add Action">
        <div ref="actions"></div>
    </b-col>
</b-row>
</template>

<script>
import Vue from 'vue'
import TestAction from './TestAction.vue'

export default {
    components:{
        'test-action': TestAction
    },
    name: 'test',
    data: function(){
        return{
            counter: 0
        }
    },
    methods:{
        addAction(){
            var actionComponent = Vue.extend(TestAction)
            var instance = new actionComponent({})
            this.$data.counter++
            instance.$slots.default = [this.$data.counter]
            instance.$mount();
            this.$refs.actions.appendChild(instance.$el)
        }
    }
}
</script>

<style lang="scss">
    .test{
        margin-top: 30px;
        
        // .btn {
        //     float: right;
        // }
        .testName{
            width: 80%;
        }
    }
</style>
