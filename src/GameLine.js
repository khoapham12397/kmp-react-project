import React from 'react';
import './LineStyle.css';

export class GameLine extends React.Component{
	constructor(props){
		super(props);
		this.N = 9; 
		this.C =5;
		var size = this.N*this.N,n=this.N; this.size = size;
		var board =new Array(size).fill(0);
		var act= new Array(size).fill(0);
		this.dir = [-n,-n-1,-1,n-1, n,n+1,1,-n+1];
		this.next = [];
		this.curPath = [];
		this.acting = 1;
		this.doRender = 0;
		this.dotCut = [-1,-1];
		this.init(board);
		this.classNames = ["grayBall","redBall","yellowBall","blueBall","greenBall","purpleBall",
			"redSmallBall","yellowSmallBall","blueSmallBall","greenSmallBall","purpleSmallBall"];

		this.state= {
			stateBoard : board, actBoard : act
		}
	}
	init(board){
		const n =this.N; const size= n*n;
		var ds=new Array(size);for(let i=0;i<size;i++) ds[i] = i;
		for(let i=0;i<3;i++) {
			let x = Math.floor(Math.random()*1000)%ds.length;
			let color = Math.floor(Math.random()*100)%this.C + 1;
			board[ds[x]] = color; 
			ds.splice(x,1);
		}
		this.generate(board);
	}
	checkCut(board , index){
		const n= this.N; const size = this.size;
		let ok =0;
		var dk = this.dir, f=new Array(8).fill(1);
		for(let i=0;i<8;i++){
			let x= index;
			while(1){
				if(x%n == 0 && (i==1|| i==3) ) break;
				if(x%n == (n-1) && (i==5 || i==7)) break;
				let y= x+dk[i];
				if(y<0 || y>=size ) break;
				if(board[y]!= board[x]) break;
				f[i]++; x = y;
			}
		}
		for(let i=0;i<4;i++){
			let val = f[i] + f[i+4]-1;
			if(val>=5){
				ok=1;
				let x= index;  board[x] = 0;
				for(let j=1;j<f[i];j++) {
					let y= x+ dk[i]; board[y] =0;
					x=y;  
				}
				x= index;
				for(let j=1;j<f[i+4];j++){
					let y=x + dk[i+4]; board[y] = 0;
					x=y;
				}
			}
		}
		return ok;
	}

	generate(board){
		var ds=[],arr=[];
		const n= this.N;
		const  size = this.size; 
		for(let i=0;i<size;i++) if(board[i]==0) ds.push(i);

		if(ds.length < 3) {
			alert("Game over");
			return;
		}

		for(let i=0;i<3;i++){
			let x= Math.floor(Math.random()*1000)%ds.length;
			let pos = ds[x];
			let color = Math.floor(Math.random()*10)%this.C +1;
			board[pos] = color + this.C; 
			arr.push([pos,color+this.C]);
			ds.splice(x,1);
		}
		this.next = arr.slice();
	}

	bfs(ter){
		const n= this.N;
		var par = new Array(n*n).fill(-1),size = n*n,s= this.source;
		var dk = [-1,1,-n,n], board =this.state.stateBoard;
		par[s] = s;
		var q = [s];
		while(q.length >0){
			let  u = q.shift();
			for(let i=0;i<4;i++){
				if(dk[i]==-1 && u%n==0) continue;
				if(dk[i]==1 && u%n == (n-1)) continue;
				let v =u+dk[i];
				if(v == ter){
					var path = [v],x=u;
					while(x!=s){
						path.push(x);
						let y = par[x];
						x=y;
					}
					path.push(s);
					return path;
				}
				if(v>=0 && v< size && par[v]==-1 && (board[v] ==0 || board[v] >this.C) ) {
					par[v] = u; q.push(v);
				} 
			}
			
		}
		return [];
	}
	move(ind){
		if(ind == 0) {
			this.dotCut = [-1,-1];
			var board= this.state.stateBoard.slice(), hasCut= 0;
			if(this.checkCut(board,this.curPath[ind])>0) {
				for(let i=0;i<3;i++){
					let x= this.next[i][0];
					board[x] =this.next[i][1];
				}
				this.setState({stateBoard : board});
				this.curPath= [];
				this.acting =1; 
				return;
			}
			for(let i=0;i<3;i++){
				let x= this.next[i][0];
				board[x]= this.next[i][1] -this.C;
			}
			
			for(let i=0;i<3;i++){
				let x= this.next[i][0];
				this.checkCut(board,x);
			}
			this.generate(board);
			this.setState({stateBoard: board});
			this.curPath = [];
			this.acting=1;
			return;
		}
		var board = this.state.stateBoard.slice();

		let color = board[this.curPath[ind]];
		if(this.dotCut[0]!=-1) board[this.dotCut[0]] =this.dotCut[1];
		else board[this.curPath[ind]] = 0;
		let x= this.curPath[ind-1];
		if(board[x]!=0 ) this.dotCut=[x, board[x]];
		else this.dotCut = [-1,-1];
		board[x] = color;
		this.setState({stateBoard: board});
		setTimeout(()=>this.move(ind-1), 20);
	}

	blink(ind){
	
		if(this.acting == 2){
			var act = this.state.actBoard.slice();
			act[ind] =1-act[ind];
			this.setState({actBoard: act});
			setTimeout(()=>this.blink(ind), 150);
		}else 
		if(this.acting ==1){
			var act = this.state.actBoard.slice();
			act[ind] =0;
			this.setState({actBoard: act});
			return;
		}
	}
	handlerClick(ind){
		if(this.acting == 0){
			var board  =this.state.stateBoard.slice();
			board[ind] =1-board[ind];
			this.setState({stateBoard : board});
			return;
		}
		if(this.acting ==1){
			let val =this.state.stateBoard[ind];
			if(val>=1 && val<=this.C){
				this.source = ind;
				this.acting =2; 
				this.blink(ind);
			}
			return;
		}
		if(this.acting ==2) {

			var board = this.state.stateBoard.slice();
			let val = board[ind];
			if(val >= 1 && val <= this.C) {
				this.acting =1;
				return;
			}
			var path = this.bfs(ind);
			if(path.length == 0) {
			}
			else{
				this.state.actBoard[this.source] = 0;
				this.setState({actBoard: this.state.actBoard});
				if(val != 0){
					const size= this.size;
					var ds = [];
					for(let i=0;i<size;i++) if(board[i]==0) ds.push(i);
					let pos_new= ds[Math.floor(Math.random()*1000)%ds.length];
					for(let j=0;j<3;j++) {
						if(this.next[j][0]==ind) {
							this.next[j]= [pos_new,this.next[j][1]];
							break;
						}
					}
				}
				this.curPath = path;
				this.acting = 3;
				this.move(path.length-1);
			}
		}
	}
	render(){
		this.doRender++;
		var arr= new Array(this.N), n =this.N;
		for(let i=0;i<this.N;i++){
			var ds =[];
			for(let j=0;j<this.N;j++){
				var el;
				let ind = i*n+j;
				if(this.state.stateBoard[ind]!= 0 && this.state.actBoard[ind]==0){
					el = (<button className="square" onClick={()=>this.handlerClick(ind)}>
							<div className = {this.classNames[this.state.stateBoard[ind]]}></div>
					</button>);//
					
				}else el = <button className="square" onClick ={()=> this.handlerClick(ind)}><div className ="grayBall"></div></button>;//
				ds.push(el);
			}
			arr[i] = (<div>{ds}</div>);//
		}
		return (<div style={{textAlign : "center", marginTop: "100px"}}>
			{arr}
			<div><button onClick={()=>{
				if(this.acting == 0){this.acting =1; alert("acting = "+ this.acting); return;}
			//	if(this.acting!=0) {this.acting =0;}
			}}>Press</button></div>
			<div>So lan render: {this.doRender}</div>
			</div>);//
	}

}
