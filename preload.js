window.addEventListener('DOMContentLoaded',()=>{
    const replaceText = (selector,text)=>{
        const element = document.getElementById(selector)
        if(element)element.innerText=text
    }
    for(const type of ['chrome', 'node' , 'electron']){
        replaceText('${type}-version',process.versions[type])
    }    
})
const init = () => {
    window.checkClipboard = () => {
      return remote.clipboard.readText();
    };
  
    window.copyToClipboard = (text) => {
      remote.clipboard.writeText(text);
    };
  
    window.openExternalUrl = (url) => {
      if (isValidUrl(url)) remote.shell.openExternal(url);
    };
  
    window.clearClipboard = () => {
      remote.clipboard.clear();
    };
  
    window.openMainWindow = () => {
      ipcRenderer.send('open-main-window');
    };
  
    window.minimizeApp = () => {
      ipcRenderer.send('minimize-app');
    };
  
    window.quitApp = () => {
      ipcRenderer.send('quit-app');
    };
  };
  
  init();