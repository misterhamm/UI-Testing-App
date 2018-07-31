<template>
<b-col class="testAction" cols="4">
    <h3>Action</h3>
    
    <b-button 
        @click="deleteAction" 
        class="delete-btn"
        variant="danger" size="sm">
        Delete
    </b-button>

    <b-button
        v-if="action.name != 'wait' && action.name != 'maxWindow'"
        @click="setUseConstVar(action); getConstListNames()"
        :pressed.sync="useConstVar"
        class="use-const" 
        variant="outline-secondary" size="sm">
        Use Const
    </b-button>

    <b-form-input 
        v-if="useConstVar == false && action.name != 'wait' && action.name != 'maxWindow'"
        class="action-element"
        v-b-popover.hover.topright="'Enter the element name here'" 
        placeholder="placeholder-element" 
        type="text"
        v-model="action.element">
    </b-form-input>
    
    <b-form-select
        v-model="action.element" 
        v-if="useConstVar == true" 
        :options="constListNames">
    </b-form-select>
    
    <b-form-group class="element-radio">
        <b-form-radio-group 
            v-model="action.type" 
            v-if="useConstVar == false && action.name != 'wait' && action.name != 'maxWindow'"
            :options="radioOptions" 
            plain 
            v-b-popover.hover.topright="'Is the element a class or an Id?'">
        </b-form-radio-group>
    </b-form-group>

    <b-form-select 
        v-model="action.name" 
        :options="options" 
        v-b-popover.hover="'Add an action to the elements'">
    </b-form-select>

    <b-form-input 
        v-if="showInput(action.name)"
        v-model="action.options" 
        class="action-options" 
        placeholder="Lorem ipsum" 
        v-b-popover.hover="'Action Option'" 
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
            useConstVar: false,
            constList: this.$parent.$parent.constList,
            constListNames: [], 
            radioSelected: 'class',
            radioOptions: [
                {text: 'Class',   value: '.'},
                {text: 'Id',      value: '#'}
            ],
            selected: null,
            options: [
                { value: null,                text: 'Select an action' },
                { value: 'typeText',          text: 'Type Text' },
                { value: 'selectText',        text: 'Select Text' },
                { value: 'click',             text: 'Click' },
                { value: 'doubleClick',       text: 'Double Click' },
                { value: 'rightClick',        text: 'Right Click' },
                { value: 'hover',             text: 'Hover' },
                { value: 'pressKey',          text: 'Press Key' },
                { value: 'wait',              text: 'Wait' },
                { value: 'maxWindow',         text: 'Maximize Window' },
                // { value: 'dragElement',       text: 'Drag Element' },
                // { value: 'navigate',          text: 'Navigate' },
                // { value: 'takeScreenshot',    text: 'Take Screenshot' },
                // { value: 'upload',            text: 'Upload' },
                // { value: 'resizeWindow',      text: 'Resize Window' }
            ]
        }
    },
    methods:{
        showInput(actionName){
            var inArray
            var actionsNeedInput = ['wait', 'pressKey', 'typeText']
            
            actionsNeedInput.forEach(name => {
                if(name == actionName){
                    inArray = true
                    return false
                }
            });

            return inArray
        },
        setUseConstVar(action){
            if(this.useConstVar){
                action.useConstVar = true
            }
            else{
                action.useConstVar = false
            }
        },
        getConstListNames(){
            this.constListNames = []
            this.constList.forEach(constVar => {
                this.constListNames.push(constVar.name)
            });
        },
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

        .use-const{
            float: right;
            margin-right: 1%; 
        }
        .action-element{
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
            margin-top: 10px;
        }
    }
</style>
