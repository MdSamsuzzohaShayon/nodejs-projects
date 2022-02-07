const program = require('commander');
const inquirer = require('inquirer');
const figlet = require('figlet');
const mongoose = require('mongoose');
const chalk = require('chalk');

const Schema = mongoose.Schema;


const EventEmitter = require('events').EventEmitter;

let appState = new EventEmitter();


mongoose.connect('mongodb://localhost:27017/contact',
    {
        useUnifiedTopology: true, useNewUrlParser: true
    }, (err) => {
        if (err) {
            throw Error("Error to connect database");
        } else {
            console.log('Mongodb Database connections is made successfully');
            appState.emit('Connected');
        }
    });



const contactSchmea = new Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    }
});


const Contact = mongoose.model('con_list', contactSchmea);









// program.option("-f , --force", "Force Install");
program.command("addContact <name> <number>").description("Add new contact").action((name, number)=>{
    // inquirer.prompt(questions).then(answers=>{
    //     console.log(chalk.blue(answers));
    // });
    const contact = new Contact({name, number});
    console.log("Contact");
    contact.save((err, docs)=>{
        if(err) console.log(err);
        console.log(chalk.green("Contact added"), docs);
        
    });
});

program.parse(process.argv);
// if(program.force)console.log("Forcing....");


