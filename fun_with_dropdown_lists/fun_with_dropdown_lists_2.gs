/*******************************************
01.  Start Here 
*******************************************/
function doGet(e){
  var app = UiApp.createApplication();
  var timeCount = [1,2,3,4,5,6,7];
  var currentTimeSpent= 3;
    
  var vPanel = app.createVerticalPanel();
  vPanel.add(app.createLabel("Hours Spent in Task"));
  var taskDurationField = app.createListBox().setId('taskDuration').setName('taskDuration');
   taskDurationField.addItem("","");// Note: this will throw off your selected item below
  for(var i=0; i<timeCount.length; i++){
    if(timeCount[i]-1 == currentTimeSpent){//You have to add -1 here to compensate for the throw off
       taskDurationField.addItem(timeCount[i]+" Hrs.",timeCount[i]).setSelectedIndex(i);
    }else{
      taskDurationField.addItem(timeCount[i]+" Hrs.",timeCount[i]);
    }      
   }
  
  vPanel.add(taskDurationField);
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