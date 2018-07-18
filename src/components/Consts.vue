<template>
<b-col class="constVar" cols="4">
    <h3>Constant Veriable</h3>
    
    <b-button @click="deleteConstVar" class="delete-constVar"  size="sm" variant="danger">Delete</b-button>

    <b-form-input 
        class="constVar-name" 
        v-b-popover.hover.topright="'Enter the const name here'" 
        placeholder="placeholder-name" 
        type="text"
        v-model="constVar.name">
    </b-form-input>

    <b-form-input 
        class="constVar-element" 
        v-b-popover.hover.topright="'Enter the element name here'" 
        placeholder="placeholder-element" 
        type="text"
        v-model="constVar.element">
    </b-form-input>
    
    <b-form-group class="element-radio">
        <b-form-radio-group 
            v-model="constVar.type" 
            :options="radioOptions" 
            plain 
            v-b-popover.hover.topright="'Is the element a class or an Id?'">
        </b-form-radio-group>
    </b-form-group>

    <b-form-select v-model="constVar.func" :options="options" v-b-popover.hover="'Choose a function'"/>
    <b-form-input 
        v-model="constVar.options" 
        class="constVar-options" 
        placeholder="Lorem ipsum" 
        v-b-popover.hover="'Consts Option'" 
        type="text">
    </b-form-input>
</b-col>
</template>

<script>
export default {
    props:['constVar'], 
    name: 'constVar',
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
                { value: 'filterVisible',   text: 'filterVisible' },
                { value: 'filterHidden',    text: 'filterHidden' },
                { value: 'filter',          text: 'filter' },
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
        deleteConstVar(){
            this.$emit('remove-constVar')
        }
    }
}
</script>

<style lang="scss">
    .constVar{
        float: left;
        margin-top: 20px;

        .constVar-element{
            width: 60%;
            float: left;
            clear: both;
            margin-right: 5%;
        }
        h3, label{
            float: left;
            clear: both;
        }
        .delete-constVar{
            float: right;
        }
        .element-radio{
            float: left;
            margin-top: 10px;
        }
    }
</style>
