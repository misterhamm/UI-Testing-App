<template>
<b-row>
    <b-col class="constVar">
        <h3>Constant Variable</h3>
        
        <b-button 
            @click="deleteConstVar"
            class="delete-constVar"
            :disabled="this.$parent.constList[constVar.index].funcs.length > 0"
            size="sm" variant="danger">
            Delete
        </b-button>
        
        <b-button
            @click="addConstFunc(constVar.index)"
            class="add-constFunc">
            Add Function
        </b-button>
        
        <b-form-input 
            class="constVar-name" 
            v-b-popover.hover.topright="'Enter the const name here'" 
            placeholder="const-name" 
            type="text"
            v-model="constVar.name">
        </b-form-input>

        <b-form-input 
            class="constVar-element" 
            v-b-popover.hover.topright="'Enter the element name here'" 
            placeholder="element-name" 
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
        
        <b-row>
            <const-func 
            v-for="(func, index) in this.$parent.constList[constVar.index].funcs" 
            :key="index" 
            :constFunc="func"
            v-on:remove-constFunc="removeFunc(constVar.index, index)">
        </const-func>
        </b-row>
    </b-col>
</b-row>

</template>

<script>
import ConstFunc from './ConstFunc.vue'

export default {
    props:['constVar'], 
    name: 'constVar',
     components:{
        'const-func': ConstFunc
    },
    data(){
        return {
            radioSelected: 'class',
            radioOptions: [
                {text: 'Class', value: '.'},
                {text: 'Id',    value: '#'}
            ],
        }
    },
    methods:{
        addConstFunc(index){
            var funcs = this.$parent.constList[index].funcs
            
            funcs.push({name: null, options: null})
        },
        removeFunc(funcIndex, index){
            var counter = 0
            var funcs = this.$parent.constList[funcIndex].funcs
            
            funcs.splice(index, 1)
            funcs.forEach(func => {
                func.index = counter
                counter++
            });
        },
        deleteConstVar(){
            this.$emit('remove-constVar')
        }
    }
}
</script>

<style lang="scss">
    .constVar{
        float: left;
        background-color: #00ff0030;
        padding-top: 20px;
        padding-bottom: 20px;

        .row{
            clear: both;
        }
        .add-constFunc{
            float: right;
        }
        .delete-constVar{
            margin-left: 1%;
        }
        .constVar-name{
            float: left;
            width: 30%;
            clear: both;
        }
        .constVar-element{
            width: 30%;
            float: left;
            margin-right: 5%;
            margin-left: 5%;
        }
        h3, label{
            float: left;
            clear: both;
        }
        .element-radio{
            float: left;
            margin-top: 10px;
        }
    }
</style>
