<template>
<b-col class="testAction" cols="4">
    <h3>Action</h3>
    
    <b-button class="delete-btn" @click="deleteAction" size="sm" variant="danger">Delete</b-button>

    <b-form-input 
        class="test-element form-control" 
        v-b-popover.hover.topright="'Enter the element name here'" 
        placeholder="placeholder-element" 
        type="text"
        v-model="action.element">
    </b-form-input>
    
    <b-form-group class="element-radio">
        <b-form-radio-group v-model="action.type" :options="radioOptions" plain v-b-popover.hover.topright="'Is the element a class or an Id?'">
        </b-form-radio-group>
    </b-form-group>

    <b-form-select v-model="action.name" :options="options" v-b-popover.hover="'Add an action to the elements'"/>
    <b-form-input 
        v-if="action.options == 'typeText'" 
        v-model="action.variable" 
        class="action-variable" 
        placeholder="Lorem ipsum" 
        v-b-popover.hover="'Action Variables'" 
        type="text">
    </b-form-input>
</b-col>
</template>

<script>
export default {
    props:['action'], 
    name: 'testAction',
    data(){
        return {
            radioSelected: 'class',
            radioOptions: [
                {text: 'Class',   value: '.'},
                {text: 'Id',      value: '#'}
            ],
            selected: null,
            options: [
                // { value: null,                text: 'Select an action' },
                { value: 'typeText',          text: 'Type Text' },
                { value: 'pressKey',          text: 'Press Key' },
                { value: 'click',             text: 'Click' },
                { value: 'doubleClick',       text: 'Double Click' },
                { value: 'rightClick',        text: 'Right Click' },
                { value: 'hover',             text: 'Hover' },
                // { value: 'dragElement',       text: 'Drag Element' },
                // { value: 'selectText',        text: 'Select Text' },
                // { value: 'navigate',          text: 'Navigate' },
                // { value: 'takeScreenshot',    text: 'Take Screenshot' },
                // { value: 'upload',            text: 'Upload' },
                // { value: 'resizeWindow',      text: 'Resize Window' }
            ]
        }
    },
    methods:{
        deleteAction(){
            this.$emit('remove-action')
        }
    }
}
</script>

<style lang="scss">
    .testAction{
        float: left;
        margin-top: 20px;

        .test-element{
            width: 60%;
            float: left;
            clear: both;
            margin-right: 5%;
        }

        h3, label{
            float: left;
            clear: both;
        }

        .delete-btn{
            float: right;
        }

        .element-radio{
            float: left;
            // clear: both;
            margin-top: 10px;
        }
    }
</style>
