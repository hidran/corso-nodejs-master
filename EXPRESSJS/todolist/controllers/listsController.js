
const List = require('../models').List;
const Todo = require('../models').Todo;
const  attributes = {
    include:[
        [List.sequelize.fn('COUNT',
            List.sequelize.col('Todos.id')),'total']
    ],
    exclude:['createdAt','userId']

};
async function getLists() {

  return  List.findAll({
      attributes,
      subQuery: false,
      limit: 20,
      include:[
          {model: Todo, attributes:[]}
      ],
      group: ['List.id']
  });

}
async function getListById( id) {
    return  List.findByPk(id);
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
