var config = {}

config.publicDirectory = "./public";
config.sourceDirectory = "./app";
config.publicAssets    = config.publicDirectory + "/assets";
config.sourceAssets    = config.sourceDirectory + "/assets";
// specify which static site generator is being used to generate html and 
// place code in a directory of the same name within /app
config.htmlGenerator   = "hugo";

module.exports = config;
