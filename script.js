// In this module I have placed the events. 
var EventHandlers = (function () {

   
    function init() {

      

        $(".work").hide();
        $(".education").hide();
        $("#btn-hide-work").hide(); 
        $("#btn-hide-edu").hide();
        $("#btn-show-work").click(onClickShowWorkButton);
        $("#btn-hide-work").click(onClickHideWorkButton);
        $("#btn-show-edu").click(onClickShowEducationButton);
        $("#btn-hide-edu").click(onClickHideEducationButton);
 
    }

      

    function onClickShowWorkButton() { 
        $(".work").show();
        $("#btn-show-work").hide(); 
        $("#btn-hide-work").show(); 
    }

    function onClickHideWorkButton() { 
        $(".work").hide();
        $("#btn-hide-work").hide();
        $("#btn-show-work").show();
    }

    function onClickShowEducationButton() { 
        $(".education").show();
        $("#btn-show-edu").hide(); 
        $("#btn-hide-edu").show(); 
    }

    function onClickHideEducationButton() { 
        $(".education").hide();
        $("#btn-hide-edu").hide();
        $("#btn-show-edu").show();
    }

    return {
        init
    }
})();

$(document).ready(function () {
    EventHandlers.init();
  
});