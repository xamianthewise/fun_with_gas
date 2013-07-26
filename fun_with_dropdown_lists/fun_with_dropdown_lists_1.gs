/*******************************************
01.  Start Here 
*******************************************/
function doGet(e){
  var app = UiApp.createApplication();
  
  var vPanel = app.createVerticalPanel();
  vPanel.add(app.createLabel("Hours Spent in Task"));
  
  var taskDuration = app.createListBox().setId('taskDuration').setName('taskDuration');
  taskDuration.addItem("","");
  taskDuration.addItem("1 Hrs.",1);
  taskDuration.addItem("2 Hrs.",2);
  taskDuration.addItem("3 Hrs.",3);
  taskDuration.addItem("4 Hrs.",4);
  taskDuration.addItem("5 Hrs.",5);
  
  vPanel.add(taskDuration);
  vPanel.add(app.createSubmitButton("Submit Status"));
  
  var formPanel = app.createFormPanel();
  formPanel.add(vPanel);
  app.add(formPanel);
  
  return app
}


/*******************************************
02.  Render Results
*******************************************/
function doPost(e){
  var app = UiApp.getActiveApplication();
  
  var vPanel = app.createVerticalPanel();
  vPanel.add(app.createLabel("The time spent on this task is: "+e.parameter.taskDuration+" Hrs."));
  
  app.add(vPanel);
  return app  
}
