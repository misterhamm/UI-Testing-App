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
  <b-row>
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
  <b-row>
    <consts-var v-for="(constVar, index) in constList" :key="index" :constVar="constVar" v-on:remove-consts="removeConst(index)"></consts-var>
  </b-row>
  <fixture-before v-for="(before, index) in fixtureBeforeEach" :key="index" v-on:remove-before="removeBefore(index)"></fixture-before>
  <test v-for="(test, index) in testList" :key="index" :test="test" v-on:remove-test="removeTest(index)"></test>
  <fixture-after v-for="(after, index) in fixtureAfterEach" :key="index" v-on:remove-after="removeAfter(index)"></fixture-after>

  <b-button 
    @click="setupJson" 
    class="save-test" 
    :disabled="this.fixtureName === null && this.testUrl === null && this.testList.length <= 0" 
    variant="success" 
    size="lg">Save Test
  </b-button>
  {{ testPackage }}
  {{ fixtureBeforeEach }}
  {{ constList }}
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
  methods:{
    addBeforeEach(){
      this.fixtureBeforeEach.push({actions: []})
      console.log(this.fixtureBeforeEach.length != 1)
      console.log(this.fixtureBeforeEach.length)
      console.log(this.fixtureBeforeEach)
    },
    addTest(){
      this.testList.push({index: this.testList.length, name: '', actions: []})
    },
    addAfterEach(){
      this.fixtureAfterEach.push({actions: []})
    },
    addConstVariable(){
      this.constList.push({name: '', type: '', element: '', func: '', options: ''})
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
    getTest(testList){
      var formatedTest = ''

      testList.forEach(test => {
        formatedTest += "\n\ntest('" + test.name + "', async t => {"
        formatedTest += "\n\tawait t"
      
        test.actions.forEach(action => {
          if(action.useConstVar){
            if(action.options){
              formatedTest += "\n\t." + action.name + "(" + action.element + ", '" + action.options + "')"
            }
            else{
              formatedTest += "\n\t." + action.name + "(" + action.element + ")"
            }
          }
          else{
            if(action.options){
              formatedTest += "\n\t." + action.name + "('" + action.type + action.element + "', '" + action.options + "')"
            }
            else{
              formatedTest += "\n\t." + action.name + "('" + action.type + action.element + "')" 
            }
          }
          
        });
        
        formatedTest += "\n});"
      });

      return formatedTest
    },
    getConstsVars(constList){
      var formatedConsts = ''

      constList.forEach(constVar => {
        switch(constVar.func){
          case 'nth': 
            formatedConsts += "\n const "+ constVar.name + " = Selector('"+ constVar.type + constVar.element +"')." + constVar.func + "(" + parseInt(constVar.options) + ")"
            break
        }
        
      });

      return formatedConsts
    },
    getBeforeEach(beforeEachActions){
      var formatedBefore = ''

      formatedBefore += '.before( async t => {'

      beforeEachActions.forEach(action => {
         if(action.options){
            formatedBefore += "\n\t." + action.name + "('" + action.type + action.element + "', '" + action.options + "')"
          }
          else{
            formatedBefore += "\n\t." + action.name + "('" + action.type + action.element + "')" 
          }
      });

      formatedBefore += '})'
      return formatedBefore
    },
    getAfterEach(afterEachActions){
      var formatedAfter = ''

      formatedAfter += '.after( async t => {'

      afterEachActions.forEach(action => {
         if(action.options){
            formatedAfter += "\n\t." + action.name + "('" + action.type + action.element + "', '" + action.options + "')"
          }
          else{
            formatedAfter += "\n\t." + action.name + "('" + action.type + action.element + "')" 
          }
      });

      formatedAfter += '})'
      return formatedAfter


    },
    saveFile(generatedFile, fixtureName){
      var file = new File([generatedFile], "" + fixtureName + ".js", {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(file);
    },
    generateFile(json){
      var genFile = '' 
      genFile += "import { Selector } from 'testcafe';"

      if(json.constList[0]){
        genFile += this.getConstsVars(json.constList)
      }

      genFile += "\n\nfixture `" + json.fixtureName + "`"
      genFile += "\n\t.page `" + json.testUrl + "`;"
      
      if(json.fixtureBeforeEach){
        genFile += this.getBeforeEach(json.beforeEach.actions)
      }
      
      if(json.fixtureAfterEach){
        genFile += this.getAfterEach(json.afterEach.actions)
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
