// Constants
const TASK_BASE_URL = "http://localhost:3000/task/";
const IN_PROGRESS = "IN_PROGRESS";
const DONE = "DONE";
const TODO = "TODO";

function UpdateTask(params) {
  var self = this;

  // Observables
  self.projectTasks = ko.observable();
  self.todos = ko.observable();
  self.inprogress = ko.observable();
  self.done = ko.observable();

  self.filterTasks = function (tasks, status) {
    switch (status) {
      case TODO:
        return tasks.filter((t) => t.status === TODO);
      case IN_PROGRESS:
        return tasks.filter((t) => t.status === IN_PROGRESS);
      case DONE:
        return tasks.filter((t) => t.status === DONE);
      default:
        return [];
    }
  };

  self.allowDrop = function (event) {
    event.preventDefault();
    return true;
  };

  self.updateTask = async function (self, event, newStatus) {
    event.preventDefault();
    const taskId = event.originalEvent.dataTransfer.getData("text");
    console.log(event.originalEvent.dataTransfer);

    console.log({ taskId });

    let task;
    await $.getJSON(TASK_BASE_URL.concat(taskId)).then((res) => {
      task = res;
    });

    const updatedTask = {
      ...task,
      status: newStatus,
    };

    $.ajax({
      type: "PUT",
      url: TASK_BASE_URL.concat(taskId),
      data: updatedTask,
    });

    self.loadTasks();
  };

  self.loadTasks = function () {
    $.getJSON(TASK_BASE_URL, (response) => {
      self.todos(self.filterTasks(response, TODO));
      self.inprogress(self.filterTasks(response, IN_PROGRESS));
      self.done(self.filterTasks(response, DONE));
    });
  };

  // Init
  self.loadTasks();
}

$(ko.applyBindings(new UpdateTask()));
