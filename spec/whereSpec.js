describe("wheresDave", function() {
  describe("when the day and hour exactly match an entry", function() {
    var month                = 10;
    var date                 = 12;
    var hour                 = 5;
    var expectedLocation     = "foobar";
    var expectedAvailability = "email";
    var dataFound            = null;

    beforeEach(function() {
      var data = {};

      data[month] = {}
      data[month][date] = {}
      data[month][date][hour] = {
            where: expectedLocation,
        available: expectedAvailability
      };

      dataFound = wheresDave(data,month,date,hour);
    });
    it("returns the where for that time",function() {
      expect(dataFound["where"]).toBe(expectedLocation);
    });
    it("returns the availability for that time",function() {
      expect(dataFound["available"]).toBe(expectedAvailability);
    });
  });

  describe("when the current date/time is between two entries", function() {
    describe("during waking hours", function() {
      var month                = 10;
      var date                 = 12;
      var hour                 = 13;
      var expectedLocation     = "foobar";
      var expectedAvailability = "email";
      var dataFound            = null;

      beforeEach(function() {
        var data = {};

        data[month] = {}
        data[month][date] = {}
        data[month][date][hour] = {
          where: expectedLocation,
          available: expectedAvailability
        };
        data[month][date][hour+2] = {
          where: "bleorgh",
          available: "none"
        }

        dataFound = wheresDave(data,month,date,hour+1);
      });
      it("returns the where for that time",function() {
        expect(dataFound["where"]).toBe(expectedLocation);
      });
      it("returns the availability for that time",function() {
        expect(dataFound["available"]).toBe(expectedAvailability);
      });
    });

    describe("during sleeping hours", function() {
      describe("when nothing is going on", function() {
        var month                = 10;
        var date                 = 12;
        var hour                 = 13;
        var expectedLocation     = "foobar";
        var expectedAvailability = "email";
        var dataFound            = null;

        beforeEach(function() {
          var data = {};

          data[month] = {}
          data[month][date] = {}
          data[month][date-1] = {}
          data[month][date-1][hour] = {
            where: expectedLocation,
            available: expectedAvailability
          };
          data[month][date][hour+2] = {
            where: "bleorgh",
            available: "none"
          }

          dataFound = wheresDave(data,month,date,3);
        });
        it("returns the where for that time",function() {
          expect(dataFound["where"]).toBe("Asleep");
        });
        it("returns the availability for that time",function() {
          expect(dataFound["available"]).toBe("asleep");
        });
      });

      describe("when something started during sleeping hours", function() {
        var month                = 10;
        var date                 = 12;
        var hour                 = 13;
        var expectedLocation     = "foobar";
        var expectedAvailability = "email";
        var dataFound            = null;

        beforeEach(function() {
          var data = {};

          data[month] = {}
          data[month][date] = {}
          data[month][date][2] = {
            where: expectedLocation,
            available: expectedAvailability
          };
          data[month][date][12] = {
            where: "bleorgh",
            available: "none"
          }

          dataFound = wheresDave(data,month,date,3);
        });
        it("returns the where for that time",function() {
          expect(dataFound["where"]).toBe(expectedLocation);
        });
        it("returns the availability for that time",function() {
          expect(dataFound["available"]).toBe(expectedAvailability);
        });
      });
    });
  });
  describe("when the current date/time is between two entries", function() {
    var month                = 10;
    var date                 = 12;
    var hour                 = 13;
    var expectedLocation     = "foobar";
    var expectedAvailability = "email";
    var dataFound            = null;

    beforeEach(function() {
      var data = {};

      data[month] = {}
      data[month][date] = {}
      data[month][date][hour] = {
            where: expectedLocation,
        available: expectedAvailability
      };
      data[month][date][hour+2] = {
            where: "bleorgh",
        available: "none"
      }

      dataFound = wheresDave(data,month,date,hour+1);
    });
    it("returns the where for that time",function() {
      expect(dataFound["where"]).toBe(expectedLocation);
    });
    it("returns the availability for that time",function() {
      expect(dataFound["available"]).toBe(expectedAvailability);
    });
  });

  describe("when outside the bounds of the dataset", function() {
    var month     = 10;
    var date      = 12;
    var hour      = 10;
    var dataFound = null;
    var data      = {};
    var lastWhere = "foo";
    var lastAvailable = "bar";

    beforeEach(function() {

      data[month] = {}
      data[month][date] = {}
      data[month][date][hour] = {
            where: lastWhere,
        available: lastAvailable
      };

    });

    describe("when the day and hour is earlier than the first entry", function() {
      describe("when the month does not match", function() {
        beforeEach(function() {
          dataFound = wheresDave(data,month-1,date,hour);
        });
        it("returns an unknown where",function() {
          expect(dataFound["where"]).toBe("unknown");
        });
        it("returns an unknown availability",function() {
          expect(dataFound["available"]).toBe("unknown");
        });
      });
      describe("when the month matches, but not the date", function() {
        beforeEach(function() {
          dataFound = wheresDave(data,month,date-1,hour);
        });
        it("returns an unknown where",function() {
          expect(dataFound["where"]).toBe("unknown");
        });
        it("returns an unknown availability",function() {
          expect(dataFound["available"]).toBe("unknown");
        });
      });
      describe("when the month and date match, but not the hour", function() {
        beforeEach(function() {
          dataFound = wheresDave(data,month,date,hour-1);
        });
        it("returns an unknown where",function() {
          expect(dataFound["where"]).toBe("unknown");
        });
        it("returns an unknown availability",function() {
          expect(dataFound["available"]).toBe("unknown");
        });
      });
    });

    describe("when the day and hour is later than the last entry", function() {
      describe("when the month does not match", function() {
        beforeEach(function() {
          dataFound = wheresDave(data,month+1,date,hour);
        });
        it("returns an unknown where",function() {
          expect(dataFound["where"]).toBe("foo");
        });
        it("returns an unknown availability",function() {
          expect(dataFound["available"]).toBe("bar");
        });
      });
      describe("when the month matches, but not the date", function() {
        beforeEach(function() {
          dataFound = wheresDave(data,month,date+1,hour);
        });
        it("returns an unknown where",function() {
          expect(dataFound["where"]).toBe("foo");
        });
        it("returns an unknown availability",function() {
          expect(dataFound["available"]).toBe("bar");
        });
      });
      describe("when the month and date match, but not the hour", function() {
        beforeEach(function() {
          dataFound = wheresDave(data,month,date,hour+1);
        });
        it("returns an unknown where",function() {
          expect(dataFound["where"]).toBe("foo");
        });
        it("returns an unknown availability",function() {
          expect(dataFound["available"]).toBe("bar");
        });
      });
    });
  });
});
