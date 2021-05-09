import React from 'react';
import {setTech} from './actions';
import {useStore,useDispatch} from 'react-redux';

// no la cai gi => la cai props dung vay :// ma cai nay duoc pass tu tren xuong dung vay 
// tuc la soa 
function change(tech){
///	var store = useStore();
//	store.dispatch(setTech(tech));
}
// tai sao can dung dispatch => phat di action -> don gian minh nen lam nhanh di :
// ;a d
// sinh 1 session va trong do no cai authentication => authorization => moi thuc hien ducon
// cung co the bi hack thoi dung vay :
// no chi mo api cho request ma truoc do can thuc hien authorization -> exactly:

// ok just do it:


//nen nho co nhieu cai change duoc dung vay :
// ben canh do neu 1 thang ma minh can get cai su kien vi du neu minh muon add 1 cai callback gan voi
// 1 cai event ma no di lien voi thang kia thi sao??
// co 1 su that la gi /??
// dau tien no xay dung 1 he thong ao hoa nhe dung chinh xac :
// tuc la no ton tai 1 he thong gia lap cay DOM va no xac dinh moi 1 element nay no co cai gi???
// sau do no check su khac nhau cua virtual dom voi cay current real dom => ez to xac dinh duoc 
// can thuc su can render cai gi ???
// dieu nay co the la dung: // sau do tien hanh thuc hien cai cam cac su kien vao de co gi change ko???
// nhu vay thi cu 1 event => kich hoat viec chay de xac dinh sinh lai cay DOM gia => 
// dieu nay ko tot lam dung vay :
// dau tien minh nhan dinh la: voi 1 cay 
// ban chat react la viec tu khuc duoi no xac dinh su change khu tren => set up full lai khuc duoi:
// don gian vi tu khuc tren no change khuc duoi:
// neu ma code ko tot thi qua trinh nay no co nhieu su thay doi ???
// dau tien thuc hien the ny:
// co 1 dieu nhu the nay: neu 1 cai gi do ma minh dinh nghia dang function and this function 
// 1 function return 1 element => thi ban than cai function is 1 component - dunga
// neu build kieu full react thi cung ez dung vay :
// nhan xet : cai kieu code full jsp sevlet -> full serverside ???
// dung vay : -> all things- > send to client -> fully not have much operation in js client side:
// we can see that:
// van de la the nayL 

// neu can dispatch thi ta ko su dung truc tiep store  ma thong qua useDispatch() de get 1 doi tuong dispatch

// sau do co the thuc hien duoc => ez to do dung vay :
// dau tien minh co the xem no la 1 function => chi can nhet 1 action vao la co the dung duoc roi

// tu do ta co cai nay : 
// ban chat cua js coding style kha giong voi functional programming
// dieu nay la dung vay
// vay thi sao ??? minh can xem lai khi nao thi cai nay se change ?
// do la khi nao co 1 cai reducer duoc pass cho store ??? sau do cai gi se xay ra ??
// dau tien minh nen nho 1 dieu the nay:
// viec Render chi xay ra tai 1 diem duy nhat dung chua ???
// dieu nay chinh xac la nhu vay nen luon can thuc hien subscribe cho viec nay :
// tu do minh co cai gi ??

// do la khi thuc hien subscribe render thi khi do moi khi ma reducer duoc thuc hien thi no moi thuc hien cai hang 
// dong da subscribe dung t:
// nhan xet tiep theo: neu ta co cai gi ? , nen nho 1 dieu do la khi state cua ung dung change:???
// van de tiep theo la gi ???

// tiep tuc  van de : neu ma minh sinh ra 1 cai gi do dang nhu la 


export const Buttons = ({techs}) => {
	// no ko co this nen ko su dung dang kia duoc :

	var store= useStore();
	var dispatch =useDispatch();
	var lst= techs.map((tech,ind)=>(
		<button
			key = {'btn-${id}'}
			onClick ={()=>{
				dispatch(setTech(tech));
			}}
		>{tech}</button>
	));//
	return (<div>{lst}</div>);
};// 
// trong 1 cai thang component ma no muon binding props cua no voi 1 thang khac thi sao ???
// no co the truyen duoc ??
// tiep theo neu 1 component ma co dang function component => co the pass props theo danh kia ???
// van duoc do chinh la cai dang minh dang dung :
// dung roi do :
//
// can nhan dinh la sao ???
// ma thang nay no chang edung chua : => can re render lai dung la va 

// tu do co the mang tinh tuy bien cao :

//s
// no can 1 tham so dung vay:
// khi nhan nut 1 cai => can thang nay dispatch

// tao full 1 cai ReactDOM dung no co day du nhung ma nen nho no co su mapping dung vay:
// tuc la no build 1 so anh xa cua no : 
// light object -> cheaper to create ang manage => tiet kiem bo nho dung vay :
// tuc la => not down performance too much???
// khi ta dinh nghia ra 1 element thi sao ???
// dieu do co nghia la no da la 1 object co the 

// hien tai gan nhu chi ccan code competive programming dung ay :
