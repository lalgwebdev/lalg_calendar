(function( $, Drupal ) {
	
  Drupal.behaviors.calendarSpecificMonth = {
    attach: function (context, settings) {
	  $('#lalg-calendar-specific-month').change(function(){
		var month_picked = $('#lalg-calendar-specific-month').val();
		var url_chosen = window.location + '/' + month_picked;
		window.location.href = url_chosen;
	  });
	}
  }
  Drupal.behaviors.calendarUrlChange = {
    attach: function (context, settings) {
	  $('#lalg-calendar-specific-month').each(function(){
		window.history.pushState(null, null, '/lalg-calendar');
	  });
	}
  }
	
  Drupal.behaviors.calendarJump = {
    attach: function (context, settings) {
	  $("button.button_today").click(function(){
	    const today = new Date();
		const year = today.getFullYear();
		var month = today.getMonth() + 1;
		if (month < 10) {
		  month = '0' + month;
		}
		var day = today.getDate();
		if (day < 10) {
		  day = '0' + day;
		}
		var dateid = 'lalg_calendar-' + year + '-' + month + '-' + day + '-date-box';
		let todaydate = $('td#'+dateid);
	    $("body, html").animate({	scrollTop: $( todaydate ).offset().top }, 600);	
		$("table").animate({        scrollLeft: $( todaydate ).offset().left }, 600);  
	  });	
    }
  }
  

  Drupal.behaviors.calendarClicks = {
    attach: function (context, settings) {
		
	  function hide_or_show_jump_button() {
		const today = new Date();
		const year = today.getFullYear();		
		const month_number = today.getMonth();
		const months_long = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var month_name = months_long[month_number];
		var month_year = month_name + ' ' + year
		let month_year_showing = $('div.lalg-calendar h3').text().trim();  
		if (month_year == month_year_showing) {	
			$('button.button_today').removeClass('dim_button');
		} else {
			$('button.button_today').addClass('dim_button');
		}  
	  }
		
	  function changeofmonth() {
		// When displaying the calendar, add a class which represents the group type  
		$(".hide").each(function() {
		  $(this).parents(".calendar").addClass($(this).text().trim().toLowerCase().split(" ").join(""));
		});  
	  
		if ($('#block-lalgcalendarlegend li.group_type_show').length > 0) {
			$('#block-lalgcalendarlegend li.group_type_show').click();	
		}
	  }
	  
	  function getMonthName(fullDate) {
		let monthNumber = fullDate.substring(5,7);
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[monthNumber - 1];
	  }

	  function addDaysOfWeek() {
		  $("td[headers='Monday'] .inner .day").each(function() {
			  if (!isNaN($(this).text().trim())) {
				  let fullDate = $(this).closest("td").attr("date-date"); 
				  let shortMonthName = getMonthName(fullDate);
				  let oldtext = $(this).text().trim();
				  let newtext = "Mon ".concat(oldtext, " ", shortMonthName);
				  $(this).text(newtext);
			  }
		  });  
		  $("td[headers='Tuesday'] .inner .day").each(function() {
			  if (!isNaN($(this).text().trim())) {
				  let fullDate = $(this).closest("td").attr("date-date"); 
				  let shortMonthName = getMonthName(fullDate);
				  let oldtext = $(this).text().trim();
				  let newtext = "Tue ".concat(oldtext, " ", shortMonthName);
				  $(this).text(newtext);
			  }
		  });
		  $("td[headers='Wednesday'] .inner .day").each(function() {
			  if (!isNaN($(this).text().trim())) {
				  let fullDate = $(this).closest("td").attr("date-date"); 
				  let shortMonthName = getMonthName(fullDate);
				  let oldtext = $(this).text().trim();
				  let newtext = "Wed ".concat(oldtext, " ", shortMonthName);
				  $(this).text(newtext);
			  }
		  });
		  $("td[headers='Thursday'] .inner .day").each(function() {
			  if (!isNaN($(this).text().trim())) {
				  let fullDate = $(this).closest("td").attr("date-date"); 
				  let shortMonthName = getMonthName(fullDate);
				  let oldtext = $(this).text().trim();
				  let newtext = "Thu ".concat(oldtext, " ", shortMonthName);
				  $(this).text(newtext);
			  }
		  });
		  $("td[headers='Friday'] .inner .day").each(function() {
			  if (!isNaN($(this).text().trim())) {
				  let fullDate = $(this).closest("td").attr("date-date"); 
				  let shortMonthName = getMonthName(fullDate);
				  let oldtext = $(this).text().trim();
				  let newtext = "Fri ".concat(oldtext, " ", shortMonthName);
				  $(this).text(newtext);
			  }
		  });
		  $("td[headers='Saturday'] .inner .day").each(function() {
			  if (!isNaN($(this).text().trim())) {
				  let fullDate = $(this).closest("td").attr("date-date"); 
				  let shortMonthName = getMonthName(fullDate);
				  let oldtext = $(this).text().trim();
				  let newtext = "Sat ".concat(oldtext, " ", shortMonthName);
				  $(this).text(newtext);
			  }
		  });
		  $("td[headers='Sunday'] .inner .day").each(function() {
			  if (!isNaN($(this).text().trim())) {
				  let fullDate = $(this).closest("td").attr("date-date"); 
				  let shortMonthName = getMonthName(fullDate);
				  let oldtext = $(this).text().trim();
				  let newtext = "Sun ".concat(oldtext, " ", shortMonthName);
				  $(this).text(newtext);
			  }
		  });
		  
	  }
	  
	  hide_or_show_jump_button();
	  changeofmonth();
	  addDaysOfWeek();
	
	  
      $('#block-lalgcalendarlegend li', context).each(function () {
		// this is for each of the coloured group types at the top...
		$(this).on('click', function() {
			$('#block-lalgcalendarlegend li').removeClass("group_type_show");
			$(this).addClass("group_type_show");
	
			// when a particular coloured group type at the top is clicked...
			const typeClicked = $(this).text().trim().toLowerCase().split(" ").join("");
			// eg. typeClicked = "sports&games"
			const mainCalendarItems = $('.month-view').find('.item');
			// every single event on the calendar...
			if (typeClicked == "allgrouptypes") {
				mainCalendarItems.each(function() {		
					$(this).show();
				});
			} else {
				mainCalendarItems.each(function() {				
					const divWithPageType = $(this).find('.monthview');
					// divWithPageType is the group type class of the event
					if (!divWithPageType.hasClass(typeClicked)) {
						$(this).hide();
					} else {
						$(this).show();
					}	
				});
			}

		});
      });
    }
  };

  Drupal.behaviors.lalg_calendar = {
    attach: function (context, settings) {

	  
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


