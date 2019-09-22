const electron = require('electron');
const url = require('url');
const path = require('path');
const {app, BrowserWindow, Menu} = electron;
const fs = require('fs');

let mainWindow;

//Listen for app to be ready
app.on('ready', function(){
	//create new window
	mainWindow = new BrowserWindow({
		title: app.getName(),
		show: false,
		icon: process.platform === 'linux' && path.join(__dirname, 'media', 'logo.png'),
		minWidth: 600,
		minHeight: 400,
		width: 1000,
		height: 700,
		autoHideMenuBar: true
	});
	//get website
	mainWindow.loadURL('https://web.whatsapp.com', {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36'
  });
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

app.on('ready', () => {  
	const page = mainWindow.webContents;
  
	page.on('dom-ready', () => {
	  page.insertCSS(fs.readFileSync(path.join(__dirname, 'dark.css'), 'utf8'));
	  mainWindow.show();
	});	
  });

  const mainMenuTemplate = [
	  {
		  label: "File",
		  submenu:[
			  {
				  label: "Quit",
				  accelerator: process.platform == "darwin" ? "Command+Q" : "Crtl+Q",
				  click() {
					  app.quit();
				  }
			  }
		  ]
	  }
  ]