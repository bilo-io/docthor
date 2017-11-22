var axios = require('axios')
var colors = require('colors')
var dirTree = require('directory-tree')
var fs = require('fs-extra')
var svn = require('svn-interface')

var docs = require('./docs.js')
var dir = './docs-hub'

const log = (args) => {
  console.log(`[setup] `.green, args)
}

const setup = () => {
  if (fs.existsSync(dir)) {
    log(`recreating ${dir}`.green)
    fs.remove(dir, () => fs.mkdir(dir, () => setupDocs()))
  } else {
    fs.mkdir(dir, () => setupDocs())
  }
}

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
  let folder = path.split('/')[0];
  log(`⇩ downloading:
  -> docs: ${title}
  => path: ${url}`.cyan)
  svn.export(url, {}, () => {
    log(`✔ copied: ${url}`.green)
    addToDocs(folder, title)
  })
}

const addToDocs = (folder, title) => {
  log(`deleting: ${title}`.yellow)
  fs.remove(title, (err) => {
    if (!err) {
      log(`-> renaming: '${folder}' to '${title}'`.grey)
      fs.rename(folder, title, (err) => {
        if (!err) {
          log(`-> copying: '${title}' to 'docs-hub'`.magenta)
          fs.copy(title, `docs-hub/${title}`, () => {
            fs.remove(title).then((val) => {
              log(`✔ added ${title}`)
              generateDocTree()
            }).catch((err) => {
            })
          })
        }
      })
    }
  })
}

const setupDocs = () => {
  log(`setup started ... `.green)
  log(`downloading doc items: `.green + `${docs.config.children.length}`.yellow)
  docs.config.children.forEach((doc) => {
    downloadGitDirectory(doc.repo, `${docs.config.base_url}/${doc.repo}`, doc.docs)
  })
  log(`setup complete !`.green)
}

setup()