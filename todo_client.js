
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const client = require("./client");
const cors = require('cors')




const port = 3030;



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// client.getAllTodos({}, (error, news) => {
//   if (error) throw error;
//   console.log(news);
// });



// get all todos 
app.get('/', (req, res) => {
  client.getAllTodos({}, (error, todo) => {
    if (error) throw error;
    res.status(200).json(todo)
  });
});



// add a todo
app.post('/addTodo', (req, res) => {


  const body = req.body;


  client.addTodo(
    {
      id: body.id, title: body.title, todo: body.todo
    },
    (error, todo) => {
      if (error) throw error;
      res.status(201).json({
        message: "Successfully created a todo.",
      },
      );
    }
  );


})

// edit a todo
app.put('editTodo/:id', (req, res) => {


  const id = req.params.id;
  const body = req.body

  client.editTodo(
    {
      id: id,
      title: body.title,
      todo: body.todo,
    },
    (error, todo) => {
      if (error) throw error;
      res.status(200).json({
        message: "Successfully edited a todo.",
        todo
      },)
    }
  );
})


// fetch a single todo
app.get('/todo/:id', (req, res) => {

  const id = req.params.id;

  client.getTodo(
    {
      id: id,
    },
    (error, todo) => {
      if (error) throw error;
      res.status(200).json(
        todo
      )
    }
  );
})

// delete a todo
app.delete('deleteTod/:id', (req, res) => {


  const id = req.params.id;

  client.deleteTodo(
    {
      id: id,
    },
    (error, todo) => {
      if (error) throw error;

      res.status(204).json({
        message: "Successfully deleted a todo item.",
      })


    }
  );

})



app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})














