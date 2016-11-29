import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';
// These are the standard variables to give them, but you could change $, Backbone, and _

import TaskList from 'app/collections/task_list';
import TaskListView from 'app/views/task_list_view';

var taskData = [
  {
    title: 'Mow the lawn',
    description: 'Must be finished before BBQ on Sat afternoon'
  }, {
    title: 'Go to the Bank',
    description: 'Need to make a transfer'
  }, {
    title: 'Tune the Piano',
    description: 'High C is missing or something???'
  }
];

// **** Moved below code to -->   Week-17/backbone-live-code/src/app/views/task_view.js
// // extend takes a single object argument with an initialize function and a render function
// var TaskView = Backbone.View.extend({
//
//   /////// MANUALLY with RENDER ///////
//   // // The initialize function will be run once when the view is first created. Its job is to get everything ready to go. It takes one argument, options, which contains all the stuff the view was created with.
//   // initialize: function(options) {
//   //    this.task = options.task;
//   //    this.template = options.template;
//   // },
//   //
//   // // The render function will be called whenever the DOM needs to be updated, and its role is to re-generate all the HTML associated with this view.
//   // render: function() {
//   //   var html = '<li class="task">';
//   //   html += '<h2>' + this.task.title + '</h2>';
//   //   html += '<p>' + this.task.description + '</p>';
//   //   html += '</li>'; //this is a big string with all the html we want to render
//   //   this.$el.html(html); // this.$el is a jQuery element associated with this view.
//   //       // This will wrap a div around the html code you're putting inside it (we can change the default wrapper to something othere than div)
//   //   // Enable chained calls
//   //   // This is important enough that we'll leave it in, but
//   //   // we wont talk about it until later.
//   //   // console.log(this);
//   //   return this;
//   //////////////////////////////////////////
//
//   /////// VIEWING CORRECTLY ///////
//   // The initialize function will be run once when the view is first created. Its job is to get everything ready to go. It takes one argument, options, which contains all the stuff the view was created with.
//   initialize: function(options) {
//      this.task = options.task;
//      this.template = options.template;
//   },
//   render: function() {
//     var html = this.template({task: this.task});
//     this.$el.html(html);
//
//     return this;
//     // Chaining on render() is a very common thing in Backbone, and much of the code you'll find on the internet assumes you're using it. It will be much less painful to get into the habit of always returning "this" from render() now.
//   //////////////////////////////////////////
//   }
// });


// ****** Moved below code to -->   Week-17/backbone-live-code/src/app/views/task_list_view.js
// /////// VIEWING CORRECTLY ///////
// var TaskListView = Backbone.View.extend({
//   // The initialize function will be run once when the view is first created. Its job is to get everything ready to go. It takes one argument, options, which contains all the stuff the view was created with.
//   initialize: function(options) {
//       // Store a the full list of tasks
//      this.taskData = options.taskData;
//
//      // Compile a template to be shared between the individual tasks
//      this.taskTemplate = _.template($('#task-template').html());
//
//      // Keep track of the <ul> element
//      this.listElement = this.$('.task-list');
//
//      // Create a TaskView for each task
//      this.cardList = [];
//      this.taskData.forEach(function(task) {
//        var card = new TaskView({
//          task: task,
//          template: this.taskTemplate
//        });
//        this.cardList.push(card);
//      }, this); // bind `this` so it's available inside forEach  * i.e. "this" is another argument being passed into the forEach so it knows which "this" to use
//   },
//
//   render: function() {
//      // Make sure the list in the DOM is empty
//      // before we start appending items
//      this.listElement.empty();
//
//      // Loop through the data assigned to this view
//      this.cardList.forEach(function(card) {
//        // Cause the task to render
//        card.render();
//
//        // Add that HTML to our task list
//        this.listElement.append(card.$el);
//      }, this);
//
//      return this; // enable chained calls
//  //////////////////////////////////////////
//   }
// });



$(document).ready(function() {
  // // Hello World
  // $('#test-area').append($('<p>Hello World!</p>'));

  /////// MANUALLY with RENDER ///////
  // // Select the task-list element with jQuery
  // var taskListElement = $('.task-list');
  //
  // var cardList = [];
  // // Loop to display many tasks
  // taskData.forEach(function(task) {
  //   // Create a new View
  //   var card = new TaskView({task: task});
  //   cardList.push(card);
  //   // "to this task-list element append the card and pull the JS element ..."
  //   taskListElement.append(card.render().$el);
  // });
  //////////////////////////////////////////

  /////// USING UNDERSCORE TEMPLATE ///////
  // // Before a template can be used, it must be compiled. To do so, select the template using jQuery and pass it to the _.template() function:
  // var taskTemplate = _.template($('#task-template').html());
  // // Invoking taskTemplate
  // var taskListElement = $('.task-list');
  // var cardList = [];
  // taskData.forEach(function(task) {
  //     var card = new TaskView({
  //       task: task,
  //       template: taskTemplate
  //     });
  //     cardList.push(card);
  //     taskListElement.append(card.render().$el);
  // });
  //////////////////////////////////////////

  var taskList = new TaskList (taskData);

  /////// VIEWING CORRECTLY ///////  *** Moved all the view stuff in the above example to the new view TaskListView
  var application = new TaskListView({
    el: $('#application'),  // difference b/w el and $el: $el is a jQuery selector of that element  ***** So in task_list_view.js, when we use this.$(...) we are looking for any html elements within the el we set in this line... fuck this
    // taskData: taskData // commented when adding Collections
    /////// added COLLECTIONS ///////
    model: taskList

  });
  application.render();
  //////////////////////////////////////////


});
