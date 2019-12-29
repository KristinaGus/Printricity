function redirect(page) { 
	document.location.href= page + ".html";
}

function confirmRedirect(url) {
    var ask = window.confirm("You are about to be redirected to a new site. Do you want to proceed?");
    if (ask) {
		if(url === 'justice'){
			window.open('http://www.justice.ie','_blank');
		} else if(url ==='bank'){
			window.open('https://www.centralbank.ie','_blank');
		} else if(url === 'dell'){
			window.open('https://www.dell.com/en-ie');
		}
    }
}


function showOrHide() {
  var x = document.getElementById("navbar");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

window.addEventListener('load', function() {	
	var forms = document.getElementsByClassName('validation');
	var validation = Array.prototype.filter.call(forms, function(form) {
		form.addEventListener('submit', function(event) {
			if (form.checkValidity() === false) {
				event.preventDefault();
				event.stopPropagation();
			} else {
				var subject = document.getElementById("subject").value;
				var message = document.getElementById("message").value;
				window.location.href = "mailto:dummy@example.org?Subject=" + subject + "&body=" + message;
			}
			form.classList.add('was-validated');
		}, false);
	});
}, false);




// Source https://codepen.io/LeonGr/pen/yginI The code has been adjusted to meet client's requirements. 

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext('2d');

canvas.width  = 1400;
canvas.height = 400;

var stars = [], // Array that contains the stars
    FPS = 100, // Frames per second
    x = 60, // Number of stars
    mouse = {
      x: 0,
      y: 0
    };  // mouse location

// Push stars to array

for (var i = 0; i < x; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1 + 1,
    vx: Math.floor(Math.random() * 100) - 50,
    vy: Math.floor(Math.random() * 100) - 50
  });
}

// Draw the scene

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.font = "20pt Verdana";
ctx.color = "black";
ctx.fillText("SharePoint", 150, 50);   
ctx.fillText("Azure", 350, 180);
ctx.fillText("Dynamics CRM", 580, 300);
ctx.fillText("Skype for Business", 650, 100);  
ctx.fillText("Exchange", 1100, 50);  
  
//ctx.globalCompositeOperation = "lighter";
  
  for (var i = 0, x = stars.length; i < x; i++) {
    var s = stars[i];
  
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.stroke();
  }
  
  ctx.beginPath();
  for (var i = 0, x = stars.length; i < x; i++) {
    var starI = stars[i];
    ctx.moveTo(starI.x,starI.y); 
    if(distance(mouse, starI) < 150) ctx.lineTo(mouse.x, mouse.y);
    for (var j = 0, x = stars.length; j < x; j++) {
      var starII = stars[j];
      if(distance(starI, starII) < 150) {
        //ctx.globalAlpha = (1 / 15 * distance(starI, starII).toFixed(1));
        ctx.lineTo(starII.x,starII.y); 
      }
    }
  }
  ctx.lineWidth = 0.1;
  ctx.strokeStyle = '#293d3d';
  ctx.stroke();
}

function distance( point1, point2 ){
  var xs = 0;
  var ys = 0;
 
  xs = point2.x - point1.x;
  xs = xs * xs;
 
  ys = point2.y - point1.y;
  ys = ys * ys;
 
  return Math.sqrt( xs + ys );
}

// Update star locations

function update() {
  for (var i = 0, x = stars.length; i < x; i++) {
    var s = stars[i];
  
    s.x += s.vx / FPS;
    s.y += s.vy / FPS;
    
    if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
    if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
  }
}

canvas.addEventListener('mousemove', function(e){
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Update and draw

function tick() {
  draw();
  update();
  requestAnimationFrame(tick);
}

tick();
