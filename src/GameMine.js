import React from 'react';

const REG = 0;
const FLAG =1;


export class GameMine extends React.Component{
	constructor(props){
		super(props);
		this.N = 10; this.dataBoard = [];
		this.bomb = 20;
		this.initState = Array(this.N * this.N).fill(0);
		this.state = {
			stateBoard : this.initState.slice() , mode : REG,message :""
		}
		this.generate();
	}
	generate(){
		var arr = [];
		var n= this.N;
		var size = n*n;
		var dataBoard = Array(size).fill(0);

		for(let i=0;i<size;i++) arr.push(i);

		for(let i=0;i<this.bomb;i++){
			let x= Math.floor(Math.random()*1000) % arr.length;
			let u=arr[x]; arr.splice(x,1);
			dataBoard[u] =-1;
		}
		
		alert("size= "+size);

		for(let i=0;i<size;i++){
			if(dataBoard[i]!=-1){
				let val =0;
				if(i+1 < size && i%n!=(n-1) && dataBoard[i+1]==-1 ) val++;
				if(i-1 >=0 && i%n!=0 && dataBoard[i-1]==-1 ) val++;
				if(i+n < size && dataBoard[i+n]==-1) val++;
				if( i+n-1 <size && i%n!=0 && dataBoard[i+n-1]==-1) val++;
				if(i+n+1 <size && i%n!=(n-1)  && dataBoard[i+n+1]==-1) val++;
				if( i-n-1>=0 && i%n!=0 && dataBoard[i-n-1]==-1) val++;
				if( i-n+1 >=0 && i%n != (n-1) && dataBoard[i-n+1]==-1) val++;
				if(i-n >=0 && dataBoard[i-n]==-1) val++; 
				dataBoard[i] = val;
			}
		}
		this.dataBoard= dataBoard;	
	}
	restart(){
		this.generate();
		this.setState({stateBoard : this.initState.slice(), mode: REG ,message : ""})
	}
	handleClick(event, index){
		
		if(this.state.mode == REG){
			let val = this.state.stateBoard[index];
			if(val != 1){
				if(this.dataBoard[index]==-1){
					this.setState((state,props)=>{
					var board = state.stateBoard.slice();
					board[index] = 1;
					return {stateBoard : board, message : "FAIL"};

					});
					setTimeout(()=>{
						this.restart();
					},200);
				}else{
					this.setState((state,props)=>{
					var board = state.stateBoard.slice();
					board[index] =1;
					return {stateBoard : board};
					});
				}
			}
		}
		if(this.state.mode == FLAG){
			let val = this.state.stateBoard[index];
			if(val!=1){
				if(val == 2){
					if(this.setState((state,props)=>{
						var board = state.stateBoard.slice();
						board[index] = 0;
						return {stateBoard :board};
					}));
				}else this.setState((state,props)=>{
					var board = state.stateBoard.slice();
					board[index] =2;
					return {stateBoard : board};
				});

			}
		}
	}
	render(){
		const btnMode = <button onClick={()=>{
			this.setState({mode: 1-this.state.mode});
		}}>{this.state.mode==REG?"FLAG":"REG"}</button>;//
		const arr=[];
		const n= this.N;
		const ar1 = new Array(n);
		
		for(let i=0;i<n;i++){
			var ds= [];
			
			for(let j=i*n;j<(i+1)*n;j++){
				let icon = ''; 
				let x = this.state.stateBoard[j];
				if(x==0) icon='.';
				if(x==1) icon= this.dataBoard[j];
				if(x==2) icon ="F";
				const sq = 
				(<button style= {{fontSize : "20px", width: "60px",height: "60px"}} onClick={ (e)=>this.handleClick(e,j)}>
				{icon}
				</button>);//
				ds.push(sq);
			}
			ar1[i] = <div>{ds}</div>;//
		}
		return (<div>
					<div>{ar1}</div>
					{btnMode};
				</div>//
				);//
				
	}
}