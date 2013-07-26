/*******************************************
01.  Start Here 
*******************************************/
function doGet(e){
  var app = UiApp.createApplication();
  
  var vPanel = app.createVerticalPanel();
  vPanel.add(app.createLabel("Do you like chocolate?"));
  vPanel.add(app.createRadioButton('doYouLikeChocolate','Yes').setFormValue('Yes').setId('doYouLikeChocolate').setName('doYouLikeChocolate'));
  vPanel.add(app.createRadioButton('doYouLikeChocolate','No').setFormValue('No').setId('doYouLikeChocolate').setName('doYouLikeChocolate'));
  vPanel.add(app.createSubmitButton("Send it"));
  
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
  vPanel.add(app.createLabel("And the answer to whether you like chocolate is: "+e.parameter.doYouLikeChocolate));
  
  app.add(vPanel);
  return app  
}