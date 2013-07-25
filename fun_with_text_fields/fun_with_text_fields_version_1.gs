/******************************************
1. Start Here
******************************************/
function doGet(e){
  var app = UiApp.createApplication().setTitle('Fun with Text Fields');
  
  var vPanel = app.createVerticalPanel();
  
  var myTextField = app.createTextBox().setId('myTextField').setName('myTextField');
  vPanel.add(myTextField);
  
  var myTextAreaField = app.createTextArea().setId('myTextAreaField').setName('myTextAreaField');
  vPanel.add(myTextAreaField);
  
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
  
  var result = app.createLabel("The value of my text box is: "+e.parameter.myTextField);
  vPanel.add(result);
  
  var result2 = app.createLabel("The value of my text area is: "+e.parameter.myTextAreaField);
  vPanel.add(result2); 
  
  app.add(vPanel);
  
  return app

}