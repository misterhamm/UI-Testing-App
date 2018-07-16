<template>
<b-row>
    <b-col class="test">
        <h2>Test</h2>
        <b-button @click="remove" class="delete-test" :disabled="this.$parent.testList[test.index].actions.length > 0" variant="danger" size="sm">Delete Test</b-button>
        <label>Test Name</label>
        <b-form-input 
            class="test-name form-control" 
            v-model="test.name" 
            placeholder="Test name here" 
            type="text">
        </b-form-input>
        <b-form-input 
            class="test-speed form-control" 
            v-model="test.speed" 
            v-b-popover.hover.top="'0.1 - 1 (1 being the fastest)'"
            placeholder="Test Speed" 
            type="number" 
            required="true"
            value="1" step=".1" min=".1" max="1">
        </b-form-input>

        <b-button @click="addAction(test.index)" class="add-action" variant="secondary" v-b-popover.hover="'Add an action to the test'">Add Action</b-button>
        <b-row>
            <test-action 
                v-for="(action, index) in this.$parent.testList[test.index].actions" 
                :key="index" 
                :action="action" 
                v-on:remove-action="removeAction(test.index, index)">
            </test-action>
        </b-row>
    </b-col>
</b-row>
</template>

<script>
import Vue from 'vue'
import TestAction from './TestAction.vue'

export default {
    props: ['test'],
    components:{
        'test-action': TestAction
    },
    name: 'test',
    data: function(){
        return{
        }
    },
    methods:{
        remove(){
            this.$emit('remove-test')
        },
        removeAction(testIndex, index){
            var counter = 0
            var actions = this.$parent.testList[testIndex].actions
            
            actions.splice(index, 1)
            actions.forEach(action => {
                action.index = counter
                counter++
            });
            
        },
        addAction(testIndex){
            var actions = this.$parent.testList[testIndex].actions
            
            actions.push({index: actions.length, type: '', element: '', name: '', options: ''})
        }
    }
}
</script>

<style lang="scss">
    .test{
        margin-top: 30px;

        .row{
            clear: both;
        }
        .add-action{
            float: right;
        }
        .delete-test{
            margin-left: 1%;
        }
        label, h2{
            float: left;
            clear: both;
        }
        .test-speed{
            width: 12%;
            margin-left: 1%;
            float: left;
        }
        .test-name{
            float: left;
            clear: both;
            width: 60%;
        }
    }
</style>
