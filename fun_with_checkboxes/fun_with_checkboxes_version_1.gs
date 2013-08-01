/*******************************************
1.  Start Here
*******************************************/
function doGet(e){
  var app = UiApp.createApplication();
  
  var vPanel = app.createVerticalPanel();
  
  var myCheckBox = app.createCheckBox('Xamian Kross').setFormValue('xamiankross').setId('myCheckBox_1').setName('myCheckBox_1');
  var myCheckBox2 = app.createCheckBox('Eva Mendes').setFormValue('evamendes').setId('myCheckBox_2').setName('myCheckBox_2');
  var theSubmitButton = app.createSubmitButton().setText('Submit Checkboxes');
  
  vPanel.add(myCheckBox);
  vPanel.add(myCheckBox2);
  vPanel.add(theSubmitButton);
  
  var formPanel = app.createFormPanel();
  formPanel.add(vPanel);
  app.add(formPanel);
  
  return app
}



/*******************************************
2. Render the submitted values
*******************************************/
function doPost(e){
  var app = UiApp.getActiveApplication();
  
  app.add(app.createLabel("The value of the first checkbox is: "+e.parameter.myCheckBox_1));
  app.add(app.createLabel("The value of the second checkbox is: "+e.parameter.myCheckBox_2));

  return app
}