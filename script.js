// Get items from local storage **see if poss to clear or only match current date
// ======================================================
    function getLocalStorage(key) {
        var value = localStorage.getItem("key");
        if (value) {
            $('#text${"key"}').text(value);
        }
        console.log(value)
    }

// Main function
// ======================================================
$( document ).ready(function() {
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
    for (var i = 9; i < 18; i++) {
    
        // create a row
        var row = $(`<div data-time=${i} id='${i}' class="row">`);

        // create a column to hold the time
        var hour = $('<div class="col-sm-2"> <p class="hour">' + formatTime(i) + '</p>');

        //create a column to hold the description
        var desc = $(`<div class="col-sm-8 past"><textarea id=text${i} class="description" placeholder="Add your event here..."></textarea>`);        
    
        //create column to hold the save btn https://fontawesomeicons.com/save
        var save = $(`<div class="col-sm-2"><button class="saveBtn" id=${i}><i class="fas fa-save"></i></button>`)
        
        // append column to row
        row.append(hour);
        row.append(desc);
        row.append(save);

        //add rows to container
        $(".container").append(row);

        // get data from local storage
        getLocalStorage(i);
    }

// Format time to show am-pm
// ======================================================
    function formatTime(hours) {
        var ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12;
        return hours + ampm;
    }
formatTime();

// Format rows with color for past, present, future
// ======================================================
    function updateColors(){
            var currentTime = new Date().getHours();
            for (var i = 9; i < 18; i++) { 
            // console.log(currentTime, $(`#${i}`).data("time"));
            if ($(`#${i}`).data("time") == currentTime){
                $(`#text${i}`).addClass("present");
            } else if (currentTime < $(`#${i}`).data("time")) {
                $(`#text${i}`).addClass( "future");
            }
        }
    }
    updateColors();

// When save btn clicked save to local storage
// ======================================================
    var saveBtn = $(".saveBtn");
    saveBtn.on("click", function(){
        var eventId = $(this).attr("id");
        var eventText = $(this).parent().siblings().children(".description").val();
        localStorage.setItem(eventId, eventText);
    });


});

