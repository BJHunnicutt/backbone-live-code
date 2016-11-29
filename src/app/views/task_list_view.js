import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';


import Task from 'app/models/task';
import TaskView from 'app/views/task_view';
import TaskList from 'app/collections/task_list';

/////// VIEWING CORRECTLY ///////
var TaskListView = Backbone.View.extend({
  // The initialize function will be run once when the view is first created. Its job is to get everything ready to go. It takes one argument, options, which contains all the stuff the view was created with.
  initialize: function(options) {
    // Store a the full list of tasks
    //  this.taskData = options.taskData; // Remoded this when we added models, because we no longer need an array of our task data since we are storing the modelList below
    ////////////// ADDING MODEL //////////////
    // this.modelList = [];


     // Compile a template to be shared between the individual tasks
     this.taskTemplate = _.template($('#task-template').html());

     // Keep track of the <ul> element
     this.listElement = this.$('.task-list');

     // Create a TaskView for each task
     this.cardList = [];
     //////// Commented this out when we added the model
     /////// added COLLECTIONS ///////


     this.model.forEach(function(task) {

         //////// Commented this out when we added the model
        //  var card = new TaskView({
        //    task: task,
        //    template: this.taskTemplate
        //  });
        //  this.cardList.push(card);

        ////////////// ADDING MODEL //////////////
        this.addTask(task);
     }, this); // bind `this` so it's available inside forEach  * i.e. "this" is another argument being passed into the forEach so it knows which "this" to use


     ////////////// ADDING EVENTS //////////////
     // Keep track of our form input fields
    this.input = {
      title: this.$('.new-task input[name="title"]'),
      description: this.$('.new-task input[name="description"]')
    };

    //////////////////////////////////////////


    // Rerender whenever the model is updated
    this.listenTo(this.model, "update", this.render);
    // re-add the task whenever the model has been added to
    this.listenTo(this.model, "add", this.addTask);

    // re-add the task whenever the model has been added to
    this.listenTo(this.model, "remove", this.removeTask);

  }, // end initialize function

  render: function() {
     // Make sure the list in the DOM is empty
     // before we start appending items
     this.listElement.empty();

     // Loop through the data assigned to this view
     this.cardList.forEach(function(card) {
       // Cause the task to render
       card.render();

       // Add that HTML to our task list
       this.listElement.append(card.$el);
     }, this);

     return this; // enable chained calls
 //////////////////////////////////////////
  }, // end render function



  ////////////// ADDING EVENTS //////////////
  events: {
    'submit .new-task': 'createTask',   // "We're intercepting a form submit event"
    'click .clear-button': 'clearInput'
  },

  createTask: function(event) {
    console.log('createTask called');
    // Suppress that behavior.
    event.preventDefault();

    // Get the input data from the form and turn it into a task
    var task = this.getInput();


    // Add the new task to our list of tasks
    ////////////// ADDING MODEL //////////////
    ////// Commented this out and... ////////
    // this.taskData.push(task);
    //
    // // Create a card for the new task, and add it to our card list
    // var card = new TaskView({
    //   task: task,
    //   template: this.taskTemplate
    // });
    // this.cardList.push(card);
    ////////////// ADDING MODEL //////////////
    //////////// added this ... //////////////

    ////////////// ADDING MODEL //////////////

    // this.addTask(task); // THis is unnecessary b/c we listenTo this.model "add"s
    this.model.add(task);
    ////////////// //////////////

    // Re-render the whole list, now including the new card
    // this.render(); // THis is unnecessary b/c we listenTo this.model "update"s

    // Clear the input form so the user can add another task
    this.clearInput();
  },

  clearInput: function(event) {
    console.log("clearInput called");
    this.input.title.val('');
    this.input.description.val('');

  },

  // Build a task from the data entered in the .new-task form
  getInput: function() {
    var task = {
      title: this.input.title.val(),
      description: this.input.description.val()
    };
    return task;
  },


  ////////////// ADDING MODEL //////////////
  addTask: function(task) { // changed to task from rawTask when adding COLLECTIONS
    // var task = new Task(rawTask);
    // this.modelList.push(task);
    var card = new TaskView({
      model: task,
      template: this.taskTemplate
    });
    this.cardList.push(card);
  },
  //////////////////////////////////////////

  removeTask: function(model, collection, options) {
    var filteredList = [];
    for(var i = 0; i < this.cardList.length; i++) {
      if(this.cardList[i].model == model) {
        console.log("Found it");
      }
      else {
        filteredList.push(this.cardList[i]);
      }
    }
    this.cardList = filteredList;

  }


  //////////////////////////////////////////

}); // end TaskListView function

export default TaskListView;
