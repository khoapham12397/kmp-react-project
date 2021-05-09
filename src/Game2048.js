import React from 'react';

export class Game2048 extends React.Component{
	constructor(props){
		super(props);
		this.N = 4;
		var size = this.N*this.N;
		var initBoard = new Array(this.N);
		for(let i=0;i<this.N;i++) 
			initBoard[i] =  new Array(this.N).fill(0);
		
		let ind = Math.floor(Math.random()*1000)% size;
		let r = parseInt(ind/this.N), c= ind%this.N;

		initBoard[r][c] = 2;
		this.initBoard = initBoard.slice();
		this.state = {
			stateBoard : Array.from(initBoard)
		}

	}
	
	componentDidMount(){
		document.addEventListener("keydown", (event)=>{
			switch(event.keyCode){
				case 37:
					this.leftMove();
					break;
				case 39:
					this.rightMove();
					break;
				case 38:
					this.upMove();
					break;
				case 40:
					this.downMove();
					break;
				}
		});
	}
	// co the nhan ra duoc cai nay do la gi ??

	genNewElement(board){
		var ds = new Array()  , n = this.N;
		for(let i=0;i<n;i++) for(let j=0;j<n;j++) if(board[i][j] == 0) ds.push(n*i+j);
		
		let pos = ds[Math.floor(Math.random()*1000)%ds.length]; 
		let x= parseInt(pos/n), y= pos%n;
		board[x][y] =2;
		return true;
		
	}
	compareBoard(a,b){
		const n= this.N;
		for(let i=0;i<n;i++) for(let j=0;j<n;j++) if(a[i][j]!=b[i][j]) return false;
		return true;
	}
	rightMove(){
		const n= this.N; 
		var board = new Array(n);
		for(let i=0;i<n;i++) board[i] =new Array(n).fill(0);
		for(let i=0;i<n;i++) for(let j=0;j<n;j++) board[i][j] =this.state.stateBoard[i][j];
		for(let r = 0; r < n ; r++){
			let st=n;
			for(let i=n-2;i>=0;i--){
				let x = i+1,val = board[r][i]; 
				if(val == 0 ) continue;
				while(x<n && board[r][x]==0) {
					board[r][x] = val; 
					board[r][x-1] = 0;
					x++;
				}
				if(x<n && board[r][x] == val && st > x) {
					board[r][x]=val+val;
					board[r][x-1] =0; 
					st = x;
				} 
			}
		}
		let u = 0;
		for(let i=0;i<n;i++) for(let j=0;j<n && u==0 ;j++) {
			if(board[i][j]==0) {u=1;break;}
		}
		if(u==0) {alert("Game over ");this.setState({stateBoard : this.initBoard});return;}
		if(!this.compareBoard(this.state.stateBoard, board)){	

			if(!this.genNewElement(board)) return;
			this.setState({stateBoard : board});
		}
		
	}
	leftMove(){
		const n= this.N; 
		var board = new Array(n);
		for(let i=0;i<n;i++) board[i] =new Array(n).fill(0);
		for(let i=0;i<n;i++) for(let j=0;j<n;j++) board[i][j] =this.state.stateBoard[i][j];
		for(let r=0;r<n;r++){
			let st = -1;
			for(let i = 1; i<n;i++){
				let x= i-1,val = board[r][i];
				if(val==0) continue;
				while(x>=0 && board[r][x] == 0){
					board[r][x] =val;
					board[r][x+1] =0;
					x--;
				}
				if(x>=0 && board[r][x] == val && st<x){
					board[r][x] = val+val;
					board[r][x+1] =0; 
					st=x;
				}				
			}
		}
		let u = 0;
		for(let i=0;i<n;i++) for(let j=0;j<n && u==0 ;j++) {
			if(board[i][j]==0) {u=1;break;}
		}
		if(u==0) {alert("Game over ");this.setState({stateBoard : this.initBoard});return;}
		if(this.compareBoard(board,this.state.stateBoard)) return;
		if(!this.genNewElement(board)) return;

		this.setState({stateBoard : board});
	}
	upMove(){
		const n= this.N; 
		var board = new Array(n);
		for(let i=0;i<n;i++) board[i] =new Array(n).fill(0);

		for(let i=0;i<n;i++) for(let j=0;j<n;j++) board[i][j] = this.state.stateBoard[i][j];
		for(let c = 0; c < n; c++){
			let st = -1;
			for(let i=1;i<n;i++){
				let val = board[i][c], x = i-1; 
				if(val==0) continue;
				while(x>=0 && board[x][c]==0){
					board[x][c] =val;
					board[x+1][c] =0;
					x--;
				}
				if(x>=0 && board[x][c] == val && st< x){
					board[x][c] = val+val;		
					board[x+1][c] = 0;
					st=x;	
				}
			}
		}
		let u = 0;
		for(let i=0;i<n;i++) for(let j=0;j<n && u==0 ;j++) {
			if(board[i][j]==0) {u=1;break;}
		}
		if(u==0) {alert("Game over ");this.setState({stateBoard : this.initBoard});return;}
		if(this.compareBoard(board,this.state.stateBoard)) return;
		if(!this.genNewElement(board)) return;
		this.setState({stateBoard : board});
		
	}
	downMove(){
		const n= this.N; 
		var board = new Array(n);
		for(let i=0;i<n;i++) board[i] =new Array(n).fill(0);
		for(let i=0;i<n;i++) for(let j=0;j<n;j++) board[i][j] =this.state.stateBoard[i][j];
		for(let c=0;c<n;c++){
			let st = n;
			for(let i=n-2;i>=0;i--){
				let val = board[i][c], x = i+1;
				if(val == 0) continue;
				
				while(x<n && board[x][c] == 0){
					board[x][c] =val ; 
					board[x-1][c] =0; 
					x++;
				}
				if(x<n && board[x][c] == val && st > x){
					board[x][c] =val+val; 
					board[x-1][c] =0; st=x; 
				}
			}
		}
		let u = 0;
		for(let i=0;i<n;i++) for(let j=0;j<n && u==0 ;j++) {
			if(board[i][j]==0) {u=1;break;}
		}
		if(u==0) {alert("Game over "); this.setState({stateBoard : this.initBoard});return;}
		if(this.compareBoard(board,this.state.stateBoard)) return;
		if(!this.genNewElement(board)) return;
		this.setState({stateBoard : board});
		
	}

	render(){
		const n =this.N;
		const arr = new Array(n);
		for(let i=0;i<n;i++){
			var ds = [];
			for(let j=0;j<n;j++){
				let val = this.state.stateBoard[i][j];
				let dis = val!=0?val:'.';
				const sq =(<button style={{width: "50px", fontWeight :"bold"
					,height: "50px", fontSize : "25px", color : '#990000', textAlign :"center",
					backgroundColor: "#FFFFCC", borderStyle :"ridge"}}>
					{dis}
				</button>);//
				ds.push(sq);
			}
			arr[i] =(<div>{ds}</div>);//
		}
		return (<div>
				{arr}
				</div>);//
	}
}