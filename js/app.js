import  express  from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express()

app.use (express.json());
app.use(cors());

const port = 3000

app.listen (port, () =>{
    console.log(`O servidor está rodando na ${port}`)
})

async function main() {
    await mongoose.connect("mongodb+srv://admin:admin@cluster0.gzxtzm2.mongodb.net/");
}

main();

const itemSchema = new mongoose.Schema({
    task: String
});


const Task = mongoose.model('Task', itemSchema);


app.get('/list', async (req, res)=> {
    try {
        const tasks = await Task.find()
        res.send(tasks).status(200)
    } catch (error) {
        console.log(error)
    }
})

app.post('/list', async (req, res) => {
    try {
    await new Task({ task: req.body.task }).save();
    res.status(200).send(`${req.body.task} adicionado com sucesso`);
    } catch (error) {
    console.log(error);
    }
});


app.put('/list/:id', async (req, res)=> {
    try {
        const taskFound = await Task.findByIdAndUpdate(req.params.id, {task: req.body.task})
        res.send(taskFound).status(200)
    } catch (error) {
        console.log(error)
    }
})

app.delete('/list/:id', async (req, res) => {
    try {
    const taskFound = await Task.findByIdAndDelete(req.params.id);
    const tasks = await Task.find();

    res.json({ message: `${taskFound} removido com sucesso`, tasks });
    } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro ao excluir a tarefa' });
    }
});

