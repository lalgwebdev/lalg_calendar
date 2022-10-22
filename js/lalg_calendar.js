(function( $, Drupal ) {

 

  Drupal.behaviors.lalg_calendar = {
    attach: function (context, settings) {
      // When displaying the calendar, add a class which represents the group type
      $(".hide").each(function() {
        $(this).parents(".calendar").addClass($(this).text().trim().toLowerCase().split(" ").join(""));
      });  
	  
	  $(".hidefc").each(function() {
        $(this).parents(".fc-content").addClass($(this).text().trim().toLowerCase().split(" ").join(""));
      });  
	  

      
      // When editing content, automatically populate time fields to that of the first time field
      $(".form-date").change(function() {       
        $first_time = $('input[name="field_eventdate[0][value][time]"]').val();        
        $(this).closest('div').next().find('.form-time').val($first_time);
        // but if clearing the date field (to remove it) then also clear the time field
        if ($(this).val() === "") {
          $(this).closest('div').next().find('.form-time').val("");
        }  
      });
      
      // When editing time on the first date, automatically populate all other time fields to that of the first time field
      // but not if there is no date value otherwise you'll get an error
      $(".form-time").change(function() {       
        $first_time = $('input[name="field_eventdate[0][value][time]"]').val();   
        $('.form-time').each(function() {
          $thisvalue = $(this).parents(".fieldset-wrapper").find('.form-date').val(); 
          if  ($thisvalue !== "") {
            $(this).val($first_time);
          } 
        });   
      });

    }
  }; 
     


 
})(jQuery, Drupal);		// ******************* Close the $ reversion	


