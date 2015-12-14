module.exports = {
  server: {
    baseDir: Config.buildDirectory + Config.buildSubdirectory[`dev`]
  },
    files: [Config.buildDirectory + Config.buildSubdirectory[`dev`] + '**'],
    port:Config.localport
}
