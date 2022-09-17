const util = require('util');
const fs = require('fs');

const uuidv1 = require('uuid');

const readFileSync = util.promisify(fs.readFile);
const writeFileSync = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileSync('./db.json', 'utf8')
    }

    write(note) {
        return writeFileSync('./db.json', JSON.stringify(note))
    }

    getNotes() {
        return this.read().then((notes) => {
            let parseNotes;

            try {
                parseNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parseNotes = [];
            }

            return parseNotes;
        });
    }

    addNotes() {
        const {title, text} = note;
         
        if (!title || !text) {
            throw new Error("'Title' and 'text' cannot be left blank.");
        }

        const newNote = {title, text, id: uuidv1()};

        return this.getNotes()
        .then((notes) => [...notes, newNote])
        .then((updateNotes) => this.write(updateNotes))
        .then(() => newNote);
    }
}

module.exports = new Store();