
const List = require('../models').List;
const  attributes = ['id','name','userId','createdAt'];
async function getLists() {

  return  List.findAll({
      attributes,
      limit: 20
  });

}
async function getListById( id) {
    return  List.findByPk(id, { attributes});
}
async function deleteList( id) {
   return  List.destroy({where:{id}});

}
async function addList(name){
    return List.create({ userId:1, name});

}
async function updateList(id, name){
  return  List.update({name}, {where:{id}});


}
module.exports = {
    getLists,
    getListById,
    deleteList,
    addList,
    updateList
};
