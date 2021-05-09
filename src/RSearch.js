import React from 'react';
import {addToCart} from './actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
//import './icon.css';
// hien tai minh co the tuong tac theo danh gi ???
// dau tien do chinh la cai gi ???
// co the no bi 1 cai loi ve
// vi du nhan nut cai nay ve co ban tuc la no se duoc add them vao dung cua ??
// gia dinh cai thang nay no sinh ra 1 box dung chua va lam the nao ma thang khac thay duoc no:
// dieu nay khong co gi phuc tap dung chua ???
// dung vay do ma just do it and something else:
// vi du no 1 thuat toan cuc hay the nay :
// neu di theo mang toi uu to hop thi cung duoc do ma dung khogn

// sau do co nhieu van de ma minh can phai xac dinh ro huogn di???
// de-> direction dung vay:

// vay thi neu ma thang khac truy cap ???
// pass to props la duoc dung vayL
// vay thi de co the get duoc no => can pass no tro thanh 1 cai props dungay :
// pass 1cai action vao moi duoc dung vay :// tu do co the la gi ??
// 1 khung text input lon de go vao trong do : vi du neu thuc hien theo cachh nay 

// vi du cho viec tu dong xuong dong thi cung don gian vi sao ???
// vi minh sinh san 1 object co ban la duoc dung vay do :
// sau do thi sao???

// vi du them monh co the lam the nay:
// neu co/
// minh co the biet duoc dung vay : vi du : the nay ay do :
// tu do de dang thuc hien theom:
// khi ma goi lai thi may cai nay mat het vi sao qua don gian moi 1 cai thuc chat no lai gi

// nen nho 1 dieut
// no van bi xoa di thoi nen nho cai nay no khong giong voi thang kia o day la 1 phia trong 1 cai app
// dieu nay can duoc xac dinh cho dung:
// ok just do it and something else:

const mapDispatchToProps = (dispatch) =>{
	return {
		addToCart : (prod) => dispatch(addToCart(prod))
	};
}
const mapStateToProps = (state) =>{
	return {
		cart : state.cart
	}
}
class RSearch extends React.Component{
	constructor(props){
		super(props);
		this.page=0; this.loadding =false; 
		this.init = true;
		//alert("hello "+this.props.location.obj.id);
		if( typeof(this.props.location.obj) != 'undefined') {
	//		alert("hello "+ this.props.location.obj.id);
		}
		this.content = React.createRef();
		this.state={
			products : []
		}
		
		//this.content.addEventListener("scroll" , this.handleScroll.bind(this));
	}
	
	getData(){
		if(this.loadding) return;
		this.page++;
		var url = "https://tiki.vn/api/v2/products?limit=48&q=sach-toan&page=" + this.page.toString();
		this.loadding =true;
		fetch(url)
		.then(res=>res.json())
		.then(result=>{
			var data = result.data;
			this.setState((state,props)=>{
				var ps =data.concat(state.products);
				return {products: ps};
			})
		},error=>{
			this.loadding =false;
		});

	}
	componentDidMount(){
		alert("chuan bi get data");
		this.getData();
		
	}
	// dau tien minh can nhan dinh sau render thi no goi cai ham nay dung vay ???
	// vay tji
	componentDidUpdate(){

//		alert("vao trong nay");
		
		
		//alert(node.scrollTop +" "+ (node.scrollHeight - node.offsetHeight).toString());
		// node. scrollHeight
		
		if(this.loadding){
			var self =this;
			var node= this.content.current;
			var x = node.scrollHeight - node.offsetHeight;

			if(!this.init) node.scrollTop = x/5;
			else {
				this.init= false; node.scrollTop = x;this.content.current.addEventListener("scroll", (event)=>{
				var node= event.target;
				if(node.scrollTop <=10) {
					self.getData();
				}
			//if(node.scrollTop >= 3*node.scrollHeight/6){alert("da toi cuoi");}
			// minh cung deo biet duoc dun chua ???
			// co the la vay: lam do:

			//alert("da scroll");
			//alert(event.target.getBoundingClientRect().bottom);
				});
			}
			this.loadding =false;	
		}

		
	}
	render(){

		var self =this;
		const btnCart = <button onClick={()=>{alert(JSON.stringify(this.props.cart))}} >View Cart</button>;// 
		const items = this.state.products.map((prod,index)=>
		(<li>
			{prod.name}{prod.price}
			<button onClick={()=>{
				alert("Add this product to cart");
				this.props.addToCart({'id':prod.id,'name':prod.name,'price':prod.price});
			}}>+</button>
		</li>
		));//

		
		return (<div style={{backgroundColor: "white"}}>
			<div style={{ overflowY: "scroll",maxHeight : "400px",border : "1px solid"}} ref={this.content}><ul>{items}</ul></div>{btnCart}
			<Link to = {{pathname: '/home'}}>home</Link>
			</div>);//
	}
}
const RSearchComp = connect(mapStateToProps,mapDispatchToProps)(RSearch);
export default RSearchComp;

// hien tai den luc phai hanh dong roi do dung la vay do ma just doit and something else:


// neu co the thuc hien duoc thi cung ok dung vay:
// can nhan xet la no tuong tu 1 cai app android nam hoan toan o phia client dung la vay :
// do do khi ta co cai gi ???
// 1 dieu don gian do la gi 
// creating 1 cai Component dung vay : sau do cai nay duoc render the nao??
// dieu nay minh dang bi gi do??

// dau tien thang nay chi co duy nhat 1 cai root  -> diem nhap cua file index de xac dinh la cho thng nao?
// hien thi len day ??
// saudo thi sao??
