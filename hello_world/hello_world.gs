/*******************************************
1.  Start Here
*******************************************/
function doGet(e){
  var app = UiApp.createApplication();
  
  var myLable = app.createLabel("Hello World");
  
  app.add(myLable);
  
  return app
}