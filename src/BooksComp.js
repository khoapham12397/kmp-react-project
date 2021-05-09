import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
class BooksCmp extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			cate : '8', books : []
		}
	}
	// thuc hien 1 cai vi du don gian la:
	// nhet chung data duoc dung vay :	
	getData(){
	
		const url = '/Review2/getBooks.php';
		const postBody ={
			cate : 8,
		} 
		const requestMetaData = {
			method : 'POST', headers : {'Content-Type' : 'application/json'}, body: JSON.stringify({cate: '9'})
		}
		fetch(url,requestMetaData)
		.then(res=> {
			// cai nay khong dung dabg d
			//alert();
			return res.json();
		})
		.then(result => {
			this.setState({books : result});
		},error=>{
			// van de da ro roi :
			alert(error.message.toString());
		})
	}
	componentDidMount(){
		this.getData();
	}
	render(){
		const lst = this.state.books.map((book,index)=>(
				<li>
					{book.name} {book.price}
				</li>
			));//
		return (<div><ul>{lst}</ul></div>);//
	}
}
export default BooksCmp; 

// dua vao store  dung vay: