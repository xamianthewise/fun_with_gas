/******************************************
1. Start Here
******************************************/
function doGet(e){
  var app = UiApp.createApplication().setTitle('Fun with Text Fields');
  
  var taskDb = [["Create New Gauge",1],["Wrote Report",3],["Went to Training",4]];
  
  var vPanel = app.createVerticalPanel();
  
  for(var i=0;i<taskDb.length;i++){
      var taskName = app.createTextBox().setId('taskName'+i).setName('taskName'+i).setValue(taskDb[i][0]);
      var taskDuration = app.createTextBox().setId('taskDuration'+i).setName('taskDuration'+i).setValue(taskDb[i][1]);
      vPanel.add(taskName);
      vPanel.add(taskDuration);
      }
  
  var dbLength = app.createHidden('dbLength',taskDb.length).setId('dbLength').setName('dbLength');
  vPanel.add(dbLength);    
  
  var mySubmitButton = app.createSubmitButton().setId('mySubmitButton').setText('Submit My Form');
  vPanel.add(mySubmitButton);
  
  var formPanel = app.createFormPanel().setId('formPanel');
  formPanel.add(vPanel);
  
  app.add(formPanel);

  
  return app
}



/******************************************
2. Render Result
******************************************/
function doPost(e){
  var app = UiApp.getActiveApplication();
  
  var vPanel = app.createVerticalPanel();
  
  for(var i=0;i<e.parameter.dbLength;i++){
     var taskName = "e.parameter.taskName"+i;
     var taskDuration = "e.parameter.taskDuration"+i;    
     vPanel.add(app.createLabel("The task name is: "+eval(taskName)+" and it took "+eval(taskDuration)+" hours to complete."));       
  }
  
  app.add(vPanel);
  
  return app

}
