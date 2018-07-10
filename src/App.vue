<template>
<b-container id="app">
  <b-row>
    <b-col>
      <label>Fixture Name</label>
      <b-form-input class="fixture-name form-control" v-model="fixtureName" placeholder="Project Name" type="text"></b-form-input>
    </b-col>
    <b-col>
      <label>Url to Test</label>
      <b-form-input class="test-url form-control" v-model="testUrl" placeholder="http://example.com/test" type="url"></b-form-input>
    </b-col>
    <b-col cols="2">
      <b-button @click="addTest" class="add-test" v-model="testList" v-b-popover.hover="'Add a test to the fixture'" variant="primary" size="lg">Add Test</b-button>
    </b-col>
  </b-row>

  
  <test v-for="(test, index) in testList" :key="index" :test="test" v-on:remove-test="removeTest(index)"></test>

  <b-button 
    @click="setupJson" 
    class="save-test" 
    :disabled="this.fixtureName === null && this.testUrl === null && this.testList.length <= 0" 
    variant="success" 
    size="lg">Save Test
  </b-button>
  {{ testPackage }}
</b-container>
</template>

<script>
import Vue from 'vue'
import Test from './components/Test.vue'
import FileSaver from 'file-saver'

export default {
  name: 'app',
  components:{
    'test': Test,
  },
  data() {
    return {
      fixtureName: null,
      testUrl: null,
      testList: [],
      testPackage: {}
    }
  },
  methods:{
    actionsAreReady(){
      this.testList.forEach(element => {
        element.actions.forEach(el => {
          
        });        
      });
    },
    removeTest(index){
      var counter = 0

      this.testList.splice(index, 1)
      this.testList.forEach(element => {
          element.index = counter
          counter++
      });
    },
    addTest(){
      this.testList.push({index: this.testList.length, name: '', actions: []})
    },
     saveFile(generatedFile){
      var file = new File([generatedFile], "test.js", {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(file);
    },
    getTest(testList){
      var formatedTest = ''

      testList.forEach(test => {
        formatedTest += "\n\ntest('" + test.name + "', async t => {"
        formatedTest += "\n\tawait t"
      
        test.actions.forEach(action => {
          if(action.options){
            formatedTest += "\n\t." + action.name + "('" + action.type + action.element + "', '" + action.options + "'"
          }
          else{
            formatedTest += "\n\t." + action.name + "('" + action.type + action.element + "')" 
          }
        });
        
        formatedTest += "\n});"
      });

      return formatedTest
    },
    generateFile(json){
      var genFile = '' 
      genFile += "import { Selector } from 'testcafe';"
      genFile += "\n\nfixture `" + json.fixtureName + "`"
      genFile += "\n\t.page `" + json.testUrl + "`;"
      genFile += this.getTest(json.testList)

      this.saveFile(genFile)
    },
    setupJson(){
      this.testPackage = {
        fixtureName: this.fixtureName,
        testUrl: this.testUrl,
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
  .add-test{
    width: 100%;
    margin-top: 30px;
    padding: 4px;
  }
}
</style>
