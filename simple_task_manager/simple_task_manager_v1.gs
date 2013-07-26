var MY_TASKS_DB = "Your_Google_Spreadsheet_Id_Goes_Here";
/******************************************
1. Start Here
******************************************/
function doGet(e){
   var app = UiApp.createApplication();
  
   var mainContainer = app.createVerticalPanel();
   var mainGrid = app.createGrid(4, 1).setId('mainGrid');
  
  //This row is for the app title
   mainGrid.setWidget(0, 0, styleGridSection_(styleAppTitle_(app.createLabel("My Tasks"))));
  
  //This row is for rendering error and confirmation messages
   mainGrid.setWidget(1, 0, styleGridSection_(app.createLabel("message area")));
  
  //This row will hold the main contents of the screen and will change as we invoke different functions
   mainGrid.setWidget(2, 0, styleGridSection_(renderTasks_(app)));
  
  //This row is for extra junk that might come
   mainGrid.setWidget(3, 0, styleGridSection_(app.createLabel("extra space for assorted junk")));
     
   mainContainer.add(mainGrid);
   app.add(mainContainer);
   return app
}



/******************************************
2. Render Tasks
******************************************/
function renderTasks_(e){
  
   var vPanel = e.createVerticalPanel(); 
  
   //Add the Create Button
  var createNewTaskButton = e.createButton("Create New Task").setId('item_0');
  var createNewTaskButtonHandler = e.createServerClickHandler("showTaskForm_");
  createNewTaskButton.addClickHandler(createNewTaskButtonHandler);
  createNewTaskButtonHandler.addCallbackElement(e.getElementById('mainGrid'));
  vPanel.add(createNewTaskButton);
  
  
   var taskData = SpreadsheetApp.openById(MY_TASKS_DB).getSheetByName('taskDb').getDataRange().getValues();
  
    var taskTable = e.createFlexTable()
   .setWidget(0, 0, e.createLabel("Task Name"))
   .setWidget(0, 1, e.createLabel("Task Duration"))
   .setCellPadding(1).setCellSpacing(1);
  
    for(var i=1; i<taskData.length;i++){
    var rowId = i+1;  
      
    //Create the edit link
    var theEditLink = e.createLabel("Edit").setId('item_'+rowId);
    var editTaskHandler = e.createServerClickHandler("showTaskForm_"); 
    theEditLink.addClickHandler(editTaskHandler);
    editTaskHandler.addCallbackElement(e.getElementById('mainGrid'));
      
    //Create the delete link
    var theDeleteLink = e.createLabel("Delete").setId('task_'+rowId);
    var deleteTaskHandler = e.createServerClickHandler("confirmDeleteRequest_"); 
    theDeleteLink.addClickHandler(deleteTaskHandler);
    deleteTaskHandler.addCallbackElement(e.getElementById('mainGrid'));     
      
    taskTable.setWidget(i, 0, styleCell_(e.createLabel(taskData[i][0])));
    taskTable.setWidget(i, 1, styleCell_(e.createLabel(taskData[i][1])));  
    taskTable.setWidget(i, 2, styleCell_(styleEditLink_(theEditLink)));  
    taskTable.setWidget(i, 3, styleCell_(styleEditLink_(theDeleteLink)));  
      }
 
    vPanel.add(taskTable);
    return vPanel
}



/******************************************
2. Initialize the Task Object
*******************************************/
function setFormObject_(item){
  var itemValue = item.substring(5);
  if(itemValue == 0){
    var taskObject = {"taskId":itemValue,"taskName":"","taskDuration":""};
  }else{    
     var taskDb = SpreadsheetApp.openById(MY_TASKS_DB).getSheetByName('taskDb').getRange(itemValue, 1, 1, 2).getValues();
     var taskObject = {"taskId":itemValue,"taskName":taskDb[0][0],"taskDuration":taskDb[0][1]};
  }

  UserProperties.setProperty('activeTask', Utilities.jsonStringify(taskObject));
    
  return taskObject
}



/******************************************
3. Render Task Form
******************************************/
function showTaskForm_(e){
  var app = UiApp.getActiveApplication();
  
  //initalize the form data object
  if(typeof e.parameter.source=="undefined"){
    var formData = Utilities.jsonParse(UserProperties.getProperty('activeTask'));
  }else{
    var formData = setFormObject_(e.parameter.source);
  }
  
  var taskForm = generateTaskForm_(app);
  
  app.getElementById('mainGrid').setWidget(1,0,styleGridSection_(app.createLabel("")));
  app.getElementById('mainGrid').setWidget(2,0,styleGridSection_(taskForm));

  return app
}



/******************************************
4. Generate Task Form
*******************************************/
function generateTaskForm_(e){
  
  var formData = Utilities.jsonParse(UserProperties.getProperty('activeTask'));
  
  //Render form
  var vPanel = e.createVerticalPanel();
  
  vPanel.add(e.createHidden().setId('taskId').setName('taskId').setValue(formData.taskId));
  
  //vPanel.add(e.createTextBox().setId('other').setName('other').setValue(formData.taskId));
  
  vPanel.add(e.createLabel("* Task Name: "));
  vPanel.add(e.createTextBox().setId('taskName').setName('taskName').setValue(formData.taskName).setStyleAttribute("marginBottom","25px"));
  
  vPanel.add(e.createLabel("Task Duration: "));
  vPanel.add(e.createTextBox().setId('taskDuration').setName('taskDuration').setValue(formData.taskDuration).setStyleAttribute("marginBottom","25px"));
  
  vPanel.add(e.createSubmitButton().setId('submitButton').setText('Save Task'));
  
  var fPanel = e.createFormPanel();
  fPanel.add(vPanel);
  
  return fPanel
  
}



/******************************************
5. Save Task
******************************************/
function doPost(e){
  var app = UiApp.getActiveApplication();
  
  //Save the form data in the user properties
  var taskObject = {"taskId":e.parameter.taskId,"taskName":e.parameter.taskName,"taskDuration":e.parameter.taskDuration};
  UserProperties.setProperty('activeTask', Utilities.jsonStringify(taskObject));
  
  //Validate data
  var errorMessages = [];
  if(e.parameter.taskName==""){
  errorMessages.push("The task name is required.");
  }
  
  if(isNaN(e.parameter.taskDuration)){
  errorMessages.push("The task duration must be a valid number.");
  }
  
  //If there are any errors send them back to the form to fix it
  if(errorMessages.length >0){
  var errorPanel = app.createVerticalPanel();
    for(var i=0;i<errorMessages.length;i++){
        errorPanel.add(app.createLabel(errorMessages[i]));
        }
    app.getElementById('mainGrid').setWidget(1,0,styleGridSection_(errorPanel)); 
    app.getElementById('mainGrid').setWidget(2,0,styleGridSection_(generateTaskForm_(app)));
  }else
  {
    var taskDb = SpreadsheetApp.openById(MY_TASKS_DB).getSheetByName('taskDb');
    if(e.parameter.taskId=="0"){
      var theTargetRange = taskDb.getRange(taskDb.getLastRow()+1, 1, 1, 2);
      var confirmationMessage = "The new task has been created";
    }else{
      var theTargetRange = taskDb.getRange(e.parameter.taskId, 1, 1, 2);
      var confirmationMessage = "The task has been updated";
    }
    
      var theFormData = [[e.parameter.taskName,e.parameter.taskDuration]]
      theTargetRange.setValues(theFormData);
      app.getElementById('mainGrid').setWidget(1,0,styleGridSection_(app.createLabel(confirmationMessage)));
      app.getElementById('mainGrid').setWidget(2,0,styleGridSection_(renderTasks_(app))); 

  }
  
  return app

}



/******************************************
6. Confirm Delete Request
******************************************/
function confirmDeleteRequest_(e){
  var app = UiApp.getActiveApplication();
  
 // var theSelectedTask = e.parameter.source;
  //var theTaskId = theSelectedTask.substring(5);
  var taskData = setFormObject_(e.parameter.source);
  var vPanel = app.createVerticalPanel();
  vPanel.add(app.createLabel("Are you sure you want to delete task ID#"+taskData.taskId+" "+taskData.taskName+"?"));
  
  
  //Create the delete button
  var theDeleteButton = app.createButton("Delete").setId('buttonDelete_'+taskData.taskId);
  var deleteButtonHandler = app.createServerClickHandler("deleteTask_"); 
  theDeleteButton.addClickHandler(deleteButtonHandler);
  deleteButtonHandler.addCallbackElement(app.getElementById('mainGrid')); 
  
  //Create the cancel button
  var cancelButton = app.createButton("Cancel").setId('cancelButton');
  var cancelButtonHandler = app.createServerClickHandler("goHome_"); 
  cancelButton.addClickHandler(cancelButtonHandler);
  cancelButtonHandler.addCallbackElement(app.getElementById('mainGrid')); 
  
  vPanel.add(theDeleteButton);
  vPanel.add(cancelButton);

  app.getElementById('mainGrid').setWidget(1,0,styleGridSection_(app.createLabel("")));
  app.getElementById('mainGrid').setWidget(2,0,styleGridSection_(vPanel)); 
  
  return app
}



/******************************************
7. Delete Task
******************************************/
function deleteTask_(e){
  var app = UiApp.getActiveApplication();
  var taskObj = Utilities.jsonParse(UserProperties.getProperty('activeTask'));
  var killRow = SpreadsheetApp.openById(MY_TASKS_DB).getSheetByName('taskDb').deleteRow(taskObj.taskId);
  UserProperties.deleteProperty('activeTask');
  app.getElementById('mainGrid').setWidget(1,0,styleGridSection_(app.createLabel("Task ID#"+taskObj.taskId+" has been deleted.")));
  app.getElementById('mainGrid').setWidget(2,0,styleGridSection_(renderTasks_(app)));   
  return app
}



/******************************************
8. Go Home
******************************************/
function goHome_(e){
  var app = UiApp.getActiveApplication();
  app.getElementById('mainGrid').setWidget(1,0,styleGridSection_(app.createLabel("messages go here")));
  app.getElementById('mainGrid').setWidget(2,0,styleGridSection_(renderTasks_(app)));  
  return app
}

