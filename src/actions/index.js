// dau tien neu no la 1 file index thi don gian minh chi can add no vao trong nay dung :
// tu do chia tach + phan tang chuc nang cua no ra la duoc dung vayco
// do la gi ??? cai action nay no di theo 1 quy luat
// minh co chu : 
// no la cai gi lien quan den action no chinh la viec sinh ra 1 action :
// thuc thi 1 cai function nay => ra  1 cai object la action dun vay :

export const setTech =  function(tech){
	return {type : 'SET_TECH', payload:{tech: tech}};
}

export const setCategory = function(category){
	return {type : 'SET_CATEGORY' , payload: {category : category}};
}

export const addCategory = function(category){
	return {type: 'ADD_CATEGORY', payload :{category : category}}
}
export const addToCart = function(prod){
	return {type: 'ADD_CART',payload: {product: prod}};
}
export const incCart =function(index,number){
	return {type : 'INCREASE_QUANTITY_CART',payload : {index : index, number: number}};
}