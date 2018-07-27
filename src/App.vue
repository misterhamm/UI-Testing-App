<template>
<b-container id="app">
  <b-row>
    <b-col>
      <label>Fixture Name</label>
      <b-form-input class="fixture-name" v-model="fixtureName" placeholder="Project Name" type="text"></b-form-input>
    </b-col>
    <b-col>
      <label>Url to Test</label>
      <b-form-input class="test-url" v-model="testUrl" placeholder="http://example.com/test" type="url"></b-form-input>
    </b-col>
  </b-row>
  <b-row id="test-buttons">
    <b-col>
      <b-button 
        @click="addBeforeEach" 
        class="add-before"
        v-model="fixtureBeforeEach"
        :disabled="fixtureBeforeEach.length > 0"
        variant="primary" size="lg">
        Add Before
      </b-button>
    </b-col>
    <b-col>
      <b-button 
        @click="addTest" 
        class="add-test" 
        v-model="testList" 
        v-b-popover.hover.top="'Add a test to the fixture'" 
        variant="primary" size="lg">
        Add Test
      </b-button>
    </b-col>
    <b-col>
      <b-button 
        @click="addAfterEach" 
        class="add-after" 
        v-model="fixtureAfterEach"
        :disabled="fixtureAfterEach.length > 0"
        variant="primary" size="lg">
        Add After
      </b-button>
    </b-col>
     <b-col>
      <b-button 
        @click="addConstVariable" 
        class="add-consts" 
        v-model="constList"
         v-b-popover.hover.top="'Access elements that don\'t have unique identifiers with consts'"
        variant="primary" size="lg">
        Add Consts
      </b-button>
    </b-col>
  </b-row>
  
  <consts-var v-for="(constVar, index) in constList" :constVar="constVar" :key="'const-' + index" v-on:remove-constVar="removeConst(index)"></consts-var>
  <fixture-before v-for="(before, index) in fixtureBeforeEach" :fixBefore="before" :key="'before-' + index" v-on:remove-before="removeBefore(index)"></fixture-before>
  <test v-for="(test, index) in testList" :test="test" :key="'test-' + index" v-on:remove-test="removeTest(index)"></test>
  <fixture-after v-for="(after, index) in fixtureAfterEach" :fixAfter="after" :key="'after-' + index" v-on:remove-after="removeAfter(index)"></fixture-after>

  <b-button 
    @click="setupJson" 
    class="save-test" 
    :disabled="isDisabled"
    variant="success" 
    size="lg">Save Test
  </b-button>
  <!-- "this.fixtureName === null && this.testUrl === null && this.testList.length <= 0"  -->
  {{ testPackage }}
  <!-- {{ testList }} -->
  <!-- {{ testPackage }} -->
</b-container>
</template>

<script>
import Vue from 'vue'
import Test from './components/Test.vue'
import FixtureBefore from './components/FixtureBefore.vue'
import FixtureAfter from './components/FixtureAfter.vue'
import ConstsVariable from './components/Consts.vue'
import FileSaver from 'file-saver'

export default {
  name: 'app',
  components:{
    'test': Test,
    'fixture-before': FixtureBefore,
    'fixture-after': FixtureAfter,
    'consts-var': ConstsVariable,
  },
  data() {
    return {
      fixtureName: null,
      testUrl: null,
      constList: [],
      fixtureBeforeEach: [],
      fixtureAfterEach: [],
      testList: [],
      testPackage: {}
    }
  },
  computed: {
    isDisabled() {
      var fixNameAndUrl
      var testNameAndSpeed
      var actionGood

      if(this.fixtureName && this.testUrl){
        fixNameAndUrl = true
      }

      this.testList.forEach(test => {
        if(test.name && test.speed){
          testNameAndSpeed = true
        }

        test.actions.forEach(action => {
          if(action.type && action.element && action.name){
            actionGood = true
          }
        });
      });
      //  this.testList[0].actions.length > 0){

      if(fixNameAndUrl && testNameAndSpeed && actionGood){
        return false
      }
      else{
        return true
      }
    }
  },
  methods:{
    addBeforeEach(){
      this.fixtureBeforeEach.push({actions: []})
    },
    addTest(){
      this.testList.push({index: this.testList.length, name: null, actions: [], speed: 1})
    },
    addAfterEach(){
      this.fixtureAfterEach.push({actions: []})
    },
    addConstVariable(){
      this.constList.push({index: this.constList.length, type: null, element: null, name: null, funcs: [] })
    },
    removeBefore(index){
      this.fixtureBeforeEach.splice(index, 1)
    },
    removeTest(index){
      var counter = 0

      this.testList.splice(index, 1)
      this.testList.forEach(test => {
          test.index = counter
          counter++
      });
    },
    removeAfter(index){
      this.fixtureAfterEach.splice(index, 1)
    },
    removeConst(index){
      this.constList.splice(index, 1)
    },
    getTest(testList){
      var formatedTest = ''

      testList.forEach(test => {
        formatedTest += "\n\ntest('" + test.name + "', async t => {"
        formatedTest += "\n\tawait t"
        formatedTest += "\n\t.setTestSpeed(" + test.speed + ")"

        test.actions.forEach(action => {
            formatedTest += figureOutAction(action)
        });
        
        formatedTest += "\n});"
      });

      return formatedTest
    },
    figureOutAction(action){
      switch(action.name){
        case 'maxWindow':
          return "\n\t." + action.name + "()"
          break
        case 'wait':
          return "\n\t." + action.name + "(" + action.option + ")"
          break
        default:
          if(action.useConstVar){
            if(action.options){
              return "\n\t." + action.name + "(" + action.element + ", '" + action.options + "')"
              break
            }
            else{
              return "\n\t." + action.name + "(" + action.element + ")"
              break
            }
          }
          else{
            if(action.options){
              return "\n\t." + action.name + "('" + action.type + action.element + "', '" + action.options + "')"
              break
            }
            else{
              return "\n\t." + action.name + "('" + action.type + action.element + "')" 
              break
            }
          }
      }
    },
    getConstsVars(constList){
      var formatedConsts = ''

      constList.forEach(constVar => {
        formatedConsts += "\nconst "+ constVar.name + " = Selector('" + constVar.type + constVar.element + "')"

        constVar.funcs.forEach(func => {
          if(func.name == 'withText' || func.name == 'pressKey' || func.name == 'find'){
            formatedConsts += "." + func.name + "('" + func.options + "')"  
          }
          else{
            formatedConsts += "." + func.name + "(" + func.options + ")"
          }
        });
      });

      return formatedConsts
    },
    getBeforeEach(beforeEachActions){
      var formatedBefore = ''

      formatedBefore += '\n\t.beforeEach(async t => {'
      formatedBefore += '\n\t\tawait t'
      
      beforeEachActions.forEach(action => {
         if(action.options){
            formatedBefore += "\n\t\t." + action.name + "('" + action.type + action.element + "', '" + action.options + "')"
          }
          else{
            formatedBefore += "\n\t\t." + action.name + "('" + action.type + action.element + "')" 
          }
      });

      formatedBefore += '\n\t})'
      return formatedBefore
    },
    getAfterEach(afterEachActions){
      var formatedAfter = ''

      formatedAfter += '\n\t.afterEach(async t => {'

      afterEachActions.forEach(action => {
         if(action.options){
            formatedAfter += "\n\t\t." + action.name + "('" + action.type + action.element + "', '" + action.options + "')"
          }
          else{
            formatedAfter += "\n\t\t." + action.name + "('" + action.type + action.element + "')" 
          }
      });

      formatedAfter += '\n\t})'
      return formatedAfter
    },
    saveFile(generatedFile, fixtureName){
      var file = new File([generatedFile], "" + fixtureName + ".js", {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(file);
    },
    generateFile(json){
      var genFile = '' 
      genFile += "import { Selector } from 'testcafe';\n"

      if(json.constList[0]){
        genFile += this.getConstsVars(json.constList)
      }

      genFile += "\n\nfixture `" + json.fixtureName + "`"
      genFile += "\n\t.page `" + json.testUrl + "`"
      
      if(json.beforeEach[0]){
        genFile += this.getBeforeEach(json.beforeEach[0].actions)
      }
      
      if(json.afterEach[0]){
        genFile += this.getAfterEach(json.afterEach[0].actions)
      }
      
      genFile += this.getTest(json.testList)
      this.saveFile(genFile, json.fixtureName)
    },
    setupJson(){
      this.testPackage = {
        fixtureName: this.fixtureName,
        testUrl: this.testUrl,
        constList: this.constList,
        beforeEach: this.fixtureBeforeEach,
        afterEach: this.fixtureAfterEach,
        testList: this.testList
      }

      this.generateFile(this.testPackage)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;

  #test-buttons{
    margin-bottom: 30px;
  }
  .save-test{
    width: 100%;
    margin-top: 30px;
  }
  .add-test, .add-before, .add-after, .add-consts{
    width: 100%;
    margin-top: 30px;
    padding: 4px;
  }
}
</style>
