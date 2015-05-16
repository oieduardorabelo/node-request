'use strict'

var request = require('request')
var fs = require('fs')
var total = null
var course = null

if (!/\.json$/.test(process.argv[2])) {
  console.log('You are doing it wrong...', process.argv[2])
  console.log('Provide a JSON file...')
  return
}

course = require('./'+process.argv[2])
total = (course.length - 1)

function getVideo(obj, videoIndex) {
  console.log(obj);
  var ind = String(videoIndex).length < 2 ? '0' + videoIndex : videoIndex
  var url = obj.url
  var title = ind + '-' + obj.name.replace(/\W/g, '-')
  request
    .get(url)
    .on('response', function(res) {
      console.log('Downloading video: ', title+'.mp4', res.statusCode, res.headers['content-type'])
    })
    .on('end', function() {
      console.log('Download finished: ', title+'.mp4')

      if (videoIndex !== total) {
        getVideo(course[(videoIndex + 1)], (videoIndex + 1))
      }
    })
    .pipe(fs.createWriteStream(title+'.mp4'))
}

getVideo(course[0], 0)
