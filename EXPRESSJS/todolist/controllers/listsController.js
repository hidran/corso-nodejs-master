const data = require('../data');

function getLists() {
    return data.lists;
}
function getListById( id) {
    return data.lists.find(List => List.id == id);
}
function deleteList( id) {
    const idx = data.lists.findIndex(List => List.id == id);
    if(idx > -1){
        const ele =  data.lists.splice(idx,1);
        return ele;
    }
    return 0;
}
function addList(name){
    const list = {name, id:data.lists.length + 1}
    data.lists.unshift(list);
    return list;
}
function updateList(id, name){
    const oldList = getListById(id);
    if(oldList){
        data.lists[id] = {...oldList,name};
        return data.lists[id];
    }
    return false;

}
module.exports = {
    getLists,
    getListById,
    deleteList,
    addList,
    updateList
}
