<template>
<b-col class="testAction" cols="4">
    <h3>Action <slot></slot></h3>
    <label>Element</label>
    <input class="testElement form-control" v-b-popover.hover="'Enter the element name here'" placeholder="placeholder-element" type="text">
    
    <b-form-group>
        <b-form-radio-group v-b-popover.hover="'Is the element a class or an Id?'">
            <b-form-radio value="class">Class</b-form-radio>
            <b-form-radio value="id">Id</b-form-radio>
        </b-form-radio-group>
    </b-form-group>

    <b-form-select v-model="selected" :options="options" v-b-popover.hover="'Add an action to the elements'"/>
</b-col>
</template>

<script>
export default {
  name: 'testAction',
  data(){
      return {
          selected: null,
          options: [
              { value: null,                text: 'Select and action' },
              { value: 'typeText',          text: 'Type Text' },
              { value: 'pressKey',          text: 'Press Key' },
              { value: 'click',             text: 'Click' },
              { value: 'doubleClick',       text: 'Double Click' },
              { value: 'rightClick',        text: 'Right Click' },
              { value: 'hover',             text: 'Hover' },
              { value: 'dragElement',       text: 'Drag Element' },
              { value: 'selectText',        text: 'Select Text' },
              { value: 'navigate',          text: 'Navigate' },
              { value: 'takeScreenshot',    text: 'Take Screenshot' },
              { value: 'upload',            text: 'Upload' },
              { value: 'resizeWindow',      text: 'Resize Window' }
          ]
      }
  }
}
</script>

<style lang="scss">
    .testAction{
        float: left;
        margin-top: 20px;

        h3{
            text-align: center
        }
    }
</style>
