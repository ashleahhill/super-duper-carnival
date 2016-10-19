
const runScript = require ('./run-tasks');

/**
 * parse process.argv to get options
 *
 * @returns
 */
function parseCommand () {
  const release = process.argv.includes('--release');
  let DEBUG = !release;
  DEBUG = process.argv.includes('--debug') ? true : DEBUG;
  let verbose =  process.argv.includes('--verbose') || process.argv.includes('-v');

  return {
    DEBUG,
    webpackVerbose: verbose,
    NO_HMR: release || process.argv.includes('--no-hmr')
  }
}


// Execute the specified task or default one. E.g.: node run build
runScript(/^\w/.test(process.argv[2] || '') ? process.argv[2] : 'start' /* default */, parseCommand());
