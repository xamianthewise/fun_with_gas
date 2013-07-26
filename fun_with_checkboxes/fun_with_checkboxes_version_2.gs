/*******************************************
01.  Start Here - Psuedo Dynamic Version
*******************************************/
function doGet(e){
  var app = UiApp.createApplication();
  
  var itCloudTeam = [['Xamian Kross','xamiankross'],['Eva Mendes','evamendes'],['Scarlett Johansson','scarlettjohansson']];
  
  
  var vPanel = app.createVerticalPanel();
  for(var i=0;i<itCloudTeam.length;i++){
      vPanel.add(app.createCheckBox(itCloudTeam[i][0]).setFormValue(itCloudTeam[i][1]).setId('myCheckBox_'+i).setName('myCheckBox_'+i));     
      }
  
  
  var theSubmitButton = app.createSubmitButton().setText('Submit Checkboxes');  
  vPanel.add(theSubmitButton);
  
  var formPanel = app.createFormPanel();
  formPanel.add(vPanel);
  app.add(formPanel);
  
  return app
}



/*******************************************
02. Render the submitted values - Psuedo Dynamic Version
*******************************************/
function doPost(e){
  var app = UiApp.getActiveApplication();
  
  var listOfPassedValues = [];
  listOfPassedValues.push(e.parameter.myCheckBox_1);
  app.add(app.createLabel("The value of the first checkbox is: "+e.parameter.myCheckBox_1));
  listOfPassedValues.push(e.parameter.myCheckBox_2);
  app.add(app.createLabel("The value of the second checkbox is: "+e.parameter.myCheckBox_2));
  listOfPassedValues.push(e.parameter.myCheckBox_3);
  app.add(app.createLabel("The value of the third checkbox is: "+e.parameter.myCheckBox_3));
  
  app.add(app.createLabel("The list of values is: "+listOfPassedValues.toString()));
  

  return app
}
