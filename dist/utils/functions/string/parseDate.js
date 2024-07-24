"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDate = void 0;
function parseDate(date) {
    if (!date)
        return "0 days";
    // Get the current date
    var currentDate = new Date();
    // Calculate the difference in milliseconds between the two dates
    var difference = currentDate.getTime() - date.getTime();
    // Convert the difference from milliseconds to years, months, and days
    var years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
    difference -= years * 1000 * 60 * 60 * 24 * 365;
    var months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30.44)); // Using average days in a month
    difference -= months * 1000 * 60 * 60 * 24 * 30.44;
    var days = Math.floor(difference / (1000 * 60 * 60 * 24));
    difference -= days * 1000 * 60 * 60 * 24;
    var hours = Math.floor(difference / (1000 * 60 * 60));
    // Construct the output string
    var differenceString = "";
    if (years > 0) {
        differenceString += years + " año" + (years === 1 ? "" : "s") + ", ";
    }
    if (months > 0) {
        differenceString += months + " mes" + (months === 1 ? "" : "es") + ", ";
    }
    if (days > 0) {
        differenceString += days + " día" + (days === 1 ? "" : "s");
    }
    if (hours > 0 && !days) {
        differenceString += hours + " hora" + (hours === 1 ? "" : "s");
    }
    // Remove the trailing comma and space if needed
    if (differenceString.endsWith(", ")) {
        differenceString = differenceString.slice(0, -2);
    }
    return differenceString;
}
exports.parseDate = parseDate;
//# sourceMappingURL=parseDate.js.map