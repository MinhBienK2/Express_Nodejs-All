const nodemon = require('nodemon')
const fs = require('fs')
const yargs = require('yargs')
const notes = require('./note.js')

yargs.command({
    command: 'add',
    describe: 'Add a new',
    builder: {
        title:{
            describe: 'node title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'node body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.addNote(argv.title,argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'remove one json',
    builder: {
        title: {
            describe: 'node title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'update',
    describe:'update one json',
    builder: {
        title:{
            describe: 'node title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'node body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        notes.updateNote(argv.title,argv.body)
    }
})

yargs.command({
    command: 'read',
    describe:'read one json',
    builder: {
        title: {
            describe: 'node title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        notes.readNote(argv.title)
    }
    
})

yargs.parse()

