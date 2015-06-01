'use strict'

//
// Node config
// ====================
var request = require('request')
var path = require('path')
var fs = require('fs')

//
// App config
// ====================
var fileName = process.argv[2]
var file = null
var total = null
var course = null

//
// Request app
// ====================
if (!/\.json$/.test(fileName)) {
  console.log('\nYou are doing it wrong...', fileName)
  console.log('Provide a JSON file...\n')
  throw new Error('We just accept JSON files.')
}

try {
  course = JSON.parse(fs.readFileSync(fileName, 'utf8'))
  total = (course.length - 1)
} catch(err) {
  console.log('\nYou are doing it wrong...', fileName)
  console.log('Should be a valid JSON file...\n')
  throw new Error('The file should be a valid JSON.')
}


(function getFile(obj, fileIndex) {
  if ( !('name' in obj && 'url' in obj) ) {
    console.log('\nYou have a valid JSON...', fileName)
    console.log('But you dont have a valid structure...\n')
    throw new Error('Wrong JSON structure, look at README file')
  }

  var ind = String(fileIndex).length < 2 ? '0' + fileIndex : fileIndex
  var fileUrl = obj.url
  var fileExtension = path.extname(fileUrl)
  var title = ind + '-' + obj.name.replace(/\W/g, '-')

  request
    .get(fileUrl)
    .on('response', function(res) {
      console.log('Downloading video: ', title+fileExtension, res.statusCode, res.headers['content-type'])
    })
    .on('end', function() {
      console.log('Download finished: ', title+fileExtension)

      if (fileIndex !== total) {
        getFile(course[(fileIndex + 1)], (fileIndex + 1))
      }
    })
    .pipe(fs.createWriteStream(title+fileExtension))

})(course[0], 0)
