// Get items from local storage **see if poss to clear or only match current date
// ======================================================
function getLocalStorage(i) {
//     var eId = localStorage.setItem(eId, eText);
//     var eText = JSON.parse(localStorage.getItem('eText'));
    
//     if (eId && eText === null) {
//       return;
//     }
//     // eText = $(this).parent().siblings().children(".description").val();
//     // userTextSpan(eId).textContent = eText;
//     // console.log(key);
//     // userEmailSpan.textContent = email;
//     // userPasswordSpan.textContent = password;
// //   }
//     console.log(eId[i]);
 
    }

// Main function
// ======================================================
$( document ).ready(function() {
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
    for (var i = 9; i < 18; i++) {
        // create a row
        var row = $(`<div data-time=${i} id='${i}' class="row">`);
        var padL = $('<div class="col-sm-1"> <p class="padL"></p>');
        // create a column to hold the time
        var hour = $('<div class="col-sm-1"> <p class="hour">' + formatTime(i) + '</p>');
        //create a column to hold the description
        var desc = $(`<div class="col-sm-8 past"><textarea id=text${i} class="description" placeholder="Event goes here"></textarea>`);        
        //create column to hold the save btn https://fontawesomeicons.com/save
        var save = $(`<div class="col-sm-1"><button class="saveBtn" id=${i}><i class="fas fa-save"></i></button>`)

        // append column to row
        row.append(padL);
        row.append(hour);
        row.append(desc);
        row.append(save);

        //add rows to container
        $(".container").append(row);

        // get data from local storage
        getLocalStorage(i);
    }
 
// Format time
// ======================================================
    function formatTime(hours) {
        var amPm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12;
        return hours + amPm;
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
        // preventDefault();
        var eId = $(this).attr("id");
        var eText = $(this).parent().siblings().children(".description").val();
        localStorage.setItem(eId, eText);
    });
});