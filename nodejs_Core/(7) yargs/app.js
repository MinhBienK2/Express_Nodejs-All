//nhuw kieeur object
const chalk = require("chalk");
const yargs = require("yargs");

// console.log(yargs.version("1.1.0"))

//comand remove
yargs.command({
    command: "add",
    describe: "Add a new",
    builder: {
        title:{
            describe: 'node title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe:"node body",
            demandOption:true,
            type: 'string'
        }
    },
    handler: function (argv) {
        console.log("Title: " + argv.title);
        console.log("body :" + argv.body);
    },
});


//command remove
yargs.command({
    command: "remove",
    describe: 'remove a tab',
    handler: function () {
        console.log("remove the new")
    }
});

yargs.command({
    command: 'read',
    describe: 'read a file',
    handler: function () {
        console.log('reading a note')
    }
})

yargs.command({
    command: 'list',
    describe: 'list a file',
    handler: function () {
        console.log('list a new ')
    }
})
yargs.parse();
console.log(yargs.parse())
// console.log(yargs.argv);
