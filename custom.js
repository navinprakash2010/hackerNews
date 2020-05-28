var e = document.querySelector(".list-group");

document.getElementById("newest").addEventListener("click", (event) => {
  event.preventDefault();
  e.innerHTML = "";
  axios
    .get("https://api.hnpwa.com/v0/newest/1.json")
    .then((response) => {
      createListItem(response);
    })
    .catch((error) => {
      //handle error
      console.log(error);
    });
});

document.getElementById("news").addEventListener("click", (event) => {
  event.preventDefault();
  e.innerHTML = "";
  axios
    .get("https://api.hnpwa.com/v0/news/1.json")
    .then((response) => {
      createListItem(response);
    })
    .catch((error) => {
      //handle error
      console.log(error);
    });
});

document.getElementById("ask").addEventListener("click", (event) => {
  event.preventDefault();
  e.innerHTML = "";
  axios
    .get("	https://api.hnpwa.com/v0/ask/1.json")
    .then((response) => {
      createListItem(response);
    })
    .catch((error) => {
      //handle error
      console.log(error);
    });
});

document.getElementById("show").addEventListener("click", (event) => {
  event.preventDefault();
  e.innerHTML = "";
  axios
    .get("https://api.hnpwa.com/v0/show/1.json")
    .then((response) => {
      createListItem(response);
    })
    .catch((error) => {
      //handle error
      console.log(error);
    });
});

document.getElementById("jobs").addEventListener("click", (event) => {
  event.preventDefault();
  e.innerHTML = "";
  axios
    .get("https://api.hnpwa.com/v0/jobs/1.json")
    .then((response) => {
      createListItem(response);
    })
    .catch((error) => {
      //handle error
      console.log(error);
    });
});

window.addEventListener("load", (event) => {
  event.preventDefault();
  axios
    .get("https://api.hnpwa.com/v0/news/1.json")
    .then((response) => {
      createListItem(response);
    })
    .catch((error) => {
      //handle error
      console.log(error);
    });
});

function createListItem(response) {
  var id_array = [];
  var points_array = [];
  console.log(response.data);
  response.data.forEach(function (listItem) {
    id_array.push(listItem.id);
    points_array.push(listItem.points);
    console.log(id_array + " - " + points_array);

    //create list items
    var li = document.createElement("li");
    li.setAttribute("class", "list-group-item");

    var textNode = document.createTextNode(" points");
    //element.appendChild(textNode);

    //create badge
    var span = document.createElement("span");
    span.setAttribute("class", "badge badge-primary");
    span.innerHTML = listItem.points;
    span.appendChild(textNode);
    // li.appendChild(anchor);

    //create anchor
    var anchor = document.createElement("a");
    anchor.setAttribute("href", listItem.url);
    anchor.setAttribute("target", "__blank");
    anchor.innerHTML = listItem.title;
    anchor.appendChild(span);

    li.appendChild(anchor);

    document.querySelector(".list-group").appendChild(li);
  });

  Highcharts.chart("container", {
    title: {
      text: "Hacker News App",
    },

    subtitle: {
      text: "Source: https://api.hnpwa.com",
    },

    yAxis: {
      title: {
        text: "Points",
      },
    },

    xAxis: {
      accessibility: {
        rangeDescription: "News Id",
      },
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 2010,
      },
    },

    series: [
      {
        name: "Data Id",
        data: id_array,
      },
      {
        name: "Data Points",
        data: points_array,
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  });
}
