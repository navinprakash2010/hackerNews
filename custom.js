var e = document.querySelector(".list-group");

axios
  .get("https://api.hnpwa.com/v0/news/1.json")
  .then((response) => {
    createListItem(response);
  })
  .catch((error) => {
    //handle error
    console.log(error);
  });

function createListItem(response) {
  var id_array = [];
  var points_array = [];

  response.data.forEach(function (listItem) {
    var ids = parseInt(listItem.id);
    var up = 0;

    //storing data in array from map
    id_array.push(listItem.id);
    points_array.push(listItem.comments_count);

    //create list items
    var li = document.createElement("li");
    li.setAttribute("class", "list-group-item");

    //create child list items
    var childLi = document.createElement("li");
    li.setAttribute("class", "list-group-item-child");

    //create sub comment count
    var points = document.createElement("span");
    points.setAttribute("class", "badge badge-primary");
    points.innerHTML = listItem.comments_count;

    //create voting button
    var upVote = document.createElement("button");
    upVote.setAttribute("type", "button");
    upVote.setAttribute("id", `b-${ids}`);
    upVote.innerHTML = "⬆";

    //create voting count
    var count = document.createElement("span");
    count.setAttribute("class", "badge badge-primary");
    count.innerHTML = "0";

    function refreshResults() {
      //var results = document.getElementById("results");
      //results.innerHTML = "total: " + up;
      count.innerHTML = up;
    }
    setTimeout(() => {
      document
        .getElementById(`b-${ids}`)
        .addEventListener("click", function () {
          up++;
          //total++;
          refreshResults();
        });
    }, 1000);

    //create anchor
    var anchor = document.createElement("a");
    anchor.setAttribute("href", listItem.url);
    anchor.setAttribute("target", "__blank");
    anchor.innerHTML = listItem.title;

    childLi.appendChild(anchor);
    childLi.prepend(upVote);
    childLi.prepend(count);
    childLi.prepend(points);

    li.appendChild(childLi);

    document.querySelector(".list-group").appendChild(li);
  });

  //Chart
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
