//task.js
import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';


var Task = Backbone.Model.extend({
  defaults: {
    title: "Placeholder Title",
    description: "Placeholder Description",
    complete: false, // This is unnecessary since undefined is falsey.
  },

  initialize: function (options) {
    console.log("Task Created with: " +
    this.get("title"));
    // this.set("description", "JavaScript is frustrating!")
  },

  toggleComplete: function() {
    var comp = this.get("complete");
    this.set("complete", !comp);
  }
});

export default Task;
