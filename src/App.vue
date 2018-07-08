<template>
<b-container id="app">
  <b-row>
    <b-col>
      <label>Fixture Name</label>
      <input class="fixtureName form-control" placeholder="Fixture name here" type="text">
    </b-col>
    <b-col>
      <label>Url to Test</label>
      <input class="testUrl form-control" placeholder="http://example.com/test" type="text">
    </b-col>
    <input @click="addTest" v-b-popover.hover="'Add a test to the fixture'" class="btn btn-primary" type="button" value="Add Test">
  </b-row>

  <div ref="tests"></div>
</b-container>
</template>

<script>
import Vue from 'vue'
import Test from './components/Test.vue'
export default {
  components:{
    'test': Test
  },
  name: 'app',
  data: function(){
      return{
          counter: 0
      }
  },
  methods:{
    addTest(){
      var testComponent = Vue.extend(Test)
      var instance = new testComponent({})
      this.$data.counter++
      instance.$slots.default = [this.$data.counter]
      instance.$mount();
      this.$refs.tests.appendChild(instance.$el)
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
}
</style>
