$(document).ready(function(){

  
  $('.accordion ul li a').click(function () {
    
    var divname= this.name;
    $("#"+divname).show("fast").siblings().hide("fast");
    $(".accordion ul li a").removeClass("current");               
    $(this).addClass("current");

    // var divname= this.name;
    // if (divname !== divname ) { 
    //   $("#"+divname).show("fast").siblings().hide("fast");             
    // } else {
    //   $(".accordion ul li a").removeClass("current");               
    //   $(this).addClass("current");
    // }

  });
    
  // Accordion Script
  
  $(function() {
  
      var itemsList = $('.accordion > li > ul'), // Define submenu list
          itemLink  = $('.accordion > li > a');  // Define submenu links
      expandedItem  = $('.accordion > li > ul.expand');  // Define Expanded Menu
      
    // Hide all submenu links
      itemsList.hide();
    
    // Show Expanded Item (.expand)
    expandedItem.show();
  
    // Click on any link in main menu
      itemLink.click(function(e) {
          e.preventDefault();
      
      //If that link is not ("!$" -negation) active (has no ".active" class)
          if(!$(this).hasClass('active')) {
      
        //Remove this class
              itemLink.removeClass('active');
        
        //Close previously opened submenu list
              itemsList.filter(':visible').slideUp('normal');
        
        //Open clicked (4 steps previous) link
              $(this).addClass('active').next().stop(true,true).slideDown('normal');
        
      // If link is active
          } else {
      
        //Remove class ".active"
              $(this).removeClass('active');
        
        //Close menu
              $(this).next().stop(true,true).slideUp('normal');
          }
      });
  
  });
  
  

  


});