var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require('socket.io')(server);


//var io = require("socket.io").listen(server);
var fs = require("fs");
server.listen(process.env.PORT || 4000);


console.log("server running");
var arrayUser =[];
var UserTontai =true;
//ket noi
io.sockets.on('connection', function(socket){
    console.log("Co thiet bi dang nhap thanh cong");

 //server nhan --nghe data
socket.on('client-register-server',function(data){

if (arrayUser.indexOf(data)==-1) //kiem tra xem trong mang da ton tai chua -1
 {
 	// push data vao mang
	arrayUser.push(data);
	//socket.on('client-register-server',function(data){
    console.log("Server Nhan : "+ data);
    //chua ton tai push vao
    UserTontai=false;
    //gan gia tri User vao socket
    socket.un= data;
    //gui danh sach cho tat ca cac may
    io.sockets.emit('Server-send-registerAll', {danhsach : arrayUser})


}else
{
	console.log("User Da ton tai: "+ data);
	//da ton tai
	UserTontai=true;

}

// gui du lieu ve app android
socket.emit('server-send-register',{ketqua : UserTontai});



   });

socket.on('Client-send-Chat',function(noidungChat){

    console.log(socket.un+" : "+  noidungChat);

    io.sockets.emit('Sever-send-noidungChat', {NdungChat: socket.un+" : "+ noidungChat});
});


 });
    
    