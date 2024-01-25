const rainbow = document.querySelectorAll("#extra")[0],
      button1 = document.querySelectorAll(".btn")[0];
var ids = [0, 0];

button1.onmouseenter = () => {
  ids.forEach(id => clearInterval(id));
  
  var d = rainbow.style.getPropertyValue("--deg"),
      time = d == "" ? 0 : Math.floor(parseInt(d) / 6);

  ids[0] = setInterval(() => {
    var deg = time;
    
    if (time === 61) {
      clearInterval(ids[0]);
      
    } else if (time <= 30) {
      deg = (deg * deg) / 5;

      rainbow.style.setProperty("--deg", `${deg}deg`);
      
    } else if (time > 30) {
      deg = ((deg * -deg) / 5) + (deg * 24) - 360;
      
      rainbow.style.setProperty("--deg", `${deg}deg`);
    }

    time++;
  });
}

button1.onmouseleave = () => {
  ids.forEach(id => clearInterval(id));
  
  var time = Math.floor(parseInt(rainbow.style.getPropertyValue("--deg")) / 6);
  
  ids[1] = setInterval(() => {
    var deg = time;
    
    if (time === 0) {
      clearInterval(ids[1]);
      
    } else if (time <= 30) {
      deg = (deg * deg) / 5;

      rainbow.style.setProperty("--deg", `${deg}deg`);
      
    } else if (time > 30) {
      deg = ((deg * -deg) / 5) + (deg * 24) - 360;
      
      rainbow.style.setProperty("--deg", `${deg}deg`);
    }

    time--;
  });
}