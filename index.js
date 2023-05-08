 const electron = require('electron');

//Importing some modules
const BrowserWindow = electron.remote.BrowserWindow;
const clipboard = electron.clipboard;
const nativeImage = electron.nativeImage;

var input = document.getElementById('enter');
var copy = document.getElementById('copy');
var paste = document.getElementById('paste');
var area = document.getElementById('area');

clipboard.clear();
const formats = clipboard.availableFormats();
console.lof(formats);

copy.addEventListener('click',()=>{
    if(input.value){
        clipboard.writeText(input.value);
        console.log('Copied text successfully!')
    }
});

paste.addEventListener('click',()=>{
    area.innerText = clipboard.readText();
    console.log('Pasted text successfully!')
});

var copyHtml = document.getElementById('copyHtml');
copyHtml.addEventListener('click',()=>{
    clipboard.writeHTML('<b>Hello everyone</b>');

    console.log(clipboard.readHTML());
});

var copyRtf = document.getElementById('copyRtf');
copyRtf.addEventListener('click',()=>{
    clipboard.writeRTF('{\\rtf1\\ansi{\\fonttb1\\f0\\fswiss Helvetica;\\f0\\pard\nThis is some {\\bbold} text.\\par\n}')

    console.log(clipboard.readRTF());
});

var copyImage = document.getElementById('copyImage');
copyImage.addEventListener('click',()=>{
    const image = nativeImage.createFromPath('assets/image.png')
    clipboard.writeImage(image);
    console.log('Copied image successfully!');

    console.log(clipboard.readImage());
}); 

var style = document.getElementById('style');
let win = BrowserWindow.getFocusedWindow();
// let win = BrowserWindow.getAllWindows()[0];
var cssKey = undefined;
 
var css = "body { background-color: #000000; color: white; }"
 
style.addEventListener('click', () => {
    win.webContents.insertCSS(css, {
        cssOrigin: 'author'
    }).then(result => {
        console.log('CSS Added Successfully')
        console.log('Unique Key Returned ', result)
        cssKey = result;
    }).catch(error => {
        console.log(error);
    });
});
 
var clear = document.getElementById('clear');
clear.addEventListener('click', () => {
    if (cssKey) {
        win.webContents.removeInsertedCSS(cssKey)
            .then(console.log('CSS Removed Successfully')).catch(error => {
                console.log(error);
            });
    }
});
