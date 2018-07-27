<template>
<b-row :key="'fixBefore-' + fixBefore.index">
    <b-col class="before-each">
        <h2 v-b-popover.hover.left="'These actions will run before ever test'">Before Each</h2>
        <b-button @click="remove" class="delete-before-each" :disabled="this.$parent.fixtureBeforeEach[0].actions.length > 0" variant="danger" size="sm">Delete Before Each</b-button>

        <b-button @click="addAction()" class="add-action" variant="secondary" v-b-popover.hover="'Add an action to the test'">Add Action</b-button>
        <b-row>
            <test-action 
                v-for="(action, index) in this.$parent.fixtureBeforeEach[0].actions" 
                :key="index" 
                :action="action" 
                v-on:remove-action="removeAction(index)">
            </test-action>
        </b-row>
    </b-col>
</b-row>
</template>

<script>
import Vue from 'vue'
import TestAction from './TestAction.vue'

export default {
    props: ['fixBefore'],
    name: 'fixBefore',
    components:{
        'test-action': TestAction
    },
    data: function(){
        return{
        }
    },
    methods:{
        remove(){
            this.$emit('remove-before')
        },
        removeAction(index){
            var counter = 0
            var actions = this.$parent.fixtureBeforeEach[0].actions
            
            actions.splice(index, 1)
            actions.forEach(action => {
                action.index = counter
                counter++
            });
            
        },
        addAction(){
            var actions = this.$parent.fixtureBeforeEach[0].actions
            
            actions.push({index: actions.length, type: '', element: '', name: '', options: ''})
        }
    }
}
</script>

<style lang="scss">
    .before-each{
        margin-top: 30px;

        .row{
            clear: both;
        }
        .add-action{
            float: right;
        }
        .delete-before-each{
            margin-left: 1%;
            margin-top: 3px;
        }
        label, h2{
            float: left;
            clear: both;
        }
    }
</style>
