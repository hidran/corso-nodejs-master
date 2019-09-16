
const pool = require('../db');

async function getLists() {

   const [result,] = await pool.query('SELECT * FROM lists');
   return result;
}
async function getListById( id) {
    const [result,] = await pool.query('SELECT * FROM lists where id=?',[id]);
    return result[0];
}
async function deleteList( id) {
    const [result,] = await pool.query('DELETE FROM lists where id=?',[id]);
    return result.affectedRows ;
}
async function addList(name){
    const created_at = new Date();
    const [result,] = await pool.query('INSERT INTO lists (name,user_id,created_at) values (?,?,?)',[name,1,created_at]);

  //  const list =  await getListById(result.insertId) ;
    return {id: result.insertId, name, user_id:1,created_at};

}
async function updateList(id, name){
    const updated_at = new Date();
    const [result,] = await pool.query('UPDATE  lists SET name =?, updated_at=? where id=?',[name, updated_at,id]);
    return {id, name, user_id:1, updated_at}


}
module.exports = {
    getLists,
    getListById,
    deleteList,
    addList,
    updateList
};
