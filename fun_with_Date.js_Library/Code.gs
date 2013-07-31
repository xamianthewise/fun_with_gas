function doGet(e){
  var app = UiApp.createApplication();
  
  var testDate = Date.today().add(3).days();
  var febOne2012 = new Date(2012,1,1);//February 1st 2012
  var testLeapYear = Date.isLeapYear(febOne2012.getFullYear());
  
  var myLabel = app.createLabel("The date three days from now will be: "+testDate);
  app.add(myLabel);
  app.add(app.createLabel("Is February 1st 2012 a leap year? "+testLeapYear));
  app.add(app.createLabel("Yesterday's date is: "+Date.today().addDays(-1)));
  
  return app
}