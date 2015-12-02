var Debug = require('console-debug');
global.console2 = new Debug({
    uncaughtExceptionCatch: false, // Do we want to catch uncaughtExceptions?
 // consoleFilter: ['LOG'], // Filter these console output types, Examples: 'LOG', 'WARN', 'ERROR', 'DEBUG', 'INFO'
    consoleFilter: [],
    logToFile: false, // if true, will put console output in a log file folder called 'logs'
    logFilter: ['LOG','DEBUG','INFO'], // Examples: Filter these types to not log to file, Examples: 'LOG', 'WARN', 'ERROR', 'DEBUG', 'INFO'
    colors: true // do we want pretty pony colors in our console output?
}); 

