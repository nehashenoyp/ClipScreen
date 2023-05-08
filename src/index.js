const input = document.getElementById('enter');
const copy = document.getElementById('copy');
const paste = document.getElementById('paste');
const area = document.getElementById('area');

console.log('Clipboard is available: ');
// clipboard.clear();
// const formats = window.clipboard.availableFormats();
// console.log(formats);

copy.addEventListener('click', () => {
  if (input.value) {
    window.clipboard.writeText(input.value);
    console.log('Copied text successfully!')
  }
});

paste.addEventListener('click', () => {
  area.innerText = window.clipboard.readText();
  console.log('Pasted text successfully!')
});

const copyHtml = document.getElementById('copyHtml');
copyHtml.addEventListener('click', () => {
  window.clipboard.writeHTML('<b>Hello everyone</b>');

  console.log(window.clipboard.readHTML());
});

const copyRtf = document.getElementById('copyRtf');
copyRtf.addEventListener('click', () => {
  window.clipboard.writeRTF('{\\rtf1\\ansi{\\fonttb1\\f0\\fswiss Helvetica;\\f0\\pard\nThis is some {\\bbold} text.\\par\n}')

  console.log(window.clipboard.readRTF());
});

const copyImage = document.getElementById('copyImage');
copyImage.addEventListener('click', () => {
  const image = window.nativeImage.createFromPath('../assets/image.png')
  window.clipboard.writeImage(image);
  console.log('Copied image successfully!');

  console.log(window.clipboard.readImage());
});


// let win = window.require('electron').remote.getFocusedWindow();
// let win = window.BrowserWindow.getFocusedWindow();
// let win = window.require('electron').remote.BrowserWindow.getAllWindows()[0];

const css = "body { background-color: #000000; color: white; }"

const style = document.getElementById('style');
let win = null;
let cssKey = undefined;

style.addEventListener('click', () => {
  const windows = window.require('electron').remote.BrowserWindow.getAllWindows();
  if (windows.length > 0) {
    win = windows[0];
    win.webContents.insertCSS(css, {
      cssOrigin: 'author'
    }).then(result => {
      console.log('CSS Added Successfully')
      console.log('Unique Key Returned ', result)
      cssKey = result;
    }).catch(error => {
      console.log(error);
    });
  }
});

const clear = document.getElementById('clear');
clear.addEventListener('click', () => {
    if (cssKey) {
        win.webContents.removeInsertedCSS(cssKey)
            .then(console.log('CSS Removed Successfully')).catch(error => {
                console.log(error);
            });
    }
});
