function City(x, y, name){
     this.name = name;
     this.x = x;
     this.y = y;

     this.distanceTo = function(city2){
        xDistance = Math.abs(this.x) - Math.abs(city2.x);
        yDistance = Math.abs(this.y) - Math.abs(city2.y);
        return Math.sqrt(xDistance*xDistance + yDistance*yDistance);
     };
}

function totalDistance(tour){
    var previousCity = tour[0];
    distance = 0;
    for(i = 0; i < tour.length; i++){
        distance += tour[i].distanceTo(previousCity);
        previousCity = tour[i];
    }
    return distance;
}

function acceptanceProbability(energy, newEnergy, temperature){
    if(newEnergy < energy){
        return 1.0;
    }
    return Math.exp((energy-newEnergy)/temperature);
}

function simulate(tour){
  var energy = totalDistance(tour);
  var temperature = 10000.0;
  var coolingRate = 0.003;
  var bestEnergy = energy;
  var bestTour = tour;
  var steps = 0;

  while(temperature > 1.0){
       steps+=1;
       var newTour = tour.slice();
       var position1 = Math.floor(Math.random() * tour.length);
       var position2 = Math.floor(Math.random() * tour.length);
       var temp = newTour[position1];
       newTour[position1] = newTour[position2];
       newTour[position2] = temp;
      var newEnergy = totalDistance(newTour);
      if(acceptanceProbability(energy, newEnergy, temperature) > Math.random()){
        tour = newTour;
        energy = newEnergy

          if(energy < bestEnergy){
              bestEnergy = newEnergy;
              bestTour = tour;
          }
      }
      temperature*=1-coolingRate;
  }
  console.log("Steps: " + steps);
  return bestTour;
}

function buildDataset(){
  var cities = {};
  cities["New York"] = new City(-73.935242, 40.730610, "New York");
  cities["Los Angeles"] = new City(-118.243683, 34.052235, "Los Angeles");
  cities["Chicago"] = new City(-87.623177, 	41.881832, "Chicago");
  cities["Houston"] = new City(-95.369803, 29.760427, "Houston");
  cities["Phoenix"] = new City(-112.074036, 33.448376, "Phoenix");
  cities["Philadelphia"] = new City(-75.165222, 39.952583, "Philadelphia");
  cities["San Antonio"] = new City(-98.491142, 	29.424349, "San Antonio");
  cities["San Diego"] = new City(-117.161087, 	32.715736, "San Diego");
  cities["Dallas"] = new City(-96.7969879, 32.7766642, "Dallas");
  cities["San Jose"] = new City(-121.8863286,  37.3382082, "San Jose");
  cities["Austin"] = new City(-97.7430608, 30.267153, "Austin");
  cities["Jacksonville"] = new City(-81.655647, 	30.332184, "Jacksonville");
  cities["San Francisco"] = new City(-122.446747, 37.733795, "San Francisco");
  cities["Columbus"] = new City( -82.9987942, 39.9611755, "Columbus");
  cities["Fort Worth"] = new City(-97.309341, 32.768799, "Fort Worth");
  cities["Indianapolis"] = new City( -86.158068, 39.768403, "Indianapolis");
  cities["Charlotte"] = new City(-80.843124, 	35.227085, "Charlotte");
  cities["Seattle"] = new City(-122.335167, 47.608013, "Seattle");
  cities["Denver"] = new City(-104.991531, 	39.742043, "Denver");
  cities["Washington"] = new City(-77.009003, 38.889931, "Washington");
  return cities;
}

var cities = [];
var dataset = buildDataset();

$(document).ready(function() {
  $("#viewDiv").hide();

  $(".cityselector").click(function () {
    if($(this).hasClass("active")){
      $(this).removeClass("active");
      for(i = 0; i < cities.length; i++){
        if(cities[i].name == $(this).html())
          cities.splice(i, 1);
      }
    }else{
      $(this).addClass("active")
      cities.push(new City(dataset[$(this).html()].x, dataset[$(this).html()].y, $(this).html()));
    }
  });

  $("#submit").click(function () {
    var optimalPath = simulate(cities);
    change(optimalPath);
    $(".container").hide();
    $("#viewDiv").show();
  });
});
