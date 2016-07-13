if(!('getContext' in document.createElement('canvas'))){
    alert('Sorry, it looks like your browser does not support canvas!');
}

var canvas = $("#drawing-canvas");
canvas.attr('width',canvas.width());
var canvasCtx = canvas[0].getContext('2d');

var id = Math.round($.now()*Math.random());
var drawing = false;
var clients = {};
var cursors = {};

socket.on("drawing-moving", function(data){
    if(!(data.id in clients)){
        console.log("New user connected!");
    }

    if(data.drawing && clients[data.id]){
        drawLine(clients[data.id].x, clients[data.id].y, data.x, data.y);
    }

    // Saving the current client state
    clients[data.id] = data;
    clients[data.id].updated = $.now();
});

var prev = {};

canvas.on("mousedown", function(e){
    e.preventDefault();

    var parentOffset = $(this).offset();
    var x = e.pageX - parentOffset.left;
    var y = e.pageY - parentOffset.top;

    drawing = true;
    prev.x = x;
    prev.y = y;
});

$(document).on("mouseup mouseleave", function(){
    drawing=false;
});

var lastEmit=$.now();

canvas.on("mousemove", function(e){
    var parentOffset = $(this).offset();
    var x = e.pageX - parentOffset.left;
    var y = e.pageY - parentOffset.top;

    if($.now() - lastEmit > 30){
        socket.emit("drawing-mousemoving", {
            x,
            y,
            drawing,
            id
        });
    }

    if(drawing){
        drawLine(prev.x,prev.y,x,y);
        prev.x = x;
        prev.y = y;
    }
});


function drawLine(fromx, fromy, tox, toy){
    console.log(tox, tox);
    canvasCtx.moveTo(fromx, fromy);
    canvasCtx.lineTo(tox, toy);
    canvasCtx.stroke();
};