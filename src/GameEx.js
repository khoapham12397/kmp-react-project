import React from 'react';

const IDLE = 0;
const WAIT = 1;

export class GameBoard extends React.Component{
	
	constructor(props){
		super(props);

		this.acting = IDLE;
		this.curPos = -1;
		this.dataBoard = new Array(36);
		this.generateData();
		this.state = {
			stateBoard :  new Array(36).fill(0), message : ""
		} 
	}

	generateData(){
		var arr= [];
		for(let i=0;i<36;i++) arr.push(i);
		for(let i=1;i<=18;i++){
			let x= Math.floor(Math.random()*1000)%arr.length;	
			let u = arr[x];
			arr.splice(x,1);
			//alert(x);
			let y=  Math.floor(Math.random()*1000)%arr.length;
			let v= arr[y];
			arr.splice(y,1);	
			this.dataBoard[u] = i;
			this.dataBoard[v] = i;
		}

	}


	handleClick(event , index){
		
		if(this.acting == IDLE){
			if(this.state.stateBoard[index] == 0){
				this.acting = WAIT; 
				this.curPos = index;
				this.setState((state,props)=>{
					var st = state.stateBoard.slice();
					st[index] =1;
					return {stateBoard : st};
				});
				
			}
			return;
		}
		if(this.acting == WAIT){
			if(this.state.stateBoard[index] == 0){
				this.setState((state,props)=>{
					var st = state.stateBoard.slice();
					st[index] =1;
					return {stateBoard :st};
				});

				setTimeout(()=>{
					if(this.dataBoard[this.curPos] != this.dataBoard[index]){
						this.setState((state,props)=>{
							var st= state.stateBoard.slice();
							st[index] =0;
							st[this.curPos] =0;
							this.curPos = -1;
							this.acting =IDLE;
							return {stateBoard : st, message : "Incorrect"};
						});
					}else {
						this.curPos =-1; this.acting= IDLE;
						this.setState({message : "Correct"});
					}
				},500);
			}
		}
	}
	render(){
		const arr =[];
		const ds =[];
		for(let i=0;i<36;i++) ds.push((<button>{this.dataBoard[i]}</button>));//
		for(let i=0;i<6;i++){
	//		alert(arr[i]);
			for(let j=0;j<6;j++){
				var sq = <button style={{width: "60px", height: "60px" , fontSize : "20px"}} onClick={(e)=>this.handleClick(e,6*i+j)}>{this.state.stateBoard[6*i+j]==0?".":this.dataBoard[6*i+j]}</button>;//
				arr.push(sq);
			}
		}	

		return (<div>
			<div>{ds}</div>
			<div>{arr.slice(0,6)}</div>
			<div>{arr.slice(6,12)}</div>
			<div>{arr.slice(12,18)}</div>
			<div>{arr.slice(18,24)}</div>
			<div>{arr.slice(24,30)}</div>
			<div>{arr.slice(30,36)}</div>
			<div>{this.state.message}</div>
			</div> );//
	}
}

export default GameBoard;