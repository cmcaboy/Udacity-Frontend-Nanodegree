Instructions

1. Run Pizza.html to execute website
2. Open up Chrome Dev Tools
3. Click on the "console" tab
4. View the response times for each action.

The 2 primary changes I made:

1) I altered the changePizzaSizes function to calculate the newwidth once rather than with each iteration. The pizzas all have the same size so it doesn't make sense to recalculate every iteration of the loop.

  function changePizzaSizes(size) {
      
    var pizzas = document.querySelectorAll(".randomPizzaContainer");  
    var dx = determineDx(pizzas[0], size);    
    var newwidth = (pizzas[0].offsetWidth + dx) + 'px';  
    for (var i = 0; i < pizzas.length; i++) {
      pizzas[i].style.width = newwidth;   
    }
  }

2) Instead of performing the math.sin calculation every iteration of this loop, I moved the placeholder outside of the loop. That way, the Math.sin function was only calculated once rather than 100 times.

  var mathHolder1 = Math.sin(document.body.scrollTop / 1250);    
  for (var i = 0; i < items.length; i++) {
    var phase = (mathHolder1 + (i % 5));
    items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
  }