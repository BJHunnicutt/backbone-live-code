// task_list.js
import Backbone from 'backbone';
import Task from 'app/models/task';


var TaskList =
Backbone.Collection.extend({
  model: Task   // This collection can only hold tasks
});


export default TaskList;
