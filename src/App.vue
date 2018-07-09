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
    setupJson(){
      var json = {
        fixtureName: this.fixtureName,
        testUrl: this.testUrl,
        testList: this.testList
      }
      //send data to...
      generateFile(json)
    },
    generateFile(json){
      var file = new File(["Hello, world!"], "hello world.txt", {type: "text/plain;charset=utf-8"});
      saveAs(file);
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
