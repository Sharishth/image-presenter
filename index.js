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

function pageNogen() {
    for (i = 1; i < 11; i++) { //generating 10 number of pages
        pages[i] = i
    }
}
pageNogen()

function newDirgen() {
    for (i = 1; i < 11; i++) { //generating 10 number of directory
        newDirs[i] = rootDir + pages[i]
    }
}
newDirgen()
//console.log(newDirs[2])
//console.log(pages[4])
var pageno = 1

function genpage(pageno) {
    if (pageno==1) {
        app.get(newDirs[pageno], (req, res) => {
            res.send(stylesheet + `<p>Page ${pages[pageno]}</p> <img src="img/${pageno}.jpg" width="536" height="354"> <br><br> <a href="..">Home</a> <a href="${pages[pageno+1]}">next page</a>`)
        })
    }
    if (pageno!=10 && pageno!=1) {
        app.get(newDirs[pageno], (req, res) => {
            res.send(stylesheet + `<p>Page ${pages[pageno]}</p> <img src="img/${pageno}.jpg" width="536" height="354"> <br><br> <a href="${pages[pageno-1]}">Previous page</a> <a href="..">Home</a> <a href="${pages[pageno+1]}">next page</a>`)
        })
    }
    if (pageno==10) {
        app.get(newDirs[pageno], (req, res) => {
            res.send(stylesheet + `<p>Page ${pages[pageno]}</p> <img src="img/${pageno}.jpg" width="536" height="354"> <br><br> <a href="${pages[pageno-1]}">Previous page</a> <a href="..">Home</a>`)
        })
    }
}

for (i = 1; i < 11; i++) {
    genpage(i)
}

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})