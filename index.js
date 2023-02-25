//@Sharishth Singh https://github.com/Sharishth for more projects and snipets
function test() {
    console.log("This is part is working or called.")
}

const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

const stylesheet = '<meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Image-presenter</title> <link rel="stylesheet" href="css/style.css"> <script src="js/script.js"></script>'
const dirTest = 99999 //useless const variable, no use only for testing
const rootDir = '/'
//console.log(rootDir)
app.get(rootDir, (req, res) => {
    res.send(stylesheet + `<br><a href="/1">Start</a>`)
})

var pages = []
var i
var newDirs = []
const fs = require('fs');
const imgDir = 'public/img/'
let totalImgs = fs.readdirSync(imgDir).length // find total images and create pages and directories based on it
//console.log(totalImgs)
function pageNogen(n) {
    for (i = 1; i < n+1; i++) { //generating n number of pages  from 1
        pages[i] = i
    }
}

function newDirgen(n) {
    for (i = 1; i < n+1; i++) { //generating n number of directory from 1
        newDirs[i] = rootDir + pages[i]
    }
}

//console.log(newDirs[2])
//console.log(pages[4])

function genpage(pageno,lastpage) {
    if (pageno==1) {
        app.get(newDirs[pageno], (req, res) => {
            res.send(stylesheet + `<p>Page ${pages[pageno]}</p> <img src="img/${pageno}.jpg" width="536" height="354"> <br><br> <a href="..">Home</a> <a href="${pages[pageno+1]}">next page</a>`)
        })
    }
    if (pageno!=lastpage && pageno!=1) {
        app.get(newDirs[pageno], (req, res) => {
            res.send(stylesheet + `<p>Page ${pages[pageno]}</p> <img src="img/${pageno}.jpg" width="536" height="354"> <br><br> <a href="${pages[pageno-1]}">Previous page</a> <a href="..">Home</a> <a href="${pages[pageno+1]}">next page</a>`)
        })
    }
    if (pageno==lastpage) {
        app.get(newDirs[pageno], (req, res) => {
            res.send(stylesheet + `<p>Page ${pages[pageno]}</p> <img src="img/${pageno}.jpg" width="536" height="354"> <br><br> <a href="${pages[pageno-1]}">Previous page</a> <a href="..">Home</a>`)
        })
    }
}

function genPageDir(n) {
    for (i = 1; i < n+1; i++) {
        genpage(i,n)
    }
}

pageNogen(totalImgs)
newDirgen(totalImgs)
genPageDir(totalImgs)

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
