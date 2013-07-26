

/********************************
01. Start Here
********************************/
function doGet(e){
  var app = UiApp.createApplication();
  
  var myGrid = app.createGrid(3,1).setId('myGrid');
  var formPanel = app.createFormPanel().setId('formPanel');
  var vPanel = app.createVerticalPanel().setId('vPanel');
  
  var myDateBoxLabel = app.createLabel("Enter a date: ");
  var myDateBox = app.createDateBox().setId('myDateBox').setName('myDateBox');
  //var myDatePicker = app.createDatePicker().setId('myDateBox').setName('myDateBox');
  var theSubmitButton = app.createSubmitButton('Test')
  
  vPanel.add(myDateBoxLabel);
  vPanel.add(myDateBox);
  //vPanel.add(myDatePicker);
  vPanel.add(theSubmitButton);
  
  formPanel.add(vPanel);
  
  myGrid.setWidget(0, 0, app.createLabel("My Date Box"));
  myGrid.setWidget(1, 0, formPanel);
  myGrid.setWidget(2, 0, app.createLabel(""));
  
  app.add(myGrid);
  
  return app;
}


/********************************
02. Render results
********************************/
function doPost(e){
 
  var app = UiApp.getActiveApplication();
  
  var submittedValue = e.parameter.myDateBox;
 
  var submittedValueResult = app.createLabel("The raw value that was submitted was: "+submittedValue).setStyleAttribute("marginBottom","25px");
  
  var isDate = submittedValue instanceof Date;
  var isDateResult = app.createLabel("Is this a valid Date Object: "+isDate);
  
  var parsedDate = Date.parse(submittedValue);
  var parsedDateResult = app.createLabel("What this looks like when parsed: "+parsedDate);
  
  var modifiedValue = new Date(submittedValue);
  var modifiedValueResult = app.createLabel("What this looks like after trying to convert it to a valid Javascript Date: "+modifiedValue).setStyleAttribute("marginBottom","25px");
  
  //This regular expression should be good for dates between 1950 and 2050
  var reasonableDateFormat = /(19[5-9][0-9]|20[0-4][0-9]|2050)-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/; 
  
  if(reasonableDateFormat.test(e.parameter.myDateBox)){
    var dateArray = submittedValue.split("-");
    //var myNewDateObject = new Date(dateArray[0],dateArray[1]-1,dateArray[2]);
    var theSubmittedYear= dateArray[0];
    var theSubmittedMonth= dateArray[1]-1;
    var theSubmittedDay= dateArray[2];
    
    //Get the last day of every month corrected for leap year
    if((theSubmittedYear%4 == 0) && (theSubmittedYear%100 != 0 || theSubmittedYear%400 == 0)){
    var lastDayOfEveryMonth = [31,29,31,30,31,30,31,31,30,31,30,31];
    }else{
    var lastDayOfEveryMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    }
    
    if(theSubmittedDay <= lastDayOfEveryMonth[Math.floor(theSubmittedMonth)]){
      var myNewDateObject = new Date(theSubmittedYear,theSubmittedMonth,theSubmittedDay);
    }else{
      var myNewDateObject = "bad date!";
    }
    
  }else{
  //The date pattern that was entered was not valid
    var myNewDateObject = "bad date!";
  }
  
  var isDate2 = myNewDateObject instanceof Date;
  var isDateResult2 = app.createLabel("Is the new date a valid Date Object: "+isDate2);
  
  var parsedDate2 = Date.parse(myNewDateObject);
  var parsedDateResult2 = app.createLabel("What the new date looks like when parsed: "+parsedDate2);
  
  var modifiedValue2 = new Date(myNewDateObject);
  var modifiedValueResult2 = app.createLabel("What the new date looks like after trying to convert it to a valid Javascript Date: "+modifiedValue2);
    
  var resultPanel = app.createVerticalPanel();
  resultPanel.add(submittedValueResult);
  resultPanel.add(isDateResult);
  resultPanel.add(parsedDateResult);
  resultPanel.add(modifiedValueResult);
  resultPanel.add(isDateResult2);
  resultPanel.add(parsedDateResult2);
  resultPanel.add(modifiedValueResult2);
  
  app.getElementById('myGrid').setWidget(2,0,resultPanel);
  
  return app
}