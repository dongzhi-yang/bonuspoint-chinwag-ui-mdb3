// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by chinwag-ui-mdb3.js.
import { name as packageName } from "meteor/bonuspoint:chinwag-ui-mdb3";

// Write your tests here!
// Here is an example.
Tinytest.add('chinwag-ui-mdb3 - example', function (test) {
  test.equal(packageName, "chinwag-ui-mdb3");
});
