const express = require('express');
const app = express();
const fs = require('fs');

// use ejs files to prepare for views
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const readFile = (filename) => {
  return new Promise((resolve, reject) => {
    // get data from file
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      // tasks list data from file
      const tasks = data.split('\n');
      resolve(tasks);
    });
  });
};

app.get('/', (req, res) => {
  // tasks list data from file
  readFile('./tasks').then((tasks) => {
    console.log(tasks);
    res.render('index', { tasks: tasks });
  });
});

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  // tasks list data from file
  readFile('./tasks').then((tasks) => {
    // add form sent task to tasks array
    tasks.push(req.body.task);
    const data = tasks.join('\n');
    fs.writeFile('./tasks', data, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      // redirect to / to see result
      res.redirect('/');
    });
  });
});

app.listen(3001, () => {
  console.log('Example app is starter at http://localhost:3001');
});
