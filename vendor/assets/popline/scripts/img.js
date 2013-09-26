;(function($) {


  var buildTextField = function(popline, button) {
    if (button.find(":text").length === 0) {
      var $textField = $("<input type='text' />");
      $textField.addClass("textfield");
      $textField.attr("placeholder", "Type Url Here");

      $textField.keyup(function(event) {
        if (event.which === 13) {
          $(this).blur();
          window.getSelection().removeAllRanges();
          window.getSelection().addRange(button.data('selection'));
          document.execCommand('InsertImage', false, $(this).val());
          popline.hide();
        }
      });

      $textField.mouseup(function(event) {
        event.stopPropagation();
      });
      button.append($textField);
    }
  }



  $.popline.addButton({
    picture: {
      iconClass: "icon-picture",
      mode: "edit",
      beforeShow: function(popline) {
     

        if (!this.data("click-event-binded")) {
          
          this.click(function(event) {
          var $_this = $(this);
          buildTextField(popline, $_this);

        if (!$_this.hasClass("boxed")) {
            popline.switchBar($_this, function() {
            $_this.siblings("li").hide().end()
                    .children(":text").show().end()
                }, function() {
                  $_this.children(":text").focus()
                });
                $_this.data('selection', window.getSelection().getRangeAt(0));
                event.stopPropagation();
              }  
          });
          this.data("click-event-binded", true);
        }
      },
      afterHide: function() {
        this.find(":text").val('');
        $(".resize-img").css("display","block");
 

      }


    }
  });
})(jQuery);




  