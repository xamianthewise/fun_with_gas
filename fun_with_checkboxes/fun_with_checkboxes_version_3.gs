/*******************************************
01.  Start Here - Psuedo Dynamic Version
*******************************************/
function doGet(e){
  var app = UiApp.createApplication();
  
  var itCloudTeam = [['Xamian Kross','xamiankross'],['Kaley Cuoco','kaleycuoco'],['Kat Dennings','katdennings']];
  
  var theSelectedUser = "kaleycuoco";
  
  
  var vPanel = app.createVerticalPanel();
  var itCloudTeamNames = [];
  for(var i=0;i<itCloudTeam.length;i++){
       itCloudTeamNames.push(itCloudTeam[i][1]);
    
       if(itCloudTeam[i][1] == theSelectedUser){
         vPanel.add(app.createCheckBox(itCloudTeam[i][0]).setFormValue(itCloudTeam[i][1]).setId('myCheckBox_'+itCloudTeam[i][1]).setName('myCheckBox_'+itCloudTeam[i][1]).setValue(true)); 
       }else{
         vPanel.add(app.createCheckBox(itCloudTeam[i][0]).setFormValue(itCloudTeam[i][1]).setId('myCheckBox_'+itCloudTeam[i][1]).setName('myCheckBox_'+itCloudTeam[i][1])); 
       }
  }
  vPanel.add(app.createHidden("cloudTeam",itCloudTeamNames.toString()).setId('cloudTeam').setName('cloudTeam'));
  
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
  
 var cloudTeam = e.parameter.cloudTeam;
 var cloudTeam = cloudTeam.split(",");
 var selectedStaff = [];
  for(var i=0;i<cloudTeam.length;i++){
    var checkboxValue = "e.parameter.myCheckBox_"+cloudTeam[i];
    var checkboxValue = eval(checkboxValue);
    if(checkboxValue == cloudTeam[i]){
      selectedStaff.push(cloudTeam[i]);
    }
  }
  
  if(selectedStaff.length >= 1){
    app.add(app.createLabel("The selected staff were: "+selectedStaff.toString()));
  }else{
    app.add(app.createLabel("No one was selected."));
  }
  
  return app
}
