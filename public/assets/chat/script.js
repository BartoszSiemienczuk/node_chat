var socket = io("http://localhost:8080");

socket.on('message', function(data){
    console.log("New message!");
    console.log(data);

    displayMessage(data);
});

socket.on("annoucement", function(data){
    console.log(data);
    window.alert(data);
})

$('#send').click(function(){
    socket.emit("message", getMessage());
    $('#message').val("");
});

var displayMessage = function (message){
    var msgClass="left";
    var avatarClass="pull-left";
    if(message.author === $('#name').val()){
        console.log("Ur msg!");
        avatarClass="pull-right";
        msgClass="right";
    }

    var n = '<li class="'+msgClass+' clearfix">'+
                '<span class="chat-img '+avatarClass+'">'+
                    '<img src="http://bootdey.com/img/Content/user_3.jpg" alt="User Avatar">'+
                '</span>'+
                '<div class="chat-body clearfix">'+
                    '<div class="header">'+
                       ' <strong class="primary-font">'+message.author+'</strong>'+
                        '<small class="pull-right text-muted"><i class="fa fa-clock-o"></i> just now</small>'+
                    '</div>'+
                    '<p>'+
                      message.content +
                   '</p>'+
                '</div>'+
            '</li>';
    $('.chat').append(n);
    $('.chat').animate({scrollTop: $('.chat').prop('scrollHeight')}, 1500);
}

var getMessage = function(){
    message = {};
    message.content = $('#message').val();
    message.author = $('#name').val();
    return message;
}