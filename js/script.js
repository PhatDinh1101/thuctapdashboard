$(function () {
  $(".accordion li").click(function () {
    $(this).toggleClass(" active ");
    $(this).siblings().removeClass(" active ");
    $(".submenu").stop().slideUp();
    $(".active .submenu").stop().slideDown();
    return false;
  });
});
$(function () {
  $('input[name="daterange"]').daterangepicker(
    {
      opens: "left",
    },
    function setValue() {
      var datePicker = document.getElementById("myDatePicker");
      var label = document.getElementById("myLabel");
      var value = datePicker.value;
      label.innerHTML = value;
    },
    function (start, end, label) {
      console.log(
        "A new date selection was made: " +
          start.format("YYYY-MM-DD") +
          " to " +
          end.format("YYYY-MM-DD")
      );
    }
  );
});
let menuOpenBtn = document.querySelector(".banner .toggle");
let closeOpenBtn = document.querySelector(".menu_bar .bi-x");

let menuBar = document.querySelector(".menu_bar");

menuOpenBtn.addEventListener("click", () => {
  menuBar.style.left = "0";
});
closeOpenBtn.addEventListener("click", () => {
  menuBar.style.left = "-100%";
});

let filtercheck = document.querySelector(".filtercheck");
let searchBox = document.querySelector(".btn_box_search .btnSearch");

searchBox.addEventListener("click", () => {
  filtercheck.classList.toggle("showInput");
});

function setValue() {
  var datePicker = document.getElementById("myDatePicker");
  var label = document.getElementById("myLabel");
  var value = datePicker.value;
  label.innerHTML = value;
}

getPagination("#table-id");
$("#maxRows").trigger("change");
function getPagination(table) {
  $("#maxRows").on("change", function () {
    $(".pagination").html(""); // reset pagination div
    var trnum = 0; // reset tr counter
    var maxRows = parseInt($(this).val()); // get Max Rows from select option

    var totalRows = $(table + " tbody tr").length; // numbers of rows
    $(table + " tr:gt(0)").each(function () {
      // each TR in  table and not the header
      trnum++; // Start Counter
      if (trnum > maxRows) {
        // if tr number gt maxRows

        $(this).hide(); // fade it out
      }
      if (trnum <= maxRows) {
        $(this).show();
      } // else fade in Important in case if it ..
    }); //  was fade out to fade it in
    if (totalRows > maxRows) {
      // if tr total rows gt max rows option
      var pagenum = Math.ceil(totalRows / maxRows); // ceil total(rows/maxrows) to get ..
      //	numbers of pages
      for (var i = 1; i <= pagenum; ) {
        // for each page append pagination li
        $(".pagination")
          .append(
            '<li data-page="' +
              i +
              '">\
                                         <span>' +
              i++ +
              '<span class="sr-only">(current)</span></span>\
                                       </li>'
          )
          .show();
      } // end for i
    } // end if row count > max rows
    $(".pagination li:first-child").addClass("active"); // add active class to the first li

    //SHOWING ROWS NUMBER OUT OF TOTAL DEFAULT
    showig_rows_count(maxRows, 1, totalRows);
    //SHOWING ROWS NUMBER OUT OF TOTAL DEFAULT

    $(".pagination li").on("click", function (e) {
      // on click each page
      e.preventDefault();
      var pageNum = $(this).attr("data-page"); // get it's number
      var trIndex = 0; // reset tr counter
      $(".pagination li").removeClass("active"); // remove active class from all li
      $(this).addClass("active"); // add active class to the clicked

      //SHOWING ROWS NUMBER OUT OF TOTAL
      showig_rows_count(maxRows, pageNum, totalRows);
      //SHOWING ROWS NUMBER OUT OF TOTAL

      $(table + " tr:gt(0)").each(function () {
        // each tr in table not the header
        trIndex++; // tr index counter
        // if tr index gt maxRows*pageNum or lt maxRows*pageNum-maxRows fade if out
        if (
          trIndex > maxRows * pageNum ||
          trIndex <= maxRows * pageNum - maxRows
        ) {
          $(this).hide();
        } else {
          $(this).show();
        } //else fade in
      }); // end of for each tr in table
    }); // end of on click pagination list
  });
  // end of on select change

  // END OF PAGINATION
}

// SI SETTING
$(function () {
  // Just to append id number for each row
  default_index();
});

//ROWS SHOWING FUNCTION
function showig_rows_count(maxRows, pageNum, totalRows) {
  //Default rows showing
  var end_index = maxRows * pageNum;
  var start_index = maxRows * pageNum - maxRows + parseFloat(1);
  var string =
    start_index + " - " + end_index + " of " + totalRows + " kết quả";
  $(".rows_count").html(string);
}

// CREATING INDEX
// function default_index() {
//   $("table tr:eq(0)").prepend("<th> ID </th>");
//   var id = 0;
//   $("table tr:gt(0)").each(function () {
//     id++;
//     $(this).prepend("<td>" + id + "</td>");
//   });
// }
function FilterkeyWord_all_table() {
  var count = $(".table")
    .children("tbody")
    .children("tr:first-child")
    .children("td").length;
  var input, filter, table, tr, td, i;
  input = document.getElementById("search_input_all");
  var input_value = document.getElementById("search_input_all").value;
  filter = input.value.toLowerCase();
  if (input_value != "") {
    table = document.getElementById("table-id");
    tr = table.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) {
      var flag = 0;

      for (j = 0; j < count; j++) {
        td = tr[i].getElementsByTagName("td")[j];
        if (td) {
          var td_text = td.innerHTML;
          if (td.innerHTML.toLowerCase().indexOf(filter) > -1) {
            flag = 1;
          } else {
          }
        }
      }
      if (flag == 1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  } else {
    //RESET TABLE
    $("#maxRows").trigger("change");
  }
}
const img = document.querySelector("#file")
var uploaded = "";

img.addEventListener("change", function(){
  console.log(img.value)
})