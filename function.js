url = `
https://randomuser.me/api`;

generateRepeat();
var copyData = [];

async function generateRepeat() {
  var totalValue = "";

  for (var i = 0; i < 12; i++) {
    l = 0;

    async function getProfilePicture() {
      const data = await fetch(url)
        .then((response) => response.json())
        .catch((err) => console.log(err));

      console.log(data.results[0].picture.large);

      totalValue += changeDom(
        data.results[0].picture.large,
        data.results[0].name.first + " " + data.results[0].name.last,
        data.results[0].email,
        data.results[0].location.state,
        data.results[0].location.city,
        l
      );

      l++;

      copyData.push(data);

      document.getElementById("gallery").innerHTML = totalValue;
      console.log(totalValue);
    }

    getProfilePicture();
  }

  document.querySelector("#gallery").innerHTML = totalValue;
}

function changeDom(pic, n, e, s, c, k) {
  var changeValue = ` <div class="card" onclick="show(${k})" >
    <div class="card-img-container">
        <img class="card-img" src=${pic}  alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${n}</h3>
        <p class="card-text">${e}</p>
        <p class="card-text cap">${c}, ${s}</p>
    </div>
</div>


`;

  return changeValue;
}

$(document).ready(function () {
  $(".modal-container").hide();

  $("#modal-close-btn").click(function () {
    $(".modal-container").hide();

    // $(".information").text("")
  });
});

function close() {
  $(".modal-container").hide();
}

var current = 0;
function show(k) {
  printOnClick(k);
  current = k;
  console.log(current);
}
function next() {
  if (current !== copyData.length - 1) {
    var next = current + 1;
    printOnClick(next);
    current = next;
    next = next + 1;
  } else {
    console.log("value exceeded");
  }
}

function previous() {
  if (current > 0) {
    var previous = current - 1;
    printOnClick(previous);
    current = previous;
    previous = previous - 1;
  } else {
    console.log("value in negative");
  }
}
function printOnClick(t) {
  $(".modal-container").show();
  $(document).ready(function () {
    $(".modal-container").show();
    console.log(copyData[t].results[0].picture.medium);
    $(".modal-name").text(
      copyData[t].results[0].name.first + " " + copyData[t].results[0].name.last
    );
    $(".modal-img").attr("src", copyData[t].results[0].picture.medium);
    $(".modal-text:eq(0)").text(copyData[t].results[0].email);
    $(".modal-text:eq(1)").text(copyData[t].results[0].location.city);
    $(".modal-text:eq(2)").text(copyData[t].results[0].phone);
    $(".modal-text:eq(3)").text(
      copyData[t].results[0].location.street.number +
        " " +
        copyData[t].results[0].location.street.name +
        ", " +
        copyData[t].results[0].location.city +
        " " +
        copyData[t].results[0].location.postcode
    );

    $(".modal-text:eq(4)").text(
      "Birthday :" + copyData[t].results[0].dob.date.substring(0, 10)
    );
  });
}

n = current + 1;
