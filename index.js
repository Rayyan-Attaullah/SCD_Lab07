
const express = require('express');
const bodyParser = require('body-parser');


const app = express();

const PORT = 3000;



app.use(bodyParser.json());


let tasks = [];
let users = [];


app.post('/signup', (req, res) => 
{

    const { username, password } = req.body;

    users.push({ username, password });

    res.status(201).send('User registered successfully');


});


app.post('/login', (req, res) => 
{


    const { username, password } = req.body;

    const user = users.find(user => user.username === username && user.password === password);

    if (!user) 
    {

        return res.status(401).send('Invalid credentials');

    }


    res.status(200).send('Login successful');


});


app.post('/add-task', (req, res) => 
{


    const { title, description, dueDate, category, priority } = req.body;

    const task = { title, description, dueDate, category, priority, completed: false };

    tasks.push(task);

    res.status(201).send('Task created successfully');



});





app.get('/all-tasks', (req, res) =>
{


    const { sortBy } = req.query;

    let sortedTasks = [...tasks];

    if (sortBy) 
    {

        sortedTasks.sort((a, b) =>
         {

            if (sortBy === 'dueDate') 

            {
                return new Date(a.dueDate) - new Date(b.dueDate);
            } 
            else if (sortBy === 'category')
            {

                return a.category.localeCompare(b.category);

            }
             else if (sortBy === 'priority') 
            {

                return a.priority.localeCompare(b.priority);

            }

        });


    }


    res.status(200).json(sortedTasks);




});




app.put('/tasks/:taskId/complete', (req, res) => 
{


    const { taskId } = req.params;

    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) 
    {

        return res.status(404).send('Task not found');

    }

    tasks[taskIndex].completed = true;
    
    res.status(200).send('Task marked as completed');


});



app.listen(PORT, () => 
{

    console.log(`Server running on port ${PORT}`);

});
