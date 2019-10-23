
const List = require('../models').List;
const Todo = require('../models').Todo;
const Op = require('../models').Sequelize.Op;
const  attributes = {
    include:[
        [List.sequelize.fn('COUNT',
            List.sequelize.col('Todos.id')),'total']
    ],
    exclude:['createdAt','userId']

};
async function getLists(pars = {}) {
    const where = {};
   if (pars.q ) {
       where.name= {
           [Op.like] :  '%' + pars.q + '%'
       };
   }
    if (pars.userId ) {
        where.userId= pars.userId;
    }
  return  List.findAll({
      attributes,
      subQuery: false,
      limit: 2000,
      include:[
          {model: Todo, attributes:[]}
      ],
      group: ['List.id'],
      order :[
          ['createdAt', 'DESC']
      ],
      where : where
  });

}
async function getListById( id) {
    return  List.findByPk(id);
}
async function getListByUserId( userId) {
    return  List.findAll(
        {
            attributes:['id','name'],
            where: {userId},
            order:[
                ['name' ,'ASC']
            ]
        }
    );
}
async function deleteList( id) {
   return  List.destroy({where:{id}});

}
async function addList(name, userId ){
    return List.create({ name,userId});

}
async function updateList(id, name){
  return  List.update({name}, {where:{id}});


}
module.exports = {
    getLists,
    getListById,
    deleteList,
    addList,
    updateList,
    getListByUserId
};
