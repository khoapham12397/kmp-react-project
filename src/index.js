import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MyApp from './MyApp';
import RSearchComp from './RSearch';
import BooksCmp from './BooksComp';
import {store} from './store';
import {Provider} from 'react-redux';
import { BrowserRouter as Router, Switch,Route,Link, useParams } from 'react-router-dom';
import {GameBoard} from './GameEx';
import {GameMine} from './GameMine';
import {Game2048} from './Game2048';
import {GameTetris} from './GameTetris';
import {GameLine} from './GameLine';
import {Example} from './Example';
const IDLE = 0;
const WAIT = 1;

const REG = 0;
const FlAG =1;
const render=()=>ReactDOM.render(
<Provider store={store}>
	<Router>
		<div>
			<Route path ={"/home"} component={MyApp}/>
			<Route path ={"/rsearch"} component ={RSearchComp}/>
			<Route path ={"/books"} component ={BooksCmp}/>
			<Route path ={"/gameLatHinh"} component ={GameBoard}/>
			<Route path ={"/gameMine"} component ={GameMine}/>
			<Route path ={"/game2048"} component ={Game2048}/>
			<Route path={"/gameTetris"} component ={GameTetris}/>
			<Route path={"/gameLine"} component ={GameLine}/>
			<Route path ={"/example"} component ={Example}/>
		</div>
	</Router>
</Provider> , document.getElementById("root"));//
// chon chu mau trang dung vay :// nhin cho do nhuc mat :
// 
//store.subscribe(render);
// van co the dunf duoc dung cua ???
// dung vay ma dau nhat thiet la phai subscribe ???
// dunng roi do :
// tiep theoL:

render();

//
/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// khi co Provider roi thi co can subscribe cai render ???
// dieu nay can xac dinh lai:
// co can day chu dung la co the dung vat:
// dau tien thuc hien the nao ???
// dau tien neu 1 component muon co 1 cai gi do trong global state de lam props cho minh

// thi no co the la the nao ??? va khi ma no muon change di cai do thi no cung duoc supplied api to do:
// vi du them la the nao:
