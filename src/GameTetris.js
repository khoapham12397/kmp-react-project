import React from 'react';
import './styleTetris.css';


const SQ_TILE = 0;
const LINE_TILE = 1;
const Z_TILE= 2;
const L_TILE =3;

const BLUE =1;
export class GameTetris extends React.Component{
	
	constructor(props){
		super(props);
		this.classNames = ["backgroundTile","blueTile","yellowTile","redTile"];
		this.N = 20; this.M= 12;
		this.S = 5;
		this.tiles = new Array(5);
		var initState= new Array(this.N);
		for(let i=0;i<this.N;i++) initState[i] = new Array(this.M).fill(0);
		this.buildTile();
		this.curR= -2; this.curC = parseInt(this.M/2);
		this.type= 1;
		this.direct = 0; this.step =1;
		this.timeUpdate = 200;
		this.score = 0;
		this.pressDown = 0;
		this.color = 1;
		this.doRender =0;
		this.keysPressed = new Map();
		for(let i=37;i<41;i++) this.keysPressed.set(i,false);
		this.keysPressed.set(32,false);
		this.state = {
			stateBoard: initState
		}

	}
	buildTile(){
		var x = [[0,0,0],[1,1,0],[1,1,0]];
		this.tiles[0]=[[[0,0,0],[1,1,0],[1,1,0]]];
	
		this.tiles[1]= [[[0,0,0],[0,0,0],[1,1,1]], [[0,1,0],[0,1,0],[0,1,0]]];
		this.tiles[2]= [[[1,0,0],[1,1,0],[0,1,0]] ,[[0,0,0],[0,1,1],[1,1,0]] , [[0,0,1],[0,1,1],[0,1,0]], [[0,0,0],[1,1,0],[0,1,1]] ];
		this.tiles[3]=[
		[[0,0,1],[0,0,1],[0,1,1]], [[0,0,0],[1,0,0],[1,1,1]] , [[1,1,0],[1,0,0],[1,0,0]],[[0,0,0],[1,1,1],[0,0,1]]
		,[[1,0,0],[1,0,0],[1,1,0]],[[0,0,0],[1,1,1],[1,0,0]],[[0,1,1],[0,0,1],[0,0,1]],[[0,0,0],[0,0,1],[1,1,1]]
		];
		this.tiles[4] =[ [[0,0,0],[0,1,0],[1,1,1]],[[0,1,0],[0,1,1],[0,1,0]],[[0,0,0],[1,1,1],[0,1,0]],[[0,1,0],[1,1,0],[0,1,0]]];

		this.scores = [20];
	}

	checkCut(){
		var stboard= this.state.stateBoard,ds = new Array(this.N);
		let sl = 0;
		for(let i=this.N-1;i>=0;i--){
			let ok= 1;
			for(let j=0;j<this.M;j++) if(stboard[i][j] == 0) {ok = 0; break;}
			ds[i] = ok; 
			sl+= ok;
		}

		if(sl==0) return;
		var board = [];
		for(let i=0;i<sl;i++){
			board.push(new Array(this.M).fill(0));
		}
		for(let i=0;i<this.N;i++){
			if(ds[i]==0) board.push(stboard[i].slice());
		}
		this.setState({stateBoard: board});
	}
	check(r,c , type, direct ,pr,pc, ptype, pdirect){
		var stboard= this.state.stateBoard;
		var board = new Array(this.N);
		for(let i=0;i<this.N;i++) board[i] = new Array(this.M).fill(0);
		for(let i=0;i<this.N;i++) for(let j=0;j<this.M;j++) board[i][j] = stboard[i][j];
		
		try{
 			for(let i=0;i<3;i++) for(let j=0;j<3;j++) {
				if(this.tiles[ptype][pdirect][i][j]==1) {
					let x= i+pr-1, y =j+pc-1;
					if(x>=0 && x<this.N && y>=0 && y < this.M) board[x][y] = 0;
				}
			}	
		}catch(err){

			alert("type = "+ ptype.toString() + " direct = "+ pdirect.toString());
		}
		var rCor = r-1, cCor= c-1;
		var bl= cCor, br = cCor+2;
		if(type==0) br--;
		if(type==1 && direct==1) {bl++;br--;}
		if(type==2){
			if(direct==0) br--;
			if(direct==2) bl++;
		}  
		if(type==3) {
			if(direct==0 || direct== 6) bl++;
			if(direct==2 || direct == 4) br--;
		}
		if(type==4){
			if(direct == 1) bl++;
			if(direct == 3) br--;
		}
		if(rCor+2 >= this.N  || bl <0 || br >=this.M) return false;
		for(let i=0;i<3;i++) for(let j=0;j<3;j++) {
			let u= i+ rCor, v= j+cCor;
			if(u>= this.N || v< 0 || v>=this.M || u<0) continue;
			if(board[u][v]!= 0 &&  this.tiles[type][direct][i][j]==1) return false;
		}
		return true;
	}
	restart(){
		var board= new Array(this.N);
		for(let i=0;i<this.N;i++) board[i] =new Array(this.M).fill(0);
		this.type= Math.floor(Math.random()*1000)%this.S;
		this.direct = Math.floor(Math.random()*1000)% this.tiles[this.type].length;
		this.score=0;
		this.curC = 4; this.curR = -1; this.timeUpdate =200;
		this.color = 1 + Math.floor(Math.random()*100)%3;
		this.setState({stateBoard: board});
		setTimeout(()=>this.moveDown(),200);
	}
	moveDown(){

		var type= this.type, direct= this.direct , r= this.curR, c =this.curC;
		var step = this.step;
		if(this.check(r+step, c, this.type, this.direct,r,c,this.type,this.direct)){
			var board= new Array(this.N);
			var stboard = this.state.stateBoard;
			for(let i=0;i<this.N;i++) board[i]= new Array(this.M).fill(0);
			for(let i=0;i<this.N;i++) for(let j=0;j<this.M;j++) board[i][j] = stboard[i][j];
		
			for(let i=0;i<3;i++)for(let j=0;j<3;j++) {
				if(this.tiles[type][direct][i][j] == 1){
					let u= i+r-1, v=c-1+j;
					if(u<0 || u>=this.N || v<0 || v>=this.M) continue;
					board[i+r-1][c-1+j] = 0; 
				}
			}
			for(let i=0;i<3;i++) for(let j=0;j<3;j++){
				if(this.tiles[type][direct][i][j] == 1){
					let xcur = r + step -1+ i, ycur = c-1+j;
					if(xcur < 0 || xcur >= this.N || ycur < 0 || ycur>=this.M) continue;
					board[xcur][ycur] = this.color;
				}
			}
			let ind,ok= true;
			this.setState({stateBoard: board});
			this.curR = r + step;
			setTimeout(()=>this.moveDown(), this.timeUpdate);
		}else{
			if(this.curR<2) {
				alert("Game Over");
				this.restart();
			}else{
			this.checkCut();
			this.type= Math.floor(Math.random()*1000)%this.S;
			this.direct = Math.floor(Math.random()*1000)% this.tiles[this.type].length;
			this.curC = 4; this.curR = -1; 
			this.color = 1 + Math.floor(Math.random()*100)%3;
			
			setTimeout(()=>this.moveDown(),200);
			}
		}

	}
	move(r,c,pr,pc,type,direct,ptype,pdirect){

		var board = this.state.stateBoard.slice();
		for(let i=0;i<3;i++){
			for(let j=0;j<3;j++){
				if(this.tiles[ptype][pdirect][i][j] ==1 ) {
				 	let u= i+pr-1, v= j+pc-1;
				 	if(u<0 || u>=this.N || v<0 || v>=this.M) continue;
				 	board[u][v] = 0; 
				}
			}
		}
		for(let i=0;i<3;i++) for(let j=0;j<3;j++) if(this.tiles[type][direct][i][j]==1){
			let u= i+r-1, v= j+c-1;
			if(u<0 || u>=this.N || v<0 || v>=this.M) continue;
			board[i+r-1][j+c-1] = this.color;
		}
		this.setState({stateBoard : board});
		
	}
	
	componentDidMount(){
		document.addEventListener("keyup",(e)=>{
			let x= e.keyCode;
			if(x==40) {this.timeUpdate = 200;}
			if(x==32) this.keysPressed[32] =false;
			if(x>=37 && x< 41) this.keysPressed[x] = false;
		});
		document.addEventListener("keydown",(e)=>{
			let code= e.keyCode;
			if((code >=37 && code < 41) || code==32) this.keysPressed[code] = true;
			let nr = this.curR, nc= this.curC, ndir = this.direct;
			if(this.keysPressed[37]) nc--;
			if(this.keysPressed[40]) this.timeUpdate = 50;
			if(this.keysPressed[39]) nc++;

			if(this.keysPressed[32]) {
				let dr;
				if(this.type==1) dr = (this.direct+1)%2;
				else if(this.type==4) dr = (this.direct+1)%4;
				else if(this.type==0) dr=this.direct;
				else{
					let ck = (1<<(this.type-1));
					let x = (this.direct >= ck)?ck:0;
					dr = x + (this.direct +1)%ck;
				}
				
				ndir= dr;
			}
			if(this.check(nr,nc,this.type, ndir,this.curR,this.curC,this.type,this.direct)){
				this.move(nr,nc,this.curR,this.curC,this.type,ndir, this.type, this.direct);
				this.curR= nr; this.curC= nc;this.direct =ndir;
			}
			

		});
		setTimeout(()=>this.moveDown(),this.timeUpdate);
	}
	
	render(){
		this.doRender++;
		const n= this.N, m= this.M;
		const arr = new Array(n);
		for(let i=0;i<n;i++){
			const ds = [];
			for(let j=0;j<m;j++) {
				let sq = <div className= {this.classNames[this.state.stateBoard[i][j]]}></div>;//
				
				ds.push(sq);
			}
		

			arr[i] = (<div>{ds}<div style={{clear: 'left'}}></div></div>);//
		}
		return (<div style={{marginLeft : "300px", marginTop: "100px"}}>
			<div>{arr}</div>
			<div>Press Down: {this.pressDown}</div>
			<div>So lan render: {this.doRender}</div>
			</div>);//
	}
}