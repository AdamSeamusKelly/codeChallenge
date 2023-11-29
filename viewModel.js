$(document).ready(function(){
  
    function viewModel() {
        
        var self = this;

        self.day = ko.observable('24');
        self.month = ko.observable('02');
        self.year = ko.observable('2012');

        self.fullDate = ko.computed(function () {
            return self.day() + "/" + self.month() + "/" + self.year();
        });
    
    };
  
    ko.applyBindings(new viewModel()); 
  
  });