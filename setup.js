var axios = require('axios');
var colors = require('colors');
var dir = './docs-hub';
var fs = require('fs');
var rimraf = require('rimraf')

if (!fs.existsSync(dir)) {
  console.log(`[setup] `, `initialising ${dir}`.green)
  fs.mkdirSync(dir);
} else {
  console.log(`[setup] `, `recreating ${dir}`.green)
  // fs.rmdirSync(dir);
  rimraf(dir, () => fs.mkdirSync(dir))
  
}

const downloadDocs = (url) => {
  console.log('[setup] ', `⇩ GET: ${url}`.blue)
  axios({
    method: 'GET',
    url,
    headers: {
      "Accept": "application/vnd.github.raw"
    }
  }).then((apiResponse) => {
    console.log(`[setup] `, `✔ download complete`.green, `\n-> response length: ${apiResponse.data.length}`)
    const title = apiResponse.data.split('\n')[0].split('#')[1]
    console.log(title)
    fs.writeFile(`${dir}/${title}.md`, apiResponse.data, function (err) {
      if (err) {
        return console.log(err);
      }

      console.log("The file was saved!");
    });
    // fs.writeFileSync(dir, apiResponse.data, function (err) {   if (err) {
    // return console.warn(`[setup] error writing file: ${err}`.red)   } else {
    // console.log(`[setup] `, `file was saved`.green)   } })
  }).catch((e) => {
    console.warn(`[setup] `, `✗ could not download ${url}`.red, `\nerror: ${e}`.red)
  })
}

downloadDocs('https://api.github.com/repos/bilo-io/bilo-ui/contents/README.md');
downloadDocs('https://api.github.com/repos/bilo-io/bilo-bio/contents/README.md');
downloadDocs('https://api.github.com/repos/bilo-io/tut-react/contents/README.md');
