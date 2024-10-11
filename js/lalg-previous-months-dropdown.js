function buildCalendarSelectList() {	

	var select = document.getElementById("lalg-calendar-specific-month");

	removeOptions(select);

	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const date = new Date();
	let current_month_number = date.getMonth();
	let current_month = ((current_month_number + 1).toString()).padStart(2, '0');
	let current_year = date.getFullYear().toString();
	let current_year_month = current_year.concat(current_month);
	date.setMonth(date.getMonth() -7);

	months_array = [];
	months_array["0"] = "Jump to Month...";

	for (var i = 0; i < 13; i++) {
	  date.setMonth(date.getMonth() +1);
	  let month_number = date.getMonth();
	  let month = ((month_number + 1).toString()).padStart(2, '0');
	  let year = date.getFullYear().toString();
	  let year_month = year.concat(month);
	  if (current_year_month == year_month) {
		 current = " (current)";
	  } else {
		 current = "";
	  }
	  months_array[year_month] = months[month_number].concat(" ").concat(year).concat(current);
	}

	for(i in months_array) {
		select.options[select.options.length] = new Option(months_array[i],i);
	}

}

function removeOptions(selectElement) {
   var i, L = selectElement.options.length - 1;
   for(i = L; i >= 0; i--) {
      selectElement.remove(i);
   }
}


