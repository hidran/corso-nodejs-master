const Todo = require('../models').Todo;
const List = require('../models').List;
const Op = require('../models').Sequelize.Op;
const attributes = ['id', 'todo', 'listId', 'createdAt', 'completed'];

async function getTodos(pars = {}) {
    const where = {};
    if (pars.q) {
        where.todo = {
            [Op.like]: '%' + pars.q + '%'
        };
    }
    if (pars.completed !== undefined) {
        where.completed = pars.completed;
    }
    const whereList = {};
     if (pars.userId ) {
         whereList.userId= pars.userId;
     }


    return Todo.findAll(
        {
            where,
            include: [
                {
                    model: List,
                    where : whereList
                }
            ],
            attributes,
            limit: 20
        }
    );
}

async function getTodosByListId(list_id, completed = null) {
    const where = {listId: list_id};
    if (completed !== null) {
        where.completed = completed;
    }

    return Todo.findAll({
        attributes,
        include: ['List'],
        limit: 20,
        where
    });
}

async function getTodoById(id) {
    return Todo.findByPk(id, {
        attributes,
        include: ['List']
    });
}

async function deleteTodo(id) {
    return Todo.destroy({where: id});
}

async function addTodo({todo, completed=0, listId=null}) {
console.log(todo, completed, listId)
    return Todo.create({todo, completed, listId});
}

async function updateTodo(id, {todo, listId, completed}) {
    return Todo.update({todo, completed, listId},
        {
            where: {id}
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
