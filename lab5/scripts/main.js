var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function searchBar(searchBarId,menuId) {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById(searchBarId);
    filter = input.value.toUpperCase();
    ul = document.getElementById(menuId);
    li = ul.getElementsByTagName("button");
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i];
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
    if (li.length == 0) {
        ul.classList.add("hidden");
    } else {
        ul.classList.remove("hidden");
    }
}

function onSearchBar(searchBarId,menuId) {
    document.getElementById(searchBarId).value = "";
    document.getElementById(menuId).classList.add("show");
    searchBar(searchBarId,menuId);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

function onUnSearchBar(searchBarId,menuId) {
    const work = async () => {
        await sleep(200)
            document.getElementById(menuId).classList.remove("show");
            if (document.getElementById("mySearch2").value != "") {
                document.getElementById("dateInput").classList.remove("hidden");
            } else {
                document.getElementById("dateInput").classList.add("hidden");
                document.getElementById("dateInput").value = "";
            }
        }
        work()
}

function addSelection(ele,id2,id3) {
    document.getElementById(id2).value = ele.innerHTML;
    if (id2=="mySearch2")
        document.getElementById("dateInput").value = "";
    document.getElementById(id3).classList.remove("show");
}

function noTimeDate() {
    var d = new Date();
    d.setHours(0,0,0,0);
    return d;
}



$(document).ready(function(){

    // To change the style of the calender, look in jqueryui.com, under Themes, in the ThemeRoller Gallery
    // You can try different themes (the names are under the calendars) / This is Excite Bike
    // To use a different theme you must include its css in your HTML file.
    // The one I included in my HTML is the Excite Bike, but you can try others

    // Also, here is a good tutorial for playing with the datepicker in https://webkul.com/blog/jquery-datepicker/
    // Datepicker is also documented as one of the widgets here: https://api.jqueryui.com/category/widgets/
    const setDateFormat = "mm/dd/yy";
    function disableDates(date) {
        // Sunday is Day 0, disable all Sundays
        if (date.getDay() == 0 || date.getDay() == 6) return [false];
        var expert = document.getElementById("mySearch2").value;
        if (expert == "Bob") {
            return [false];
        }
        if (expert == "Jill") return [date.getDay() != 4]
        if (expert == "Steve") return [date.getDay() != 2 && date.getDay() != 1]
        return [true];
    }

    function maxDate() {
        var expert = document.getElementById("mySearch2").value;
        if ("Bob" == expert) return '+0M'
        return '+4M'
    }

    $( function() {
        $( "#dateInput" ).datepicker(
            {
                dateFormat: setDateFormat,
                // no calendar before June 1rst 2020
                minDate: noTimeDate(),
                maxDate: maxDate(),
                // used to disable some dates
                beforeShowDay: disableDates,
                currentText: "Now"
            }
        );
      } );
    


    // Look at the different events on which an action can be performed
    // https://www.w3schools.com/jquery/jquery_events.asp
    // Here, we put
    $("#debit").on("mouseenter", function(){
        $("#debit").addClass("showInput");
    });

    $("#debit").on("mouseleave", function(){
        $("#debit").removeClass("showInput");
    });

    // https://jqueryui.com/tooltip/
    // The class "highlight" used here is predefined in JQuery UI
    // the message of the tooltip is encoded in the input (in the HTML file)
    $("#debit").tooltip({
        classes: {
            "ui-tooltip": "highlight"
        }
    });

});

function onEmailConfirm(EmailElem) {
    if (!verifyEmail(EmailElem.value)) {
        alert("Invalid Credit Card!");
        EmailElem.value = "";
    }
}

function onCCConfirm(EmailElem) {
    if (!verifyCreditCard(EmailElem.value)) {
        alert("Invalid Email Format!");
        EmailElem.value = "";
    }
}


function verifyCreditCard(creditCardText) {
    var creditformat = /^([0-9]{4}[- ]?){3}[0-9]{4}$/;
    return creditCardText.match(creditformat);
}

function verifyEmail(inputText) {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return inputText.match(mailformat);
}