/*******************************************
It all starts with doGet()
*******************************************/
function doGet(e){
  var app = UiApp.createApplication();
  
  var myLable = app.createLabel("Hello World");
  
  app.add(myLable);
  
  return app
}