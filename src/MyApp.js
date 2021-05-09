import React from 'react';
import {Buttons} from './ButtonsComp';
import {SearchComponent} from './SearchApp';
import {useSelector,useStore,useDispatch} from 'react-redux';



export const MyApp = ({})=>{
	var curTech = useSelector(state => state.tech);
	var curCategory = useSelector(state=>state.category);
	var cart =useSelector(state=>state.cart);
	return (
		<div>
			<button onClick={
				()=>{alert(JSON.stringify(cart));}
			}>ViewCart</button>
			<h1>This is {curTech}</h1> 
			<Buttons techs = {["React","Spring","Nodejs"]}/>
			<h1>Category : {curCategory}</h1>
			<SearchComponent />
		</div>
	);
}
// can cai do moi duoc ???
// dieu nay qua la dung la vay :
// nhung ma minh can hieu duoc cai gi /????
// moi thuc con qua mon ho

export default MyApp;
//
/*
class MyApp extends React.Component{
	constructor(props){
		super(props);
	}
	
	render(){
		
		return (
		<div>
			<h1>This is {store.getState().tech}</h1>//
			<Buttons techs = {["React","Spring","Nodejs"]}/>
		</div>
		);//
	}
}
export default MyApp;
*/
