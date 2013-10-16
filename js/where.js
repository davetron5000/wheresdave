var UNKNOWN = {
  where: "unknown",
  available: "unknown"
};

var ASLEEP = {
  where: "Asleep",
  available: "asleep"
};

var HAVENT_LEFT = {
  where: "Haven't Left Yet",
  available: "notleft"
}

var wheresDave = function(data,month,day,hour) {
  if (month < 10) {
    return HAVENT_LEFT;
  }
  if (month == 10) {
    if ( day < 17 ) {
      return HAVENT_LEFT;
    }
    else if ( (day == 17) && (hour < 5) ) {
      return HAVENT_LEFT;
    }
  }


  var previousFound   = UNKNOWN,
      previousDay     = 0,
      previousHour    = 0,
      currentPrevious = UNKNOWN,
      currentMonth    = 1,
      currentDay      = 1,
      currentHour     = 0;

  while (currentMonth <= 12) {
    while (currentDay <= 31) {
      while (currentHour <= 23) {
        currentHour = currentHour + 1;
        if (data[currentMonth] && data[currentMonth][currentDay] && data[currentMonth][currentDay][currentHour]) {
          previousFound = data[currentMonth][currentDay][currentHour];
          previousDay   = currentDay;
          previousHour  = currentHour;
        }
        if ( (currentMonth >= month) && (currentDay >= day) && (currentHour >= hour) ) {
          if (hour < 8) {
            if (previousDay == day) {
              return previousFound;
            }
            else {
              return ASLEEP;
            }
          }
          else {
            return previousFound;
          }
        }
      }
      currentDay  = currentDay + 1;
      currentHour = 0;
    }
    currentMonth = currentMonth + 1;
    currentDay   = 1;
  }
  return UNKNOWN;
};

var availability = {
  "email": "Limited Access to Email only",
  "computer-limited": "Limited Access to a Computer",
  "computer": "Easy Access a Computer",
  "none": "Completely inaccessible",
  "flight": "Completely inaccessible",
  "asleep": "Sleeping",
  "ready": "Fully Armed and Operational!",
}
