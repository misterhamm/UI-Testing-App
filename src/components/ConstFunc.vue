<template>
<b-col class="constFunc" cols="4">
    <b-button
        @click="deleteFunc" 
        class="delete-func" 
        variant="danger" size="sm">
        Delete Const Function
    </b-button>

    <b-form-select v-model="constFunc.name" :options="options" v-b-popover.hover="'Choose a function'"/>
    
    <b-form-input 
        v-model="constFunc.options"
        v-if="constFunc.name == 'nth'"
        class="constFunc-options"
        placeholder="Enter Number"
        v-b-popover.hover="'Remember the first element starts at 0'"
        type="number" min=0>
    </b-form-input>
    <b-form-input 
        v-model="constFunc.options"
        v-else-if="constFunc.name == 'withText' || constFunc.name == 'withExactText'"
        class="constFunc-options"
        placeholder="Lorem ipsum"
        v-b-popover.hover="'Find an element with the text'"
        type="text">
    </b-form-input>
    <b-form-input 
        v-model="constFunc.options"
        v-else-if="constFunc.name == 'withAttribute'"
        class="constFunc-options"
        placeholder="'{attributeName} , '{attributeValue}'"
        v-b-popover.hover="'You must put single quotes around attribute name followed by a common then single quotes around attribute value'"
        type="text">
    </b-form-input>
    <b-form-input 
        v-model="constFunc.options"
        v-else-if="constFunc.name == 'find' || constFunc.name == 'parent' || constFunc.name == 'child' || constFunc.name == 'sibling' || constFunc.name == 'prevSibling' || constFunc.name == 'nextSibling'"
        class="constFunc-options"
        placeholder=".example-class"
        v-b-popover.hover="'Used like jQuery function: {element} OR .{className} OR #{idName}'"
        type="text">
    </b-form-input>
</b-col>
</template>

<script>
export default {
    props:['constFunc'], 
    name: 'constFunc',
    data(){
        return {
            radioSelected: 'class',
            radioOptions: [
                {text: 'Class', value: '.'},
                {text: 'Id',    value: '#'}
            ],
            selected: null,
            options: [
                // { value: null,              text: 'Select an function' },
                { value: 'nth',             text: 'nth' },
                { value: 'withText',        text: 'withText' },
                { value: 'withExactText',   text: 'withExactText' },
                { value: 'withAttribute',   text: 'withAttribute' },
                // { value: 'filterVisible',   text: 'filterVisible' },
                // { value: 'filterHidden',    text: 'filterHidden' },
                // { value: 'filter',          text: 'filter' },
                { value: 'find',            text: 'find' },
                { value: 'parent',          text: 'parent' },
                { value: 'child',           text: 'child' },
                { value: 'sibling',         text: 'sibling' },
                { value: 'nextSibling',     text: 'nextSibling' },
                { value: 'prevSibling',     text: 'prevSibling' },
            ]
        }
    },
    methods:{
        deleteFunc(){
            this.$emit('remove-constFunc')
        }
    }
}
</script>

<style lang="scss">
    .constFunc{
        float: left;
        margin-top: 20px;
        
        .delete-func{
            width: 100%;
            margin-bottom: 5px;
        }
        select{
            margin-bottom: 5px;
        }

    }
</style>
