const fs = require('fs')
const chalk = require('chalk')
const getNote = function () {
    return ' your notes ...'
}

debugger
const addNote = function (title,body) {
    const notes = loadNote()
    // filter loc ra 1 mang moi
    // const duplicateNotes = notes.filter(function (note) {    
        const duplicateNotes = notes.find(function (note) {
            return note.title ===title
    })
    debugger
    // if(duplicateNotes ==0){
    if(!duplicateNotes){
        notes.push({
            title: title,
            body: body
        })
        saveNote(notes)
    }
    else console.log('repeat ohhh')
    
}

function removeNote(title) {
    const notes = loadNote()
    const removeNote = notes.filter(note => {
        if(!(note.title === title))
            return note
    })
    saveNote(removeNote)
}

function updateNote(title,body) {
    const notes = loadNote()
    const updateNote = notes.map(note => {
        if(note.title === title) 
             return {...note, body: body}
        else return note
    })
    saveNote(updateNote)
}

function readNote(title) {
    const notes = loadNote()
    const read = notes.find(note => note.title ===title)
    if(read) console.log(chalk.red.inverse(read.title),chalk.blue(read.body))
    else console.log('no read')
}


function saveNote (notes) {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJson)
}

function loadNote() {
    try{
        const databuffer = fs.readFileSync('notes.json')
        const dataJson = databuffer.toString()
        return JSON.parse(dataJson)
    }catch(e){
        return []
    }
}

module.exports = {
    getNote: getNote,
    addNote: addNote,
    removeNote: removeNote,
    updateNote: updateNote,
    readNote: readNote,
}


