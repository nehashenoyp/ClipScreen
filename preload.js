const { BrowserWindow, clipboard, nativeImage } = require('electron');

// Expose the Electron APIs to the window object
window.clipboard = clipboard;
window.nativeImage = nativeImage;
window.require = require;
window.BrowserWindow = BrowserWindow;