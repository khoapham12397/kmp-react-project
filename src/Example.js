import React from 'react';

export class Example extends React.Component{
	constructor(props){
		super(props);
		this.act = 0; this.curR = 0; this.curC=1000;
		this.keysPressed = new Map();
		for(let i=37;i<41;i++) this.keysPressed.set(i,false);
		this.state= {
			r : 0,c: 1000
		}
		//alert(this.act);
		//this.doOnething();
		
	}
	componentDidMount(){
		fetch('https://tiki.vn/api/v2/products?limit=48&q=ca-phe&page=1')
		.then(res=> res.json())
		.then(result => {
			this.act =1;
		},error =>{
			this.act=2;
		});
//		alert(this.act);
		document.addEventListener("keydown",(event)=>{
			let x= event.keyCode;
			let nr= this.state.r, nc= this.state.c;
			if(x>=37 && x<41) this.keysPressed[x] = true;
			if(this.keysPressed[37]) nc--;
			if(this.keysPressed[40]) nr++;
			this.setState({r: nr, c:nc});
		});
		document.addEventListener("keyup",(event)=>{
			var x = event.keyCode;
			if(x>=37 && x<41) this.keysPressed[x] = false;
		});
	}
	// sau do no sinh ra cai gi ??
	// dau tien la cai do dung vay sau do la gi ??
	// ta bat dau co cai gi ???
	// neu chi thuc hien 1 cach co ban thi the nay : //
	// sau tien khi ta thuc hien change => la change truc tiep len cay DOM tuc bat ky 1 dong thai nao 
	// cung se co the lam thay doi no :

	doOnething(){
		// no chinh la viec xay dung 1 dang thuc callback dung vay do ma just do it and something else:
		// dung vay :

	}
	
	doSomething(){
		let x=0;
		for(let i=0;i<100000000;i++){x++;}
		this.act=1;
	}
	changeAct(){
		this.act = 1- this.act;
		setTimeout(()=>this.changeAct(),50);
	}
	render(){
		return (<div> r = {this.state.r} , c= {this.state.c}</div>);//
	}
}