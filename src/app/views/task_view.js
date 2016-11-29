// import $ from 'jquery';
// import Backbone from 'backbone';
// import _ from 'underscore';


// extend takes a single object argument with an initialize function and a render function
var TaskView = Backbone.View.extend({

  /////// MANUALLY with RENDER ///////
  // // The initialize function will be run once when the view is first created. Its job is to get everything ready to go. It takes one argument, options, which contains all the stuff the view was created with.
  // initialize: function(options) {
  //    this.task = options.task;
  //    this.template = options.template;
  // },
  //
  // // The render function will be called whenever the DOM needs to be updated, and its role is to re-generate all the HTML associated with this view.
  // render: function() {
  //   var html = '<li class="task">';
  //   html += '<h2>' + this.task.title + '</h2>';
  //   html += '<p>' + this.task.description + '</p>';
  //   html += '</li>'; //this is a big string with all the html we want to render
  //   this.$el.html(html); // this.$el is a jQuery element associated with this view.
  //       // This will wrap a div around the html code you're putting inside it (we can change the default wrapper to something othere than div)
  //   // Enable chained calls
  //   // This is important enough that we'll leave it in, but
  //   // we wont talk about it until later.
  //   // console.log(this);
  //   return this;
  //////////////////////////////////////////

  /////// VIEWING CORRECTLY ///////
  // The initialize function will be run once when the view is first created. Its job is to get everything ready to go. It takes one argument, options, which contains all the stuff the view was created with.
  initialize: function(options) {
     this.task = options.task;
     this.template = options.template;
     this.listenTo(this.model, "change", this.render); //every backbone object has a listensTo function that lets you listen (.on listens to your own events)
  },

  events: {
    'click .complete-button': 'completeHandler' , // In the events hadler we can only call the methods in this view, so we have to have a separate function
    'click .delete-button' : 'deleteTask'
  },

  deleteTask: function() {
    this.model.destroy();
  },

  completeHandler: function () {
    console.log("Handler Run!");
    this.model.toggleComplete();
    // this.render();
  },

  render: function() {
      this.delegateEvents(); //this is a special thing we have to do when we redraw the html elements below to reconnect the DOM event handlers. Or else the buttons don't work after we add a new task

      ////////////// ADDING MODEL //////////////
      var html = this.template({task: this.model.attributes}); // Changed to this.model from this.task when we added the model because we changed task to model (as set in addTask of task_list_view)("model" is a Backbone model and this is how we access this)
      // could also use .toJSON() instead of .attributes: b/c .attributes gives you direct access to the attributes, which can be bad because you bypass validations and can accidentally change them without triggering events.
      this.$el.html(html);
      //////////////////////////////////////////

    return this;
    // Chaining on render() is a very common thing in Backbone, and much of the code you'll find on the internet assumes you're using it. It will be much less painful to get into the habit of always returning "this" from render() now.
  //////////////////////////////////////////
  }
});

export default TaskView;
