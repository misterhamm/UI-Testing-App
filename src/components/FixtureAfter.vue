<template>
<b-row>
    <b-col class="after-each">
        <h2 v-b-popover.hover.left="'These actions will run after ever test'">After Each</h2>
        <b-button @click="remove" class="delete-after-each" :disabled="this.$parent.fixtureAfterEach[0].actions.length > 0" variant="danger" size="sm">Delete After Each</b-button>

        <b-button @click="addAction()" class="add-action" variant="secondary" v-b-popover.hover="'Add an action to the test'">Add Action</b-button>
        <b-row>
            <test-action 
                v-for="(action, index) in this.$parent.fixtureAfterEach[0].actions" 
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
            this.$emit('remove-after')
        },
        removeAction(index){
            var counter = 0
            var actions = this.$parent.fixtureAfterEach[0].actions
            
            actions.splice(index, 1)
            actions.forEach(action => {
                action.index = counter
                counter++
            });
            
        },
        addAction(){
            var actions = this.$parent.fixtureAfterEach[0].actions
            
            actions.push({index: actions.length, type: '', element: '', name: '', options: ''})
        }
    }
}
</script>

<style lang="scss">
    .after-each{
        margin-top: 30px;

        .row{
            clear: both;
        }
        .add-action{
            float: right;
        }
        .delete-after-each{
            margin-left: 1%;
            margin-top: 3px;
        }
        label, h2{
            float: left;
            clear: both;
        }
    }
</style>
