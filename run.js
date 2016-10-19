
const runScript = require ('./run-tasks');

/**
 * parse process.argv to get options
 *
 * @returns
 */
function parseCommand () {
  return {
    DEBUG: process.argv.includes('--debug') || false,
    NO_HMR: process.argv.includes('--no-hmr')
  }
}


// Execute the specified task or default one. E.g.: node run build
runScript(/^\w/.test(process.argv[2] || '') ? process.argv[2] : 'start' /* default */, parseCommand);
