var axios = require('axios');
var colors = require('colors');
var dir = './docs-hub';
var fs = require('fs');
var rimraf = require('rimraf')
var dirTree = require('directory-tree')

if (!fs.existsSync(dir)) {
  console.log(`[setup] `, `initialising ${dir}`.green)
  fs.mkdirSync(dir);
} else {
  console.log(`[setup] `, `recreating ${dir}`.green)
  // fs.rmdirSync(dir);
  rimraf(dir, () => fs.mkdirSync(dir))

}

const log = (args) => {
  console.log(`[setup] `.green, args)
}

const downloadDocs = (url) => {
  log(`⇩ GET: ${url}`.blue)
  axios({
    method: 'GET',
    url,
    headers: {
      "Accept": "application/vnd.github.raw"
    }
  }).then((apiResponse) => {
    const title = apiResponse
      .data
      .split('\n')[0]
      .split('#')[1]
    log(`✔ download complete`.green, `\n  -> response length: ${apiResponse.data.length}`, `\n  -> response title:  ${title}`)
    fs.writeFile(`${dir}/${title}.md`, apiResponse.data, function (err) {
      if (err) {
        return console.log(err);
      }
      log(`saved ${dir}/${title}.md`.blue);
      generateDocTree();
    });
    // fs.writeFileSync(dir, apiResponse.data, function (err) {   if (err) { return
    // console.warn(`[setup] error writing file: ${err}`.red)   } else {
    // console.log(`[setup] `, `file was saved`.green)   } })
  }).catch((e) => {
    console.warn(`[setup] `, `✗ could not download ${url}`.red, `\nerror: ${e}`.red)
  })
}

// downloadDocs('https://api.github.com/repos/bilo-io/bilo-ui/contents/README.md');
// downloadDocs('https://api.github.com/repos/bilo-io/bilo-bio/contents/README.md');
// downloadDocs('https://api.github.com/repos/bilo-io/tut-react/contents/README.md');

downloadFromConfig = (config) => {
  // console.log(config)
}

// downloadFromConfig(config);

const generateDocTree = () => {
  const tree = dirTree('./docs-hub');
  console.log('docs directory:\n', tree)
  fs.writeFile(`${dir}/docs-tree.json`, JSON.stringify(tree, true, 4), function (err) {
    if (err) {
      return console.log(err);
    }
    log(`created doctree: ${tree}`.blue);
  });
}

const downloadGitDirectory = (title, baseUrl, path) => { 
  let url = `${baseUrl}/trunk/${path}`
  log(`⇩ Downloading:\n => docs: ${title}\n => path: ${url}`.cyan)
}


let biloCliUrl = 'https://github.com/bilo-io/bilo-cli'
downloadGitDirectory('Bilo-CLI',biloCliUrl,'.docs')