import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {setCategory,addCategory,addToCart,incCart} from './actions';
// cai thu 2 la Provider dung vay L
// khong the use duoc cung ko co cai kia
// nhung cai nay lieu co nen 
// dau tien minh nen thuc hien the nay:
// do la gi ??? qua trinh nay mapping cac dang thuc kia lai :
// vi du trong nay no co 1 cai gi do ???
// sau do minh se pass va du
// trong cai Action se co them 1 dang do :
// vi du thi don gian : => vao trong reducer => tang them 1 th la okm
// la 1 function dung chua dung vay: 
// tuc la sao ???
// ban chat thang nay la 1 cai object don gian thoi dung vay do ma just do it and something else:
// co the lam vay cung duoc do ma 
// no la cai nay dung no se tac dong lam change global state:
// tu do se rander laiL
// mapStateToprop no la 1 functuon ma cai nay nhan cai gi?>
// don gian no chi can 1 cai do la gi ???
// 1 cai dieu don gian neu ma thang nay no thuc hien chuc c???
// dieu nay cung co the duoc do am:
// he thong nay no co nhieu lam dung chua ???
// no co rat nhieu hop chat co the duoc sinh ra dung chua ??/
// vi du 1 nguoi co the add friend trung binh bao nhie ???
// ro rang minh nhan thay duoc co rat nhieu record co the duoc sinh ra ???
// va no nen duoc bien doi the nao ???
// vi du trong 1 doan hoi thoai thi sao???
// minh nen xem xet trong 1 group chat ban than no co the la gi ???
// nen duoc tao ra theo dang socket io dung chua ???
// dung vay, xem phien ban web cua no minh thay dieu gi???
// do la viec 1 thang nay -> add them nhieu thang khac:

// vi du thuc hien the nay: 

// dau tien ve co ban la ko phai ma ko the solve duoc ma don gian chi la vay thoi dung chua ???

const mapDispatchToProps = (dispatch) =>{
	return {
		setCategory : (category) => dispatch(setCategory(category)),
		addCategory : (category) => dispatch(addCategory(category)),
		addToCart : (prod) => dispatch(addToCart(prod)),
		incCart : (index,number) => dispatch(incCart(index,number))

	};
}
const mapsStateToProps = (state) =>{
	return {categories : state.categories, cart: state.cart};
}
// can xay dung 1 moi lien he giua 2 thang kia ??
// la gi ???
// ca 1 cai doi tuong la cart dung chua ??
// dau tien minh can hieu cai gi /??
// no thuc hien ho tro cho minh thuc su la nhieu vi sao/??
// dau tien ton tai moi quan he mapping data cua 2 thang thang nay change -> lam cho thang kia change ???
// tu do co nhieu cai co the change dung va:
// minh nen sinh ra 1 cai gia dinh la cai gi ???
// dau tien minh can xac dinh la cart thuoc ve store do store quan ly nen la component muon tac dong
// thi nen thong qua 1 cai khac de den duoc no???
// vi du minh co cai gi ???
// dau tien nen nhan dinh la gi???
//
class SearchApp extends React.Component{
	constructor(props){
		super(props);
		alert("constructing SearchApp");
		this.input = React.createRef();
		this.cartView = React.createRef();
		this.page = 0; this.loadding =false;
		this.state = {
			title : '' , products: [],showCart: "none"
		}
		var self = this;
		window.addEventListener("scroll",()=>{
			//alert("da vao day");
			var totalHeight = document.body.scrollHeight;
			if((window.innerHeight + window.scrollY) >= parseFloat(4*document.body.scrollHeight/5)){
				self.addData();
			}	
		})
	}
	
	addData(){
		//alert("da vao day");
		// nhan xet 1 cai ma muon change thi bat buoc the nao???
		// do la cai gi??
		// dau ien :

		var cate= this.state.title;
		//alert(cate);
		if(this.loadding) return;
		this.page++;
	//	if(this.page>10) return;
		this.loadding =true;
		var url = "https://tiki.vn/api/v2/products?limit=48&q=" + cate + "&page=" + this.page.toString();
		fetch(url)
		.then(res => res.json())
		.then(result => {
			var data= result.data;
		//	alert('get data success');
			this.setState((state, props)=>{
				var ps =state.products.concat(data);
				return {products: ps, showCart : state.showCart, title : state.title};
			});
		},error=>{
			this.loadding=false;
			alert(error.message.toString());
		});
	}
	getData(cate){
		//alert("find "+cate);
		// tai sao lai bi nhu vay ???
		// dieu nay kho hieu ???

		var url = "https://tiki.vn/api/v2/products?limit=48&q=" + cate + "&page=1";
		fetch(url)
		.then(res => res.json())
		.then(result=>{
			var data= result.data;
			this.page=1;
		//	alert("prod 0 : "+ data[0].name);
			this.setState((state,props)=>{
				//var ps= state.products.concat(data);
				return {title: cate, products : data};
			});
		},error=>{
			alert(error.message.toString());
		})
	}	
	// quan trong la gi???
	addCate(){
		// neu tai day minh getdata thi sao ???
		var cate = this.input.current.value;
		this.getData(cate); // tai day -> no change cai state cua no la cai state rieng dung :
	
		this.props.addCategory(cate);
		this.input.current.value="";
		this.input.current.focus();
	}	
	render(){
		const lst = this.props.categories.map(cate =>(
		<li>
			<button onClick={()=>{
				//alert("cate = "+cate);
				this.getData(cate);
				this.props.setCategory(cate);
				
				}

			}>{cate}</button>//
		</li>
		));//
		
		const total = this.props.cart.total;
		const cartItems = this.props.cart.items.map((item,ind)=>(
				<tr> 
					<td>{item.name}</td>
					<td>{item.price}</td>
					<td><button onClick={()=> this.props.incCart(ind, -1)}> - </button></td>
					<td>{item.quantity}</td>
					<td><button onClick={()=> this.props.incCart(ind, 1)}> + </button></td>
					<td>{parseInt(item.quantity) * parseInt(item.price)}</td>
				</tr>
			));
		// gia su co 1 element no thay doi theo 1 so thu: vi du:  
		const products= this.state.products.map((prod,ind) =>{
		
			return (<li> <span> {prod.name} </span>
			<input type="text/" value= {prod.price} 
			onChange={
				(e)=> {
					
					var x=0;
					try{
						x=parseInt(e.target.value);
					}catch(err){return;}
					if(isNaN(x)) x=0;
					this.state.products[ind].price = x;
					this.setState({products : this.state.products});
				}
			}/>
				<button onClick= {

					()=> {
						//alert("add "+ prod.name +" to cart");
						this.props.addToCart({id : prod.id,name: prod.name,price: prod.price,thumbnail_url: prod.thumbnail_url});
					}
				}>+</button> 
				<input type="text" value="khoa pham"/>
			</li>);}
			);//
		this.loadding =false;
		//alert("render lai");
		return (

			<div style={{color: "white"}}>
			<Link to={{pathname :'/rsearch',obj : {id : 12}}}>Rsearch</Link>
				<button onClick={()=>{
					var val;
					if(this.state.showCart=='none') val='block';
					else val ='none'; 
					this.setState({showCart : val});
					//this.cartView.current.style={display : val};
			

				}}>Cart</button>
				<div >
					<input type="text" ref ={this.input}/>
					<button onClick={this.addCate.bind(this)}>Add</button>
				</div>//
				<div ref={this.cartView} style={{display: this.state.showCart}}>
					<table style={{border: "1px solid"}}>{cartItems}</table>
					<div>Total: {total} vnd</div>
				</div>
				<ul>{lst}</ul>
				<ul>{products}</ul>
				
			</div>
		);

	}
	// nen nho trong function component thi no khong ton tai cai this ??
	// 
	// nen cache data lai moi khi ma thuc hien dung chua???
	// dung la vay do ma just do it and something else:

	//
}
// all code la xu ly phia client het
// may nho cai nay ne : dau tien nen minh gan 1 cai param vao thi sao 
export const SearchComponent = connect(mapsStateToProps, mapDispatchToProps)(SearchApp);
// khi truy nhap lan dau 1 la data ve id cua cac cuoc message group va p2p duoc log lai trong cookie 
// hoac trong local data cua app nen no hien thi nhanh 
// sau do no se duoc danh ajax ve cho server de get them cac data neu can ???
// voi 1 action -> change record tren DB nay thi sao ??
// nen nho cu moi 1 cai message thi no cung co cai thu tu cua no ngay tren trong chat box ??
// de no biet duong ma hien thi ???
// vi du chung ta luon get theo order la sau cung -> dau tien dung vay :
// vi du minh co the nay ???
// dau tien nen luu trong DB thuong la dang gi ???
// cai nay nen la no SQL dung ko vi tinh cau truc cua no khong cao ???
// co the luu dang tho duoc ???
// luu the nay se ok hon dung vay :
// sau do neu set up theo dang game thi co ban???
// la co su tuong tac cua cac thanh pha ???
// ten mien giong nhu 1 cai cua de di vao 1 ngoi nha ??
// co the di bang nhieu cua de den duoc no:
// dieu nay thi dung la vay:

// bat all request sau do no co the dua ve day dung chua ??
// dau tien thuc hien theo cach nay hay cach khac??

// ban than php co ban la ko set up theo model MVC dung vay:
// sau do trong cai he thong nay no co the set up 1 tap cac dang thuc de the hien cho viec gan tim???
// no cung chi la cac button ,  sau do co the duoc  => dung vay:
// vi du the nay: dau tien trong react no xac dinh ro rang la cai nao co su thay doi that su ???
// tuc la no chi render lai 1 cach cuc bo thoi dung chua ???
// dung la vay nhe: , tiep theo neu trong cac phan mem game console thi render -> all ???

// nen nho 1 dieu la so luong text duoc luu tren server co the rat lon ???
// set of Text cua 1 user voi 1 
// dau tien : 


// dau tien nen lam 1 so cai gi do them ko ??

// tuc la dau tien minh can lam theo dieu gi ???
// do chinh la viec thuc hien theo cai gi ???
// vi du xem the nay:
// ta co van de nay:

// no di theo kieu nguoc 
// chi la noi nho mai dung sau cuoc tinh da lo chi la con mo cuon theo ca mot troi thuong nho chi la noi
// dau thon thuc chi la nhoi them mot chut chi la nuoc mat cu rung rung :

// tim ve ky uc co xoa di doan tinh ban so roi lai cho vo dung giua noi dai lo tan vo