const contacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const allContacts = await contacts.listContacts();
            console.table(allContacts);

            break;

        case "get":
            const contactById = await contacts.getContactById(id);
            if (!contactById) {
                throw new Error(`Contact with id=${id} doesn ton exist`);
            };

            console.table(contactById);
            break;

        case "add":
            const newContact = await contacts.addContact({ name, email, phone });

            console.table(newContact);
            break;

        case "remove":
            const removedContact = await contacts.removeContact(id);
            if (!removedContact) {
                throw new Error(`Contatc with id=${id} does not exist!`);
            };

            console.table(removedContact);
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    };
};

invokeAction(argv);