function doGet(e){
  var app = UiApp.createApplication().setStyleAttribute("backgroundColor", "f9f9f9").setHeight(1000); 
  
  mainContainer = app.createVerticalPanel().setId('main_container'); 

  /* This works also but only gives current temperature
  var todaysWeather = getTodaysWeather_();    
  var theWeatherBox = app.createGrid(2,2).setStyleAttribute("marginBottom","20px");
  theWeatherBox.setWidget(0, 0, app.createLabel("The current temperature is:"));
  theWeatherBox.setWidget(0, 1, app.createLabel(todaysWeather.temperature));
  theWeatherBox.setWidget(1, 0, app.createLabel("The current sky condition is:"));
  theWeatherBox.setWidget(1, 1, app.createLabel(todaysWeather.skycondition));
  mainContainer.add(theWeatherBox);*/
  
  //Get weather forecast for today and tommorrow
  var getWeatherForecast = getWeather_();  
  var theWeatherForecast = app.createGrid(2,3);
  theWeatherForecast.setWidget(0,0,app.createLabel("Today: "));
  theWeatherForecast.setWidget(0,1,app.createLabel(getWeatherForecast[0].theLow+"°/"+getWeatherForecast[0].theHigh+"°F"));
  theWeatherForecast.setWidget(0,2,app.createLabel(getWeatherForecast[0].theCondition));
  theWeatherForecast.setWidget(1,0,app.createLabel("Tommorow: "));
  theWeatherForecast.setWidget(1,1,app.createLabel(getWeatherForecast[1].theLow+"°/"+getWeatherForecast[1].theHigh+"°F"));
  theWeatherForecast.setWidget(1,2,app.createLabel(getWeatherForecast[1].theCondition));
  mainContainer.add(theWeatherForecast);
  
  
  app.add(mainContainer);
  return app; 
}

/********************************************
 * Get Today's weather
 ********************************************/
 function getTodaysWeather_() {
   //http://weather.yahooapis.com/forecastrss?w=12761343&u=f
    var wsdl = SoapService.wsdl("http://www.webservicex.com/globalweather.asmx?wsdl");
    var theGetWeatherService = wsdl.getService("GlobalWeather");
  
    var param = Xml.element("GetWeather", 
                  [
                   Xml.attribute("xmlns", "http://www.webserviceX.NET"),
                   Xml.element("CityName", ["New York"]),
                   Xml.element("CountryName", ["United States"])
                  ]);
   
   var result = theGetWeatherService.invokeOperation("GetWeather", [param]);
   var txt = result.Envelope.Body.GetWeatherResponse.GetWeatherResult.Text;
   var xml = Xml.parse(txt);
   var theTemp = xml.CurrentWeather.Temperature.getText();
   var theSkyCondition = xml.CurrentWeather.SkyConditions.getText();
   var theCurrentWeather = {"temperature":theTemp, "skycondition":theSkyCondition}

   return theCurrentWeather;
  }




/********************************************
 * Get weather forecast for today and tomorrow
 ********************************************/
function getWeather_() {
  var response = UrlFetchApp.fetch("http://weather.yahooapis.com/forecastrss?w=12761343&u=f");
  var doc = Xml.parse(response.getContentText(),true);
  var root = doc.getElement().getElement('channel').getElement('item').getElements('forecast');
  var weatherInfo = new Array();
  for (var i=0;i<root.length;i++) {
    weatherInfo[i] = {"theCode":root[i].code, "theDate":root[i].date, "theDay":root[i].day, "theHigh":root[i].high, "theLow":root[i].low, "theCondition":root[i].text};
  }
  
  //Logger.log(weatherInfo);
  
  return weatherInfo;
}
