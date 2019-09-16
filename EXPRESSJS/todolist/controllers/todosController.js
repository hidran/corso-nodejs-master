const pool = require('../db');

async function  getTodos() {
    const [result,] = await pool.query('SELECT * FROM todos');
    return result;
}
async function  getTodosByListId(list_id) {
    const [result,] = await pool.query('SELECT * FROM todos where list_id',[list_id]);
    return result;
}
async function getTodoById( id) {
    const [result,] = await pool.query('SELECT * FROM todos where id=?',[id]);
     return result[0];
}
async function deleteTodo( id) {
    const [result,] = await pool.query('DELETE FROM todos where id=?',[id]);
    return result.affectedRows ;
}
async function addTodo({todo, completed, list_id}){
    const created_at = new Date();
    const [result,] = await pool.query('INSERT INTO todos (todo,  completed,list_id,created_at) values (?,?,?,?)',[todo,completed,list_id,created_at]);

    //  const list =  await getListById(result.insertId) ;
    return {id: result.insertId, todo, created_at, list_id};
}
async function updateTodo(id, {todo, list_id, completed}){
    console.log(todo, list_id);
    completed = completed || 0;
    const updated_at = new Date();
    const [result,] = await pool.query('UPDATE  todos SET todo =?, updated_at=?, list_id=?,completed= ? where id=?',[todo, updated_at,list_id,completed, id]);
    return getTodoById(id);

}
module.exports = {
    getTodos,
    getTodoById,
    deleteTodo,
    addTodo,
    updateTodo
};
