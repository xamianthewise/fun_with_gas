/*******************************************
01.  Start Here 
*******************************************/
function doGet(e){
  var app = UiApp.createApplication();
  var statusOptions = ['Pending','In Progress','Completed','Cancelled'];
  var currentStatus= "In Progress";  
  
  var vPanel = app.createVerticalPanel();
  vPanel.add(app.createLabel("Set Status"));
  
  for(var i=0; i<statusOptions.length; i++){
    if(statusOptions[i] == currentStatus){
      vPanel.add(app.createRadioButton('taskStatus',statusOptions[i]).setFormValue(statusOptions[i]).setId('taskStatus').setName('taskStatus').setValue(true));
    }else{
      vPanel.add(app.createRadioButton('taskStatus',statusOptions[i]).setFormValue(statusOptions[i]).setId('taskStatus').setName('taskStatus'));
    }
      
      }
  
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
  vPanel.add(app.createLabel("The current task status is: "+e.parameter.taskStatus));
  
  app.add(vPanel);
  return app  
}
