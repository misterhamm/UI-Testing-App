<template>

    <div class="test">
        <div class="testname">
        <h2 v-if="showName">{{test.name}}</h2> 
        <b-form-input id="testname" class="test-name form-control" v-model="test.name"  placeholder="Test Name" type="text"></b-form-input>
        <span class="test-name-edit"></span>
    </div>
<b-button @click="remove" class="delete-test" :disabled="this.$parent.testList[test.index].actions.length > 0" variant="danger" size="sm">Delete</b-button>
        <b-button @click="addAction(test.index)" class="add-action" variant="secondary" v-b-popover.hover="'Add an action to the test'">Add Action</b-button>

        <test-action 
            v-for="(action, index) in this.$parent.testList[test.index].actions" 
            :key="index" 
            :action="action" 
            v-on:remove-action="removeAction(test.index, index)">
        </test-action>
    </div>

</template>

<script>
import Vue from "vue";
import TestAction from "./TestAction.vue";

export default {
  props: ["test"],
  components: {
    "test-action": TestAction
  },
  name: "test",
  data: function() {
    return {
      showName: false
    };
  },
  methods: {
    remove() {
      this.$emit("remove-test");
    },
    removeAction(testIndex, index) {
      var counter = 0;
      var actions = this.$parent.testList[testIndex].actions;

      actions.splice(index, 1);
      actions.forEach(element => {
        element.index = counter;
        counter++;
      });
    },
    addAction(testIndex) {
      var actions = this.$parent.testList[testIndex].actions;

      actions.push({
        index: actions.length,
        type: "",
        element: "",
        name: "",
        options: ""
      });
    }
  }
};
</script>

<style lang="scss">
.test {
  .add-action {
    // float: right;
  }

  .delete-test {
    // margin-left: 5%;
  }
  label,
  h2 {
    // float: left;
    // clear: both;
  }
  .test-name {
    // float: left;
    // clear: both;
    // width: 80%;
  }
}
</style>
