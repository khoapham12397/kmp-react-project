var s = "hello every one";
var regex = /\s/g;
var res = s.match(regex);
console.log(res);
var s1 = "this is otp code : 890123";
var pattern = /[0-9]{6}/g;
var s2= "VoLamTruyenKy";
var patt = /[A-Z]([a-z]*)/g;
console.log(s1.match(pattern));

console.log(s2.match(patt).join(' '));
//o ban thi no la vy :
// >=2 dung vay :
// co ban la vay do :
// dieu nay don gian dung vya :
// don gian qua ma:
// no chinh la phu dinh dung vay :
// ve co ban no la dang string not number dung vay do ma just do it and something else:
// sau do la cai gi ??
// dung vay do ma just do it and something else:
// co 1 tap hop dung roi do :
var patEmail = /^[a-z]{2,50}([1-9]*)([0-9]*)@vng.com.vn$/g;
email = "kp@vng.com.vn";
console.log(email.match(patEmail)); 
var pattVisaCard = /5[1-5][0-9]{14}/g;
var card = "5101234567891234";
console.log(card.match(pattVisaCard));
var pat1 = /^(?:32)[4\s7][0-9]{3}$/g;
var x = "32 123";
console.log(x.match(pat1));
// dieu nay dung la rat tuyet voi dung vay :

// tu do minh se co duoc nung caii do:

/*

American Express :- Starting with 34 or 37, length 15 digits.
Visa :- Starting with 4, length 13 or 16 digits.
MasterCard :- Starting with 51 through 55, length 16 digits.
Discover :- Starting with 6011, length 16 digits or starting with 5, length 15 digits.
Diners Club :- Starting with 300 through 305, 36, or 38, length 14 digits.
JCB :- Starting with 2131 or 1800, length 15 digits or starting with 35, length 16 digits.


*/


// dau tien minh can build 1 docker file cai da dung vay :

// tu do co the mang theo duoc dung chua ???

// dung vay can xac dinh no la cai gi ??
