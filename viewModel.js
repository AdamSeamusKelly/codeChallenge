function UpdateTask() {
  var self = this;

  var projectTasks = [
    {
      status: "Todo",
      name: "Add user",
      description: "Add user",
      assigned: "John Doe",
    },
    {
      status: "In progress",
      name: "Create database",
      description: "Create database",
      assigned: "John Smith",
    },
    {
      status: "In progress",
      name: "Build JSON",
      description: "Create database",
      assigned: "John Doe",
    },
    {
      status: "Done",
      name: "Onboarding",
      description: "Onboarding",
      assigned: "John Smith",
    },
    {
      status: "Done",
      name: "Create database",
      description: "Create database",
      assigned: "John Doe",
    },
  ];

  self.filterTasks = function (status) {
    switch (status.toLowerCase()) {
      case "todo":
        return projectTasks.filter((t) => t.status === "Todo");
      case "inprogress":
        return projectTasks.filter((t) => t.status === "In progress");
      case "done":
        return projectTasks.filter((t) => t.status === "Done");
      default:
        return [];
    }
  };

  self.todos = ko.computed(() => this.filterTasks("todo"));
  self.inprogress = ko.computed(() => this.filterTasks("inprogress"));
  self.done = ko.computed(() => this.filterTasks("done"));
}

ko.applyBindings(new UpdateTask());
