// ko can import bat ky 1 module nao 
// ban chat no la 1 functiond dung n reducer
// 2 val : total and items:
// dung :

export const reducer = (state,action)=>{
	
	switch(action.type){
		case "SET_TECH":
			var newState = {...state, tech : action.payload.tech};
			return newState;
		case "SET_CATEGORY":
			var newState = {...state, category : action.payload.category};
			return newState;
		case "ADD_CATEGORY":
			var cates = Array.from(state.categories);
			cates.push(action.payload.category);
			return {...state,categories: cates};
		case "ADD_CART":
			var cart = Object.assign({},state.cart);
			var prod = action.payload.product;
			cart.total += prod.price; 
			var ex =false;
			var items= cart.items;
			for(let i=0;i<items.length;i++) if(items[i].id == prod.id){
				items[i].quantity++;
				ex=true; break;
			}
			if(!ex) {
				prod.quantity =1; cart.items.push(prod);
			}
			return {...state, cart: cart};
		case "INCREASE_QUANTITY_CART":
			var cart = Object.assign({},state.cart);
			var ind  = action.payload.index; 
			var number = action.payload.number;
			var item = cart.items[ind];
			if(number == 1){
				item.quantity ++;
				cart.total += item.price;
				return {...state, cart: cart};
			}else if(number ==-1){
				if(item.quantity>0) {cart.total -= item.price; item.quantity--;}
				return {...state , cart: cart};
			}

			break;
			
	}
	return state;
}
// hoi do bi cai nay nen minh bi lung tung dung vay sau do thi sao /??
// vi du them cai gi ???
// dung chua :

// tuc la the nay ne dung chua minh can thuc hien export full ra ben ngoai dung vay :
// don gian dung chua dung vay:
// con ngoai ra thi cung ok thoi
// if -> truy nhap vao day --> import mac dinh chinh xac la vay :
// dieu nay co the dung ''