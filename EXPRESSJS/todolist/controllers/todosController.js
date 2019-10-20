const Todo = require('../models').Todo;
const attributes =['id','todo','listId','createdAt' ,'completed'];

async function  getTodos() {
    return Todo.findAll({ include : ['List'],attributes, limit:20});
}

async function  getTodosByListId(list_id, completed = null) {
    const where = {listId: list_id};
    if(completed !== null){
        where.completed = completed;
    }
    return  Todo.findAll({
        attributes,
        include : ['List'],
        limit: 20,
        where
    });
}
async function getTodoById( id) {
   return Todo.findByPk(id,{
       attributes,
       include:['List']
   });
}
async function deleteTodo( id) {
    return Todo.destroy({where: id});
}
async function addTodo({todo, completed, listId}){
    return Todo.create({todo, completed, listId});
}
async function updateTodo(id, {todo, listId, completed}){
    return Todo.update({todo, completed, listId},
        {
            where: { id }
        });


}
module.exports = {
    getTodos,
    getTodoById,
    deleteTodo,
    addTodo,
    updateTodo,
    getTodosByListId
};
