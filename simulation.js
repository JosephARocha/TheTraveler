function City(x, y){
     this.x = x;
     this.y = y;

     this.distanceTo = function(city2){
        xDistance = Math.abs(this.x) - Math.abs(city2.x);
        yDistance = Math.abs(this.y) - Math.abs(city2.y);
        return Math.sqrt(xDistance*xDistance + yDistance*yDistance);
     };
}

function createCities(N){
     var tour = []
     for(i = 0; i < N; i++){
         newCity = new City(Math.random(), Math.random());
         tour.push(newCity);
     }
    return tour;
}

function totalDistance(tour){
    console.log(tour);
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

var tour = createCities(100);
var energy = totalDistance(tour);
console.log(energy);
var temperature = 10000.0;
var coolingRate = 0.003;
var bestEnergy = energy;
var bestTour = tour;
var steps = 0;

while(temperature > 1.0){
     steps+=1;
     var newTour = jQuery.extend(true, {}, tour);
    
     var position1 = Math.floor(Math.random() * 20);
     var position2 = Math.floor(Math.random() * 20);
     var temp = newTour[position1];
     newTour[position1] = newTour[position2];
     newTour[position2] = temp;
    
    var newEnergy = totalDistance(newTour);
    if(acceptanceProbability(energy, newEnergy, temperature) > (Math.floor(Math.random() * 1))){
      tour = newTour;
      bestTour = tour;
    
        if(energy < bestEnergy){
            bestEnergy = newEnergy;
            bestTour = tour;
        }
    }
    temperature*=1-coolingRate;
}

console.log(totalDistance(bestTour));
