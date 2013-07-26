/******************************************
1. Start Here
******************************************/
function doGet(e){
  var app = UiApp.createApplication();
  
  var vPanel = app.createVerticalPanel();
  
  vPanel.add(app.createLabel("Name Your File:"));
   vPanel.add(app.createTextBox().setId('myFilename').setName('myFilename'));
  
  vPanel.add(app.createLabel("Select file to upload:"));
  vPanel.add(app.createFileUpload().setId('myFile').setName('myFile'));
  vPanel.add(app.createSubmitButton('Upload File'));
  
  var myForm = app.createFormPanel().setEncoding('multipart/form-data');
  myForm.add(vPanel);
  app.add(myForm);
  
 return app
}

/******************************************
2. Upload file and render confirmation
******************************************/

function doPost(e){
  var app = UiApp.getActiveApplication();
   
  var folder = DocsList.getFolderById('Your_Google_Drive_Folder_Id_Goes_Here');
  folder.createFile(e.parameter.myFile);
   
  app.add(app.createLabel("The file was uploaded."));
  
  return app
}