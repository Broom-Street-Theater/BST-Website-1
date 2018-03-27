var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var KIP;
(function (KIP) {
    /**...........................................................................
     * contains
     * ...........................................................................
     * Determine whether a particular element is contained in an array
     *
     * @param 	arr		The array to check
     * @param 	value 	The value to check for
     *
     * @returns	True if the value is contained in the array
     * ...........................................................................
     */
    function contains(arr, value) {
        return (indexOf(arr, value) !== -1);
    }
    KIP.contains = contains;
    /**...........................................................................
     * indexOf
     * ...........................................................................
     * Find the index of a particular value in the array
     *
     * @param	arr		The array to search
     * @param	value	The value to look for
     *
     * @returns	The first index of the value in the array or -1 if it doesn't exist
     * ...........................................................................
     */
    function indexOf(arr, value, equalityFunction) {
        for (var idx = 0; idx < arr.length; idx += 1) {
            if (equalityFunction) {
                if (equalityFunction(arr[idx], value)) {
                    return idx;
                }
            }
            else if (arr[idx] === value) {
                return idx;
            }
        }
        return -1;
    }
    KIP.indexOf = indexOf;
    /**...........................................................................
     * remove
     * ...........................................................................
     * Remove a value (or all instances of a value) from the array
     *
     * @param	arr			The array to remove from
     * @param	value		The value to search for
     * @param	removeAll	If true, finds all instances of the value in the array
     *
     * @returns	The array with all instances of the value removed
     * ...........................................................................
     */
    function remove(arr, value, removeAll, equalityFunction) {
        var idx = indexOf(arr, value, equalityFunction);
        // loop until we've removed all of the elements we intend to
        while (idx !== -1) {
            arr.splice(idx, 1);
            if (removeAll) {
                idx = indexOf(arr, value);
            }
            else {
                idx = -1;
            }
        }
        // return the spliced array
        return arr;
    }
    KIP.remove = remove;
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    function cloneRect(rect) {
        var out = {
            x: rect.x,
            y: rect.y,
            w: rect.w,
            h: rect.h
        };
        return out;
    }
    KIP.cloneRect = cloneRect;
    function clonePoint(point) {
        var out = {
            x: point.x,
            y: point.y
        };
        return out;
    }
    KIP.clonePoint = clonePoint;
    function clonePointArray(points) {
        var out = [];
        var pt;
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            pt = points_1[_i];
            var clone = clonePoint(pt);
            out.push(clone);
        }
        return out;
    }
    KIP.clonePointArray = clonePointArray;
    /**...........................................................................
     * cloneObject
     * ...........................................................................
     * Generic function to try to clone any object, using JSON stringify + parse
     *
     * @param 	obj		The object to clone
     *
     * @returns	The cloned elements
     * ...........................................................................
     */
    function cloneObject(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    KIP.cloneObject = cloneObject;
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    // Constants for theming colors
    KIP.THEME_BG_COLOR_CLS = "themeBGColor";
    KIP.THEME_COLOR_CLS = "themeColor";
    KIP.THEME_COLOR_HOVER_CLS = "themeBGHoverColor";
    /**...........................................................................
     * addClass
     * ...........................................................................
     * Allows a user to safely add a CSS class to an element's existing list of CSS classes
     * @param {HTMLElement}   elem      The element that should have its class updated
     * @param {string}        newClass  The class to add the element
     * ...........................................................................
     */
    function addClass(elem, newClass) {
        var cls;
        var e;
        if (!elem || !newClass)
            return;
        // Handle Drawables being passed in
        if (KIP.isDrawable(elem)) {
            e = elem.base;
        }
        else {
            e = elem;
        }
        // Still suport setting the class if the class is not originally set
        cls = e.getAttribute("class");
        if (!cls) {
            e.setAttribute("class", newClass);
            return;
        }
        cls = " " + cls + " ";
        if (cls.indexOf(" " + newClass + " ") === -1) {
            cls = cls + newClass;
            e.setAttribute("class", KIP.trim(cls));
        }
    }
    KIP.addClass = addClass;
    ;
    /**...........................................................................
     * removeClass
     * ...........................................................................
     * Allows a user to safely remove a CSS class to an element's existing list of CSS classes
     * @param {HTMLElement} elem      The element that should have its class updated
     * @param {string}      newClass  The class to remove from the element
     * ...........................................................................
     */
    function removeClass(elem, oldClass) {
        "use strict";
        var cls;
        var len;
        var e;
        // Quit if we're missing something
        if (!elem || !oldClass)
            return;
        // Handle Drawables being passed in
        if (KIP.isDrawable(elem)) {
            e = elem.base;
        }
        else {
            e = elem;
        }
        // Pull out the CSS class
        cls = " " + e.getAttribute("class") + " ";
        len = cls.length;
        cls = cls.replace(" " + oldClass + " ", " ");
        // Only reset the class attribute if it actually changed
        if (cls.length !== len) {
            e.setAttribute("class", KIP.trim(cls));
        }
    }
    KIP.removeClass = removeClass;
    ;
    /**...........................................................................
     * hasClass
     * ...........................................................................
     * Checks whether a provided HTML element has a CSS class applied
     * @param  {HTMLElement}  elem  The element to check
     * @param  {String}       cls   The CSS class to check for
     * @return {Boolean}            True if the element has the CSS class applied; false otherwise
     * ...........................................................................
     */
    function hasClass(elem, cls) {
        var e;
        var cur_cls;
        if (!elem)
            return;
        // Handle Drawables being passed in
        if (KIP.isDrawable(elem)) {
            e = elem.base;
        }
        else {
            e = elem;
        }
        // Grab the current CSS class and check if the passed-in class is present
        cur_cls = " " + e.getAttribute("class") + " ";
        if (cur_cls.indexOf(" " + cls + " ") === -1) {
            return false;
        }
        return true;
    }
    KIP.hasClass = hasClass;
    ;
    /**
     * Sets the CSS definition for a given class and attribute.
     *
     * @param {string} cls   - The class to change
     * @param {string} item  - The attribute within the class to update
     * @param {string} val   - The new value to set the attribute to
     * @param {bool} force   - If true, will create the CSS attribute even if it doesn't exist
     *
     * @return {bool} True if the CSS was successfully set, false otherwise
     */
    function setProperty(cls, item, val, force) {
        var i;
        var css;
        var sIdx;
        var rules;
        var rule;
        // Loop through all of the stylesheets we have available
        for (sIdx = 0; sIdx < document.styleSheets.length; sIdx += 1) {
            // Pull in the appropriate index for the browser we're using
            css = document.all ? 'rules' : 'cssRules'; //cross browser
            rules = document.styleSheets[sIdx][css];
            // If we have rules to loop over...
            if (rules) {
                // ... loop through them and check if they are the class we are looking for
                for (i = 0; i < rules.length; i += 1) {
                    rule = rules[i];
                    // If we have a match on the class...
                    if (rule.selectorText === cls) {
                        // ... and the class has the item we're looking for ...
                        if ((rule.style[item]) || (force)) {
                            //... set it to our new value, and return true.
                            rule.style[item] = val;
                            return true;
                        }
                    }
                }
            }
        }
        // Return false if we didn't change anything
        return false;
    }
    KIP.setProperty = setProperty;
    ;
    /**
     * Grabs the value of a given CSS class's attribute
     *
     * @param {string} cls  - The CSS class to look within
     * @param {string} item - The attribute we want to grab the value for
     *
     * @return {string} The value of that particular CSS class's attribute
     */
    function getProperty(cls, item) {
        var i;
        var css;
        var sIdx;
        var rules;
        var rule;
        // Loop through all of the stylesheets we have available
        for (sIdx = 0; sIdx < document.styleSheets.length; sIdx += 1) {
            // Pull in the appropriate index for the browser we're using
            css = document.all ? 'rules' : 'cssRules'; //cross browser
            rules = document.styleSheets[sIdx][css];
            // If we have an index...
            if (rules) {
                // ... loop through all and check for the actual class
                for (i = 0; i < rules.length; i += 1) {
                    rule = rules[i];
                    // If we find the class...
                    if (rule.selectorText === cls) {
                        // ... return what the item is set to (if anything)
                        return (rule.style[item]);
                    }
                }
            }
        }
        // Return a blank string if it couldn't be found
        return "";
    }
    KIP.getProperty = getProperty;
    ;
    /**
     * Creates a CSS class and adds it to the style of the document
     * @param  {string}      selector   CSS selector to use to define what elements get this style
     * @param  {any}         attr       Array of css attributes that should be applied to the class
     * @param  {boolean}     [noAppend] True if we shouldn't actually add the class to the documment yet
     * @return {HTMLElement}            The CSS style tag that was created
     */
    function createClass(selector, attr, noAppend) {
        var cls;
        var a;
        var styles;
        // Grab the style node of this document (or create it if it doesn't exist)
        styles = document.getElementsByTagName("style");
        if (styles.length > 0) {
            cls = styles[0];
        }
        else {
            cls = document.createElement("style");
            cls.innerHTML = "";
        }
        // Loop through the attributes we were passed in to create the class
        cls.innerHTML += "\n" + selector + " {\n";
        for (a in attr) {
            if (attr.hasOwnProperty(a)) {
                if (attr[a].key) {
                    cls.innerHTML += "\t" + attr[a].key + ": " + attr[a].val + ";\n";
                }
                else {
                    cls.innerHTML += "\t" + a + " : " + attr[a] + ";\n";
                }
            }
        }
        cls.innerHTML += "\n}";
        // Append the class to the head of the document
        if (!noAppend)
            document.head.appendChild(cls);
        // Return the style node
        return cls;
    }
    KIP.createClass = createClass;
    /**
     * Gets the computed style of a given element
     *
     * @param {HTMLElement} elem - The element we are getting the style of
     * @param {string} attr - If passed in, the attribute to grab from the element's style
     *
     * @return {string} Either the particular value for the passed in attribute, or the whole style array.
     */
    function getComputedStyle(elem, attr) {
        var style;
        var e;
        // Handle Drawables being passed in
        if (elem.draw !== undefined) {
            e = elem.base;
        }
        else {
            e = elem;
        }
        // Use the library function on the window first
        if (window.getComputedStyle) {
            style = window.getComputedStyle(e);
            if (attr) {
                return style.getPropertyValue(attr);
            }
            else {
                return style;
            }
            // If that doesn't work, maybe it's through the currentStyle property
        }
        else if (e.currentStyle) {
            style = e.currentStyle;
            if (attr) {
                return style[attr];
            }
            else {
                return style;
            }
        }
        return null;
    }
    KIP.getComputedStyle = getComputedStyle;
    /** adds a generic hidden class to the document */
    function addHiddenClass() {
        var cls;
        cls = {
            "display": "none"
        };
        createClass(".hidden", cls);
    }
    KIP.addHiddenClass = addHiddenClass;
    /** Adds the "unselectable" class definition to the document */
    function addUnselectableClass() {
        var cls;
        cls = {
            "user-select": "none",
            "-moz-user-select": "none",
            "-webkit-user-select": "none",
            "khtml-user-select": "none",
            "o-user-select": "none"
        };
        createClass(".unselectable", cls);
    }
    KIP.addUnselectableClass = addUnselectableClass;
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    var Dates;
    (function (Dates) {
        /**
         * @file Helper functions for working with dates
         * @author Kip Price
         * @version 1.0
         * @since 1.1
         */
        /**
         *	Finds the difference in days between two date objects
         *	@param {Date} a - The first date to compare
         *	@param {Date} b - The second date to compare
         *	@param {Boolean} [signed] - If true, will take the difference in order passed in (e.g. A - B)
         *	@param {Boolean} [includeTime] - If true, will take the ms difference instead of the day difference
         *  @param {boolean} [returnMilli] - If true, returns a value in milliseconds even if milliseconds weren't compared
         **/
        function dateDiff(a, b, signed, includeTime, returnMilli) {
            var ms;
            var diff;
            var dir;
            ms = (1000 * 60 * 60 * 24);
            // clear time data if we don't care about it
            if (!includeTime) {
                a = clearTimeInfo(a, true);
                b = clearTimeInfo(b, true);
            }
            // calculate the date diff in milliseconds
            if ((a > b) || signed) {
                diff = (a - b);
            }
            else {
                diff = (b - a);
            }
            // if we don't want the response in milliseconds, return the days value (including fractional component if appropriate)
            if (!returnMilli) {
                diff = diff / ms;
            }
            return diff;
        }
        Dates.dateDiff = dateDiff;
        ;
        /**
         * Grabs the current day, default without any time data
         * @param  {boolean} include_time - True if we shouldn't exclude time data
         * @return {Date}                 Today's date
         */
        function getToday(include_time) {
            "use strict";
            var ret;
            ret = new Date();
            if (include_time)
                return ret;
            // Clear out time data
            ret = clearTimeInfo(ret);
            return ret;
        }
        Dates.getToday = getToday;
        ;
        /**
         * Clear out all time info associated with the date, including the timezone
         * @param date - the original date to clear data from
         * @returns The time-agnostic date
         */
        function clearTimeInfo(date, clearTZ) {
            var dateStr = shortDate(date);
            var outDate;
            if (clearTZ) {
                outDate = new Date(dateStr + " 00:00Z"); // Convert to this timezone and to the particular date
            }
            else {
                outDate = new Date(dateStr);
            }
            return outDate;
        }
        Dates.clearTimeInfo = clearTimeInfo;
        /**
         * Compares two dates to determine the business day difference between them
         * @param a - The first date to compare
         * @param b - The second date to compare
         * @param signed - True if we should compare the dates in order (e.g. Date A - Date B)
         * @param includeTime - If true, also compares the time
         * @param returnMilli - Returns the date difference in milliseconds instead of days
         * @returns The business-date diff between the 2 dates
         */
        function businessDateDiff(a, b, signed, includeTime, returnMilli) {
            "use strict";
            var diff;
            var dayOfWeek;
            var dir;
            var idx;
            // Calculate the standard date
            diff = dateDiff(a, b, signed, includeTime, returnMilli);
            // Grab the 2nd day of the week, because we skip the first day
            dayOfWeek = (b > a ? a.getDay() : b.getDay()) + 1;
            dayOfWeek %= 7;
            if (dayOfWeek < 0) {
                dayOfWeek = 6;
            }
            // Loop through the days between the two dates and pull out any weekend days
            var weekendDays = 0;
            for (idx = 0; idx < Math.abs(diff); idx += 1) {
                // If this day is a weekend, add it to the # of weekend days
                if (dayOfWeek === 0 || dayOfWeek === 6) {
                    weekendDays += 1;
                }
                // grab the next day, based on the date direction
                dayOfWeek += 1;
                dayOfWeek %= 7;
                if (dayOfWeek < 0) {
                    dayOfWeek = 6;
                }
            }
            // determine if we need to add or subtract to change the dates
            if (diff < 0) {
                dir = -1;
            }
            else {
                dir = 1;
            }
            return diff - (weekendDays * dir);
        }
        Dates.businessDateDiff = businessDateDiff;
        ;
        /**
         * Gets the display string of the date in a short format (MM/DD/YYYY)
         * @param {Date} dt - The date to get the short date for
         */
        function shortDate(dt) {
            "use strict";
            if (!dt) {
                return "";
            }
            var yr;
            yr = getShortYear(dt);
            return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + yr;
        }
        Dates.shortDate = shortDate;
        ;
        // InputDateFmt
        //-------------------------------------------
        /**
         * Converts the date into the format used by date inputs
         * @param {Date} dt - The date to convert
         */
        function inputDateFmt(dt) {
            "use strict";
            var m;
            var d;
            var y;
            y = dt.getFullYear();
            m = (dt.getMonth() + 1);
            if (m < 10)
                m = "0" + m;
            d = +dt.getDate();
            if (d < 10)
                d = "0" + d;
            return (dt.getFullYear() + "-" + m + "-" + d);
        }
        Dates.inputDateFmt = inputDateFmt;
        ;
        // InputToDate
        //-------------------------------------------
        /**
         * Takes a string returned by an input field for a date and converts it to a JS date
         * @param {string} iDt - The date string to convert (if available)
         * @param {string} iTime - The time string to convert (if available)
         */
        function inputToDate(iDt, iTime) {
            var outDate;
            // Handle the input date string
            if (iDt) {
                var dtArr = iDt.split("-");
                outDate = new Date(+dtArr[0], +dtArr[1] - 1, +dtArr[2]);
            }
            else {
                outDate = getToday();
            }
            // Handle the input time string
            if (iTime) {
                var timeArr = iTime.split(":");
                outDate.setHours(+timeArr[0]);
                outDate.setMinutes(+timeArr[1]);
            }
            return outDate;
        }
        Dates.inputToDate = inputToDate;
        ;
        /**
         * Gets the display string of the time in a short format (HH:MM)
         * @param {Date} dt - The date to extract the time from
         * @param {Boolean} withExtra - If true, will display as HH:MM AM/PM instead of military time
         */
        function shortTime(dt, withExtra) {
            "use strict";
            var min;
            var min_str;
            var hours;
            var half;
            //Get the minutes value for the current date
            min = +dt.getMinutes();
            hours = +dt.getHours();
            half = "";
            //We need to pad minutes to get a recognizable time format
            if (min < 10) {
                min_str = "0" + min;
            }
            else {
                min_str = min.toString();
            }
            if (withExtra) {
                half = " AM";
                if (hours >= 12)
                    half = " PM";
                if (hours > 12)
                    hours -= 12;
            }
            //Return unpadded hours (but in military time) and padded minutes.
            return hours + ":" + min_str + half;
        }
        Dates.shortTime = shortTime;
        ;
        /**
         * Gets the display string for a date and time
         * @param {Date} dt - The date to extract the formatted string from
         * @param {Boolean} withExtra - If true, uses AM/PM format instead of military time.
         */
        function shortDateTime(dt, with_extra) {
            "use strict";
            return shortDate(dt) + " " + shortTime(dt, with_extra);
        }
        Dates.shortDateTime = shortDateTime;
        ;
        function stopwatchDisplay(milli, noLeadingZeros, noBlanks) {
            "use strict";
            var seconds;
            var minutes;
            var hours;
            var days;
            var arr;
            var sec_str;
            var min_str;
            var hr_str;
            seconds = Math.floor(milli / 1000);
            milli %= 1000;
            minutes = Math.floor(seconds / 60);
            seconds %= 60;
            hours = Math.floor(minutes / 60);
            minutes %= 60;
            days = Math.floor(hours / 24);
            hours %= 24;
            // Add the leading zeros if appropriate
            if (!noLeadingZeros) {
                sec_str = KIP.addLeadingZeroes(2, seconds);
                min_str = KIP.addLeadingZeroes(2, minutes);
                hr_str = KIP.addLeadingZeroes(2, hours);
            }
            else {
                sec_str = seconds.toString();
                min_str = minutes.toString();
                hr_str = hours.toString();
            }
            return days + "D  " + hr_str + ":" + min_str + ":" + sec_str + " '" + milli;
        }
        Dates.stopwatchDisplay = stopwatchDisplay;
        ;
        function addToDate(date, counts) {
            if (counts.milliseconds) {
                date.setMilliseconds(date.getMilliseconds() + counts.milliseconds);
            }
            if (counts.seconds) {
                date.setSeconds(date.getSeconds() + counts.seconds);
            }
            if (counts.minutes) {
                date.setMinutes(date.getMinutes() + counts.minutes);
            }
            if (counts.hours) {
                date.setHours(date.getHours() + counts.hours);
            }
            if (counts.days) {
                date.setDate(date.getDate() + counts.days);
            }
            if (counts.months) {
                date.setMonth(date.getMonth() + counts.months);
            }
            if (counts.years) {
                date.setFullYear(date.getFullYear() + counts.years);
            }
            return date;
        }
        Dates.addToDate = addToDate;
        ;
        /**
         * gets the name of the month given a particular date
         * @param date - the date to get the month from
         * @param [short] - If true, returns the short version of the month name
         * @returns string of month name
         */
        function getMonthName(date, short) {
            switch (date.getMonth()) {
                case 0:
                    if (short)
                        return "Jan";
                    return "January";
                case 1:
                    if (short)
                        return "Feb";
                    return "February";
                case 2:
                    if (short)
                        return "Mar";
                    return "March";
                case 3:
                    if (short)
                        return "Apr";
                    return "April";
                case 4:
                    return "May";
                case 5:
                    if (short)
                        return "Jun";
                    return "June";
                case 6:
                    if (short)
                        return "Jul";
                    return "July";
                case 7:
                    if (short)
                        return "Aug";
                    return "August";
                case 8:
                    if (short)
                        return "Sept";
                    return "September";
                case 9:
                    if (short)
                        return "Oct";
                    return "October";
                case 10:
                    if (short)
                        return "Nov";
                    return "November";
                case 11:
                    if (short)
                        return "Dec";
                    return "December";
            }
            return "";
        }
        Dates.getMonthName = getMonthName;
        ;
        /**
         * Get Day Of Week
         * @param date - the date to grab the d.o.w. from
         * @param [short] - If true, returns the short version of the month name
         * @returns string of day-of-week name
         */
        function getDayOfWeek(date, short) {
            "use strict";
            switch (date.getDay()) {
                case 0:
                    if (short)
                        return "Sun";
                    return "Sunday";
                case 1:
                    if (short)
                        return "Mon";
                    return "Monday";
                case 2:
                    if (short)
                        return "Tues";
                    return "Tuesday";
                case 3:
                    if (short)
                        return "Wed";
                    return "Wednesday";
                case 4:
                    if (short)
                        return "Thurs";
                    return "Thursday";
                case 5:
                    if (short)
                        return "Fri";
                    return "Friday";
                case 6:
                    if (short)
                        return "Sat";
                    return "Saturday";
            }
            return "";
        }
        Dates.getDayOfWeek = getDayOfWeek;
        ;
        /** grab the short version of the year */
        function getShortYear(date) {
            return (+date.getFullYear() % 100);
        }
        Dates.getShortYear = getShortYear;
        function isWeekend(date) {
            var dayOfWeek = date.getDay();
            if (dayOfWeek === 0) {
                return true;
            } // SUNDAY
            if (dayOfWeek === 6) {
                return true;
            } // SATURDAY
            return false; // EVERYTHING ELSE
        }
        Dates.isWeekend = isWeekend;
        function isToday(date) {
            var today = getToday();
            var cloneDate = clearTimeInfo(date);
            return isSameDate(today, cloneDate);
        }
        Dates.isToday = isToday;
        function isSameDate(dateA, dateB) {
            if (shortDate(dateA) === shortDate(dateB)) {
                return true;
            }
            return false;
        }
        Dates.isSameDate = isSameDate;
        /**
         * getDisplayDuration
         *
         * Create a display string for a time duration
         * @param 	counts	The duration to stringify
         * @returns	The display duration string
         *
         */
        function getDisplayDuration(counts) {
            // update up to the highest available range for dates
            _updateDateDifferences(1000, counts, "milliseconds", "seconds");
            _updateDateDifferences(60, counts, "seconds", "minutes");
            _updateDateDifferences(60, counts, "minutes", "hours");
            _updateDateDifferences(24, counts, "hours", "days");
            _updateDateDifferences(30, counts, "days", "months");
            _updateDateDifferences(12, counts, "months", "years");
            // create the string based on the counts
            var out = [];
            if (counts.years) {
                out.push(_createPluralString(counts.years, "year"));
            }
            if (counts.months) {
                out.push(_createPluralString(counts.months, "month"));
            }
            if (counts.days) {
                out.push(_createPluralString(counts.days, "day"));
            }
            if (counts.hours) {
                out.push(_createPluralString(counts.hours, "hour"));
            }
            if (counts.minutes) {
                out.push(_createPluralString(counts.minutes, "minute"));
            }
            if (counts.seconds) {
                out.push(_createPluralString(counts.seconds, "second"));
            }
            if (counts.milliseconds) {
                out.push(_createPluralString(counts.milliseconds, "millisecond"));
            }
            return out.join(" ");
        }
        Dates.getDisplayDuration = getDisplayDuration;
        function _updateDateDifferences(divisor, out, startKey, endKey) {
            if (!out[startKey]) {
                out[startKey] = 0;
            }
            if (!out[endKey]) {
                out[endKey] = 0;
            }
            var dividend = out[startKey];
            var remainder = dividend % divisor;
            var quotient = Math.floor(dividend / divisor);
            out[startKey] = remainder;
            out[endKey] += quotient;
            return out;
        }
        function _createPluralString(amount, singular, plural) {
            if (amount === 1) {
                return amount + " " + singular;
            }
            else {
                if (!plural) {
                    plural = singular + "s";
                }
                return amount + " " + plural;
            }
        }
    })(Dates = KIP.Dates || (KIP.Dates = {}));
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    KIP.IS_DEBUG = false;
    /**...........................................................................
     * printObject
     * ...........................................................................
     * @param obj
     * ...........................................................................
     */
    function printObject(obj) {
        var str = getObjectString(obj);
        console.log(str);
    }
    KIP.printObject = printObject;
    /**...........................................................................
     * getObjectString
     * ...........................................................................
     *
     * @param   obj         The object to print
     * @param   prefix      The current prefix to use for this layer
     *
     * @returns The created string
     * ...........................................................................
     */
    function getObjectString(obj, prefix) {
        if (!prefix) {
            prefix = "";
        }
        if ((typeof obj === "string") ||
            (typeof obj === "number") ||
            (typeof obj === "boolean") ||
            (obj instanceof Date) ||
            (obj instanceof Function)) {
            return obj.toString();
        }
        var outputStr = "";
        outputStr += prefix + "{";
        KIP.map(obj, function (elem, key) {
            outputStr += "\n  " + prefix + key + " : " + getObjectString(elem, prefix + "  ");
        });
        outputStr += "\n" + prefix + "}\n";
        return outputStr;
    }
    KIP.getObjectString = getObjectString;
})(KIP || (KIP = {}));
///<reference path="css.ts" />
var KIP;
(function (KIP) {
    //#endregion
    //#region PUBLIC FUNCTIONS FOR CREATING ELEMENTS
    /**...........................................................................
     * CreateSimpleElement
     * ...........................................................................
     * Creates a div element with the provided id, class, content, and attributes.
     *
     * @param {string} id - The ID to assign the element {optional}
     * @param {string} cls - The class to assign the element {optional}
     * @param {string} content - What to include as the contents of the div {optional}
     * @param {arr} attr - An array of key-value pairs that sets all other attributes for the element
     *
     * @return {HTMLElement} The created element, with all specified parameters included.
     * ...........................................................................
     */
    function createSimpleElement(id, cls, content, attr, children, parent) {
        var obj;
        obj = {};
        obj.id = id; // Set the element's ID
        obj.type = "div"; // Set the type of element to create
        obj.content = content; // Set what the content of the element should be
        obj.cls = cls; // Set the appropriate CSS class for the element
        obj.attr = attr; // Set a list of attributes for the element
        obj.children = children; // Attach children to to the element
        obj.parent = parent; // Attach the created element to the appropriate parent
        // Use our standard function for creating elements
        return createElement(obj);
    }
    KIP.createSimpleElement = createSimpleElement;
    ;
    /**...........................................................................
     * createElement
     * ...........................................................................
     * Creates an HTML element with the attributes that are passed in through the
     * object.
     *
     * @param   obj   The object to base the element off of
     * @returns The HTML element with all attributes specified by the object
     * ...........................................................................
     */
    function createElement(obj) {
        // #region Variable declaration
        var elem;
        var a;
        var c;
        var selector;
        var child;
        var type;
        // #endregion
        type = obj.type || "div";
        elem = document.createElement(type);
        if (obj.id) {
            elem.setAttribute("id", obj.id);
        }
        // Set the CSS class of the object
        if (obj.cls) {
            // Check that the class is a string before setting it
            if (typeof obj.cls === typeof "string") {
                elem.setAttribute("class", obj.cls);
                // If it's an object, we need to create the class(es) first
            }
            else if (typeof obj.cls === "object") {
                for (selector in obj.cls) {
                    if (obj.cls.hasOwnProperty(selector)) {
                        // Create the CSS class using the specified parameters
                        KIP.createClass(selector, obj.cls[selector]);
                        // Add the CSS class to the element itself
                        KIP.addClass(elem, selector);
                    }
                }
            }
        }
        // Set the first bit of content in the element (guaranteed to come before children)
        if (obj.before_content) {
            elem.innerHTML = obj.before_content;
        }
        // Also check for just plain "Content"
        if (obj.content) {
            elem.innerHTML += obj.content;
        }
        // Loop through all of the children listed for this element
        if (obj.children) {
            for (c in obj.children) {
                if (obj.children.hasOwnProperty(c)) {
                    if (!obj.children[c]) {
                        throw new Error("cannot append non-existent child element");
                    }
                    if (obj.children[c].setAttribute) {
                        elem.appendChild(obj.children[c]);
                    }
                    else {
                        child = createElement(obj.children[c]);
                        elem.appendChild(child);
                    }
                }
            }
        }
        // Loop through all other attributes that we should be setting
        if (obj.attr) {
            for (a in obj.attr) {
                if (obj.attr.hasOwnProperty(a)) {
                    if (!obj.attr[a])
                        continue;
                    if (obj.attr[a].key) {
                        if (obj.attr[a].key === "value") {
                            elem.value = obj.attr[a].val;
                        }
                        else {
                            elem.setAttribute(obj.attr[a].key, obj.attr[a].val);
                        }
                    }
                    else {
                        if (a === "value") {
                            elem.value = obj.attr[a];
                        }
                        else {
                            elem.setAttribute(a, obj.attr[a]);
                        }
                    }
                }
            }
        }
        // Add any after html
        if (obj.after_content) {
            elem.innerHTML += obj.after_content;
        }
        // Attach the object to a parent if appropriate
        if (obj.parent) {
            obj.parent.appendChild(elem);
        }
        // add any event listeners the user requested
        if (obj.eventListeners) {
            KIP.map(obj.eventListeners, function (listener, key) {
                elem.addEventListener(key, listener);
            });
        }
        return elem;
    }
    KIP.createElement = createElement;
    /**...........................................................................
     * createSimpleLabeledElement
     * ...........................................................................
     * Create an element and an associated label
     *
     * @param   id        ID to use for the labeled elem container
     * @param   cls       CSS class to use for the
     * @param   lbl       Text of the label
     * @param   content   Content of the element that is being labeled
     * @param   children  Any additional child elements
     * @param   parent    The node this element should be added to
     * @param   skipZero  True if we should not draw anything if the content is 0
     *
     * @returns The created element + label
     * ...........................................................................
     */
    function createSimpleLabeledElement(id, cls, lbl, content, attr, children, parent, skipZero) {
        "use strict";
        var obj;
        var cLbl;
        var cContent;
        if (content === undefined || content === null)
            return;
        if ((typeof content === typeof "string") && (KIP.trim(content).length === 0)) {
            return;
        }
        if (skipZero && content === 0) {
            return;
        }
        // Create the wrapper
        obj = {};
        obj.id = id;
        obj.type = "div";
        obj.cls = cls;
        obj.attr = attr;
        obj.children = children;
        obj.parent = parent;
        // Create the label
        cLbl = {
            cls: "lbl",
            content: lbl,
            type: "span"
        };
        // Create the content
        cContent = {
            cls: "content",
            content: content,
            type: "span"
        };
        obj.children = [cLbl, cContent];
        return createElement(obj);
    }
    KIP.createSimpleLabeledElement = createSimpleLabeledElement;
    ;
    /**...........................................................................
     * createLabeledElement
     * ...........................................................................
     * Create an element along with a label
     *
     * @param   dataElem    Specs by which the data element should be created
     * @param   labelElem   Specs by which the label element should be created
     *
     * @returns The labeled element
     * ...........................................................................
     */
    function createLabeledElement(dataElem, labelElem) {
        // quit if the 
        if (!dataElem || !labelElem) {
            return;
        }
        // create the actual element
        var data = createElement(dataElem);
        // create the labeled element
        labelElem.cls = KIP.Styles.buildClassString(labelElem.cls, "lbl");
        var lbl = createElement(labelElem);
        // craete the wrapper element
        var container = createElement({ cls: "wrapper", children: [lbl, data] });
        return {
            data: data,
            lbl: lbl,
            wrapper: container
        };
    }
    KIP.createLabeledElement = createLabeledElement;
    //#region CALCULATE OFFSET FUNCTIONS
    /**...........................................................................
     * GlobalOffsetLeft
     * ...........................................................................
     * Gets the offset left of this element in reference to the entire page
     *
     * @param   elem    The element to get the offset of
     * @param   parent  The parent element to use as the reference. If not
     *                  included, it uses the document.body as the reference
     *
     * @returns The global offset of the elememt from the left of the page (or
     *          parent, if included)
     * ...........................................................................
     */
    function globalOffsetLeft(elem, parent) {
        return _auxGlobalOffset(elem, "offsetLeft", parent);
    }
    KIP.globalOffsetLeft = globalOffsetLeft;
    ;
    /**...........................................................................
     * GlobalOffsetTop
     * ...........................................................................
     * Gets the offset top of this element in reference to the entire page
     *
     * @param   elem   The element to get the offset of
     * @param   parent The parent element to use as the reference. If not
     *                 included, it uses the document.body as the reference
     *
     * @returns The global offset of the elememt from the top of the page (or
     *          parent, if included)
     * ...........................................................................
     */
    function globalOffsetTop(elem, parent) {
        return _auxGlobalOffset(elem, "offsetTop", parent);
    }
    KIP.globalOffsetTop = globalOffsetTop;
    ;
    /**...........................................................................
     * GlobalOffsets
     * ...........................................................................
     * Gets both the left and top offset
     *
     * @param   elem    The element to get the offsets for
     * @param   parent  The element to use as the reference frame
     *
     * @returns Object with the keys "left" and "top"
     * ...........................................................................
     */
    function globalOffsets(elem, parent) {
        "use strict";
        return {
            left: globalOffsetLeft(elem, parent),
            top: globalOffsetTop(elem, parent)
        };
    }
    KIP.globalOffsets = globalOffsets;
    ;
    /**...........................................................................
     *  _auxGlobalOffset
     * ...........................................................................
     * Helper function to get a global offset
     *
     * @param   elem    The element to get the global offset for
     * @param   type    The type of offset we should look at (either "offsetTop"
     *                  or "offsetWidth")
     * @param   parent  The parent to use as the reference frame. Uses document.
     *                  body by default {optional}
     *
     * @return The specified offset for the element
     * ...........................................................................
     */
    function _auxGlobalOffset(elem, type, parent) {
        var offset = 0;
        // Recursively loop until we no longer have a parent
        while (elem && (elem !== parent)) {
            if (elem[type]) {
                offset += elem[type];
            }
            elem = elem.offsetParent;
        }
        return offset;
    }
    ;
    //#endregion
    //#region RELATIVE TO OTHER ELEM FUNCTIONS
    /**...........................................................................
     * findCommonParent
     * ...........................................................................
     * Finds the closest shared parent between two arbitrary elements
     *
     * @param   elem_a    The first element to find the shared parent for
     * @param   elem_b    The second element to find the shared parent for
     *
     * @returns The closest shared parent, or undefined if it doesn't exist or
     *          an error occurred.
     * ...........................................................................
     */
    function findCommonParent(elem_a, elem_b) {
        var parent_a;
        var parent_b;
        // If eother element doesn't exist, no point in going further
        if (!elem_a || !elem_b)
            return undefined;
        // Set up the source parent, and quit if it doesn't exist
        parent_a = elem_a;
        // Set up the reference parent and quit if it doesn't exist
        parent_b = elem_b;
        // Loop through all parents of the source element
        while (parent_a) {
            // And all of the parents of the reference element
            while (parent_b) {
                // If they are the same parent, we have found our parent node
                if (parent_a === parent_b)
                    return parent_a;
                // Otherwise, increment the parent of the reference element
                parent_b = parent_b.parentNode;
            }
            // Increment the source parent and reset the reference parent
            parent_a = parent_a.parentNode;
            parent_b = elem_b;
        }
        // return undefined if we never found a match
        return undefined;
    }
    KIP.findCommonParent = findCommonParent;
    ;
    /**...........................................................................
     * moveRelToElement
     * ...........................................................................
     * Moves a given element to a position relative to the reference element.
     *
     * This is for cases where you have two elements with different parents, and
     * you want to specify that element A is some number of pixels in some
     * direction compared to element B.
     *
     * @param   elem    The element to move
     * @param   ref     The element to use as the reference element
     * @param   x       The x offset to give this element, relative to the reference
     * @param   y       The y offset to give this element, relative to the reference
     * @param   no_move If set to false, only returns the offset_x and offset_y that
     *                  the element would have to be moved {optional}
     *
     * @returns An object containing the keys x and y, set to the offset applied to the element.
     * ...........................................................................
     */
    function moveRelToElem(elem, ref, x, y, no_move) {
        var offset_me;
        var offset_them;
        var dx;
        var dy;
        // Find the offsets globally for each element
        offset_me = globalOffsets(elem);
        offset_them = globalOffsets(elem);
        // Find the difference between their global offsets
        dx = (offset_them.left + x) - offset_me.left;
        dy = (offset_them.top + y) - offset_me.top;
        // Adjust the element to the position specified
        if (!no_move) {
            elem.style.position = "absolute";
            elem.style.left = dx + "px";
            elem.style.top = dy + "px";
        }
        // Always return the offset we assigned this element.
        return { x: dx, y: dy };
    }
    KIP.moveRelToElem = moveRelToElem;
    ;
    //#endregion
    /**...........................................................................
     * removeSubclassFromAllElenents
     * ...........................................................................
     * Allows you to easily remove a subclass from all elements that have a certain
     * main class. Useful for things like button selection
     *
     * @param   cls       The main class to find all elements of
     * @param   subcls    The sub class to remove from all of those elements
     * @param   exception If needed, a single element that should
     *                    not have its subclass removed.
     * ...........................................................................
     */
    function removeSubclassFromAllElements(cls, subcls, exception) {
        var elems;
        var e;
        var elem;
        elems = document.getElementsByClassName(cls);
        for (e = 0; e < elems.length; e += 1) {
            elem = elems[e];
            // Only remove it if it isn't the exception
            if (elem !== exception) {
                KIP.removeClass(elem, subcls);
            }
        }
    }
    KIP.removeSubclassFromAllElements = removeSubclassFromAllElements;
    ;
    /**...........................................................................
     * addResizingElement (UNIMPLEMENTED)
     * ...........................................................................
     * Adds an element to the document that should resize with the document
     *
     * @param   elem        The element that should resize
     * @param   fixedRatio  If provided, keeps the image at this fixed ratio of w:h at all document sizes
     * @param   forceInitW  Optionally force the initial width to a certain value
     * @param   forceInitH  Optionally force the initial height to a certain value
     * ...........................................................................
     */
    function addResizingElement(elem, fixedRatio, forceInitW, forceInitH) {
        // TODO: implement
    }
    ;
    /**...........................................................................
     * resizeElement (UNIMPLEMENTED)
     * ...........................................................................
     * Resizes an element to be the same ratio as it previously was
     * @param   obj   The element to resize
     * ...........................................................................
     */
    function resizeElement(obj) {
        // TODO: implement
    }
    ;
    /**...........................................................................
   * isChildEventTarget
   * ...........................................................................
   * Checks if a child of the current task is being targeted by the event
   *
   * @param   ev    The event that is being triggered
   * @param   root  The parent to check for
   *
   * @returns True if the event is being triggered on a child element of the
   *          root element, false otherwise
   * ...........................................................................
   */
    function isChildEventTarget(ev, root) {
        "use strict";
        return isChild(root, ev.target);
    }
    KIP.isChildEventTarget = isChildEventTarget;
    ;
    /**...........................................................................
     * isChild
     * ...........................................................................
     * Checks if an element is a child of the provided parent element
     *
     * @param   root    The parent to check for
     * @param   child   The element to check for being a child of the root node
     * @param   levels  The maximum number of layers that the child can be
     *                  separated from its parent. Ignored if not set.
     *
     * @returns True if the child has the root as a parent
     * ...........................................................................
     */
    function isChild(root, child) {
        "use strict";
        var parent;
        parent = child;
        // Loop through til we either have a match or ran out of parents
        while (parent) {
            if (parent === root)
                return true;
            parent = parent.parentNode;
        }
        return false;
    }
    KIP.isChild = isChild;
    ;
    /**...........................................................................
     * AppendChildren
     * ...........................................................................
     * Appends an arbitrary number of children to the specified parent node. Loops
     * through all members of the argument list to get the appropriate children
     * to add.
     *
     * @param   parent  The parent element to add children to
     * @param   kids    Any children that should be appended
     * ...........................................................................
     */
    function appendChildren(parent) {
        "use strict";
        var kids = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            kids[_i - 1] = arguments[_i];
        }
        var idx;
        for (idx = 1; idx < kids.length; idx += 1) {
            parent.appendChild(kids[idx]);
        }
    }
    KIP.appendChildren = appendChildren;
    /**...........................................................................
     * moveElemRelativePosition
     * ...........................................................................
     * Moves an element a relative anount
     *
     * @param   elem      The element to move
     * @param   distance  The relative distance to move
     * ...........................................................................
     */
    function moveElemRelativePosition(elem, distance) {
        var top = parseInt(elem.style.top);
        var left = parseInt(elem.style.left);
        elem.style.top = (top + distance.y) + "px";
        elem.style.left = (left + distance.x) + "px";
    }
    KIP.moveElemRelativePosition = moveElemRelativePosition;
    /**...........................................................................
     * getScrollPosition
     * ...........................................................................
     * Determines how far we have scrolled down the page
     *
     * @returns The point of the current scroll position
     * ...........................................................................
     */
    function getScrollPosition() {
        var out = {
            x: (window.pageXOffset) ? window.pageXOffset : document.body.scrollLeft,
            y: (window.pageYOffset) ? window.pageYOffset : document.body.scrollTop
        };
        return out;
    }
    KIP.getScrollPosition = getScrollPosition;
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    /**...........................................................................
     * _normalizeValue
     * ...........................................................................
     * make sure a value is not past the relevant extrema
     *
     * @param	val		The value to normalize
     * @param	min     The minimum this value can be
     * @param   max     The maximum this value can be
     *
     * @returns The normalized value
     * ...........................................................................
     */
    function normalizeValue(val, min, max) {
        if (val < min) {
            val = min;
        }
        if (val > max) {
            val = max;
        }
        return val;
    }
    KIP.normalizeValue = normalizeValue;
    /**...........................................................................
     * boundedRandomNumber
     * ...........................................................................
     * Find a random number between two values
     *
     * @param   max             The maximum value accepted
     * @param   min             The minimun value accepted. Defaults to 0
     * @param   isExclusive     True if we should exclude the max/min values
     *
     * @returns A random number fitting these parameters
     * ...........................................................................
     */
    function boundedRandomNumber(max, min, isExclusive) {
        if (!min) {
            min = 0;
        }
        // make sure we can handle the inclusivity
        if (isExclusive) {
            min += 1;
        }
        else {
            max += 1;
        }
        return min + (Math.floor(Math.random() * (max - min)));
    }
    KIP.boundedRandomNumber = boundedRandomNumber;
    /**...........................................................................
     * roundToPlace
     * ...........................................................................
     * Helper function to round a number to a particular place
     *
     * @param   num     The number to round
     * @param   place   A multiple of 10 that indicates the decimal place to round
     *                  to. I.e., passing in 100 would round to the hundredths
     *                  place
     *
     * @returns The rounded number
     * ...........................................................................
     */
    function roundToPlace(num, place) {
        return (Math.round(num * place) / place);
    }
    KIP.roundToPlace = roundToPlace;
    ;
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    var Navigator = /** @class */ (function () {
        function Navigator() {
            /** keep track of the views */
            this._views = new KIP.Collection();
        }
        Navigator.prototype.navigateTo = function (navigationPath, constructor) {
            var addlArgs = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                addlArgs[_i - 2] = arguments[_i];
            }
            var view = this._views.getValue(navigationPath);
            if (!view) {
                view = new constructor(addlArgs);
            }
            else {
                if (KIP.isUpdatable(view)) {
                    view.update.apply(addlArgs);
                }
            }
            view.draw(this._parent);
        };
        return Navigator;
    }());
    KIP.Navigator = Navigator;
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    //#region INTERFACES AND CONSTANTS
    //#endregion
    //#region HELPER FUNCTIONS
    /**...........................................................................
     * map
     * ...........................................................................
     * Loop through all keys in an object or array and perform an action on each
     * element. Similar to Array.map.
     *
     * @param   object      The object to loop through
     * @param   callback    What to do with each element
     * @param   shouldQuit  Function to evaluate whether we are done looping
     * ...........................................................................
     */
    function map(object, callback, shouldQuit) {
        if (!object) {
            return;
        }
        // Use the default map function if available
        if (object.map) {
            var done_1;
            object.map(function (value, key, arr) {
                if (done_1) {
                    return;
                }
                callback(value, key, arr);
                // if we have a quit condition, test it & quit if appropriate
                if (!shouldQuit) {
                    return;
                }
                if (shouldQuit()) {
                    done_1 = true;
                }
            });
            // Otherwise, do a standard object map
        }
        else {
            var cnt = 0;
            var key = void 0;
            // Do it safely with the appropriate checks
            for (key in object) {
                if (object.hasOwnProperty(key)) {
                    callback(object[key], key, cnt);
                    cnt += 1;
                    // if we have a quit condition, test it & quit if appropriate
                    if (!shouldQuit) {
                        continue;
                    }
                    if (shouldQuit()) {
                        break;
                    }
                }
            }
        }
    }
    KIP.map = map;
    /**...........................................................................
     * getNextKey
     * ...........................................................................
     * Grab the next keyed element in an object. This is terribly un-performant in
     * all but the first key case.
     *
     * @param   object    The object to get the key from
     * @param   lastKey   If provided, the key before the key we're looking for
     *
     * @returns The next key for this element
     * ...........................................................................
     */
    function getNextKey(object, lastKey) {
        var propName;
        var nextKey = (!lastKey);
        for (propName in object) {
            if (object.hasOwnProperty(propName)) {
                if (nextKey) {
                    return propName;
                }
                else if (propName === lastKey) {
                    nextKey = true;
                }
            }
        }
        return "";
    }
    KIP.getNextKey = getNextKey;
    //#endregion
    /**...........................................................................
     * removeElemFromArr
     * ...........................................................................
     * Finds & removes an element from the array if it exists.
     *
     * @param   arr     The array to remove from
     * @param   elem    The element to remove
     * @param   equal   The function that is used to test for equality
     * ...........................................................................
     */
    function removeElemFromArr(arr, elem, equal) {
        var idx;
        var outArr;
        // If we didn't get a function to test for equality, set it to the default
        if (!equal) {
            equal = function (a, b) { return (a === b); };
        }
        // Loop through the array and remove all equal elements
        for (idx = (arr.length - 1); idx >= 0; idx -= 1) {
            if (equal(arr[idx], elem)) {
                outArr = arr.splice(idx, 1);
            }
        }
        return outArr;
    }
    KIP.removeElemFromArr = removeElemFromArr;
    ;
    /**...........................................................................
     * combineObjects
     * ...........................................................................
     * Take two separate objects and combine them into one
     *
     * @param   objA    First object to combine
     * @param   objB    Second object to combine
     * @param   deep    True if this should be recursive
     *
     * @returns The combined object
     * ...........................................................................
     */
    function combineObjects(objA, objB, deep) {
        "use strict";
        var ret;
        var tmp;
        var loopThru;
        ret = {};
        // Define a function that will pull in relevant details from
        loopThru = function (array, retArr) {
            var key;
            // Loop thru each key in the array
            for (key in array) {
                if (array.hasOwnProperty(key)) {
                    // If doing a deep copy, make sure we recurse
                    if (deep && (typeof (array[key]) === "object")) {
                        tmp = {};
                        tmp.prototype = Object.create(array[key].prototype);
                        tmp = combineObjects(tmp, array[key]);
                        retArr[key] = tmp;
                        // Otherwise copy directly
                    }
                    else {
                        retArr[key] = array[key];
                    }
                }
            }
        };
        // Write the array copies for A & B
        loopThru(objA, ret);
        loopThru(objB, ret);
        // Return the appropriate output array
        return ret;
    }
    KIP.combineObjects = combineObjects;
    /**...........................................................................
     * reconcileOptions
     * ...........................................................................
     * Takes in two different option objects & reconciles the options between them
     *
     * @param   options    The user-defined set of option
     * @param   defaults   The default options
     *
     * @returns The reconciled option list
     * ...........................................................................
     */
    function reconcileOptions(options, defaults) {
        "use strict";
        var key;
        var opt;
        if (!options) {
            options = {};
        }
        ;
        for (key in defaults) {
            if (defaults.hasOwnProperty(key)) {
                opt = options[key];
                if ((opt === undefined) || (opt === null)) {
                    options[key] = defaults[key];
                }
            }
        }
        return options;
    }
    KIP.reconcileOptions = reconcileOptions;
    /**...........................................................................
     * isNullOrUndefined
     * ...........................................................................
     * Determine whether the data passed in has value
     *
     * @param   value   The value to check for null / undefined
     *
     * @returns True if the value is null or undefined
     * ...........................................................................
     */
    function isNullOrUndefined(value) {
        if (value === undefined) {
            return true;
        }
        if (value === null) {
            return true;
        }
        return false;
    }
    KIP.isNullOrUndefined = isNullOrUndefined;
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    /**...........................................................................
     * @class KipPromise
     * Create a promise class to run async calls in a chained fashion
     * @version 1.0
     * ...........................................................................
     */
    var KipPromise = /** @class */ (function () {
        /**...........................................................................
         * Creates a promise elements that runs a bit of code asynchronously
         *
         * @param   func    The code to run
         * ...........................................................................
         */
        function KipPromise(func) {
            var _this = this;
            try {
                func(function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    _this._resolve(params);
                }, function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    _this._reject(params);
                });
            }
            catch (e) {
                this._reject(e);
            }
        }
        /**...........................................................................
         * then
         * ...........................................................................
         * Public function to setup what should run after this promise completes
         *
         * @param   onThen  The function to run on completion
         *
         * @returns This promise
         * ...........................................................................
         */
        KipPromise.prototype.then = function (onThen) {
            this._thenListener = onThen;
            return this;
        };
        /**...........................................................................
         * catch
         * ...........................................................................
         * Register the function that should catch any errors that occur
         *
         * @param   onCatch     The function that will handle catching
         *
         * @returns This promise
         * ...........................................................................
         */
        KipPromise.prototype.catch = function (onCatch) {
            this._catchListener = onCatch;
            return this;
        };
        /**...........................................................................
         * resolve
         * ...........................................................................
         * Called when the promise has been successfully resolved
         * @param params
         * ...........................................................................
         */
        KipPromise.prototype._resolve = function () {
            var _this = this;
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            window.setTimeout(function () {
                if (!_this._thenListener) {
                    return;
                }
                _this._thenListener(params);
            }, 0);
        };
        /**...........................................................................
         * _reject
         * ...........................................................................
         * Called when the promise failed to resolve for some reason
         * @param params
         * ...........................................................................
         */
        KipPromise.prototype._reject = function () {
            var _this = this;
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            window.setTimeout(function () {
                if (!_this._catchListener) {
                    return;
                }
                _this._catchListener(params);
            }, 0);
        };
        /**...........................................................................
         * resolve
         * ...........................................................................
         * return a promise that will immediately resolve
         *
         * @param   any arguments that should be passed to the resolve function
         * ...........................................................................
         */
        KipPromise.resolve = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            var promise = new KipPromise(function (resolve, reject) { resolve(params); });
            return promise;
        };
        /**...........................................................................
         * reject
         * ...........................................................................
         * return a promise that will be rejected
         * ...........................................................................
         */
        KipPromise.reject = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            var promise = new KipPromise(function (resolve, reject) { reject(params); });
            return promise;
        };
        return KipPromise;
    }());
    KIP.KipPromise = KipPromise;
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    var Helpers;
    (function (Helpers) {
        /** how frequently we should loop in order to calculate the new scroll position */
        var LOOP_INTERVAL = 20;
        /** number of steps we should use in scrolling */
        var NUM_STEPS = 100;
        /**---------------------------------------------------------------------------
         * scrollTo
         * ---------------------------------------------------------------------------
         * animate a scroll to a particular element
         * @param 	elem  	the element to scroll to
         * @param 	toTop 	if true, ensures that the top of the element is at the top
         * 					of the screen
         * --------------------------------------------------------------------------
         */
        function scrollTo(elem, targetPosition) {
            // figure out how far we need to scroll
            var top = _calculateScrollTarget(elem, targetPosition);
            // now adjust by the amount we've scrolled thus far
            var curAmt = _calculateAmtToScroll(top);
            var isNegative = (curAmt < 0);
            // calculate what a step looks like in this state
            var stepAmt = curAmt / (NUM_STEPS * NUM_STEPS);
            // We're going to emulate an exponential curve by
            //	1. picking an arbitrary number of steps
            //	2. pick an arbitrary distance to move
            //	3. once we hit halfway, reverse
            //	4. decelerate to find the right point
            window.setTimeout(function () {
                _loop(top, curAmt, 0, isNegative, stepAmt);
            }, LOOP_INTERVAL);
        }
        Helpers.scrollTo = scrollTo;
        /**--------------------------------------------------------------------------
         * _calculateScrollTarget
         * --------------------------------------------------------------------------
         * figure out where we should be targeting as the top of the scroll
         *
         * @param	elem	The element to calculate the distance for
         * @param	toTop	If true, scrolls to the top of the page
         *
         * @returns	The Y value that should be scrolled to
         * --------------------------------------------------------------------------
         */
        function _calculateScrollTarget(elem, targetPosition) {
            // grab the current offset of the top
            var top = elem.offsetTop;
            // if we didn't define a target, set it so the element will just be onscreen
            if (KIP.isNullOrUndefined(targetPosition)) {
                if (elem.offsetHeight < window.innerHeight) {
                    targetPosition = (window.innerHeight - elem.offsetHeight);
                }
                else {
                    targetPosition = 0;
                }
            }
            // adjust the value by the appropriate targetPosition
            top -= targetPosition;
            return top;
        }
        /**--------------------------------------------------------------------------
         * _loop
         * --------------------------------------------------------------------------
         * estimate an exponential curve to emulate a smooth scrolling experience
         *
         * @param	top			The current position of the top of the page
         * @param	totalAmt	The total amount we need to scroll
         * @param	iteration	How many times we've looped
         * @param	isNegative	True if we should scroll up
         * @param	stepAmt		How much we should scroll per iteration
         * @param	half		True if we have passed the halfway mark
         * --------------------------------------------------------------------------
         */
        function _loop(top, totalAmt, iteration, isNegative, stepAmt, half) {
            var CLOSE_ENOUGH = 1;
            // Increment our counter & calculate how much space we have left
            var curAmt = _calculateAmtToScroll(top);
            iteration += 1;
            // verify that we haven't gone too far
            var wentTooFar;
            if (isNegative) {
                wentTooFar = (curAmt >= (-1 * CLOSE_ENOUGH));
            }
            else {
                wentTooFar = (curAmt <= CLOSE_ENOUGH);
            }
            // check if we still havene't moved, as that's. apretty good sign that we can't or won't
            var canMove;
            canMove = !((iteration !== 1) && (curAmt === totalAmt));
            // TODO: make this work
            // If we've either exceed our target, or we've hit the # of steps, quit
            if (wentTooFar || (iteration === NUM_STEPS)) {
                return;
            }
            // Figure out if we are accelerating or decelerating, based on whether we are halfway yet
            var dy;
            if ((curAmt / totalAmt) > (1 / 2)) {
                dy = iteration;
            }
            else {
                if (!half) {
                    half = iteration;
                }
                dy = ((half * 2) - iteration);
            }
            // Calculate how much we should move this time
            dy = stepAmt * (dy * dy);
            // if we're in the 2nd half and we're moving fractions of pixels, might as well quit early
            if ((Math.floor(dy) === 0) && half) {
                window.scrollBy(curAmt);
                return;
            }
            window.scrollBy(0, dy);
            window.setTimeout(function () {
                _loop(top, totalAmt, iteration, isNegative, stepAmt, half);
            }, LOOP_INTERVAL);
        }
        /**--------------------------------------------------------------------------
         * _calculateAmtToScroll
         * --------------------------------------------------------------------------
         * calculate how much distance is remaining to close in the scrolling pattern
         *
         * @param	top		The top value for the element we are scrolling to
         *
         * @returns	How much distance there is between the current position and the target
         * --------------------------------------------------------------------------
         */
        function _calculateAmtToScroll(target) {
            var scrollPosition = KIP.getScrollPosition();
            var curAmt = target - scrollPosition.y;
            return curAmt;
        }
    })(Helpers = KIP.Helpers || (KIP.Helpers = {}));
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    //#region INTERFACES
    /**...........................................................................
     * enum to keep track of the types of AJAX requesr
     * @version 1.0
     * ...........................................................................
     */
    var AjaxTypeEnum;
    (function (AjaxTypeEnum) {
        AjaxTypeEnum[AjaxTypeEnum["POST"] = 1] = "POST";
        AjaxTypeEnum[AjaxTypeEnum["GET"] = 2] = "GET";
    })(AjaxTypeEnum = KIP.AjaxTypeEnum || (KIP.AjaxTypeEnum = {}));
    ;
    //#endregion
    //#region PUBLIC FUNCTIONS
    /**...........................................................................
     * ajaxRequest
     * ...........................................................................
     * Sends an AJAX request to a url of our choice as either a POST or GET
     *
     * @param   type        Set to either "POST" or "GET" to indicate the type of response we want
     * @param   url         The URL to send the request to
     * @param   success     A function to run if the call succeeds
     * @param   error       A function to run if the request errors out
     * @param   params      An object with key value pairs
     *
     * @returns The request that was sent
     * ...........................................................................
    */
    function ajaxRequest(type, url, successCb, errorCb, params) {
        var request;
        request = _getXmlRequestObject(); // try to get an HTML Request
        if (!request)
            return null; // if we couldn't grab a request, quit
        _assignXmlRequestCallbacks(request, successCb, errorCb); // assign the callbacks upon request completion
        _sendXmlRequest(request, type, url, params); // send the XML request
        return request; // return the total request
    }
    KIP.ajaxRequest = ajaxRequest;
    ;
    /**...........................................................................
     * loadFile
     * ...........................................................................
     * load a file from a particular URL
     *
     * @param   url         The URL to load a file from
     * @param   success     What to do when the file is loaded successfully
     * @param   error       What do do if the file can't be loaded
     * ...........................................................................
     */
    function loadFile(url, success, error) {
        var request = new XMLHttpRequest();
        // start the request to the remote file
        request.open('GET', url);
        // handle the file actually changing status
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                success(request.responseText);
            }
            else if (request.status === 404) {
                error(request.responseText);
            }
        };
        // actually send the appropriate request
        request.send();
    }
    KIP.loadFile = loadFile;
    ;
    //#endregion
    //#region HELPER FUNCTIONS
    /**...........................................................................
     * _getXmlRequestObject
     * ...........................................................................
     * create the Xml request object
     *
     * @returns A created request, appropriate for the particular browser
     * ...........................................................................
     */
    function _getXmlRequestObject() {
        var request = null;
        try {
            request = new XMLHttpRequest();
        } // Try to create a non IE object
        catch (e) {
            try {
                request = new ActiveXObject("Msxml2.XMLHTTP");
            } // If it failed, it could be because we're in IE, so try that
            catch (e) {
                try {
                    request = new ActiveXObject("Microsoft.XMLHTTP");
                } // If that failed too, then we'll try the other IE specific method
                catch (e) {
                    return null; // And if we still can't get anything, then we're out of options
                }
            }
        }
        return request; // return the updated request
    }
    /**...........................................................................
     * _assignXmlRequestCallbacks
     * ...........................................................................
     * handle the xml request getting back to us
     *
     * @param   request     The AJAX request, appropriate for the browser
     * @param   successCb   What to do if the request successfully returns
     * @param   errorCb     What to do if the request fails
     *
     * @returns The request, now configured to handle success + error states
     * ...........................................................................
     */
    function _assignXmlRequestCallbacks(request, successCb, errorCb) {
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    if (successCb) {
                        successCb(request.responseText);
                    }
                }
                else {
                    if (errorCb) {
                        errorCb(request.responseText);
                    }
                }
            }
        };
        return request; // return the appropriate request
    }
    /**...........................................................................
     * _buildParameters
     * ...........................................................................
     * turn a param object into a string suitable for a URI
     *
     * @param   params      List of parameters that we will turn into an appropriate AJAX request string
     *
     * @returns The string containing all appropriate paramters
     * ...........................................................................
     */
    function _buildParameters(params) {
        var paramOut = "";
        var key;
        for (key in params) {
            if (params.hasOwnProperty(key)) {
                // Append the appropriate PHP delimiter
                if (paramOut.length > 0) {
                    paramOut += "&";
                }
                // Make sure we add the key-value pair, properly escaped
                paramOut += (encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
            }
        }
        return paramOut;
    }
    /**...........................................................................
     * _sendXmlRequest
     * ...........................................................................
     * handle the actual sending of the request
     *
     * @param   request     The AJAX request to send
     * @param   type        Whether this is a POST or a GET request
     * @param   url         Where to send the request
     * @param   params      What parameters or data should be sent with the request
     *
     * @returns The sent request
     * ...........................................................................
     */
    function _sendXmlRequest(request, type, url, params) {
        if (type === AjaxTypeEnum.GET) {
            return _sendGetRequest(request, url);
        }
        else if (type === AjaxTypeEnum.POST) {
            return _sendPostRequest(request, url, params);
        }
    }
    /**...........................................................................
     * _sendGetRequest
     * ...........................................................................
     * handle sending GET AJAX requests
     *
     * @param   request     The request to send
     * @param   url         The URL to which to send the requesr
     *
     * @returns The sent request
     * ...........................................................................
     */
    function _sendGetRequest(request, url) {
        request.open("GET", url, true);
        return request;
    }
    /**...........................................................................
     * _sendPostRequest
     * ...........................................................................
     * handle sending POST AJAX queries
     *
     * @param   request     The request to send
     * @param   url         The URL to which to send the request
     * @param   params      The parameters or data to send with the request
     *
     * @returns The sent request
     * ...........................................................................
     */
    function _sendPostRequest(request, url, params) {
        var reqHeaderType = "application/x-www-form-urlencoded"; // save off the appropriate header
        var reqHeaderDisposition;
        var uriParams;
        request.open("POST", url, true); // open the connection
        if (params instanceof FormData) {
            uriParams = params;
            reqHeaderType = "";
        }
        else {
            uriParams = _buildParameters(params);
        }
        if (reqHeaderType) {
            request.setRequestHeader("Content-Type", reqHeaderType);
        } // pull in the data for the POST
        request.send(uriParams); // open request   
        return request; // return the completed request                                          
    }
    //#endregion
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    /**...........................................................................
     * piece
     * ...........................................................................
     * Gets a piece of a delimited string
     *
     * @param 	str 		The string to grab a piece from
     * @param 	delim 	The character (or characters) that are delimiting the string
     * @param 	piece 	The piece number to get. Defaults to 1 if not passed in.
     *
     * @return The specified piece of the string, "" if it doesn't exist
     * ...........................................................................
     */
    function piece(str, delim, pc) {
        if (pc === void 0) { pc = 1; }
        var split_arr;
        split_arr = str.split(delim);
        return split_arr[pc] || "";
    }
    KIP.piece = piece;
    ;
    /**...........................................................................
     * titleCase
     * ...........................................................................
     * Capitalizes the first letter of each word of a given string, and converts all else to lowercase
     *
     * @param 	str   	The string to convert to title case
     * @param 	delim 	What separates the different words in this string
     *
     * @returns The string, now in title case
     * ...........................................................................
     */
    function titleCase(str, delim) {
        if (delim === void 0) { delim = " "; }
        var words;
        var w;
        var out;
        out = "";
        words = str.split(delim);
        for (w = 0; w < words.length; w += 1) {
            if (w !== 0) {
                out += delim;
            }
            out += charAt(words[w], 0).toUpperCase();
            out += rest(words[w], 1).toLowerCase();
        }
        return out;
    }
    KIP.titleCase = titleCase;
    ;
    /**...........................................................................
     * sentenceCase
     * ...........................................................................
     * Capitalizes the first letter of a given string, and converts the rest to lowercase
     *
     * @param 	str   The string to capitalize
     *
     * @returns The string, now in sentence case
     * ...........................................................................
     */
    function sentenceCase(str) {
        var out;
        out = charAt(str, 0).toUpperCase();
        out += rest(str, 1).toLowerCase();
        return out;
    }
    KIP.sentenceCase = sentenceCase;
    ;
    /**...........................................................................
     * charAt
     * ...........................................................................
     * Slightly more memorable way to get a character at a given position in a string
     *
     * @param 	str 	The string to take the character out of
     * @param 	idx 	What index of the string to get the character of
     *
     * @return The character at the specified position
     * ...........................................................................
     */
    function charAt(str, idx) {
        return str.substr(idx, 1);
    }
    KIP.charAt = charAt;
    ;
    /**...........................................................................
     * rest
     * ...........................................................................
     * Gets the substring of a string starting from a given index
     *
     * @param 	str 	The string to get the substring of
     * @param 	idx 	What index to start the substring at
     *
     * @return The rest of the string after the provided index
     * ...........................................................................
     */
    function rest(str, idx) {
        return str.substring(idx, str.length);
    }
    KIP.rest = rest;
    ;
    /**...........................................................................
     * trim
     * ...........................................................................
     * Trims all white space off of the beginning and end of a string
     *
     * @param 	str 	The string to trim
     *
     * @return The trimmed string
     * ...........................................................................
     */
    function trim(str) {
        var ret;
        ret = str.replace(/^\s*/g, ""); // Replace white space at the beginning
        ret = ret.replace(/\s*?$/g, ""); // Replace white space at the end
        return ret;
    }
    KIP.trim = trim;
    ;
    /**...........................................................................
     * format
     * ...........................................................................
     * Take a string with placeholders and replaces them with the provided
     * parameters
     *
     * @param 	str 					The string to make replacements within
     * @param		replacements	The strings that should replace the placeholders
     *
     * @returns	The string with replacements made
     * ...........................................................................
     */
    function format(str) {
        var replacements = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            replacements[_i - 1] = arguments[_i];
        }
        var stringArr = str.split("");
        // make sure we have an array to avoid null references
        if (!replacements) {
            replacements = [];
        }
        var number = "";
        var lookingForNumber = false;
        // Loop through each letter in the array
        for (var idx = 0; idx < stringArr.length; idx += 1) {
            var char = stringArr[idx];
            // Option 1: a backslash means we should skip the next character
            if (char === "\\") {
                idx += 1;
                break;
            }
            else if (char === "{") {
                lookingForNumber = true; // start looking for a number
                stringArr[idx] = ""; // replace the brace with a blank string
            }
            else if (char === "}" && lookingForNumber) {
                stringArr[idx] = (!KIP.isNullOrUndefined(replacements[+number]) ? replacements[+number].toString() : "{" + number + "}");
                lookingForNumber = false;
                number = "";
            }
            else if (isNumeric(char) && lookingForNumber) {
                number += char;
                stringArr[idx] = "";
            }
            else if (lookingForNumber) {
                lookingForNumber = false;
                number = "";
            }
        }
        return stringArr.join("");
    }
    KIP.format = format;
    function isNumeric(str) {
        return /[0-9]/.test(str);
    }
    KIP.isNumeric = isNumeric;
    /**...........................................................................
     * addLeadingZeros
     * ...........................................................................
     * Adds a number of leading zeroes before a number
     *
     * @param   count   The number of zeroes to add
     * @param   nums    The numbers to add zeroes to
     *
     * @returns All zero-padded numbers that were passed in
     * ...........................................................................
     */
    function addLeadingZeroes(count, unpadded) {
        "use strict";
        var out;
        if (typeof unpadded === "string") {
            out = unpadded;
        }
        else {
            out = unpadded.toString();
        }
        // Loop through the number of zeros we need to add and add them
        var z;
        for (z = out.length; z < count; z += 1) {
            out = "0" + out;
        }
        return out;
    }
    KIP.addLeadingZeroes = addLeadingZeroes;
    ;
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    /**...........................................................................
     * NamedClass
     * ...........................................................................
     * A class that contains a set of names that apply to this class. Used for
     * easier typing.
     *
     * @version 1.0
     * ...........................................................................
     */
    var NamedClass = /** @class */ (function () {
        /**...........................................................................
         * Creates a named class
         *
         * @param	classNames		The initial class name to assign
         * ...........................................................................
         */
        function NamedClass() {
            var classNames = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                classNames[_i] = arguments[_i];
            }
            this._class_names = classNames;
        }
        Object.defineProperty(NamedClass.prototype, "className", {
            get: function () {
                var tmpNames = this._class_names.slice();
                return tmpNames.reverse().join("::");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NamedClass.prototype, "paddedClassName", {
            get: function () {
                return this._class_names.join(" <-- ");
            },
            enumerable: true,
            configurable: true
        });
        ;
        /**...........................................................................
         * _addClassName
         * ...........................................................................
         * Adds a new layer to our class name
         *
         * @param	class_name		The new class name to add
         *
         * @returns	True if we added the class name
         * ...........................................................................
         */
        NamedClass.prototype._addClassName = function (class_name) {
            if (KIP.contains(this._class_names, class_name)) {
                return false;
            }
            this._class_names.push(class_name);
            return true;
        };
        return NamedClass;
    }());
    KIP.NamedClass = NamedClass;
})(KIP || (KIP = {}));
///<reference path="../interfaces/iclass.ts" />
///<reference path="html.ts" />
var KIP;
(function (KIP) {
    var Styles;
    (function (Styles) {
        /**...........................................................................
         * @class Stylable
         * Creates an element that can additionally add CSS styles
         * @version 1.0
         * ...........................................................................
         */
        var Stylable = /** @class */ (function (_super) {
            __extends(Stylable, _super);
            //#endregion
            /**...........................................................................
             * Creates a stylable class
             * ...........................................................................
             */
            function Stylable() {
                var _this = _super.call(this, "Stylable") || this;
                _this._colors = [];
                // TODO: Check if we should actually be conditionally declaring our static variables in the constructor
                // Create the styles
                _this._createStyles();
                _this._hasCreatedStyles = true;
                return _this;
            }
            Object.defineProperty(Stylable.prototype, "_uncoloredStyles", {
                get: function () { return this.constructor._uncoloredStyles; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stylable.prototype, "uncoloredStyles", {
                get: function () { return this._getUncoloredStyles(); },
                enumerable: true,
                configurable: true
            });
            /** overridable function to grab the appropriate styles for this particular class */
            Stylable.prototype._getUncoloredStyles = function () {
                return this.constructor._uncoloredStyles;
            };
            /**...........................................................................
             * setThemeColor
             * ...........................................................................
             * Update a theme color based on placeholders
             *
             * @param   idx             The index of the theme color
             * @param   color           The color to replace it with
             * @param   noReplace       True if we shouldn't replace an existing color
             * ...........................................................................
             */
            Stylable.prototype.setThemeColor = function (idx, color, noReplace) {
                // Quit if we're missing the color
                if (!color) {
                    return;
                }
                // Calculate the appropriate name of the index
                var colorId = this._buildThemeColorId(idx);
                // Quit if the color is already set to any value
                if (noReplace && Stylable._themeColors[colorId]) {
                    return;
                }
                // Replace the color stored in our array
                Stylable._themeColors[colorId] = color;
                // update the styles 
                Stylable._updateAllThemeColors();
                // Create the appropriate style classes out of it
                Stylable._createStyles(true);
            };
            /**...........................................................................
             * _buildThemeColorId
             * ...........................................................................
             * Create a unique ID for a color for a particular class
             *
             * @param   idx         The index of the color
             * @param   uniqueID    Optional name to use instead of the class name
             *
             * @returns The created color ID
             * ...........................................................................
             */
            Stylable._buildThemeColorId = function (idx, uniqueId) {
                var outStr = KIP.format("<{0}|{1}>", uniqueId, idx.toString());
                return outStr;
            };
            /**...........................................................................
             * _buildThemeColorId
             * ...........................................................................
             * Create a unique ID for a color for a particular class
             *
             * @param   idx         The index of the color
             * @param   uniqueID    Optional name to use instead of the class name
             *
             * @returns The created color ID
             * ...........................................................................
             */
            Stylable.prototype._buildThemeColorId = function (idx, uniqueId) {
                return Stylable._buildThemeColorId(idx, uniqueId || this.constructor.name);
            };
            /**...........................................................................
             * _mergeThemes
             * ...........................................................................
             * Mere a set of themes into a single theme
             *
             * @param   styles  Sets of themes that should be merged together
             *
             * @returns The updated set of themes
             * ...........................................................................
             */
            Stylable._mergeThemes = function () {
                var styles = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    styles[_i] = arguments[_i];
                }
                var flatStyles = [];
                var style;
                for (var _a = 0, styles_1 = styles; _a < styles_1.length; _a++) {
                    style = styles_1[_a];
                    var flatStyle = this._cleanStyles(style);
                    flatStyles.push(flatStyle);
                }
                return this._combineThemes.apply(this, flatStyles);
            };
            Stylable._combineThemes = function () {
                var themes = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    themes[_i] = arguments[_i];
                }
                var out = {};
                // Go through each of the themes
                themes.map(function (style) {
                    // then through each of the selectors
                    KIP.map(style, function (def, selector) {
                        // initialise the properties for this selector if not already created
                        if (!out[selector]) {
                            out[selector] = {};
                        }
                        // and last through all of the properties
                        KIP.map(def, function (val, property) {
                            out[selector][property] = val;
                        });
                    });
                });
                return out;
            };
            // protected static _mergeAndCleanThemes(...themes: IStandardStyles[]): IStandardStyles {
            //     let cleanedThemes: IStandardStyles[] = [];
            //     themes.map((style: IStandardStyles) => {
            //         let cleanedTheme: IStandardStyles = this._cleanStyles(style, "");
            //         cleanedThemes.push(cleanedTheme);
            //     });
            //     return this._mergeThemes.apply(cleanedThemes);
            // }
            /**...........................................................................
             * _mergeThemes
             * ...........................................................................
             * Instance class to merge different themes
             *
             * @param   themes  The themes to merge
             *
             * @returns The merged themes
             * ...........................................................................
             */
            Stylable.prototype._mergeThemes = function () {
                var themes = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    themes[_i] = arguments[_i];
                }
                return Stylable._mergeThemes.apply(Stylable, themes);
            };
            /**...........................................................................
             * _mergeIntoStyles
             * ...........................................................................
             * Add a new set of styles into the set of page styles
             *
             * @param   styles  The styles to merge
             * ...........................................................................
             */
            Stylable._mergeIntoStyles = function (styles) {
                this._uncoloredPageStyles = this._mergeThemes(this._uncoloredPageStyles, styles);
                this._updateAllThemeColors();
            };
            /**...........................................................................
             * _updateAllThemeColors
             * ...........................................................................
             * Make sure we have an updated version of our styles
             * ...........................................................................
             */
            Stylable._updateAllThemeColors = function () {
                var styles = KIP.cloneObject(this._uncoloredPageStyles);
                var updateAll = Stylable._handleUpdatingThemeColor(styles);
                this._pageStyles = styles;
                if (!updateAll) {
                    return;
                }
                this._createStyles();
            };
            /**...........................................................................
             * _handleUpdatingThemeColor
             * ...........................................................................
             * Make sure any changes to theme colors are handled elegantly
             *
             * @param   styles  The styles to update
             *
             * @returns True if an update was made
             * ...........................................................................
             */
            Stylable._handleUpdatingThemeColor = function (styles, updatedPlaceholder) {
                var _this = this;
                // Only update the full classes if something actually changed
                var updateAll = false;
                // loop through each of the style definitions
                KIP.map(styles, function (cssDeclaration, selector) {
                    // loop through each property on this particular class
                    KIP.map(cssDeclaration, function (value, key) {
                        if (typeof value === "object") {
                            return;
                        }
                        // Split each value & assume we won't replace anything
                        var valArray = value.split(" ");
                        var replaced = false;
                        // Loop through the split value
                        valArray.map(function (val, idx) {
                            // Check if this is a placeholder & quit if it isn't
                            var placeholder = _this._matchesPlaceholder(val);
                            if (placeholder === "") {
                                return;
                            }
                            // If we have an appropriate color, replace it
                            if (_this._themeColors["<" + placeholder + ">"]) {
                                valArray[idx] = _this._themeColors["<" + placeholder + ">"];
                                replaced = true;
                                updateAll = true;
                                // otherwise, if we're updating placeholders and this needs updating, do so
                            }
                            else if (updatedPlaceholder) {
                                if (!isNaN(+placeholder)) {
                                    valArray[idx] = _this._buildThemeColorId(+placeholder, updatedPlaceholder);
                                    replaced = true;
                                    updateAll = true;
                                }
                            }
                        });
                        // Quit if we didn't replace anything
                        if (!replaced) {
                            return;
                        }
                        // Replace the value with the new color
                        styles[selector][key] = valArray.join(" ");
                    });
                });
                return updateAll;
            };
            /**...........................................................................
             * _createStyles
             * ...........................................................................
             * Create the styles for this class
             * @param   forceOverride   True if we should create the classes even if they
             *                          already exist
             * ...........................................................................
             */
            Stylable._createStyles = function (forceOverride) {
                var _this = this;
                // grab our updated colors
                var styles = Stylable._pageStyles;
                // If we don't have any styles, just quit
                if (!styles) {
                    return;
                }
                // Create the HTML style tag if we need to
                if (!this._styleElem) {
                    this._styleElem = _createStyleElement(false);
                    document.head.appendChild(this._styleElem);
                }
                else {
                    this._styleElem.innerHTML = "";
                }
                // Determine 
                KIP.map(styles, function (cssDeclaration, selector) {
                    var tmpElem = Styles.createClass(selector, cssDeclaration, true, forceOverride);
                    if (!tmpElem) {
                        return;
                    }
                    _this._styleElem.innerHTML += tmpElem.innerHTML;
                });
            };
            /**...........................................................................
             * _createStyles
             * ...........................................................................
             * Create the styles for this class
             * @param   forceOverride   True if we should create the classes even if they
             *                          already exist
             * ...........................................................................
             */
            Stylable.prototype._createStyles = function (forceOverride) {
                // Quit if we don't have the right styles
                if (!this.uncoloredStyles) {
                    return;
                }
                // If we've already created styles for these elements, don't do it again
                if ((Stylable._createdStyles[this.constructor.name]) && !forceOverride) {
                    return;
                }
                // Copy our styles & replace the wrong tags
                var tmpStyles = KIP.cloneObject(this.uncoloredStyles);
                tmpStyles = this._cleanStyles(tmpStyles);
                Stylable._handleUpdatingThemeColor(tmpStyles, this.constructor.name);
                // Merge into the static styles
                Stylable._mergeIntoStyles(tmpStyles);
                Stylable._createStyles(forceOverride);
                Stylable._createdStyles[this.constructor.name] = true;
            };
            /**...........................................................................
             * _cleanStyles
             * ...........................................................................
             * Clean the nested styles data so that we can parse it properly
             * @param   styles  The styles to clean
             * @returns The cleaned styles
             * ...........................................................................
             */
            Stylable.prototype._cleanStyles = function (styles, lastSelector) {
                return Stylable._cleanStyles(styles, lastSelector);
            };
            Stylable._cleanStyles = function (styles, lastSelector) {
                var _this = this;
                var outStyles = {};
                KIP.map(styles, function (value, selector) {
                    // split all selectors at commas so we can appropriately nest
                    var newSelectors = selector.split(",");
                    if (lastSelector) {
                        for (var i = 0; i < newSelectors.length; i += 1) {
                            var newSelector = newSelectors[i];
                            // handle selectors that are modifications of the last selector
                            if (newSelector[0] === "&") {
                                newSelectors[i] = lastSelector + KIP.rest(newSelector, 1);
                                // handle all other subclass cases
                            }
                            else {
                                newSelectors[i] = lastSelector + " " + newSelector;
                            }
                        }
                    }
                    // loop through all of the available subclasses for this
                    var subCls;
                    for (var _i = 0, newSelectors_1 = newSelectors; _i < newSelectors_1.length; _i++) {
                        subCls = newSelectors_1[_i];
                        var calculatedStyles = _this._cleanClassDef(subCls, value);
                        outStyles = _this._combineThemes(outStyles, calculatedStyles);
                    }
                });
                return outStyles;
            };
            /**...........................................................................
             * _cleanClassDef
             * ...........................................................................
             * Clean a particular class definition recursively
             * @param   selector    The CSS selector for this class
             * @param   classDef    The definition for this CSS class
             * @returns The merged styles
             * ...........................................................................
             */
            Stylable._cleanClassDef = function (selector, classDef) {
                var _this = this;
                var topStyles = {};
                topStyles[selector] = {};
                KIP.map(classDef, function (propertyValue, propertyName) {
                    // allow for animations to be created
                    if (propertyName === "nested") {
                        var nestedStyles = propertyValue;
                        var subnestedStyles = _this._cleanStyles(propertyValue, selector);
                        topStyles = _this._combineThemes(topStyles, subnestedStyles);
                    }
                    else {
                        topStyles[selector][propertyName] = propertyValue;
                    }
                });
                return topStyles;
            };
            /**...........................................................................
             * _matchesNumericPlaceholder
             * ...........................................................................
             * Checks if a particular string is a placeholder for a theme color
             * @param   valuePiece  The value to check for any placeholder
             * @returns The placeholder ID
             * ...........................................................................
             */
            Stylable._matchesPlaceholder = function (valuePiece) {
                var placeholderRegex = /<(.+?)>/;
                var result = placeholderRegex.exec(valuePiece);
                if (!result || !result[1]) {
                    return "";
                }
                return result[1];
            };
            /**...........................................................................
             * _applyColors
             * ...........................................................................
             * Apply the appropriate theme colors
             * @param   otherElem   If passed in, sets a theme color on a different element
             * ...........................................................................
             */
            Stylable.prototype._applyColors = function (otherElem) {
                var idx = 0;
                for (idx; idx < this._colors.length; idx += 1) {
                    if (!this._colors[idx]) {
                        continue;
                    }
                    if (!otherElem) {
                        this.setThemeColor(idx, this._colors[idx], true);
                    }
                    else {
                        otherElem.setThemeColor(idx, this._colors[idx]);
                    }
                }
            };
            //#region STATIC PROPERTIES
            /** create the collection of all styles that have been added to the page */
            Stylable._pageStyles = {};
            /** keep track of all of the classes without the color substitutions */
            Stylable._uncoloredPageStyles = {};
            /** keep track of all of the theme colors for each of the classes */
            Stylable._themeColors = {};
            /** keep track of the styles we've already created */
            Stylable._createdStyles = {};
            return Stylable;
        }(KIP.NamedClass));
        Styles.Stylable = Stylable;
        //#endregion
        //#region HANDLE THE CLASS CREATION
        /**...........................................................................
         * createClass
         * ...........................................................................
         * Create a CSS class from a selector & set of attributes
         * @param   selector        The CSS selector we should use for this class
         * @param   attr            Attributes that should be
         * @param   noAppend        If true, doesn't add the style class to the document
         * @param   forceOverride   If true, replaces the class even if it already exists
         * @returns The created style element
         * ...........................................................................
         */
        function createClass(selector, attr, noAppend, forceOverride) {
            var cls;
            var a;
            var styleString = "";
            var isGeneratingAnimation = (selector.indexOf("@keyframes") !== -1);
            // If this style already exists, append to it
            var cssRule = _getExistingSelector(selector);
            if (!cssRule) {
                cssRule = { style: {} };
            }
            // Loop through the attributes we were passed in to create the class
            styleString += "\n" + selector + " {\n";
            var addedSomething = false;
            KIP.map(attr, function (propertyValue, propertyName) {
                // quit if this rule has already been added for this selector
                if (cssRule.style[propertyName]) {
                    return;
                }
                if (attr[propertyName] === "theme") {
                    return;
                }
                if (attr[propertyName] === "subTheme") {
                    return;
                }
                if (selector.indexOf("@keyframes") !== -1) {
                    styleString += "\t" + propertyName + " {\n";
                    KIP.map(attr[propertyName], function (pValue, pName) {
                        styleString += "\t\t" + pName + " : " + pValue + ";\n";
                    });
                    styleString += "}";
                    addedSomething = true;
                }
                else {
                    styleString += "\t" + getPropertyName(propertyName) + " : " + attr[propertyName] + ";\n";
                    addedSomething = true;
                }
            });
            styleString += "\n}";
            // If we created an empty class, just return nothing
            if (!addedSomething && !forceOverride) {
                return null;
            }
            // Append the class to the head of the document
            cls = _createStyleElement(!noAppend);
            cls.innerHTML += styleString;
            if (!noAppend) {
                if (!cls.parentNode) {
                    document.head.appendChild(cls);
                }
            }
            // Return the style node
            return cls;
        }
        Styles.createClass = createClass;
        /**...........................................................................
         * _createStyleElement
         * ...........................................................................
         * Create the element that will then be added to the document
         * @param   findExisting    If true, returns the first existing style tag in the document
         * @returns The created style element
         * ...........................................................................
         */
        function _createStyleElement(findExisting) {
            var styles;
            var cls;
            // try to find an existing tag if requested
            if (findExisting) {
                styles = document.getElementsByTagName("style");
                if (styles.length > 0) {
                    cls = styles[0];
                    return cls;
                }
            }
            cls = document.createElement("style");
            cls.innerHTML = "";
            return cls;
        }
        /**...........................................................................
         * getPropertyName
         * ...........................................................................
         * grab the appropriate property name for the CSS class
         * @param   jsFriendlyName      The JS version of a CSS property name, usually in camel-case
         * @returns The CSS version of the property name
         * ...........................................................................
         */
        function getPropertyName(jsFriendlyName) {
            if (jsFriendlyName.toLowerCase() === jsFriendlyName) {
                return jsFriendlyName;
            }
            var chars = jsFriendlyName.split("");
            var char;
            for (var idx = 0; idx < chars.length; idx++) {
                char = chars[idx];
                if (char.toLowerCase() !== char) {
                    chars[idx] = "-" + char.toLowerCase();
                }
            }
            return chars.join("");
        }
        Styles.getPropertyName = getPropertyName;
        /**...........................................................................
         * buildClassString
         * ...........................................................................
         * return the appropriate class
         *
         * @param   classes     List of all classes that should be combined into a
         *                      single class name
         *
         * @returns The full class name
         * ...........................................................................
         */
        function buildClassString() {
            var classes = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                classes[_i] = arguments[_i];
            }
            var outCls = "";
            for (var idx = 0; idx < classes.length; idx += 1) {
                if (!classes[idx]) {
                    continue;
                }
                if (outCls.length > 0) {
                    outCls += " ";
                }
                outCls += classes[idx];
            }
            return outCls;
        }
        Styles.buildClassString = buildClassString;
        /**...........................................................................
         * _getExistingSelector
         * ...........................................................................
         *
         * @param selector
         * ...........................................................................
         */
        function _getExistingSelector(selector) {
            var css;
            var rules;
            var rule;
            // Loop through all of the stylesheets we have available
            for (var sIdx = 0; sIdx < document.styleSheets.length; sIdx += 1) {
                // Pull in the appropriate index for the browser we're using
                css = document.all ? 'rules' : 'cssRules'; //cross browser
                try {
                    rules = document.styleSheets[sIdx][css];
                }
                catch (err) {
                    continue;
                }
                // If we have an index...
                if (rules) {
                    // ... loop through all and check for the actual class
                    for (var i = 0; i < rules.length; i += 1) {
                        rule = rules[i];
                        // If we find the class...
                        if (rule.selectorText === selector) {
                            return rule;
                        }
                    }
                }
            }
        }
    })(Styles = KIP.Styles || (KIP.Styles = {}));
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    /**
     * @file Functions that allow for easier creation of SVG elements
     * @author Kip Price
     * @version 1.0
     * @since 1.1
     */
    /**
     * Creates an SVG parent that can be added to dynamically
     *
     * @param {String} id      The ID for the SVG element created
     * @param {Number} width   The width at which the SVG should display {optional: 0}
     * @param {Number} height  The height at which the SVG should display {optional: 0}
     * @param {String} view    The viewBox parameter that should be set for the created element {optional: "0 0 0 0"}
     * @param {String} content The contents of the SVG that should displayed {optional: ""}
     *
     * @returns {SVGElement} The SVG element that was created
     */
    function createSVG(id, width, height, view, content, aspect) {
        "use strict";
        try {
            // Create the element and set its ID
            var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("version", "1.1");
            // Set the various sizing variables, or use defaults
            if (id) {
                svg.setAttribute("id", id);
            }
            if (width !== undefined) {
                svg.setAttribute("width", width.toString() || "0");
            }
            if (height !== undefined) {
                svg.setAttribute("height", height.toString() || "0");
            }
            svg.setAttribute("viewBox", view || "0 0 0 0");
            // Give the new content
            if (content)
                svg.innerHTML = content;
            // Set a default for the aspect ratio
            svg.setAttribute("preserveAspectRatio", aspect || "xMinYMin meet");
            return svg;
        }
        catch (e) {
            throw new Error("svg creation failed");
        }
    }
    KIP.createSVG = createSVG;
    ;
    /**
     * Creates a piece of an SVG drawing
     *
     * @param {String} type - What type of SVG element we are drawing
     * @param {Object} attr - An object of key-value pairs of attributes to set for this element
     *
     * @returns {SVGElement} The element to be added to the SVG drawing
     */
    function createSVGElem(type, attr) {
        "use strict";
        try {
            var elem, key;
            // Create an element within the appropriate namespace
            elem = document.createElementNS("http://www.w3.org/2000/svg", type);
            // Loop through the various attributes and assign them out
            for (key in attr) {
                if (attr.hasOwnProperty(key)) {
                    elem.setAttribute(key, attr[key]);
                }
            }
            // Return the resultant element
            return elem;
        }
        catch (e) {
            console.log("Error creating SVG element");
            return null;
        }
    }
    KIP.createSVGElem = createSVGElem;
    ;
})(KIP || (KIP = {}));
///<reference path="html.ts" />
var KIP;
(function (KIP) {
    // CreateTable
    //-------------------------------------------------------------------------------------
    /**
     * Creates a table with a specified set of cell elements
     * @param {string} tableID - The unique identifier to use for this table
     * @param {string} [tableClass] - The CSS class to use for the table
     * @param {array} elements - A 2D array of the indexing method [row][column] that contains the contents of the cell at this position that should be created within the table.
     *                         - Can come in three forms: a string of plain content, an already created element, or an object array with the following properties
     * @param {object} [elements[r][c].create] - An object to be passed into CreateElement, to generate the content of the cell
     * @param {string} [elements[r][c].content] - A string to be used as the content of the cell
     * @param {object} [elements[r][c].attr] - All additional attributes that should be applied to the cell (colspan & rowspan, e.g.)
     *
     * @returns {HTMLElement} The created HTML table
     *
     * */
    function createTable(tableID, tableClass, elements, rowNum, colNum) {
        "use strict";
        var tbl;
        var row;
        var cell;
        var elem;
        var rIdx;
        var cIdx;
        // Set a row number
        if (!rowNum) {
            rowNum = (elements && elements.length) || 0;
        }
        // Create the table
        tbl = KIP.createElement({
            type: "table",
            cls: tableClass
        });
        for (rIdx = 0; rIdx < rowNum; rIdx += 1) {
            // Grab the column number if we don't have it
            if (!colNum) {
                colNum = elements[rIdx].length;
            }
            row = tbl.insertRow(-1);
            for (cIdx = 0; cIdx < colNum; cIdx += 1) {
                // Check how this element should be added
                elem = elements[rIdx][cIdx];
                cell = row.insertCell(-1);
                processCellContents(elem, cell);
            }
        }
        return tbl;
    }
    KIP.createTable = createTable;
    /**
     * Processes data that can be used to populate a table cell
     * @param  {any}                  data The data to populate the cell with
     * @param  {HTMLTableCellElement} cell The cell to populate
     * @return {HTMLTableCellElement}      The cell, newly populated with contents
     */
    function processCellContents(data, cell) {
        "use strict";
        var content;
        var key;
        if (!data) {
            return cell;
        }
        // Check if this is a simple string, and if so, set it to be the cell content
        if (typeof data == "string") {
            cell.innerHTML = data;
            // Check if the content is an HTML element, in which case, append it
        }
        else if (data.appendChild) {
            cell.appendChild(data);
            // Check if the content is a custom object, in which case, parse it
        }
        else {
            if (data.create) {
                content = KIP.createElement(data.create);
                cell.appendChild(content);
            }
            else {
                cell.innerHTML = data.content;
            }
            // Handle additional properties on our custom element
            for (key in data.attr) {
                if (data.attr.hasOwnProperty(key)) {
                    cell.setAttribute(key, data.attr[key]);
                }
            }
        }
        return cell;
    }
    KIP.processCellContents = processCellContents;
    ;
    /**
     * Adds a row to an HTML table element
     * @param  {HTMLTableElement} table      The table element to add to
     * @param  {any[]}            [elements] Any elements that should be inccluded as cells in this row
     * @param  {number}           [idx]      The index at which this row should be added
     * @param  {number}           [colNum]   The number of columns that should be added to this row
     * @return {HTMLTableRowElement}       The row that was created
     */
    function addRow(table, elements, idx, colNum) {
        "use strict";
        var row;
        var cell;
        var cIdx;
        var data;
        if (!idx && (idx !== 0)) {
            idx = -1;
        }
        if (!colNum && colNum !== 0) {
            colNum = elements.length;
        }
        // Quit if we don't have a table
        if (!table)
            return;
        if (!table.insertRow)
            return;
        row = table.insertRow(idx);
        // Loop through columns to add cells
        for (cIdx = 0; cIdx < colNum; cIdx += 1) {
            cell = row.insertCell(-1);
            data = elements[cIdx] || "";
            processCellContents(data, cell);
        }
        return row;
    }
    KIP.addRow = addRow;
    ;
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    var TemplateTypeEnum;
    (function (TemplateTypeEnum) {
        TemplateTypeEnum[TemplateTypeEnum["FILE"] = 0] = "FILE";
        TemplateTypeEnum[TemplateTypeEnum["TEXT"] = 1] = "TEXT";
    })(TemplateTypeEnum = KIP.TemplateTypeEnum || (KIP.TemplateTypeEnum = {}));
    ;
    var templates = {};
    // A templated object allows you to take some HTML pattern and dynamically fill it
    // It is loosely based on the jquery framework of templating
    // If an element does not have an ID, it is not replaceable
    /**
     * Create a templated HTML object
     * @param {object} inObj - All details needed to create the template
     * @param {string} inObj.type - Determines how the contents are loaded. Can be "file" or "text".
     * @param {string} inObj.id - The identifier to save for the template
     * @param {string} [inObj.content] - Contains free-text string for inOBjs of type "text"
     * @param {string} [inObj.name] - Contains the name of the file to load for inObjs of type "file"
     **/
    function createTemplate(inObj) {
        "use strict";
        var content;
        if (!inObj.id) {
            return false;
        } // Quit if we don't have an ID for this template
        if (templates[inObj.id]) {
            return false;
        } // Quit if the ID is already taken
        var template = {
            structure: [],
            html: [],
            elems: {},
            suffix: 0
        };
        if (inObj.type === TemplateTypeEnum.FILE) {
            KIP.loadFile(inObj.name, function (data) {
                processContents(data, template);
            });
        }
        else {
            content = inObj.content;
            processContents(content, template);
        }
        templates[inObj.id] = template; // save the template into the collection
    }
    KIP.createTemplate = createTemplate;
    ;
    /** parse all pieces of the template */
    function processContents(data, template) {
        var temp;
        // create the element we store information into
        temp = document.createElement("template");
        temp.innerHTML = data;
        // Loop through the children
        processChildren(temp.content.children, template, "", null);
    }
    /** Loops through children on an element and saves it to the template object we are creating */
    function processChildren(children, obj, parentID, parent) {
        var cIdx;
        var child;
        // Quit if we don't have anything to save into
        if (!obj)
            return;
        // Loop through the children in this parent & add them to the object
        for (cIdx = 0; cIdx < children.length; cIdx += 1) {
            child = children[cIdx];
            processChild(child, parentID, parent, obj);
        }
    }
    /** handle the processing of an individual child */
    function processChild(child, parentID, parent, template) {
        var id;
        var childClone;
        childClone = child.cloneNode(); // clone the element
        id = child.getAttribute("id"); // if there is an ID, add it to the elems array
        if (id) {
            addToElemArray(id, childClone, parentID, template); // call a helper to add the child
        }
        processChildren(child.children, template, id, childClone); // Recurse on its children
        // Add it to our clones of the elements
        // If there's a parent element, append it
        if (parent) {
            parent.appendChild(childClone);
            // Otherwise add it to our top-level element array
        }
        else {
            template.html.push(childClone);
        }
    }
    /** add a particular element to the array of ID'd elements */
    function addToElemArray(id, elem, parentID, template) {
        // If this is the first element with this ID 
        if (!template.elems[id]) {
            template.elems[id] = elem;
            return true;
            // If there is already an element with this id, add the parent ID into the mix
        }
        else if (parentID) {
            template.elems[parentID + "->" + id] = elem;
            return true;
            // if there is no spot for this elem, return false;
        }
        else {
            return false;
        }
    }
    /**
     * Loads a template with the specified data
     * @param {string} id - The identifier of the template to load
     * @param {object} content - An object containing any additional data to load into the template.
     * @param {boolean} [excludeBlank] - If true, any element with an ID in the template that is not populated by 'content' will be removed
     * @param {string} [suffix] - If provided, the suffix added to element IDs to differentiate this iteration of the template. Defaults to the
     *														count of iterations of the template.
     * @param {string} [delim] - If provided, the delimiter between the ID and the delimiter. Defaults to "|".
     * @returns {array} Array of top-level HTML elements in the template
     **/
    function loadTemplate(id, content, excludeBlank, suffix, delim) {
        "use strict";
        var elem, out, html, prop, pIdx, i, defaults;
        defaults = {};
        // Grab the template & quit if it isn't there
        var template = templates[id];
        if (!template)
            return;
        // Set some defaults
        if (!delim) {
            delim = "|";
        }
        if (!suffix && (suffix !== 0)) {
            suffix = ++template.suffix;
        }
        // Loop through each of the pieces in the template
        for (id in template.elems) {
            if (template.elems.hasOwnProperty(id)) {
                elem = template.elems[id];
                defaults[id] = {};
                // If we have data to fill, use it
                if (content[id]) {
                    // String content: just build the element without any id or class changes
                    if (typeof content[id] === typeof "abc") {
                        defaults[id].innerHTML = elem.innerHTML || "";
                        elem.innerHTML = content[id];
                    }
                    else {
                        // Loop through each attribute in the element & set it
                        for (pIdx in content[id]) {
                            if (content[id].hasOwnProperty(pIdx)) {
                                prop = content[id][pIdx];
                                if (pIdx === "innerHTML") {
                                    defaults[id][pIdx] = elem.innerHTML || "";
                                    elem.innerHTML = prop;
                                }
                                else if (pIdx === "value") {
                                    var inputElem = elem;
                                    defaults[id][pIdx] = inputElem.value || "";
                                    inputElem.value = prop;
                                }
                                else {
                                    defaults[id][pIdx] = elem.getAttribute(pIdx) || "";
                                    elem.setAttribute(pIdx, prop);
                                }
                            }
                        }
                    }
                    // Flag elements that should be excluded
                }
                else if (excludeBlank) {
                    defaults[id].excluded = {
                        parent: elem.parentNode,
                        next: elem.nextSibling
                    };
                    elem.parentNode.removeChild(elem);
                }
                // Even if we don't have content for an element, we need to update the ID
                elem.setAttribute("id", id + delim + suffix);
                defaults[id].id = id;
            }
        }
        // Now loop through the structure & use it to create the output elements
        out = [];
        // Copy HTML elements
        for (i = 0; i < template.html.length; i += 1) {
            out[i] = template.html[i].cloneNode(true);
        }
        // Restore the default values to these elements
        restoreDefaults(template, defaults);
        return out;
    }
    KIP.loadTemplate = loadTemplate;
    function restoreDefaults(template, defaults) {
        var id;
        var elem;
        for (id in template.elems) {
            if (template.elems.hasOwnProperty(id)) {
                elem = template.elems[id];
                // Only do stuff with elements that changed from their default values
                if (defaults[id]) {
                    // Restore any deleted elements
                    if (defaults[id].excluded) {
                        defaults[id].excluded.parent.insertBefore(elem, defaults[id].excluded.next);
                    }
                    else {
                        var pIdx = void 0;
                        for (pIdx in defaults[id]) {
                            if (defaults[id].hasOwnProperty(pIdx)) {
                                if (pIdx === "innerHTML") {
                                    elem.innerHTML = defaults[id][pIdx];
                                }
                                else if (pIdx === "value") {
                                    var inputValue = elem;
                                    inputValue.value = defaults[id][pIdx];
                                }
                                else {
                                    elem.setAttribute(pIdx, defaults[id][pIdx]);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
})(KIP || (KIP = {}));
///<reference path="promise.ts" />
var KIP;
(function (KIP) {
    var _lastClsID = 0;
    /**...........................................................................
     * transition
     * ...........................................................................
     * Transition an element to a particular style, then alert the caller that
     * it has completed
     *
     * @param   element     The element to transition
     * @param   startStyle  If needed, any specific new attributes that are needed for this object
     * @param   endStyle    The style we should end up with
     * @param   time        How long this transition should take
     * @param   delay       How long this transition should be delayed
     *
     * @returns Promise that will be called after transition completes
     * ...........................................................................
     */
    function transition(element, startStyle, endStyle, time, delay) {
        if (!element) {
            return KIP.KipPromise.reject("no element");
        }
        var startName = _generateRandomClassName();
        _createTransitionClass(startName, startStyle, element);
        var endName = _generateRandomClassName();
        if (!endStyle.transition) {
            endStyle.transition = "all ease-in-out " + (time / 1000) + "s";
        }
        _createTransitionClass(endName, endStyle, element);
        KIP.addClass(element, startName);
        return new KIP.KipPromise(function (resolve, reject) {
            // handle the delay
            window.setTimeout(function () {
                // add the final class to start transitioning
                KIP.addClass(element, endName);
                // handle the duration
                window.setTimeout(function () {
                    KIP.removeClass(element, startName);
                    // resolve the promise at the next render
                    window.requestAnimationFrame(function () {
                        resolve("success");
                        window.setTimeout(function () {
                            KIP.removeClass(element, endName);
                        }, 10);
                    });
                }, time);
            }, delay);
        });
    }
    KIP.transition = transition;
    function transitionProperty(element, propertyName, startValue, endValue, duration, delay) {
        //TODO
        return KIP.KipPromise.reject("not implemented");
    }
    //#region HELPER FUNCTIONS
    function _generateRandomClassName() {
        _lastClsID += 1;
        return "gencls" + _lastClsID;
    }
    function _createTransitionClass(className, classDef, elem) {
        // replace any transition specific terms
        KIP.map(classDef, function (value, key) {
            value = value.replace("<width>", (elem.offsetWidth + 1) + "px");
            value = value.replace("<height>", elem.offsetHeight + "px");
            value = value.replace("<left>", elem.offsetLeft + "px");
            value = value.replace("<top>", elem.offsetTop + "px");
            value = value.replace("<right>", (elem.offsetLeft + elem.offsetWidth) + "px");
            value = value.replace("<bottom>", (elem.offsetTop + elem.offsetHeight) + "px");
            classDef[key] = value;
        });
        return KIP.Styles.createClass("." + className, classDef);
    }
    //#endregion
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    //#region INTERFACES
    ;
    var DEBUG = true;
    //#endregion
    // Public namespace wrapper for this functionality
    var Trig;
    (function (Trig) {
        //#region HELPER FUNCTIONS
        /**--------------------------------------------------------------------------
         * debugPoint
         * --------------------------------------------------------------------------
         * Print the coordinates contained in a point
         *
         * @param point 	the point to print for debugging
         * --------------------------------------------------------------------------
         */
        function debugPoint(point) {
            if (!point.z) {
                console.log("2D POINT: (" + point.x + ", " + point.y + ")");
            }
            else {
                console.log("3D POINT: (" + point.x + ", " + point.y + ", " + point.z + ")");
            }
        }
        Trig.debugPoint = debugPoint;
        /**--------------------------------------------------------------------------
         * degressToRadians
         * --------------------------------------------------------------------------
         * Convert degrees measure to the equivalent radians measure
         *
         * @param 	deg 	The degree value to convert
         *
         * @returns The approproate angle in radians
         * --------------------------------------------------------------------------
         */
        function degreesToRadians(deg) {
            var result = ((Math.PI * deg) / 180);
            return result;
        }
        Trig.degreesToRadians = degreesToRadians;
        /**--------------------------------------------------------------------------
         * getEndPoint
         * --------------------------------------------------------------------------
         * Calculate where a particular vector will end, given the start point, distance, and angle
         *
         * @param 	startPoint 	where the vector originates
         * @param 	deg 		the degree of angle
         * @param 	distance	how far the vector should extend
         * --------------------------------------------------------------------------
         */
        function getEndPoint(startPoint, deg, distance) {
            var rad = degreesToRadians(deg);
            var result = {
                x: (Math.cos(rad) * distance) + startPoint.x,
                y: (Math.sin(rad) * distance) + startPoint.y
            };
            return result;
        }
        Trig.getEndPoint = getEndPoint;
        function getCentralPoint(elem) {
            return {
                x: elem.offsetLeft + (elem.offsetWidth / 2),
                y: elem.offsetTop + (elem.offsetWidth / 2)
            };
        }
        Trig.getCentralPoint = getCentralPoint;
        //#endregion
        //#region VISUAL CHANGES
        /**--------------------------------------------------------------------------
         * arrangeRadially
         * --------------------------------------------------------------------------
         * Arrange a series of elements around a central element, making sure there is enough room for each element
         *
         * @param 	centralELem 	the element to use as the center point
         * @param 	fringeElems 	the elements to arrange around the central element
         * @param 	minAngle 		the angle at which to start (in degrees)
         * @param 	maxAngle 		the angle at which to stop (in degrees)
         * --------------------------------------------------------------------------
         */
        function arrangeRadially(centralELem, fringeElems, minAngle, maxAngle) {
            // The calculation for this needs to be as follows:
            //		1. Each element gets an angle assigned
            // 		2. each element has its dimensions determined, then the distance of circle that would be neede to fit all X
            // set defaults for angles
            minAngle = minAngle || 0;
            maxAngle = maxAngle || 360;
            var availableAngle = maxAngle - minAngle;
            var deltaAngle = availableAngle / fringeElems.length;
            var maxDistance = 0;
            var centralPoint = {
                x: centralELem.offsetWidth / 2,
                y: centralELem.offsetHeight / 2
            };
            var elem;
            // First calculate the max distance we need to move elements away
            for (var _i = 0, fringeElems_1 = fringeElems; _i < fringeElems_1.length; _i++) {
                elem = fringeElems_1[_i];
                var elemRadius = Math.max(elem.offsetWidth, elem.offsetHeight);
                var centralAngle = availableAngle / fringeElems.length;
                var internalAngle = 180 - centralAngle;
                var appropriateDistance = (elemRadius * Math.sin(degreesToRadians(internalAngle))) / Math.sin(degreesToRadians(centralAngle));
                if (appropriateDistance > maxDistance) {
                    maxDistance = appropriateDistance;
                }
            }
            if (DEBUG) {
                console.log("DISTANCE: " + maxDistance);
                console.log("CENTRAL POINT: " + "(" + centralPoint.x + ", " + centralPoint.y + ")");
            }
            // actually position the elements
            var i;
            for (i = 0; i < fringeElems.length; i += 1) {
                var pt = getEndPoint(centralPoint, minAngle + (deltaAngle * i), maxDistance);
                console.log(pt);
                elem = fringeElems[i];
                elem.style.left = (pt.x - (elem.offsetWidth / 2)) + "px";
                elem.style.top = (pt.y - (elem.offsetHeight / 2)) + "px";
            }
        }
        Trig.arrangeRadially = arrangeRadially;
        /**--------------------------------------------------------------------------
         * drawLine
         * --------------------------------------------------------------------------
         * Draws a line between two points
         *
         * @param 	start       	The start point of the line
         * @param 	end         	The end point of the line
         * @param 	host        	The element to draw the line on
         * @param 	lbl       		If included, what to label the line
         * @param 	lblNoRotate 	If true, doesn't rotate the text to match the line angle
         *
         * @returns The line that was drawn
         * --------------------------------------------------------------------------
         */
        function drawLine(start, end, host, lbl, lblNoRotate) {
            "use strict";
            var angle;
            var distance;
            var div;
            var cls;
            var lblElem;
            distance = getDistance(start, end);
            angle = getAngle(start, end);
            // Create a CSS class that can be overridden for general options
            cls = {
                "position": "absolute",
                "height": "1px",
                "transform-origin": "0px 0px"
            };
            KIP.createClass(".angledLine", cls);
            // Create the div and give it minimal styling to show the line
            div = KIP.createSimpleElement("", "angledLine");
            div.style.left = start.x + "px";
            div.style.top = start.y + "px";
            // Approriately assign the size of the element
            div.style.width = distance + "px";
            // Rotate to our specified degree
            div.style.transform = "rotate(" + angle + "deg)";
            // Add to the specified parent element
            host.appendChild(div);
            // If there is also a label, create that
            if (lbl) {
                lblElem = KIP.createSimpleElement("", "lbl", lbl);
                if (lblNoRotate) {
                    lblElem.style.transform = "rotate(" + (-1 * angle) + "deg)";
                    lblElem.style.transformOrigin = "(0, 0)";
                }
                div.appendChild(lblElem);
            }
            return div;
        }
        Trig.drawLine = drawLine;
        ;
        /**--------------------------------------------------------------------------
         * connectElements
         * --------------------------------------------------------------------------
         * Draws a line between the two provided elements
         *
         * @param 	start_elem 	The element to start the line at
         * @param 	end_elem   	The element to end the line at
         *
         * @return 	The line that gets drawn
         * --------------------------------------------------------------------------
         */
        function connectElements(start_elem, end_elem, lbl, lblNoRotate) {
            "use strict";
            var start_point;
            var end_point;
            var x_1;
            var x_2;
            var y_1;
            var y_2;
            var parent;
            // Set our parent to use when calculating the global offsets
            parent = KIP.findCommonParent(start_elem, end_elem);
            // Set the values to be the center of each element
            x_1 = KIP.globalOffsetLeft(start_elem, parent) + (start_elem.offsetWidth / 2);
            x_2 = KIP.globalOffsetLeft(end_elem, parent) + (end_elem.offsetWidth / 2);
            y_1 = KIP.globalOffsetTop(start_elem, parent) + (start_elem.offsetHeight / 2);
            y_2 = KIP.globalOffsetTop(end_elem, parent) + (end_elem.offsetHeight / 2);
            // Create the objects for these points
            start_point = { x: x_1, y: y_1 };
            end_point = { x: x_2, y: y_2 };
            return drawLine(start_point, end_point, parent, lbl, lblNoRotate);
        }
        Trig.connectElements = connectElements;
        ;
        //#endregion
        //#region CONVERSION FUNCTIONS
        /**--------------------------------------------------------------------------
         * clientRectToShape
         * --------------------------------------------------------------------------
         * Converts a Client Rect to a basic shape
         *
         * @param 	rect 	The rectangle to convert
         *
         * @returns The array of points that make up this shape
         * --------------------------------------------------------------------------
         */
        function clientRectToShape(rect) {
            var out;
            out = new Array();
            // Top-left corner
            out[0] = {
                x: rect.left,
                y: rect.top
            };
            // Top-right corner
            out[1] = {
                x: rect.left + rect.width,
                y: rect.top
            };
            // Bottom-right corner
            out[2] = {
                x: rect.left + rect.width,
                y: rect.top + rect.height
            };
            // Bottom-left corner
            out[3] = {
                x: rect.left,
                y: rect.top + rect.height
            };
            return out;
        }
        Trig.clientRectToShape = clientRectToShape;
        /**--------------------------------------------------------------------------
         * svgRectToShape
         * --------------------------------------------------------------------------
         * Converts a SVG Rect to a basic shape
         *
         * @param 	rect 	The rectangle to convert
         *
         * @returns The array of points that make up this shape
         * --------------------------------------------------------------------------
         */
        function svgRectToShape(rect) {
            var out;
            out = new Array();
            // Top-left corner
            out[0] = {
                x: rect.x,
                y: rect.y
            };
            // Top-right corner
            out[1] = {
                x: rect.x + rect.width,
                y: rect.y
            };
            // Bottom-right corner
            out[2] = {
                x: rect.x + rect.width,
                y: rect.y + rect.height
            };
            // Bottom-left corner
            out[3] = {
                x: rect.x,
                y: rect.y + rect.height
            };
            return out;
        }
        Trig.svgRectToShape = svgRectToShape;
        /**--------------------------------------------------------------------------
         * svgRectToBasicRect
         * --------------------------------------------------------------------------
         * Convert a SVG rectangle to a basic rectangle
         *
         * @param 	rect 	The rectangle to convert
         *
         * @returns The resulting IBasicRect representation of the passed in rect
         * --------------------------------------------------------------------------
         */
        function svgRectToBasicRect(rect) {
            var out;
            out = {
                x: rect.x,
                y: rect.y,
                w: rect.width,
                h: rect.height
            };
            return out;
        }
        Trig.svgRectToBasicRect = svgRectToBasicRect;
        ;
        /**--------------------------------------------------------------------------
         * clientRectToBasicRect
         * --------------------------------------------------------------------------
         * Convert a client rectangle to a basic rectangle
         *
         * @param 	rect 	The rectangle to convert
         *
         * @returns The resulting IBasicRect representation of the passed in rect
         * --------------------------------------------------------------------------
         */
        function clientRectToBasicRect(rect) {
            var out;
            out = {
                x: rect.left,
                y: rect.top,
                w: rect.width,
                h: rect.height
            };
            return out;
        }
        Trig.clientRectToBasicRect = clientRectToBasicRect;
        /**--------------------------------------------------------------------------
         * toBasicRect
         * --------------------------------------------------------------------------
         * Converts any supported rectangle to a basic rectangle
         *
         * @param 	rect 	The rectangle to convert
         *
         * @returns The basic rect version of this client / svg rect
         * --------------------------------------------------------------------------
         */
        function toBasicRect(rect) {
            var r;
            if (KIP.isIBasicRect(rect)) {
                r = rect;
            }
            else if (KIP.isClientRect(rect)) {
                r = clientRectToBasicRect(rect);
            }
            else if (KIP.isSVGRect(rect)) {
                r = svgRectToBasicRect(rect);
            }
            return r;
        }
        Trig.toBasicRect = toBasicRect;
        ;
        //#endregion
        //#region CALCULATION FUNCTIONS
        /**--------------------------------------------------------------------------
         * getAngle
         * --------------------------------------------------------------------------
         * Finds the angle between two points
         *
         * @param {Object} start - The origin point of an angle
         * @param {Number} start.x - The x position of the origin point
         * @param {Number} start.y - The y position of the origin point
         * @param {Object} end - The destination point of an angle
         * @param {Number} end.x - The x position of the end point
         * @param {Number} end.y - The y position of the end point
         *
         * @return {Number} The angle (in degrees) between the two points
         * --------------------------------------------------------------------------
         */
        function getAngle(start, end) {
            "use strict";
            var dx;
            var dy;
            var q_sign;
            var q_ang;
            var angle;
            dx = (end.x - start.x);
            dy = (end.y - start.y);
            // Don't divide by zero
            if (dx === 0)
                return (dy < 0) ? 270 : 90;
            // Handle horizontals too
            if (dy === 0)
                return (dx < 0) ? 180 : 0;
            // Atan requires that all elements are positive
            q_sign = ((dx * dy) > 0) ? 1 : -1;
            q_ang = (dx < 0) ? Math.PI : 0;
            angle = Math.atan(Math.abs(dy) / Math.abs(dx));
            angle = ((angle * q_sign) + q_ang);
            return (angle * (180 / Math.PI));
        }
        Trig.getAngle = getAngle;
        ;
        /**--------------------------------------------------------------------------
         * getDistance
         * --------------------------------------------------------------------------
         * Finds the distance between the two provided points
         *
         * @param 	start 	The first endpoint of the segment we are measuring
         * @param 	end 	The second enpoint of the segment we are measuring
         *
         * @return The distance between the two points
         * --------------------------------------------------------------------------
         */
        function getDistance(start, end) {
            "use strict";
            var distance;
            var dx;
            var dy;
            dx = (start.x - end.x);
            dy = (start.y - end.y);
            distance = Math.sqrt((dx * dx) + (dy * dy));
            return distance;
        }
        Trig.getDistance = getDistance;
        ;
        /**--------------------------------------------------------------------------
         * calculatePolygonInternalAngle
         * --------------------------------------------------------------------------
         * calculate the internal angle for a given polygon
         *
         * @param 	numberOfSides 	The number of sides that the polygon has
         *
         * @returns the internal angle for this polygon, in radians
         * --------------------------------------------------------------------------
         */
        function calculatePolygonInternalAngle(numberOfSides) {
            return KIP.roundToPlace(degreesToRadians(360 / numberOfSides), 1000);
        }
        Trig.calculatePolygonInternalAngle = calculatePolygonInternalAngle;
        //#endregion
        //#region CONTAINMENT FUNCTIONS
        /**--------------------------------------------------------------------------
         * isWithin
         * --------------------------------------------------------------------------
         * Checks whether a value is within a max/min range
         *
         * @param 	val           	The value to check for inclusion
         * @param 	min           	The max value
         * @param 	max           	The min value
         * @param 	non_inclusive 	True if we shouldn't include the end points
         *
         * @returns True if the value is contained in the range
         * --------------------------------------------------------------------------
         */
        function isWithin(val, min, max, non_inclusive) {
            "use strict";
            if (non_inclusive)
                return (val < max && val > min);
            return (val <= max && val >= min);
        }
        Trig.isWithin = isWithin;
        /**-------------------------------------------------------------------------
         * isPointContained
         * --------------------------------------------------------------------------
         * Determines whether a point is contained within a particular rectangle
         *
         * @param 	pt 		The point to check for containment
         * @param 	rect 	The rectangle to check
         *
         * @returns True if the point is contained in the rectangle
         ----------------------------------------------------------------------------*/
        function isPointContained(pt, rect) {
            "use strict";
            var r = toBasicRect(rect);
            if (pt.x < r.x) {
                return false;
            }
            if (pt.x > (r.x + r.w)) {
                return false;
            }
            if (pt.y < r.y) {
                return false;
            }
            if (pt.y > r.y + r.h) {
                return false;
            }
            return true;
        }
        Trig.isPointContained = isPointContained;
        /**----------------------------------------------------------------------------
         * isRectContained
         * ----------------------------------------------------------------------------
         * Checks whether a client rect is entirely contained within another
         *
         * @param 	rect      	The element to check for containement
         * @param 	container 	The element to check if the rect is contained within
         *
         * @returns True if rect is completely contained by container
         ------------------------------------------------------------------------------*/
        function isRectContained(rect, container) {
            var r;
            var c;
            // Convert the first rect to a basic rect
            r = toBasicRect(rect);
            // Convert the second rect to a basic rect
            c = toBasicRect(container);
            // Too far left
            if (r.x < c.x)
                return false;
            // Too far right
            if ((r.x + r.w) > (c.w + c.x))
                return false;
            // Too far up
            if (r.y < c.y)
                return false;
            // Too far down
            if ((r.y + r.h) > (c.h + c.y))
                return false;
            // Just right
            return true;
        }
        Trig.isRectContained = isRectContained;
        /**-----------------------------------------------------------------------------
         * isElementContained
         *------------------------------------------------------------------------------
         * Checks if an element is completely contained by another element
         *
         * @param 	elem      	The element to check for containment
         * @param 	container 	The element to check if it contains the other elem
         *
         * @returns True if the element is completely contained
         -------------------------------------------------------------------------------
         */
        function isElementContained(elem, container) {
            var rect = elem.getBoundingClientRect();
            var bounds = elem.getBoundingClientRect();
            return isRectContained(rect, bounds);
        }
        Trig.isElementContained = isElementContained;
        ;
        /**--------------------------------------------------------------------------
         * isShapeContained
         * --------------------------------------------------------------------------
         * Checks if a given shape is contained within a given bounding box
         *
         * @param 	shape 	The collection of points to check
         * @param 	bounds 	The bounding box to be within
         *
         * @returns True if the shape is completely contained in the bounding box
         * --------------------------------------------------------------------------
         */
        function isShapeContained(shape, bounds) {
            var pt;
            for (var _i = 0, shape_1 = shape; _i < shape_1.length; _i++) {
                pt = shape_1[_i];
                if (!isPointContained(pt, bounds)) {
                    return false;
                }
            }
            return true;
        }
        Trig.isShapeContained = isShapeContained;
        //#endregion
        //#region OVERLAP FUNCTIONS
        /**--------------------------------------------------------------------------
         * doElementsOverlap
         * --------------------------------------------------------------------------
         * Checks if two given elements overlap
         *
         * @param 	elem1 	The first element to check
         * @param 	elem2 	The second element to check
         *
         * @returns True if the elements overlap, false otherwise
         * --------------------------------------------------------------------------
         */
        function doElementsOverlap(elem1, elem2) {
            "use strict";
            var rect1;
            var rect2;
            rect1 = elem1.getBoundingClientRect();
            rect2 = elem2.getBoundingClientRect();
            return doRectsOverlap(rect1, rect2);
        }
        Trig.doElementsOverlap = doElementsOverlap;
        ;
        /**--------------------------------------------------------------------------
         * doRectsOverlap
         * --------------------------------------------------------------------------
         * Checks if two rectangles overlap at all
         *
         * @param 	rect1 	The first rectangle to check
         * @param 	rect2 	The second rectangle to check
         *
         * @returns True if there is any overlap between the rectangles
         * --------------------------------------------------------------------------
         */
        function doRectsOverlap(rect1, rect2) {
            var r1 = toBasicRect(rect1);
            var r2 = toBasicRect(rect2);
            return false;
        }
        Trig.doRectsOverlap = doRectsOverlap;
        /**--------------------------------------------------------------------------
         * doBasicRectsOverlap
         * --------------------------------------------------------------------------
         * detect if two rectangles overlap
         *
         * @param 	rect1	the first rectangle to compare
         * @param 	rect2	the second rectangle to compare
         *
         * @returns true if the two rectangles do overlap
         * --------------------------------------------------------------------------
         */
        function doBasicRectsOverlap(rect1, rect2) {
            var x_overlap;
            var y_overlap;
            if (rect1.x >= rect2.x && rect1.x <= (rect2.w + rect2.x)) {
                x_overlap = true;
            }
            if (rect2.x >= rect1.x && rect2.x <= (rect1.w + rect1.x)) {
                x_overlap = true;
            }
            if (rect1.y >= rect2.y && rect1.y <= (rect2.h + rect2.y)) {
                y_overlap = true;
            }
            if (rect2.y >= rect1.y && rect2.y <= (rect1.h + rect1.y)) {
                y_overlap = true;
            }
            return (x_overlap && y_overlap);
        }
        Trig.doBasicRectsOverlap = doBasicRectsOverlap;
        //#endregion
        //#region INTERSECTION FUNCTIONS
        /**--------------------------------------------------------------------------
         * findBasicRectIntersection
         * --------------------------------------------------------------------------
         * calculate the overlap section for 2 given basic rectangles
         *
         * @param rect1 - the first rectangle to check
         * @param rect2 - the second rectangle to check
         *
         * @returns The rectangle of overlap
         * --------------------------------------------------------------------------
         */
        function findBasicRectIntersection(rect1, rect2) {
            var out;
            var min_x = Math.max(rect1.x, rect2.x);
            var max_x = Math.min(rect1.x + rect1.w, rect2.x + rect2.w);
            var min_y = Math.max(rect1.y, rect2.y);
            var max_y = Math.min(rect1.y + rect1.h, rect2.y + rect2.h);
            out = {
                x: min_x,
                y: min_y,
                w: (max_x - min_x),
                h: (max_y - min_y)
            };
            return out;
        }
        Trig.findBasicRectIntersection = findBasicRectIntersection;
        //#endregion
    })(Trig = KIP.Trig || (KIP.Trig = {}));
})(KIP || (KIP = {}));
///<reference path="trig.ts" />
var KIP;
(function (KIP) {
    /** check if the element is an HTML element */
    function isHTMLElement(test) {
        if (!test) {
            return false;
        }
        if (isDrawable(test)) {
            return false;
        }
        return (!!test.appendChild);
    }
    KIP.isHTMLElement = isHTMLElement;
    /** Check if the element is a string */
    function isString(test) {
        return (typeof test === "string");
    }
    KIP.isString = isString;
    /** check if the element is a number */
    function isNumber(test) {
        return (typeof test === "number");
    }
    KIP.isNumber = isNumber;
    /** check if the element is a boolean */
    function isBoolean(test) {
        return (typeof test === "boolean");
    }
    KIP.isBoolean = isBoolean;
    /** check if the element is a client rectangle */
    function isClientRect(test) {
        var rect = {
            top: 1,
            bottom: 1,
            left: 1,
            right: 1,
            height: 1,
            width: 1,
        };
        if (isInterface(test, rect)) {
            return true;
        }
        return false;
    }
    KIP.isClientRect = isClientRect;
    ;
    /** check if the element is a SVG rectangle */
    function isSVGRect(test) {
        var rect = {
            x: 1,
            y: 1,
            width: 1,
            height: 1
        };
        if (isInterface(test, rect)) {
            return true;
        }
        return false;
    }
    KIP.isSVGRect = isSVGRect;
    /** check if the element is a basic rectangle */
    function isIBasicRect(test) {
        var rect = {
            x: 1,
            y: 1,
            w: 1,
            h: 1
        };
        if (isInterface(test, rect)) {
            return true;
        }
        return false;
    }
    KIP.isIBasicRect = isIBasicRect;
    function isIPoint(test) {
        var pt = {
            x: 1,
            y: 1,
            z: 0
        };
        return isInterface(test, pt);
    }
    KIP.isIPoint = isIPoint;
    /** check if the element is an element definition implementation */
    function isIElemDefinition(test) {
        var out;
        var comp = {
            after_content: "",
            attr: null,
            before_content: "",
            children: null,
            cls: "",
            content: "",
            id: "",
            parent: null,
            type: ""
        };
        if (isInterface(test, comp)) {
            return true;
        }
        return false;
    }
    KIP.isIElemDefinition = isIElemDefinition;
    /** check if the element is an IExtrema implementation */
    function isIExtrema(test) {
        var extrema = {
            min: { x: 0, y: 0 },
            max: { x: 0, y: 0 }
        };
        return isInterface(test, extrema);
    }
    KIP.isIExtrema = isIExtrema;
    /** generic function to check if a given object implements a particular interface */
    function isInterface(test, full_imp) {
        // Loop through all of the properties of the full interface implementation & make sure at least one required elem is populated in the test
        var prop;
        var req_match = true;
        var val;
        for (prop in full_imp) {
            if (full_imp.hasOwnProperty(prop)) {
                val = full_imp[prop];
                if (val && (test[prop] === undefined)) {
                    req_match = false;
                    break;
                }
            }
        }
        if (!req_match) {
            return false;
        }
        // Now loop through all properties on the test to make sure there aren't extra props
        var has_extra = false;
        for (prop in test) {
            if (test.hasOwnProperty(prop)) {
                if (full_imp[prop] === undefined) {
                    has_extra = true;
                    break;
                }
            }
        }
        return (!has_extra);
    }
    KIP.isInterface = isInterface;
    /** check if the element implements the Editable class */
    function isEditable(test) {
        return isNamedClass(test, "Editable");
    }
    KIP.isEditable = isEditable;
    /** check if the element implements the drawable class */
    function isDrawable(test) {
        return isNamedClass(test, "Drawable");
    }
    KIP.isDrawable = isDrawable;
    /** check if the element is one that can be used as a drawable base */
    function isDrawableElement(test) {
        return (!!(test.appendChild));
    }
    KIP.isDrawableElement = isDrawableElement;
    /** generic function to check if an element has a particular class name in its inheritance tree */
    function isNamedClass(test, name) {
        if (!name) {
            return false;
        }
        var test_name;
        test_name = test.paddedClassName;
        if (!test_name) {
            return false;
        }
        return (test_name.indexOf(name) !== -1);
    }
    KIP.isNamedClass = isNamedClass;
    /**
     * isUpdatable
     *
     * Determine if this object has an update method
     * @param test
     */
    function isUpdatable(test) {
        return !!(test.update);
    }
    KIP.isUpdatable = isUpdatable;
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    var _id = 0;
    function generateUniqueID(prefix) {
        if (!prefix) {
            prefix = "id";
        }
        _id += 1;
        return prefix + _id;
    }
    KIP.generateUniqueID = generateUniqueID;
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    //#endregion
    //#region HELPER FUNCTIONS
    /**...........................................................................
   * equals
   * ...........................................................................
   * Determines if two elements of the same type can be considered equal
   *
   * @param   orig        The first elem to examine
   * @param   comparison  The second elem to examine
   *
   * True if the two elements can be considered equal
   * ...........................................................................
   */
    function equals(orig, comparison) {
        // Handle the equatable case
        if (orig.equals) {
            return orig.equals(comparison);
        }
        // otherwise directly compare the values
        return orig === comparison;
    }
    KIP.equals = equals;
    /**...........................................................................
     * lesserThan
     * ...........................................................................
     * @param 	orig 		The element to check for being less than the other
     * @param 	comparison 	The element to check for being greater than the other
     *
     * @returns True if the first element is lesser than the second
     * ...........................................................................
     */
    function lesserThan(orig, comparison) {
        if (orig.lesserThan) {
            return orig.lesserThan(comparison);
        }
        return orig < comparison;
    }
    KIP.lesserThan = lesserThan;
    /**...........................................................................
     * greatherThan
     * ...........................................................................
     * @param 	orig 		The element to check for being greater than the other
     * @param 	comparison 	The element to check for being lesser than the other
     *
     * @returns True if the first element is greater than the second
     * ...........................................................................
     */
    function greaterThan(orig, comparison) {
        if (orig.greaterThan) {
            return orig.greaterThan(comparison);
        }
        return orig > comparison;
    }
    KIP.greaterThan = greaterThan;
    //#endregion
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    ;
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    var Model = /** @class */ (function () {
        function Model() {
        }
        /**...........................................................................
         * _copyData
         * ...........................................................................
         * Copies data from a JSON version of this model
         *
         * @param   data    The data to save into our model
         * ...........................................................................
         */
        Model.prototype._copyData = function (data) {
            var _this = this;
            KIP.map(data, function (value, key) {
                _this._copyPiece(key, value);
            });
        };
        Model.prototype._copyPiece = function (key, value) {
            var capitalizedName = (key[0].toUpperCase() + KIP.rest(key, 1));
            var copyFuncName = "_copy" + capitalizedName;
            // if we have a custom function to write this data, use it
            if (this[copyFuncName]) {
                this[copyFuncName](value);
                return;
            }
            ;
            // otherwise, just set our internal property to have this value
            var privateName = "_" + capitalizedName;
            this[privateName] = value;
        };
        /**...........................................................................
         * saveData
         * ...........................................................................
         * Gets data out of this model in JSON format
         * ...........................................................................
         */
        Model.prototype.saveData = function () {
            var _this = this;
            var out = {};
            KIP.map(this, function (val, key) {
                if (typeof key === "function") {
                    return;
                }
                out[key] = _this._savePiece(key, val);
            });
            return out;
        };
        Model.prototype._savePiece = function (key, val) {
            var capitalizedName = (key[0].toUpperCase() + KIP.rest(key, 1));
            var saveFuncName = "_save" + capitalizedName;
            if (this[saveFuncName]) {
                return this[saveFuncName]();
            }
            var privateName = "_" + capitalizedName;
            return this[privateName];
        };
        return Model;
    }());
    KIP.Model = Model;
    /**
     * @class   Serializable
     *
     * Creates a model that can be turned into a string
     * @version 1.0
     * @author  Kip Price
     */
    var Serializable = /** @class */ (function (_super) {
        __extends(Serializable, _super);
        function Serializable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**...........................................................................
         * serialize
         * ...........................................................................
         * Turn this model into a savable JSON string
         * @returns The string version of this data
         * ...........................................................................
         */
        Serializable.prototype.serialize = function () {
            var data = this.saveData();
            return JSON.stringify(data);
        };
        /**...........................................................................
         * deserialize
         * ...........................................................................
         * Turns a string into a version of this model
         *
         * @param   data  The string to deserialize
         *
         * @returns True if we could deserialize
         * ...........................................................................
         */
        Serializable.prototype.deserialize = function (data) {
            try {
                var parsedData = JSON.parse(data);
                this._copyData(parsedData);
                return true;
            }
            catch (err) {
                console.log("non JSON: " + data);
                return false;
            }
        };
        return Serializable;
    }(Model));
    KIP.Serializable = Serializable;
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    /**...........................................................................
     * CollectionTypeEnum
     * ...........................................................................
     * Keeps track of the different ways we can add to a collection
     * ...........................................................................
     */
    var CollectionTypeEnum;
    (function (CollectionTypeEnum) {
        CollectionTypeEnum[CollectionTypeEnum["ReplaceDuplicateKeys"] = 1] = "ReplaceDuplicateKeys";
        CollectionTypeEnum[CollectionTypeEnum["IgnoreDuplicateKeys"] = 2] = "IgnoreDuplicateKeys";
    })(CollectionTypeEnum = KIP.CollectionTypeEnum || (KIP.CollectionTypeEnum = {}));
    //#endregion
    var Collection = /** @class */ (function (_super) {
        __extends(Collection, _super);
        //#endregion
        /**...........................................................................
         * Creates the collection
         * @param  {boolean} replace True if we should override the values in the list
         * @return Collection
         * ...........................................................................
         */
        function Collection(type, eq_test) {
            var _this = _super.call(this, "Collection") || this;
            // Initialize our arrays
            _this._data = {};
            _this._sortedData = new Array();
            // Store whether we should be replacing
            _this._addType = type || CollectionTypeEnum.IgnoreDuplicateKeys;
            _this._equalityTest = eq_test;
            if (!_this._equalityTest) {
                _this._equalityTest = (function (a, b) {
                    return (a === b);
                });
            }
            return _this;
        }
        Object.defineProperty(Collection.prototype, "keys", {
            /** allow retrieval of a set of keys */
            get: function () { return Object.keys(this._data); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Collection.prototype, "addType", {
            set: function (addType) { this._addType = addType; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Collection.prototype, "iteration", {
            get: function () { return this._iteration; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Collection.prototype, "length", {
            /** get the current number of elements in our collection */
            get: function () { return this._sortedData.length; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Collection.prototype, "equalityTest", {
            set: function (test) { this._equalityTest = test; },
            enumerable: true,
            configurable: true
        });
        ;
        /**...........................................................................
         * addElement
         * ...........................................................................
         * Adds an element to the collection
         * @param 	key  	The key to uniquely identify this element
         * @param 	val 	The element to add to our collection
         * @returns True if the element was successfully added
         * ...........................................................................
         */
        Collection.prototype.addElement = function (key, val) {
            var idx;
            var elem;
            var sortedIdx;
            var skipSortedPush;
            // Verify that there isn't anything currently linked to this key
            if ((this._addType === CollectionTypeEnum.IgnoreDuplicateKeys) && (this._data[key])) {
                return -1;
            }
            // If we already have data, we don't need to add this key to our sorted index again
            if (this._data[key]) {
                skipSortedPush = true;
            }
            // Grab the spot that this element will be added to in our sorted index
            sortedIdx = this._sortedData.length;
            // Create our new object
            elem = {
                key: key,
                value: val,
                sortedIdx: sortedIdx,
                origIdx: sortedIdx
            };
            // If there isn't anything in this index (or we should replace it), save our new value
            this._data[key] = elem;
            // Push to our sorted index if needed
            if (!skipSortedPush) {
                this._sortedData.push(key);
            }
            return sortedIdx;
        };
        /**...........................................................................
         * insertElement
         * ...........................................................................
         * inserts an element at a particular index
         * ...........................................................................
         */
        Collection.prototype.insertElement = function (key, elem, index) {
            //TODO
            return true;
        };
        /**...........................................................................
         * removeElement
         * ...........................................................................
         * combination function to handle all overloads
         * ...........................................................................
         */
        Collection.prototype.removeElement = function (param) {
            if (typeof param === "string") {
                return this._removeElementByKey(param);
            }
            else if (typeof param === "number") {
                return this._removeElementByIndex(param);
            }
        };
        /**...........................................................................
         * removeElementByValue
         * ...........................................................................
         *  remove the element that matches the provided element
         * ...........................................................................
         */
        Collection.prototype.removeElementByValue = function (value) {
            return this._removeElementByValue(value);
        };
        /**...........................................................................
         * _removeElementByKey
         * ...........................................................................
         *  removes an element by key
         * ...........................................................................
         */
        Collection.prototype._removeElementByKey = function (key) {
            var elem;
            elem = this._data[key];
            if (!elem)
                return null;
            // Remove from the sorted array
            this._sortedData.splice(elem.sortedIdx, 1);
            // Reset sorted keys for all others in the array
            this._resetSortedKeys(elem.sortedIdx);
            // Remove from the actual data array
            delete this._data[key];
            // Return the grabbed data
            return elem;
        };
        /**...........................................................................
         * _removeElementByIndex
         * ...........................................................................
         * removes an element by index
         * ...........................................................................
         */
        Collection.prototype._removeElementByIndex = function (idx) {
            var key;
            if ((idx >= this.length) || (idx < 0)) {
                return null;
            }
            key = this._sortedData[idx];
            return this._removeElementByKey(key);
        };
        /**...........................................................................
         * _removeElementByValue
         * ...........................................................................
         * removes an element by matching the element to the provided element
         * ...........................................................................
         */
        Collection.prototype._removeElementByValue = function (val) {
            var key;
            var e;
            e = this._findElement(val);
            return this._removeElementByKey(e && e.key);
        };
        /**...........................................................................
         * _resetSortedKeys
         * ...........................................................................
         * Ensure that the key stored with the element matches its location in the
         * sorted array
         * ...........................................................................
         */
        Collection.prototype._resetSortedKeys = function (startFrom, endWith) {
            // Set some defaults
            if (!startFrom) {
                startFrom = 0;
            }
            if (!endWith && (endWith !== 0)) {
                endWith = this._sortedData.length;
            }
            if (startFrom > endWith) {
                return;
            }
            if (startFrom > endWith) {
                var tmp = startFrom;
                startFrom = endWith;
                endWith = tmp;
            }
            var e;
            var k;
            for (var i = startFrom; i < endWith; i += 1) {
                k = this._sortedData[i];
                if (!k)
                    continue;
                e = this._data[k];
                if (!e)
                    continue;
                e.sortedIdx = i;
            }
        };
        Collection.prototype.clear = function () {
            this._data = {};
            this._sortedData = [];
        };
        /**...........................................................................
         * sort
         * ...........................................................................
         * Sorts the collection
         * @param 	sort_func   	The function we should use to sort
         * ...........................................................................
         */
        Collection.prototype.sort = function (sort_func) {
            var _this = this;
            var sTemp;
            // Generate our wrapper sort function to guarantee we have the real elements
            // sent to the passed-in sort function
            sTemp = (function (a, b) {
                var a_tmp;
                var b_tmp;
                a_tmp = _this._data[a];
                b_tmp = _this._data[b];
                return sort_func(a_tmp, b_tmp);
            });
            // Sort the data appropriately
            this._sortedData.sort(sTemp);
            // Make sure we update our indices appropriately
            this._resetSortedKeys();
        };
        /**...........................................................................
         * resetLoop
         * ...........................................................................
         * Resets our iteration counter
         *
         * @param	reverse		If true, loops through backwards
         * ...........................................................................
         */
        Collection.prototype.resetLoop = function (reverse) {
            if (reverse) {
                this._iteration = (this.length + 1);
            }
            else {
                this._iteration = -1;
            }
        };
        /**...........................................................................
         * hasNext
         * ...........................................................................
         * Checks if we have a next element available for getting
         *
         * @param 	reverse 	True if we should loop backwards
         *
         * @returns True if there is a next element available
         * ...........................................................................
         */
        Collection.prototype.hasNext = function (reverse) {
            if (reverse) {
                return ((this._iteration - 1) >= 0);
            }
            else {
                return ((this._iteration + 1) < this._sortedData.length);
            }
        };
        /**...........................................................................
         * getNext
         * ...........................................................................
         * Finds the next element in our loop
         *
         * @param 	reverse 	True if we should loop backwards
         *
         * @returns The element next in our array
         * ...........................................................................
         */
        Collection.prototype.getNext = function (reverse) {
            // Grab the next appropriate index
            if (reverse) {
                this._iteration -= 1;
            }
            else {
                this._iteration += 1;
            }
            // Get the data from that index
            return this._data[this._sortedData[this._iteration]];
        };
        Collection.prototype.getCurrent = function () {
            if (this._iteration === -1) {
                return null;
            }
            return this._data[this._sortedData[this._iteration]];
        };
        /**...........................................................................
         * toArray
         * ...........................................................................
         * Return a sorted array of the elements in this collection
         * ...........................................................................
         */
        Collection.prototype.toArray = function () {
            var arr;
            var key;
            for (var _i = 0, _a = this._sortedData; _i < _a.length; _i++) {
                key = _a[_i];
                arr.push(this._data[key]);
            }
            return arr;
        };
        /**
         * toValueArray
         *
         * Get an array of just the values in this collection
         */
        Collection.prototype.toValueArray = function () {
            var arr = [];
            this.map(function (value) {
                arr.push(value);
            });
            return arr;
        };
        /**...........................................................................
         * getElement
         * ...........................................................................
         * @param param
         * ...........................................................................
         */
        Collection.prototype.getElement = function (param) {
            var out;
            // Handle the param being a key
            if (typeof param === "string") {
                out = this._data[param];
                // Handle the parm being index
            }
            else if (typeof param === "number") {
                if ((param < 0) || (param > this._sortedData.length)) {
                    return null;
                }
                out = this._data[this._sortedData[param]];
            }
            return out;
        };
        /**...........................................................................
         * getValue
         * ...........................................................................
         *
         * @param	param
         * ...........................................................................
         */
        Collection.prototype.getValue = function (param) {
            var pair;
            pair = this.getElement(param);
            if (!pair) {
                return null;
            }
            return pair.value;
        };
        /**...........................................................................
         * getIndex
         * ...........................................................................
         *
         * @param param
         * ...........................................................................
         */
        Collection.prototype.getIndex = function (param) {
            if (typeof param === "string") {
                return (this._data[param] && this._data[param].sortedIdx);
            }
            else {
                var e = void 0;
                e = this._findElement(param);
                return (e && e.sortedIdx);
            }
        };
        /**...........................................................................
         * _findElement
         * ...........................................................................
         *
         * @param val
         * ...........................................................................
         */
        Collection.prototype._findElement = function (val) {
            var key;
            var elem;
            // loop over everything in our data array
            for (key in this._data) {
                if (this._data.hasOwnProperty(key)) {
                    elem = this._data[key];
                    if (this._equalityTest(elem.value, val)) {
                        return elem;
                    }
                }
            }
            return null;
        };
        Collection.prototype.getKey = function (param) {
            if (typeof param === "number") {
                return this._sortedData[param];
            }
            else {
                var e = void 0;
                e = this._findElement(param);
                return (e && e.key);
            }
        };
        Collection.prototype.hasElement = function (param) {
            if (typeof param === "string") {
                return (!!this._data[param]);
            }
            else if (typeof param === "number") {
                return ((!!this._sortedData[param]) && (!!this._data[this._sortedData[param]]));
            }
            else {
                return (this._findElement(param) !== null);
            }
        };
        /**...........................................................................
         * map
         * ...........................................................................
         * handle looping through the collection to get each element
         * ...........................................................................
         */
        Collection.prototype.map = function (mapFunc) {
            if (!mapFunc) {
                return;
            }
            this.resetLoop();
            while (this.hasNext()) {
                var pair = this.getNext();
                if (!pair) {
                    continue;
                }
                var value = pair.value;
                var key = pair.key;
                var idx = this.getIndex(key);
                mapFunc(value, key, idx);
            }
            this.resetLoop();
        };
        /**...........................................................................
         * toString
         * ...........................................................................
         * Turns this collection into a human readable string
         *
         * @returns	The string version of the collection
         * ...........................................................................
         */
        Collection.prototype.toString = function () {
            var outStr = "";
            this.map(function (elem, key, idx) {
                if (outStr.length > 0) {
                    outStr += ", ";
                }
                outStr += KIP.format("{0} => {1}", key, elem.toString());
            });
            return outStr;
        };
        /**...........................................................................
         * equals
         * ...........................................................................
         * Determins if this Collection us equal in value to another
         *
         * @param	other	The collection to compare to
         *
         * @returns	True if the collection is a match for our own
         * ...........................................................................
         */
        Collection.prototype.equals = function (other) {
            // quick check: determine if the lengths are mismatched
            if (this.length !== other.length) {
                return false;
            }
            // check if the sorted array is mismatched
            if (this._sortedData.length !== other._sortedData.length) {
                return false;
            }
            // verify our key arrays match
            var mismatch = false;
            this.map(function (elem, key, idx) {
                // check that this key exists in the other collection
                if (!other._data[key]) {
                    mismatch = true;
                }
                // determine if the two elements are equal
                if (!KIP.equals(elem, other._data[key].value)) {
                    mismatch = true;
                }
            });
            // quit if we were mismatched
            if (mismatch) {
                return false;
            }
            // If we made it this far, we should consider the collections the same
            return true;
        };
        return Collection;
    }(KIP.NamedClass));
    KIP.Collection = Collection;
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    var Colors;
    (function (Colors) {
        /**...........................................................................
         * Items for grabbing color conversions and new colors
         * @file color.ts
         * @version 1.0
         * @author Kip Price
         * ...........................................................................
         */
        //#region CONSTANTS AND INTERFACES
        /** The amount the hue should increase when cycling through new colors */
        Colors.HUE_INTERVAL = 22;
        /** The amount that the lightness should increase when cycling through new colors */
        Colors.LIGHT_INTERVAL = 20;
        /** The amount that the saturation should increase when cycling through new colors */
        Colors.SATURATION_INTERVAL = 20;
        /** The max and min saturation value that should be used for cycling colors */
        Colors.SATURATION_LIMITS = {
            max: 100,
            min: 20
        };
        /** The max and min lightness values that should be used for cycling colors */
        Colors.LIGHTNESS_LIMITS = {
            max: 80,
            min: 35
        };
        var HSLPieceEnum;
        (function (HSLPieceEnum) {
            HSLPieceEnum[HSLPieceEnum["HUE"] = 1] = "HUE";
            HSLPieceEnum[HSLPieceEnum["SATURATION"] = 2] = "SATURATION";
            HSLPieceEnum[HSLPieceEnum["LIGHTNESS"] = 3] = "LIGHTNESS";
            HSLPieceEnum[HSLPieceEnum["ALPHA"] = 4] = "ALPHA";
        })(HSLPieceEnum = Colors.HSLPieceEnum || (Colors.HSLPieceEnum = {}));
        var RGBEnum;
        (function (RGBEnum) {
            RGBEnum[RGBEnum["RED"] = 0] = "RED";
            RGBEnum[RGBEnum["GREEN"] = 1] = "GREEN";
            RGBEnum[RGBEnum["BLUE"] = 2] = "BLUE";
            RGBEnum[RGBEnum["ALPHA"] = 3] = "ALPHA";
        })(RGBEnum = Colors.RGBEnum || (Colors.RGBEnum = {}));
        var usedColors;
        //#endregion
        //#region HELPER FUNCTIONS
        /**...........................................................................
         * _getColorGlobal
         * ...........................................................................
         * Grab the global for color creation or create it if it is null
         *
         * @returns	The color global
         * ...........................................................................
         */
        function _getColorGlobal() {
            if (!Colors.colorGlobal) {
                Colors.colorGlobal = new HSLColor("hsl(330, 80%, 50%)");
            }
            return Colors.colorGlobal;
        }
        /**...........................................................................
         * generateColor
         * ...........................................................................
         * Generates the next color in the global color object
         *
         * @param 	id 				An identifier for the color
         * @param	firstRotate		Which HSL value should change first. Defaults to Hue
         *
         * @returns The next hex string for the color selector
         * ...........................................................................
         */
        function generateColor(id, firstRotate) {
            "use strict";
            var color;
            var colorStr;
            // Initialize the "Used Colors" array if we haven't yet
            if (!usedColors) {
                usedColors = {};
            }
            // Grab the next available color
            colorStr = _getColorGlobal().getNextColor(firstRotate || HSLPieceEnum.HUE);
            color = new HexColor(colorStr);
            // If we received an identifier, use it
            if (id) {
                usedColors[id] = colorStr;
            }
            return color;
        }
        Colors.generateColor = generateColor;
        ;
        /**...........................................................................
         * getCurrentColor
         * ...........................................................................
         * Finds the current color of the color object & returns it
         * ...........................................................................
         */
        function getCurrentColor() {
            return _getColorGlobal().getCurrentColor();
        }
        Colors.getCurrentColor = getCurrentColor;
        ;
        /**...........................................................................
         * getApparentColor
         * ...........................................................................
         * Calculates the non-opacity value of the semi-transparent front color when placed over another color
         *
         * @param 	frontColor	A color string including an alpha value
         * @param 	backColor	The color that appears in the background
         * @param 	opacity		The opacity of the first color, if not included in the color string
         *
         * @returns	The created apparent color as a hex string
         * ...........................................................................
         */
        function getApparentColor(frontColor, backColor, opacity) {
            "use strict";
            var col;
            // Create the color object
            col = new AnyColor(frontColor, opacity);
            // Calculate the new color
            col.getApparentColor(backColor);
            return col.hexString();
        }
        Colors.getApparentColor = getApparentColor;
        /**...........................................................................
         * getComplementaryColor
         * ...........................................................................
         * Find a color that works well with the color passed in
         *
         * @param 	color		The color to find a complement for
         * @param 	cutoff 		How different the lightnesses of the colors need to be
         *
         * @returns	The color string for the appropriate complementary color
         * ...........................................................................
         */
        function getComplementaryColor(color, cutoff) {
            var col;
            var lightness;
            cutoff = cutoff || 45;
            // Grab the appropriate color
            col = new AnyColor(color);
            // Grab the current lightness value
            lightness = col.getLightness();
            if (lightness < cutoff) {
                col.lightness = 95;
            }
            else {
                col.lightness = 5;
            }
            col.generateRgbValues();
            return col.rgbaString();
        }
        Colors.getComplementaryColor = getComplementaryColor;
        /**...........................................................................
         * hexToRgb
         * ...........................................................................
         * Converts a hex color string to a RGB color string
         *
         * @param 	hex 	The hex string to convert
         *
         * @returns The appropriate RGB string
         * ...........................................................................
         */
        function hexToRgb(hex) {
            var c = new HexColor(hex);
            return c.rgbString();
        }
        Colors.hexToRgb = hexToRgb;
        ;
        /**...........................................................................
         * hexToRgba
         * ...........................................................................
         * Converts a hex color string to rgba color string
         *
         * @param 	hex 	The hex string to parse
         * @param 	alpha 	The alpha value to give the color
         *
         * @returns	The rgba version of this hex string
         * ...........................................................................
         */
        function hexToRgba(hex, alpha) {
            var c = new HexColor(hex, alpha);
            return c.rgbaString();
        }
        Colors.hexToRgba = hexToRgba;
        ;
        /**...........................................................................
         * hslToRgb
         * ...........................................................................
         * Converts a HSL string to RGB string
         *
         * @param {string} hsl - The HSL string to parse
         *
         * @returns {string} The RGB string that corresponds
         * ...........................................................................
         */
        function hslToRgb(hsl) {
            var c = new HSLColor(hsl);
            return c.rgbString();
        }
        Colors.hslToRgb = hslToRgb;
        ;
        /**...........................................................................
         * hslaToRgba
         * ...........................................................................
         * Converts a HSLA string to a RGB string
         *
         * @param 	hsl 	The HSL string to convert
         * @param 	alpha 	The alpha value to use, if the hsl string doesn't include it
         *
         * @returns The appropriate RGBA string
         * ...........................................................................
         */
        function hslaToRgba(hsl, alpha) {
            var c = new HSLColor(hsl, alpha);
            return c.rgbaString();
        }
        Colors.hslaToRgba = hslaToRgba;
        ;
        /**...........................................................................
         * fullHexString
         * ...........................................................................
         * Grabs the hex value for a given number and ensures it is a certain length
         *
         * @param 	val 	The number to convert to Hex
         * @param 	length 	How long the hex string should be
         *
         * @returns The hex value of the passed in number
         * ...........................................................................
         */
        function fullHexString(val, length) {
            "use strict";
            var outHexString;
            var i;
            length = length || 0;
            outHexString = val.toString(16);
            if (outHexString.length < length) {
                for (i = 0; i < (length - outHexString.length); i += 1) {
                    outHexString = "0" + outHexString;
                }
            }
            return outHexString;
        }
        Colors.fullHexString = fullHexString;
        ;
        //#endregion
        //#region COLOR CLASS
        /**...........................................................................
         * @class Color
         * Handles conversion between color values
         * @version 1.1
         * ...........................................................................
         */
        var Color = /** @class */ (function (_super) {
            __extends(Color, _super);
            //#endregion
            //#endregion
            //#region CONSTRUCTOR
            /**...........................................................................
            * Creates an object that can handle color conversions
            * @constructor
            * @param {number} [r] - The red value for the color
            * @param {number} [g] - The green value for the color
            * @param {number} [b] - The blue value for the color
            * @param {number} [a] - The alpha value for the color
            * ...........................................................................
            */
            function Color() {
                var _this = _super.call(this, "Color") || this;
                /** shared alpha property for the color */
                _this._alpha = 1;
                return _this;
            }
            Object.defineProperty(Color.prototype, "alpha", {
                set: function (value) {
                    value = Math.min(1, Math.max(0, value));
                    this._alpha = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color.prototype, "red", {
                set: function (value) {
                    value = Math.min(255, Math.max(0, Math.round(value)));
                    this._red = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color.prototype, "green", {
                set: function (value) {
                    value = Math.min(255, Math.max(0, Math.round(value)));
                    this._green = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color.prototype, "blue", {
                set: function (value) {
                    value = Math.min(255, Math.max(0, Math.round(value)));
                    this._blue = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color.prototype, "hue", {
                set: function (value) {
                    value = Math.min(360, Math.max(0, Math.round(value)));
                    this._hue = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color.prototype, "saturation", {
                set: function (value) {
                    value = Math.min(100, Math.max(0, Math.round(value)));
                    this._saturation = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color.prototype, "lightness", {
                set: function (value) {
                    value = Math.min(100, Math.max(0, Math.round(value)));
                    this._lightness = value;
                },
                enumerable: true,
                configurable: true
            });
            ;
            //#endregion
            //#region CREATE COLOR STRINGS
            /**...........................................................................
             * rgbaString
             * ...........................................................................
             * Gets the appropriate RGBA string for this color
             *
             * @returns {string} RGBA string for the color
             * ...........................................................................
             */
            Color.prototype.rgbaString = function () {
                "use strict";
                return this.rgbString(true);
            };
            ;
            /**...........................................................................
             * rgbString
             * ...........................................................................
             * Grabs the RGB string (with A element if appropriate) for this color
             *
             * @param {boolean} withAlpha - If true, include the alpha element in the returned string
             *
             * @returns {string} The appropriate color string
             * ...........................................................................
             */
            Color.prototype.rgbString = function (with_alpha) {
                "use strict";
                var out;
                // Start the string regardless of alpha value
                out = "rgb" + (with_alpha ? "a" : "") + "(" + this._red + ", " + this._green + ", " + this._blue;
                // Add the alpha value if appropriate
                if (with_alpha) {
                    out += ", " + this._alpha;
                }
                // Close up the string and send it out
                out += ")";
                return out;
            };
            ;
            /**...........................................................................
             * hslString
             * ...........................................................................
             * From the color object, creates a hue-saturation-lightness string
             *
             * @param 	withAlpha 	If true, also adds an alpha element to the end of the string
             *
             * @returns	The HSL string version of this color
             * ...........................................................................
             */
            Color.prototype.hslString = function (with_alpha) {
                "use strict";
                var out;
                // Generate HSL if we need to
                if (!this._hue)
                    this.generateHslValues();
                // String starts out the same regardless of whether we are including alpha
                out = "hsl" + (with_alpha ? "a" : "") + "(" + this._hue + ", " + this._saturation + "%, " + this._lightness + "%";
                // Grab the alpha piece if appropriate
                if (with_alpha) {
                    out += ", " + this._alpha;
                }
                // Return the HSL string
                out += ")";
                return out;
            };
            ;
            /**...........................................................................
             * hslaString
             * ...........................................................................
             * From the color object, create a HSLA string
             *
             * @returns A string for the color
             * ...........................................................................
             */
            Color.prototype.hslaString = function () {
                "use strict";
                return this.hslString(true);
            };
            ;
            /**...........................................................................
             * hexString
             * ...........................................................................
             * From the color object, creates a hex color string
             *
             * @param 	withAlpha	True if alpha should be added to the hex string
             *
             * @returns The appropriate hex string
             * ...........................................................................
             */
            Color.prototype.hexString = function (with_alpha) {
                "use strict";
                var out;
                out = "#";
                out += fullHexString(this._red, 2);
                out += fullHexString(this._green, 2);
                out += fullHexString(this._blue, 2);
                if (with_alpha) {
                    out += fullHexString(this._alpha, 2);
                }
                return out;
            };
            ;
            //#endregion
            //#region GENERATE APPROPRIATE COLOR VALUES
            /**...........................................................................
             * generateHslValues
             * ...........................................................................
             * Calculates the HSL values for this RGB color and saves it off in the color.
             * Relies on the rgb values already having been set
             * ...........................................................................
             */
            Color.prototype.generateHslValues = function () {
                "use strict";
                var r;
                var g;
                var b;
                var delta;
                var max;
                var min;
                var hue;
                var saturation;
                var lightness;
                r = this._red / 255;
                g = this._green / 255;
                b = this._blue / 255;
                // Find the max, min, and the difference between them.
                // We need these values to calculate HSL equivalents
                max = Math.max(r, g, b);
                min = Math.min(r, g, b);
                delta = max - min;
                // Lightness is the average between the two extremes
                lightness = (max + min) / 2;
                // If the max and min are the same, all three are actually the same value,
                // so we can quit now with our grayscale color
                if (max === min) {
                    this._hue = 0;
                    this._saturation = 0;
                    this._lightness = Math.round(lightness * 100);
                    return;
                }
                // The saturation is a ratio of the delta of the extremes
                // over a version of the sum of the extremes.
                // It changes when lightness is less or more than 50%.
                if (lightness > .5) {
                    saturation = delta / (2 - max - min);
                }
                else {
                    saturation = delta / (max + min);
                }
                // The hue is calculated from the two non-max values
                // If two values match the max, then we just evaluate in order red -> green -> blue
                // Red was the max.
                if (max === r) {
                    hue = (g - b) / delta;
                    // We need an additional kick if green is less than blue
                    if (g < b) {
                        hue += 6;
                    }
                    // Green was the max
                }
                else if (max === g) {
                    hue = (b - r) / delta + 2;
                    // Blue was the max
                }
                else {
                    hue = (r - g) / delta + 4;
                }
                // Divide by six to get the appropriate average
                hue /= 6;
                // -- Save off the member variables for this color --
                //
                // All values are currently in the range [0,1].
                // Hue needs to be multiplied by 360 to get the appropriate value.
                // Saturation and lightness both need to be multiplied by 100.
                this._hue = Math.round(hue * 3600) / 10;
                this._saturation = Math.round(saturation * 1000) / 10;
                this._lightness = Math.round(lightness * 1000) / 10;
                if (!this._startHue) {
                    this._startHue = this._hue;
                    this._startSaturation = this._saturation;
                    this._startLightness = this._lightness;
                }
            };
            ;
            /**...........................................................................
             * generateRgbValues
             * ...........................................................................
             * Saves off the appropriate RGB values for this color based on its hex values.
             * Relies on the hex colors being set
             * ...........................................................................
             */
            Color.prototype.generateRgbValues = function () {
                "use strict";
                var hue;
                var saturation;
                var lightness;
                var p;
                var q;
                var t;
                var i;
                hue = this._hue / 360;
                saturation = this._saturation / 100;
                lightness = this._lightness / 100;
                // If there is not saturation, it's grayscale, so the colors are all equal to the lightness
                if (saturation === 0) {
                    this._red = this._green = this._blue = lightness;
                    this._red *= 255;
                    this._green *= 255;
                    this._blue *= 255;
                }
                //If we do have a saturated value, we need to convert it to RGB
                // Get the value of the q coefficient
                if (lightness < 0.5) {
                    q = lightness * (1 + saturation);
                }
                else {
                    q = lightness + saturation - (lightness * saturation);
                }
                // And calculate p from q
                p = (2 * lightness) - q;
                for (i = -1; i <= 1; i += 1) {
                    t = hue + (-i / 3);
                    // Check for the extremes and adjust them
                    if (t < 0) {
                        t += 1;
                    }
                    else if (t > 1) {
                        t -= 1;
                    }
                    // Find the appropriate case to treat this value as
                    if (t < (1 / 6)) {
                        this.updateRgbValue(i + 1, (p + ((q - p) * 6 * t)) * 255);
                    }
                    else if (t < (1 / 2)) {
                        this.updateRgbValue(i + 1, q * 255);
                    }
                    else if (t < (2 / 3)) {
                        this.updateRgbValue(i + 1, (p + ((q - p) * (2 / 3 - t) * 6)) * 255);
                    }
                    else {
                        this.updateRgbValue(i + 1, p * 255);
                    }
                }
            };
            ;
            //#endregion
            //#region PARSE DIFFERENT COLOR STRINGS
            /**...........................................................................
             * _parseFromHexColor
             * ...........................................................................
             * Takes in a hex string and saves it internally
             *
             * @param 	hex		The hex string to parse in
             * @param 	alpha 	The alpha value to use
             *
             * @returns True if the parsing succeeds, false otherwise
             * ...........................................................................
             */
            Color.prototype._parseFromHexColor = function (hex, alpha) {
                "use strict";
                var idx;
                var col;
                var pc;
                var a_included;
                var h_reg;
                var inc;
                h_reg = /^#?(?:[0-9A-Fa-f]{3,4}){1,2}$/;
                if (!h_reg.test(hex)) {
                    return false;
                }
                // Strip out the # character if it was there
                if (KIP.charAt(hex, 0) === "#") {
                    hex = KIP.rest(hex, 1);
                }
                if (hex.length < 6) {
                    inc = 1;
                }
                else {
                    inc = 2;
                }
                // Flip through each of the possible columns
                for (idx = 0; idx < hex.length; idx += inc) {
                    pc = hex.substr(idx, inc);
                    if (inc === 1) {
                        pc += pc;
                    }
                    // Parse out the color and set it appropriately
                    col = parseInt(pc, 16);
                    this.updateRgbValue((idx / inc), col);
                    // If we hit alpha values,
                    if (idx > 4) {
                        a_included = true;
                    }
                }
                // Set the alpha value if it wasn't included in the hex string
                if (!a_included) {
                    this._alpha = alpha || 1;
                }
                return true;
            };
            ;
            /**...........................................................................
             * _parseFromRgbColor
             * ...........................................................................
             * Takes in a rgb color string and parses it into our internal format
             *
             * @param 	rgb   	The RGB string to parse
             * @param 	alpha	The alpha value to parse in, if the rgb string doesn't have it
             *
             * @returns True if the parsing succeeds, false otherwise
             * ...........................................................................
             */
            Color.prototype._parseFromRgbColor = function (rgb, alpha) {
                "use strict";
                var rgb_reg;
                var rgba_reg;
                var match;
                rgb_reg = /rgb\((?:([0-9]{1-3}), ?){3}\)/;
                rgba_reg = /rgba\((?:([0-9]{1-3}), ?){3}, ?([0-9]{0,1}(?:\.[0-9]+)?)\)/;
                if (!rgb_reg.test(rgb)) {
                    if (!rgba_reg.test(rgb)) {
                        return false;
                    }
                    else {
                        match = rgba_reg.exec(rgb);
                    }
                }
                else {
                    match = rgb_reg.exec(rgb);
                }
                this._red = +match[1];
                this._green = +match[2];
                this._blue = +match[3];
                if ((match[4] !== undefined) || (alpha !== undefined)) {
                    this._alpha = +match[4] || alpha;
                }
                return true;
            };
            ;
            /**...........................................................................
             * _parseFromHslColor
             * ...........................................................................
             * Takes in a HSL string and converts it to the color object's internal format
             *
             * @param 	hsl 	The HSL string to convert. Can also be a HSLA string
             * @param 	alpha 	The alpha value to set, if it is not included in the HSLA string
             *
             * @returns True if the color was successfully parsed, false otherwise.
             * ...........................................................................
             */
            Color.prototype._parseFromHslColor = function (hsl, alpha) {
                "use strict";
                var hsl_reg;
                var hsla_reg;
                var match;
                var hue;
                var saturation;
                var lightness;
                var q;
                var p;
                var i;
                var t;
                hsl_reg = /hsl\(([0-9]{1,3}), ?([0-9]{1,3})%, ?([0-9]{1,3})%\)/;
                hsla_reg = /hsla\(([0-9]{1,3}), ?([0-9]{1,3})%, ?([0-9]{1,3})%, ?([0-9]{0,1}(?:\.[0-9]+)?)\)/;
                // Quit if the regex doesn't match
                if (!hsl_reg.test(hsl)) {
                    if (!hsla_reg.test(hsl)) {
                        return false;
                    }
                    else {
                        match = hsla_reg.exec(hsl);
                    }
                }
                else {
                    match = hsl_reg.exec(hsl);
                }
                // Save off the values parsed out of the string
                this._hue = Math.round(parseFloat(match[1]) * 10) / 10;
                this._saturation = Math.round(parseFloat(match[2]) * 10) / 10;
                this._lightness = Math.round(parseFloat(match[3]) * 10) / 10;
                // Only set the alpha if something is available
                if ((match[4] !== undefined) || (alpha !== undefined)) {
                    this._alpha = parseFloat(match[4]) || alpha;
                }
                // Make sure the RGB values are updated too
                this.generateRgbValues();
                return true;
            };
            ;
            /**...........................................................................
             * _parseColorString
             * ...........................................................................
             * Tries to parse a given string into an internal color object
             *
             * @param 	str 	The string to parse
             * @param 	alpha 	The alpha value to use, if not included in the string
             *
             * @returns True if the parsing succeeds, false otherwise
             * ...........................................................................
             */
            Color.prototype._parseColorString = function (str, alpha) {
                "use strict";
                var success;
                // Try to parse the string as a RGB value
                success = this._parseFromRgbColor(str, alpha);
                if (success)
                    return true;
                // Try to parse the string as a Hex value
                success = this._parseFromHexColor(str, alpha);
                if (success)
                    return true;
                // Try to parse the string as a HSL value
                success = this._parseFromHslColor(str, alpha);
                if (success)
                    return true;
                // If nothing worked, return false
                return false;
            };
            ;
            //#endregion
            //#region UPDATE COLORS
            /**...........................................................................
             * updateRgbValue
             * ...........................................................................
             * Sets a color value based on the index of the color (ie, red = 0, green = 1)
             *
             * @param 	idx 	The index of the color we are saving
             * @param 	val 	The value that the color should be set to
             * ...........................................................................
             */
            Color.prototype.updateRgbValue = function (valueType, val) {
                switch (valueType) {
                    case RGBEnum.RED:
                        this.red = val;
                        break;
                    case RGBEnum.GREEN:
                        this.green = val;
                        break;
                    case RGBEnum.BLUE:
                        this.blue = val;
                        break;
                    case RGBEnum.ALPHA:
                        this.alpha = val;
                        break;
                }
            };
            ;
            /**...........................................................................
             * updateHslValue
             * ...........................................................................
             * Sets a color value based on the index of the color (ie, hue = 1, saturation = 2...)
             *
             * @param 	idx 	The index of the color we are saving
             * @param 	val 	The value that the color should be set to
             * ...........................................................................
             */
            Color.prototype.updateHslValue = function (valueType, val) {
                switch (valueType) {
                    case HSLPieceEnum.HUE:
                        this.hue = val;
                        break;
                    case HSLPieceEnum.SATURATION:
                        this.saturation = val;
                        break;
                    case HSLPieceEnum.LIGHTNESS:
                        this.lightness = val;
                        break;
                    case HSLPieceEnum.ALPHA:
                        this.alpha = val;
                        break;
                }
            };
            //#endregion
            //#region HANDLE COLOR GENERATION AND GRABBING
            /**...........................................................................
             * getNextHue
             * ...........................................................................
             * Grabs the next hue available for this color selector.
             * Can be used as a random color generator
             *
             * @param	firstRotate		The HSL pice that should be rotating first
             * @param 	withAlpha 		True if the alpha value should also be included in the output string
             *
             * @returns The hex color string for the new color
             * ...........................................................................
             */
            Color.prototype.getNextColor = function (firstRotate, withAlpha) {
                "use strict";
                var toCycle = [], idx;
                // First, convert our internal format to HSL (if needed)
                if (!this._startHue)
                    this.generateHslValues();
                // Fill in our array of the order in which we will cycle the values
                toCycle[0] = firstRotate;
                toCycle[1] = (firstRotate + 1) % 3;
                toCycle[2] = (firstRotate + 2) % 3;
                // Loop through the cycles and set their values
                for (idx = 0; idx < toCycle.length; idx += 1) {
                    // Rotate and quit if we don't have to rotate another piece
                    if (!this.rotateAppropriateHSLValue(toCycle[idx])) {
                        break;
                    }
                }
                // Update the RGB values too
                this.generateRgbValues();
                return this.hexString(withAlpha);
            };
            ;
            //#endregion
            //#region ROTATE THE CURRENT COLOR
            /**...........................................................................
             * rotateAppropriateHSLValue
             * ...........................................................................
             * Calculates the next appropriate value for the HSL type, and
             *
             * @param 	idx		The type of HSL values we should rotate
             *
             * @returns	True if a full circle has been made for this particular index;
             * 			False otherwise
             * ...........................................................................
             */
            Color.prototype.rotateAppropriateHSLValue = function (idx) {
                "use strict";
                var val, start;
                // Grab the appropriate current value and start value
                switch (idx) {
                    case HSLPieceEnum.SATURATION:
                        val = this.rotateSaturation();
                        start = this._startSaturation;
                        break;
                    case HSLPieceEnum.LIGHTNESS:
                        val = this.rotateLightness();
                        start = this._startLightness;
                        break;
                    case HSLPieceEnum.HUE:
                        val = this.rotateHue();
                        start = this._startHue;
                        break;
                }
                // Return true if we'd made a full circle
                if (val === start) {
                    return true;
                }
                return false;
            };
            ;
            /**...........................................................................
             * rotateHue
             * ...........................................................................
             * Rotates our current hue value a set amount
             *
             * @returns The new hue value for the color
             * ...........................................................................
             */
            Color.prototype.rotateHue = function () {
                "use strict";
                this._hue = this.rotateHslValue(this._hue, Colors.HUE_INTERVAL, 360);
                return this._hue;
            };
            ;
            /**...........................................................................
             * rotateSaturation
             * ...........................................................................
             * Get the next saturation value for this color
             *
             * @returns	The next saturation value
             * ...........................................................................
             */
            Color.prototype.rotateSaturation = function () {
                "use strict";
                return this._saturation = this.rotateHslValue(this._saturation, Colors.SATURATION_INTERVAL, 100, Colors.SATURATION_LIMITS.max, Colors.SATURATION_LIMITS.min);
            };
            ;
            /**...........................................................................
             * rotateLightness
             * ...........................................................................
             * Get the next lightness value for this color
             *
             * @returns	The next lightness value
             * ...........................................................................
             */
            Color.prototype.rotateLightness = function () {
                return this._lightness = this.rotateHslValue(this._lightness, Colors.LIGHT_INTERVAL, 100, Colors.LIGHTNESS_LIMITS.max, Colors.LIGHTNESS_LIMITS.min);
            };
            /**...........................................................................
             * rotateHslValue
             * ...........................................................................
             * Rotates a given HSL value by an appropriate interval to get a new color
             *
             * @param 	startVal	The value the HSL value started with
             * @param 	inc 		How much the HSL value should be incremented
             * @param 	modBy		What the mod of the HSL value should be
             * @param 	max			The maximum this HSL value can be
             * @param 	min			The minimum this HSL value can be
             *
             * @returns The newly rotate HSL value
             * ...........................................................................
             */
            Color.prototype.rotateHslValue = function (startVal, inc, modBy, max, min) {
                "use strict";
                var out;
                // Increment and mod
                out = startVal += inc;
                out %= modBy;
                // If we have neither max nor min, quit now
                if (!max) {
                    return KIP.roundToPlace(out, 10);
                }
                if (!min && (min !== 0)) {
                    return KIP.roundToPlace(out, 10);
                }
                // Loop until we have an acceptable value
                while ((out < min) || (out > max)) {
                    out = startVal += inc;
                    out %= modBy;
                }
                // Return the appropriate value
                return KIP.roundToPlace(out, 10);
            };
            ;
            //#endregion
            //#region INTERACT WITH ANOTHER COLOR
            /**...........................................................................
             * getApparentColor
             * ...........................................................................
             * Calculates what the display color of this color would be without setting an alpha value.
             * Can calculate what the RGB value should be given a background color instead of RGBA
             *
             * @param 	backColor 	Either the color object or color string for the background color
             *
             * @returns True if we were successfully able to calculate the apparent color.
             * ...........................................................................
             */
            Color.prototype.getApparentColor = function (backColor) {
                "use strict";
                var c;
                var antiAlpha;
                // Parse the backColor if it is a string, or just leave it if it is an object
                if (backColor._red) {
                    c = backColor;
                }
                else {
                    c = new AnyColor(backColor);
                }
                // quit if this color was parsed incorrectly
                if (!c._parsedCorrectly) {
                    return false;
                }
                antiAlpha = 1 - this._alpha;
                this._red = Math.round((this._red * this._alpha) + (c._red * antiAlpha));
                this._green = Math.round((this._green * this._alpha) + (c._green * antiAlpha));
                this._blue = Math.round((this._blue * this._alpha) + (c._blue * antiAlpha));
                this._alpha = 1;
                return true;
            };
            ;
            /**...........................................................................
             * compare
             * ...........................................................................
             * Finds how similar two colors are based on their HSL values
             * @param {Color} otherColor  - The color we are comparing to
             * @param multipliers - The multipliers we should use to calculate the diff
             * @returns An object containing the total diff calculation as well as the raw diff values
             * ...........................................................................
             */
            Color.prototype.compare = function (other_color, multipliers) {
                "use strict";
                var diffs;
                // If we didn't get multiplers, set some defaults
                if (!multipliers) {
                    multipliers = {
                        hue: 1,
                        saturation: 0.04,
                        lightness: 0.04,
                        alpha: 0.04
                    };
                }
                // Make sure we have HSL for both colors
                other_color.generateHslValues();
                this.generateHslValues();
                // Grab the differences between the values
                diffs = {
                    hue: (other_color._hue - this._hue),
                    saturation: (other_color._saturation - this._saturation),
                    lightness: (other_color._lightness - this._lightness),
                    alpha: (other_color._alpha - this._alpha)
                };
                // Calculate the total diff
                diffs.total = 0;
                diffs.total += (Math.abs(diffs.hue) * (multipliers.hue || 0));
                diffs.total += (Math.abs(diffs.saturation) * (multipliers.saturation || 0));
                diffs.total += (Math.abs(diffs.lightness) * (multipliers.lightness || 0));
                diffs.total += (Math.abs(diffs.alpha) * (multipliers.alpha || 0));
                // return our diffs array
                return diffs;
            };
            /**...........................................................................
             * averageIn
             * ...........................................................................
             * Averages in another color into this one
             * @param   {Color}   other_color The other color to average in
             * @param   {boolean} no_merge    True if we should just return the averages instead of merging them in to this color
             * @returns {Color}               The resulting merged color
             * ...........................................................................
             */
            Color.prototype.averageIn = function (other_color, no_merge) {
                "use strict";
                var avgs;
                // Make sure we have HSL values for both colors
                other_color.generateHslValues();
                this.generateHslValues();
                // Calculate the averages
                avgs = {
                    hue: ((this._hue + other_color._hue) / 2),
                    saturation: ((this._saturation + other_color._saturation) / 2),
                    lightness: ((this._lightness + other_color._lightness) / 2),
                    alpha: ((this._alpha + other_color._alpha) / 2)
                };
                if (no_merge) {
                    return avgs;
                }
                // Set these averaged values as our colors new colors
                this._hue = Math.round(avgs.hue);
                this._saturation = (Math.floor(avgs.saturation * 10) / 10);
                this._lightness = (Math.floor(avgs.lightness * 10) / 10);
                this._alpha = (Math.floor(avgs.alpha * 10) / 10);
                return this;
            };
            /**...........................................................................
             * equals
             * ...........................................................................
             * Check if two colors are functionally equal
             *
             * @param 	other	The color to compare this to
             *
             * @returns	True if the colors have the same values
             * ...........................................................................
             */
            Color.prototype.equals = function (other) {
                return (this.hexString(true) === other.hexString(true));
            };
            //#endregion
            //#region LIGHT AND DARK DETECTION
            /**...........................................................................
             * isDark
             * ...........................................................................
             * Checks if this color object is more dark than light
             *
             * @returns True if the color is dark
             * ...........................................................................
             */
            Color.prototype.isDark = function () {
                "use strict";
                if (!this._hue)
                    this.generateHslValues();
                return (this._lightness <= 50);
            };
            ;
            /**...........................................................................
             * isLight
             * ...........................................................................
             * Checks if this color object is more light than dark
             *
             * @returns True if the color is light
             * ...........................................................................
             */
            Color.prototype.isLight = function () {
                "use strict";
                if (!this._hue)
                    this.generateHslValues();
                return (this._lightness > 50);
            };
            ;
            /**...........................................................................
             * getLightness
             * ...........................................................................
             * Grabs the lightness value of this color
             *
             * @returns The value of this color's lightness
             * ...........................................................................
             */
            Color.prototype.getLightness = function () {
                "use strict";
                if (!this._hue)
                    this.generateHslValues();
                return this._lightness;
            };
            return Color;
        }(KIP.NamedClass));
        Colors.Color = Color;
        //#endregion
        //#region RGB COLOR
        /**...........................................................................
         * @class RGBColor
         * Creates a color based on RGB
         * @version 1.0
         * ...........................................................................
         */
        var RGBColor = /** @class */ (function (_super) {
            __extends(RGBColor, _super);
            /** Creates an RGB Color */
            function RGBColor(redOrRgbString, greenOrAlpha, blue, alpha) {
                var _this = _super.call(this) || this;
                // Parse the string if it was passed in
                if (typeof redOrRgbString === "string") {
                    _this._parsedCorrectly = _this._parseFromRgbColor(redOrRgbString, greenOrAlpha);
                    // Otherwise, use the numeric values
                }
                else {
                    _this.red = redOrRgbString;
                    _this.green = greenOrAlpha;
                    _this.blue = blue;
                    _this.alpha = alpha;
                    _this._parsedCorrectly = true;
                }
                return _this;
            }
            /**...........................................................................
             * getCurrentHue
             * ...........................................................................
             * Grabs the current RGB string for the color
             *
             * @param	withAlpha	True if the string should include the alpha value
             *
             * @returns The RGB string for the color
             * ...........................................................................
             */
            RGBColor.prototype.getCurrentColor = function (withAlpha) {
                return this.rgbString(withAlpha);
            };
            return RGBColor;
        }(Color));
        Colors.RGBColor = RGBColor;
        //#endregion
        //#region HSL COLOR
        /**...........................................................................
         * @class HSLColor
         * Creates a color based on HSL
         * @version 1.0
         * ...........................................................................
         */
        var HSLColor = /** @class */ (function (_super) {
            __extends(HSLColor, _super);
            /** Creates an HSL Color */
            function HSLColor(hueOrHslString, saturationOrAlpha, lightness, alpha) {
                var _this = _super.call(this) || this;
                // parse the color string if passed in
                if (typeof hueOrHslString === "string") {
                    _this._parsedCorrectly = _this._parseFromHslColor(hueOrHslString, saturationOrAlpha);
                    // use the numeric values
                }
                else {
                    _this.hue = hueOrHslString;
                    _this.saturation = saturationOrAlpha;
                    _this.lightness = lightness;
                    _this.alpha = alpha;
                    _this._parsedCorrectly = true;
                }
                return _this;
            }
            /**...........................................................................
             * getCurrentHue
             * ...........................................................................
             * Grabs the current HSL string for the color
             *
             * @param	withAlpha	True if the string should include the alpha value
             *
             * @returns The HSL string for the color
             * ...........................................................................
             */
            HSLColor.prototype.getCurrentColor = function (withAlpha) {
                return this.hslString(withAlpha);
            };
            return HSLColor;
        }(Color));
        Colors.HSLColor = HSLColor;
        //#endregion
        //#region HEX COLOR
        var HexColor = /** @class */ (function (_super) {
            __extends(HexColor, _super);
            /**...........................................................................
             * Creates a hex color
             *
             * @param 	hexString	The hex or hex-alpha string to base this color on
             * @param 	alpha		If not a part of the string, the alpha value to use
             * 						for this color
             * ...........................................................................
             */
            function HexColor(hexString, alpha) {
                var _this = _super.call(this) || this;
                _this._parsedCorrectly = _this._parseFromHexColor(hexString);
                return _this;
            }
            /**...........................................................................
             * getCurrentHue
             * ...........................................................................
             * Grabs the current hex string for the color
             *
             * @param	withAlpha	True if the string should include the alpha value
             *
             * @returns The hex string for the color
             * ...........................................................................
             */
            HexColor.prototype.getCurrentColor = function (withAlpha) {
                return this.hexString(withAlpha);
            };
            return HexColor;
        }(Color));
        Colors.HexColor = HexColor;
        //#endregion
        //#region ANY COLOR TYPE
        /**...........................................................................
         * @class AnyColor
         * Color class that can take in any color string
         * @version 1.0
         * ...........................................................................
         */
        var AnyColor = /** @class */ (function (_super) {
            __extends(AnyColor, _super);
            /**...........................................................................
             * Creates a color
             *
             * @param	colorString		The string to create from
             * @param	alpha			If not included in the color string, the alpha
             * 							value to use for the color
             */
            function AnyColor(colorString, alpha) {
                var _this = _super.call(this) || this;
                _this._parsedCorrectly = _this._parseColorString(colorString, alpha);
                return _this;
            }
            /**...........................................................................
             * getCurrentColor
             * ...........................................................................
             * Grabs the current hex string for the color
             *
             * @param 	withAlpha	True if the string should contain the alpha value
             *
             * @returns	The hex string for the color
             * ...........................................................................
             */
            AnyColor.prototype.getCurrentColor = function (withAlpha) {
                return this.hexString(withAlpha);
            };
            return AnyColor;
        }(Color));
        Colors.AnyColor = AnyColor;
        //#endregion
    })(Colors = KIP.Colors || (KIP.Colors = {}));
})(KIP || (KIP = {}));
///<reference path="../helpers/styles.ts" />
///<reference path="../helpers/html.ts" />
var KIP;
(function (KIP) {
    /**...........................................................................
     * @class Drawable
     * Creates an element
     * ...........................................................................
     */
    var Drawable = /** @class */ (function (_super) {
        __extends(Drawable, _super);
        /**...........................................................................
         * Create a Drawable element
         * @param	baseElemTemplate	If provided, the template upon which to create the base element
         * ...........................................................................
         */
        function Drawable(baseElemTemplate) {
            var _this = 
            // Initialize both the stylable parts of this and the 
            _super.call(this) || this;
            _this._addClassName("Drawable");
            // initialize our elements
            _this._elems = {};
            // Handle when we are passed an element to form the base of 
            if (baseElemTemplate) {
                _this._elems.base = KIP.createElement(baseElemTemplate);
            }
            // check that we have enough data to create elements
            if (_this._shouldSkipCreateElements()) {
                return _this;
            }
            // actually create the elements associated with this class
            _this._createElements();
            return _this;
        }
        Object.defineProperty(Drawable.prototype, "base", {
            /** expose the base element externally for anyone who needs it */
            get: function () { return this._elems.base; },
            enumerable: true,
            configurable: true
        });
        /**...........................................................................
         * _shouldSkipCreateElements
         * ...........................................................................
         * Function to determine whether we should skip the createElements. Useful in
         * cases where data needs to be present in the class before elements can be
         * created.
         *
         * @returns	True if we shouldn't create elements
         * ...........................................................................
         */
        Drawable.prototype._shouldSkipCreateElements = function () { return false; };
        /**...........................................................................
         * draw
         * ...........................................................................
         * Draws the element of this Drawable & all children + siblings
         * @param 	parent  	The element this Drawable should be added to
         * @param 	force 		True if we need to remove & redraw this element
         * ...........................................................................
         */
        Drawable.prototype.draw = function (parent, force) {
            var _this = this;
            // Quit if we don't have anything to draw
            if (!this._elems || !this._elems.base) {
                return;
            }
            if (!this._hasCreatedStyles) {
                window.setTimeout(function () {
                    _this.draw(parent, force);
                }, 0);
                return;
            }
            // Refresh our contents
            this._refresh();
            // Save off this parent & quit if there is no parent
            this._parent = parent || this._parent;
            if (!this._parent) {
                return;
            }
            // Draw the base element
            this._drawBase();
            // Make sure we have a touchpoint for refreshing after the draw step
            this._afterDraw();
        };
        ;
        /**...........................................................................
         * _drawBase
         * ...........................................................................
         * Draws a Drawable or HTML Element
         *
         * @param	force	If true, erases and redraws the base element
         * ...........................................................................
         */
        Drawable.prototype._drawBase = function (force) {
            // grab the base helper
            var base = this._elems.base;
            // If we are redrawing or have never drawn the element, do so
            if (force || (!base.parentNode)) {
                // Remove first from the parent if we need to
                if (force && base.parentNode) {
                    base.parentNode.removeChild(base);
                }
                // If there's no parent, quit
                if (!this._parent) {
                    return;
                }
                // Add back to the parent
                this._parent.appendChild(base);
            }
        };
        /**...........................................................................
         * erase
         * ...........................................................................
         * Remove this drawable from the canvas
         * ...........................................................................
         */
        Drawable.prototype.erase = function () {
            var base = this._elems.base;
            if (base.parentNode) {
                base.parentNode.removeChild(base);
            }
        };
        ;
        /**...........................................................................
         * _refresh
         * ...........................................................................
         * Overridable function that refreshes the UI of this Drawable. Does not
         * guarantee that the element has been drawn.
         * ...........................................................................
         */
        Drawable.prototype._refresh = function () { };
        ;
        /**...........................................................................
         * _afterDraw
         * ...........................................................................
         * Overridable function to make sure we can adjust sizes should we need to
         * ...........................................................................
         */
        Drawable.prototype._afterDraw = function () { };
        ;
        /**...........................................................................
         * _onResize
         * ...........................................................................
         * Overridable function to adjust when the screen resizes
         * ...........................................................................
         */
        Drawable.prototype._onResize = function () { };
        ;
        return Drawable;
    }(KIP.Styles.Stylable));
    KIP.Drawable = Drawable;
    /**...........................................................................
     * SimpleDrawable
     * ...........................................................................
     * Very basic implementation of the Drawable class that contains just a
     * single element.
     * @version 1.0
     * ...........................................................................
     */
    var SimpleDrawable = /** @class */ (function (_super) {
        __extends(SimpleDrawable, _super);
        /**...........................................................................
         * create a simple Drawable element
         * @param	obj		The details about the element we should draw
         * ...........................................................................
         */
        function SimpleDrawable(obj) {
            return _super.call(this, obj) || this;
        }
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Do nothing, since we will create the base element in the construtor
         * ...........................................................................
         */
        SimpleDrawable.prototype._createElements = function () { };
        return SimpleDrawable;
    }(Drawable));
    KIP.SimpleDrawable = SimpleDrawable;
})(KIP || (KIP = {}));
///<reference path="drawable.ts" />
var KIP;
(function (KIP) {
    var ContextMenuColors;
    (function (ContextMenuColors) {
        ContextMenuColors[ContextMenuColors["MAIN_COLOR"] = 0] = "MAIN_COLOR";
        ContextMenuColors[ContextMenuColors["FONT_COLOR"] = 1] = "FONT_COLOR";
        ContextMenuColors[ContextMenuColors["SUB_MENU_COLOR"] = 2] = "SUB_MENU_COLOR";
        ContextMenuColors[ContextMenuColors["SUB_MENU_BORDER"] = 3] = "SUB_MENU_BORDER";
        ContextMenuColors[ContextMenuColors["SUB_SUB_MENU_COLOR"] = 4] = "SUB_SUB_MENU_COLOR";
        ContextMenuColors[ContextMenuColors["SUB_SUB_MENU_BORDER"] = 5] = "SUB_SUB_MENU_BORDER";
    })(ContextMenuColors = KIP.ContextMenuColors || (KIP.ContextMenuColors = {}));
    /**...........................................................................
     * @class ContextMenu
     * creates a custom context menu
     * @version 1.0
     * ...........................................................................
     */
    var ContextMenu = /** @class */ (function (_super) {
        __extends(ContextMenu, _super);
        /**...........................................................................
         * Creates a custom context (right-click) menu for a given element
         * @param 	target    	The element to create the custom menu for
         * @param 	noStyles	True if we shouldn't create css classes for the standard menu styles
         * @param	themes		Optional set of theme colors to use for the menu
         * ...........................................................................
         */
        function ContextMenu(target, noStyles, themes) {
            var _this = 
            // Initialize our Drawable
            _super.call(this, { cls: "ctxMenu" }) || this;
            _this._addClassName("ContextMenu");
            // Set our initial properties
            _this._target = target;
            _this._noStyles = noStyles;
            _this._themes = themes || ["rgba(40,40,40,1)", "#FFF", "rgba(40,40,40,.9)", "#777", "rgba(40,40,40,.85)", "#888", "#505050", "#999"];
            // Initialize the option array
            _this._options = new KIP.Collection();
            // Create our other elements
            _this._createElements();
            // Add listeners
            _this._addEventListeners();
            return _this;
        }
        Object.defineProperty(ContextMenu.prototype, "base", {
            /** public accessible function for the base element */
            get: function () { return this._elems.base; },
            enumerable: true,
            configurable: true
        });
        /**...........................................................................
         * addOption
         * ...........................................................................
         * adds an option to our context menu
         *
         * @param	opt			The option to add
         * @param	subOptions	Any nested options to include
         * @param	parent		What the parent element should be (defaults to option container)
         *
         * @returns	True if the option could be added
         * ...........................................................................
         */
        ContextMenu.prototype.addOption = function (opt, subOptions, parent) {
            // Make sure the option label is unique
            if (this._options.hasElement(opt.label)) {
                return false;
            }
            // Create the element for the option if not included
            if (!opt.elems) {
                opt.elems = {};
            }
            ;
            if (!opt.elems.base) {
                if (!parent) {
                    parent = this._elems.option_container;
                }
                opt.elems.base = KIP.createSimpleElement("", "ctxOption", opt.label, null, null, parent);
                opt.elems.base.onclick = opt.callback;
            }
            // Add the option to our collection
            this._options.addElement(opt.label, opt);
            // Loop through suboptions and add them as well
            var sub_success = true;
            for (var _i = 0, subOptions_1 = subOptions; _i < subOptions_1.length; _i++) {
                var s_opt = subOptions_1[_i];
                if (!this.addSubOption(opt, s_opt)) {
                    sub_success = false;
                }
            }
            if (!sub_success) {
                return false;
            }
            // Making it this far means we added everything ok
            return true;
        };
        /**...........................................................................
         * addSubOption
         * ...........................................................................
         * Adds a nested option to our context menu
         *
         * @param 	srcOption	The option we are nesting under
         * @param 	subOption 	The sub option we are currently adding
         *
         * @returns	True if the suboption was added
         * ...........................................................................
         */
        ContextMenu.prototype.addSubOption = function (srcOption, subOption) {
            // Try to grab the option from our collection if not passed in correctly
            if (!srcOption.elems) {
                // If this is a new option, create it first
                if (!this._options.hasElement(srcOption.label)) {
                    this.addOption(srcOption);
                }
                // Try to grab the option from our collection
                srcOption = this._getOption(srcOption.label);
                // Quit if we couldn't find an option
                if (!srcOption) {
                    return false;
                }
            }
            // Quit if the option hasn't been appropriately initialized
            if (!srcOption.elems) {
                return false;
            }
            // Create the submenu div if it's missing
            if (!srcOption.elems.sub_menu) {
                this._buildSubMenu(srcOption);
            }
            // Add the actual sub menu
            this.addOption(subOption, [], srcOption.elems.sub_menu);
        };
        /**...........................................................................
         * _buildSubMenu
         * ...........................................................................
         * creates a sub menu
         * @param	srcOption	The option to nest under
         * ...........................................................................
         */
        ContextMenu.prototype._buildSubMenu = function (srcOption) {
            srcOption.elems.sub_menu = KIP.createSimpleElement("", "subMenu hidden", "", null, null, srcOption.elems.base);
            srcOption.elems.base.innerHTML += "...";
            if (!this._noStyles) {
                return;
            }
            // Handle mouse-over only if we didn't add standard classes
            srcOption.elems.sub_menu.style.display = "none";
            srcOption.elems.base.addEventListener("mouseover", function () {
                srcOption.elems.sub_menu.style.display = "block";
            });
            srcOption.elems.base.addEventListener("mouseout", function () {
                srcOption.elems.sub_menu.style.display = "none";
            });
        };
        /**...........................................................................
         * _getOption
         * ...........................................................................
         * grabs a particular option from our menu
         *
         * @param	lbl		The label of the option we are grabbing
         *
         * @returns	The option with this label
         * ...........................................................................
         */
        ContextMenu.prototype._getOption = function (lbl) {
            if (!lbl) {
                return null;
            }
            var iCol = this._options.getElement(lbl);
            // Grab the value of the element in our collection
            if (iCol) {
                return iCol.value;
            }
            else {
                return null;
            }
        };
        /**...........................................................................
         * removeOption
         * ...........................................................................
         * removes an option from our menu
         *
         * @param	lbl		The label of the option being removed
         *
         * @returns	True if the option was removed
         * ...........................................................................
         */
        ContextMenu.prototype.removeOption = function (lbl) {
            var opt;
            var iCol;
            iCol = this._options.removeElement(lbl);
            if (!iCol) {
                return false;
            }
            opt = iCol.value;
            // Also remove the HTML element added by this option
            if (opt.elems.base.parentNode) {
                opt.elems.base.parentNode.removeChild(opt.elems.base);
            }
            else {
                return false;
            }
            // Return true if we made it this far
            return true;
        };
        ;
        /**...........................................................................
         * clearOptions
         * ...........................................................................
         * Removes all of our options
         * ...........................................................................
         */
        ContextMenu.prototype.clearOptions = function () {
            this._options.resetLoop(true);
            var opt;
            var iCol;
            // Remove all HTML ELements
            while (this._options.hasNext(true)) {
                iCol = this._options.getNext(true);
                if (!iCol) {
                    continue;
                }
                opt = iCol.value;
                if (opt.elems.base.parentNode) {
                    opt.elems.base.parentNode.removeChild(opt.elems.base);
                }
            }
            // Clear the collection
            this._options.clear();
        };
        ;
        /**...........................................................................
         * _addEventListeners
         * ...........................................................................
         * Adds event listeners to the relevant pieces to show and/or hide the context menu
         * ...........................................................................
         */
        ContextMenu.prototype._addEventListeners = function () {
            var _this = this;
            // Erase the currently showing context menu always on mousedown and on right-click
            if (!ContextMenu._windowListenersAdded) {
                window.addEventListener("contextmenu", function () {
                    _this._hideExistingMenu();
                });
                window.addEventListener("mousedown", function () {
                    _this._hideExistingMenu();
                });
                ContextMenu._windowListenersAdded;
            }
            // Show this menu when it's target is hit
            this._target.addEventListener("contextmenu", function (e) {
                var pos_x;
                var pos_y;
                _this.erase();
                // Show the normal rclick menu when holding control
                if (e.ctrlKey) {
                    return true;
                }
                // Stop bubbling since we have found our target
                e.stopPropagation();
                e.preventDefault();
                // Grab the approximate position
                pos_x = e.clientX;
                pos_y = e.clientY;
                // Adjust the display
                _this.base.style.left = (pos_x + "px");
                _this.base.style.top = (pos_y + "px");
                // Draw in our best guess position
                _this.draw(document.body);
                // If we're too far over, shift it.
                if ((pos_x + _this.base.offsetWidth) > window.innerWidth) {
                    pos_x = (window.innerWidth - _this.base.offsetWidth);
                }
                // If we're too low, move up
                if ((pos_y + _this.base.offsetHeight) > window.innerHeight) {
                    pos_y = (window.innerHeight - _this.base.offsetHeight);
                }
                // Adjust the display
                _this.base.style.left = (pos_x + "px");
                _this.base.style.top = (pos_y + "px");
                // prevent the real r-click menu
                return false;
            });
        };
        ;
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Creates the basic elements of the context menu & optionally adds the
         * standard classes
         * ...........................................................................
         */
        ContextMenu.prototype._createElements = function () {
            this._elems.option_container = KIP.createSimpleElement("", "optionContainer", "", null, null, this.base);
            this._setThemeColors();
        };
        ;
        /**...........................................................................
         * _setThemeColors
         * ...........................................................................
         * Sets the theme colors for the context menu
         * ...........................................................................
         */
        ContextMenu.prototype._setThemeColors = function () {
            var idx = 0;
            for (idx; idx < this._themes.length; idx += 1) {
                this.setThemeColor(idx, this._themes[idx]);
            }
        };
        /**...........................................................................
         * _hideExistingMenu
         * ...........................................................................
         * Hides whatever context menu is currently showing
         * ...........................................................................
         */
        ContextMenu.prototype._hideExistingMenu = function () {
            if (ContextMenu._showingMenu) {
                if (ContextMenu._showingMenu.base.parentNode) {
                    ContextMenu._showingMenu.base.parentNode.removeChild(ContextMenu._showingMenu.base);
                }
            }
        };
        /** the styles to use for the standard context menu */
        ContextMenu._uncoloredStyles = {
            ".ctxMenu": {
                backgroundColor: "<0>",
                color: "<1>",
                fontFamily: "'Calibri Light', Helvetica",
                boxShadow: "1px 1px 3px 2px rgba(0,0,0,.1)",
                fontSize: "14px",
                borderRadius: "4px",
                paddingTop: "2px",
                paddingBottom: "2px",
                width: "10%",
                position: "absolute"
            },
            ".ctxMenu .subMenu": {
                backgroundColor: "<2>",
                width: "100%",
                top: "-2px",
                boxShadow: "1px 1px 1px 1px rgba(0,0,0,.1)",
                left: "calc(100% - 1px)",
                borderLeft: "1px solid <3>"
            },
            ".ctxMenu .subMenu .subMenu": {
                backgroundColor: "<4>",
                borderLeft: "1px solid <5>"
            },
            ".ctxMenu .ctxOption": {
                padding: "4px 10px",
                cursor: "pointer",
                position: "relative"
            },
            ".ctxMenu .ctxOption:hover": {
                backgroundColor: "<6>",
                color: "<2>",
                borderLeft: "7px solid <7>"
            }
        };
        return ContextMenu;
    }(KIP.Drawable));
    KIP.ContextMenu = ContextMenu;
})(KIP || (KIP = {}));
///<reference path="drawable.ts" />
var KIP;
(function (KIP) {
    //TODO: Cleanup this implementation
    var DraggableFunctions;
    (function (DraggableFunctions) {
        DraggableFunctions[DraggableFunctions["DragEnter"] = 0] = "DragEnter";
        DraggableFunctions[DraggableFunctions["DragLeave"] = 1] = "DragLeave";
        DraggableFunctions[DraggableFunctions["Drop"] = 2] = "Drop";
        DraggableFunctions[DraggableFunctions["Move"] = 3] = "Move";
    })(DraggableFunctions = KIP.DraggableFunctions || (KIP.DraggableFunctions = {}));
    /**...........................................................................
     * @class Draggable
     * ...........................................................................
     * A visual element that can be dragged about the screen
     * @version 1.0
     * ...........................................................................
     */
    var Draggable = /** @class */ (function (_super) {
        __extends(Draggable, _super);
        //#endregion
        /**...........................................................................
         * Creates a Draggable element
         *
         * @param	obj				Optional definition of what the base element of
         * 							this object looks like
         * @param	dragTarget		Optional target for dropping the element
         * @param	useNonStandard	If true, uses non HTML5 drag events (e.g. mouseup)
         * ...........................................................................
         */
        function Draggable(obj, dragTarget, useNonStandard) {
            var _this = 
            // Call our super function
            _super.call(this, obj) || this;
            _this._addClassName("Draggable");
            // Set our internal properties
            _this._useNonStandard = useNonStandard;
            _this._targets = [];
            // Add the target if it was passed in, or the document body if it wasn't
            if (dragTarget) {
                _this._targets.push(dragTarget);
            }
            else {
                _this._targets.push(document.body);
            }
            // Make sure the element is positionable
            KIP.addClass(_this._elems.base, "draggable");
            // Add the default event handlers
            _this._addDefaultEventFunctions();
            // Add the appropriate listeners after the current stack is empty
            _this._isDragging = false;
            window.setTimeout(function () {
                if (!useNonStandard) {
                    _this._addStandardDragEventListeners();
                }
                else {
                    _this._addNonStandardDragEventListeners();
                }
            }, 0);
            return _this;
        }
        Object.defineProperty(Draggable.prototype, "dragEnterFunc", {
            set: function (func) { this._dragEnterFunc = func; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Draggable.prototype, "dragLeaveFunc", {
            set: function (func) { this._dragLeaveFunc = func; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Draggable.prototype, "dropFunc", {
            set: function (func) { this._dropFunc = func; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Draggable.prototype, "moveFunc", {
            set: function (func) { this._moveFunc = func; },
            enumerable: true,
            configurable: true
        });
        /**...........................................................................
         * _addDefaultEventFunctions
         * ...........................................................................
         * Add handlers for each of these elements
         * ...........................................................................
         */
        Draggable.prototype._addDefaultEventFunctions = function () {
            var base = this._elems.base;
            // MOVE FUNCTION
            this._moveFunc = function (delta) {
                // Default implementation : adjust position
                var new_pt = {
                    x: ((parseInt(base.style.left) || 0) + delta.x),
                    y: ((parseInt(base.style.top) || 0) + delta.y)
                };
                base.style.left = new_pt.x + "px";
                base.style.top = new_pt.y + "px";
            };
            // DRAG ENTER FUNCTION
            this._dragEnterFunc = function (target, e) {
                e.preventDefault();
            };
            // DRAG LEAVE FUNCTION
            this._dragLeaveFunc = function (target, e) {
                e.preventDefault();
            };
            // DROP FUNCTION
            this._dropFunc = function (target, e) {
                // Prevent the default
                e.preventDefault();
                //Default implementation - add to the target
                if (base.parentNode === target) {
                    return;
                }
                if (base.parentNode) {
                    base.parentNode.removeChild(base);
                }
                target.appendChild(base);
            };
        };
        /**...........................................................................
         * _addStandardDragEventListeners
         * ...........................................................................
         * Add
         * ...........................................................................
         */
        Draggable.prototype._addStandardDragEventListeners = function () {
            var _this = this;
            var base = this._elems.base;
            // Make sure we have the attribute on the draggable
            base.setAttribute("draggable", "true");
            base.addEventListener("dragstart", function (e) {
                _this._isDragging = true;
                _this._updateMousePoint(e);
                e.dataTransfer.dropEffect = "move";
                //e.preventDefault();
            });
            base.addEventListener('drag', function (e) {
            });
            base.addEventListener("dragend", function (e) {
                _this._isDragging = false;
            });
            var target;
            for (var _i = 0, _a = this._targets; _i < _a.length; _i++) {
                target = _a[_i];
                this._addStandardTargetEventListeners(target);
            }
        };
        /**...........................................................................
         * _addNonStandardDragEventListeners
         * ...........................................................................
         *
         * ...........................................................................
         */
        Draggable.prototype._addNonStandardDragEventListeners = function () {
            var _this = this;
            var base = this._elems.base;
            base.addEventListener("mousedown", function (e) {
                _this._isDragging = true;
                // Set our initial point
                _this._updateMousePoint(e);
                // Add the additional listeners we care about
                window.addEventListener("mousemove", mousemove);
                window.addEventListener("mouseup", mouseup);
                window.addEventListener("mouseout", mouseout);
            });
            var mousemove = function (e) {
                if (!_this._isDragging) {
                    return;
                }
                var delta = _this._getDelta(e);
                // update our point
                _this._updateMousePoint(e);
                // Call our overridable move function
                _this._onMove(delta);
            };
            var mouseup = function (e) {
                __stopDragging();
            };
            var mouseout = function (e) {
                if (e.relatedTarget)
                    return;
                __stopDragging();
            };
            // Remove all listeners & reset our var
            var __stopDragging = function () {
                // Quit if we've already removed these events
                if (!_this._isDragging) {
                    return;
                }
                // Set our internal variable to false
                _this._isDragging = false;
                // Remove listeners
                window.removeEventListener("mousemove", mousemove);
                window.removeEventListener("mouseup", mouseup);
                window.removeEventListener("mouseout", mouseout);
            };
            var target;
            for (var _i = 0, _a = this._targets; _i < _a.length; _i++) {
                target = _a[_i];
                this._addNonStandardTargetEventListeners(target);
            }
        };
        /**...........................................................................
         * _addNonStandardTargetEventListeners
         * ...........................................................................
         * @param target
         * ...........................................................................
         */
        Draggable.prototype._addNonStandardTargetEventListeners = function (target) {
            var _this = this;
            target.addEventListener("mouseup", function (e) {
                if (!_this._isDragging) {
                    return;
                }
                _this._onDropOnTarget(target, e);
            });
            target.addEventListener("mouseover", function (e) {
                if (!_this._isDragging) {
                    return;
                }
                _this._onDragEnterTarget(target, e);
            });
            target.addEventListener("mouseout", function (e) {
                if (!_this._isDragging) {
                    return;
                }
                _this._onDragLeaveTarget(target, e);
            });
        };
        /**...........................................................................
         * _addStandardTargetEventListeners
         * ...........................................................................
         * @param target
         * ...........................................................................
         */
        Draggable.prototype._addStandardTargetEventListeners = function (target) {
            var _this = this;
            target.addEventListener("dragover", function (e) {
                _this._onDragEnterTarget(target, e);
            });
            target.addEventListener("dragexit", function (e) {
                _this._onDragLeaveTarget(target, e);
            });
            target.addEventListener("drop", function (e) {
                _this._onDropOnTarget(target, e);
            });
        };
        /**...........................................................................
         * addDragTarget
         * ...........................................................................
         * Adds a new element that can receive the draggable element
         * @param 	target 	The new target to allow drop events on
         * ...........................................................................
         */
        Draggable.prototype.addDragTarget = function (target) {
            this._targets.push(target);
            if (!this._useNonStandard) {
                this._addStandardTargetEventListeners(target);
            }
            else {
                this._addNonStandardTargetEventListeners(target);
            }
        };
        /**...........................................................................
         * _onDragEnterTarget
         * ...........................................................................
         * @param target
         * @param e
         * ...........................................................................
         */
        Draggable.prototype._onDragEnterTarget = function (target, e) {
            this._dragEnterFunc(target, e);
        };
        /**...........................................................................
         * _onDragLeaveTarget
         * ...........................................................................
         * @param target
         * @param e
         * ...........................................................................
         */
        Draggable.prototype._onDragLeaveTarget = function (target, e) {
            this._dragLeaveFunc(target, e);
        };
        /**...........................................................................
         * _onMove
         * ...........................................................................
         * @param delta
         * ...........................................................................
         */
        Draggable.prototype._onMove = function (delta) {
            this._moveFunc(delta);
        };
        /**...........................................................................
         * _onDropOnTarget
         * ...........................................................................
         * @param target
         * @param e
         * ...........................................................................
         */
        Draggable.prototype._onDropOnTarget = function (target, e) {
            this._dropFunc(target, e);
        };
        /**...........................................................................
         * _overrideFunctions
         * ...........................................................................
         * @param dragEnter
         * @param dragLeave
         * @param drop
         * @param move
         * @param noReplace
         * ...........................................................................
         */
        Draggable.prototype.overrideFunctions = function (handlers, noReplace) {
            if (handlers.onDragEnter) {
                this._overrideFunction(DraggableFunctions.DragEnter, this._dragEnterFunc, handlers.onDragEnter, noReplace);
            }
            if (handlers.onDragLeave) {
                this._overrideFunction(DraggableFunctions.DragLeave, this._dragLeaveFunc, handlers.onDragLeave, noReplace);
            }
            if (handlers.onDrop) {
                this._overrideFunction(DraggableFunctions.Drop, this._dropFunc, handlers.onDrop, noReplace);
            }
            if (handlers.onMove) {
                this._overrideFunction(DraggableFunctions.Move, this._moveFunc, handlers.onMove, noReplace);
            }
        };
        /**...........................................................................
         * _overrideFunction
         * ...........................................................................
         * @param func
         * @param def
         * @param override
         * @param no_replace
         * ...........................................................................
         */
        Draggable.prototype._overrideFunction = function (func, def, override, no_replace) {
            var _this = this;
            var wrapper;
            switch (func) {
                //override or augment the drag enter function
                case DraggableFunctions.DragEnter:
                    wrapper = function (target, e) {
                        if (no_replace) {
                            def.call(_this, target, e);
                        }
                        override.call(_this, target, e);
                    };
                    this._dragEnterFunc = wrapper;
                    break;
                // override or augment the drag leave function
                case DraggableFunctions.DragLeave:
                    wrapper = function (target, e) {
                        if (no_replace) {
                            def.call(_this, target, e);
                        }
                        override.call(_this, target, e);
                    };
                    this._dragLeaveFunc = wrapper;
                    break;
                // Override or augment the drop function
                case DraggableFunctions.Drop:
                    wrapper = function (target, e) {
                        if (no_replace) {
                            def.call(_this, target, e);
                        }
                        override.call(_this, target, e);
                    };
                    this._dropFunc = wrapper;
                    break;
                // Override or augment the move function
                case DraggableFunctions.Move:
                    wrapper = function (delta) {
                        if (no_replace) {
                            def.call(_this, delta);
                        }
                        override.call(_this, delta);
                    };
                    this._moveFunc = wrapper;
                    break;
            }
        };
        /**...........................................................................
         * _getDelta
         * ...........................................................................
         * Gets the delta from the last measurement and this point
         * @param	e 	The event we are measuring from
         * @returns The delta represented as a point
         * ...........................................................................
         */
        Draggable.prototype._getDelta = function (e) {
            var delta;
            // Create the delta element
            delta = {
                x: (e.clientX - this._mousePoint.x),
                y: (e.clientY - this._mousePoint.y)
            };
            return delta;
        };
        /**...........................................................................
         * _updateMousePoint
         * ...........................................................................
         * Updates our internal tracking for the last mouse point
         * @param {MouseEvent} e The event we are using to set the point
         * ...........................................................................
         */
        Draggable.prototype._updateMousePoint = function (e) {
            this._mousePoint = {
                x: e.clientX,
                y: e.clientY
            };
        };
        /** handle the particular styles for this class */
        Draggable._uncoloredStyles = {
            ".draggable": {
                position: "absolute !important",
                cursor: "-webkit-grab"
            },
            ".draggable.grabbing": {
                cursor: "-webkit-grabbing"
            },
            ".droppable": {
                cursor: "pointer"
            }
        };
        return Draggable;
    }(KIP.Drawable));
    KIP.Draggable = Draggable;
    /**...........................................................................
     * ExistingDraggable
     * ...........................................................................
     * Turn an existing element into one that can be dragged about the screen
     * @version 1.0
     * ...........................................................................
     */
    var ExistingDraggable = /** @class */ (function (_super) {
        __extends(ExistingDraggable, _super);
        /**...........................................................................
         * create an Existing Draggable element from an existing HTML or SVG element
         * @param	existingElem	The element to use as the base
         * @param	target			If included, the target of drop actions
         * @param	nonStandard		If true, uses mouseup / down instead of drag / drop
         * ...........................................................................
         */
        function ExistingDraggable(existingElem, target, nonStandard) {
            var _this = _super.call(this, null, target, nonStandard) || this;
            _this._elems = {
                base: existingElem
            };
            return _this;
        }
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Does nothing as the only element here is the base, which already exists
         * ...........................................................................
         */
        ExistingDraggable.prototype._createElements = function () { };
        return ExistingDraggable;
    }(Draggable));
    KIP.ExistingDraggable = ExistingDraggable;
    /**...........................................................................
     * makeDraggable
     * ...........................................................................
     * Makes a particular element draggable
     *
     * @param 	elem         	The element to make draggable
     * @param 	target       	The drop-target of the draggable
     * @param 	non_standard 	True if we should use non-standard events
     *
     * @returns	HTML element that respects drag events
     * ...........................................................................
     */
    function makeDraggable(elem, options) {
        // Behind the scenes, we create a draggable to get this
        var drg = new ExistingDraggable(elem, options.target, options.isNonStandard);
        drg.overrideFunctions(options);
        // Return the element of the Draggable
        return drg.base;
    }
    KIP.makeDraggable = makeDraggable;
})(KIP || (KIP = {}));
///<reference path="drawable.ts" />
var KIP;
(function (KIP) {
    //TODO: finish & export
    var DrawableCanvas = /** @class */ (function (_super) {
        __extends(DrawableCanvas, _super);
        function DrawableCanvas(id, cls) {
            return _super.call(this, {
                type: "canvas",
                id: id,
                cls: cls
            }) || this;
        }
        DrawableCanvas.prototype.drawRect = function (x, y, w, h) { };
        DrawableCanvas.prototype._createElements = function () { };
        return DrawableCanvas;
    }(KIP.Drawable));
    var ICanvasElement = /** @class */ (function () {
        function ICanvasElement() {
        }
        return ICanvasElement;
    }());
    KIP.ICanvasElement = ICanvasElement;
    var CanvasElementType;
    (function (CanvasElementType) {
        CanvasElementType[CanvasElementType["Rectangle"] = 0] = "Rectangle";
        CanvasElementType[CanvasElementType["Circle"] = 1] = "Circle";
        CanvasElementType[CanvasElementType["Polygon"] = 2] = "Polygon";
        CanvasElementType[CanvasElementType["Star"] = 3] = "Star";
    })(CanvasElementType = KIP.CanvasElementType || (KIP.CanvasElementType = {}));
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    /**...........................................................................
     * Drawable element that also allows for editing inline
     * @class Editable
     * @version 1.0
     * ...........................................................................
     */
    var Editable = /** @class */ (function (_super) {
        __extends(Editable, _super);
        //#region INITIALIZE OUR EDITABLE
        /**...........................................................................
         * Creates an Editable object
         *
         * @param	options		Any options needed to configure the editable
         * ...........................................................................
         */
        function Editable(options) {
            var _this = this;
            // initialize options if they weren't passed in
            if (!options) {
                options = {};
            }
            options.cls = (options.cls || "") + " editable";
            // Call the Drawable constructor
            _this = _super.call(this, options) || this;
            _this._addClassName("Editable");
            // Store our properties
            _this.type = options.inputType;
            _this.value = options.value;
            // add the validation functions added by the user
            _this.onValidate = options.onValidate;
            _this.onUpdate = options.onUpdate;
            _this.formatFunc = options.formatFunc;
            _this.onUnformat = options.onUnformat;
            // Default the format functions
            if (!_this.formatFunc) {
                _this.formatFunc = function (value) {
                    if (!value) {
                        return "";
                    }
                    return value.toString();
                };
            }
            if (!_this.onUnformat) {
                _this.onUnformat = function (value) {
                    return value;
                };
            }
            // Initialize our modifying flag
            _this._isModifying = false;
            // Create the elements, along with their listeners
            _this._createElements();
            _this._addListeners();
            return _this;
        }
        /**...........................................................................
         * _shouldSkipCreateElements
         * ...........................................................................
         * If true, doesn't run the element creation until manually called
         * @returns	True
         * ...........................................................................
         */
        Editable.prototype._shouldSkipCreateElements = function () { return true; };
        //#endregion
        //#region CREATE ELEMENTS & LISTENERS
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Create elements for the editable
         * ...........................................................................
         */
        Editable.prototype._createElements = function () {
            var base = this._elems.base;
            var val_str;
            val_str = this.formatFunc(this.value);
            this._elems.display = KIP.createElement({
                content: val_str,
                parent: this._elems.base
            });
            this._elems.input = KIP.createElement({
                type: "input",
                attr: {
                    "type": this.type,
                    "value": this.value
                }
            });
        };
        /**...........................................................................
         * _addListeners
         * ...........................................................................
         * Add event listeners to the editable
         * ...........................................................................
         */
        Editable.prototype._addListeners = function () {
            var _this = this;
            // Click event on our base element
            this.base.addEventListener("click", function (e) {
                if (!_this._isModifying) {
                    _this.modify();
                }
                // Make sure we prevent other events from being propagated (but why?)
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                if (e.cancelBubble) {
                    e.cancelBubble = true;
                }
            });
            // Enter key recognition on our input element
            this._elems.input.addEventListener("keydown", function (ev) {
                if (ev.keyCode === 13 && _this._isModifying) {
                    //this._save();
                }
            });
            // Blur recognition on our input element
            this._elems.input.addEventListener("blur", function () {
                if (_this._isModifying) {
                    _this._save();
                }
            });
        };
        //#endregion
        //#region HANDLE CHANGES TO THE ELEMENT
        /**...........................................................................
         * _save
         * ...........................................................................
         * Save the contents of the Editable
         *
         * @returns True if the editable was successfully saved
         * ...........................................................................
         */
        Editable.prototype._save = function () {
            var validated;
            var content = this._elems.input.value;
            validated = this._validate(content);
            // Update UI / saved data based on whether validation passed
            if (!validated.passed) {
                return this._onValidationFailed(validated.allowLeave);
            }
            else {
                return this._onValidationPassed(content);
            }
        };
        //#endregion
        //#region VALIDATE USER INPUT IN THE ELEMENT
        /**...........................................................................
         * _validate
         * ...........................................................................
         * validate whether the current data in the input field is valid
         *
         * @param	content		Content to validate
         *
         * @returns	Result of the validation
         * ...........................................................................
         */
        Editable.prototype._validate = function (content) {
            var validated;
            // Check if the editable could be validated
            if (this.onValidate) {
                validated = this.onValidate(content);
            }
            else {
                validated = { passed: true };
            }
            return validated;
        };
        /**...........................................................................
         * _onValidationFailed
         * ...........................................................................
         * validation failing for this element
         *
         * @param	allowLeave	True if the user should be able to navigate away
         *
         * @returns	False
         * ...........................................................................
         */
        Editable.prototype._onValidationFailed = function (allowLeave) {
            // Add the error class
            KIP.addClass(this._elems.input, "error");
            // If we won't allow the user to leave, don't
            if (!allowLeave) {
                this._elems.input.select();
                this._elems.input.focus();
            }
            return false;
        };
        /**...........................................................................
         * _onValidationPassed
         * ...........................................................................
         * handle validation passing for this element
         * @param	content		Content to set for the editable
         * @returns	True
         * ...........................................................................
         */
        Editable.prototype._onValidationPassed = function (content) {
            // Remove any error hiliting if we did it
            KIP.removeClass(this._elems.input, "error");
            // Resave our value through our unformat function
            this.value = this.onUnformat(content);
            // Call our update function in order to notify our parent
            if (this.onUpdate) {
                this.onUpdate(this.value);
            }
            // swap the UI back to the display version
            this.base.removeChild(this._elems.input);
            this.base.appendChild(this._elems.display);
            // remove our modifying flag
            this._isModifying = false;
            // update content of the display element
            this._elems.display.innerHTML = content;
            return true;
        };
        //#endregion
        //#region ENABLE THE ELEMENT FOR EDITING
        /**...........................................................................
         * modify
         * ...........................................................................
         * Modifies the Editable element
         *
         * @returns True if we were able to start modifying the element
         * ...........................................................................
         */
        Editable.prototype.modify = function () {
            // Don't start modifying again if we are already modifying
            if (this._isModifying) {
                return false;
            }
            // Set our property to true
            this._isModifying = true;
            // Grab the appropriately formatted string for this element
            this._elems.input.value = this.formatFunc(this.value, true);
            // Update the HTML to have an editable field
            this.base.removeChild(this._elems.display);
            this.base.appendChild(this._elems.input);
            // Select our input
            this._elems.input.select();
            this._elems.input.focus();
            return true;
        };
        /** styles to use for standard Editables */
        Editable._uncoloredStyles = {
            ".editable": {
                fontFamily: "Segoe UI, Calibri, Helvetica",
                fontSize: "1em",
                cursor: "pointer"
            },
            ".editable input": {
                fontFamily: "Segoe UI, Calibri, Helvetica",
                fontSize: "1em",
                backgroundColor: "#eee",
                border: "1px solid #AAA"
            },
            ".editable input:focus": {
                outline: "none"
            },
            ".editable input.error": {
                borderColor: "#C30"
            }
        };
        return Editable;
    }(KIP.Drawable));
    KIP.Editable = Editable;
    ;
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    var SVGProject = /** @class */ (function (_super) {
        __extends(SVGProject, _super);
        function SVGProject(options) {
            var _this = _super.call(this, { id: "project", cls: "project" }) || this;
            _this._projectLines = new KIP.Collection();
            // Initialize options
            var defaults = _this.__generateDefaultOptions();
            KIP.reconcileOptions(options, defaults);
            return _this;
        }
        SVGProject.prototype._createElements = function () { };
        SVGProject.prototype.addProjectLine = function (id, lbl, segments, srcObject) {
            var line;
            // Create the basics of the 
            this._projectLines.addElement(id, line);
            return line;
        };
        SVGProject.prototype.__addSegmentElements = function (segments) {
        };
        SVGProject.prototype.getProjectLine = function (id) {
            var out;
            var pair = this._projectLines.getElement(id);
            if (!pair) {
                return out;
            }
            out = pair.value;
            return out;
        };
        SVGProject.prototype.addProjectMilestone = function (lineID, id, lbl, date, color, srcObject) {
            var milestone;
            return milestone;
        };
        SVGProject.prototype.__generateDefaultOptions = function () {
            var defaults = {
                showTitles: true,
                showHoverBubbles: false
            };
            return defaults;
        };
        return SVGProject;
    }(KIP.Drawable));
    KIP.SVGProject = SVGProject;
})(KIP || (KIP = {}));
///<reference path="drawable.ts" />
var KIP;
(function (KIP) {
    //TODO: finish and export
    var TableDrawable = /** @class */ (function (_super) {
        __extends(TableDrawable, _super);
        function TableDrawable(elemDef) {
            var _this = _super.call(this) || this;
            if (!elemDef) {
                elemDef = {};
            }
            if (!elemDef.type) {
                elemDef.type = "table";
            }
            _this.base = KIP.createElement(elemDef);
            return _this;
        }
        TableDrawable.prototype.addRow = function (elems, idx, colNum) {
            return KIP.addRow(this.base, elems, idx, colNum);
        };
        TableDrawable.prototype._createElements = function () { };
        return TableDrawable;
    }(KIP.Drawable));
})(KIP || (KIP = {}));
///<reference path="../../helpers/html.ts" />
///<reference path="../drawable.ts" />
var KIP;
(function (KIP) {
    //#region INTERFACES
    ;
    //#endregion
    /**...........................................................................
     * @class HTML5Canvas
     * ...........................................................................
     * class that represents a set of tools around the HTML5 canvas
     * @version 1.1
     * ...........................................................................
     */
    var HTML5Canvas = /** @class */ (function (_super) {
        __extends(HTML5Canvas, _super);
        //#endregion
        //#region CONSTRUCTOR
        /**...........................................................................
         * Create a HTML5 canvas element
         *
         * @param	id			Unqiue ID to use for the canvas
         * @param	options		Options to create the canvas with
         * ...........................................................................
         */
        function HTML5Canvas(id, options) {
            var _this = _super.call(this) || this;
            if (id) {
                _this._id = id;
            }
            else {
                _this._id = "canvas";
            }
            // initialize the layers property
            _this._layers = [];
            _this._needsInitialDimensions = true;
            _this._reconcileOptions(options); // Pull in user options
            _this._initializeRectangles(); // Initialize the viewing rectangles
            _this._createElements(); // Create elements
            _this._addEventListeners(); // Add all relevant event listeners
            return _this;
        }
        Object.defineProperty(HTML5Canvas.prototype, "relativeView", {
            get: function () { return this._relativeView; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HTML5Canvas.prototype, "zoomFactor", {
            get: function () { return this._zoomFactor; },
            set: function (zoom) { this._zoomFactor = zoom; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HTML5Canvas.prototype, "needsRedraw", {
            get: function () { return this._needsRedraw; },
            set: function (value) { this._needsRedraw = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HTML5Canvas.prototype, "canvas", {
            /** public getter for canvas element */
            get: function () { return this._elems.base; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HTML5Canvas.prototype, "effectCanvas", {
            /** public getter for effects canvas */
            get: function () { return this._elems.effectCanvas; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HTML5Canvas.prototype, "context", {
            get: function () { return this._context; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HTML5Canvas.prototype, "effectContext", {
            get: function () { return this._effectContext; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HTML5Canvas.prototype, "layers", {
            get: function () { return this._layers; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HTML5Canvas.prototype, "onPreRender", {
            set: function (preRender) { this._onPreRender = preRender; },
            enumerable: true,
            configurable: true
        });
        //#endregion
        //#region HANDLE INITIALIZATION
        /**...........................................................................
         * _reconcileOptions
         * ...........................................................................
         * pull in default options
         *
         * @param	userOptions		The options to reconcile
         * ...........................................................................
         */
        HTML5Canvas.prototype._reconcileOptions = function (userOptions) {
            if (!userOptions) {
                userOptions = {};
            }
            var defaults = this._createDefaultOptions();
            this._options = KIP.reconcileOptions(userOptions, defaults);
        };
        /**...........................................................................
         * _createDefaultOptions
         * ...........................................................................
         * set our default options
         *
         * @returns	The set of default options for canvases
         * ...........................................................................
         */
        HTML5Canvas.prototype._createDefaultOptions = function () {
            var _this = this;
            var defaults = {
                RENDER_RATE: 30,
                ZOOM_DELTA: function () {
                    var out = {
                        x: 0.03 * _this._zoomFactor.x,
                        y: 0.03 * _this._zoomFactor.y
                    };
                    return out;
                },
                SIZE: {
                    width: 600,
                    height: 450
                },
                MAX_ZOOM: {
                    x: 15,
                    y: 15
                },
                MIN_ZOOM: {
                    x: 0.1,
                    y: 0.1
                }
            };
            return defaults;
        };
        /**...........................................................................
         * _initializeRectangles
         * ...........................................................................
         * create the rectangles that the canvas needs to care about
         * ...........................................................................
         */
        HTML5Canvas.prototype._initializeRectangles = function () {
            // ABSOLUTE
            this._absoluteDimensions = {
                x: 0,
                y: 0,
                w: this._options.SIZE.width,
                h: this._options.SIZE.height
            };
            // RELATIVE
            this._relativeView = {
                x: 0,
                y: 0,
                w: this._options.SIZE.width,
                h: this._options.SIZE.height
            };
            // ZOOM SCALE
            this._zoomFactor = {
                x: 1,
                y: 1
            };
        };
        /**...........................................................................
         * _shouldSkipCreateElements
         * ...........................................................................
         * Don't let the constructor create elements
         * ...........................................................................
         */
        HTML5Canvas.prototype._shouldSkipCreateElements = function () { return true; };
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * create the canvas element
         * ...........................................................................
         */
        HTML5Canvas.prototype._createElements = function () {
            // create the canvas elements
            this._elems = {
                base: this._createCanvas(),
                effectCanvas: this._createCanvas(true)
            };
            // create the contexts for each
            this._context = this._elems.base.getContext("2d");
            this._effectContext = this._elems.effectCanvas.getContext("2d");
        };
        /**...........................................................................
         * _createCanvas
         * ...........................................................................
         * create an actual canvas element and assigns it to our element
         *
         * @param 	isForEffects 	If true, creates an effect canvas instead
         *
         * @returns	The canvas that is created
         * ...........................................................................
         */
        HTML5Canvas.prototype._createCanvas = function (isForEffects) {
            var canvas;
            // Create a canvas of the right size
            canvas = document.createElement("canvas");
            canvas.setAttribute("width", this._options.SIZE.width.toString());
            canvas.setAttribute("height", this._options.SIZE.height.toString());
            // give the canvas the right class
            var cls = "canvas";
            if (isForEffects) {
                cls += " effects";
            }
            KIP.addClass(canvas, cls);
            return canvas;
        };
        //#endregion
        //#region DRAWING COMMANDS
        /**...........................................................................
         * draw
         * ...........................................................................
         * draws the canvas element
         *
         * @param	parent	The parent element to draw on
         * ...........................................................................
         */
        HTML5Canvas.prototype.draw = function (parent) {
            _super.prototype.draw.call(this, parent);
            parent.appendChild(this._elems.effectCanvas);
            // flag that we need to redraw instead of calling it directly
            this._needsRedraw = true;
        };
        /**...........................................................................
         * clear
         * ...........................................................................
         * clear the canvases
         * ...........................................................................
         */
        HTML5Canvas.prototype.clear = function () {
            this._context.clearRect(0, 0, this._options.SIZE.width, this._options.SIZE.height);
            this._effectContext.clearRect(0, 0, this._options.SIZE.width, this._options.SIZE.height);
        };
        /**...........................................................................
         * _drawEachElement
         * ...........................................................................
         * loop through every element in the canvas
         * ...........................................................................
         */
        HTML5Canvas.prototype._drawEachElement = function () {
            // first clear the canvas
            this.clear();
            // then loop through each of the layers in order
            var layer;
            for (var _i = 0, _a = this._layers; _i < _a.length; _i++) {
                layer = _a[_i];
                if (!layer) {
                    continue;
                }
                layer.updateDimensions(this._relativeView);
                layer.draw();
            }
        };
        /**...........................................................................
         * _renderFrame
         * ...........................................................................
         * make sure we actually draw something
         * ...........................................................................
         */
        HTML5Canvas.prototype._renderFrame = function () {
            var _this = this;
            // Make sure we only do this kind of stuff if something changed
            if (this._needsRedraw) {
                if (this._onPreRender) {
                    this._onPreRender();
                } // Call pre-render code
                this._drawEachElement(); // actually draw elements
                this._needsRedraw = false; // Set that we no longer need to redraw
            }
            // Add animation listeners
            window.requestAnimationFrame(function () { _this._renderFrame(); });
        };
        //#endregion
        //#region ADD/REMOVE ELEMENTS
        /**...........................................................................
         * addElement
         * ...........................................................................
         * add an element to the canvas
         *
         * @param	elem	The element to add to the canvas
         * ...........................................................................
         */
        HTML5Canvas.prototype.addElement = function (elem) {
            // grab the appropriate layer to add to (or create it if it doesn't yet exist)
            var layer = this._getOrCreateLayer(elem.layer);
            // Add the element to the appropriate layer
            layer.addElement(elem);
            // Update the absolute dimensions
            this._updateAbsoluteDimensionsFromElem(elem.dimensions);
            // Mark that we need to redraw
            this._needsRedraw = true;
        };
        /**...........................................................................
         * removeElement
         * ...........................................................................
         * remove an element from our internal collection
         *
         * @param	id		The id of the element to remove
         *
         * @returns	True if the element was removed
         * ...........................................................................
         */
        HTML5Canvas.prototype.removeElement = function (id) {
            var success;
            // rely on the layers to remove their own elements
            var layer;
            for (var _i = 0, _a = this._layers; _i < _a.length; _i++) {
                layer = _a[_i];
                if (!layer) {
                    continue;
                }
                success = layer.removeElement(id);
                if (success) {
                    break;
                }
            }
            return success;
        };
        /**...........................................................................
         * _updateAbsoluteDimensionsFromElem
         * ...........................................................................
         * Update how big the canvas is based on the elements that exist on the canvas
         *
         * @param	addedDimensions		The dimensions of the element we are adding
         * ...........................................................................
         */
        // TODO: Does this need to exist?
        HTML5Canvas.prototype._updateAbsoluteDimensionsFromElem = function (addedDimensions) {
            // Check for x extrema changes
            if (this._needsInitialDimensions || addedDimensions.x < this._absoluteDimensions.x) {
                this._absoluteDimensions.x = addedDimensions.x;
            }
            if ((addedDimensions.x + addedDimensions.w) > (this._absoluteDimensions.x + this._absoluteDimensions.w)) {
                this._absoluteDimensions.w = ((addedDimensions.x + addedDimensions.w) - this._absoluteDimensions.x);
            }
            // Check for y extrema changes
            if (this._needsInitialDimensions || addedDimensions.y < this._absoluteDimensions.y) {
                this._absoluteDimensions.y = addedDimensions.y;
            }
            if ((addedDimensions.y + addedDimensions.h) > (this._absoluteDimensions.y + this._absoluteDimensions.h)) {
                this._absoluteDimensions.h = ((addedDimensions.y + addedDimensions.h) - this._absoluteDimensions.y);
            }
            this._needsInitialDimensions = false;
        };
        /**...........................................................................
         * _getOrCreateLayer
         * ...........................................................................
         * find the existing layer or create it if it doesn't exist
         *
         * @param	layerIdx	The index of the layer
         *
         * @returns	The group for the layer
         * ...........................................................................
         */
        HTML5Canvas.prototype._getOrCreateLayer = function (layerIdx) {
            var layer = this._layers[layerIdx];
            if (!layer) {
                layer = new KIP.CanvasGroup("layer" + layerIdx);
                this._layers[layerIdx] = layer;
                layer.canvas = this;
            }
            return layer;
        };
        //#endregion
        //#region ZOOM HANDLING
        /**...........................................................................
         * _onMouseWheel
         * ...........................................................................
         * handle the mousewheel event
         *
         * @param	event	The actual event triggered by the mousewheel
         * ...........................................................................
         */
        HTML5Canvas.prototype._onMouseWheel = function (event) {
            var delta = event.wheelDelta;
            delta = (Math.abs(delta) / delta);
            this.zoom(delta);
        };
        /**...........................................................................
         * zoom
         * ...........................................................................
         * actually zoom the canvas an appropriate amount
         *
         * @param	delta	The amount to zoom by
         * ...........................................................................
         */
        HTML5Canvas.prototype.zoom = function (delta) {
            // Get the standard zoom we should be applying
            var zoomDelta = this._options.ZOOM_DELTA();
            // how much has the zoom value changed?
            var zoomXDelta = this._zoomFactor.x + (delta * zoomDelta.x);
            zoomXDelta = KIP.normalizeValue(zoomXDelta, this._options.MIN_ZOOM.x, this._options.MAX_ZOOM.x);
            var zoomYDelta = this._zoomFactor.y + (delta * zoomDelta.y);
            zoomYDelta = KIP.normalizeValue(zoomYDelta, this._options.MIN_ZOOM.y, this._options.MAX_ZOOM.y);
            // The actual width is equal to:
            //	physical dimension * (1 / zoom value)
            var physicalDim = this._options.SIZE;
            var newWidth = KIP.roundToPlace(physicalDim.width * (1 / zoomXDelta), 10);
            this._zoomFactor.x = zoomXDelta;
            var newHeight = KIP.roundToPlace(physicalDim.height * (1 / zoomYDelta), 10);
            this._zoomFactor.y = zoomYDelta;
            // Now calculate how different that is from the current dimensions
            var widthDelta = newWidth - this._relativeView.w;
            var heightDelta = newHeight - this._relativeView.h;
            // Create the new view based on the appropriate deltas
            var newView = {
                x: this._relativeView.x - (widthDelta / 2),
                y: this._relativeView.y - (heightDelta / 2),
                w: this._relativeView.w + widthDelta,
                h: this._relativeView.h + heightDelta
            };
            this._relativeView = newView;
            this._needsRedraw = true;
        };
        /**...........................................................................
         * changeView
         * ...........................................................................
         * update the view being displayed on the canvas
         *
         * @param	newDisplay	The dimensions of the new view
         * ...........................................................................
         */
        HTML5Canvas.prototype.changeView = function (newDisplay) {
            this._relativeView = newDisplay;
        };
        //#endregion
        //#region PAN HANDLING
        /**...........................................................................
         * _onDrag
         * ...........................................................................
         * move the canvas around via a mouse drag
         *
         * @param	delta	The amount the mouse has dragged
         * ...........................................................................
         */
        HTML5Canvas.prototype._onDrag = function (delta) {
            if (!delta) {
                return;
            }
            var newCorner = this._calculateNewCornerFromDelta(delta);
            this.pan(newCorner);
        };
        /**...........................................................................
         * _calculateNewCornerFromDelta
         * ...........................................................................
         * take zoom into account when calculating the new corner of the canvas
         *
         * @param	delta	The amount that has been dragged
         *
         * @returns	The new corner for the canvas
         * ...........................................................................
         */
        HTML5Canvas.prototype._calculateNewCornerFromDelta = function (delta) {
            var newCorner = {
                x: this._relativeView.x - (delta.x / this._zoomFactor.x),
                y: this._relativeView.y - (delta.y / this._zoomFactor.y)
            };
            return newCorner;
        };
        /**...........................................................................
         * pan
         * ...........................................................................
         * handle a pan event
         *
         * @param	cornerPoint		The new corner for the canvas
         * ...........................................................................
         */
        HTML5Canvas.prototype.pan = function (cornerPoint) {
            this._relativeView.x = cornerPoint.x;
            this._relativeView.y = cornerPoint.y;
            this._needsRedraw = true;
        };
        //#endregion
        //#region EVENT HANDLING
        /**...........................................................................
         * _addEventListeners
         * ...........................................................................
         * add all event listeners for the canvas itself
         * ...........................................................................
         */
        HTML5Canvas.prototype._addEventListeners = function () {
            var _this = this;
            // Add zoom listeners
            window.addEventListener("mousewheel", function (event) {
                _this._onMouseWheel(event);
            });
            // Add pan listeners
            window.addEventListener("mousedown", function (event) {
                _this._elems.base.style.cursor = "-webkit-grabbing";
                _this._startDragPoint = {
                    x: event.screenX,
                    y: event.screenY
                };
            });
            window.addEventListener("mousemove", function (event) {
                if (!_this._startDragPoint) {
                    return;
                }
                _this._deltaDragPoint = {
                    x: event.screenX - _this._startDragPoint.x,
                    y: event.screenY - _this._startDragPoint.y
                };
                _this._startDragPoint = {
                    x: event.screenX,
                    y: event.screenY
                };
                _this._onDrag(_this._deltaDragPoint);
            });
            window.addEventListener("mouseup", function () {
                _this._startDragPoint = null;
                _this._deltaDragPoint = {
                    x: 0,
                    y: 0
                };
                _this._elems.base.style.cursor = "-webkit-grab";
            });
            this._elems.base.addEventListener("click", function (e) {
                var pt = {
                    x: e.pageX,
                    y: e.pageY
                };
                _this._onClick(e, pt);
            });
            this._elems.base.addEventListener("mousemove", function (e) {
                var pt = {
                    x: e.pageX,
                    y: e.pageY
                };
                _this._onHover(e, pt);
            });
            // Add animation listeners
            window.requestAnimationFrame(function () {
                _this._renderFrame();
            });
        };
        /**...........................................................................
         * _onClick
         * ...........................................................................
         * handle clicks on the canvas
         *
         * @param	e		The event itself of the mouse click
         * @param	point	The point that was clicked
         * ...........................................................................
         */
        HTML5Canvas.prototype._onClick = function (e, point) {
            this._handleEvent(KIP.EventTypeEnum.CLICK, point, e);
        };
        /**...........................................................................
         * _onHover
         * ...........................................................................
         * handle hovering over elements on the canvas
         *
         * @param	e		The actual mouseover event
         * @param	point	The point that's being hovered over
         * ...........................................................................
         */
        HTML5Canvas.prototype._onHover = function (e, point) {
            this._handleEvent(KIP.EventTypeEnum.HOVER, point, e);
        };
        /**...........................................................................
         * _handleEvent
         * ...........................................................................
         * handle a general event
         *
         * @param	eventType	The type of event being handled
         * @param	point		The point this event applies to
         * @param	e			The actual event data
         * ...........................................................................
         */
        HTML5Canvas.prototype._handleEvent = function (eventType, point, e) {
            //let relativePt: IPoint = this.convertPhysicalPointToRelativePoint(point);
            var layer;
            for (var _i = 0, _a = this._layers; _i < _a.length; _i++) {
                layer = _a[_i];
                if (!layer) {
                    continue;
                }
                layer.handleEvent(eventType, point, e);
            }
        };
        //#endregion
        //#region POINT CONVERSION FUNCTIONS
        /**...........................................................................
         * convertRelativePointToAbsolutePoint
         * ...........................................................................
         * convert a point from our relative canvas frame (e.g. visible frame) and
         * the physical space
         *
         * @param	relativePt	The point to convert
         *
         * @returns	The converted point
         * ...........................................................................
         */
        HTML5Canvas.prototype.convertRelativePointToPhysicalPoint = function (relativePt) {
            var out;
            // Grab dimensions of the canvas
            // TODO: make more versatile
            var canvasLeft = this._elems.base.offsetLeft;
            var canvasTop = this._elems.base.offsetTop;
            var canvasWidth = this._elems.base.offsetWidth;
            var canvasHeight = this._elems.base.offsetHeight;
            var x = (((relativePt.x - this._relativeView.x) * canvasWidth) / this._relativeView.w) + canvasLeft;
            var y = (((relativePt.y - this._relativeView.y) * canvasHeight) / this._relativeView.h) + canvasTop;
            out = {
                x: x,
                y: y
            };
            return out;
        };
        /**...........................................................................
         * convertPhysicalPointToRelativePoint
         * ...........................................................................
         * convert a physical point to one within the visible canvas frame
         *
         * @param	physicalPt	The point to convert
         *
         * @returns	The converted relative point
         * ...........................................................................
         */
        HTML5Canvas.prototype.convertPhysicalPointToRelativePoint = function (physicalPt) {
            var out;
            // Grab dimensions of the canvas
            // TODO: make more versatile
            var canvasLeft = this._elems.base.offsetLeft;
            var canvasTop = this._elems.base.offsetTop;
            var canvasWidth = this._elems.base.offsetWidth;
            var canvasHeight = this._elems.base.offsetHeight;
            // convert each aspect of the point
            var x = (((physicalPt.x - canvasLeft) * this._relativeView.w) / canvasWidth) + this._relativeView.x;
            var y = (((physicalPt.y - canvasTop) * this._relativeView.h) / canvasHeight) + this._relativeView.y;
            out = {
                x: x,
                y: y
            };
            return out;
        };
        /**...........................................................................
         * convertAbsolutePointToRelativePoint
         * ...........................................................................
         * convert a point from absolute position to a visible point
         * ...........................................................................
         */
        HTML5Canvas.prototype.convertAbsolutePointToRelativePoint = function (absolutePt) {
            var out;
            // absolute position may exist outside of vsiible rect, but will be visible at some point in the canvas
            out = {
                x: KIP.roundToPlace((absolutePt.x - this._relativeView.x) * this._zoomFactor.x, 10),
                y: KIP.roundToPlace((absolutePt.y - this._relativeView.y) * this._zoomFactor.y, 10)
            };
            return out;
        };
        /**...........................................................................
         * convertRelativePointToAbsolutePoint
         * ...........................................................................
         * convert a point from a visible point to an absolute point
         *
         * @param	relativePt	The point in relative dimensions
         *
         * @returns	THe converted absolute point
         * ...........................................................................
         */
        HTML5Canvas.prototype.convertRelativePointToAbsolutePoint = function (relativePt) {
            var out;
            out = {
                x: KIP.roundToPlace(((relativePt.x / this._zoomFactor.x) + this._relativeView.x), 10),
                y: KIP.roundToPlace(((relativePt.y / this._zoomFactor.y) + this._relativeView.y), 10)
            };
            return out;
        };
        /**...........................................................................
         * convertAbsoluteRectToRelativeRect
         * ...........................................................................
         * Turn a set of absolute dimensions to their relative counterpart
         *
         * @param 	absoluteRect 	The absolute rect to convert to relative dimensions
         *
         * @returns	The converted rectangle
         * ...........................................................................
         */
        HTML5Canvas.prototype.convertAbsoluteRectToRelativeRect = function (absoluteRect) {
            // calculate the top left corner
            var leftTopCorner = {
                x: absoluteRect.x,
                y: absoluteRect.y
            };
            var relLeftTopCorner = this.convertAbsolutePointToRelativePoint(leftTopCorner);
            // calculate the bottom-right corner
            var rightBottomCorner = {
                x: absoluteRect.x + absoluteRect.w,
                y: absoluteRect.y + absoluteRect.h
            };
            var relRightBottomCorner = this.convertAbsolutePointToRelativePoint(rightBottomCorner);
            // return a rect based on the corners we calculated
            return {
                x: relLeftTopCorner.x,
                y: relLeftTopCorner.y,
                w: relRightBottomCorner.x - relLeftTopCorner.x,
                h: relRightBottomCorner.y - relLeftTopCorner.y
            };
        };
        //#endregion
        //#region HELPERS
        /**...........................................................................
         * debugRelativeDimensions
         * ...........................................................................
         * debug the current view of the canvas
         * ...........................................................................
         */
        HTML5Canvas.prototype.debugRelativeDimensions = function () {
            console.log("CANVAS DIMENSIONS:");
            console.log(Math.round(this.relativeView.x) + ", " + Math.round(this.relativeView.y));
            console.log(Math.round(this.relativeView.w) + " x " + Math.round(this.relativeView.h));
        };
        return HTML5Canvas;
    }(KIP.Drawable));
    KIP.HTML5Canvas = HTML5Canvas;
})(KIP || (KIP = {}));
///<reference path="canvas.ts" />
var KIP;
(function (KIP) {
    /**...........................................................................
     * ElementType
     * ...........................................................................
     * The type of element we're drawing
     * ...........................................................................
     */
    var ElementType;
    (function (ElementType) {
        ElementType[ElementType["Rectangle"] = 0] = "Rectangle";
        ElementType[ElementType["Text"] = 1] = "Text";
        ElementType[ElementType["Circle"] = 2] = "Circle";
        ElementType[ElementType["Path"] = 3] = "Path";
        ElementType[ElementType["Group"] = 4] = "Group";
    })(ElementType = KIP.ElementType || (KIP.ElementType = {}));
    /**...........................................................................
     * EventTypeEnum
     * ...........................................................................
     * Handle all of the events we might need
     * ...........................................................................
     */
    var EventTypeEnum;
    (function (EventTypeEnum) {
        EventTypeEnum[EventTypeEnum["CLICK"] = 0] = "CLICK";
        EventTypeEnum[EventTypeEnum["HOVER"] = 1] = "HOVER";
        EventTypeEnum[EventTypeEnum["LEAVE"] = 2] = "LEAVE";
        EventTypeEnum[EventTypeEnum["R_CLICK"] = 3] = "R_CLICK";
        EventTypeEnum[EventTypeEnum["DBL_CLICK"] = 4] = "DBL_CLICK";
        EventTypeEnum[EventTypeEnum["KEY_PRESS"] = 5] = "KEY_PRESS";
        EventTypeEnum[EventTypeEnum["FOCUS"] = 6] = "FOCUS";
        EventTypeEnum[EventTypeEnum["BLUR"] = 7] = "BLUR";
    })(EventTypeEnum = KIP.EventTypeEnum || (KIP.EventTypeEnum = {}));
    ;
    /**...........................................................................
     * @class CanvasElement
     * ...........................................................................
     * create a canvas element
     * @version 1.1
     * @author	Kip Price
     * ...........................................................................
     */
    var CanvasElement = /** @class */ (function () {
        //#endregion
        /**...........................................................................
         * create a canvas element
         *
         * @param	id			The unique ID for this
         * @param 	isEffect 	If true, treats this element as an effect
         * ...........................................................................
         */
        function CanvasElement(id, isEffect) {
            /** layer at which the element should appear. Defaults to 1 */
            this._layer = 1;
            this._id = id;
            this._isEffect = isEffect;
            this._eventFunctions = [];
            this._style = new KIP.CanvasElementStyle();
        }
        Object.defineProperty(CanvasElement.prototype, "id", {
            get: function () { return this._id; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasElement.prototype, "canvas", {
            set: function (canvas) { this._setCanvas(canvas); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasElement.prototype, "parent", {
            set: function (grp) { this._parent = grp; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasElement.prototype, "style", {
            get: function () { return this._style; },
            set: function (s) { this._style = s; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasElement.prototype, "layer", {
            get: function () { return this._layer; },
            set: function (layer) { this._layer = layer; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasElement.prototype, "isOffScreen", {
            get: function () { return this._isOffScreen; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasElement.prototype, "dimensions", {
            get: function () { return this._dimensions; },
            set: function (dim) { this._setDimensions(dim); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasElement.prototype, "displayDimensions", {
            get: function () { return this._displayDimensions; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasElement.prototype, "isHoverTarget", {
            get: function () { return this._isHoverTarget; },
            set: function (value) { this._isHoverTarget = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasElement.prototype, "isHidden", {
            get: function () { return this._isHidden; },
            enumerable: true,
            configurable: true
        });
        /**...........................................................................
         * _initializeRects
         * ...........................................................................
         * create the initial display rectangle
         * ...........................................................................
         */
        CanvasElement.prototype._initializeRects = function () {
            this._displayDimensions = {
                x: this._dimensions.x,
                y: this._dimensions.y,
                w: this._dimensions.w,
                h: this._dimensions.h
            };
        };
        /**...........................................................................
         * _applyStyle
         * ...........................................................................
         * update the context to use this element's style
         *
         * @param	context		The Canvas context to draw on
         * ...........................................................................
         */
        CanvasElement.prototype._applyStyle = function (context) {
            this._style.setStyle(context);
        };
        /**...........................................................................
         * _restoreStyle
         * ...........................................................................
         * set the context style back to what it originally was
         *
         * @param	context
         * ...........................................................................
         */
        CanvasElement.prototype._restoreStyle = function (context) {
            this._style.restoreStyle(context);
        };
        /**...........................................................................
         * transform
         * ...........................................................................
         * handle a temporary transform for the element
         *
         * @param 	transformDetails
         * ...........................................................................
         */
        CanvasElement.prototype.transform = function (transformDetails) {
            // we need a canvas object to have been assigned
            if (!this._parent) {
                return;
            }
            // create a clone of this element
            var clone = this._cloneForEffect(this.id + "|e");
            clone._isEffect = true;
            clone._layer = this._layer;
            clone.style = this._cloneStyle();
            // apply the appropriate transformations to that element
            if (transformDetails.color) {
                clone._style.fillColor = transformDetails.color;
            }
            // apply the scale transformation
            if (transformDetails.scale) {
                clone._scale(transformDetails.scale);
            }
            // add the cloned element to the same layer we're on
            this._parent.addElement(clone);
        };
        /**...........................................................................
         * _cloneStyle
         * ...........................................................................
         * copy style from one elem for use in another
         *
         * @returns
         * ...........................................................................
         */
        CanvasElement.prototype._cloneStyle = function () {
            return new KIP.CanvasElementStyle(this._style);
        };
        /**...........................................................................
         * _scale
         * ...........................................................................
         * standard scale algorithm
         * @param	scaleAmt
         * ...........................................................................
         * */
        CanvasElement.prototype._scale = function (scaleAmt) {
            // This is only allowed for effect elements
            if (!this._isEffect) {
                return;
            }
            // calculate the width offset and value
            var newWidth = scaleAmt * this._dimensions.w;
            var xOffset = (newWidth - this._dimensions.w) / 2;
            // calculate the height offset and value
            var newHeight = scaleAmt * this._dimensions.h;
            var yOffset = (newHeight - this._dimensions.h) / 2;
            // update the dimensions to be appropriate for this scaling element
            this._dimensions = {
                x: this._dimensions.x - xOffset,
                y: this._dimensions.y - yOffset,
                w: newWidth,
                h: newHeight
            };
        };
        /**...........................................................................
         * updateDimensions
         * ...........................................................................
         * update the internal dimensions of the element
         * @param	canvasDimensions
         * ...........................................................................
         */
        CanvasElement.prototype.updateDimensions = function (canvasDimensions) {
            this._displayDimensions = this._canvas.convertAbsoluteRectToRelativeRect(this._dimensions);
            // Update our tracking variable to determine whether 
            // we should be showing this element
            this._setIsOffScreen(canvasDimensions);
        };
        /**...........................................................................
         * adjustDimensions
         * ...........................................................................
         * shift the dimensions of the element based on the reference point
         * @param	adjustPt
         * ...........................................................................
         * */
        CanvasElement.prototype.adjustDimensions = function (adjustPt) {
            if (this._isEffect) {
                return;
            }
            this._dimensions.x += adjustPt.x;
            this._dimensions.y += adjustPt.y;
        };
        /**...........................................................................
         * draw
         * ...........................................................................
         * abstract method that each child element will implement
         * ...........................................................................
         */
        CanvasElement.prototype.draw = function () {
            // Don't do anything if we're offscreen or don't have a canvas
            if (this._isOffScreen) {
                return;
            }
            if (!this._canvas) {
                return;
            }
            if (this._isHidden) {
                return;
            }
            // Get the context from the canvas, as appropriate for this particular element
            var context;
            if (!this._isEffect) {
                context = this._canvas.context;
            }
            else {
                context = this._canvas.effectContext;
            }
            this._applyStyle(context); // Set the appropriate style
            this._onDraw(context); // Call on the child class to draw their specific stuff
            this._restoreStyle(context); // Restore original style
            this._isDrawn = true;
        };
        /**...........................................................................
         * _setIsOffScreen
         * ...........................................................................
         * determine whether this element is off screen
         * @param	canvasDimensions
         * ...........................................................................
         * */
        CanvasElement.prototype._setIsOffScreen = function (canvasDimensions) {
            this._isOffScreen = !KIP.Trig.doBasicRectsOverlap(canvasDimensions, this._dimensions);
        };
        /**...........................................................................
         * _setDimensions
         * ...........................................................................
         * allow outsiders to update the internal set of dimensions for this element
         * @param	dim
         * ...........................................................................
         */
        CanvasElement.prototype._setDimensions = function (dim) {
            this._dimensions = dim;
            if (this._canvas) {
                this._canvas.needsRedraw = true;
            }
        };
        /**...........................................................................
         * _setCanvas
         * ...........................................................................
         * Set our internal canvas
         * @param canvas
         * ...........................................................................
         */
        CanvasElement.prototype._setCanvas = function (canvas) {
            this._canvas = canvas;
        };
        //#endregion
        //#region EVENT HANDLING FOR CANVAS ELEMENTS
        /** collect event listeners */
        CanvasElement.prototype.addEventListener = function (eventType, eventFunc) {
            var list = this._eventFunctions[eventType];
            if (!list) {
                list = [];
                this._eventFunctions[eventType] = list;
            }
            list.push(eventFunc);
        };
        /** handle click events */
        CanvasElement.prototype.click = function (pt, e) {
            this.handleEvent(EventTypeEnum.CLICK, pt, e);
        };
        /** handle double clicks */
        CanvasElement.prototype.doubleClick = function (pt, e) {
            this.handleEvent(EventTypeEnum.DBL_CLICK, pt, e);
        };
        /** handle the right click */
        CanvasElement.prototype.rightClick = function (pt, e) {
            this.handleEvent(EventTypeEnum.R_CLICK, pt, e);
        };
        /** handle when the mouse enters the element */
        CanvasElement.prototype.hover = function (pt, e) {
            this.handleEvent(EventTypeEnum.HOVER, pt, e);
        };
        /** handle when the mouse leaves the element */
        CanvasElement.prototype.leave = function (pt, e) {
            this.handleEvent(EventTypeEnum.LEAVE, pt, e);
        };
        /** handle the keypress event */
        CanvasElement.prototype.keyPress = function (pt, e) {
            this.handleEvent(EventTypeEnum.KEY_PRESS, pt, e);
        };
        /** handle the focus event */
        CanvasElement.prototype.focus = function (pt, e) {
            this.handleEvent(EventTypeEnum.FOCUS, pt, e);
        };
        /** handle the blur event */
        CanvasElement.prototype.blur = function (pt, e) {
            this.handleEvent(EventTypeEnum.BLUR, pt, e);
        };
        /**...........................................................................
         * handleEvent
         * ...........................................................................
         * generic handler for all events
         * ...........................................................................
         */
        CanvasElement.prototype.handleEvent = function (eventType, pt, e) {
            // Make sure we apply properties regardless of whether there are additional handlers
            if ((eventType === EventTypeEnum.BLUR) || (eventType === EventTypeEnum.LEAVE)) {
                if (this._parent) {
                    this._parent.removeElement(this.id + "|e");
                }
                this._isHoverTarget = false;
            }
            else if (eventType === EventTypeEnum.HOVER) {
                this._isHoverTarget = true;
            }
            // Add the event to the list
            var list = this._eventFunctions[eventType];
            if (!list) {
                return;
            }
            // handle all of the callbacks
            var func;
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                func = list_1[_i];
                func(pt, e);
            }
            // If we have a canvas, tell it to redraw
            if (!this._canvas) {
                this._canvas.needsRedraw = true;
            }
        };
        //#endregion
        //#region HIDE AND SHOW THE ELEMENT
        /**...........................................................................
         * swapVisibilty
         * ...........................................................................
         * Change whether this element is hidden or shown
         * ...........................................................................
         */
        CanvasElement.prototype.swapVisibility = function () {
            if (this._isHidden) {
                this.show();
            }
            else {
                this.hide();
            }
        };
        /**...........................................................................
         * hide
         * ...........................................................................
         * Hide this element
         * ...........................................................................
         */
        CanvasElement.prototype.hide = function () {
            if (this._isHidden) {
                return;
            }
            this._isHidden = true;
            this._canvas.needsRedraw = true;
        };
        /**...........................................................................
         * show
         * ...........................................................................
         * Show this element if it was hidden
         * ...........................................................................
         */
        CanvasElement.prototype.show = function () {
            if (!this._isHidden) {
                return;
            }
            this._isHidden = false;
            this._canvas.needsRedraw = true;
        };
        //#endregion
        //#region DEBUGGING FUNCTIONS
        /**...........................................................................
         * _debugDimensions
         * ...........................................................................
         * display dimensions for debugging purposes
         * ...........................................................................
         */
        CanvasElement.prototype._debugDimensions = function () {
            console.log("CANVAS ELEM: " + this._id);
            console.log("x: " + Math.round(this._displayDimensions.x) + " (from " + this._dimensions.x + ")");
            console.log("y: " + Math.round(this._displayDimensions.y) + " (from " + this._dimensions.y + ")");
            console.log("w: " + Math.round(this._displayDimensions.w) + " (from " + this._dimensions.w + ")");
            console.log("h: " + Math.round(this._displayDimensions.h) + " (from " + this._dimensions.h + ")");
            console.log("\nparent: " + (this._parent ? this._parent.id : "none"));
            console.log("===\n");
            if (this._canvas) {
                this._canvas.debugRelativeDimensions();
            }
            console.log("offscreen? " + this._isOffScreen);
            console.log("--------------------\n\n");
        };
        /**...........................................................................
         * debugDimensions
         * ...........................................................................
         * public function for debugging purposes
         * ...........................................................................
         */
        CanvasElement.prototype.debugDimensions = function () {
            this._debugDimensions();
        };
        return CanvasElement;
    }());
    KIP.CanvasElement = CanvasElement;
})(KIP || (KIP = {}));
///<reference path="canvasElement.ts" />
var KIP;
(function (KIP) {
    /** class that stores collections of other canvas elements */
    var CanvasGroup = /** @class */ (function (_super) {
        __extends(CanvasGroup, _super);
        //#endregion
        /**...........................................................................
         * create a group element that joins other elements together
         *
         * @param	id			The unique ID for the element
         * @param	refPoint	The reference point to use
         * ...........................................................................
         */
        function CanvasGroup(id, refPoint) {
            var _this = _super.call(this, id) || this;
            /** if true, scales with the rest of the canvas */
            _this._respondToScale = false;
            _this._elements = new KIP.Collection();
            if (refPoint) {
                _this._referencePoint = {
                    x: refPoint.x,
                    y: refPoint.y
                };
            }
            else {
                _this._referencePoint = {
                    x: 0,
                    y: 0
                };
            }
            _this._initializeRects();
            return _this;
        }
        Object.defineProperty(CanvasGroup.prototype, "type", {
            /** the type of element this is */
            get: function () { return KIP.ElementType.Group; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasGroup.prototype, "referencePoint", {
            set: function (refPt) {
                this.adjustDimensions({
                    x: (refPt.x - this._referencePoint.x),
                    y: (refPt.y - this._referencePoint.y)
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasGroup.prototype, "isHoverTarget", {
            /**...........................................................................
             * isHoverTarget
             * ...........................................................................
             * groups handle whether they are a hover target a little differently
             *
             * @returns	True if this element is a target for hover
             * ...........................................................................
             */
            get: function () {
                var isHoverTarget = false;
                this._elements.map(function (elem) {
                    if (elem.isHoverTarget) {
                        isHoverTarget = true;
                        return;
                    }
                });
                return isHoverTarget;
            },
            enumerable: true,
            configurable: true
        });
        /**...........................................................................
         * _initializeRects
         * ...........................................................................
         * handle the initial rects needed by the group
         * ...........................................................................
         */
        CanvasGroup.prototype._initializeRects = function () {
            this._dimensions = {
                x: this._referencePoint.x,
                y: this._referencePoint.y,
                w: 0,
                h: 0
            };
            this._needsInitialDimensions = true;
            _super.prototype._initializeRects.call(this);
        };
        /**...........................................................................
         * _onDraw
         * ...........................................................................
         * handle drawing the group
         *
         * @param	context		The context upon which to draw this element
         * ...........................................................................
         */
        CanvasGroup.prototype._onDraw = function (context) {
            // draw the elements relative to the group
            this._elements.map(function (elem) {
                elem.draw();
            });
        };
        /**...........................................................................
         * updateDimensions
         * ...........................................................................
         * update the space occupied by this group
         *
         * @param	visibleWindow	The visible view into the canvas
         * ...........................................................................
         */
        CanvasGroup.prototype.updateDimensions = function (visibleWindow) {
            _super.prototype.updateDimensions.call(this, visibleWindow);
            // No need to update if elems will be offscreen
            if (this._isOffScreen) {
                return;
            }
            // Add to each of the elements
            var elem;
            this._elements.map(function (elem) {
                elem.updateDimensions(visibleWindow);
            });
        };
        /**...........................................................................
         * addElement
         * ...........................................................................
         * add an element to this group
         *
         * @param	The element to add to the group
         * ...........................................................................
         */
        CanvasGroup.prototype.addElement = function (elem) {
            // Make sure each element is appropriately shifted
            elem.adjustDimensions(this._referencePoint);
            // Add the element to our internal array, and ensure it has a way to get back to us
            this._elements.addElement(elem.id, elem);
            elem.parent = this;
            // If we have a canvas assigned, also add it to this element
            if (this._canvas) {
                elem.canvas = this._canvas;
                this._canvas.needsRedraw = true;
            }
            // make sure we know how big this group is
            this._updateInternalDimensionsFromElement(elem);
        };
        /**...........................................................................
         * _updateInternalDinensionsFromElement
         * ...........................................................................
         * make sure our internal dimensions match what our elements
         *
         * @param	elem	THe element we're adding to update dimensions for
         * ...........................................................................
         */
        CanvasGroup.prototype._updateInternalDimensionsFromElement = function (elem) {
            var relDim = {
                x: this._dimensions.x,
                y: this._dimensions.y,
                w: this._dimensions.w,
                h: this._dimensions.h
            };
            // Check if x extrema need updated
            if (elem.dimensions.x < relDim.x) {
                relDim.x = elem.dimensions.x;
            }
            if ((elem.dimensions.x + elem.dimensions.w) > (relDim.x + relDim.w)) {
                relDim.w = ((elem.dimensions.x + elem.dimensions.w) - relDim.x);
            }
            // Check if y extrema need updated
            if (elem.dimensions.y < relDim.y) {
                relDim.y = elem.dimensions.y;
            }
            if ((elem.dimensions.y + elem.dimensions.h) > (relDim.y + relDim.h)) {
                relDim.h = ((elem.dimensions.y + elem.dimensions.h) - relDim.y);
            }
            // Update the real dimensions
            this._dimensions = {
                x: relDim.x,
                y: relDim.y,
                w: relDim.w,
                h: relDim.h
            };
            // Don't set these dimensions as default again
            this._needsInitialDimensions = false;
        };
        /**...........................................................................
         * handleEvent
         * ...........................................................................
         * groups need some special handling since they need to pass on their events
         *
         * @param	eventType
         * @param	pt			The point
         * @param	e			The actual event we are handling
         * ...........................................................................
         */
        CanvasGroup.prototype.handleEvent = function (eventType, pt, e) {
            // Run any event-handling that directly applies to me
            _super.prototype.handleEvent.call(this, eventType, pt, e);
            // Quit if there's no point specified
            if (!pt) {
                return;
            }
            // clear any hover effects that may be happening
            if ((eventType === KIP.EventTypeEnum.LEAVE) || (eventType === KIP.EventTypeEnum.HOVER)) {
                this._clearHover(pt, e);
            }
            // Find the affected elements
            var elems = this._findElementsAtPoint(pt);
            // Loop through affected elements to apply the event to them
            var elem;
            for (var _i = 0, elems_1 = elems; _i < elems_1.length; _i++) {
                elem = elems_1[_i];
                elem.handleEvent(eventType, pt, e);
            }
            // TODO: apply a group event to all child elements
        };
        /**...........................................................................
         * _clearHover
         * ...........................................................................
         * clear hover styles that may have been applied already
         * ...........................................................................
         */
        CanvasGroup.prototype._clearHover = function (relativePoint, e) {
            // loop through all of our elements and apply the unhover class
            this._elements.map(function (el) {
                if (!el.isHoverTarget) {
                    return;
                }
                el.leave(relativePoint, e);
            });
        };
        /** find the elements that are located at the provided point */
        CanvasGroup.prototype._findElementsAtPoint = function (pt) {
            var out = [];
            this._elements.map(function (elem) {
                if (elem.isOffScreen) {
                    return;
                }
                // if the point is contained, consider it an 
                if (!KIP.Trig.isPointContained(pt, elem.displayDimensions)) {
                    return;
                }
                // If the event happened at this element, add it to the array
                out.push(elem);
            });
            return out;
        };
        /** remove elements from layers */
        CanvasGroup.prototype.removeElement = function (id) {
            var tmp = this._elements.removeElement(id);
            if (!tmp) {
                return false;
            }
            this._canvas.needsRedraw = true;
            return true;
        };
        // cloning a group requires cloning its innards
        CanvasGroup.prototype._cloneForEffect = function (id) {
            var refPt = KIP.clonePoint(this._referencePoint);
            var clonedGrp = new CanvasGroup(id);
            // Loop through children & clone
            this._elements.map(function (elem) {
                var clone = elem._cloneForEffect(elem.id + "|e");
                clonedGrp.addElement(clone);
            });
            return clonedGrp;
        };
        /**...........................................................................
         * _scale
         * ...........................................................................
         * groups scale by each of their parts scaling
         *
         * @param	scaleAmt	The amount to scale by
         * ...........................................................................
         */
        CanvasGroup.prototype._scale = function (scaleAmt) {
            if (!this._isEffect) {
                return;
            }
            this._elements.map(function (elem) {
                elem._scale(scaleAmt);
            });
            return;
        };
        /**...........................................................................
         * adjustDimensions
         * ...........................................................................
         * adjust the dimensions of this group + its children
         *
         * @param	adjustPt	The point we're adjusting to
         * ...........................................................................
         */
        CanvasGroup.prototype.adjustDimensions = function (adjustPt) {
            _super.prototype.adjustDimensions.call(this, adjustPt);
            this._referencePoint.x += adjustPt.x;
            this._referencePoint.y += adjustPt.y;
            this._elements.map(function (elem) {
                elem.adjustDimensions(adjustPt);
            });
        };
        /**...........................................................................
         * _setCanvas
         * ...........................................................................
         * Set our internal canvas
         *
         * @param 	canvas	The canvas to set internally
         * ...........................................................................
         */
        CanvasGroup.prototype._setCanvas = function (canvas) {
            var _this = this;
            _super.prototype._setCanvas.call(this, canvas);
            this._elements.map(function (elem) {
                elem.canvas = _this._canvas;
                _this._updateInternalDimensionsFromElement(elem);
            });
        };
        return CanvasGroup;
    }(KIP.CanvasElement));
    KIP.CanvasGroup = CanvasGroup;
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    var StyleChangeEnum;
    (function (StyleChangeEnum) {
        StyleChangeEnum[StyleChangeEnum["FILL_COLOR"] = 0] = "FILL_COLOR";
        StyleChangeEnum[StyleChangeEnum["STROKE_COLOR"] = 1] = "STROKE_COLOR";
        StyleChangeEnum[StyleChangeEnum["FONT_FAMILY"] = 2] = "FONT_FAMILY";
        StyleChangeEnum[StyleChangeEnum["FONT_VARIANT"] = 3] = "FONT_VARIANT";
        StyleChangeEnum[StyleChangeEnum["FONT_SIZE"] = 4] = "FONT_SIZE";
        StyleChangeEnum[StyleChangeEnum["STROKE_SIZE"] = 5] = "STROKE_SIZE";
        StyleChangeEnum[StyleChangeEnum["TEXT_ALIGN"] = 6] = "TEXT_ALIGN";
        StyleChangeEnum[StyleChangeEnum["FONT"] = 7] = "FONT";
    })(StyleChangeEnum = KIP.StyleChangeEnum || (KIP.StyleChangeEnum = {}));
    ;
    var CanvasElementStyle = /** @class */ (function () {
        /** nothing to construct */
        function CanvasElementStyle(style) {
            this._listeners = [];
            // clone the existing style
            if (style) {
                this._fillColor = style.fillColor;
                this._strokeColor = style.strokeColor;
                this._font = style.font;
                this._fontFamily = style.fontFamily;
                this._fontSize = style.fontSize;
                this._fontVariant = style.fontVariant;
                this._strokeSize = style.strokeSize;
                this._textAlign = style.textAlign;
                // or just use defaults
            }
            else {
                this._fillColor = "#000";
                this._strokeColor = "#000";
                this._strokeSize = 1;
                this._fontFamily = "Helvetica";
                this._fontSize = 40;
                this._textAlign = "left";
            }
        }
        Object.defineProperty(CanvasElementStyle.prototype, "fillColor", {
            get: function () { return this._fillColor; },
            set: function (color) {
                this._fillColor = color;
                this._onChange(StyleChangeEnum.FILL_COLOR);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasElementStyle.prototype, "strokeColor", {
            get: function () { return this._strokeColor; },
            set: function (color) {
                this._strokeColor = color;
                this._onChange(StyleChangeEnum.STROKE_COLOR);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasElementStyle.prototype, "fontFamily", {
            get: function () { return this._fontFamily; },
            set: function (family) {
                this._fontFamily = family;
                this._onChange(StyleChangeEnum.FONT_FAMILY);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasElementStyle.prototype, "fontVariant", {
            get: function () { return this._fontVariant; },
            set: function (variant) {
                this._fontVariant = variant;
                this._onChange(StyleChangeEnum.FONT_VARIANT);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasElementStyle.prototype, "fontSize", {
            get: function () { return this._fontSize; },
            set: function (size) {
                this._fontSize = size;
                this._onChange(StyleChangeEnum.FONT_SIZE);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasElementStyle.prototype, "strokeSize", {
            get: function () { return this._strokeSize; },
            set: function (size) {
                this._strokeSize = size;
                this._onChange(StyleChangeEnum.STROKE_SIZE);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasElementStyle.prototype, "textAlign", {
            get: function () { return this._textAlign; },
            set: function (align) {
                this._textAlign = align;
                this._onChange(StyleChangeEnum.TEXT_ALIGN);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasElementStyle.prototype, "font", {
            get: function () {
                if (this._font) {
                    return this._font;
                }
                var variant = (this._fontVariant ? this._fontVariant + " " : "");
                var size = (this._fontSize ? this._fontSize + "px " : "");
                return variant + size + this._fontFamily;
            },
            set: function (font) {
                this._font = font;
                this._onChange(StyleChangeEnum.FONT);
            },
            enumerable: true,
            configurable: true
        });
        CanvasElementStyle.prototype.addStyleChangeListener = function (changeType, func) {
            if (!this._listeners[changeType]) {
                this._listeners[changeType] = [];
            }
            // Add to the array of listeners
            this._listeners[changeType].push(func);
        };
        CanvasElementStyle.prototype._onChange = function (changeType) {
            if (!this._listeners[changeType]) {
                return;
            }
            var listener;
            for (var _i = 0, _a = this._listeners[changeType]; _i < _a.length; _i++) {
                listener = _a[_i];
                listener();
            }
        };
        CanvasElementStyle.prototype.setStyle = function (context) {
            this._saveOffOldStyle(context);
            this._applyStyleToContext(context, this);
        };
        CanvasElementStyle.prototype.restoreStyle = function (context) {
            this._applyStyleToContext(context, this._oldStyle);
        };
        CanvasElementStyle.prototype._saveOffOldStyle = function (context) {
            this._oldStyle = new CanvasElementStyle();
            this._oldStyle.fillColor = context.fillStyle;
            this._oldStyle.strokeColor = context.strokeStyle;
            this._oldStyle.font = context.font;
            this._oldStyle.strokeSize = context.lineWidth;
            this._oldStyle.textAlign = context.textAlign;
        };
        CanvasElementStyle.prototype._applyStyleToContext = function (context, style) {
            context.fillStyle = style.fillColor;
            context.strokeStyle = style.strokeColor;
            context.textAlign = style.textAlign;
            context.font = style.font;
            context.lineWidth = style.strokeSize;
        };
        return CanvasElementStyle;
    }());
    KIP.CanvasElementStyle = CanvasElementStyle;
})(KIP || (KIP = {}));
///<reference path="canvasElement.ts" />
var KIP;
(function (KIP) {
    var CircleElement = /** @class */ (function (_super) {
        __extends(CircleElement, _super);
        function CircleElement(id, center, temp) {
            var _this = _super.call(this, id) || this;
            var radius;
            if (KIP.isNumber(temp)) {
                radius = {
                    x: temp,
                    y: temp
                };
            }
            else {
                radius = temp;
            }
            _this._dimensions = {
                x: center.x - radius.x,
                y: center.y - radius.y,
                w: radius.x * 2,
                h: radius.y * 2
            };
            _this._center = center;
            _this._radius = radius;
            _this._initializeRects();
            return _this;
        }
        Object.defineProperty(CircleElement.prototype, "type", {
            get: function () { return KIP.ElementType.Circle; },
            enumerable: true,
            configurable: true
        });
        CircleElement.prototype._onDraw = function (context) {
            // TODO: HANDLE SCALING IF NEED BE
            // draw the actual text of the element
            context.beginPath();
            context.arc(this._displayDimensions.x + this._displayRadius.x, this._displayDimensions.y + this._displayRadius.y, this._displayRadius.x, 0, 2 * Math.PI);
            context.fill();
            // return style to norm
            this._restoreStyle(context);
        };
        /** change the dimensions based on a pan / zoom change on the canvas */
        CircleElement.prototype.updateDimensions = function (canvasDimensions) {
            _super.prototype.updateDimensions.call(this, canvasDimensions);
            this._displayRadius = {
                x: this._radius.x * this._canvas.zoomFactor.x,
                y: this._radius.y * this._canvas.zoomFactor.y
            };
        };
        /** override default dimensions for circle specific dimensions */
        CircleElement.prototype._debugDimensions = function () {
            console.log("CIRCLE:");
            console.log("center pt: " + Math.round(this._displayDimensions.x + this._displayRadius.x) + ", " + Math.round(this._displayDimensions.y + this._displayRadius.y));
            console.log("radius: " + Math.round(this._displayRadius.x));
            this._canvas.debugRelativeDimensions();
        };
        /** create a clone to be used in effect calculations */
        CircleElement.prototype._cloneForEffect = function (id) {
            // clone relevant data 
            var center = {
                x: this._dimensions.x + this._radius.x,
                y: this._dimensions.y + this._radius.y
            };
            var radius = KIP.clonePoint(this._radius);
            var elem = new CircleElement(id, center, radius);
            return elem;
        };
        /** allow effect elements to be resized */
        CircleElement.prototype._scale = function (scaleAmt) {
            if (!this._isEffect) {
                return;
            }
            _super.prototype._scale.call(this, scaleAmt);
            // Update this radius
            this._radius = {
                x: this._radius.x * scaleAmt,
                y: this._radius.y * scaleAmt
            };
        };
        return CircleElement;
    }(KIP.CanvasElement));
    KIP.CircleElement = CircleElement;
})(KIP || (KIP = {}));
///<reference path="canvasElement.ts" />
var KIP;
(function (KIP) {
    var PathElement = /** @class */ (function (_super) {
        __extends(PathElement, _super);
        function PathElement(id, points) {
            var _this = _super.call(this, id) || this;
            _this._initializeRects();
            if (points) {
                _this._points = points;
                _this._updateExtremaFromPoints();
            }
            else {
                _this._points = [];
            }
            return _this;
        }
        Object.defineProperty(PathElement.prototype, "type", {
            get: function () { return KIP.ElementType.Path; },
            enumerable: true,
            configurable: true
        });
        /** create an empty dimensions rect */
        PathElement.prototype._initializeRects = function () {
            this._dimensions = {
                x: 0,
                y: 0,
                w: 0,
                h: 0
            };
            _super.prototype._initializeRects.call(this);
            this._needsInitialDimensions = true;
        };
        /** add a new point to this path */
        PathElement.prototype.addPoint = function (point) {
            this._points.push(point);
            // Update extrema
            this._updateExtremaFromPoint(point);
        };
        /** loop through and update extremas based on all points */
        PathElement.prototype._updateExtremaFromPoints = function () {
            var point;
            for (var _i = 0, _a = this._points; _i < _a.length; _i++) {
                point = _a[_i];
                this._updateExtremaFromPoint(point);
            }
        };
        /** check if extrema need to be updated for a single point */
        PathElement.prototype._updateExtremaFromPoint = function (point) {
            // Check for x extremes
            if (this._needsInitialDimensions || point.x < this._dimensions.x) {
                this._dimensions.x = point.x;
            }
            else if (point.x > (this._dimensions.x + this._dimensions.w)) {
                this._dimensions.w = (point.x - this._dimensions.x);
            }
            // Check for y extremes
            if (this._needsInitialDimensions || point.y < this._dimensions.y) {
                this._dimensions.y = point.y;
            }
            else if (point.y > (this._dimensions.y + this._dimensions.h)) {
                this._dimensions.h = (point.y - this._dimensions.y);
            }
            this._needsInitialDimensions = false;
        };
        /** actually create the path on the canvas */
        PathElement.prototype._onDraw = function (context) {
            context.beginPath();
            // Add each point
            var point;
            for (var _i = 0, _a = this._displayPoints; _i < _a.length; _i++) {
                point = _a[_i];
                context.lineTo(point.x, point.y); //TODO: [future] add curves and arcs as well
            }
            context.closePath();
            context.fill();
        };
        /**  */
        PathElement.prototype.updateDimensions = function (canvasDimensions) {
            _super.prototype.updateDimensions.call(this, canvasDimensions);
            // We need to update each of our points
            this._displayPoints = [];
            var point;
            for (var _i = 0, _a = this._points; _i < _a.length; _i++) {
                point = _a[_i];
                //let displayPoint: IPoint = this._canvas.convertAbsolutePointToRelativePoint(point);
                var displayPoint = {
                    x: (point.x - canvasDimensions.x) * this._canvas.zoomFactor.x,
                    y: (point.y - canvasDimensions.y) * this._canvas.zoomFactor.y
                };
                this._displayPoints.push(displayPoint);
            }
        };
        PathElement.prototype.adjustDimensions = function (adjustPt) {
            if (this._isEffect) {
                return;
            }
            _super.prototype.adjustDimensions.call(this, adjustPt);
            var point;
            for (var _i = 0, _a = this._points; _i < _a.length; _i++) {
                point = _a[_i];
                point.x += adjustPt.x;
                point.y += adjustPt.y;
            }
        };
        /** clone in order to be able to apply various effects */
        PathElement.prototype._cloneForEffect = function (id) {
            var out = new PathElement(id, KIP.clonePointArray(this._points));
            return out;
        };
        PathElement.prototype._scale = function (scaleAmt) {
            if (!this._isEffect) {
                return;
            }
            // calculate the central point (defined as the center of each extrema)
            var center = {
                x: this._dimensions.x + (this._dimensions.w / 2),
                y: this._dimensions.y + (this._dimensions.h / 2)
            };
            // Scale each point to be some amount further from the center
            var pt;
            var tmpPoints = [];
            for (var _i = 0, _a = this._points; _i < _a.length; _i++) {
                pt = _a[_i];
                var tmpPt = this._scalePoint(pt, center, scaleAmt);
                tmpPoints.push(tmpPt);
            }
            // set our points array to the new points array
            this._points = tmpPoints;
            this._updateExtremaFromPoints();
        };
        PathElement.prototype._scalePoint = function (pt, center, scaleAmt) {
            var angle = KIP.Trig.getAngle(center, pt);
            var distance = KIP.Trig.getDistance(center, pt);
            var newDistance = distance * scaleAmt;
            var newPt = KIP.Trig.getEndPoint(center, angle, newDistance);
            return newPt;
        };
        return PathElement;
    }(KIP.CanvasElement));
    KIP.PathElement = PathElement;
})(KIP || (KIP = {}));
///<reference path="canvasElement.ts" />
var KIP;
(function (KIP) {
    var RectangleElement = /** @class */ (function (_super) {
        __extends(RectangleElement, _super);
        /** create a rectangle element
         * @param id - unique ID for the rectangle
         * @param dimensions - the size of the rectangle (in canvas coordinates)
         */
        function RectangleElement(id, dimensions) {
            var _this = _super.call(this, id) || this;
            _this._type = KIP.ElementType.Rectangle;
            _this._borderRadius = 0;
            _this._dimensions = dimensions;
            _this._initializeRects();
            return _this;
        }
        Object.defineProperty(RectangleElement.prototype, "borderRadius", {
            set: function (bRad) { this._borderRadius = bRad; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RectangleElement.prototype, "type", {
            get: function () { return KIP.ElementType.Rectangle; },
            enumerable: true,
            configurable: true
        });
        /** actually draw the rectangle */
        RectangleElement.prototype._onDraw = function (context) {
            if (this._borderRadius === 0) {
                this._unroundedRect(context);
            }
            else {
                this._roundedRect(context);
            }
        };
        RectangleElement.prototype._unroundedRect = function (context) {
            context.fillRect(// Create the actual rectangle
            this._displayDimensions.x, // ...
            this._displayDimensions.y, // ...
            this._displayDimensions.w, // ...
            this._displayDimensions.h // ...
            ); // ...
        };
        RectangleElement.prototype._roundedRect = function (context) {
            context.beginPath();
            var dim = this._displayDimensions;
            var radius = this._displayBorderRadius;
            // top straight line
            context.moveTo(dim.x + radius.x, dim.y);
            context.lineTo(dim.x + dim.w - radius.x, dim.y);
            // top right rounded corner
            context.quadraticCurveTo(dim.x + dim.w, dim.y, dim.x + dim.w, dim.y + radius.y);
            // right vertical side
            context.lineTo(dim.x + dim.w, dim.y + dim.h - radius.y);
            // bottom right rounded corner
            context.quadraticCurveTo(dim.x + dim.w, dim.y + dim.h, dim.x + dim.w - radius.x, dim.y + dim.h);
            // bottom straight line
            context.lineTo(dim.x + radius.x, dim.y + dim.h);
            // bottom left rounded corner
            context.quadraticCurveTo(dim.x, dim.y + dim.h, dim.x, dim.y + dim.h - radius.y);
            // left straight line
            context.lineTo(dim.x, dim.y + radius.y);
            // top left rounded corner
            context.quadraticCurveTo(dim.x, dim.y, dim.x + radius.x, dim.y);
            context.closePath();
            context.fill();
        };
        RectangleElement.prototype.updateDimensions = function (canvasDimensions) {
            _super.prototype.updateDimensions.call(this, canvasDimensions);
            this._displayBorderRadius = {
                x: this._borderRadius * this._canvas.zoomFactor.x,
                y: this._borderRadius * this._canvas.zoomFactor.y
            };
        };
        /** clone an element for an effect to be applied */
        RectangleElement.prototype._cloneForEffect = function (id) {
            var dim = KIP.cloneRect(this._dimensions);
            var clone = new RectangleElement(id, dim);
            return clone;
        };
        return RectangleElement;
    }(KIP.CanvasElement));
    KIP.RectangleElement = RectangleElement;
})(KIP || (KIP = {}));
///<reference path="canvasElement.ts" />
var KIP;
(function (KIP) {
    var TextElement = /** @class */ (function (_super) {
        __extends(TextElement, _super);
        /** create the text element */
        function TextElement(id, text, point) {
            var _this = _super.call(this, id) || this;
            _this._type = KIP.ElementType.Text;
            _this._text = text;
            _this._dimensions = {
                x: point.x,
                y: point.y,
                w: 10,
                h: 10 // Same for height
            };
            _this._initializeRects();
            _this._addStyleChangeListener();
            return _this;
        }
        Object.defineProperty(TextElement.prototype, "text", {
            set: function (txt) { this._text = txt; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextElement.prototype, "fixed", {
            set: function (fixed) { this._fixed = fixed; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextElement.prototype, "type", {
            get: function () { return KIP.ElementType.Text; },
            enumerable: true,
            configurable: true
        });
        /** handle the canvas being assigned to the  */
        TextElement.prototype._setCanvas = function (canvas) {
            _super.prototype._setCanvas.call(this, canvas);
            this._calculateTextMetrics();
        };
        TextElement.prototype._addStyleChangeListener = function () {
            var _this = this;
            this._style.addStyleChangeListener(KIP.StyleChangeEnum.FONT_SIZE, function () {
                _this._dimensions.h = _this._style.fontSize;
            });
        };
        /** determine how big the text should be */
        TextElement.prototype._calculateTextMetrics = function () {
            if (!this._canvas) {
                return;
            }
            var context = this._canvas.context;
            this._applyStyle(context);
            var metrics = context.measureText(this._text);
            this._restoreStyle(context);
            // Set the real measurements
            this._dimensions.w = metrics.width;
            this._dimensions.h = this.style.fontSize;
            // set the display dimensions to be this statically
            this._displayDimensions.w = metrics.width;
            this._displayDimensions.h = this.style.fontSize;
        };
        /** draw the text element on the canvas */
        TextElement.prototype._onDraw = function (context) {
            // draw the actual text of the element
            context.fillText(this._text, this._displayDimensions.x, this._displayDimensions.y + (this._fixed ? this._dimensions.h : this._displayDimensions.h));
            // consider the display dimensions the same as the original calculation
            this._displayDimensions.w = this._dimensions.w;
            this._displayDimensions.h = this._dimensions.h;
        };
        /** clone a text effect */
        TextElement.prototype._cloneForEffect = function (id) {
            var pt = {
                x: this._dimensions.x,
                y: this._dimensions.y
            };
            var out = new TextElement(id, this._text, pt);
            return out;
        };
        return TextElement;
    }(KIP.CanvasElement));
    KIP.TextElement = TextElement;
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    var Events;
    (function (Events) {
        //#endregion
        var Event = /** @class */ (function () {
            /**...........................................................................
             * Creates a new Event
             * @param 	details 	The specs for this particular event
             * ...........................................................................
             */
            function Event(details) {
                /** keep track of how many listeners we've added */
                this._numOfListeners = 0;
                this._name = details.name;
                this._key = details.key;
                this._listeners = new KIP.Collection(KIP.CollectionTypeEnum.ReplaceDuplicateKeys);
            }
            Object.defineProperty(Event.prototype, "context", {
                get: function () { return this._context; },
                enumerable: true,
                configurable: true
            });
            /**...........................................................................
             * addListener
             * ...........................................................................
             * add a listener to our collection (with the option to replace if using a unique key)
             *
             * @param	listenerData	The listener features to add
             * ...........................................................................
             */
            Event.prototype.addListener = function (listenerData) {
                listenerData.uniqueId = listenerData.uniqueId || (this._key + this._numOfListeners.toString());
                this._listeners.addElement(listenerData.uniqueId, listenerData);
                this._numOfListeners += 1;
            };
            /**...........................................................................
             * removeEventListener
             * ...........................................................................
             *  allow a listener to be skipped
             *
             * @param	uniqueId	Unique identifier for the listener to remove
             * ...........................................................................
             */
            Event.prototype.removeEventListener = function (uniqueId) {
                if (!uniqueId) {
                    return;
                }
                this._listeners.removeElement(uniqueId);
            };
            /**...........................................................................
             * notifyListeners
             * ...........................................................................
             * Let listeners know that an event that they care about has been fired
             *
             * @param 	context 	The context to send along with the event
             * ...........................................................................
             */
            Event.prototype.notifyListeners = function (context) {
                var _this = this;
                this._context = context;
                // loop through the listeners to find one that applies for this context
                this._listeners.map(function (elem, key) {
                    if (!elem) {
                        return;
                    }
                    if (!elem.target || (KIP.equals(elem.target, context.target))) {
                        elem.func(_this);
                    }
                });
                // reset our context
                this._context = null;
            };
            return Event;
        }());
        Events.Event = Event;
    })(Events = KIP.Events || (KIP.Events = {}));
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    var Events;
    (function (Events) {
        /**...........................................................................
         * @class EventHandler
         * Handles all events that are raised by any applications
         * @version 1.0
         * ...........................................................................
         */
        var EventHandler = /** @class */ (function () {
            function EventHandler() {
            }
            /**...........................................................................
             * createEvent
             * ...........................................................................
             * create a new event with a partular key and name
             *
             * @param	details		Specs for the event we are creating
             *
             * @returns	True if a new event was created
             * ...........................................................................
             */
            EventHandler.createEvent = function (details) {
                var evt = new Events.Event(details);
                return (this._events.addElement(details.key, evt) !== -1);
            };
            /**...........................................................................
             * dispatchEvent
             * ...........................................................................
             * handle notifying listeners about an event that occurred
             *
             * @param	key			The key used by this particular event
             * @param	context		THe additional context to use for the event
             * ...........................................................................
             * */
            EventHandler.dispatchEvent = function (key, context) {
                var evt = this._events.getValue(key);
                if (!evt) {
                    return;
                }
                evt.notifyListeners(context);
            };
            /**...........................................................................
             * addEventListener
             * ...........................................................................
             * register an additional listener with a particular event
             *
             * @param	key				The key to use for the event
             * @param	listenerData	The data to use for the listener being added
             * ...........................................................................
             */
            EventHandler.addEventListener = function (key, listenerData) {
                var evt = this._events.getValue(key);
                if (!evt) {
                    return;
                }
                evt.addListener(listenerData);
            };
            /**...........................................................................
             * removeEventListener
             * ...........................................................................
             *  remove a particular event listener
             *
             * @param	uniqueId	The unique ID for this listener
             * @param	key			If specified, the particular event to remove from
             * ...........................................................................
             */
            EventHandler.removeEventListener = function (uniqueID, key) {
                if (!uniqueID) {
                    return;
                }
                // If it's only a particular type of event that is being removed, do so
                if (key) {
                    var evt = this._events.getValue(key);
                    if (!evt) {
                        return;
                    }
                    evt.removeEventListener(uniqueID);
                    // Otherwise, remove this uniqueID from all events
                }
                else {
                    this._events.map(function (evt) {
                        evt.removeEventListener(uniqueID);
                    });
                }
            };
            /** keep track of all the events that are registered to this event handler */
            EventHandler._events = new KIP.Collection();
            return EventHandler;
        }());
        Events.EventHandler = EventHandler;
        //#region HELPER FUNCTIONS
        /**...........................................................................
         * createEvent
         * ...........................................................................
         * Creates a new type of event that can now be listened for
         *
         * @param 	details 	The specs with which to create the event
         *
         * @returns	True if the event was created
         * ...........................................................................
         */
        function createEvent(details) {
            return EventHandler.createEvent(details);
        }
        Events.createEvent = createEvent;
        /**...........................................................................
         * dispatchEvent
         * ...........................................................................
         * Sends out the notification that an event occurred
         *
         * @param 	key 		The key of the event being sent out
         * @param 	context 	Any additional context needed by listeners of the event
         * ...........................................................................
         */
        function dispatchEvent(key, context) {
            EventHandler.dispatchEvent(key, context);
        }
        Events.dispatchEvent = dispatchEvent;
        /**...........................................................................
         * addEventListener
         * ...........................................................................
         * @param 	key 			The key of the event to listen on
         * @param 	listenerData	Context for the event listener
         * ...........................................................................
         */
        function addEventListener(key, listenerData) {
            EventHandler.addEventListener(key, listenerData);
        }
        Events.addEventListener = addEventListener;
        //#endregion
    })(Events = KIP.Events || (KIP.Events = {}));
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    var ForceGraph;
    (function (ForceGraph_1) {
        // PHYSICS REFERENCE
        // Coulombes Law: F = (m1m2)/??
        // Gravity: F = Gm1m2/a
        // Hooke's Law: F - -kX
        var ForceGraph = /** @class */ (function (_super) {
            __extends(ForceGraph, _super);
            //#endregion
            //#region CREATE THE GRAPH STRUCTURE
            function ForceGraph(isDirected) {
                var _this = _super.call(this) || this;
                //#region PROPERTIES
                _this._width = 1000;
                _this._height = 1000;
                _this._nodes = new KIP.Collection(KIP.CollectionTypeEnum.ReplaceDuplicateKeys);
                _this._isDirected = isDirected;
                return _this;
            }
            ForceGraph.prototype._createElements = function () {
                this._elems.base = KIP.createElement({
                    cls: "forceGraph"
                });
            };
            //#endregion
            //#region ADD NEW NODES
            ForceGraph.prototype.addNode = function (id, data) {
                var node = new ForceGraph_1.Node(data, this._isDirected);
                this._nodes.addElement(id, node);
                return node;
            };
            ForceGraph.prototype.addConnectionToNode = function (parent, target) {
                if ((!parent) || (target)) {
                    return;
                }
                // ensure the parent node exists
                var parentNode = this._getNodeFromConnectionParams(parent);
                if (!parentNode) {
                    return;
                }
                // ensure the target node exists
                var targetNode = this._getNodeFromConnectionParams(target);
                if (!targetNode) {
                    return;
                }
                parentNode.addConnection(targetNode);
            };
            ForceGraph.prototype._getNodeFromConnectionParams = function (params) {
                return (params.node || this._nodes.getElement(params.id).value);
            };
            //#endregion
            //#region HANDLE ARRANGING NODES
            ForceGraph.prototype.arrangeNodes = function () {
                // 1. Find the node we should start with 
                var startNode;
                if (this._isDirected) {
                    startNode = this._getStartNode();
                }
                else {
                    startNode = this._getNodeWithMostConnections();
                }
                // 2. Stick that node somewhere on the screen
                if (this._isDirected) {
                    startNode.position = { x: 0, y: 0 };
                }
                else {
                    startNode.position = { x: this._width / 2, y: this._height / 2 };
                }
                // 3. Go through each of the connections for this node to determine approximate arrangement
            };
            /**
             * _getNodeWithMostConnections
             *
             * Find the most connected node so as to start with it, as it will take the most planning
             */
            ForceGraph.prototype._getNodeWithMostConnections = function () {
                var max = -1;
                var maxNode;
                this._nodes.map(function (node) {
                    if (node.connections.length > max) {
                        max = node.connections.length;
                        maxNode = node;
                    }
                });
                return maxNode;
            };
            ForceGraph.prototype._getStartNode = function () {
                return this._nodes[0];
            };
            return ForceGraph;
        }(KIP.Drawable));
        ForceGraph_1.ForceGraph = ForceGraph;
    })(ForceGraph = KIP.ForceGraph || (KIP.ForceGraph = {}));
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    var ForceGraph;
    (function (ForceGraph) {
        var Node = /** @class */ (function () {
            //#endregion
            function Node(data, isDirected) {
                this._data = data;
                this._isDirected = isDirected;
                this._incomingConnections = [];
                this._outgoingConnections = [];
            }
            Object.defineProperty(Node.prototype, "data", {
                get: function () { return this._data; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Node.prototype, "incomingConnections", {
                get: function () { return this._incomingConnections; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Node.prototype, "outgoingConnections", {
                get: function () { return this._outgoingConnections; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Node.prototype, "connections", {
                get: function () {
                    var arr = [];
                    if (this._isDirected) {
                        arr.concat(this._incomingConnections, this._outgoingConnections);
                    }
                    else {
                        arr.concat(this._incomingConnections);
                    }
                    return arr;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Node.prototype, "position", {
                get: function () { return this._position; },
                set: function (pt) { this._position = pt; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Node.prototype, "radius", {
                get: function () { return this._radius; },
                enumerable: true,
                configurable: true
            });
            Node.prototype.addConnection = function (otherNode) {
                this._outgoingConnections.push(otherNode);
                if (!this._isDirected) {
                    this._incomingConnections.push(otherNode);
                    otherNode.addConnection(this);
                }
                else {
                    otherNode.addConnection(this);
                }
            };
            Node.prototype.addIncomingConnection = function (otherNode) {
                this._incomingConnections.push(otherNode);
            };
            return Node;
        }());
        ForceGraph.Node = Node;
    })(ForceGraph = KIP.ForceGraph || (KIP.ForceGraph = {}));
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    var Forms;
    (function (Forms) {
        /** type of the element */
        var FormElementTypeEnum;
        (function (FormElementTypeEnum) {
            FormElementTypeEnum[FormElementTypeEnum["TEXT"] = 1] = "TEXT";
            FormElementTypeEnum[FormElementTypeEnum["NUMBER"] = 2] = "NUMBER";
            FormElementTypeEnum[FormElementTypeEnum["DATE"] = 3] = "DATE";
            FormElementTypeEnum[FormElementTypeEnum["TIME"] = 4] = "TIME";
            FormElementTypeEnum[FormElementTypeEnum["DATE_TIME"] = 5] = "DATE_TIME";
            FormElementTypeEnum[FormElementTypeEnum["SELECT"] = 6] = "SELECT";
            FormElementTypeEnum[FormElementTypeEnum["CHECKBOX"] = 7] = "CHECKBOX";
            FormElementTypeEnum[FormElementTypeEnum["TEXTAREA"] = 8] = "TEXTAREA";
            FormElementTypeEnum[FormElementTypeEnum["ARRAY"] = 9] = "ARRAY";
            FormElementTypeEnum[FormElementTypeEnum["ARRAY_CHILD"] = 10] = "ARRAY_CHILD";
            FormElementTypeEnum[FormElementTypeEnum["TOGGLE_BUTTON"] = 11] = "TOGGLE_BUTTON";
            FormElementTypeEnum[FormElementTypeEnum["CUSTOM"] = 12] = "CUSTOM";
            FormElementTypeEnum[FormElementTypeEnum["SECTION"] = 13] = "SECTION";
            FormElementTypeEnum[FormElementTypeEnum["HIDDEN"] = 14] = "HIDDEN";
            FormElementTypeEnum[FormElementTypeEnum["FILE_UPLOAD"] = 15] = "FILE_UPLOAD";
            FormElementTypeEnum[FormElementTypeEnum["FILE_PATH"] = 16] = "FILE_PATH";
            FormElementTypeEnum[FormElementTypeEnum["COLOR"] = 17] = "COLOR";
        })(FormElementTypeEnum = Forms.FormElementTypeEnum || (Forms.FormElementTypeEnum = {}));
        ;
        /** options for layout */
        var FormElementLayoutEnum;
        (function (FormElementLayoutEnum) {
            FormElementLayoutEnum[FormElementLayoutEnum["MULTILINE"] = 0] = "MULTILINE";
            FormElementLayoutEnum[FormElementLayoutEnum["TABLE"] = 1] = "TABLE";
            FormElementLayoutEnum[FormElementLayoutEnum["FLEX"] = 2] = "FLEX";
            FormElementLayoutEnum[FormElementLayoutEnum["LABEL_AFTER"] = 3] = "LABEL_AFTER";
        })(FormElementLayoutEnum = Forms.FormElementLayoutEnum || (Forms.FormElementLayoutEnum = {}));
        ;
        var DirectionType;
        (function (DirectionType) {
            DirectionType[DirectionType["FORWARD"] = 1] = "FORWARD";
            DirectionType[DirectionType["BACKWARD"] = -1] = "BACKWARD";
            DirectionType[DirectionType["MOVE"] = 0] = "MOVE";
        })(DirectionType = Forms.DirectionType || (Forms.DirectionType = {}));
        var ValidationType;
        (function (ValidationType) {
            ValidationType[ValidationType["KEEP_ERROR_VALUE"] = 1] = "KEEP_ERROR_VALUE";
            ValidationType[ValidationType["RESTORE_OLD_VALUE"] = 2] = "RESTORE_OLD_VALUE";
            ValidationType[ValidationType["CLEAR_ERROR_VALUE"] = 3] = "CLEAR_ERROR_VALUE";
            ValidationType[ValidationType["NO_BLUR_PROCESSED"] = 4] = "NO_BLUR_PROCESSED";
        })(ValidationType = Forms.ValidationType || (Forms.ValidationType = {}));
    })(Forms = KIP.Forms || (KIP.Forms = {}));
})(KIP || (KIP = {}));
///<reference path="formConstants.ts" />
var KIP;
(function (KIP) {
    var Forms;
    (function (Forms) {
        /**
         * determine whether a particular parameter is a form element
         * @param elem - Either a FormElement or a FormTemplate
         * @returns True if elem is a form Element
         */
        function isFormElement(elem) {
            if (!elem) {
                return false;
            }
            return (elem.id !== undefined) && (elem.type !== undefined);
        }
        Forms.isFormElement = isFormElement;
        /** create the general form element class that all others extend */
        var FormElement = /** @class */ (function (_super) {
            __extends(FormElement, _super);
            /**...........................................................................
             *
             * @param id
             * @param data
             * ...........................................................................
             */
            function FormElement(id, data) {
                var _this = _super.call(this) || this;
                /** store the standard class for all form elements */
                _this._standardCls = "kipFormElem";
                _this._addClassName("FormElement");
                _this._id = id;
                _this._hasErrors = false;
                // If this is another element, parse it
                if (isFormElement(data)) {
                    _this._cloneFromFormElement(data);
                    // otherwise, handle the standard template parsing
                }
                else {
                    _this._parseElemTemplate(data);
                }
                _this._createElements();
                return _this;
            }
            Object.defineProperty(FormElement.prototype, "id", {
                get: function () { return this._id; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FormElement.prototype, "type", {
                get: function () { return this._type; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FormElement.prototype, "data", {
                get: function () { return this._data; },
                set: function (data) { this.update(data); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FormElement.prototype, "onOtherChange", {
                get: function () { return this._onOtherChange; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FormElement.prototype, "template", {
                get: function () { return this._template; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FormElement.prototype, "hasErrors", {
                get: function () { return this._hasErrors; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FormElement.prototype, "validationType", {
                get: function () { return this._validationType; },
                enumerable: true,
                configurable: true
            });
            /**...........................................................................
             * _cloneFromFormElement
             * ...........................................................................
             *  handle creation of the element through copying over an existing element
             * ...........................................................................
             */
            FormElement.prototype._cloneFromFormElement = function (elem) {
                this._parseElemTemplate(elem.template);
            };
            /**...........................................................................
             * _parseElemTemplate
             * ...........................................................................
             * parse the template
             * ...........................................................................
             */
            FormElement.prototype._parseElemTemplate = function (template) {
                var _this = this;
                // quit if there is nothing to parse
                if (KIP.isNullOrUndefined(template)) {
                    template = {};
                }
                // set up the label for the element
                this._label = template.label || this._id;
                if (KIP.isNullOrUndefined(this._label)) {
                    this._label = this._id;
                }
                // set the appropriate type
                this._type = template.type || this._type;
                // set the appropriate default value
                this._data = template.value;
                if (KIP.isNullOrUndefined(this._data)) {
                    this._data = this._defaultValue;
                }
                // create the appropriate layout
                this._layout = template.layout || Forms.FormElementLayoutEnum.MULTILINE;
                // determine whether we need this element to submit
                this._isRequired = template.required;
                if (this._isRequired) {
                    KIP.Events.dispatchEvent(Forms.FORM_SAVABLE_CHANGE, { hasErrors: false, hasMissingRequired: true });
                }
                // ensure a particular order of elements
                this._position = template.position;
                // set an appropriate CSS class
                this._cls = KIP.Styles.buildClassString(this._standardCls, this._defaultCls, template.cls, template.required ? "required" : "");
                // handle validation options
                this._onValidate = template.onValidate;
                this._validationType = template.validationType;
                if (KIP.isNullOrUndefined(this._validationType)) {
                    this._validationType = Forms.ValidationType.KEEP_ERROR_VALUE;
                }
                // If there's an "other changed" function, register a listener
                this._onOtherChange = template.onOtherChange;
                if (this._onOtherChange) {
                    KIP.Events.addEventListener(Forms.FORM_ELEM_CHANGE, {
                        func: function (ev) { _this._handleOtherChange(ev); },
                        uniqueId: this._id
                    });
                }
                // save off our template
                this._template = template;
            };
            /**...........................................................................
             * _parseElement
             * ...........................................................................
             * wrapper around the cloning method so we don't run into protection issues
             * ...........................................................................
             */
            FormElement.prototype._parseElement = function (template, appendToID) {
                if (!appendToID) {
                    appendToID = "";
                }
                return template._createClonedElement(appendToID);
            };
            //#endregion
            //#region Creating elements for a Form Element
            /**...........................................................................
             * _createElements
             * ...........................................................................
             * creates all elements for this input
             * ...........................................................................
             */
            FormElement.prototype._createElements = function () {
                var _this = this;
                this._elems = {
                    core: KIP.createSimpleElement("", this._cls),
                    error: KIP.createSimpleElement("", "error")
                };
                this._elems.core.appendChild(this._elems.error);
                // Let the child handle actually creating the elements
                this._onCreateElements();
                // register the change listener if we created one
                if (this._elems.input) {
                    this._elems.input.addEventListener("input", function () {
                        _this._changeEventFired();
                    });
                    this._elems.input.addEventListener("change", function () {
                        _this._changeEventFired();
                    });
                }
                this._createStyles();
            };
            /**...........................................................................
             * _tableLayout
             * ...........................................................................
             * draws elements in a table format
             * ...........................................................................
             */
            FormElement.prototype._tableLayout = function () {
                // build the cells that will hold the elements
                var cells = [];
                for (var i = 0; i < 2; i += 1) {
                    var cell = KIP.createElement({
                        type: "td",
                        cls: "frmCel"
                    });
                    cells[i] = cell;
                }
                // add the label and the input to the table cells
                if (this._elems.lbl) {
                    cells[0].appendChild(this._elems.lbl);
                }
                if (this._elems.input) {
                    cells[1].appendChild(this._elems.input);
                }
                // create the actual table element & add it to the core element
                this._elems.table = KIP.createTable("", "", cells);
                this._elems.core.appendChild(this._elems.table);
            };
            /**...........................................................................
             * _flexLayout
             * ...........................................................................
             * handle a flex layout of label: elem
             * ...........................................................................
             */
            FormElement.prototype._flexLayout = function () {
                this._addStandardElemsToCore();
                KIP.addClass(this._elems.core, "flex");
            };
            /**...........................................................................
             * _multiLineLayout
             * ...........................................................................
             * handle a multiline layout of label on top of input
             * ...........................................................................
             */
            FormElement.prototype._multiLineLayout = function () {
                this._addStandardElemsToCore();
                KIP.addClass(this._elems.core, "multiline");
            };
            /**...........................................................................
             * _labelAfterLayout
             * ...........................................................................
             * handle displaying the label element after the input
             * ...........................................................................
             */
            FormElement.prototype._labelAfterLayout = function () {
                this._elems.core.appendChild(this._elems.input);
                this._elems.core.appendChild(this._elems.lbl);
            };
            /**...........................................................................
             * _addStandardElemsToCore
             * ...........................................................................
             *
             * ...........................................................................
             */
            FormElement.prototype._addStandardElemsToCore = function () {
                this._elems.core.appendChild(this._elems.lbl);
                this._elems.core.appendChild(this._elems.input);
            };
            /**...........................................................................
             * _handleStandardLayout
             * ...........................................................................
             * helper to handle an elements layout based on their config
             * ...........................................................................
             */
            FormElement.prototype._handleStandardLayout = function () {
                var l = Forms.FormElementLayoutEnum;
                switch (this._layout) {
                    // label displays in table cell, elemnt in other table cell
                    case l.TABLE:
                        this._tableLayout();
                        return true;
                    // label displays before element inline
                    case l.FLEX:
                        this._flexLayout();
                        return true;
                    // label displays line above element
                    case l.MULTILINE:
                        this._multiLineLayout();
                        return true;
                    // label displays after the input
                    case l.LABEL_AFTER:
                        this._labelAfterLayout();
                        return true;
                }
                return false;
            };
            //#endregion
            //#region PUBLICLY-ACCESSIBLE FUNCTIONS
            /**...........................................................................
             * save
             * ...........................................................................
             * handle saving the data from this form
             * @returns The data contained within this form element
             * ...........................................................................
             */
            FormElement.prototype.save = function (internalUpdate) {
                // return the data that was created
                return this._data;
            };
            /**...........................................................................
             * canSave
             * ...........................................................................
             * Determines whether this element has the option for saving
             * @returns True if this element is prepared to save
             * ...........................................................................
             */
            FormElement.prototype.canSave = function () {
                return {
                    hasErrors: this._hasErrors,
                    hasMissingRequired: this._hasBlankRequiredElems()
                };
            };
            /**...........................................................................
             * _hasBlankRequiredElems
             * ...........................................................................
             * Check if this element has any misisng required elements
             * ...........................................................................
             */
            FormElement.prototype._hasBlankRequiredElems = function () {
                if (!this._isRequired) {
                    return false;
                }
                if (this._data !== this._defaultValue) {
                    return false;
                }
                return true;
            };
            /** ...........................................................................
             * update
             * ...........................................................................
             * handle when someone gives us new data programmatically
             * @param data - The data to use for this FormElement
             * ...........................................................................
             */
            FormElement.prototype.update = function (data) {
                this._onClear();
                if (KIP.isNullOrUndefined(data)) {
                    data = this._defaultValue;
                }
                this._data = data;
                if (this._elems.input) {
                    this._elems.input.value = data;
                }
            };
            /** ...........................................................................
             * render
             * ...........................................................................
             * render a particular form element
             * @param parent - The parent element that should be used to render this element
             * ...........................................................................
             */
            FormElement.prototype.render = function (parent) {
                // update the parent & quit if it's null
                this._parent = parent || this._parent;
                if (!this._parent) {
                    return;
                }
                // add this core element to the parent
                this._parent.appendChild(this._elems.core);
            };
            /**...........................................................................
             * clear
             * ...........................................................................
             * Clears all data in this particular element
             * ...........................................................................
             */
            FormElement.prototype.clear = function () {
                return this._onClear();
            };
            //#endregion
            //#region Handle changes to the element's data 
            /**...........................................................................
             * _changeEventFired
             * ...........................................................................
             *
             * ...........................................................................
             */
            FormElement.prototype._changeEventFired = function () {
                this._clearErrors();
                // call the child's version of the validation
                if (this._onChange()) {
                    // let the listeners know that this succeeded
                    this._dispatchChangeEvent();
                }
                this._dispatchSavableChangeEvent();
            };
            /**...........................................................................
             * _clearErrors
             * ...........................................................................
             * clear all of the errors
             * ...........................................................................
             */
            FormElement.prototype._clearErrors = function () {
                if (this._elems.error) {
                    this._elems.error.innerHTML = "";
                }
            };
            /**...........................................................................
             * _validate
             * ...........................................................................
             *  handle the shared validation function
             * ...........................................................................
             */
            FormElement.prototype._validate = function (data, errorString) {
                // run it through the eval function
                if (this._onValidate) {
                    if (!this._onValidate(data, errorString)) {
                        this._hasErrors = true;
                        return false;
                    }
                }
                this._hasErrors = false;
                return true;
            };
            /**...........................................................................
             * _onValidateError
             * ...........................................................................
             * display a default error message
             * ...........................................................................
             */
            FormElement.prototype._onValidateError = function (err) {
                var _this = this;
                var msg;
                if (err) {
                    msg = err.title ? err.title + ": " : "Uh-oh: ";
                    msg += err.details || (this._id + "'s data couldn't be saved");
                }
                console.log(msg);
                /** if we have an error element, fill it with the error */
                if (this._elems.error) {
                    this._elems.error.innerHTML = msg;
                }
                /** update the thing */
                if (this._elems.input) {
                    var value = void 0;
                    switch (this._validationType) {
                        case Forms.ValidationType.CLEAR_ERROR_VALUE:
                            value = this._defaultValue;
                            break;
                        case Forms.ValidationType.KEEP_ERROR_VALUE:
                            value = this._elems.input.value;
                            break;
                        case Forms.ValidationType.NO_BLUR_PROCESSED:
                            value = this._elems.input.value;
                            window.setTimeout(function () { _this._elems.input.focus(); }, 10);
                            break;
                        case Forms.ValidationType.RESTORE_OLD_VALUE:
                            value = this._data;
                            break;
                        default:
                            value = this._defaultValue;
                            break;
                    }
                    this._elems.input.value = value;
                }
            };
            /**...........................................................................
            * _dispatchSavableChangeEvent
            * ...........................................................................
            * let any listeners know that we updated the savable status of this element
            * ...........................................................................
            */
            FormElement.prototype._dispatchSavableChangeEvent = function () {
                KIP.Events.dispatchEvent(Forms.FORM_SAVABLE_CHANGE, {});
            };
            /**...........................................................................
             * _dispatchChangeEvent
             * ...........................................................................
             * let any listeners know that we updated our stuff
             * ...........................................................................
             */
            FormElement.prototype._dispatchChangeEvent = function (subkey) {
                KIP.Events.dispatchEvent(Forms.FORM_ELEM_CHANGE, {
                    key: this._id,
                    subkey: subkey,
                    data: this._data
                });
            };
            /**...........................................................................
             * _handleOtherChange
             * ...........................................................................
             * wrapper around our listener to ensure the data gets parsed appropriately
             * ...........................................................................
             */
            FormElement.prototype._handleOtherChange = function (ev) {
                if (!this._onOtherChange) {
                    return;
                }
                this._onOtherChange(ev.context.key, ev.context.data, this);
            };
            //#endregion
            //#region Standard functions for reuse
            /**...........................................................................
             * _standardValidation
             * ...........................................................................
             *
             * @param value
             *
             * @returns
             * ...........................................................................
             */
            FormElement.prototype._standardValidation = function (value) {
                var errorString = {
                    title: "",
                    details: ""
                };
                if (!this._validate(value, errorString)) {
                    this._onValidateError(errorString);
                    return false;
                }
                this._data = value;
                return true;
            };
            /**...........................................................................
             * _createStandardInput
             * ...........................................................................
             *  create a standard input based on the form type
             * ...........................................................................
             */
            FormElement.prototype._createStandardInput = function () {
                this._elems.input = Forms.createInputElement(this._id + "|input", "input", Forms.FormElementTypeEnum[this.type], this._data);
            };
            /**...........................................................................
             * _createStandardLabel
             * ...........................................................................
             *  create a standard label for the input
             * ...........................................................................
             */
            FormElement.prototype._createStandardLabel = function (embedIn) {
                this._elems.lbl = Forms.createLabelForInput(this._label, this._id, "lbl", embedIn);
            };
            /**...........................................................................
             * _createStandardLabeledInput
             * ...........................................................................
             * @param shouldEmbed
             * ...........................................................................
             */
            FormElement.prototype._createStandardLabeledInput = function (shouldEmbed) {
                this._createStandardInput();
                this._createStandardLabel((shouldEmbed ? this._elems.input : null));
            };
            /**...........................................................................
             * _onClear
             * ...........................................................................
             *
             * ...........................................................................
             */
            FormElement.prototype._onClear = function () {
                this._data = this._defaultValue;
                if (this._elems.input) {
                    this._elems.input.value = this._defaultValue;
                }
            };
            /** placeholder for individual CSS styles */
            FormElement._uncoloredStyles = {
                ".kipFormElem, .kipFormElem input, .kipFormElem select, .kipFormElem textarea": {
                    fontSize: "1em",
                    width: "100%",
                    boxSizing: "border-box"
                },
                ".kipFormElem": {
                    marginTop: "10px",
                    position: "relative"
                },
                ".kipFormElem input, .kipFormElem textarea, .kipFormElem select": {
                    fontFamily: "OpenSansLight,Segoe UI,Helvetica",
                    fontSize: "0.8em",
                    border: "1px solid #CCC"
                },
                ".kipFormElem textarea": {
                    minHeight: "100px",
                    maxWidth: "100%"
                },
                ".kipFormElem .lbl": {
                    fontSize: "0.9em",
                    color: "#666",
                    width: "100%",
                    boxSizing: "border-box"
                },
                ".kipFormElem.required .lbl": {},
                ".kipFormElem.required .lbl:after": {
                    content: '"*"',
                    color: "<1>",
                    fontWeight: "bold",
                    fontSize: "1.8em",
                    position: "absolute",
                    marginLeft: "2px"
                },
                ".kipFormElem .error": {
                    color: "#C30",
                    fontSize: "0.7em",
                    fontStyle: "italic"
                }
            };
            return FormElement;
        }(KIP.Styles.Stylable));
        Forms.FormElement = FormElement;
    })(Forms = KIP.Forms || (KIP.Forms = {}));
})(KIP || (KIP = {}));
///<reference path="formElement.ts" />
var KIP;
(function (KIP) {
    var Forms;
    (function (Forms) {
        //#region COLLAPSIBLE ELEMENT
        /**...........................................................................
         * @class CollapsibleElement
         * ...........................................................................
         * Create a collapsible element of the form
         * @version 1.0
         * ...........................................................................
         */
        var CollapsibleElement = /** @class */ (function (_super) {
            __extends(CollapsibleElement, _super);
            function CollapsibleElement() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            //#endregion
            //#region CREATE ELEMENTS
            /**...........................................................................
             * _createCollapsibleTitle
             * ...........................................................................
             * Create the title for a collapsible section & associated icons
             * ...........................................................................
             */
            CollapsibleElement.prototype._createCollapsibleTitle = function () {
                var _this = this;
                this._elems.titleContainer = KIP.createSimpleElement("", "sectionHeaderContainer", "", null, null, this._elems.core);
                this._elems.title = KIP.createSimpleElement("", "sectionHeader", this._label, null, null, this._elems.titleContainer);
                this._elems.collapseElem = KIP.createSimpleElement("", "caret", "\u25B5", null, null, this._elems.titleContainer);
                this._elems.titleContainer.addEventListener("click", function () { _this._onCaretClicked(); });
                // add a tracking class to the core element
                KIP.addClass(this._elems.core, "collapsible");
                // start collapsed
                this.collapse();
            };
            //#endregion
            //#region HANDLE EXPAND + COLLAPSE
            /**...........................................................................
             * _onCaretClicked
             * ...........................................................................
             * Handle the expand/collapse icon being clicked
             * ...........................................................................
             */
            CollapsibleElement.prototype._onCaretClicked = function () {
                if (this._isCollapsed) {
                    this.expand();
                }
                else {
                    this.collapse();
                }
            };
            /**...........................................................................
             * collapse
             * ...........................................................................
             * Handle collapsing the section
             * ...........................................................................
             */
            CollapsibleElement.prototype.collapse = function () {
                KIP.addClass(this._elems.core, "collapsed");
                this._isCollapsed = true;
            };
            /**...........................................................................
             * expand
             * ...........................................................................
             * Handle expanding the section
             * ...........................................................................
             */
            CollapsibleElement.prototype.expand = function () {
                KIP.removeClass(this._elems.core, "collapsed");
                this._isCollapsed = false;
            };
            /** style collapsible sections */
            CollapsibleElement._uncoloredStyles = {
                ".kipFormElem.collapsible .formChildren": {
                    maxHeight: "100%"
                },
                ".kipFormElem.collapsible.collapsed .formChildren": {
                    maxHeight: "0px",
                    overflow: "hidden"
                },
                ".kipFormElem.collapsible .sectionHeaderContainer": {
                    display: "flex",
                    justifyContent: "space-between",
                    boxSizing: "border-box",
                    cursor: "pointer",
                    padding: "10px 10px",
                    borderRadius: "3px",
                    alignItems: "center"
                },
                ".kipFormElem.collapsible .caret": {
                    transformOrigin: "50% 50%",
                    width: ".8em",
                    fontSize: "1em",
                    transition: "all ease-in-out .1s",
                    cursor: "pointer"
                },
                ".kipFormElem.collapsible.collapsed .caret": {
                    transform: "rotate(180deg)"
                },
                ".kipFormElem.collapsible .sectionHeaderContainer:hover": {
                    backgroundColor: "#eee"
                }
            };
            return CollapsibleElement;
        }(Forms.FormElement));
        Forms.CollapsibleElement = CollapsibleElement;
        //#endregion
        //#region SECTION ELEMENT
        /**...........................................................................
         * @class SectionElement
         * ...........................................................................
         * create an element in the form that will contain other elements of a form
         * @version 1.0
         * ...........................................................................
         */
        var SectionElement = /** @class */ (function (_super) {
            __extends(SectionElement, _super);
            //#endregion
            //#region CONSTRUCT AND CREATE ELEMENTS
            /**...........................................................................
             * create a section element
             *
             * @param   id          Unique identifier for the section
             * @param   template    Template for the section itself
             * @param   children    All child elements of this section
             *...........................................................................
             */
            function SectionElement(id, template, children) {
                var _this = _super.call(this, id, template) || this;
                if (Forms.isFormElement(template)) {
                    children = template.children;
                }
                _this._parseChildren(children);
                return _this;
            }
            /** section elements are a merged set of themes */
            SectionElement.prototype._getUncoloredStyles = function () {
                return this._mergeThemes(SectionElement._uncoloredStyles, CollapsibleElement._uncoloredStyles, Forms.FormElement._uncoloredStyles);
            };
            /** update the appropriate theme color for the form */
            SectionElement.prototype.setThemeColor = function (idx, color) {
                _super.prototype.setThemeColor.call(this, idx, color);
                if (!this._children) {
                    return;
                }
                if (Forms.isFormElement(this._children)) {
                    this._children.setThemeColor(idx, color);
                }
                else {
                    KIP.map(this._children, function (child) {
                        child.setThemeColor(idx, color);
                    });
                }
            };
            Object.defineProperty(SectionElement.prototype, "children", {
                get: function () { return this._children; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SectionElement.prototype, "_defaultCls", {
                /** handle the defaults that all form elements need */
                get: function () { return "kipFormElem section"; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SectionElement.prototype, "_defaultValue", {
                get: function () { return {}; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SectionElement.prototype, "_type", {
                /** use a section type */
                get: function () { return Forms.FormElementTypeEnum.SECTION; },
                enumerable: true,
                configurable: true
            });
            /**...........................................................................
             * _onCreateElements
             * ...........................................................................
             * create elements for the section
             * ...........................................................................
             */
            SectionElement.prototype._onCreateElements = function () {
                // Create the title for the section
                this._createCollapsibleTitle();
                // Create the form children section
                this._elems.childrenContainer = KIP.createSimpleElement("", "formChildren", "", null, null, this._elems.core);
                this._createStyles();
            };
            /** create a clone of this element */
            SectionElement.prototype._createClonedElement = function (appendToID) {
                return new SectionElement(this._id + appendToID, this);
            };
            //#endregion
            //#region PARSE THE CHILDREN OF A SECTION
            /**...........................................................................
             * _parseChildren
             * ...........................................................................
             * parse the children array of this form element
             *
             * @param   children    The children for this section
             * ...........................................................................
             */
            SectionElement.prototype._parseChildren = function (children) {
                var _this = this;
                // quit if there isn't any data
                if (!children) {
                    children = {};
                    return;
                }
                // Handle when there is just a single element inside of this section
                if (Forms.isFormElement(children)) {
                    var elem = this._parseChild(children);
                    this._children = elem;
                    return;
                    // handle when there is a list of children
                }
                else {
                    this._children = {};
                    // go through each of the children
                    KIP.map(children, function (template, key) {
                        var elem = _this._parseChild(template);
                        _this._children[key] = elem;
                    });
                }
            };
            /**...........................................................................
             * parseChild
             * ...........................................................................
             * Go through our children array and create the individual children
             *
             * @param   child   The element to parse
             * ...........................................................................
             */
            SectionElement.prototype._parseChild = function (child) {
                var _this = this;
                var elem = this._parseElement(child);
                this._applyColors(elem);
                elem.render(this._elems.childrenContainer);
                KIP.Events.addEventListener(Forms.FORM_ELEM_CHANGE, {
                    func: function (event) {
                        var key = event.context.key;
                        if (key !== elem.id) {
                            return;
                        }
                        window.setTimeout(function () {
                            _this._updateInternalData(true);
                            _this._dispatchChangeEvent();
                        }, 0);
                    },
                    uniqueId: this._id + "|" + elem.id
                });
                return elem;
            };
            /**...........................................................................
             * _updateInternalData
             * ...........................................................................
             * Handle keeping our internal data tracking up to date with our children
             *
             * @param   internalOnly    If true, indicates that we aren't doing a full save
             * ...........................................................................
             */
            SectionElement.prototype._updateInternalData = function (internalOnly) {
                var _this = this;
                var elem;
                if (Forms.isFormElement(this._children)) {
                    this._data = this._children.save(internalOnly);
                }
                else {
                    if (this._data === null) {
                        return;
                    }
                    KIP.map(this._children, function (elem, key) {
                        _this._data[key] = elem.save(internalOnly);
                    });
                }
            };
            //#endregion
            //#region OVERRIDE SPECIAL BEHAVIOR FOR SECTIONS
            /**...........................................................................
             * save
             * ...........................................................................
             * Handle saving the section
             *
             * @param   internalOnly    If true, doesn't do all the updating that would
             *                          happen on a real save
             *
             * @returns The data contained in this sections child elements
             * ...........................................................................
             */
            SectionElement.prototype.save = function (internalOnly) {
                // save all of the child elements
                this._updateInternalData(internalOnly);
                return this._data;
            };
            /**...........................................................................
             * canSave
             * ...........................................................................
             * Determine whether this element can save, based on whether its children
             * have errors.
             *
             * @returns True if we can save this element
             * ...........................................................................
             */
            SectionElement.prototype.canSave = function () {
                // if we only have a single child, check that one
                if (Forms.isFormElement(this._children)) {
                    return this._children.canSave();
                    // otherwise, check all of our children
                }
                else {
                    var canSave_1 = {
                        hasErrors: false,
                        hasMissingRequired: false
                    };
                    KIP.map(this._children, function (child) {
                        var childCanSave = child.canSave();
                        canSave_1.hasErrors = canSave_1.hasErrors || childCanSave.hasErrors;
                        canSave_1.hasMissingRequired = canSave_1.hasMissingRequired || childCanSave.hasMissingRequired;
                    }, function () { return canSave_1.hasErrors && canSave_1.hasMissingRequired; });
                    return canSave_1;
                }
            };
            /**...........................................................................
             * _onClear
             * ...........................................................................
             * Clear out all child elements when clearing the section
             * ...........................................................................
             */
            SectionElement.prototype._onClear = function () {
                if (Forms.isFormElement(this._children)) {
                    this._children.clear();
                }
                else {
                    KIP.map(this._children, function (elem, key) {
                        elem.clear();
                    });
                }
            };
            //#endregion
            //#region HANDLE CHANGES
            /**...........................................................................
             * update
             * ...........................................................................
             * update the inter contents of the form
             *
             * @param   data    The new data for this element
             * ...........................................................................
             */
            SectionElement.prototype.update = function (data) {
                if (!data) {
                    return;
                }
                if (Forms.isFormElement(this._children)) {
                    this._children.update(data);
                }
                else {
                    KIP.map(this._children, function (elem, key) {
                        elem.update(data[key]);
                    });
                }
            };
            /**...........................................................................
             * _onChange
             * ...........................................................................
             * no validation for section elements
             * ...........................................................................
             */
            SectionElement.prototype._onChange = function () {
                return true;
            };
            //#endregion   
            //#region DYNAMICALLY ADD FIELDS TO THIS FORM
            SectionElement.prototype.addChildElement = function (key, formElem) {
                // if this section doesn't actually have keyed children, we can't do anything
                if (Forms.isFormElement(this._children)) {
                    return false;
                }
                // add to the children's array and to the UI
                this._children[key] = this._parseChild(formElem);
            };
            /** styles to display this section correctly */
            SectionElement._uncoloredStyles = {
                ".kipFormElem.section": {
                    marginTop: "10px",
                    marginBottom: "5px"
                },
                ".kipFormElem .sectionHeader": {
                    fontFamily: "OpenSansBold,Segoe UI,Helvetica",
                    fontSize: "1.5em",
                    color: "<0>",
                    fontWeight: "bold",
                },
                ".kipFormElem .section .sectionHeader, .kipFormElem .array .sectionHeader": {
                    fontSize: "1.2em",
                    color: "<1>"
                },
                ".kipFormElem.section .formChildren": {
                    marginLeft: "25px"
                }
            };
            return SectionElement;
        }(CollapsibleElement));
        Forms.SectionElement = SectionElement;
        //#endregion
        /**...........................................................................
         * @class ArrayElement
         * ...........................................................................
         * Create an element in the form that can be added to
         * @version 1.0
         * ...........................................................................
         */
        var ArrayElement = /** @class */ (function (_super) {
            __extends(ArrayElement, _super);
            //#endregion
            //#region CONSTRUCT THE FORM ELEMENT
            function ArrayElement(id, template, children) {
                var _this = _super.call(this, id, template) || this;
                if (Forms.isFormElement(template)) {
                    _this._childTemplate = template.childTemplate;
                }
                else {
                    _this._childTemplate = children;
                }
                // create the children array; this will be parsed after elements are created
                _this._children = [];
                return _this;
                //this._createNewChild();
            }
            Object.defineProperty(ArrayElement.prototype, "_type", {
                //#region PROPERTIES
                get: function () { return Forms.FormElementTypeEnum.ARRAY; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ArrayElement.prototype, "_defaultValue", {
                get: function () { return []; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ArrayElement.prototype, "_defaultCls", {
                get: function () { return "array"; },
                enumerable: true,
                configurable: true
            });
            ArrayElement.prototype._getUncoloredStyles = function () {
                return this._mergeThemes(ArrayElement._uncoloredStyles, CollapsibleElement._uncoloredStyles, Forms.FormElement._uncoloredStyles);
            };
            Object.defineProperty(ArrayElement.prototype, "childTemplate", {
                get: function () { return this._childTemplate; },
                enumerable: true,
                configurable: true
            });
            /** update the appropriate theme color for the form */
            ArrayElement.prototype.setThemeColor = function (idx, color) {
                _super.prototype.setThemeColor.call(this, idx, color);
                // if there are no children yet, apply to the child template
                if (!this._children || this._children.length === 0) {
                    if (Forms.isFormElement(this._childTemplate)) {
                        this._childTemplate.setThemeColor(idx, color);
                    }
                    else {
                        KIP.map(this._childTemplate, function (child) {
                            child.setThemeColor(idx, color);
                        });
                    }
                }
                KIP.map(this._children, function (child) {
                    child.setThemeColor(idx, color);
                });
            };
            ArrayElement.prototype._parseElemTemplate = function (template) {
                _super.prototype._parseElemTemplate.call(this, template);
                this._newLabel = template.newLabel || "+ Add New Element";
            };
            /** create the elements for the array */
            ArrayElement.prototype._onCreateElements = function () {
                var _this = this;
                // show the title
                this._createCollapsibleTitle();
                // handle showing the children
                this._elems.childrenContainer = KIP.createSimpleElement("", "formChildren", "", null, null, this._elems.core);
                this._elems.newButton = KIP.createSimpleElement("", "kipBtn new", this._newLabel, null, null, this._elems.core);
                this._elems.newButton.addEventListener("click", function () {
                    _this._createNewChild();
                });
                this._createStyles();
            };
            /** create a cloned version of this element */
            ArrayElement.prototype._createClonedElement = function (appendToID) {
                return new ArrayElement(this._id + appendToID, this);
            };
            //#endregion
            //#region HANDLE CHANGES
            /** array elements can always change */
            ArrayElement.prototype._onChange = function () {
                return true;
            };
            /** handle when an external force needs to update the form */
            ArrayElement.prototype.update = function (data) {
                var _this = this;
                if (!data) {
                    return;
                }
                // First clear out the existing data
                this._onClear();
                // recreate the children
                data.map(function (elem) {
                    var child = _this._createNewChild();
                    child.update(elem);
                });
            };
            //#endregion
            //#region HANDLE CHILDREN
            /** create a new child element in the array */
            ArrayElement.prototype._createNewChild = function () {
                var _this = this;
                var idx = this._children.length;
                var elem = new ArrayChildElement(this._id + "|" + idx.toString(), this._childTemplate);
                elem.addOrderingListener(this);
                this._applyColors(elem);
                this._children.push(elem);
                elem.render(this._elems.childrenContainer);
                KIP.Events.addEventListener(Forms.FORM_ELEM_CHANGE, {
                    func: function (event) {
                        var key = event.context.key;
                        if (key !== elem.id) {
                            return;
                        }
                        window.setTimeout(function () {
                            _this._updateInternalData(true);
                            _this._dispatchChangeEvent();
                        }, 0);
                    },
                    uniqueId: this.id + "|" + elem.id
                });
                return elem;
            };
            ArrayElement.prototype._updateInternalData = function (internalOnly) {
                this._data = [];
                var cnt = 0;
                // loop through all of the children we have to update the internal data structure
                for (cnt; cnt < this._children.length; cnt += 1) {
                    var elem = this._children[cnt];
                    if (KIP.isNullOrUndefined(elem)) {
                        continue;
                    }
                    var data = elem.save(internalOnly);
                    if (KIP.isNullOrUndefined(data)) {
                        continue;
                    }
                    this._data.push(data);
                }
            };
            //#endregion
            //#region OVERRIDE STANDARD FUNCTIONS THAT NEED CUSTOM LOGIC
            /**...........................................................................
            * save
            * ...........................................................................
            * Handle saving the section
            *
            * @param   internalOnly    If true, doesn't do all the updating that would
            *                          happen on a real save
            *
            * @returns The data contained in this sections child elements
            * ...........................................................................
            */
            ArrayElement.prototype.save = function (internalOnly) {
                // save all of the child elements
                this._updateInternalData(internalOnly);
                // return the data that was created
                return this._data;
            };
            /**...........................................................................
             * canSave
             * ...........................................................................
             * Determine whether this element can save, based on whether its children
             * have errors.
             *
             * @returns True if we can save this element
             * ...........................................................................
             */
            ArrayElement.prototype.canSave = function () {
                var canSave = {
                    hasErrors: false,
                    hasMissingRequired: false
                };
                KIP.map(this._children, function (child) {
                    var childCanSave = child.canSave();
                    canSave.hasErrors = canSave.hasErrors || childCanSave.hasErrors;
                    canSave.hasMissingRequired = canSave.hasMissingRequired || childCanSave.hasMissingRequired;
                }, function () { return canSave.hasErrors && canSave.hasMissingRequired; });
                return canSave;
            };
            /** handle clearing out the array */
            ArrayElement.prototype._onClear = function () {
                var _this = this;
                this._elems.childrenContainer.innerHTML = "";
                this._children.map(function (elem, idx) {
                    _this._children[idx] = null;
                });
            };
            ArrayElement.prototype.onChangeOrder = function (child, direction, moveTo) {
                // update data array
                var curIdx;
                for (var i = 0; i < this._children.length; i += 1) {
                    if (this._children[i] === child) {
                        curIdx = i;
                    }
                }
                var nextIdx = KIP.isNullOrUndefined(moveTo) ? curIdx + direction : moveTo;
                if (nextIdx < 0) {
                    nextIdx = 0;
                }
                if (nextIdx >= this._children.length) {
                    nextIdx = this._children.length - 1;
                }
                this._children.splice(curIdx, 1);
                this._children.splice(nextIdx, 0, child);
                // update UI array
                var childElem = this._elems.childrenContainer.children[curIdx];
                var nextSibling = this._elems.childrenContainer.children[nextIdx + (direction === Forms.DirectionType.FORWARD ? 1 : 0)];
                this._elems.childrenContainer.removeChild(childElem);
                if (nextSibling) {
                    this._elems.childrenContainer.insertBefore(childElem, nextSibling);
                }
                else {
                    this._elems.childrenContainer.appendChild(childElem);
                }
            };
            ArrayElement._uncoloredStyles = {
                ".kipBtn.new": {
                    marginTop: "10px",
                    marginBottom: "10px",
                    marginLeft: "25px",
                    backgroundColor: "<0>",
                    color: "#FFF",
                    width: "calc(33% - 15px)",
                },
                ".kipFormElem.array .arrayChild .arrayChild .kipBtn.new": {
                    width: "100%",
                    display: "block"
                },
                ".kipForm .kipBtn.new:hover": {
                    transform: "scale(1.01)"
                },
                ".kipFormElem.array .formChildren": {
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "top"
                },
                ".kipFormElem.array .formChildren .arrayChild": {
                    maxWidth: "calc(33% - 20px)"
                },
                ".kipFormElem.array .formChildren .arrayChild .arrayChild": {
                    maxWidth: "100%"
                },
                ".kipFormElem.array.collapsed .kipBtn.new": {
                    display: "none"
                }
            };
            return ArrayElement;
        }(CollapsibleElement));
        Forms.ArrayElement = ArrayElement;
        /**
         * Keep track of a child of an array in the form
         * @version 1.0
         */
        var ArrayChildElement = /** @class */ (function (_super) {
            __extends(ArrayChildElement, _super);
            //#endregion
            //#region CONSTRUCT AN ARRAY CHILD ELEMENT
            /** create an element of an array */
            function ArrayChildElement(id, children) {
                return _super.call(this, id.toString(), {}, children) || this;
            }
            Object.defineProperty(ArrayChildElement.prototype, "_type", {
                //#region PROPERTIES
                get: function () { return Forms.FormElementTypeEnum.ARRAY_CHILD; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ArrayChildElement.prototype, "_defaultValue", {
                get: function () { return {}; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ArrayChildElement.prototype, "_defaultCls", {
                get: function () { return "arrayChild"; },
                enumerable: true,
                configurable: true
            });
            ArrayChildElement.prototype._getUncoloredStyles = function () {
                return this._mergeThemes(ArrayChildElement._uncoloredStyles, CollapsibleElement._uncoloredStyles, Forms.FormElement._uncoloredStyles);
            };
            ArrayChildElement.prototype._onCreateElements = function () {
                var _this = this;
                this._elems.nextBtn = KIP.createElement({
                    cls: "next kipBtn",
                    content: ">",
                    parent: this._elems.core,
                    eventListeners: {
                        click: function () { _this._changeOrder(Forms.DirectionType.FORWARD); }
                    }
                });
                this._elems.prevBtn = KIP.createElement({
                    cls: "prev kipBtn",
                    content: "<",
                    parent: this._elems.core,
                    eventListeners: {
                        click: function () { _this._changeOrder(Forms.DirectionType.BACKWARD); }
                    }
                });
                this._elems.closeBtn = KIP.createSimpleElement("", "close kipBtn", "X", null, null, this._elems.core);
                this._elems.closeBtn.addEventListener("click", function () {
                    _this._delete();
                });
                this._elems.childrenContainer = KIP.createSimpleElement("", "formChildren", "", null, null, this._elems.core);
            };
            ArrayChildElement.prototype._createClonedElement = function (appendToID) {
                return new ArrayChildElement(this._id + appendToID, this._children);
            };
            ArrayChildElement.prototype._parseElement = function (child) {
                return _super.prototype._parseElement.call(this, child, "|" + this._id);
            };
            //#endregion
            //#region HANDLE DELETION
            ArrayChildElement.prototype._delete = function () {
                this._elems.core.parentNode.removeChild(this._elems.core);
                this._data = null;
                this._dispatchChangeEvent();
            };
            //#endregion
            //#region HANDLE ORDER CHANGING
            ArrayChildElement.prototype.addOrderingListener = function (orderListener) {
                this._orderlistener = orderListener;
            };
            ArrayChildElement.prototype._changeOrder = function (direction) {
                if (!this._orderlistener) {
                    return;
                }
                this._orderlistener.onChangeOrder(this, direction);
            };
            ArrayChildElement._uncoloredStyles = {
                ".kipFormElem.arrayChild": {
                    backgroundColor: "#FFF",
                    borderRadius: "5px",
                    boxShadow: "1px 1px 5px 2px rgba(0,0,0,.2)",
                    marginRight: "20px",
                    marginBottom: "10px",
                    padding: "15px",
                    nested: {
                        ".formChildren": {
                            margin: "10px",
                            marginTop: "0"
                        },
                        ".kipBtn": {
                            position: "absolute",
                            cursor: "pointer",
                            top: "calc(50% - 8px)",
                            transition: "all ease-in-out .2",
                            padding: "2px",
                            boxShadow: "none",
                            backgroundColor: "none",
                            color: "#555",
                            opacity: "0.5",
                            nested: {
                                "&.close": {
                                    top: "-10px",
                                    opacity: "1",
                                    color: "#FFF"
                                },
                                "&.next": {
                                    left: "calc(100% - 20px)"
                                },
                                "&.prev": {
                                    left: "0"
                                },
                                "&:hover": {
                                    transform: "scale(1.1)",
                                    opacity: "0.8"
                                }
                            }
                        },
                    }
                },
                ".formChildren > div.arrayChild:first-child .prev.kipBtn": {
                    display: "none"
                },
                ".formChildren > div.arrayChild:last-child .next.kipBtn": {
                    display: "none"
                }
            };
            return ArrayChildElement;
        }(SectionElement));
        Forms.ArrayChildElement = ArrayChildElement;
    })(Forms = KIP.Forms || (KIP.Forms = {}));
})(KIP || (KIP = {}));
///<reference path="formElement.ts" />
var KIP;
(function (KIP) {
    var Forms;
    (function (Forms) {
        /**...........................................................................
         * @class FileUploadElement
         * ...........................................................................
         * handle file uploads such that they return a file list
         * @version 1.0
         * ...........................................................................
         */
        var FileUploadElement = /** @class */ (function (_super) {
            __extends(FileUploadElement, _super);
            /**...........................................................................
             * Create a FileUploadElement
             *
             * @param   id          The unqiue ID for the element
             * @param   template    The template element to use as a basis for this element
             * ...........................................................................
             */
            function FileUploadElement(id, template) {
                return _super.call(this, id, template) || this;
            }
            Object.defineProperty(FileUploadElement.prototype, "_type", {
                /** track the type of form element this is */
                get: function () { return Forms.FormElementTypeEnum.FILE_UPLOAD; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileUploadElement.prototype, "_defaultCls", {
                /** give this for element a default CSS class */
                get: function () { return "file"; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileUploadElement.prototype, "_defaultValue", {
                /** set a default value for this form element type */
                get: function () { return null; },
                enumerable: true,
                configurable: true
            });
            /**...........................................................................
             * _parseElemTemplate
             * ...........................................................................
             *
             * @param template
             * ...........................................................................
             */
            FileUploadElement.prototype._parseElemTemplate = function (template) {
                _super.prototype._parseElemTemplate.call(this, template);
                this._attr = template.attr;
            };
            /**...........................................................................
             * _onCreateElements
             * ...........................................................................
             * Handle create elements
             * ...........................................................................
             */
            FileUploadElement.prototype._onCreateElements = function () {
                this._createStandardLabel(this._elems.core);
                this._elems.input = Forms.createInputElement("", "", "file", this._data, null, null, this._elems.core);
            };
            /**...........................................................................
             * _onChange
             * ...........................................................................
             * Handle when the user has uploaded a file
             *
             * @returns True if the file passes validation
             * ...........................................................................
             */
            FileUploadElement.prototype._onChange = function () {
                var files = this._elems.input.files;
                return this._standardValidation(files);
            };
            /**...........................................................................
             * _createClonedElement
             * ...........................................................................
             * Handle cloning this element
             *
             * @param   appendToId  The ID to append to the cloned element
             *
             * @returns The created cloned element
             * ...........................................................................
             */
            FileUploadElement.prototype._createClonedElement = function (appendToId) {
                return new FileUploadElement(this.id + appendToId, this);
            };
            return FileUploadElement;
        }(Forms.FormElement));
        Forms.FileUploadElement = FileUploadElement;
        /**...........................................................................
         * @class FilePathElement
         * ...........................................................................
         * handle a file-upload field that supports just a file path
         * @version 1.0
         * ...........................................................................
         */
        var FilePathElement = /** @class */ (function (_super) {
            __extends(FilePathElement, _super);
            //#endregion
            /**...........................................................................
             * Create the file path element
             *
             * @param   id          Unique ID for this element
             * @param   template    Template to use to create this element
             * ...........................................................................
             */
            function FilePathElement(id, template) {
                return _super.call(this, id, template) || this;
            }
            Object.defineProperty(FilePathElement.prototype, "_type", {
                /** select the appropriate type for the file path type */
                get: function () { return Forms.FormElementTypeEnum.FILE_PATH; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FilePathElement.prototype, "_defaultCls", {
                /** set a default class for file-path elements */
                get: function () { return "filepath"; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FilePathElement.prototype, "_defaultValue", {
                /** set a default value for file-path elements */
                get: function () { return ""; },
                enumerable: true,
                configurable: true
            });
            /**...........................................................................
             * _parseElemTemplate
             * ...........................................................................
             * Handle creating this element off of a template
             *
             * @param   template
             * ...........................................................................
             */
            FilePathElement.prototype._parseElemTemplate = function (template) {
                _super.prototype._parseElemTemplate.call(this, template);
                this._onSaveCallback = template.onSave;
                this._onChangeCallback = template.onChange;
                this._attr = template.attr;
            };
            FilePathElement.prototype._onCreateElements = function () {
                this._createStandardLabel(this._elems.core);
                this._elems.display = KIP.createSimpleElement("", "display", this._data, null, null, this._elems.core);
                this._elems.inputContainer = KIP.createSimpleElement("", "fileContainer", "", null, null, this._elems.core);
                this._elems.input = Forms.createInputElement(this._id + "|input", "", "file", "", null, null, this._elems.inputContainer);
                this._elems.inputLabel = Forms.createLabelForInput("Upload File", this._id + "|input", "filepath", this._elems.inputContainer);
            };
            /**...........................................................................
             * _onChange
             * ...........................................................................
             * handle when the data in this element changes
             * ...........................................................................
             */
            FilePathElement.prototype._onChange = function () {
                // check if the link is the one that changed, and if so, update that
                if (!KIP.isNullOrUndefined(this._tempLink)) {
                    return this._onLinkChange();
                }
                // quit if we can't turn this element into a string (rare)
                if (!this._onChangeCallback) {
                    return false;
                }
                this._files = this._elems.input.files;
                console.log(this._files);
                if (!this._files) {
                    return true;
                }
                // Handle the change event
                var str = this._onChangeCallback(this._files);
                if (this._standardValidation(str)) {
                    return true;
                }
            };
            FilePathElement.prototype._onLinkChange = function () {
                var out = this._standardValidation(this._tempLink); // Check if we can set that link
                this._tempLink = null; // Clear it in either case
                return out; // Quit with the result
            };
            FilePathElement.prototype.update = function (data) {
                this._data = data;
                this._elems.display.innerHTML = data;
                this._elems.input.value = "";
            };
            FilePathElement.prototype.save = function (internalOnly) {
                if (internalOnly) {
                    return;
                } // Don't do anything if this is an internal change
                if (this._files) {
                    if (!this._onSaveCallback) {
                        return "";
                    } // Don't do anything if we don't have a callback
                    this._onSaveCallback(this._files); // Run our callback
                }
                return this._data; // Return the appropriate data
            };
            FilePathElement.prototype._createClonedElement = function (appendToID) {
                return new FilePathElement(this.id + appendToID, this);
            };
            //#region PROPERTIES
            /** style elements for the file path */
            FilePathElement._uncoloredStyles = {
                ".kipFormElem.filepath input[type=file]": {
                    display: "none"
                },
                ".kipFormElem.filepath label.filepath": {
                    backgroundColor: "<0>",
                    color: "#FFF",
                    borderRadius: "2px",
                    boxShadow: "1px 1px 5px 2px rgba(0,0,0,.1)",
                    padding: "10px",
                    fontSize: "0.7em",
                    cursor: "pointer"
                },
                ".kipFormElem.filepath .display": {
                    fontSize: "0.6em",
                    whiteSpace: "break"
                }
            };
            return FilePathElement;
        }(Forms.FormElement));
        Forms.FilePathElement = FilePathElement;
        /**...........................................................................
         * @class PhotoPathElement
         * ...........................................................................
         * create an element to upload photos
         * @version 1.0
         * ...........................................................................
         */
        var PhotoPathElement = /** @class */ (function (_super) {
            __extends(PhotoPathElement, _super);
            function PhotoPathElement() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(PhotoPathElement.prototype, "_defaultCls", {
                /** default class for this element */
                get: function () { return "photopath"; },
                enumerable: true,
                configurable: true
            });
            /**...........................................................................
             * _onCreateElements
             * ...........................................................................
             * Handle creating elements for the form element
             * ...........................................................................
             */
            PhotoPathElement.prototype._onCreateElements = function () {
                var _this = this;
                this._elems.photoWrapper = KIP.createSimpleElement("", "photoWrapper", "", null, null, this._elems.core);
                this._elems.display = KIP.createElement({
                    type: "img",
                    cls: "photo",
                    attr: {
                        "src": this._data
                    },
                    parent: this._elems.photoWrapper
                });
                // draw the photo element
                this._elems.overlay = KIP.createSimpleElement("", "photoOverlay", "", null, null, this._elems.photoWrapper);
                // handle setting a manual link
                this._elems.linkBtn = KIP.createSimpleElement("", "photoBtn link", "CHANGE LINK", null, null, this._elems.overlay);
                this._elems.linkBtn.addEventListener("click", function () {
                    var linkURL = window.prompt("What should the link be set to?", _this._data);
                    _this._tempLink = linkURL;
                    _this._changeEventFired();
                });
                // Draw the option for file upload
                this._elems.input = Forms.createInputElement(this._id + "|input", "photoInput", "file", "", null, null, this._elems.overlay);
                this._elems.uploadBtn = Forms.createLabelForInput("UPLOAD", this._id + "|input", "photoBtn upload", this._elems.overlay);
                this._elems.input.addEventListener("change", function () {
                    _this._changeEventFired();
                    _this._onFileSelected();
                });
            };
            /**...........................................................................
             * _createClonedElement
             * ...........................................................................
             * Handle cloning this element
             *
             * @param   appendToID  If provided, the ID to append to this element
             *
             * @returns The created cloned element
             * ...........................................................................
             */
            PhotoPathElement.prototype._createClonedElement = function (appendToID) {
                return new PhotoPathElement(this.id + appendToID, this);
            };
            /**...........................................................................
             * update
             * ...........................................................................
             * @param data
             * ...........................................................................
             */
            PhotoPathElement.prototype.update = function (data) {
                this._data = data;
                if (!this._data) {
                    return;
                }
                this._elems.display.src = data;
            };
            /**...........................................................................
             * _onFileSelected
             * ...........................................................................
             *
             * ...........................................................................
             */
            PhotoPathElement.prototype._onFileSelected = function () {
                var _this = this;
                var file;
                // Quit early if we don't have any files
                if (!this._files) {
                    return;
                }
                // Try to grab the first file & quit if we can't
                file = this._files[0];
                if (!file) {
                    return;
                }
                var fileReader = new FileReader();
                fileReader.addEventListener("load", function () {
                    window.setTimeout(function () {
                        var photoURL = fileReader.result;
                        _this._elems.display.src = photoURL;
                    }, 0);
                });
                // read the file
                fileReader.readAsDataURL(file);
            };
            /**...........................................................................
             * _onLinkChange
             * ...........................................................................
             *
             * ...........................................................................
             */
            PhotoPathElement.prototype._onLinkChange = function () {
                var link = this._tempLink;
                var out = _super.prototype._onLinkChange.call(this);
                this._elems.display.src = link;
                return out;
            };
            /**...........................................................................
             * _onClear
             * ...........................................................................
             *
             * ...........................................................................
             */
            PhotoPathElement.prototype._onClear = function () {
                this._data = "";
                this._elems.display.src = ""; // reset the photolink
            };
            /** style the elements for this form element */
            PhotoPathElement._uncoloredStyles = {
                ".kipFormElem.photopath .photoOverlay": {
                    backgroundColor: "rgba(0,0,0,.5)",
                    opacity: "0",
                    transition: ".1s opacity ease-in-out",
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                    width: "100%",
                    height: "100%",
                    left: "0",
                    top: "0",
                    justifyContent: "center",
                    alignItems: "center"
                },
                ".kipFormElem.photopath .photoWrapper:hover .photoOverlay": {
                    opacity: "1"
                },
                ".kipFormElem.photopath .photoWrapper": {
                    width: "100px",
                    height: "100px",
                    borderRadius: "50px",
                    border: "1px solid <0>",
                    overflow: "hidden",
                    position: "relative"
                },
                ".kipFormElem.photopath .photoWrapper img": {
                    width: "100%"
                },
                ".kipFormElem.photopath .photoWrapper .photoBtn": {
                    width: "100%",
                    backgroundColor: "<0>",
                    color: "#FFF",
                    textAlign: "center",
                    fontSize: "0.7em",
                    cursor: "pointer",
                    marginTop: "6px",
                    opacity: "0.8"
                },
                ".kipFormElem.photopath .photoWrapper .photoBtn:hover": {
                    opacity: "1"
                },
                ".kipFormElem.photopath .photoWrapper input[type='file']": {
                    display: "none"
                }
            };
            return PhotoPathElement;
        }(FilePathElement));
        Forms.PhotoPathElement = PhotoPathElement;
    })(Forms = KIP.Forms || (KIP.Forms = {}));
})(KIP || (KIP = {}));
///<reference path="../drawable.ts" />
///<reference path="formConstants.ts" />
var KIP;
(function (KIP) {
    var Forms;
    (function (Forms) {
        /**
         * create a form with a data structure of F
         * @version 1.0
         */
        var Form = /** @class */ (function (_super) {
            __extends(Form, _super);
            //#endregion
            //#region CONSTRUCTOR
            /**...........................................................................
             * Form
             * ...........................................................................
             * Create the Form
             *
             * @param   id          Unique ID for the form
             * @param   options     Specific way this form should be created
             * @param   elems       Form elements that should be shown for this form
             * ...........................................................................
             */
            function Form(id, options, elems) {
                var _this = _super.call(this) || this;
                _this._addClassName("Form");
                _this._id = id;
                _this._showAsPopup = options.popupForm;
                _this._noStandardStyles = options.noStandardStyles;
                _this._hidden = true;
                _this._additionalButtons = options.addlButtons || [];
                _this._hasChanges = false;
                _this._canSaveTracker = { hasMissingRequired: false, hasErrors: false };
                _this._colors = options.colors || ["#4A5", "#284"];
                _this._applyColors();
                // handle listeners
                _this._saveListeners = new KIP.Collection();
                _this._cancelListeners = new KIP.Collection();
                _this._createElements();
                _this._createCoreElem(options, elems);
                _this._addWindowEventListeners();
                return _this;
            }
            Object.defineProperty(Form.prototype, "data", {
                /** get the appropriate data out of this form */
                get: function () {
                    return this._coreFormElem.save(true);
                },
                enumerable: true,
                configurable: true
            });
            //#endregion
            //#region CREATE ELEMENTS
            /**...........................................................................
             * _createElements
             * ...........................................................................
             * Create the elements used by the form
             * ...........................................................................
             */
            Form.prototype._createElements = function () {
                this._elems = {
                    base: KIP.createSimpleElement(this._id, "kipForm hidden"),
                    background: KIP.createSimpleElement("", "background"),
                    formContent: KIP.createSimpleElement("", "formContent")
                };
                this._createPopupElements();
                this._elems.background.appendChild(this._elems.formContent);
                this._createButtons();
                if (!this._noStandardStyles) {
                    this._createStyles();
                }
            };
            /**...........................................................................
             * _createPopupElements
             * ...........................................................................
             * create the elements needed for the popup version of the form
             * ...........................................................................
             */
            Form.prototype._createPopupElements = function () {
                // If we aren't showing as a popup, add the BG directly to the base
                if (!this._showAsPopup) {
                    this._elems.base.appendChild(this._elems.background);
                    return;
                }
                // Create the elements that are only used for the popup version of the form
                KIP.addClass(this._elems.base, "popup");
                this._elems.overlay = KIP.createSimpleElement("", "formOverlay", "", null, null, this._elems.base);
                this._elems.overlay.appendChild(this._elems.background);
                this._elems.closeButton = KIP.createSimpleElement("", "close kipBtn", "x", null, null, this._elems.background);
            };
            /**...........................................................................
             * _createButtons
             * ...........................................................................
             * create the appropriate buttons for the form
             * ...........................................................................
             */
            Form.prototype._createButtons = function () {
                var _this = this;
                this._elems.buttons = KIP.createSimpleElement("", "kipBtns", "", null, null, this._elems.background);
                this._elems.saveButton = KIP.createSimpleElement("", "kipBtn save", "Save", null, null, this._elems.buttons);
                this._elems.saveButton.addEventListener("click", function () {
                    _this.trySave();
                    _this.hide();
                });
                this._elems.cancelButton = KIP.createSimpleElement("", "kipBtn cancel", "Cancel", null, null, this._elems.buttons);
                this._elems.cancelButton.addEventListener("click", function () {
                    window.setTimeout(function () {
                        _this._cancelConfirmation();
                    }, 10);
                });
                // if we have additional buttons add them here
                if (!this._additionalButtons) {
                    return;
                }
                var idx = 0;
                var _loop_1 = function () {
                    var btnTemplate = this_1._additionalButtons[idx];
                    var btn = KIP.createSimpleElement("", "kipBtn " + btnTemplate.cls, btnTemplate.display, null, null, this_1._elems.buttons);
                    btn.addEventListener("click", function () {
                        btnTemplate.callback();
                    });
                };
                var this_1 = this;
                for (idx; idx < this._additionalButtons.length; idx += 1) {
                    _loop_1();
                }
            };
            /**...........................................................................
             * _createCoreElem
             * ...........................................................................
             * create the core section that will display all of our data
             *
             * @param   options     the options that are passed in for the general form
             * @param   elems       Elements associated with this form
             * ...........................................................................
             */
            Form.prototype._createCoreElem = function (options, elems) {
                var _this = this;
                // create the template that will render the section
                var template = {
                    type: Forms.FormElementTypeEnum.SECTION,
                    label: options.label,
                    cls: options.cls,
                    layout: options.layout,
                };
                // create the core section
                this._coreFormElem = new Forms.SectionElement(this._id, template, elems);
                this._applyColors(this._coreFormElem);
                this._coreFormElem.expand();
                // add the event listener to the section changing
                KIP.Events.addEventListener(Forms.FORM_ELEM_CHANGE, {
                    func: function (event) {
                        var key = event.context.key;
                        if (key !== _this._id) {
                            return;
                        }
                        _this._hasChanges = true;
                    },
                    uniqueId: this._id + "|form"
                });
                // add listener for savable changes
                this._addSaveButtonUpdater();
                // add the section to the overall form UI
                this._coreFormElem.render(this._elems.formContent);
            };
            //#endregion
            Form.prototype._addSaveButtonUpdater = function () {
                var _this = this;
                KIP.Events.addEventListener(Forms.FORM_SAVABLE_CHANGE, {
                    func: function (event) {
                        var canSave = _this._canSave();
                        if (!canSave) {
                            _this._elems.saveButton.title = _this._getCannotSaveMessage();
                            KIP.addClass(_this._elems.saveButton, "disabled");
                        }
                        else {
                            _this._elems.saveButton.title = "";
                            KIP.removeClass(_this._elems.saveButton, "disabled");
                        }
                    }
                });
            };
            //#region DATA MANIPULATIONS
            /**...........................................................................
             * save
             * ...........................................................................
             * Saves data in the form
             *
             * @returns The data contained in the form
             * ...........................................................................
             */
            Form.prototype._save = function () {
                var data = this._coreFormElem.save();
                // Alert any listeners of this particular form that 
                this._notifySaveListeners(data);
                this._hasChanges = false;
                return data;
            };
            /**...........................................................................
             * trySave
             * ...........................................................................
             * Attempt to save the form
             * ...........................................................................
             */
            Form.prototype.trySave = function () {
                if (KIP.hasClass(this._elems.saveButton, "disabled")) {
                    return null;
                }
                if (!this._canSave()) {
                    this._showCannotSaveMessage();
                    return null;
                }
                else {
                    return this._save();
                }
            };
            /**...........................................................................
             * _canSave
             * ...........................................................................
             * Check with our elements that we are able to save
             * ...........................................................................
             */
            Form.prototype._canSave = function () {
                this._canSaveTracker = this._coreFormElem.canSave();
                return !(this._canSaveTracker.hasErrors || this._canSaveTracker.hasMissingRequired);
            };
            /**...........................................................................
             * _showCannotSaveMessage
             * ...........................................................................
             * Show popup indicating why we couldn't save this form
             * ...........................................................................
             */
            Form.prototype._showCannotSaveMessage = function () {
                var msg = this._getCannotSaveMessage();
                if (!msg) {
                    return;
                }
                var popup = new KIP.ErrorPopup(msg, "Couldn't Save");
                popup.setThemeColor(0, this._colors[0]);
                popup.setThemeColor(1, this._colors[1]);
                popup.draw(document.body);
            };
            /**...........................................................................
             * _getCannotSaveMessage
             * ...........................................................................
             * Determine what message to show as to why the form cannot be saved
             * ...........................................................................
             */
            Form.prototype._getCannotSaveMessage = function () {
                var msg = "";
                if (this._canSaveTracker.hasErrors && this._canSaveTracker.hasMissingRequired) {
                    msg = "This form has missing data and errors; correct errors and fill in all required fields before saving.";
                }
                else if (this._canSaveTracker.hasErrors) {
                    msg = "There are some errors in your form; correct them before saving.";
                }
                else if (this._canSaveTracker.hasMissingRequired) {
                    msg = "There are some fields with missing data; fill them in before saving.";
                }
                return msg;
            };
            /**...........................................................................
             * _notifySaveListeners
             * ...........................................................................
             * lets all listeners know that the form has saved
             *
             * @param  data    The form data that was just saved
             * ...........................................................................
             */
            Form.prototype._notifySaveListeners = function (data) {
                this._saveListeners.map(function (listener) {
                    if (!listener) {
                        return;
                    }
                    listener(data);
                });
            };
            /**...........................................................................
             * _cancelConfirmation
             * ...........................................................................
             * Handle informing the user that they have unsaved changes before cancelling
             * ...........................................................................
             */
            Form.prototype._cancelConfirmation = function () {
                var _this = this;
                if (this._hasChanges) {
                    var popup = new KIP.YesNoPopup("You have unsaved changes. Are you sure you want to cancel?", function (response) {
                        if (response === KIP.YesNoEnum.YES) {
                            _this._cancel();
                        }
                    });
                    popup.setThemeColor(0, this._colors[0]);
                    popup.draw(document.body);
                }
                else {
                    this._cancel();
                }
            };
            /**...........................................................................
             * _cancel
             * ...........................................................................
             * Cancel the form and any changes within it
             * ...........................................................................
             */
            Form.prototype._cancel = function () {
                this.clear();
                this._notifyCancelListeners(this._hasChanges);
                this._hasChanges = false;
                this.hide();
            };
            Form.prototype.tryCancel = function (ignoreUnsavedChanges) {
                if (!this._hasChanges || ignoreUnsavedChanges) {
                    this._cancel();
                    return true;
                }
                else {
                    // show the popup
                    this._cancelConfirmation();
                    // tell the caller that they should wait for the cancel listener
                    return false;
                }
            };
            /**...........................................................................
             * _notifyCancelListeners
             * ...........................................................................
             * lets all listeners know that the form has been canceled
             *
             * @param   hasChanges  True if the form has been changed since initialization
             * ...........................................................................
             */
            Form.prototype._notifyCancelListeners = function (hasChanges) {
                this._cancelListeners.map(function (listener) {
                    if (!listener) {
                        return;
                    }
                    listener(hasChanges);
                });
            };
            /**...........................................................................
             * clear
             * ...........................................................................
             * clears all data out of the form
             * ...........................................................................
             */
            Form.prototype.clear = function () {
                this._coreFormElem.clear();
            };
            /**...........................................................................
             * update
             * ...........................................................................
             * update the data in the form to match a particular data set
             *
             * @param   data    The data to update the form with
             * ...........................................................................
             */
            Form.prototype.update = function (data) {
                this._coreFormElem.update(data);
                this._hasChanges = false;
            };
            //#endregion
            //#region TRACK CHANGES
            Form.prototype.undo = function () {
                // TODO
            };
            Form.prototype.redo = function () {
            };
            Form.prototype._trackChanges = function () {
                // TODO
            };
            //#endregion
            //#region HIDE OR SHOW THE FORM
            /**...........................................................................
             * show
             * ...........................................................................
             * show the form on the appropriate parent
             * ...........................................................................
             */
            Form.prototype.show = function () {
                if (!this._hidden) {
                    return;
                }
                KIP.removeClass(this._elems.base, "hidden");
            };
            /**...........................................................................
             * hide
             * ...........................................................................
             * hide the form
             * ...........................................................................
             */
            Form.prototype.hide = function () {
                if (this._hidden) {
                    return;
                }
                KIP.addClass(this._elems.base, "hidden");
            };
            /**...........................................................................
             * draw
             * ...........................................................................
             * Draw the form element on whatever parent is specified
             * (defaults to document.body)
             *
             * @param   parent  The element to add to
             * @param   noShow  If true, doesn't show the form as a oart of this draw
             * ...........................................................................
             */
            Form.prototype.draw = function (parent, noShow) {
                _super.prototype.draw.call(this, parent);
                if (!this._elems.base.parentNode) {
                    document.body.appendChild(this._elems.base);
                }
                if (!noShow) {
                    this.show();
                }
            };
            //#endregion
            //#region Handle Listeners
            /**...........................................................................
             * registerSaveListener
             * ...........................................................................
             * register any listener that wants to hear about this form saving
             *
             * @param   listener    The function to call when the form is saved
             *
             * @returns The key with which the event is registered
             * ...........................................................................
             */
            Form.prototype.registerSaveListener = function (listener) {
                var key = this._saveListeners.length.toString();
                this._saveListeners.addElement(key, listener);
                return key;
            };
            /**...........................................................................
             * registerCancelListener
             * ...........................................................................
             * registers any listener that wants to hear about this form canceling
             *
             * @param   listener       The function to call when the form is cancelled
             *
             * @returns The key with which the event is registered
             * ...........................................................................
             */
            Form.prototype.registerCancelListener = function (listener) {
                var key = this._cancelListeners.length.toString();
                this._cancelListeners.addElement(key, listener);
                return key;
            };
            Form.prototype._addWindowEventListeners = function () {
                var _this = this;
                window.addEventListener("beforeunload", function (e) {
                    if (_this._hasChanges) {
                        var msg = "You have unsaved changes; are you sure you want to leave this page?";
                        e.returnValue = msg;
                        return msg;
                    }
                });
            };
            //#endregion
            //#region CHANGE THE FORM DISPLAY
            Form.prototype.addFormElement = function (key, formElem) {
                return this._coreFormElem.addChildElement(key, formElem);
            };
            //#region PROPERTIES
            /** handle standard styles for the form */
            Form._uncoloredStyles = {
                ".kipForm": {
                    margin: "0",
                    padding: "0",
                    width: "100%",
                    height: "100%",
                    fontFamily: "OpenSansLight,Segoe UI,Helvetica",
                    fontSize: "1.2em",
                    position: "inherit",
                    boxSizing: "border-box"
                },
                ".kipForm.hidden": {
                    display: "none"
                },
                ".kipForm .formOverlay": {
                    position: "fixed",
                    width: "100%",
                    height: "100%",
                    top: "0",
                    left: "0",
                    backgroundColor: "rgba(0,0,0,.6)"
                },
                ".kipForm .background": {
                    borderRadius: "2px",
                    backgroundColor: "#FFF",
                    width: "60%",
                    marginLeft: "20%",
                    maxHeight: "90%",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column"
                },
                ".kipForm .formOverlay .background": {
                    marginTop: "2%"
                },
                ".kipForm .formContent": {
                    overflowY: "auto",
                    position: "relative",
                    padding: "5px",
                    paddingRight: "15px",
                    flexGrow: "1"
                },
                ".kipForm .kipBtns": {
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "3px 5px",
                    flexShrink: "0",
                    zIndex: "5"
                },
                ".kipForm.popup .kipBtns": {
                    boxShadow: "0px -2px 2px 1px rgba(0,0,0,.15)"
                },
                ".kipForm .kipBtn": {
                    padding: "5px 20px",
                    marginRight: "10px",
                    cursor: "pointer",
                    borderRadius: "2px",
                    boxShadow: "1px 1px 5px 2px rgba(0,0,0,.1)",
                    fontSize: "1.2em",
                    boxSizing: "border-box",
                    textAlign: "center",
                    transition: "all ease-in-out .1s"
                },
                ".kipForm .kipBtn:not(.disabled):hover, .kipForm .kipBtn.selected": {
                    transform: "scale(1.05)"
                },
                ".kipForm .save.kipBtn": {
                    backgroundColor: "<0>",
                    color: "#FFF",
                    width: "20%"
                },
                ".kipForm .save.kipBtn.disabled": {
                    backgroundColor: "#888",
                    color: "#FFF",
                    opacity: "0.5",
                    cursor: "unset"
                },
                ".kipForm .close.kipBtn": {
                    borderRadius: "100%",
                    border: "2px solid #999",
                    width: "24px",
                    height: "24px",
                    backgroundColor: "#999",
                    color: "#FFF",
                    padding: "0",
                    position: "absolute",
                    top: "-12px",
                    left: "calc(100% - 12px)",
                    boxSizing: "content-box",
                    textAlign: "center",
                    fontSize: "20px"
                },
                ".kipForm .cancel.kipBtn": {
                    backgroundColor: "#999",
                    color: "#FFF"
                }
            };
            return Form;
        }(KIP.Drawable));
        Forms.Form = Form;
        //#region EVENT HANDLER FOR FORMS
        // create a particular event for all form change events
        Forms.FORM_ELEM_CHANGE = "formelemchange";
        KIP.Events.createEvent({
            name: "Form Element Changed",
            key: Forms.FORM_ELEM_CHANGE
        });
        Forms.FORM_SAVABLE_CHANGE = "formsavablechange";
        KIP.Events.createEvent({
            name: "Form Savable Change",
            key: Forms.FORM_SAVABLE_CHANGE
        });
        //#endregion
    })(Forms = KIP.Forms || (KIP.Forms = {}));
})(KIP || (KIP = {}));
///<reference path="formElement.ts" />
var KIP;
(function (KIP) {
    var Forms;
    (function (Forms) {
        function cloneTemplate(template) {
            var temp = {
                type: template.type,
                value: template.value,
                position: template.position,
                required: template.required,
                onValidate: template.onValidate,
                onOtherChange: template.onOtherChange,
                label: template.label,
                cls: template.cls,
                layout: template.layout
            };
            return temp;
        }
        Forms.cloneTemplate = cloneTemplate;
        /**
         * Creates a select element with associated options
         * @param id - ID to use for the select element
         * @param cls - the CSS class to use to style this select box
         * @param options - What options should be included in the select box
         * @param defaultSelection - What should be selected by default
         */
        function createSelectElement(id, cls, options, defaultSelection) {
            var optionElems = [];
            var optKey;
            // turn the option array into something the createElement function will understand
            KIP.map(options, function (lbl, value) {
                var def = {
                    type: "option",
                    attr: {
                        value: value
                    },
                    content: lbl,
                };
                if (defaultSelection === value) {
                    def.attr.selected = "true";
                }
                optionElems.push(def);
            });
            // create the general definition for the select element
            var obj = {
                id: id,
                cls: cls,
                type: "select",
                children: optionElems
            };
            // return the created select box
            return KIP.createElement(obj);
        }
        Forms.createSelectElement = createSelectElement;
        ;
        /**
         * Creates a checkbox element & a wrapper around it
         * @param id - ID to use for the checkbox
         * @param cls - the CSS class to style this checkbox
         * @param lbl - What label to use for this checkbox
         * @param checked - True if the checkbox should be checked
         */
        function createLabeledCheckbox(id, cls, lbl, checked) {
            // create the wrapper to hold the checkbox + label
            var wrapperElem = KIP.createSimpleElement(id + "|wrapper", cls + "|wrapper");
            // create the checkbox itself
            var checkboxDef = {
                type: "input",
                id: id,
                cls: cls,
                attr: {
                    type: "checkbox",
                    checked: checked.toString(),
                    name: id
                },
                parent: wrapperElem
            };
            var checkboxElem = KIP.createElement(checkboxDef);
            // create the label for the checkbox
            var lblElem = KIP.createSimpleElement("", cls + "|lbl", lbl, { for: id }, null, wrapperElem);
            // return the wrapper + the checkbox
            return {
                wrapper: wrapperElem,
                checkbox: checkboxElem
            };
        }
        Forms.createLabeledCheckbox = createLabeledCheckbox;
        /** creates a label that will be clickable to select an associated input */
        function createLabelForInput(lbl, labelFor, cls, embedIn) {
            var lblElement = KIP.createElement({
                type: "label",
                cls: cls,
                attr: {
                    for: labelFor
                },
                content: lbl,
                parent: embedIn
            });
            return lblElement;
        }
        Forms.createLabelForInput = createLabelForInput;
        function createRadioButtons() {
            //TODO: IMPLEMENT
        }
        Forms.createRadioButtons = createRadioButtons;
        /**
         * Create an input element
         * @param id
         * @param cls
         * @param type
         * @param value
         * @param attr
         * @param children
         * @param parent
         */
        function createInputElement(id, cls, type, value, attr, children, parent) {
            var elemType = "input";
            // handle the type
            type = type.toLowerCase();
            if (type === "textarea") {
                type = "";
                elemType = "textarea";
            }
            // update the attribute array
            attr = attr || {};
            attr.type = type;
            if (value) {
                if (type === "checkbox" || type === "radio") {
                    attr.checked = value;
                }
                else if (type === "date") {
                    attr.value = KIP.Dates.inputDateFmt(value);
                }
                else {
                    attr.value = value;
                }
            }
            // create the appropriate element
            var elem = KIP.createElement({
                type: elemType,
                id: id,
                cls: cls,
                attr: attr,
                children: children,
                parent: parent
            });
            // return the element
            return elem;
        }
        Forms.createInputElement = createInputElement;
    })(Forms = KIP.Forms || (KIP.Forms = {}));
})(KIP || (KIP = {}));
///<reference path="formElement.ts" />
var KIP;
(function (KIP) {
    var Forms;
    (function (Forms) {
        /**...........................................................................
         * @class CheckElement
         * ...........................................................................
         * create a checkbox form element
         * @version 1.0
         * ...........................................................................
         */
        var CheckElement = /** @class */ (function (_super) {
            __extends(CheckElement, _super);
            function CheckElement() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(CheckElement.prototype, "_type", {
                get: function () { return Forms.FormElementTypeEnum.CHECKBOX; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CheckElement.prototype, "_defaultValue", {
                get: function () { return false; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CheckElement.prototype, "_defaultCls", {
                get: function () { return "check"; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CheckElement.prototype, "_layout", {
                get: function () { return Forms.FormElementLayoutEnum.LABEL_AFTER; },
                enumerable: true,
                configurable: true
            });
            CheckElement.prototype._getUncoloredStyles = function () {
                return this._mergeThemes(CheckElement._uncoloredStyles, Forms.FormElement._uncoloredStyles);
            };
            /** create the check elements */
            CheckElement.prototype._onCreateElements = function () {
                this._createStandardInput();
                // Create the custom UI for the checkbox
                this._elems.lbl = Forms.createLabelForInput("", this._id + "|input", "", this._elems.core);
                this._elems.inputBox = KIP.createSimpleElement("", "inputBox", "", null, null, this._elems.lbl);
                this._elems.inputInnerBox = KIP.createSimpleElement("", "innerInputBox", "", null, null, this._elems.inputBox);
                this._elems.innerLbl = KIP.createSimpleElement("", "innerLbl", this._label, null, null, this._elems.lbl);
                this._handleStandardLayout();
            };
            /** handle when the checkbox is clicked */
            CheckElement.prototype._onChange = function () {
                var value = this._elems.input.checked;
                return this._standardValidation(value);
            };
            /** clone the appropriate element */
            CheckElement.prototype._createClonedElement = function (appendToID) {
                return new CheckElement(this._id + appendToID, this);
            };
            /** update the contents of the element */
            CheckElement.prototype.update = function (data) {
                this._data = data;
                this._elems.input.checked = data;
            };
            CheckElement._uncoloredStyles = {
                '.kipFormElem input[type="checkbox"]': {
                    display: "none",
                    zoom: "1.5",
                    width: "18px",
                    height: "18px",
                    margin: "0",
                    marginRight: "5px",
                    border: "1px solid <0>"
                },
                ".kipFormElem input[type='checkbox'] + label": {
                    display: "flex"
                },
                '.kipFormElem input[type="checkbox"] + label .inputBox': {
                    width: "18px",
                    height: "18px",
                    margin: "0",
                    marginRight: "5px",
                    border: "1px solid <0>",
                    position: "relative",
                    boxSizing: "content-box",
                    flexShrink: "0",
                    marginTop: "4px"
                },
                ".kipFormElem input[type='checkbox'] + label .inputBox .innerInputBox": {
                    position: "absolute",
                    width: "0",
                    height: "0",
                    left: "9px",
                    top: "9px",
                    backgroundColor: "<0>",
                    transition: "all ease-in-out .1s"
                },
                ".kipFormElem input[type='checkbox']:checked + label .inputBox .innerInputBox, .kipFormElem input[type='checkbox']:checked + label:hover .inputBox .innerInputBox": {
                    left: "2px",
                    top: "2px",
                    width: "14px",
                    height: "14px"
                },
                ".kipFormElem input[type='checkbox'] + label:hover .inputBox .innerInputBox": {
                    left: "4px",
                    top: "4px",
                    width: "10px",
                    height: "10px",
                    opacity: "0.7"
                },
                ".kipFormElem.check input[type='checkbox'] + label .innerLbl": {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    fontSize: "0.9em",
                    paddingTop: "3px"
                }
            };
            return CheckElement;
        }(Forms.FormElement));
        Forms.CheckElement = CheckElement;
        /**...........................................................................
         * @class TextElement
         * ...........................................................................
         * create a text element for a form
         * @version 1.0
         * ...........................................................................
         */
        var TextElement = /** @class */ (function (_super) {
            __extends(TextElement, _super);
            function TextElement() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(TextElement.prototype, "_type", {
                get: function () { return Forms.FormElementTypeEnum.TEXT; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextElement.prototype, "_defaultValue", {
                get: function () { return ""; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextElement.prototype, "_defaultCls", {
                get: function () { return "text"; },
                enumerable: true,
                configurable: true
            });
            TextElement.prototype._onCreateElements = function () {
                this._createStandardLabeledInput(false);
                this._handleStandardLayout();
            };
            TextElement.prototype._onChange = function () {
                var value = this._elems.input.value;
                return this._standardValidation(value);
            };
            TextElement.prototype._createClonedElement = function (appendToID) {
                return new TextElement(this._id + appendToID, this);
            };
            return TextElement;
        }(Forms.FormElement));
        Forms.TextElement = TextElement;
        /**...........................................................................
         * @class TextAreaElement
         * ...........................................................................
         * create a text area element for a form
         * @version 1.0
         * ...........................................................................
         */
        var TextAreaElement = /** @class */ (function (_super) {
            __extends(TextAreaElement, _super);
            function TextAreaElement() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(TextAreaElement.prototype, "_type", {
                get: function () { return Forms.FormElementTypeEnum.TEXTAREA; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextAreaElement.prototype, "_defaultValue", {
                get: function () { return ""; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextAreaElement.prototype, "_defaultCls", {
                get: function () { return "textarea"; },
                enumerable: true,
                configurable: true
            });
            TextAreaElement.prototype._onCreateElements = function () {
                var input = Forms.createInputElement(this._id, "input", "textarea", this._data);
                this._elems.input = input;
                this._elems.lbl = Forms.createLabelForInput(this._label, this._id, "lbl");
                this._handleStandardLayout();
            };
            TextAreaElement.prototype._onChange = function () {
                var value = this._elems.input.value;
                value = value.replace(/\n/g, "<br>");
                value = value.replace(/    /g, "&nbsp;&nbsp;&nbsp;&nbsp;");
                return this._standardValidation(value);
            };
            TextAreaElement.prototype._createClonedElement = function (appendToID) {
                return new TextAreaElement(this._id + appendToID, this);
            };
            TextAreaElement.prototype.update = function (data) {
                this._data = data;
                if (!this._data) {
                    return;
                }
                var displayStr = data.replace(/<br>/g, "\n");
                displayStr = displayStr.replace(/\&nbsp;/g, " ");
                this._elems.input.value = displayStr;
            };
            return TextAreaElement;
        }(Forms.FormElement));
        Forms.TextAreaElement = TextAreaElement;
        /**...........................................................................
         * @class DateElement
         * ...........................................................................
         * create a date element for a form
         * @version 1.0
         * ...........................................................................
         */
        var DateElement = /** @class */ (function (_super) {
            __extends(DateElement, _super);
            function DateElement() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(DateElement.prototype, "_type", {
                get: function () { return Forms.FormElementTypeEnum.DATE; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DateElement.prototype, "_defaultValue", {
                get: function () { return null; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DateElement.prototype, "_defaultCls", {
                get: function () { return "date"; },
                enumerable: true,
                configurable: true
            });
            /** create the display for the date element */
            DateElement.prototype._onCreateElements = function () {
                this._createStandardLabeledInput();
                this._handleStandardLayout();
            };
            DateElement.prototype._onChange = function () {
                // first convert the string value to a date
                var value = this._elems.input.value;
                var dateValue = KIP.Dates.inputToDate(value);
                // run standard validations
                return this._standardValidation(dateValue);
            };
            DateElement.prototype._createClonedElement = function (appendToID) {
                return new DateElement(this._id + appendToID, this);
            };
            DateElement.prototype.update = function (data) {
                this._data = data;
                if (!this._elems.input) {
                    return;
                }
                if (!this._data) {
                    return;
                }
                this._elems.input.value = KIP.Dates.inputDateFmt(data);
            };
            return DateElement;
        }(Forms.FormElement));
        Forms.DateElement = DateElement;
        /**...........................................................................
         * @class TimeElement
         * ...........................................................................
         * create a time element for a form
         * @version 1.0
         * ...........................................................................
         */
        var TimeElement = /** @class */ (function (_super) {
            __extends(TimeElement, _super);
            function TimeElement() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(TimeElement.prototype, "_type", {
                get: function () { return Forms.FormElementTypeEnum.TIME; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TimeElement.prototype, "_defaultValue", {
                get: function () { return null; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TimeElement.prototype, "_defaultCls", {
                get: function () { return "time"; },
                enumerable: true,
                configurable: true
            });
            TimeElement.prototype._onCreateElements = function () {
                this._createStandardLabeledInput();
                this._handleStandardLayout();
            };
            TimeElement.prototype._onChange = function () {
                var value = this._elems.input.value;
                var dateValue = KIP.Dates.inputToDate("", value);
                return this._standardValidation(dateValue);
            };
            TimeElement.prototype._createClonedElement = function (appendToID) {
                return new TimeElement(this._id + appendToID, this);
            };
            TimeElement.prototype.update = function (data) {
                this._data = data;
                if (!this._elems.input) {
                    return;
                }
                if (!this._data) {
                    return;
                }
                this._elems.input.value = KIP.Dates.shortTime(data);
            };
            return TimeElement;
        }(Forms.FormElement));
        Forms.TimeElement = TimeElement;
        /**...........................................................................
         * @class DateTimeElement
         * ...........................................................................
         * create an element to collect date and time for a form
         * @version 1.0
         * ...........................................................................
         */
        var DateTimeElement = /** @class */ (function (_super) {
            __extends(DateTimeElement, _super);
            function DateTimeElement() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(DateTimeElement.prototype, "_type", {
                get: function () { return Forms.FormElementTypeEnum.DATE_TIME; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DateTimeElement.prototype, "_defaultValue", {
                get: function () { return null; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DateTimeElement.prototype, "_defaultCls", {
                get: function () { return "dateTime"; },
                enumerable: true,
                configurable: true
            });
            DateTimeElement.prototype._onCreateElements = function () {
                var _this = this;
                this._createStandardLabel(this._elems.core);
                this._elems.inputWrapper = KIP.createSimpleElement("", "inputs", "", null, null, this._elems.core);
                // draw the date
                var dateLbl = KIP.createSimpleElement("", "lbl", "Date: ", null, null, this._elems.inputWrapper);
                this._elems.dateInput = Forms.createInputElement("", "dateInput", "date", this._data, null, null, this._elems.inputWrapper);
                this._elems.dateInput.addEventListener("change", function () {
                    _this._changeEventFired();
                });
                // draw the time
                var timeVal = (this._data ? KIP.Dates.shortTime(this._data) : "");
                var timeLbl = KIP.createSimpleElement("", "lbl", "Time: ", null, null, this._elems.inputWrapper);
                this._elems.timeInput = Forms.createInputElement("", "timeInput", "time", timeVal, null, null, this._elems.inputWrapper);
                this._elems.timeInput.addEventListener("change", function () {
                    _this._changeEventFired();
                });
            };
            DateTimeElement.prototype._onChange = function () {
                var timeStr = this._elems.timeInput.value;
                var dateStr = this._elems.dateInput.value;
                var date = KIP.Dates.inputToDate(dateStr, timeStr);
                return this._standardValidation(date);
            };
            DateTimeElement.prototype._createClonedElement = function (appendToID) {
                return new DateTimeElement(this._id + appendToID, this);
            };
            DateTimeElement.prototype.update = function (data) {
                this._onClear();
                this._data = data;
                if (!this._data) {
                    return;
                }
                if (this._elems.dateInput) {
                    this._elems.dateInput.value = KIP.Dates.inputDateFmt(data);
                }
                if (this._elems.timeInput) {
                    this._elems.timeInput.value = KIP.Dates.shortTime(data);
                }
            };
            DateTimeElement._uncoloredStyles = {
                ".kipFormElem.dateTime .inputs": {
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap"
                },
                ".kipFormElem.dateTime .inputs input": {
                    marginRight: "20px",
                    flexGrow: "1",
                    minWidth: "150px"
                },
                ".kipFormElem.dateTime .inputs .lbl": {
                    flexShrink: "1",
                    maxWidth: "50px",
                    marginTop: "4px"
                }
            };
            return DateTimeElement;
        }(Forms.FormElement));
        Forms.DateTimeElement = DateTimeElement;
        /**...........................................................................
         * @class SelectElement
         * ...........................................................................
         * create a dropdown for a form
         * @version 1.0
         * ...........................................................................
         */
        var SelectElement = /** @class */ (function (_super) {
            __extends(SelectElement, _super);
            /** create the select element */
            function SelectElement(id, template) {
                return _super.call(this, id, template) || this;
            }
            Object.defineProperty(SelectElement.prototype, "_type", {
                get: function () { return Forms.FormElementTypeEnum.SELECT; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SelectElement.prototype, "_defaultValue", {
                get: function () { return 0; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SelectElement.prototype, "_defaultCls", {
                get: function () { return "select"; },
                enumerable: true,
                configurable: true
            });
            /** handle cloning an additional element */
            SelectElement.prototype._cloneFromFormElement = function (data) {
                _super.prototype._cloneFromFormElement.call(this, data);
                this._options = data._options;
            };
            SelectElement.prototype._parseElemTemplate = function (template) {
                _super.prototype._parseElemTemplate.call(this, template);
                this._options = template.options;
            };
            SelectElement.prototype._onCreateElements = function () {
                this._elems.input = Forms.createSelectElement(this._id, "input", this._options);
                this._createStandardLabel();
                this._handleStandardLayout();
            };
            SelectElement.prototype._onChange = function () {
                var value = +this._elems.input.value;
                return this._standardValidation(value);
            };
            SelectElement.prototype._createClonedElement = function (appendToID) {
                return new SelectElement(this._id + appendToID, this);
            };
            return SelectElement;
        }(Forms.FormElement));
        Forms.SelectElement = SelectElement;
        /**...........................................................................
         * @class NumberElement
         * ...........................................................................
         * create a number element for a form
         * @version 1.0
         * ...........................................................................
         */
        var NumberElement = /** @class */ (function (_super) {
            __extends(NumberElement, _super);
            function NumberElement() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(NumberElement.prototype, "_type", {
                get: function () { return Forms.FormElementTypeEnum.NUMBER; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NumberElement.prototype, "_defaultValue", {
                get: function () { return 0; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NumberElement.prototype, "_defaultCls", {
                get: function () { return "number"; },
                enumerable: true,
                configurable: true
            });
            NumberElement.prototype._onCreateElements = function () {
                this._createStandardLabeledInput();
                this._handleStandardLayout();
            };
            NumberElement.prototype._onChange = function () {
                var value = +this._elems.input.value;
                return this._standardValidation(value);
            };
            NumberElement.prototype._createClonedElement = function (appendToID) {
                return new NumberElement(this._id + appendToID, this);
            };
            return NumberElement;
        }(Forms.FormElement));
        Forms.NumberElement = NumberElement;
        /**...........................................................................
         * @class   ColorElement
         * ...........................................................................
         * Creates a form element for collecting colors
         * @version 18.2.25
         * @author  Kip Price
         * ...........................................................................
         */
        var ColorElement = /** @class */ (function (_super) {
            __extends(ColorElement, _super);
            function ColorElement() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(ColorElement.prototype, "_type", {
                /** type of element */
                get: function () { return Forms.FormElementTypeEnum.COLOR; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ColorElement.prototype, "_defaultValue", {
                /** default value to use */
                get: function () { return "#000000"; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ColorElement.prototype, "_defaultCls", {
                /** default CSS class to use */
                get: function () { return "color"; },
                enumerable: true,
                configurable: true
            });
            /**...........................................................................
             * _onCreateElements
             * ...........................................................................
             * Create elements for this form element
             * ...........................................................................
             */
            ColorElement.prototype._onCreateElements = function () {
                this._createStandardLabeledInput();
                this._handleStandardLayout();
            };
            /**...........................................................................
             * _onChange
             * ...........................................................................
             * Handle the change event for this input
             * ...........................................................................
             */
            ColorElement.prototype._onChange = function () {
                var value = this._elems.input.value;
                return this._standardValidation(value);
            };
            /**...........................................................................
             * _createClonedElement
             * ...........................................................................
             * Clone this element
             * @param   appendToID  Additional ID piece to use
             * ...........................................................................
             */
            ColorElement.prototype._createClonedElement = function (appendToID) {
                return new ColorElement(this._id + appendToID, this);
            };
            return ColorElement;
        }(Forms.FormElement));
        Forms.ColorElement = ColorElement;
        /**...........................................................................
         * @class HiddenElement
         * ...........................................................................
         * handle a data element that will be set, but not displayed to the user
         * @version 1.0
         * ...........................................................................
         */
        var HiddenElement = /** @class */ (function (_super) {
            __extends(HiddenElement, _super);
            function HiddenElement() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(HiddenElement.prototype, "_type", {
                get: function () { return Forms.FormElementTypeEnum.HIDDEN; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HiddenElement.prototype, "_defaultCls", {
                get: function () { return "hidden"; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HiddenElement.prototype, "_defaultValue", {
                get: function () { return null; },
                enumerable: true,
                configurable: true
            });
            HiddenElement.prototype._onCreateElements = function () { };
            HiddenElement.prototype._onChange = function () {
                return true;
            };
            HiddenElement.prototype._createClonedElement = function (appendToID) {
                return new HiddenElement(this.id + appendToID, this);
            };
            HiddenElement.prototype.save = function () {
                return this._data;
            };
            HiddenElement._uncoloredStyles = {
                "kipFormElem.hidden": {
                    display: "none"
                }
            };
            return HiddenElement;
        }(Forms.FormElement));
        Forms.HiddenElement = HiddenElement;
    })(Forms = KIP.Forms || (KIP.Forms = {}));
})(KIP || (KIP = {}));
///<reference path="formElement.ts" />
var KIP;
(function (KIP) {
    var Forms;
    (function (Forms) {
        /**...........................................................................
         * @class   ToggleButtonElement
         * ...........................................................................
         * template for toggle buttons
         * @version 1.0
         * @author  Kip Price
         * ...........................................................................
         */
        var ToggleButtonElement = /** @class */ (function (_super) {
            __extends(ToggleButtonElement, _super);
            /**...........................................................................
             * Create a toggle button class
             * @param   id          The ID to use for the toggle button
             * @param   template    The template for this element
             * ...........................................................................
             */
            function ToggleButtonElement(id, template) {
                return _super.call(this, id, template) || this;
            }
            Object.defineProperty(ToggleButtonElement.prototype, "_type", {
                /** type for the toggle buttons */
                get: function () { return Forms.FormElementTypeEnum.TOGGLE_BUTTON; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ToggleButtonElement.prototype, "_defaultCls", {
                /** default class for the toggle buttons */
                get: function () { return "toggleBtns"; },
                enumerable: true,
                configurable: true
            });
            /**...........................................................................
             * _parseElemTemplate
             * ...........................................................................
             * Parse data in the element template
             * @param   template    Handle the element
             * ...........................................................................
             */
            ToggleButtonElement.prototype._parseElemTemplate = function (template) {
                _super.prototype._parseElemTemplate.call(this, template);
                this._options = template.options;
            };
            /**...........................................................................
             * _cloneFromFormElement
             * ...........................................................................
             * handle cloning an additional element
             * @param   data    The form element to clone from
             * ...........................................................................
             */
            ToggleButtonElement.prototype._cloneFromFormElement = function (data) {
                _super.prototype._cloneFromFormElement.call(this, data);
                this._options = data._options;
            };
            /**...........................................................................
             * _onCreateElements
             * ...........................................................................
             * create the elements needed for toggle buttons
             * ...........................................................................
             */
            ToggleButtonElement.prototype._onCreateElements = function () {
                this._createStandardLabel(this._elems.core);
                this._elems.childrenContainer = KIP.createSimpleElement("", "formChildren", "", null, null, this._elems.core);
                this._createOptionsElements();
            };
            /**...........................................................................
             * _createOptionsElements
             * ...........................................................................
             *
             * ...........................................................................
             */
            ToggleButtonElement.prototype._createOptionsElements = function () {
                var _this = this;
                KIP.map(this._options, function (elem) {
                    _this._createOptionElement(elem);
                });
            };
            /**...........................................................................
             * _createOptionElement
             * ...........................................................................
             * @param elem
             * ...........................................................................
             */
            ToggleButtonElement.prototype._createOptionElement = function (elem) {
                var _this = this;
                var btn = KIP.createElement({
                    id: this._id + "btn" + elem.value,
                    cls: "toggleBtn",
                    content: elem.label,
                    parent: this._elems.childrenContainer
                });
                // check if we already know that this button should be selected
                if (this._shouldBeSelected(elem)) {
                    this._selectBtn(btn, elem.value);
                }
                // deal with the select event
                btn.addEventListener("click", function () {
                    _this._selectBtn(btn, elem.value);
                    _this._changeEventFired();
                });
                // add this to our button arary as appropriate
                if (!this._buttons) {
                    this._buttons = [];
                }
                this._buttons.push({ key: elem.value, btn: btn });
                return btn;
            };
            /**...........................................................................
             * _onChange
             * ...........................................................................
             *
             * ...........................................................................
             */
            ToggleButtonElement.prototype._onChange = function () {
                var value = this._data;
                return this._standardValidation(value);
            };
            /**...........................................................................
             * update
             * ...........................................................................
             * @param data
             * ...........................................................................
             */
            ToggleButtonElement.prototype.update = function (data) {
                var _this = this;
                this._data = data;
                var btn = this._getButtonToUpdate(data);
                window.setTimeout(function () {
                    if (!_this._selectBtn) {
                        console.log("missing _selectBtn: " + _this._selectBtn);
                        throw new Error("missing _select function");
                    }
                    _this._selectBtn(btn, data);
                }, 100);
            };
            ToggleButtonElement.prototype._getButtonToUpdate = function (data) {
                var idx = KIP.indexOf(this._buttons, { key: data, btn: null }, function (a, b) {
                    return (a.key === b.key);
                });
                if (idx === -1) {
                    return;
                }
                var btn = this._buttons[idx].btn;
                return btn;
            };
            ToggleButtonElement.prototype._onClear = function () { };
            /** static styles for the toggle buttons */
            ToggleButtonElement._uncoloredStyles = {
                ".toggleBtns": {
                    width: "800px"
                },
                ".toggleBtns .formChildren": {
                    display: "flex",
                    flexWrap: "wrap"
                },
                ".toggleBtn": {
                    borderRadius: "2px",
                    boxShadow: "1px 1px 4px 2px rgba(0,0,0,.1)",
                    padding: "4px",
                    margin: "4px",
                    cursor: "pointer",
                    textAlign: "center",
                    fontSize: "0.8em",
                    border: "1px solid transparent",
                    opacity: "0.7",
                    transition: "all ease-in-out .1s"
                },
                ".toggleBtn.selected, .toggleBtn:hover": {
                    border: "1px solid <0>",
                    transform: "scale(1.08)"
                },
                ".toggleBtn.selected": {
                    opacity: "1"
                }
            };
            return ToggleButtonElement;
        }(Forms.FormElement));
        Forms.ToggleButtonElement = ToggleButtonElement;
        /**...........................................................................
         * @class   SingleSelectButtonElem
         * ...........................................................................
         * toggle buttons as equivalent to radio buttons
         * @version 1.0
         * @author  Kip Price
         * ...........................................................................
         */
        var SingleSelectButtonElem = /** @class */ (function (_super) {
            __extends(SingleSelectButtonElem, _super);
            function SingleSelectButtonElem(id, template) {
                return _super.call(this, id, template) || this;
            }
            Object.defineProperty(SingleSelectButtonElem.prototype, "_defaultValue", {
                get: function () { return null; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SingleSelectButtonElem.prototype, "_multiSelect", {
                get: function () { return false; },
                enumerable: true,
                configurable: true
            });
            SingleSelectButtonElem.prototype._parseElemTemplate = function (template) {
                _super.prototype._parseElemTemplate.call(this, template);
            };
            /** handle a button being selected */
            SingleSelectButtonElem.prototype._selectBtn = function (btn, value) {
                if (!btn) {
                    return;
                }
                if (this._selectedBtn) {
                    KIP.removeClass(this._selectedBtn, "selected");
                }
                if (this._selectedBtn === btn) {
                    this._data = this._defaultValue;
                    this._selectedBtn = null;
                    return;
                }
                this._data = value;
                this._selectedBtn = btn;
                KIP.addClass(btn, "selected");
            };
            SingleSelectButtonElem.prototype._createClonedElement = function (appendToID) {
                return new SingleSelectButtonElem(this._id + appendToID, this);
            };
            SingleSelectButtonElem.prototype._shouldBeSelected = function (elem) {
                return this._data === elem.value;
            };
            SingleSelectButtonElem.prototype._onClear = function () {
                if (this._selectedBtn) {
                    KIP.removeClass(this._selectedBtn, "selected");
                    this._selectedBtn = null;
                }
                this._data = this._defaultValue;
            };
            SingleSelectButtonElem.prototype.setThemeColor = function (idx, color, noReplace) {
                _super.prototype.setThemeColor.call(this, idx, color, noReplace);
            };
            return SingleSelectButtonElem;
        }(ToggleButtonElement));
        Forms.SingleSelectButtonElem = SingleSelectButtonElem;
        /**...........................................................................
         * @class   MultiSelectButtonElem
         * ...........................................................................
         * toggle buttons as multi-select options
         * @version 1.0
         * @author  Kip Price
         * ...........................................................................
         */
        var MultiSelectButtonElem = /** @class */ (function (_super) {
            __extends(MultiSelectButtonElem, _super);
            /**...........................................................................
             * Create the multi select form
             * @param id
             * @param template
             * ...........................................................................
             */
            function MultiSelectButtonElem(id, template) {
                return _super.call(this, id, template) || this;
            }
            Object.defineProperty(MultiSelectButtonElem.prototype, "_multiSelect", {
                get: function () { return true; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MultiSelectButtonElem.prototype, "_defaultValue", {
                get: function () { return []; },
                enumerable: true,
                configurable: true
            });
            /**...........................................................................
             * _parseElemTemplate
             * ...........................................................................
             * @param template
             * ...........................................................................
             */
            MultiSelectButtonElem.prototype._parseElemTemplate = function (template) {
                _super.prototype._parseElemTemplate.call(this, template);
                this._selectedBtns = [];
            };
            /**...........................................................................
             * update
             * ...........................................................................
             * @param data
             * ...........................................................................
             */
            MultiSelectButtonElem.prototype.update = function (data) {
                var _this = this;
                if (KIP.isNullOrUndefined(data)) {
                    return;
                }
                this._onClear();
                // map all of the elements
                data.map(function (elem) {
                    var btn = _this._getButtonToUpdate(elem);
                    _this._selectBtn(btn, elem);
                });
            };
            /**...........................................................................
             * _shouldBeSelected
             * ...........................................................................
             * @param   elem    The element to potentially select
             * @returns True if a specified button should be selected
             * ...........................................................................
             */
            MultiSelectButtonElem.prototype._shouldBeSelected = function (elem) {
                var dIdx = this._indexOf(elem.value);
                return (dIdx !== -1);
            };
            /**...........................................................................
             * _createClonedElement
             * ...........................................................................
             * @param appendToID
             * ...........................................................................
             */
            MultiSelectButtonElem.prototype._createClonedElement = function (appendToID) {
                return new MultiSelectButtonElem(this.id + appendToID, this);
            };
            /**...........................................................................
             * _selectBtn
             * ...........................................................................
             * @param btn
             * @param value
             * ...........................................................................
             */
            MultiSelectButtonElem.prototype._selectBtn = function (btn, value) {
                if (!btn) {
                    return;
                }
                // handle the case where the button was already selected
                var selectedIdx = this._selectedBtns.indexOf(btn);
                var dataIdx = this._indexOf(value);
                if ((dataIdx !== -1) && (selectedIdx === -1)) {
                    return;
                }
                else if (selectedIdx != -1) {
                    if (selectedIdx !== -1) {
                        KIP.removeClass(btn, "selected");
                        this._selectedBtns.splice(selectedIdx, 1);
                    }
                    if (dataIdx !== -1) {
                        this._data.splice(dataIdx, 1);
                    }
                }
                else {
                    this._data.push(value);
                    this._selectedBtns.push(btn);
                    KIP.addClass(btn, "selected");
                }
            };
            /**...........................................................................
             * _indexOf
             * ...........................................................................
             * @param value
             * @returns The index of the element in the array, or -1 if it isn't found
             * ...........................................................................
             */
            MultiSelectButtonElem.prototype._indexOf = function (value) {
                var outIdx = -1;
                for (var idx = 0; idx < this._data.length; idx += 1) {
                    var elem = this._data[idx];
                    if (this._equalTo(elem, value)) {
                        outIdx = idx;
                        break;
                    }
                }
                return outIdx;
            };
            /**...........................................................................
             * _equalTo
             * ...........................................................................
             * Determine whether the data in this element is equivalent t
             * @param dataA
             * @param dataB
             * ...........................................................................
             */
            MultiSelectButtonElem.prototype._equalTo = function (dataA, dataB) {
                switch (typeof dataA) {
                    case "string":
                    case "number":
                    case "boolean":
                        return (dataA === dataB);
                }
                if (dataA instanceof Date) {
                    return (KIP.Dates.shortDate(dataA) === KIP.Dates.shortDate(dataB));
                }
                return (dataA === dataB);
            };
            /**...........................................................................
             * _onClear
             * ...........................................................................
             * Handle clearing data from this element
             * ...........................................................................
             */
            MultiSelectButtonElem.prototype._onClear = function () {
                this._data = [];
                // unselect everything
                for (var idx = (this._selectedBtns.length - 1); idx >= 0; idx -= 1) {
                    var elem = this._selectedBtns[idx];
                    KIP.removeClass(elem, "selected");
                    this._selectedBtns.splice(idx, 1);
                }
                ;
            };
            return MultiSelectButtonElem;
        }(ToggleButtonElement));
        Forms.MultiSelectButtonElem = MultiSelectButtonElem;
    })(Forms = KIP.Forms || (KIP.Forms = {}));
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    //================
    // ENUMS
    //================
    var FormStandardButtons;
    (function (FormStandardButtons) {
        FormStandardButtons[FormStandardButtons["OK"] = 1] = "OK";
        FormStandardButtons[FormStandardButtons["Accept"] = 2] = "Accept";
        FormStandardButtons[FormStandardButtons["Cancel"] = 3] = "Cancel";
        FormStandardButtons[FormStandardButtons["Next"] = 4] = "Next";
        FormStandardButtons[FormStandardButtons["Previous"] = 5] = "Previous";
        FormStandardButtons[FormStandardButtons["Custom"] = 99] = "Custom";
    })(FormStandardButtons = KIP.FormStandardButtons || (KIP.FormStandardButtons = {}));
    ;
    var FieldTypeEnum;
    (function (FieldTypeEnum) {
        FieldTypeEnum[FieldTypeEnum["Text"] = 0] = "Text";
        FieldTypeEnum[FieldTypeEnum["Date"] = 1] = "Date";
        FieldTypeEnum[FieldTypeEnum["Numeric"] = 2] = "Numeric";
        FieldTypeEnum[FieldTypeEnum["Range"] = 3] = "Range";
        FieldTypeEnum[FieldTypeEnum["Color"] = 4] = "Color";
        FieldTypeEnum[FieldTypeEnum["TextArea"] = 5] = "TextArea";
        FieldTypeEnum[FieldTypeEnum["Checkbox"] = 6] = "Checkbox";
        FieldTypeEnum[FieldTypeEnum["Radio"] = 7] = "Radio";
        FieldTypeEnum[FieldTypeEnum["Select"] = 8] = "Select";
    })(FieldTypeEnum = KIP.FieldTypeEnum || (KIP.FieldTypeEnum = {}));
    // //==========================
    // // FORM CLASS
    // //==========================
    // /**
    //  * @class Form
    //  * Creates a generic form class that can collect lots of pieces of information
    //  */
    // export class Form extends Drawable {
    // 	//============================
    // 	// PROPERTIES
    // 	//============================
    // 	private __title: string;
    // 	private __tables: HTMLTableElement[];
    // 	private __content: HTMLElement;
    // 	private __btns: HTMLElement;
    // 	private __saveCb: IFormSaveFunction;
    // 	private __options: IFormOptions;
    // 	private __fields: Collection<IFormField>;
    // 	private __currentSection: number;
    // 	//=========================================
    // 	// SETUP THE FORM INITIALLY
    // 	//=========================================
    // 	constructor (config: IFormConfiguration) {
    // 		super(config.id, "form");
    // 		this.__title = config.title;
    // 		this.__saveCb = config.saveCb;
    // 		this.__tables = [];
    // 		this.__fields = new Collection<IFormField>();
    // 		// Handle options for the form
    // 		let defaults: IFormOptions = this.__buildDefaultOptions();
    // 		reconcileOptions(config.options, defaults);
    // 		// Create elements for the form
    // 		this.__createElements();
    // 		// Process buttons
    // 		this.__processButtons(config.buttons);
    // 	}
    // 	private __buildDefaultOptions(): IFormOptions {
    // 		let opt: IFormOptions = {
    // 			useStandardStyles: true,
    // 			themeColor: "#22A174"
    // 		}
    // 		return opt;
    // 	}
    // 	//=================================
    // 	// CREATE ELEMENTS
    // 	//=================================
    // 	private __createElements() : void {
    // 		this.__createTitleBar();
    // 		this.__createContent();
    // 		this.__createButtonContainer();
    // 	}
    // 	private __createTitleBar(): void {
    // 		let titleBar: HTMLElement = createSimpleElement("", "titleBar " + THEME_BG_COLOR_CLS, this.__title);
    // 		this.appendChild(titleBar);
    // 	}
    // 	private __createButtonContainer(): void {
    // 		let cls: string = "btnBar " + THEME_BG_COLOR_CLS;
    // 	this.__btns = createSimpleElement("", cls);
    // 	}
    // 	private __createContent(): void {
    // 		let elem: HTMLElement = createSimpleElement(this._id + "-content", "content");
    // 		this.appendChild(elem);
    // 		this.__content = elem;
    // 	}
    // 	//=================================
    // 	// BUTTON HANDLING
    // 	//=================================
    // 	private __processButtons(btns: FormStandardButtons[]): void {
    // 		let btn: FormStandardButtons;
    // 		for (btn of btns) {
    // 			switch (btn) {
    // 				case FormStandardButtons.Accept:
    // 					this.__setupSavingButton("Accept");
    // 					break;
    // 				case FormStandardButtons.OK:
    // 					this.__setupSavingButton("OK");
    // 					break;
    // 				case FormStandardButtons.Cancel:
    // 					this.__setupHidingButton("Cancel");
    // 					break;
    // 				default:
    // 					break;
    // 			}
    // 		}
    // 	}
    // 	private __setupSavingButton (lbl: string) : void {
    // 		let btn: HTMLElement = createSimpleElement("", "btn save", lbl);
    // 		btn.addEventListener("click", () => {
    // 			this.save();
    // 		});
    // 		this.__btns.appendChild(btn);
    // 	}
    // 	private __setupHidingButton (lbl: string): void {
    // 		let btn: HTMLElement = createSimpleElement("", "btn hide", lbl);
    // 		btn.addEventListener("click", () => {
    // 			this.reset();
    // 		});
    // 		this.__btns.appendChild(btn);
    // 	}
    // 	public addButton (btnDef: IFormButtonDefinition): void {
    // 		let btn: HTMLElement = createSimpleElement("", "btn", btnDef.lbl);
    // 		btn.addEventListener('click', () => {
    // 			btnDef.onClick();
    // 		});
    // 		this.__btns.appendChild(btn);
    // 	}
    // 	//========================================
    // 	// HANDLE SECTION CREATION AND SWITCHING
    // 	//========================================
    // 	public createSection (title?: string, numberOfColumns?: number) : number {
    // 		// Create the general section UI
    // 		let sec: HTMLElement = createSimpleElement("", "section");
    // 		// Create the header text if appropriate
    // 		let secHeader: HTMLElement;
    // 		if (title) {
    // 			secHeader = createSimpleElement("", "secHeader " + THEME_COLOR_CLS, title);
    // 			sec.appendChild(secHeader);
    // 		}
    // 		// Create the appropriate table
    // 	numberOfColumns = numberOfColumns || 2;
    // 		let tIdx: number = this.__createTable(numberOfColumns);
    // 		let table: HTMLTableElement = this.__tables[tIdx];
    // 		// Add the table + section to our collections
    // 		sec.appendChild(table);
    // 		this.__content.appendChild(sec);
    // 		this.__currentSection = tIdx;
    // 		// Return the index of the table created for this section
    // 		return tIdx;
    // 	}
    // 	public swapSection (index: number): void {
    // 		if (index >= this.__tables.length) { return; }
    // 		this.__currentSection = index;
    // 	}
    // 	//=============================================
    // 	// HANDLE FIELD CREATION
    // 	//=============================================
    // 	/** creates a new field to be used in the form */
    // 	public createField(config: IFormFieldDefinition): void {
    // 	}
    // 	//======================================================
    // 	// PRIVATE CREATION FUNCTIONS
    // 	//======================================================
    // 	private __createTable(numberOfColumns: number): number {
    // 		let tIdx: number = this.__tables.length;
    // 		let table: HTMLTableElement = createTable("", "columnContainer", null, 0, numberOfColumns);
    // 		// Add to our set of tables
    // 		this.__tables[tIdx] = table;
    // 		// Return the index of the created table
    // 		return tIdx;
    // 	}
    // 	private __createDefaultForm(definition: IFormDefinition): void {
    // 		let def: IFormFieldDefinition;
    // 		let key: string;
    // 		for (key in definition) {
    // 			if (definition.hasOwnProperty(key)) {
    // 				def = definition[key];
    // 				this.createField(def);
    // 			}
    // 		}
    // 	}
    // 	private __createCheckbox (definition: IFormFieldDefinition): void {
    // 	}
    // 	private __createLabel (lbl: string): HTMLElement {
    // 		let out: HTMLElement = createSimpleElement("", "lbl", lbl);
    // 		return out;
    // 	}
    // 	//=====================================
    // 	// SHOW OR HIDE THE FORM
    // 	//=====================================
    // 	public save () {
    // 	}
    // 	public reset () {
    // 	}
    // 	//=================================
    // 	// STANDARD CSS STYLES
    // 	//=================================
    // 	private __addStandardStyles (): void {
    // 		//TODO
    // 	}
    // }
})(KIP || (KIP = {}));
/*globals KIP,window*/
// Form.CreateBtnBar
//----------------------------------------------------------
// // Form.AddField
// //---------------------------------------------------------------------------------------
// /**
//  * Adds an input field to the form
//  * @param {string} id          The identifier for the field
//  * @param {string} field       The type of input we are creating
//  * @param {string} position    Where the field should be placed
//  * @param {string} lbl         What label to use for the field
//  * @param {string} lblPosition Where the label for the field should be positioned
//  * @returns {HTMLElement} The created field
//  */
// KIP.Objects.Form.prototype.AddField = function (id, field, position, lbl, lblPosition, original) {
//   "use strict";
//   // Default label position to be the same as the regular position
//   if (!lblPosition && lblPosition !== 0) {
//     lblPosition = position;
//   }
//   if (lbl) {
//     this.AddElement(lbl, lblPosition);
//   }
//   this.AddElement(field, position);
//   if (field) {
//     this.fields.AddElement(id, {
//       "elem": field,
//       "id": id,
//       "resetValue" : original
//     });
//   }
//   if (this.div.parentNode) {
//     this.Draw();
//   }
//   return field;
// };
// // Form.AddElement
// //----------------------------------------------------------------------
// /*
//  *@description Adds an HTML element to the given position on the form
//  *@param {HTMLElement} element - The HTML element to add to the form
//  *@param {variant} position - The position at which an element should appear in the form
// */
// KIP.Objects.Form.prototype.AddElement = function (element, position) {
//   "use strict";
//   var row, table, col, data, rowNum, colNum, tableData, added;
//   // Default positions
//   if (!position) {
//     position = {
//       table: (this.currentSection || (this.tables.length - 1)),
//       col: 0
//     };
//   } else {
//     // Table defaults: first current section, then last added
//     if (!position.table && (position.table !== 0)) {
//       position.table = this.currentSection;
//     }
//     if (!position.table && (position.table !== 0)) {
//       position.table = this.tables.length - 1;
//     }
//     // Column defaults to 0
//     position.col = position.col || 0;
//   }
//   // Positions are now objects with a specified table & column
//   table = position.table;
//   col = position.col;
//   // Quit if we don't actually have a table
//   if (table < 0) return false;
//   if (!this.tables[table]) return false;
//   // Grab the pieces of data about the table
//   rowNum = this.tables[table].rowNum;
//   colNum = this.tables[table].colNum;
//   tableData = this.tables[table].data;
//   // Check if we're adding a new cell to an existing row
//   if (rowNum > 0 && tableData[rowNum - 1]) {
//     row = tableData[rowNum - 1];
//     // If this row doesn't yet have data in this cell, update it
//     if (!row.children[col] || !row.children[col].innerHTML) {
//       KIP.Functions.ProcessCellContents(element, row.children[col]);
//       added = true;
//     }
//   }
//   // If we didn't handle this in the existing cell update, create a new row
//   if (!added) {
//     data = [];
//     data[col] = element;
//     row = KIP.Functions.AddRow(this.tables[table].table, data, "", colNum);
//     rowNum += 1;
//     tableData.push(row);
//   }
//   // Update our globals
//   this.tables[table].rowNum = rowNum;
//   this.tables[table].data = tableData;
// };
// // Form.AddExpandingInput
// //--------------------------------------------------------------------------------------------------------------------------------------------
// /*
//  * Add an input that, when data is entered, expands to an extra field
//  * @param {string} id - THe unique identifier for
//  * @param {string} subID
//  * @param {string} [type]
//  * @param {string} position
//  * @param {string} [value]
//  * @param {object} [attr]
//  * @param {string} [lbl]
//  * @param {string} [cls]
//  * @param {function} [changeCb]
//  * @param {function} [blurCb]
//  * @param {array} [addlListeners]
//  * @returns {HTMLElement} The expandable field that was created
//  */
// KIP.Objects.Form.prototype.AddExpandingInput = function (id, subID, type, position, value, attr, lbl, cls, changeCb, blurCb, addlListeners) {
//   "use strict";
//   var field, that, a, aList;
//   that = this;
//   // Make sure we have an ID & a subID
//   if (!subID) subID = 0;
//   // Create the field
//   field = this.AddInput(id + "." + subID, type || "text", value, attr, lbl, cls, position, position);
//   // Add a content listener that adds fields
//   field.addEventListener("keyup", changeCb || function (e) {
//     var next;
//     next = document.getElementById(id + "." + (subID + 1));
//     if (!next && this.value.length > 0) {
//       that.AddExpandingTextInput(id, subID + 1, txt, position, ghostTxt, lbl);
//     }
//     this.focus();
//   });
//   // Add a content listener to remove fields on lost focus when they are empty
//   field.addEventListener("blur", blurCb || function () {
//     if (this.value.length === 0) {
//       that.RemoveField(this.id + "." + this.subID);
//     }
//   });
//   // Add any additional listeners
//   if (addlListeners) {
//     for (a = 0; a < addlListeners.length; a += 1) {
//       aList = addlListeners[a];
//       if (!aList) continue;
//       field.addEventListener(aList.type, aList.func);
//     }
//   }
// };
// // Form.AddExpandingInputTable
// //-----------------------------------------------------------------------------------------------------------------------------------------
// /* Creates a table that expands when the user adds details */
// KIP.Objects.Form.prototype.AddExpandingInputTable = function (ids, subID, types, positions, values, attrs, lbls, classes, addlListeners) {
//   "use strict";
//   var c, field, that, changeCb, blurCb, cb;
//   that = this;
//   // Function for adding new rows
//   changeCb = function () {
//     var next;
//     next = document.getElementById(ids[0] + "." + (subID + 1));
//     if (!next && this.value.length > 0) {
//       that.AddExpandingInputTable(ids, subID + 1, types, positions, values, attrs, lbls, classes, addlListeners);
//     }
//     this.focus();
//   };
//   // Function for removing empy rows
//   blurCb = function () {
//     var i, empty, f, k;
//     empty = true;
//     for (i = 0; i < ids.length; i += 1) {
//       f = that.fields.GetElement(ids[i] + "." + subID).value;
//       if (f.elem.value.length > 0) {
//         empty = false;
//         break;
//       }
//     }
//     // Only clear the row if everything is empty
//     if (!empty) return;
//     // Remove the entire row
//     for (i = 0; i < ids.length; i += 1) {
//       k = ids[i] + "." + subID;
//       that.RemoveField(k);
//     }
//   };
//   // Loop through the columns we received
//   for (c = 0; c < ids.length; c += 1) {
//     this.AddExpandingInput(ids[c], subID, types && types[c] || "", positions && positions[c] || 0, values && values[c] || "", attrs && attrs[c] || {}, lbls && lbls[c] || "", classes && classes[c] || "", changeCb, blurCb, addlListeners && addlListeners[c]);
//   }
// };
// KIP.Objects.Form.prototype.RemoveField = function (id, ignoreContent) {
//   "use strict";
//   var field;
//   field = this.fields.GetElement(id).value;
//   if (!field) return false;
//   if (field.elem.value && !ignoreContent) return false;
//   // Remove from view
//   if (field.elem.parentNode) {
//     field.elem.parentNode.removeChild(field.elem);
//   }
//   // Remove from collection
//   this.fields.RemoveElement(id);
//   return true;
// };
// // Form.AddInput
// //-----------------------------------------------------------------------------------------------------------------------------
// /*
//  @description Adds an input element to the form with the provided parameters
//  @param {variant} id - If a string, treated as the identifier for the element. If an object, used to grab values for all parameters.
//  @param {string} [type] - What type of input is being created. Defaults to "text".
//  @param {string} [value] - What value, if any, should be set initially in this field
//  @param {obj} [addlAttr] - An object containing key-value pairs of any additional attributes that need to be set for this input.
//  @param {string} [lbl] - What label should be used to describe this element.
//  @param {string} [cls] - What class should be applied for this input
//  @param {string} position - The position at which this input should be placed.
//  @param {string} [lblPosition] - THe position at which the label for this input should be placed. Defaults to the position value.
//  @returns {HTMLElement} The field that was created.
// */
// KIP.Objects.Form.prototype.AddInput = function (id, type, value, addlAttr, lbl, cls, position, lblPosition, tooltip) {
//   "use strict";
//   var input, lblElem, elem;
//   // Check if an object was passed in instead of individual parts
//   if (typeof id === "object") {
//     type = id.type;
//     value = id.value;
//     addlAttr = id.attr;
//     lbl = id.lbl;
//     cls = id.cls;
//     position = id.position;
//     lblPosition = id.lblPosition;
//     id = id.id;
//   }
//   if (!addlAttr) {
//     addlAttr = {};
//   }
//   addlAttr.type = type;
//   if (type === "checkbox" || type === "radio") {
//     addlAttr.checked = value;
//   } else {
//     addlAttr.value = value;
//   }
//   input = KIP.Functions.CreateElement({
//     type: "input",
//     cls: cls,
//     id: id,
//     attr : addlAttr
//   });
//   if (lbl) {
//     lblElem = KIP.Functions.CreateSimpleElement(id + "lbl", "lbl", lbl);
//   }
//   // Add both of these new elements to our form
//   elem = this.AddField(id, input, position, lblElem, lblPosition, value);
//   if (tooltip) {
//     elem.parentNode.parentNode.setAttribute("title", tooltip);
//   }
//   return elem;
// };
// KIP.Objects.Form.prototype.UpdateFieldValue = function (id, value) {
//   "use strict";
//   var fld, f, type;
//   f = this.fields.GetElement(id);
//   if (!f) return;
//   fld = f.value.elem;
//   type = fld.getAttribute(fld, "type");
//   if (type === "checkbox" || type === "radio") {
//     fld.checked = value;
//   } else {
//     fld.value = value;
//   }
// }
// KIP.Objects.Form.prototype.UpdateFieldAttribute = function (id, attr, newValue) {
//   "use strict";
//   var fld, f;
//   f = this.fields.GetElement(id);
//   if (!f) return;
//   fld = f.value.elem;
//   fld.setAttribute(attr, newValue);
// }
// // Form.Reset
// //-----------------------------------------------
// /**
//  * Clears all fields in the form
//  */
// KIP.Objects.Form.prototype.Reset = function () {
//   "use strict";
//   var fIdx, field, type;
//   for (fIdx = 0; fIdx < this.fields.Length(); fIdx += 1) {
//     field = this.fields.GetElement("", fIdx).value;
//      type = field.elem.getAttribute("type");
//     if (type === "checkbox" || type === "radio") {
//       field.elem.checked = field.resetValue;
//     } else {
//       field.elem.value = field.resetValue;
//     }
//   }
// };
// // Form.Save
// //--------------------------------------------------
// /**
//  * Saves all data detailed in the form, as specified by the callback function
//  */
// KIP.Objects.Form.prototype.Save = function () {
//   "use strict";
//   var fIdx, field, values, type;
//   values = {};
//   // Loop through all of our fields
//   for (fIdx = 0; fIdx < this.fields.Length(); fIdx += 1) {
//     field = this.fields.GetElement("", fIdx).value; //Pull out of our collection
//     type = field.elem.getAttribute("type");
//     if (type === "checkbox" || type === "radio") {
//       values[field.id] = field.elem.checked;
//     } else {
//       values[field.id] = field.elem.value;
//     }
//   }
//   if (this.saveCb) {
//     this.saveCb(values);
//   }
// };
// //Form.CloseForm
// //---------------------------------------------------
// /**
//   * Closes the form without saving any data. It can also be called by Save
//   */
// KIP.Objects.Form.prototype.CloseForm = function () {
//   "use strict";
//   if (this.overlay && this.overlay.parentNode) {
//     this.overlay.parentNode.removeChild(this.overlay);
//   }
//   if (this.div.parentNode) {
//     this.div.parentNode.removeChild(this.div);
//   }
// };
// // Form.AfterDrawChildren
// //---------------------------------------------------------------------------
// /**
//   * Makes sure to create the standard CSS styles unless the caller disabled it
//   */
// KIP.Objects.Form.prototype.AfterDrawChildren = function () {
//   "use strict";
//   if ((this.standardStyle) && (!this.stylesCreated)) {
//     this.ApplyStandardStyles();
//     this.stylesCreated = true;
//   }
// };
// // Form.ApplyStandardStyles
// //---------------------------------------------------------------------------
// /**
//   * Creates standard CSS classes for each of the elements in the form. Can be overridden with more specific CSS.
//   */
// KIP.Objects.Form.prototype.ApplyStandardStyles = function () {
//   "use strict";
//   var ov, form, input, title, btns, pStyle, lbl, column, cPerc, t, tbl, hd, w, l, top, max_w;
//   // Force parent to have an explicit display
//   pStyle = KIP.Functions.GetComputedStyle(this.parent, "position");
//   if (pStyle === "static") {
//     pStyle = "relative";
//   }
//   this.parent.style.position = pStyle;
//   // Overlay styles
//   ov = {
//     "position": "fixed",
//     "left": 0,
//     "top" : 0,
//     "width": "100%",
//     "height" : "100%",
//     "background-color": "rgba(0,0,0,0.7)",
//     "z-index" : "1"
//   };
//   ov = KIP.Functions.CreateCSSClass(".overlay", ov);
//   // form formatting
//   form = {
//     "background-color": "#FFF",
//     "box-shadow" : "1px 1px 13px 4px rgba(0,0,0,.2);",
//     "font-family" : "Segoe UI, Calibri, sans",
//     "z-index" : "2",
//     "position" : "absolute",
//     "display" : "block",
//     "padding" : "10px",
//     "box-sizing" : "border-box"
//   };
//   form = KIP.Functions.CreateCSSClass(".form", form);
//   form = {
//     "left":"30%",
//     "top":"9%",
//     "max-width": "80%",
//     "width":"40%",
//     "max-height": "82%"
//   };
//   form = KIP.Functions.CreateCSSClass(".form:not(.embedded)", form);
//   form = {
//     "left":"0",
//     "top":"0",
//     "max-width": "100%",
//     "width":"100%" 
//   };
//   form = KIP.Functions.CreateCSSClass(".form.embedded", form);
//   // input formatting
//   input = {
//     "background-color" : "rgba(0,0,0,.1)",
//     "border" : "1px solid rgba(0,0,0,.25)",
//     "font-family" : "Segoe UI, Calibri, sans",
//   };
//   input = KIP.Functions.CreateCSSClass(".form input", input);
//   input = {
//     "width": "250px",
//     "outline" : "none"
//   };
//   input = KIP.Functions.CreateCSSClass(".form input[type=text]", input);
//   // title bar
//   title = {
//     "width" : "calc(100% - 10px)",
//     "text-align" : "center",
//     "background-color" : this.themeColor,
//     "color" : "#FFF",
//     "padding" : "5px",
//     "font-size" : "20px",
//     "position" : "absolute",
//     "top" : "-30px",
//     "left" : "0px"
//   };
//   title = KIP.Functions.CreateCSSClass(".form .titleBar", title);
//   title = {
//     "float" : "right",
//     "display" : "inline-block",
//     "opacity": "0.7",
//     "font-size": "15px",
//     "padding-top" : "2px",
//     "padding-right" : "5px"
//   };
//   title = KIP.Functions.CreateCSSClass(".form .titleBar .close", title);
//   title = {
//     "opacity": "1",
//     "cursor" : "pointer"
//   };
//   title = KIP.Functions.CreateCSSClass(".form .titleBar .close:hover", title);
//   // button bar
//   btns = {
//     "width" : "100%",
//     "display" : "flex",
//     "flex-direction" : "row",
//     "justify-content" : "flex-end",
//     "font-size" : "20px"
//   };
//   btns = KIP.Functions.CreateCSSClass(".form .btnBar", btns);
//   btns = {
//     "padding" : "5px",
//     "box-shadow": "1px 1px 1px 1px rgba(0,0,0,.2)",
//     "border-radius" : "3px",
//     "font-size" : "15px",
//     "opacity" : "0.7",
//     "margin" : "5px"
//   };
//   btns = KIP.Functions.CreateCSSClass(".form .btnBar .btn", btns);
//   btns = {
//       "opacity" : "1",
//       "cursor" : "pointer"
//   };
//   btns = KIP.Functions.CreateCSSClass(".form .btnBar .btn:hover", btns);
//   // Labels
//   lbl = {
//     "color": "#666",
//     "display" : "inline-block",
//     "text-align": "right",
//     "padding-left" : "5px",
//     "padding-right" : "5px"
//   }
//   lbl = KIP.Functions.CreateCSSClass(".form .lbl", lbl);
//   // Headers
//   hd = {
//     "color" : this.themeColor,
//     "font-weight" : "bold",
//     "font-size" : "22px",
//     "margin-bottom": "10px",
//     "margin-top": "10px"
//   }
//   hd = KIP.Functions.CreateCSSClass(".form .secHeader", hd);
//   // Columns
//   column = {
//     "display" : "table",
//     "width" : "100%"
//   }
//   column = KIP.Functions.CreateCSSClass(".form .columnContainer", column);
//   column = {
//     "display" : "table-cell"
//   };
//   column = KIP.Functions.CreateCSSClass(".form .column", column);
//   // Calculate the appropriate width for each table column
//   for (t = 0; t < this.tables.length; t += 1) {
//     tbl = this.tables[t];
//     cPerc = 100 / tbl.colNum;
//     column = {
//       "width" : cPerc + "%",
//     };
//     column = KIP.Functions.CreateCSSClass(".form #" + tbl.id + " .column", column);
//   }
// };
// 	}
// }
var KIP;
(function (KIP) {
    var SVG;
    (function (SVG) {
        ;
        /**...........................................................................
         * @class 	SVGDrawable
         * ...........................................................................
         * Create a drawable SVG canvas
         * @version 1.1
         * @author	Kip Price
         * ...........................................................................
         */
        var SVGDrawable = /** @class */ (function (_super) {
            __extends(SVGDrawable, _super);
            //#endregion
            /**...........................................................................
             * Constructs a basic SVG canvas
             * @param 	id     The ID of the canvas
             * @param 	bounds The real-world (e.g. in window) bounds of the canvas
             * @param 	opts   Any options that should be applied to the canvas
             * ...........................................................................
             */
            function SVGDrawable(id, bounds, opts) {
                var _this = _super.call(this, { id: id }) || this;
                /**
                 * _saveOriginalView
                 */
                _this._saveOriginalView = function () {
                    if (!this.originalView) {
                        this.originalView = {
                            x: this.viewX,
                            y: this.viewY,
                            w: this.viewW,
                            h: this.viewH
                        };
                    }
                };
                _this._bounds = bounds;
                _this._nonScaled = [];
                // Initialize the default maxima / minima
                _this._initializeInternalSizing();
                // Reconcile options
                var defaults = _this._createDefaultOptions();
                _this._options = KIP.reconcileOptions(opts, defaults);
                // Initiate collections
                _this._svgElems = new KIP.Collection();
                _this._nonScaled = new Array();
                // Add event listeners
                _this._addEventListeners();
                return _this;
            }
            Object.defineProperty(SVGDrawable, "_nextId", {
                get: function () {
                    SVGDrawable._lastId += 1;
                    return SVGDrawable._lastId.toString();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SVGDrawable.prototype, "view", {
                get: function () { return this._view; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SVGDrawable.prototype, "style", {
                get: function () { return this._style; },
                enumerable: true,
                configurable: true
            });
            /**...........................................................................
             * _initializeInternalSizing
             * ...........................................................................
             * Make sure we have default values for extrema
             * ...........................................................................
             */
            SVGDrawable.prototype._initializeInternalSizing = function () {
                this._extrema = {
                    min: {
                        x: 1000000,
                        y: 1000000
                    },
                    max: {
                        x: 0,
                        y: 0
                    }
                };
                // Initialize the viewport
                this._view = {
                    x: 0,
                    y: 0,
                    w: 0,
                    h: 0
                };
            };
            /**...........................................................................
             * _createDefaultOptions
             * ...........................................................................
             * Get the set of default options
             * @returns	The created default options
             * ...........................................................................
             */
            SVGDrawable.prototype._createDefaultOptions = function () {
                var defaults = {
                    gutter: 1,
                    auto_resize: true,
                    zoom_x: 0.08,
                    zoom_y: 0.08,
                    pan_x: true,
                    pan_y: true,
                    prevent_events: false
                };
                return defaults;
            };
            /**...........................................................................
             * _createElements
             * ...........................................................................
             * Create the elements needed for this SVG drawable
             * ...........................................................................
             */
            SVGDrawable.prototype._createElements = function () {
                // Create the base element
                this.base = KIP.createSVG(this._id, this._bounds.w, this._bounds.h);
                // Create the definitions element
                this._definitionsElement = KIP.createSVGElem("defs");
                this.base.appendChild(this._definitionsElement);
            };
            //#region EVENT HANDLING
            /**...........................................................................
             * _addEventListeners
             * ...........................................................................
             * Adds the relevant event listeners for the SVG object
             * ...........................................................................
             */
            SVGDrawable.prototype._addEventListeners = function () {
                var _this = this;
                // Add the wheel listener to the SVG element
                this.base.addEventListener("wheel", function (e) {
                    var delta = e.deltaY;
                    delta = (delta > 0) ? 1 : -1;
                    _this._onZoom(delta);
                });
                // Add the drag listeners
                KIP.makeDraggable(this.base, {
                    target: document.body,
                    onMove: function (delta) {
                        _this._onPan(delta);
                    }
                });
            };
            /**...........................................................................
             * _onZoom
             * ...........................................................................
             * handle zooming in & out
             * @param	direction	If positive, zooms in. If negative, zooms out
             * ...........................................................................
             */
            SVGDrawable.prototype._onZoom = function (direction) {
                var xAmt = this._options.zoom_x * direction;
                var yAmt = this._options.zoom_y * direction;
                var xUnit = this._view.w * xAmt;
                var yUnit = this._view.h * yAmt;
                // Resize appropriately in the x-dimension
                if (this._options.zoom_x) {
                    this._view.x -= xUnit;
                    this._view.w += (2 * xUnit);
                }
                // Resive appropriately in the y-dimension
                if (this._options.zoom_y) {
                    this._view.y -= yUnit;
                    this._view.h += (2 * yUnit);
                }
                // refresh the viewbox attribute
                this.generateViewboxAttribute(true);
            };
            /**...........................................................................
             * _onPan
             * ...........................................................................
             * handle panning the SVG canvas
             * @param	delta	The amount to pan by
             * ...........................................................................
             */
            SVGDrawable.prototype._onPan = function (delta) {
                if (this._options.pan_x) {
                    this._view.x += delta.x;
                }
                if (this._options.pan_y) {
                    this._view.y += delta.y;
                }
                // Update the view box
                this.generateViewboxAttribute(true);
            };
            Object.defineProperty(SVGDrawable.prototype, "width", {
                //#endregion
                //#region WIDTH AND HEIGHT CALCULATION
                /**...........................................................................
                 * Sets the real-world width of the canvas
                 * @param 	w 	The width to set
                 * ...........................................................................
                 */
                set: function (w) {
                    this._bounds.w = w;
                    this._elems.base.setAttribute("width", w.toString());
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SVGDrawable.prototype, "height", {
                /**...........................................................................
                 * Sets the real-world height of the canvas
                 * @param 	h 	The height to set
                 * ...........................................................................
                 */
                set: function (h) {
                    this._bounds.h = h;
                    this._elems.base.setAttribute("height", h.toString());
                },
                enumerable: true,
                configurable: true
            });
            /**...........................................................................
             * generateViewboxAttribute
             * ...........................................................................
             * Create a string that can be used in the viewbox attribute for the SVG
             * @param  	set		True if we should also set the attribute after generating it
             * @returns The viewbox attribute for the current view
             * ...........................................................................
             */
            SVGDrawable.prototype.generateViewboxAttribute = function (set) {
                var v_box = "";
                // Make sure we have no negative widths or heights
                if (this._view.w < 0) {
                    this._view.w = 1;
                }
                if (this._view.h < 0) {
                    this._view.h = 1;
                }
                // Generate the view box string
                v_box = this._view.x + " " + this._view.y + " " + this._view.w + " " + this._view.h;
                // Set the attribute if requested
                if (set) {
                    this.base.setAttribute("viewbox", v_box);
                }
                // Return the viewbox value
                return v_box;
            };
            /**...........................................................................
             * _calculateView
             * ...........................................................................
             * Calculate what the view of the SVG should be, based on the extrema
             * @returns True if the extrema were appropriately calculated
             * ...........................................................................
             */
            SVGDrawable.prototype._calculateView = function () {
                // If we shouldn't auto-resize,
                if (!this._options.auto_resize) {
                    return false;
                }
                // Update to the extrema
                this._view.x = this._extrema.min.x;
                this._view.y = this._extrema.min.y;
                this._view.w = (this._extrema.max.x - this._extrema.min.x);
                this._view.h = (this._extrema.max.y - this._extrema.min.y);
                // Return that we successfully updated the view
                return true;
            };
            /**...........................................................................
             * _updateExtrema
             * ...........................................................................
             * Updates the extreme points of this SVG element after adding an element
             * @param 	extrema 	The extrema of the element just added
             * ...........................................................................
             */
            SVGDrawable.prototype._updateExtrema = function (extrema) {
                // Update the minima if appropriate
                if (extrema.min.x < this._extrema.min.x) {
                    this._extrema.min.x = extrema.min.x;
                }
                if (extrema.min.y < this._extrema.min.y) {
                    this._extrema.min.y = extrema.min.y;
                }
                // Update the maxima is appropriate
                if (extrema.max.x > this._extrema.max.x) {
                    this._extrema.max.x = extrema.max.x;
                }
                if (extrema.max.y > this._extrema.max.y) {
                    this._extrema.max.y = extrema.max.y;
                }
            };
            //#endregion
            //#region CONVERSIONS
            /**...........................................................................
             * calculateSVGCoordinates
             * ...........................................................................
             * Calculates the SVG coordinates from real coordinates
             * @param   pt	The real coordinates to convert
             * @returns The SVG coordinates for this real point
             * ...........................................................................
             */
            SVGDrawable.prototype.calculateSVGCoordinates = function (pt) {
                return this._convertCoordinates(pt, this._view, this._bounds);
            };
            /**...........................................................................
             * calculateScreenCoordinates
             * ...........................................................................
             * Calculate the real coordinates from SVG coordinates
             * @param 	pt 	The point to convert to real coordinates
             * @returns	The real coordinates for this SVG point
             * ...........................................................................
             */
            SVGDrawable.prototype.calculateScreenCoordinates = function (pt) {
                return this._convertCoordinates(pt, this._bounds, this._view);
            };
            /**...........................................................................
             * _convertCoordinates
             * ...........................................................................
             *
             * ...........................................................................
             */
            SVGDrawable.prototype._convertCoordinates = function (pt, numerator, denominator) {
                var out;
                var x_ratio = (numerator.w / denominator.w);
                var y_ratio = (numerator.h / denominator.h);
                out = {
                    x: (x_ratio * (pt.x - denominator.x)) + numerator.x,
                    y: (y_ratio * (pt.y - denominator.y)) + numerator.y
                };
                return out;
            };
            SVGDrawable.prototype._convertDistance = function (measure, numerator, denominator) {
                var ratio = numerator / denominator;
                return (measure * ratio);
            };
            SVGDrawable.prototype.calculateSVGWidth = function (width) {
                return this._convertDistance(width, this._view.w, this._bounds.w);
            };
            SVGDrawable.prototype.calculateSVGHeight = function (height) {
                return this._convertDistance(height, this._view.h, this._bounds.h);
            };
            SVGDrawable.prototype.calculateScreenWidth = function (width) {
                return this._convertDistance(width, this._bounds.w, this._view.w);
            };
            SVGDrawable.prototype.calculateScreenHeight = function (height) {
                return this._convertDistance(height, this._bounds.h, this._view.h);
            };
            //#endregion
            //#region ADD CHILDREN
            /**...........................................................................
             * _addChild
             * ...........................................................................
             * @param 	type
             * @param 	attributes
             * @param 	parentGroup
             * @returns	The created SVG element
             * ...........................................................................
             */
            SVGDrawable.prototype._addChild = function (type, attributes, parentGroup) {
                // Throw an error if no data was provided
                if (type === "") {
                    throw new Error("no SVG element type provided");
                }
                var elem = KIP.createSVGElem(type, attributes);
                // Add to the appropriate parent
                if (parentGroup) {
                    parentGroup.appendChild(elem);
                }
                else {
                    this.base.appendChild(elem);
                }
                // Add to our collections
                if (attributes.unscalable) {
                    this._nonScaled.push(elem);
                }
                if (attributes["id"]) {
                    this._svgElems.addElement(attributes["id"], elem);
                }
                return elem;
            };
            SVGDrawable.prototype._initializeAttributes = function (attr, group) {
                if (!attr) {
                    attr = {};
                }
                // initialize the appropriate parent
                if (group) {
                    attr.parent = group;
                }
                else {
                    attr.parent = this.base;
                }
                // initialize the ID of the child
                if (!attr.id) {
                    attr.id = SVGDrawable._nextId;
                }
                return attr;
            };
            SVGDrawable.prototype._addChildElement = function (elem) {
                //this._elems.addElement(elem.id, elem);
                if (elem.preventScaling) {
                    //this._nonScaled.push(elem);
                }
                if (this._options.auto_resize) {
                    this._updateExtrema(elem.extrema);
                }
            };
            //#region ADD PATH
            /**
             * Adds a path to the SVG canvas
             * @param   {IPathPoint[]} points   The points to add to the path
             * @param   {IAttributes}  attr     Any attributes that should be applied
             * @param   {SVGElement}   group    The group this path should be added to
             * @param   {boolean}      noFinish True if we should finish the path without closing
             * @returns {SVGElement}            The path that was created
             */
            SVGDrawable.prototype.addPath = function (points, attr, group, noFinish) {
                attr = this._initializeAttributes(attr, group);
                attr.noFinish = noFinish;
                var path = new SVG.PathElement(points, attr);
                this._addChildElement(path);
                return path.base;
            };
            //#endregion
            //#region ADD RECTANGLE
            /**...........................................................................
             * addRectangle
             * ...........................................................................
             * @param x
             * @param y
             * @param width
             * @param height
             * @param attr
             * @param group
             * ...........................................................................
             */
            SVGDrawable.prototype.addRectangle = function (x, y, width, height, attr, group) {
                attr = this._initializeAttributes(attr, group);
                var rect = new SVG.RectangleElement(x, y, width, height, attr);
                this._addChildElement(rect);
                return rect.base;
            };
            //#endregion
            //#region ADD CIRCLE
            /**...........................................................................
             * addCircle
             * ...........................................................................
             * adds a circle to the SVG canvas
             * @param	centerPt
             * @param	radius
             * @param	attr
             * @param	group
             * @returns	The created circle
             * ...........................................................................
             */
            SVGDrawable.prototype.addCircle = function (centerPt, radius, attr, group) {
                attr = this._initializeAttributes(attr, group);
                var circle = new SVG.CircleElement(centerPt, radius, attr);
                this._addChildElement(circle);
                return circle.base;
            };
            //#endregion
            //#endregion
            //#region ADD POLYGON
            /**...........................................................................
             * regularPolygon
             * ...........................................................................
             * creates a regular polygon to the SVG canvas
             * @param   centerPt The central point of the polygon
             * @param   sides    The number of sides of the polygon
             * @param   radius   The radius of the polygon
             * @param   attr     Any additional attributes
             * @param   group    The group the polygon should be added to
             * @returns The created polygon on the SVG Canvas
             * ...........................................................................
             */
            SVGDrawable.prototype.regularPolygon = function (centerPt, sides, radius, attr, group) {
                attr = this._initializeAttributes(attr, group);
                var polygon = new SVG.PolygonElement(centerPt, sides, radius, attr);
                this._addChildElement(polygon);
                return polygon.base;
            };
            //#endregion
            //#region ADD STAR
            /**...........................................................................
             * addRegularStar
             * ...........................................................................
             * Creates a regular star on the SVG canvas
             * @param   centerPt      	The point at the center of the star
             * @param   numberOfPoints 	The number of points of this star
             * @param   radius        	[description]
             * @param   innerRadius   	[description]
             * @param   attr          	[description]
             * @param   group         	[description]
             * @returns The created star
             * ...........................................................................
             */
            SVGDrawable.prototype.addRegularStar = function (centerPt, numberOfPoints, radius, innerRadius, attr, group) {
                attr = this._initializeAttributes(attr, group);
                var star = new SVG.StarElement(centerPt, numberOfPoints, radius, innerRadius, attr);
                this._addChildElement(star);
                return star.base;
            };
            //#endregion
            //#region ADD TEXT
            /**...........................................................................
             * addtext
             * ...........................................................................
             * Adds a text element to the SVG canvas
             * @param   text     The text to add
             * @param   point    The point at which to add the point
             * @param   originPt If provided, the origin point within the text element that defines where the text is drawn
             * @param   attr     Any attributes that should be applied to the element
             * @param   group    The group to add this element to
             * @returns The text element added to the SVG
             * ...........................................................................
             */
            SVGDrawable.prototype.addText = function (text, point, originPt, attr, group) {
                attr = this._initializeAttributes(attr, group);
                var txt = new SVG.TextElement(attr);
                this._addChildElement(txt);
                return txt.base;
            };
            SVGDrawable.prototype.addFlowableText = function (text, bounds, attr, group) {
                //TODO: Add flowable text
                return null;
            };
            //#endregion
            //#region ADD GROUP
            /**...........................................................................
             * addGroup
             * ...........................................................................
             * @param	attr
             * @param 	group
             * @returns	The created element
             * ...........................................................................
             */
            SVGDrawable.prototype.addGroup = function (attr, group) {
                attr = this._initializeAttributes(attr, group);
                var grp = new SVG.GroupElement(attr);
                this._addChildElement(grp);
                return grp.base;
            };
            //#endregion
            //#region ADD GRADIENTS
            /**...........................................................................
             * addGradient
             * ...........................................................................
             * Adds a gradient to the SVG canvas
             * @param   type       The type of gradient to add
             * @param   points     What points describe the gradient
             * @param   transforms 	 ???
             * @returns he created gradient
             * ...........................................................................
             */
            SVGDrawable.prototype.addGradient = function (type, points, transforms) {
                return "";
                //TODO: the real thing
            };
            //#endregion
            //#region ADD PATTERNS
            // TODO: add pattern
            // public addPattern () {
            // }
            // TODO: add stipple pattern
            //public addStipplePattern () {
            //}
            //#endregion
            //#region ADD SHAPES
            /**
             * Adds a particular shape to the SVG canvas
             * @param   shapeType The type of shape to add
             * @param   scale     What scale the shape should be drawn at
             * @param   attr      Any attributes that should be applied to the element
             * @param   group     What group the element should be added to
             * @returns The created shape
             */
            SVGDrawable.prototype.addShape = function (shapeType, scale, attr, group) {
                // Use our default scale if one wasn't passed in
                if (!scale) {
                    scale = 1;
                }
                // Draw the appropriate shape
                switch (shapeType) {
                    case SVG.SVGShapeEnum.CHECKMARK:
                        return this._addCheckShape(scale, attr, group);
                    case SVG.SVGShapeEnum.X:
                        return this._addExShape(scale, attr, group);
                    case SVG.SVGShapeEnum.PLUS:
                        return this._addPlusShape(scale, attr, group);
                }
            };
            /**
             * Adds a checkmark to the canvas with the provided scale
             */
            SVGDrawable.prototype._addCheckShape = function (scale, attr, group) {
                attr = this._initializeAttributes(attr, group);
                var checkmark = new SVG.CheckElement(null, attr);
                this._addChildElement(checkmark);
                return checkmark.base;
            };
            /**
             * Adds an 'ex' to the canvas with the provided scale
             */
            SVGDrawable.prototype._addExShape = function (scale, attr, group) {
                attr = this._initializeAttributes(attr, group);
                var exElem = new SVG.ExElement(null, attr);
                this._addChildElement(exElem);
                return exElem.base;
            };
            /**
             * Adds a plus to the canvas with the provided scale
             */
            SVGDrawable.prototype._addPlusShape = function (scale, attr, group) {
                attr = this._initializeAttributes(attr, group);
                var plusSymbol = new SVG.PlusElement(null, attr);
                this._addChildElement(plusSymbol);
                return plusSymbol.base;
            };
            //#endregion
            /**...........................................................................
             * _convertPointsToPathPoints
             * ...........................................................................
             * Helper function to turn an array of IPoint elements to IPathPoint elements
             * @param   points 	The points to convert
             * @param   scale  	The scale that should be applied to the IPoint before turning into a IPathPoint
             * @returns Array of scaled IPathPoints
             * ...........................................................................
             */
            SVGDrawable.prototype._convertPointsToPathPoints = function (points, scale) {
                if (!scale) {
                    scale = 1;
                }
                var pathPoints = [];
                // Loop through each of the points
                for (var _i = 0, points_2 = points; _i < points_2.length; _i++) {
                    var pt = points_2[_i];
                    pt.x *= scale; // Scale the x dimension
                    pt.y *= scale; // Scale the y dimension
                    pathPoints.push(pt);
                }
                return pathPoints;
            };
            SVGDrawable.prototype.assignStyle = function (element) {
                this._style.assignStyle(element);
            };
            //
            /**...........................................................................
             * rotateElement
             * ...........................................................................
             * Rotates an element around a particular point
             * @param   elem         The element to rotate
             * @param   degree       How many degrees to rotate the element
             * @param   rotateAround What point to rotate around
             * @returns The rotated SVG Element
             * ...........................................................................
             */
            SVGDrawable.prototype.rotateElement = function (elem, degree, rotateAround) {
                var box;
                // If we don't have a point around which to rotate, set it to be the center of the element
                if (!rotateAround) {
                    box = this.measureElement(elem);
                    rotateAround = {
                        x: box.x + (box.w / 2),
                        y: box.y + (box.h / 2)
                    };
                }
                elem.setAttribute("transform", "rotate(" + degree + ", " + rotateAround.x + ", " + rotateAround.y + ")");
                return elem;
            };
            //TODO: add SVG ANIMATIONS
            SVGDrawable.prototype.animateElement = function () { };
            /**...........................................................................
             * measureElement
             * ...........................................................................
             * Measures an element in the SVG canvas
             * @param   element 	The element to measure
             * @returns The dimensions of the element, in SVG coordinates
             * ...........................................................................
             */
            SVGDrawable.prototype.measureElement = function (element) {
                var box;
                var addedParent;
                // Add our base element to the view if it doesn't have anything
                if (!this.base.parentNode) {
                    document.body.appendChild(this.base);
                    addedParent = true;
                }
                // Get the bounding box for element
                box = element.getBBox();
                // If we had to add the base element to the document, remove it
                if (addedParent) {
                    document.body.removeChild(this.base);
                }
                // Build our return rectangle
                var rect = {
                    x: box.x,
                    y: box.y,
                    w: box.width,
                    h: box.height
                };
                return rect;
            };
            //#region ID TRACKING
            SVGDrawable._lastId = 0;
            return SVGDrawable;
        }(KIP.Drawable));
        SVG.SVGDrawable = SVGDrawable;
    })(SVG = KIP.SVG || (KIP.SVG = {}));
})(KIP || (KIP = {}));
///<reference path="../svg/svgDrawable.ts" />
var KIP;
(function (KIP) {
    var Old;
    (function (Old) {
        /**
         * Creates a view of a project in a Gantt Chart
         * @class ProjectWindow
         * @param {string} name - The name & ID of the project
         * @param {Date} start - The date at which the default viewing window should start. Can be a date string or a Date object
         * @param {Date} end   - OBSOLETE. The date at which the default viewing window should end. Can be a date string or a Date object
         * @param {Object} [dim]   - What the dimensions of SVG Element should be
         */
        var ProjectWindow = /** @class */ (function (_super) {
            __extends(ProjectWindow, _super);
            //#endregion
            function ProjectWindow(name, start, dim) {
                var _this = _super.call(this, name, dim) || this;
                // OPTIONS
                _this.unitWidth = 5;
                _this.rowHeight = 10;
                _this.rowSpace = 2.5;
                _this.eventWidthDivisor = 1000;
                _this.useCoverRects = false;
                _this.showWeekends = true;
                _this.showOverallLbl = true;
                _this.disableFill = false;
                _this.showTitles = true;
                _this.alwaysShowEvents = true;
                _this.headerOffset = "20";
                _this.maxHeaderHeight = 40;
                _this.barPercentages = [0.5, 0.5];
                _this.bottomBarPercentage = 0.5;
                _this.bottomBarGap = 0.05;
                _this.barGap = 0.05;
                _this.eventRow = 0;
                // COLORS
                _this.monthColors = [
                    "#37c8ab",
                    "#00aad4",
                    "#0066ff",
                    "#3737c8",
                    "#7137c8",
                    "#ab37c8",
                    "#ff0066",
                    "#ff2a2a",
                    "#ff6600",
                    "#ffcc00",
                    "#abc837",
                    "#37c837"
                ];
                _this.textColor = "rgba(0, 0, 0, 1)";
                _this.bubbleColor = "#333";
                var view;
                _this.name = name;
                _this.id = name;
                // Create collections for items & events
                _this.items = [];
                _this.eventCnt = 0;
                _this.rows = [];
                _this.lines = [];
                _this.headers = [];
                _this.itemHeaders = [];
                _this.impDateCategories = [];
                _this.start = start;
                _this.today = KIP.Dates.getToday();
                _this.relToday = _this.ConvertToProjectPoint(_this.today);
                // Set the dimensions regardless of whether they were passed in
                if (dim) {
                    _this.width = dim.w;
                    _this.height = dim.h;
                }
                else {
                    _this.width = window.innerWidth;
                    _this.height = window.innerHeight;
                }
                // Create a SVG canvas for the project items
                KIP.SVG.SVGDrawable.call(_this, _this.id, "", { aspect: "none", zoomY: false });
                // Set up the view for the object
                view = _this.SetupView();
                _this.autoResize = false;
                _this.onlyShowVisibleTitles = false;
                // INITIALIZE BAR PERCENTAGES
                _this._addGroups();
                _this.CreateGuidelines();
                // Setup the color array for segments
                _this.segmentColors = [];
                // Add listener for resizing
                _this.AddWindowListeners(dim);
                // Set our standard font styles
                _this.fontProperty.family = "Segoe UI Semilight, Segoe UI, Calibri, Arial";
                return _this;
            }
            ;
            ProjectWindow.prototype._addGroups = function () {
                // Create the guidelines
                this.lineGrp = this.addGroup({ id: "lines" });
                this.itemGrp = this.addGroup({ id: "items" });
                this.eventGrp = this.addGroup({ id: "events" });
                this.txtGrp = this.addGroup({ id: "textBubbles" });
                this.coverGrp = this.addGroup({ id: "covers" });
                this.headerGrp = this.addGroup({ id: "guideHeaders" });
                this.overlayGrp = this.addGroup({ id: "overlay" });
                // Create the div that will hold the bubbles
                this.textDiv = KIP.createSimpleElement("svgText");
                this.headerDiv = KIP.createSimpleElement("svgHeaders");
            };
            /**
             * Adds listeners to the window in general, like resizing
             * @param {Object} [dim] - The original dimensions of the project window
             */
            ProjectWindow.prototype.AddWindowListeners = function (dim) {
                "use strict";
                var w_h, w_w, that;
                this.originalDimensions = dim;
                this.originalWindow = {
                    width: window.innerWidth,
                    height: window.innerHeight
                };
                that = this;
                window.addEventListener("resize", function () {
                    // initialize the new width / height
                    var newDim = {
                        width: window.innerWidth,
                        height: window.innerHeight
                    };
                    // Adjust to be scaled appropriately
                    newDim.width -= (that.originalWindow.width - that.originalDimensions.width);
                    newDim.height -= (that.originalWindow.height - that.originalDimensions.height);
                    that.ResizeChart(newDim);
                });
            };
            ;
            /** actually resize the viewport to maintain scale */
            ProjectWindow.prototype.ResizeChart = function (newDimensions) {
                var view, oldDimensions, oldWindow;
                oldDimensions = this.originalDimensions;
                oldWindow = this.originalWindow;
                // Resize the width & height accordingly
                this.width = newDimensions.width;
                this.height = newDimensions.height;
                this.dimensions = newDimensions;
                view = this._resizeView(newDimensions);
                this.CreateGuidelines();
                this.draw();
            };
            ;
            /**
             * Setup the first instance of the view
             */
            ProjectWindow.prototype.SetupView = function () {
                var ratio = this.width / this.height;
                this.view.h = (this.rowHeight * 30);
                this.view.w = (this.unitWidth * 50 * ratio);
                // Initialize the view x if we haven't yet
                this.view.x = 0;
                this.view.y = (-5 * this.rowHeight);
                return this.generateViewboxAttribute(true);
            };
            ;
            /** change view dimensions as needed */
            ProjectWindow.prototype._resizeView = function (newDimensions, updateStart) {
                "use strict";
                var newViewW, newViewH;
                newViewW = this.calculateSVGWidth(newDimensions.width);
                newViewH = this.calculateSVGHeight(newDimensions.height);
                if (!this.originalView) {
                    this.originalView = KIP.cloneObject(this.view);
                }
                this.originalView.w *= (newViewW / this.view.w);
                this.originalView.h *= (newViewH / this.view.h);
                this.view.w = newViewW;
                this.view.h = newViewH;
                if (updateStart) {
                    var svgPoint = this.calculateSVGCoordinates(newDimensions);
                    this.view.x = svgPoint.x;
                    this.view.y = svgPoint.y;
                }
                return this.generateViewboxAttribute();
            };
            /**
             * Takes in an input and returns the relative poisition on the default start date
             *
             * @param {Date} input - A date or date string that should be converted to a relative date
             * @param {Date} [start] - If provided, will compare this as the baseline point
             *
             * @returns {number} Where the relative date falls on the relative timeline
             */
            ProjectWindow.prototype.ConvertToProjectPoint = function (input, start, addTime) {
                "use strict";
                var diff;
                start = start || this.start;
                if (!this.showWeekends) {
                    diff = KIP.Dates.businessDateDiff(input, start, true, addTime);
                }
                else {
                    diff = KIP.Dates.dateDiff(input, start, true, addTime);
                }
                // Convert to a percentage start
                if (addTime) {
                    diff /= (1000 * 60 * 60 * 24);
                }
                return diff;
            };
            ;
            /**
             * Takes a relative project point and reverts it to its original point.
             *
             * @param {number} pt - The relative date to convert
             *
             * @returns {Date} The reverted date
             */
            ProjectWindow.prototype.RevertFromProjectPoint = function (pt) {
                "use strict";
                var dt;
                dt = new Date(this.start);
                // We need to add weekends back in if we are currently excluding them
                if (!this.showWeekends) {
                    pt += 2 * Math.floor((pt + this.start.getDay()) / 5) + 1;
                }
                // Calculate the reverse date
                dt.setDate(dt.getDate() + pt);
                return dt;
            };
            ;
            ProjectWindow.prototype.AddGrouper = function (lbl) {
                "use strict";
            };
            ;
            ProjectWindow.prototype.AddSpacer = function (name) {
                "use strict";
                var rIdx = this.rows.length;
                var obj = {
                    type: 'spacer',
                    name: name
                };
                rIdx = this.rows.push(obj);
                this.items.push(obj);
            };
            ;
            ProjectWindow.prototype.CreateExpandedInfo = function (addl) {
                "use strict";
                var div, key, val, excl;
                excl = {
                    "TopSegments": true,
                    "BottomSegments": true,
                    "Events": true,
                    "Design": true,
                    "ganttItem": true,
                    "svgElem": true,
                    "sidebarElem": true,
                    "groupName": true
                };
                div = KIP.createElement({ cls: "additionalInfo" });
                if (!this.expandedInfoCB) {
                    div.innerHTML = this.WriteArray(addl, "<div class='additionalInfoLine'>", "</div>", excl);
                }
                else {
                    div.innerHTML = this.expandedInfoCB(addl);
                }
                return div;
            };
            ;
            ProjectWindow.prototype.WriteArray = function (arr, before, after, exclude) {
                "use strict";
                var key, val, ret;
                ret = "";
                for (key in arr) {
                    if (arr.hasOwnProperty(key)) {
                        val = arr[key];
                        if (exclude && exclude[key]) {
                            continue;
                        }
                        if (typeof val !== "object") {
                            ret += before + key + " : " + val + after;
                        }
                        else if (val) {
                            ret += before + key + " : " + this.WriteArray(val, before, after) + after;
                        }
                    }
                }
                return ret;
            };
            ;
            /**
             * Adds a timeline item to the view
             *
             * @param {date} s - The start date for the item
             * @param {date} e - The end date for the item
             * @param {string} lbl - What to use to display information about the item
             * @param {array} segments - An array of arrays of objects that contain the data to display for each of the rows of the item
             * @param {object} addl - Any additional details about the item that are worth knowing
             * @returns {SVGElement} The item that was created
             */
            ProjectWindow.prototype.AddItem = function (s, e, lbl, segments, addl, offset) {
                "use strict";
                var idx, item, sIdx, segment, row, y, x, div, start, end, sDt, segHeight, segEnd, ctx, that, sIdx, lastY;
                that = this;
                // Convert to dates if needed
                if (!s.getYear) {
                    s = new Date(s);
                }
                if (!e.getYear) {
                    e = new Date(e);
                }
                // Grab the relative dates from the real dates
                start = this.ConvertToProjectPoint(s, "", true);
                end = this.ConvertToProjectPoint(e, "", true);
                idx = this.items.length;
                row = this.GetRow(start, end);
                // Create the appropriate item object
                item = this.items[idx] = {
                    grp: this.addGroup({ id: "item" + idx }, this.itemGrp),
                    lbl: lbl,
                    row: row,
                    start: s,
                    end: e,
                    x: start * this.unitWidth,
                    y: (row * this.rowHeight * this.rowSpace),
                    width: (end - start) * this.unitWidth,
                    id: idx,
                    eventGrp: this.addGroup({ id: idx + "|events" }, this.eventGrp),
                    addl: addl,
                    addlInfoExpanded: this.CreateExpandedInfo(addl),
                    coverRectGrp: this.addGroup({ id: idx + "|cover" }, this.coverGrp),
                    coverRect: null
                };
                // Loop through the segments & draw
                for (sIdx = 0; sIdx < segments.length; sIdx += 1) {
                    this.CreateSegments(segments[sIdx], item, start, end, item.y, sIdx);
                }
                // Create a context menu 
                item.ctx = this.AddContextMenu(item);
                // Create some text that should apply to
                // Try to overlay text above the item
                this.fillProperty.color = this.textColor;
                this.fillProperty.opacity = 1;
                var font_family = this.fontProperty.family;
                var font_weight = this.fontProperty.weight;
                if (!addl || !addl.isGroup) {
                    this.fontProperty.size = (4 * this.rowHeight / 9);
                    this.fontProperty.family = "Segoe UI Light, Calibri Light, Arial";
                }
                else {
                    this.fontProperty.size = (2 * this.rowHeight / 3);
                    this.fontProperty.weight = "bold";
                }
                item.text = this.addText(lbl, { x: item.x + this.unitWidth / 2, y: item.y }, null, { unscalable: true }, item.grp);
                this.fontProperty.family = font_family;
                this.fontProperty.weight = font_weight;
                this.fillProperty.opacity = 1;
                if (!this.showTitles) {
                    item.text.parentNode.removeChild(item.text);
                }
                // Add to our row tracker as appropriate
                if (!this.rows[row]) {
                    this.rows[row] = [];
                }
                this.rows[row].push(item);
                return item;
            };
            ;
            /** Adds the covering rectangle for an item */
            ProjectWindow.prototype.__addCoverRect = function (item) {
                "use strict";
                var bbox, oFill, oStroke;
                // IF WE ALREADY HAVE A COVER, REMOVE IT
                if (item.coverRect && item.coverRect.parentNode) {
                    item.coverRect.parentNode.removeChild(item.coverRect);
                }
                // MEASURE ELEMENT
                bbox = this.measureElement(item.grp);
                // SAVE OFF STYLE
                oFill = KIP.cloneObject(this.fillProperty);
                oStroke = KIP.cloneObject(this.lineProperty);
                // SET NEW STYLE
                this.fillProperty.opacity = 0;
                this.fillProperty.type = "solid";
                this.fillProperty.color = "rgba(0,0,0,0)";
                this.lineProperty.opacity = 0;
                this.lineProperty.type = "none";
                // CREATE THE RECTANGLE
                item.coverRect = this.addRectangle(bbox.x, bbox.y, bbox.width, bbox.height, {}, item.coverRectGrp);
                // RESTORE OLD STYLE
                this.fillProperty = oFill;
                this.lineProperty = oStroke;
            };
            ;
            /**
             * Creates a context menu for the item
             *
             * @param {Object} item - The item to add the menu to
             *
             * @returns {ContextMenu} The menu to display for this element
             */
            ProjectWindow.prototype.AddContextMenu = function (item) {
                "use strict";
                var ctx, that;
                that = this;
                // Create a context menu for this element
                if (!this.useCoverRects) {
                    ctx = new KIP.ContextMenu(item.grp);
                }
                else {
                    ctx = new KIP.ContextMenu(item.coverRectGrp);
                }
                // Create the option to expand or collapse the task
                /*ctx.AddOption("Expand/Collapse", function () {
                    that.ExpandItem(item);
                });*/
                ctx.AddOption("Remove", function () {
                    that.RemoveItem(item);
                });
                return ctx;
            };
            ;
            /**
             * Grabs the row at which an item appears
             * @param {Object} item - The item to grab the row of
             * @returns {number} The row at which the item appears
             */
            ProjectWindow.prototype.GetRowOfItem = function (item) {
                "use strict";
                var rIdx, rIt;
                // First try just to grab the item's row
                if (item && item.row) {
                    return item.row;
                }
                // Loop backwards as it will usually be the last item added
                for (rIdx = (this.rows.length - 1); rIdx >= 0; rIdx += 1) {
                    for (rIt = 0; rIt < this.rows[rIdx].length; rIt += 1) {
                        if (this.rows[rIdx][rIt] === item) {
                            return rIdx;
                        }
                    }
                }
            };
            ;
            /**
             * Creates the top/bottom segments of an item
             * @param {Array} arr - The segments to create
             * @param {Object} item - The item to add this to
             */
            ProjectWindow.prototype.CreateSegments = function (arr, item, start, end, startY, segRow) {
                "use strict";
                var idx, x, lastX, segEnd, sDt, first;
                lastX = start;
                first = true;
                // Loop through each of the segments
                for (idx = 0; idx < arr.length; idx += 1) {
                    if (!arr[idx])
                        continue;
                    sDt = arr[idx].end;
                    if (!sDt.getYear) {
                        sDt = new Date(sDt);
                    }
                    segEnd = this.ConvertToProjectPoint(sDt, "", true);
                    if (arr[idx].start) {
                        sDt = arr[idx].start;
                        if (!sDt.getYear) {
                            sDt = new Date(sDt);
                        }
                        x = this.ConvertToProjectPoint(sDt, "", true);
                    }
                    else {
                        x = lastX;
                    }
                    if (!first) {
                        //x += 0.5;
                    }
                    else {
                        first = false;
                    }
                    // Try to draw the segment
                    if (segEnd >= x) {
                        this.CreateSegment(item, { x: x, y: startY }, segEnd, arr[idx], idx, segRow, item);
                        // Handle the error case of something not actually being a forward rectangle
                    }
                    else {
                        console.log("\nError in segment creation\nStart: " + x + " End: " + segEnd);
                    }
                    lastX = segEnd;
                }
                if (this.disableFill)
                    return;
                // If we haven't hit the end, create a last segment
                if (lastX !== end) {
                    if (first) {
                        x = start;
                    }
                    else {
                        x = lastX + 0.5;
                    }
                    this.CreateSegment(item, { x: x, y: startY }, end, {}, -1, segRow, item);
                }
            };
            ;
            /**
             * Creates a segment for a piece of the project plan.
             *
             * @param {Object} item - The item this is being created for
             * @param {Object} start - The start x & y value
             * @param {number} end - At what point the segment ends
             * @param {Object} data - Any additional available data about the segment
             * @param {number} idx - What index of segment we are creating
             * @param {bool} isBottom - True if we are drawing the bottom set of segments
             *
             * @returns {SVGDrawable} The created segment
             */
            ProjectWindow.prototype.CreateSegment = function (item, start, end, data, idx, rowNum, addl) {
                "use strict";
                var segment, div, y, height, x, width, i, txt;
                // Adjust the top value as appropriate
                y = start.y;
                height = this.rowHeight * (this.barPercentages[rowNum]);
                if (rowNum > 0) {
                    for (i = (rowNum - 1); i >= 0; i -= 1) {
                        y += (this.rowHeight * this.barPercentages[i]) + (this.barGap * this.rowHeight);
                    }
                    y += (this.barGap * this.rowHeight);
                }
                // Set the x & width values for readability
                x = start.x * this.unitWidth;
                width = ((end - start.x) * this.unitWidth);
                if ((width < 0) || (isNaN(width))) {
                    console.log("Err: improper width for segment");
                    return;
                }
                // Set the appropriate color & fill properties
                this.SetSegmentStyle(data, idx);
                // Create the segment and label
                segment = this.addRectangle(x, y, width, height, null, item.grp);
                if (data.lbl) {
                    txt = data.lbl;
                    if (data.type) {
                        txt += "<br>[" + data.type + " on " + data.end + "]";
                    }
                    if (!this.showTitles) {
                        txt += "<br><br>" + addl.lbl + " (" + KIP.Dates.shortDate(addl.start) + " - " + KIP.Dates.shortDate(addl.end) + ")";
                    }
                    div = this.AddTextBubble(txt, segment, item, "", (y + (6 * height)) - item.y);
                }
                return segment;
            };
            ;
            /**
             * Sets the style for the provided segment. Can be overriden by individual implementations
             * @param {SVGElement} segment - Data about the segment to set the appropriate color
             * @param {number} idx - The index of the segment
             */
            ProjectWindow.prototype.SetSegmentStyle = function (segment, idx) {
                "use strict";
                if (!this.segmentColors[idx]) {
                    this.segmentColors[idx] = KIP.Colors.generateColor(idx, KIP.Colors.HSLPieceEnum.HUE);
                }
                this.fillProperty.type = "solid";
                this.fillProperty.color = this.segmentColors[idx];
            };
            ;
            /**
             * Adds data about an event without actually drawing it
             *
             * @param {Object} item     - The item object to add event data to
             * @param {Date} pos      - The date at which this event should appear. Accepts a date string or Date object
             * @param {String} lbl      - What label should appear for the event on hover
             * @param {Object} addlInfo - Any additional information needed about the event
             *
             * @returns {Object} The data about the created event
             */
            ProjectWindow.prototype.AddEventData = function (item, pos, lbl, addlInfo) {
                "use strict";
                var ev, dt, pt, row, x, y, i;
                if (!item)
                    return;
                if (!pos.getYear) {
                    dt = new Date(pos);
                }
                else {
                    dt = pos;
                }
                pt = this.ConvertToProjectPoint(dt, "", true);
                x = pt * this.unitWidth;
                row = this.GetRowOfItem(item);
                // Get the appropriate height
                y = (row * this.rowHeight) + ((row - 1) * this.rowSpace);
                for (i = (this.eventRow - 1); i >= 0; i -= 1) {
                    y += ((2 * this.barGap * this.rowHeight) + (this.rowHeight * this.barPercentages[i]));
                }
                ev = {
                    lbl: lbl,
                    date: pos,
                    prjPt: pt,
                    row: row,
                    x: x,
                    y: y,
                    addl: addlInfo
                };
                // Add to our array
                if (!item.events) {
                    item.events = [];
                }
                item.events.push(ev);
                // return the created object
                return ev;
            };
            ;
            /**
             * Adds an event & draws it
             *
             * @param {Object} item - The item object to add event data to
             * @param {Object} [ev] - If available, the data that was already created for this event. Created if not passed in
             * @param {Date} [pos] - The date at which this event should appear. If ev is passed in, this is ignored
             * @param {String} [lbl] - The label that should appear for this event. If ev is passed in, this is ignored
             * @param {Object} [addlInfo] - Any additional info available for the event
             *
             * @returns {SVGElement} The event that was created
             */
            ProjectWindow.prototype.AddEvent = function (item, ev, pos, lbl, addlInfo, large) {
                "use strict";
                var date, row, dx, dy, txt, event, height;
                // Quit if we don't have an item
                if (!item)
                    return;
                // Grab the appropriate data
                if (!ev) {
                    ev = this.AddEventData(item, pos, lbl, addlInfo);
                }
                // Grab the offset valies we should use
                dx = this.unitWidth / 8;
                dy = this.rowHeight / (2 + this.barPercentages.length);
                // Set attributes for the event
                this.fillProperty.type = "solid";
                if (ev.addl) {
                    if (ev.addl.idx || ev.addl.idx === 0) {
                        this.fillProperty.color = this.segmentColors[ev.addl.idx];
                    }
                    else if (ev.addl.color) {
                        this.fillProperty.color = ev.addl.color;
                    }
                }
                else {
                    this.fillProperty.color = "#FFF";
                }
                // Set the appropriate line properties
                //this.fillProperty.opacity = 0.3;
                height = this.rowHeight * this.barPercentages[this.eventRow];
                // Create a marker for the event
                if (large) {
                    this.lineProperty.type = "None";
                    this.lineProperty.width = 0;
                    this.lineProperty.color = "rgba(0,0,0,0)";
                    event = this.addPath([
                        { x: ev.x - dx, y: ev.y - dy },
                        { x: ev.x - dx, y: ev.y },
                        { x: ev.x, y: ev.y + (0.5 * dy) },
                        { x: ev.x + dx, y: ev.y },
                        { x: ev.x + dx, y: ev.y - dy }
                    ], { id: "ev." + this.eventCnt }, item.eventGrp);
                    // Draw the small event line
                }
                else {
                    this.lineProperty.type = "solid";
                    this.lineProperty.color = "rgba(0,0,0,0)";
                    this.lineProperty.width = "0";
                    event = this.addRectangle(ev.x, ev.y, (this.view.w / this.eventWidthDivisor), height, { id: "ev." + this.eventCnt }, item.eventGrp);
                }
                txt = this.AddTextBubble(ev.lbl, event, item, "", "", 0.3);
                this.lineProperty.type = "None";
                this.lineProperty.width = 0;
                this.lineProperty.color = "rgba(0,0,0,0)";
                //this.fillProperty.opacity = 1;
                this.eventCnt += 1;
                return event;
            };
            ;
            /**
             * Removes all events linked to an event from the canvas (but not the internal collection)
             * Used to only draw events on zoom in
             * @param {Object} item - The item to remove events from
             */
            ProjectWindow.prototype.RemoveEvents = function (item) {
                "use strict";
                item.eventGrp.innerHTML = "";
            };
            ;
            /**
             * Adds all events in an item's internal array to the canvas.
             * Used to only draw events on zoom in
             * @param {Object} item - The item to add events to.
             */
            ProjectWindow.prototype.AddEvents = function (item, large) {
                "use strict";
                var ev, event;
                if (!item.events)
                    return;
                for (ev = 0; ev < item.events.length; ev += 1) {
                    this.AddEvent(item, item.events[ev], "", "", "", large);
                }
            };
            ;
            /**
             * Expands an item to fill the screen.
             * Allows the view of more details about the event
             * @param {Object} item - The item to expand
             */
            ProjectWindow.prototype.ExpandItem = function (item) {
                "use strict";
                var scaleCoord, posCoord, w, h, subSVG, that;
                that = this;
                // Create a second SVG canvas to host the expanded display
                // TODO
                // Handle collapsing
                if (item.expanded) {
                    // Remove from the overlay
                    this.overlayGrp.removeChild(item.grp);
                    this.overlayGrp.removeChild(this.overlay);
                    this.overlayGrp.removeChild(item.eventGrp);
                    this._parent.removeChild(item.addlInfoExpanded);
                    this.itemGrp.appendChild(item.grp);
                    this.eventGrp.appendChild(item.eventGrp);
                    item.expanded = false;
                    this.expanded = null;
                    //this._elems.base.style.cursor = "-webkit-grab";
                    item.grp.removeAttribute("transform");
                    item.eventGrp.removeAttribute("transform");
                    if (!this.alwaysShowEvents) {
                        this.RemoveEvents(item);
                        this.AddEvents(item);
                    }
                    item.text.style.fill = "#000";
                    item.text.removeAttribute("transform");
                    // Handle expanding
                }
                else {
                    // Create the overlay
                    this.fillProperty.opacity = 0.8;
                    this.fillProperty.color = "#000";
                    this.fillProperty.type = "solid";
                    this.overlay = this.addRectangle(this.view.x, this.view.y, this.view.w, this.view.h, null, this.overlayGrp);
                    this.overlay.addEventListener("click", function () {
                        that.ExpandItem(item);
                    });
                    this.itemGrp.removeChild(item.grp);
                    this.eventGrp.removeChild(item.eventGrp);
                    this.overlayGrp.appendChild(item.grp);
                    this.overlayGrp.appendChild(item.eventGrp);
                    this._parent.appendChild(item.addlInfoExpanded);
                    item.expanded = true;
                    this.expanded = item;
                    //this._elems.base.style.cursor = "default";
                    // Calculate the appropriate coordinates
                    w = document.documentElement.clientWidth || window.innerWidth;
                    h = document.documentElement.clientHeight || window.innerHeight;
                    scaleCoord = this.calculateSVGCoordinates({ x: w - 20, y: (2 * h / 3) });
                    posCoord = this.calculateSVGCoordinates({ x: 20, y: (window.innerHeight) / 3 });
                    scaleCoord.x -= posCoord.x;
                    scaleCoord.y -= posCoord.y;
                    // Actually do the resizing
                    this.ResizeAndRepositionItem(item, {
                        w: scaleCoord.x,
                        h: scaleCoord.y,
                        x: posCoord.x,
                        y: posCoord.y
                    });
                    item.text.style.fill = "rgba(0,0,0,0)";
                    item.text.setAttribute("transform", "translate(0," + (-0.25 * this.measureElement(item.text).h) + ")");
                    if (!this.alwaysShowEvents) {
                        this.RemoveEvents(item);
                        this.AddEvents(item, true);
                    }
                }
            };
            ;
            /**
             * Gets the row at which an item should appear, before the item is created
             *
             * @param {Date} start - The start date of the event we are getting the row for
             * @param {Date} end - The end date of the event we are getting the row for
             *
             * @returns {number} The row number for this item
             */
            ProjectWindow.prototype.GetRow = function (start, end) {
                "use strict";
                // TODO eventually: allow multiple elements per row
                return this.rows.length;
            };
            ;
            /**
             * OBSOLETE Creates a text bubble as an SVG
             * @param {number} x      The x coordinate the bubble should appear at
             * @param {number} y      The y coordinate the bubble should appear at
             * @param {String} lbl    The label that should appear in the bubble
             * @param {SVGGroup} layer - The layer at which this bubble should be added
             * @param {Object} origin - The origin of the text that will be displayed
             * @returns {SCGElement} The bubble that is created
             */
            ProjectWindow.prototype.AddSVGTextBubble = function (x, y, lbl, layer, origin) {
                "use strict";
                var rect, text, attr, dim, grp;
                grp = this.addGroup({ id: lbl + "bubble" }, layer);
                if (lbl === "") {
                    lbl = "??";
                }
                // Reset other properties
                this.lineProperty.type = "none";
                this.lineProperty.width = 0;
                this.lineProperty.color = "rgba(0,0,0,0)";
                // Set the color attributes
                this.fillProperty.type = "solid";
                this.fillProperty.color = this.bubbleColor;
                // Set the rectangle attributes
                attr = {
                    rx: (this.rowHeight / 3),
                    ry: (this.rowHeight / 3)
                };
                rect = this.addRectangle(x, y, 0, 0, attr, grp);
                if (!origin) {
                    origin = {};
                    origin.x = 0;
                    origin.y = 0;
                }
                // Add the text
                this.fillProperty.color = this.textColor;
                this.fontProperty.family = "Segoe UI Semilight, Segoe UI, Calibri, Arial";
                this.fontProperty.size = (this.rowHeight / 3) + "pt";
                text = this.addText(lbl, { x: x, y: y }, origin, {}, grp);
                // Resize the rectangle to the size of the text
                dim = this.measureElement(text);
                rect.setAttribute("width", dim.width * 1.75);
                rect.setAttribute("height", dim.height * 1.65);
                rect.setAttribute("x", x);
                text.setAttribute("x", x + (dim.width * 0.37));
                rect.setAttribute("y", dim.y - (dim.height * 82.5));
                return grp;
            };
            ;
            /**
             * Adds a label hover bubble for an svg element. Stays in the same place for the DLG
             *
             * @param {String} lbl - The label that should appear in the bubble
             * @param {SVGElement} elem - The element to add the bubble to
             * @param {Object} item - The item object that this bubble is generally being applied to
             * @param {number} [anchor_x] - The x-position at which a bubble should always appear
             * @param {number} [anchor_y] - The y-position at which a bubble should always appear
             *
             * @returns {HTMLElement} The text bubble that was created
             */
            ProjectWindow.prototype.AddTextBubble = function (lbl, elem, item, anchor_x, anchor_y, origOpacity) {
                "use strict";
                var div, that;
                if (!elem)
                    return;
                // check if we've attched our element
                if (!this.textDiv.parentNode) {
                    this._parent.appendChild(this.textDiv);
                }
                if (this.options.noHoverBubbles)
                    return;
                div = KIP.createSimpleElement("txt." + lbl, "textBubble", lbl);
                div.style.position = "absolute";
                div.style.backgroundColor = this.bubbleColor;
                div.style.color = this.textColor;
                div.style.fontFamily = "Segoe UI Light";
                div.style.padding = "5px";
                div.style.borderRadius = "5px";
                div.style.fontSize = "12px";
                div.style.boxShadow = "1px 1px 8px 2px rgba(0,0,0,.1)";
                this.textDiv.appendChild(div);
                that = this;
                // Mouse in listener
                elem.addEventListener("mouseover", function (ev) {
                    var x, y, box;
                    // Quit if we've already revealed the bubble
                    if (!KIP.hasClass(div, "hidden"))
                        return;
                    // Hide whatever bubble was showing last if it's not hidden
                    if (that.lastBubble) {
                        KIP.addClass(that.lastBubble, "hidden");
                    }
                    box = elem.getBoundingClientRect();
                    x = ev.x; //Math.round(box.left < 0 ? 0 : box.left);
                    y = Math.round(box.top + box.height);
                    // Set the appropriate coordinates
                    KIP.removeClass(div, "hidden");
                    // Make sure whatever coordinates we found are still on the screen
                    box = div.getBoundingClientRect();
                    if (x < 0) {
                        x = 0;
                    }
                    else if ((x + box.width) > window.innerWidth) {
                        x = (window.innerWidth - box.width);
                    }
                    if (y < 0) {
                        y = 0;
                    }
                    else if ((y + box.height) > window.innerHeight) {
                        y = (window.innerHeight - box.height);
                    }
                    div.style.left = x + "px";
                    div.style.top = y + "px";
                    that.lastBubble = div;
                    elem.style.opacity = 1;
                });
                // Mouse out listener
                elem.addEventListener("mouseout", function (ev) {
                    var rel = ev.toElement || ev.relatedTarget;
                    //if (rel === div) return;
                    KIP.addClass(div, "hidden");
                    elem.style.opacity = origOpacity;
                });
                elem.addEventListener("mousemove", function (ev) {
                    if (KIP.hasClass(div, "hidden"))
                        return;
                    div.style.left = ev.x + "px";
                });
                KIP.addClass(div, "hidden");
                return div;
            };
            ;
            /**
             * Creates the lines indicating dates on the Gantt chart
             */
            ProjectWindow.prototype.CreateGuidelines = function () {
                "use strict";
                var num, lIdx, ln, func, relToday, x, dow, today, revDt, w, mult, coordA, coordB, noShow, shortDt, txt, txtColor, box, dIdx;
                // Don't draw lines if they wouldn't show
                coordA = this.calculateScreenCoordinates(this.view);
                coordB = this.calculateScreenCoordinates({ x: this.view.x + (this.unitWidth / 15), y: this.view.y });
                if ((coordB.x - coordA.x) === 0) {
                    noShow = true;
                }
                // Even if they might be shown, don't show more than 200 lines
                if (this.view.w > (200 * this.unitWidth)) {
                    noShow = true;
                }
                // Create headers first
                this.CreateGuideHeaders(noShow);
                // Remove all old guildelines
                for (lIdx = this.lines.length - 1; lIdx >= 0; lIdx -= 1) {
                    if (this.lines[lIdx] && this.lines[lIdx].parentNode) {
                        this.lineGrp.removeChild(this.lines[lIdx]);
                    }
                }
                this.lines = [];
                num = this.view.w / this.unitWidth;
                today = new Date();
                dow = today.getDay();
                relToday = this.ConvertToProjectPoint(today);
                // Set the fill properies for these lines
                this.fillProperty.type = "solid";
                this.lineProperty.type = "none";
                this.lineProperty.color = "rgba(0,0,0,0)";
                this.lineProperty.width = 0;
                // Loop throuh all visible lines at this point
                for (lIdx = 0; lIdx < num; lIdx += 1) {
                    x = this.view.x + (this.unitWidth - (this.view.x % this.unitWidth)) + (lIdx * this.unitWidth);
                    revDt = this.RevertFromProjectPoint(x / this.unitWidth);
                    shortDt = KIP.Dates.shortDate(revDt);
                    dow = revDt.getDay();
                    txt = "";
                    if (this.importantDates[shortDt]) {
                        // Set a variable width for these
                        w = (this.unitWidth / this.importantDates[shortDt].length);
                        for (dIdx = 0; dIdx < this.importantDates[shortDt].length; dIdx += 1) {
                            this.fillProperty.color = this.importantDates[shortDt][dIdx].color;
                            // Show a border if the date is also today
                            if (KIP.Dates.dateDiff(revDt, today) === 0) {
                                this.lineProperty.width = (w / 8);
                                this.lineProperty.color = "#8AE";
                                this.lineProperty.type = "solid";
                            }
                            txt = this.importantDates[shortDt][dIdx].lbl;
                            txtColor = this.importantDates[shortDt][dIdx].textColor;
                            ln = this.addRectangle(x + (dIdx * w), this.view.y, w, this.view.h, null, this.lineGrp);
                            this.lines.push(ln);
                        }
                        this.lineProperty.type = "none";
                        this.lineProperty.width = 0;
                        this.lineProperty.color = "rgba(0,0,0,0)";
                        continue;
                        // HILITE THE TODAY COLUMN
                    }
                    else if (KIP.Dates.dateDiff(revDt, today) === 0) {
                        this.fillProperty.color = "rgba(0,0,0,.2)";
                        w = this.unitWidth;
                        // MAKE WEEKENDS GREY
                    }
                    else if (this.showWeekends && (dow === 0 || dow === 6)) {
                        this.fillProperty.color = "rgba(0,0,0,.05)";
                        w = this.unitWidth;
                        // HILITE THE FIRST DAY OF THE WEEK IF WE AREN'T SHOWING WEEKENDS
                    }
                    else if (!this.showWeekends && dow === 1) {
                        //if (noShow) continue;
                        this.fillProperty.color = "rgba(255,255,255,.1)"; //KJPTEST
                        this.lineProperty.color = "rgba(100,100,100,.3)";
                        this.lineProperty.type = "solid";
                        this.lineProperty.width = this.unitWidth / 20;
                        // REGULAR COLUMN FILL
                    }
                    else {
                        //if (noShow) continue;
                        this.fillProperty.color = "rgba(255,255,255,.1)"; //KJPTEST
                        this.lineProperty.color = "rgba(220,220,220,.4)";
                        this.lineProperty.type = "solid";
                        this.lineProperty.width = this.unitWidth / 20;
                    }
                    ln = this.addRectangle(x, this.view.y, this.unitWidth, this.view.h, { "class": "projectCol", "id": "col" + shortDt }, this.lineGrp);
                    this.lines.push(ln);
                    this.lineProperty.type = "none";
                    this.lineProperty.color = "rgba(0,0,0,0)";
                    this.lineProperty.width = 0;
                    // Draw the text for important dates
                    if (txt) {
                        this.fillProperty.color = txtColor;
                        this.fontProperty.size = (2 * this.unitWidth / 3);
                        txt = this.addText(txt, { x: (0.5 * this.unitWidth), y: (3 * this.rowHeight) }, { x: 0.5, y: 0.5 }, {}, this.lineGrp);
                        box = this.measureElement(txt);
                        txt.setAttribute("y", +txt.getAttribute("y") + (box.width / 2) + this.rowHeight);
                        this.rotateElement(txt, -90);
                        this.lines.push(txt);
                    }
                }
            };
            ;
            /**
             * Creates the headers for the dates on the Gantt chart
             */
            ProjectWindow.prototype.CreateGuideHeaders = function (noNumbers) {
                "use strict";
                var num, header, txt, idx, revDt, x, months, mIdx, rect, month, w, maxH, h, txt, pt;
                if (!this.textDiv.parentNode && this._parent) {
                    this._parent.appendChild(this.textDiv);
                }
                // remove all of the old guide headers
                for (idx = this.headers.length - 1; idx >= 0; idx -= 1) {
                    if (this.headers[idx] && this.headers[idx].parentNode) {
                        this.headers[idx].parentNode.removeChild(this.headers[idx]);
                    }
                }
                this.headers = [];
                months = {};
                // Calculate the max height in SVG units
                maxH = this.calculateSVGHeight(this.maxHeaderHeight);
                h = maxH;
                this.fillProperty.type = "solid";
                this.fontProperty.size = (h / 3);
                this.fillProperty.opacity = 1;
                num = this.view.w / this.unitWidth;
                for (idx = 0; idx < num; idx += 1) {
                    x = this.view.x + (this.unitWidth - (this.view.x % this.unitWidth)) + ((idx - 1) * this.unitWidth);
                    revDt = this.RevertFromProjectPoint(x / this.unitWidth);
                    mIdx = revDt.getMonth() + "." + revDt.getYear();
                    // Initialize the months index if appropriate
                    if (!months[mIdx]) {
                        months[mIdx] = {
                            name: KIP.Dates.getMonthName(revDt, true),
                            start: x,
                            month: revDt.getMonth(),
                            year: revDt.getFullYear().toString()
                        };
                    }
                    else {
                        months[mIdx].end = x;
                    }
                    // Don't show numbers if we shouldn't be
                    if (noNumbers)
                        continue;
                    // Create the day headers
                    this.fillProperty.color = "#FFF";
                    this.headers.push(this.addRectangle(x, this.view.y + h, this.unitWidth, (h / 2), {}, this.headerGrp));
                    //this.fillProperty.color="#68C";
                    //this.fontProperty.size = (4 * this.unitWidth / 5);
                    //this.headers.push(this.AddText("", revDt.getDate(), x + (this.unitWidth / 4), this.viewY + h, "", {x: 0, y: 0}, this.headerGrp));
                    txt = KIP.createSimpleElement("", "dayHeader", revDt.getDate(), {}, [], this.textDiv);
                    pt = this.calculateScreenCoordinates({ x: x + (this.unitWidth / 4), y: this.view.y + h });
                    txt.style.left = "calc(" + this.headerOffset + "% + " + pt.x + "px)";
                    txt.style.top = pt.y = "px";
                    txt.style.width = w + "px";
                    txt.style.color = "#FFF";
                    txt.style.position = "absolute";
                    this.headers.push(txt);
                }
                // Create the monthly headers
                for (mIdx in months) {
                    if (months.hasOwnProperty(mIdx)) {
                        month = months[mIdx];
                        w = month.end - month.start + this.unitWidth;
                        if ((w < 0) || (isNaN(w)))
                            continue;
                        // create a rectangle
                        this.fillProperty.color = this.monthColors[month.month];
                        this.headers.push(this.addRectangle(month.start, this.view.y, w, h, null, this.headerGrp));
                        // create the text
                        txt = KIP.createSimpleElement("", "monthHeader", month.name.toUpperCase() + " " + month.year[2] + month.year[3], null, null, this.textDiv);
                        pt = this.calculateScreenCoordinates({ x: month.start, y: this.view.y });
                        txt.style.left = pt.x + "px";
                        txt.style.top = pt.y = "px";
                        txt.style.width = w + "px";
                        txt.style.color = "#FFF";
                        txt.style.position = "absolute";
                        this.headers.push(txt);
                    }
                }
            };
            ;
            /**
             * Handle updating our guidelines on zoom
             * @param {number} amt - The amount that has been zoomed
             */
            ProjectWindow.prototype.Zoom = function (amt) {
                var end_ratio;
                if (this.expanded)
                    return;
                this.RemoveText();
                if (this.lastBubble) {
                    KIP.addClass(this.lastBubble, "hidden");
                }
                if (!this.beginningRatio) {
                    this.beginningRatio = (this.view.w / this.view.h);
                }
                _super.prototype._onZoom.call(this, amt);
                end_ratio = (this.view.w / this.view.h);
                this.CreateGuidelines();
                this.RefreshUI();
            };
            ;
            ProjectWindow.prototype.RemoveText = function () {
                var idx;
            };
            ;
            // ReaddText
            //---------------------------------------------------------------
            ProjectWindow.prototype.ReaddText = function (end) {
                return;
            };
            ;
            /**
             * Handle updating our guidelines on pan
             * @param {number} amtX - The x amount to move the viewbox
             * @param {number} amtY - The y amount to move the viewbox
             */
            ProjectWindow.prototype.Pan = function (amtX, amtY) {
                if (this.expanded)
                    return;
                if (this.lastBubble) {
                    KIP.addClass(this.lastBubble, "hidden");
                }
                _super.prototype._onPan.call(this, amtX, amtY);
                this.CreateGuidelines();
                this.RefreshUI(true);
            };
            ;
            /**
             * Allows the user to sort the items in the Gantt chart according to a particular sort function
             * @param {function} sortFunc - The function to sort the list by
             */
            ProjectWindow.prototype.Sort = function (sortFunc, titleFunc) {
                var i, y, h, lastH, headCb, that = this;
                // Clear any previous headers
                this.itemHeaders.map(function (elem) {
                    if (!elem)
                        return;
                    if (!elem.div)
                        return;
                    if (elem.div.parentNode) {
                        elem.div.parentNode.removeChild(elem.div);
                    }
                });
                this.itemHeaders = [];
                // We need to rearrange the rows to the appropriate positions
                this.items.sort(sortFunc);
                // Also create headers for each of the sections
                this.items.map(function (elem, key, arr) {
                    h = titleFunc(elem);
                    if (lastH === h)
                        return;
                    that.AddItemHeader(key, h);
                    lastH = h;
                });
                // Update the UI
                this.RefreshUI();
            };
            ;
            /**
             * Clears all data about this project.
             */
            ProjectWindow.prototype.Clear = function () {
                var rIdx, idx, item;
                // Clear out the visible elements
                this.ClearUI();
                // Clear out our internal collections
                this.rows = [];
                this.items = [];
                this.eventCnt = 0;
            };
            ;
            /**
             * Clears the UI of the project, but not its internal data
             */
            ProjectWindow.prototype.ClearUI = function () {
                this.itemGrp.innerHTML = "";
                this.eventGrp.innerHTML = "";
                this.textDiv.innerHTML = "";
                this.coverGrp.innerHTML = "";
                this.CreateGuideHeaders();
            };
            ;
            // RemoveItem
            //--------------------------------------------------------------------------------------
            ProjectWindow.prototype.RemoveItem = function (item, refreshesLater) {
                var idx, tItem;
                idx = item.id;
                tItem = this.items[idx];
                // Grab the appropriate item index
                if (tItem !== item) {
                    for (idx = 0; idx < this.items.length; idx += 1) {
                        tItem = this.items[idx];
                        if (tItem === item)
                            break;
                    }
                }
                // Remove the value of the row
                this.rows.splice(item.row, 1);
                // Remove the item
                this.items.splice(idx, 1);
                // Clear the HTML
                item.grp.innerHTML = "";
                if (item.grp.parentNode) {
                    item.grp.parentNode.removeChild(item.grp);
                }
                // Clean up event HTML
                item.eventGrp.innerHTML = "";
                if (item.eventGrp.parentNode) {
                    item.eventGrp.parentNode.removeChild(item.eventGrp);
                }
                if (item.events)
                    this.eventCnt -= item.events.length;
                // Clean up cover groups
                item.coverRectGrp.innerHTML = "";
                // Allow a callback on remove
                if (item.addl.onremove) {
                    item.addl.onremove();
                }
                // Refresh so everything slides into place
                if (!refreshesLater)
                    this.RefreshUI();
            };
            ;
            /**
             * Temporarily resizes an item via a transform matrix
             *
             * @param {Object} item - The item to resize & reposition
             * @param {Object} newDim - The new dimensions to use for the item
             * @param {number} newDim.x - The new x position
             * @param {number} newDim.y - The new y position
             * @param {number} newDim.w - The new width of the item
             * @param {number} newDim.h - The new height of the item
             * @param {number} [newDim.scaleW] - The percentage to scale by. Used in place of w if provided
             * @param {number} [newDim.scaleH] - The percentage to scale by. Used in place of h if provided
             */
            ProjectWindow.prototype.ResizeAndRepositionItem = function (item, newDim) {
                "use strict";
                var box, dx, dy, dw, dh, matrix;
                // Remove any previous transforms we had applied
                item.grp.removeAttribute("transform");
                // Measure the elem as it originally existed
                box = this.measureElement(item.grp);
                // Quit if width or height are zero
                if (box.width === 0)
                    return;
                if (box.height === 0)
                    return;
                // Calculate the deltas of the width & height
                dw = newDim.scaleW || (newDim.w / box.width);
                dh = newDim.scaleH || (newDim.h / box.height);
                // Calculate the deltas of the new x & y
                dx = newDim.x - box.x;
                dy = newDim.y - box.y;
                // Calculate what offset we'll need for the scaling
                dx += (-1 * (dw - 1) * box.x);
                dy += (-1 * (dh - 1) * box.y);
                // Create the matrix element to use
                matrix = "matrix(";
                matrix += dw + ", ";
                matrix += "0, 0, ";
                matrix += dh + ", ";
                matrix += dx + ", ";
                matrix += dy;
                matrix += ")";
                item.grp.setAttribute("transform", matrix);
                item.eventGrp.setAttribute("transform", matrix);
            };
            ;
            /**
             * Disables showing the titles inline
             * @param {boolean} [undo] - If true, enables the titles
             */
            ProjectWindow.prototype.DisableTitles = function (undo) {
                "use strict";
                if (undo) {
                    this.rowSpace = 2.0;
                    this.showTitles = true;
                }
                else {
                    this.rowSpace = 1.5;
                    this.showTitles = false;
                }
                this.RefreshUI();
            };
            ;
            /**
             * Changes the y position of an item
             * @param {Object} item - The item that is being adjusted
             * @param {number} newY - The new Y value that this item should appear at
             * @param {number} row  - The new row value of the item
             */
            ProjectWindow.prototype.AdjustY = function (item, newY, row) {
                "use strict";
                var grp, c, child, origY, dy, tmp, that;
                that = this;
                this.rows[row] = [this.items[row]];
                this.items[row].row = row;
                this.items[row].y = newY;
                grp = item.grp;
                // Loop through all of the segments and adjust their position
                for (c = 0; c < grp.children.length; c += 1) {
                    child = grp.children[c];
                    tmp = child.getAttribute("y");
                    // Make sure we account for both the top & bottom row
                    if (!origY && (origY !== 0)) {
                        origY = tmp;
                    }
                    if ((tmp !== origY) && (child !== item.text)) {
                        dy = (+tmp) - (+origY);
                    }
                    else if (child === item.text) {
                        dy = -1;
                    }
                    else {
                        dy = 0;
                    }
                    child.setAttribute("y", newY + dy);
                }
                // Remove & redraws the associated events
                if (item.events) {
                    item.events.map(function (elem) {
                        var i;
                        elem.row = row;
                        elem.y = newY;
                        for (i = (that.eventRow - 1); i >= 0; i -= 1) {
                            elem.y += ((2 * that.barGap * that.rowHeight) + (that.rowHeight * that.barPercentages[i]));
                        }
                    });
                    this.RemoveEvents(item);
                    this.AddEvents(item);
                }
                if (this.useCoverRects) {
                    this.__addCoverRect(item);
                }
            };
            ;
            /**
             * Refreshes the display so that new Y values are accommodated
             */
            ProjectWindow.prototype.RefreshUI = function (fromPanZoom, unscale) {
                "use strict";
                var i, y, h_y, box, top, itemLeft, itemRight, headerX, running_y;
                // Now loop through the events and assign new rows
                this.rows = [];
                h_y = 0;
                running_y = 0;
                headerX = this.calculateSVGCoordinates({ x: 20, y: 0 }).x;
                var zeroX = this.calculateSVGCoordinates({ x: 10, y: 0 }).x;
                for (i = 0; i < this.items.length; i += 1) {
                    this.rows.push(this.items[i]);
                    // HANDLE SPACERS + HEADERS
                    if (this.items[i].type === "spacer") {
                        if (this.items[i].name) {
                            if (!this.items[i].text) {
                                var fsize = this.fontProperty.size;
                                var fColor = this.fillProperty.color;
                                var font = this.fontProperty.family;
                                this.fontProperty.size = (2 * this.rowHeight / 3);
                                this.fontProperty.family = "Segoe UI Black";
                                this.fillProperty.color = "rgba(0,0,0,.6)";
                                this.items[i].text = this.addText(this.items[i].name, { x: headerX, y: running_y }, { x: 0, y: 0 }, { unscalable: true }, this.itemGrp);
                                this.items[i].x = headerX;
                                this.fontProperty.size = fsize;
                                this.fontProperty.family = font;
                                this.fillProperty.color = fColor;
                            }
                            else {
                                this.items[i].text.setAttribute("x", headerX);
                            }
                        }
                        running_y += (this.rowHeight * this.rowSpace);
                        continue;
                    }
                    box = undefined;
                    this.items[i].row = i;
                    // Show or hide the title as appropriate
                    if (!this.showTitles) {
                        if (this.items[i].text && this.items[i].text.parentNode) {
                            this.items[i].text.parentNode.removeChild(this.items[i].text);
                        }
                    }
                    else {
                        if (this.items[i].text && !this.items[i].text.parentNode) {
                            this.items[i].grp.appendChild(this.items[i].text);
                        }
                        // Adjust the title to be on screen
                        this.__adjustTitleToBeOnScreen(zeroX, this.items[i]);
                    }
                    // HANDLE NON-SVG HEADERS
                    if (this.itemHeaders[i]) {
                        this.headerDiv.appendChild(this.itemHeaders[i].div);
                        top = this.calculateScreenCoordinates({ x: 0, y: h_y + this.rowSpace + (i * this.rowHeight * this.rowSpace) - (box ? box.height : 0) }).y;
                        top += this.base.getBoundingClientRect().top;
                        this.itemHeaders[i].div.style.top = top + "px";
                        box = this.itemHeaders[i].div.getBoundingClientRect();
                        if (box.height > 0) {
                            h_y += this.calculateSVGHeight(box.height) + (1.5 * this.rowSpace) + (this.headerGap || 0);
                        }
                    }
                    y = h_y + (i * this.rowHeight * this.rowSpace);
                    if (!fromPanZoom) {
                        this.AdjustY(this.items[i], y, i);
                    }
                    running_y += (h_y + (this.rowHeight * this.rowSpace));
                }
                // Refresh all of the appropriate elements
                this.draw();
                // If we are told to unscale our elements, do it
                if (unscale) {
                    this._unscaleAppropriateElements();
                }
                // If we have a listener, tell it that we refreshed
                if (this.refreshNotify)
                    this.refreshNotify(fromPanZoom);
            };
            ;
            // __adjustTitleToBeOnScreen
            //---------------------------------------------------------------------------------------
            /** adjust a project line title to be visible */
            ProjectWindow.prototype.__adjustTitleToBeOnScreen = function (zeroX, item) {
                "use strict";
                var itemLeft, itemRight, newX, curX;
                itemLeft = item.x;
                // LINE START IS OFF SCREEN
                if (itemLeft < zeroX) {
                    // IF WE ARE ONLY SHOWING LINES THAT ARE ON SCREEN, QUIT IF THIS ONE IS COMPLETELY OFF
                    if (this.onlyShowVisibleTitles) {
                        itemRight = this.calculateScreenWidth(this.measureElement(item.grp).w) + itemLeft;
                        if (itemRight < 0) {
                            return;
                        }
                    }
                    // UPDATE THE APPROPRIATE TRANSLATION VALUES
                    newX = zeroX;
                    // OTHERWISE, WE MAY NEED TO RESET THE TITLE POSITION TO BE THE LINE START
                }
                else {
                    curX = item.text.getAttribute("x");
                    if (curX === item.x) {
                        return;
                    }
                    newX = itemLeft;
                }
                // ACTUALLY UPDATE THE VALUES
                item.text.setAttribute("x", newX);
                this._updateTranslation(item.text);
            };
            ;
            // AddItemHeader 
            //-------------------------------------------------------------------------
            // (used for non-SVG headers)
            ProjectWindow.prototype.AddItemHeader = function (idx, label) {
                "use strict";
                var h;
                // Add our header div if appropriate
                if (!this.headerDiv.parentNode) {
                    this._parent.appendChild(this.headerDiv);
                }
                // Create a header to be added
                h = KIP.createSimpleElement("header" + idx, "header", label);
                // Save to our headers array
                this.itemHeaders[idx] = {
                    div: h,
                    lbl: label,
                    key: idx
                };
            };
            ;
            // ProjectPlan.AddImportantDate
            //----------------------------------------------------------------------------------------------------------------------
            /**
             * Adds an important date to our internal collection.
             */
            ProjectWindow.prototype.AddImportantDate = function (startDate, lbl, color, textColor, endDate, category) {
                "use strict";
                var diff, dir, dt, dIdx, tmp, cb, i, that = this;
                // Callback that sets the appropriate data on the created dates
                cb = function (date, label, col, textCol, cat) {
                    var shortDt, tmp;
                    shortDt = KIP.Dates.shortDate(date);
                    if (!that.importantDates[shortDt]) {
                        that.importantDates[shortDt] = [];
                    }
                    else {
                        // Make sure we don't have the same date already set
                        for (i = 0; i < that.importantDates[shortDt].length; i += 1) {
                            tmp = that.importantDates[shortDt][i];
                            if (tmp.lbl === label) {
                                break;
                            }
                            tmp = null;
                        }
                    }
                    // Push the date onto the array for this date
                    if (!tmp) {
                        that.importantDates[shortDt].push({
                            date: new Date(date),
                            lbl: label,
                            color: col || "#C30",
                            textColor: textCol || "#FFF",
                            category: category,
                            shortDate: shortDt
                        });
                        // Update if this column already exists
                    }
                    else {
                        tmp.date = new Date(date);
                        tmp.color = col || tmp.color;
                        tmp.textColor = textCol || tmp.textColor;
                        tmp.category = category || tmp.category;
                    }
                };
                // Convert to a date if need be
                if (!startDate.getFullYear) {
                    startDate = new Date(startDate);
                }
                if (endDate && !endDate.getFullYear) {
                    endDate = new Date(endDate);
                }
                // Get the difference between the end date & the start date
                diff = 0;
                dir = 1;
                if (endDate) {
                    diff = KIP.Dates.dateDiff(endDate, startDate);
                    dir = (diff < 0) ? -1 : 1;
                    diff = Math.abs(diff);
                }
                // Quit if the date isn't real
                if (!startDate || !startDate.getFullYear)
                    return;
                tmp = new Date(startDate);
                for (dIdx = 0; dIdx <= diff; dIdx += dir) {
                    dt = tmp;
                    // Add to our important date array
                    cb(dt, lbl, color, textColor, category);
                    // Increment the date
                    dt = KIP.Dates.addToDate(tmp, { days: 1 });
                }
                // Redraw so the date is now incorporated
                this.CreateGuidelines();
                this.draw();
            };
            ;
            // AddImportantDateCategory
            //----------------------------------------------------------------------------------
            ProjectWindow.prototype.AddImportantDateCategory = function (catName) {
                "use strict";
                var catOpt, idx;
                // Check that we din't have a category with that name
                for (idx = 0; idx < this.impDateCategories.length; idx += 1) {
                    if (this.impDateCategories[idx] === catName) {
                        return false;
                    }
                }
                // Otherwise, add it to the list
                idx = this.impDateCategories.length;
                this.impDateCategories.push(catName);
                // If we have already drawn the form, we need to add new catgories
                if (!this.dateForm) {
                    return idx;
                }
                catOpt = KIP.createElement({
                    type: "option",
                    attr: { value: idx },
                    before_content: catName
                });
                this.impDateCatSelector.appendChild(catOpt);
                // return the index this was added to
                return idx;
            };
            ;
            // Remove Important Date
            //----------------------------------------------------------------------------
            ProjectWindow.prototype.RemoveImportantDate = function (dt, idx) {
                "use strict";
                if (idx) {
                    this.importantDates[dt].splice(idx, 1);
                }
                else {
                    delete this.importantDates[dt];
                }
                this.CreateGuidelines();
                this.draw();
            };
            ;
            // Jump
            //----------------------------------------------------------
            ProjectWindow.prototype.Jump = function (x, y) {
                "use strict";
                this.view.x = x || this.view.x;
                this.view.y = y || this.view.y;
                this.view = this._calculateView();
                this.CreateGuidelines();
                this._calculateView();
                this.RefreshUI();
            };
            ;
            // AfterDrawChildren
            //-------------------------------------------------------------------
            ProjectWindow.prototype.AfterDrawChildren = function () {
                "use strict";
                if (!this.textDiv.parentNode && this._parent) {
                    this._parent.appendChild(this.textDiv);
                }
            };
            ;
            /**
             * _updateTranslation
             * @param element
             */
            ProjectWindow.prototype._updateTranslation = function (element) {
                var transformString = element.getAttribute("transform");
                if (transformString === "") {
                    return;
                }
                var pos = this._getPosition(element);
                // PULL OUT THE SCALE PART
                var scaleReg = /scale\(.*?\)/g;
                var scale = scaleReg.exec(transformString);
                if (!scale) {
                    return;
                }
                // UPDATE THE TRANSFORM
                transformString = "translate(" + pos.x + "," + pos.y + "), " + scale[0] + ", translate(" + (pos.x * -1) + ", " + (pos.y * -1) + ")";
                element.setAttribute("transform", transformString);
            };
            ;
            /**
             * _getPosition
             */
            ProjectWindow.prototype._getPosition = function (elem) {
                var pos;
                if (elem.getAttribute("x") && elem.getAttribute("y")) {
                    pos = {
                        x: +elem.getAttribute("x"),
                        y: +elem.getAttribute("y")
                    };
                }
                else {
                    var bbox = this.measureElement(elem);
                    pos = {
                        x: bbox.x,
                        y: bbox.y
                    };
                }
                return pos;
            };
            ;
            /**
             *
             */
            ProjectWindow.prototype._unscaleAppropriateElements = function () {
                var idx;
                // SAVE OFF THE ORIGINAL DIMENSIONS FOR THE UNSCALING
                if (!this.originalView) {
                    this._saveOriginalView();
                }
                // QUIT IF THERE IS NOTHING TO "UN-SCALE"
                if (this._nonScaled.length === 0) {
                    return;
                }
                // GET THE SCALE FACTORS KJPTEST
                var scale = {
                    x: (this.view.w / this.originalView.w),
                    y: (this.view.h / this.originalView.h)
                };
                // LOOP THROUGH EACH OF OUR UNSCALABLE ELEMENTS
                for (idx = 0; idx < this._nonScaled.length; idx += 1) {
                    this._unscaleElement(this._nonScaled[idx], scale);
                }
            };
            ;
            /**
             * _unscaleElement
             *
             * @param elem
             * @param scale
             */
            ProjectWindow.prototype._unscaleElement = function (elem, scale) {
                // GET THE CURRENT POSITION OF THE ELEMENT
                var pos = this._getPosition(elem);
                // BUILD & ASSIGN THE STRING
                var transformString = "translate(" + pos.x + "," + pos.y + "), scale(" + scale.x + ", " + scale.y + "), translate(" + (pos.x * -1) + ", " + (pos.y * -1) + ")";
                elem.setAttribute("transform", transformString);
            };
            ;
            return ProjectWindow;
        }(KIP.SVG.SVGDrawable));
        Old.ProjectWindow = ProjectWindow;
    })(Old = KIP.Old || (KIP.Old = {}));
})(KIP || (KIP = {}));
///<reference path="../drawable.ts" />
var KIP;
(function (KIP) {
    /**...........................................................................
     * @class Popup
     * Generic class to show data in a popup form
     * @version 1.0
     * ...........................................................................
     */
    var Popup = /** @class */ (function (_super) {
        __extends(Popup, _super);
        //#endregion
        //#region CREATE A POPUP FORM
        /**...........................................................................
         * Creates a new popup form
         * @param 	obj 	If included, contains info on how to create this popup
         * ...........................................................................
         */
        function Popup(obj) {
            var _this = this;
            if (!obj) {
                obj = { cls: "popup" };
            }
            else {
                obj.cls = (obj.cls || "") + " popup";
            }
            _this = _super.call(this, obj) || this;
            if (obj.themeColor) {
                _this.setThemeColor(0, obj.themeColor);
            }
            else {
                _this.setThemeColor(0, "#06F", true);
            }
            return _this;
        }
        //#endregion
        //#region CREATE ELEMENTS
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Creates all of the elements needed for this popup
         * ...........................................................................
         */
        Popup.prototype._createElements = function () {
            this._createOverlay(); // BG layer to shield the rest of the page from this popup
            this._createFrame(); // The frame hosting the popup content
            this._createTitle(); // create the elem that will become the title of the form
            this._createCloseButton(); // Button to close the form
            this._createContentElement(); // Element that will be added to to show data in the popup
            this._createButtonContainer(); // create the container for the buttons
        };
        /**...........................................................................
         * _createOverlay
         * ...........................................................................
         * Creates the overlay for the popup to shield the rest of the page
         * ...........................................................................
         */
        Popup.prototype._createOverlay = function () {
            var _this = this;
            this._elems.overlay = KIP.createSimpleElement("", "overlay");
            this._elems.overlay.addEventListener("click", function () {
                _this.erase();
            });
            this._elems.base.appendChild(this._elems.overlay);
        };
        /**...........................................................................
         * _createFrame
         * ...........................................................................
         * Create the frame of the popup
         * ...........................................................................
         */
        Popup.prototype._createFrame = function () {
            this._elems.frame = KIP.createSimpleElement("", "frame");
            this._elems.base.appendChild(this._elems.frame);
        };
        /**...........................................................................
         * _createTitle
         * ...........................................................................
         * Create the title of the popup
         * ...........................................................................
         */
        Popup.prototype._createTitle = function () {
            this._elems.title = KIP.createElement({ cls: "popupTitle", parent: this._elems.frame });
        };
        /**...........................................................................
         * _createCloseButton
         * ...........................................................................
         * Create the close button for the form
         * ...........................................................................
         */
        Popup.prototype._createCloseButton = function () {
            var _this = this;
            this._elems.closeBtn = KIP.createSimpleElement("", "closeBtn", "", null, [{ content: "x", cls: "x" }]);
            this._elems.closeBtn.addEventListener("click", function () {
                _this.erase();
            });
            this._elems.frame.appendChild(this._elems.closeBtn);
        };
        /**...........................................................................
         * _createContentElement
         * ...........................................................................
         * Create the element taht will hold all content for the popup
         * ...........................................................................
         */
        Popup.prototype._createContentElement = function () {
            this._elems.content = KIP.createSimpleElement("", "content");
            this._elems.frame.appendChild(this._elems.content);
        };
        /**...........................................................................
         * _createButtonContainer
         * ...........................................................................
         * Create the container that will hold buttons
         * ...........................................................................
         */
        Popup.prototype._createButtonContainer = function () {
            this._elems.buttonContainer = KIP.createElement({ cls: "buttonContainer", parent: this._elems.frame });
        };
        //#endregion
        //#region SET THE TITLE
        /**...........................................................................
         * setTitle
         * ...........................................................................
         * Sets the title for the popup
         *
         * @param 	title	What to set as the title
         * ...........................................................................
         */
        Popup.prototype.setTitle = function (title) {
            this._elems.title.innerHTML = title;
            if (title) {
                KIP.addClass(this._elems.title, "hasContent");
            }
            else {
                KIP.removeClass(this._elems.title, "hasContent");
            }
        };
        /**...........................................................................
         * addContent
         * ...........................................................................
         * Allows the user to add content to the popup
         * See individual tags for param info
         * ...........................................................................
         */
        Popup.prototype.addContent = function (param1, cls, content) {
            var elem;
            // Create an HTMLElement if one wasn't passed in
            if (KIP.isString(param1)) {
                elem = KIP.createSimpleElement(param1, cls, content);
                // If a Drawable was passed in, grab its HTML element
            }
            else if (KIP.isDrawable(param1)) {
                elem = param1.base;
                // Otherwise, just take the HTMLElement that was passed in
            }
            else if (param1 instanceof HTMLElement) {
                elem = param1;
            }
            else {
                elem = KIP.createElement(param1);
            }
            // Quit if we don't have an element at this point
            if (!elem) {
                return;
            }
            // Add the element to our content container
            this._elems.content.appendChild(elem);
        };
        /**...........................................................................
         * clearContent
         * ...........................................................................
         * Clears all content out of the form
         * ...........................................................................
         */
        Popup.prototype.clearContent = function () {
            this._elems.content.innerHTML = "";
        };
        //#endregion
        //#region ADD BUTTONS
        /**...........................................................................
         * addButton
         * ...........................................................................
         * Adds a button to the popup
         *
         * @param 	label 		The label to use for the button
         * @param 	callback 	What to do when the button is clicked
         * ...........................................................................
         */
        Popup.prototype.addButton = function (label, callback) {
            var btnElem = KIP.createElement({ cls: "popupButton", parent: this._elems.buttonContainer, content: label });
            btnElem.addEventListener("click", function () {
                callback();
            });
        };
        /** styles to render the popup with */
        Popup._uncoloredStyles = {
            ".overlay": {
                backgroundColor: "rgba(0,0,0,.6)",
                position: "absolute",
                left: "0",
                top: "0",
                width: "100%",
                height: "100%"
            },
            ".popup": {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Segoe UI, OpenSans, Helvetica",
                position: "fixed",
                width: "100%",
                height: "100%",
                left: "0",
                top: "0"
            },
            ".frame": {
                position: "absolute",
                backgroundColor: "#FFF",
                borderRadius: "3px",
                boxShadow: "1px 1px 5px 2px rgba(0,0,0,.2)",
                display: "block",
                borderTop: "10px solid <0>",
                padding: "10px",
            },
            ".popup .popupTitle": {
                fontSize: "1.3em",
                fontWeight: "bold"
            },
            ".popup .popupTitle.hasContent": {
                marginBottom: "5px"
            },
            ".popup .content": {
                fontSize: "0.9em"
            },
            ".popup .buttonContainer": {
                display: "flex",
                marginTop: "8px",
                justifyContent: "flex-end"
            },
            ".popup .buttonContainer .popupButton": {
                padding: "2px 10px",
                backgroundColor: "<0>",
                color: "#FFF",
                cursor: "pointer",
                marginLeft: "15px",
                borderRadius: "2px",
                transition: "all ease-in-out .1s"
            },
            ".popup .buttonContainer .popupButton:hover": {
                transform: "scale(1.1)"
            },
            ".popup .closeBtn": {
                width: "16px",
                height: "16px",
                borderRadius: "8px",
                cursor: "pointer",
                position: "absolute",
                left: "calc(100% - 7px)",
                top: "-15px",
                backgroundColor: "#DDD",
                boxShadow: "1px 1px 5px 2px rgba(0,0,0,.1)",
                color: "#333",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "all ease-in-out .1s"
            },
            ".popup .closeBtn .x": {
                paddingBottom: "2px"
            },
            ".popup .closeBtn:hover": {
                transform: "scale(1.1)"
            }
        };
        return Popup;
    }(KIP.Drawable));
    KIP.Popup = Popup;
})(KIP || (KIP = {}));
///<reference path="popup.ts" />
var KIP;
(function (KIP) {
    var ErrorPopup = /** @class */ (function (_super) {
        __extends(ErrorPopup, _super);
        function ErrorPopup(details, title, obj) {
            var _this = _super.call(this, obj) || this;
            _this.setTitle(title || "Uh-oh...that wasn't supposed to happen");
            _this.addContent("", "", details);
            _this.addButton("Okay", function () { _this.erase(); });
            return _this;
        }
        return ErrorPopup;
    }(KIP.Popup));
    KIP.ErrorPopup = ErrorPopup;
})(KIP || (KIP = {}));
///<reference path="popup.ts" />
var KIP;
(function (KIP) {
    /**
     * @class LoginPopup
     *
     * Creates a popup with fields for handling login
     * @version 1.0
     *
     */
    var LoginPopup = /** @class */ (function (_super) {
        __extends(LoginPopup, _super);
        /**
         * Creates a LoginPopup object
         * @param   obj     If provided, the data to create the base element of the popup
         */
        function LoginPopup(obj) {
            var _this = this;
            if (obj) {
                obj.cls += " login";
            }
            else {
                obj = { cls: "login popup" };
            }
            _this = _super.call(this, obj) || this;
            return _this;
        }
        Object.defineProperty(LoginPopup.prototype, "loginCallback", {
            set: function (func) { this._loginCallback = func; },
            enumerable: true,
            configurable: true
        });
        /** make sure we get a mix of core styles and these styles */
        LoginPopup.prototype._getUncoloredStyles = function () { return this._mergeThemes(LoginPopup._uncoloredStyles, KIP.Popup._uncoloredStyles); };
        /**
         * _createElements
         *
         * Creates the elements for this particular popup
         */
        LoginPopup.prototype._createElements = function () {
            var _this = this;
            _super.prototype._createElements.call(this);
            var usernameElems = KIP.createLabeledElement({ type: "input", attr: { type: "text" } }, { content: "Username" });
            this._elems.username = usernameElems.data;
            this._elems.content.appendChild(usernameElems.wrapper);
            var passwordElems = KIP.createLabeledElement({ type: "input", attr: { type: "password" } }, { content: "Password" });
            this._elems.password = passwordElems.data;
            this._elems.content.appendChild(passwordElems.wrapper);
            this.addButton("Login", function () {
                _this.erase();
                if (!_this._loginCallback) {
                    return;
                }
                _this._loginCallback(_this._elems.username.value, _this._elems.password.value);
            });
            this.addButton("Cancel", function () {
                _this.erase();
            });
        };
        /**
         * erase
         *
         * Handles undrawing the popup
         */
        LoginPopup.prototype.erase = function () {
            _super.prototype.erase.call(this);
            this._elems.username.value = "";
            this._elems.password.value = "";
        };
        /** draw specific styles for this particular popup */
        LoginPopup._uncoloredStyles = {
            ".popup.login .wrapper + .wrapper": {
                marginTop: "10px"
            }
        };
        return LoginPopup;
    }(KIP.Popup));
    KIP.LoginPopup = LoginPopup;
})(KIP || (KIP = {}));
///<reference path="popup.ts" />
var KIP;
(function (KIP) {
    var ToastPopup = /** @class */ (function (_super) {
        __extends(ToastPopup, _super);
        function ToastPopup(details, title, showFor, obj) {
            var _this = _super.call(this, obj) || this;
            KIP.addClass(_this._elems.base, "toast");
            _this._showFor = showFor || 2000;
            if (title) {
                _this.setTitle(title);
            }
            _this.addContent("", "", details);
            _this.addButton("Dismiss", function () { _this.erase(); });
            return _this;
        }
        ToastPopup.prototype._getUncoloredStyles = function () {
            return this._mergeThemes(KIP.Popup._uncoloredStyles, ToastPopup._uncoloredStyles);
        };
        ToastPopup.prototype.draw = function (parent, force) {
            var _this = this;
            _super.prototype.draw.call(this, parent, force);
            // make sure we show a slide animation
            KIP.transition(this._elems.frame, { top: "100%" }, { top: "calc(100% - <height>)" }, 300).then(function () {
                _this._elems.frame.style.top = _this._elems.frame.offsetTop + "px";
            });
            // Remove this popup after the specified timeout
            window.setTimeout(function () {
                _this.erase();
            }, this._showFor);
        };
        ToastPopup.prototype.erase = function () {
            var _this = this;
            delete this._elems.frame.style.top;
            KIP.transition(this._elems.frame, { top: "calc(100% - <height>)", opacity: "1" }, { top: "100%", opacity: "0" }, 300).then(function () {
                _super.prototype.erase.call(_this);
            });
        };
        ToastPopup._uncoloredStyles = {
            ".toast .overlay": {
                display: "none",
                pointerEvents: "none"
            },
            ".toast .closeBtn": {
                display: "none"
            },
            ".toast .frame": {
                width: "15%",
                height: "75px",
                boxSizing: "border-box",
                left: "85%"
            }
        };
        return ToastPopup;
    }(KIP.Popup));
    KIP.ToastPopup = ToastPopup;
})(KIP || (KIP = {}));
///<reference path="popup.ts" />
var KIP;
(function (KIP) {
    var YesNoEnum;
    (function (YesNoEnum) {
        YesNoEnum[YesNoEnum["YES"] = 1] = "YES";
        YesNoEnum[YesNoEnum["NO"] = 0] = "NO";
    })(YesNoEnum = KIP.YesNoEnum || (KIP.YesNoEnum = {}));
    ;
    var YesNoPopup = /** @class */ (function (_super) {
        __extends(YesNoPopup, _super);
        /**...........................................................................
         * Creates a YesNoPopup
         * @param   prompt  What to ask the user
         * @param   obj
         * ...........................................................................
         */
        function YesNoPopup(prompt, onSelection, obj) {
            var _this = _super.call(this, obj) || this;
            _this._onSelection = onSelection;
            _this.addContent("", "", prompt);
            _this._createButtons();
            return _this;
        }
        /**...........................................................................
         * _createButtons
         * ...........................................................................
         * Create the yes/no buttons for the popup
         * ...........................................................................
         */
        YesNoPopup.prototype._createButtons = function () {
            this._createButton("Yes", YesNoEnum.YES);
            this._createButton("No", YesNoEnum.NO);
        };
        /**...........................................................................
         * _createButton
         * ...........................................................................
         * Create a button in the yes / no form
         * ...........................................................................
         */
        YesNoPopup.prototype._createButton = function (label, value) {
            var _this = this;
            var callback = function () {
                if (!_this._onSelection) {
                    return;
                }
                _this._onSelection(value);
                _this.erase();
            };
            this.addButton(label, callback);
        };
        return YesNoPopup;
    }(KIP.Popup));
    KIP.YesNoPopup = YesNoPopup;
    /**...........................................................................
     * showYesNoForm
     * ...........................................................................
     * Show a particular yes - no prompt
     *
     * @param   prompt  The text to display for the form
     *
     * @returns The selection made by the user
     * ...........................................................................
     */
    function showYesNoForm(prompt, onSelect) {
        var form = new YesNoPopup(prompt, onSelect);
        form.draw(document.body);
    }
    KIP.showYesNoForm = showYesNoForm;
})(KIP || (KIP = {}));
///<reference path="../drawable.ts" />
var KIP;
(function (KIP) {
    /**...........................................................................
     * @class DynamicSelect
     * Create a select element
     * @version 1.0
     * ...........................................................................
     */
    var DynamicSelect = /** @class */ (function (_super) {
        __extends(DynamicSelect, _super);
        //#endregion
        /**...........................................................................
         * Create the Dynamic Select element
         * ...........................................................................
         */
        function DynamicSelect() {
            var _this = _super.call(this) || this;
            // initialize our collection
            _this._availableOptions = new KIP.Collection();
            _this._availableOptions.addType = KIP.CollectionTypeEnum.ReplaceDuplicateKeys;
            return _this;
        }
        //#region CREATE ELEMENTS
        DynamicSelect.prototype._createElements = function () {
            var _this = this;
            this._elems = {};
            this._elems.base = KIP.createElement({
                cls: "dynamicSelect"
            });
            this._elems.input = KIP.createElement({
                type: "input",
                parent: this._elems.base
            });
            this._elems.input.addEventListener("input", function (e) { _this._onQueryTextChange(e); });
            //this._elems.input.addEventListener("keyup", (e: KeyboardEvent) => { this._onKeyEvent(e); });
            this._elems.input.addEventListener("keydown", function (e) { _this._onKeyEvent(e); });
            this._elems.input.addEventListener("blur", function (e) { _this._onBlur(e); });
            this._elems.input.addEventListener("focus", function (e) { _this._onFocus(e); });
            this._elems.clearBtn = KIP.createElement({
                cls: "clearBtn",
                content: "x",
                parent: this._elems.base,
                eventListeners: {
                    click: function () { _this._elems.input.value = ""; }
                }
            });
            this._elems.drawer = KIP.createElement({
                cls: "drawer collapsed",
                parent: this._elems.base
            });
            this._elems.innerOptions = KIP.createElement({
                cls: "innerOptions",
                parent: this._elems.drawer
            });
            this._elems.loadingIcon = KIP.createElement({ cls: "hidden loading", parent: this._elems.drawer });
        };
        //#endregion
        //#region DRAWER FUNCTIONS
        /**...........................................................................
         * _expandDrawer
         * ...........................................................................
         * Expand the drawer of options
         * ...........................................................................
         */
        DynamicSelect.prototype._expandDrawer = function () {
            KIP.removeClass(this._elems.drawer, "collapsed");
            KIP.transition(this._elems.drawer, { height: "0", opacity: "0" }, { height: "<height>", opacity: "1" }, 300);
        };
        /**...........................................................................
         * _collapseDrawer
         * ...........................................................................
         * Collapse the drawer of options
         * ...........................................................................
         */
        DynamicSelect.prototype._collapseDrawer = function () {
            var _this = this;
            KIP.transition(this._elems.drawer, { height: "<height>", opacity: "1" }, { height: "0", opacity: "0" }, 300).then(function () {
                KIP.addClass(_this._elems.drawer, "collapsed");
            });
        };
        //#endregion   
        //#region AUGMENT OPTIONS
        /**...........................................................................
         * addOption
         * ...........................................................................
         * Adds an option to our select field
         *
         * @param   opt     The option to add
         * ...........................................................................
         */
        DynamicSelect.prototype.addOption = function (opt) {
            var option = new DynamicOption(opt, this);
            if (this._availableOptions.addElement(option.id, option) === -1) {
                return;
            }
            ;
            this._updateFiltering(this._elems.input.value);
            this._elems.innerOptions.appendChild(option.base);
        };
        /**...........................................................................
         * addOptions
         * ...........................................................................
         * Add a set of options to the select element
         * @param   opts    The options to add
         * ...........................................................................
         */
        DynamicSelect.prototype.addOptions = function (opts) {
            var opt;
            for (var _i = 0, opts_1 = opts; _i < opts_1.length; _i++) {
                opt = opts_1[_i];
                this.addOption(opt);
            }
        };
        //#endregion
        //#region EVENT LISTENERS
        DynamicSelect.prototype.addEventListener = function (type, func) {
            switch (type) {
                case "select":
                    if (!this._selectListeners) {
                        this._selectListeners = [];
                    }
                    this._selectListeners.push(func);
                    break;
                case "search":
                    if (!this._searchListeners) {
                        this._searchListeners = [];
                    }
                    this._searchListeners.push(func);
                    break;
                case "change":
                    if (!this._changeListeners) {
                        this._changeListeners = [];
                    }
                    this._changeListeners.push(func);
                    break;
            }
        };
        /**
         * _notifyChangeListeners
         *
         * Notify any listeners that some content changed
         */
        DynamicSelect.prototype._notifyChangeListeners = function () {
            var listener;
            if (!this._changeListeners) {
                return;
            }
            for (var _i = 0, _a = this._changeListeners; _i < _a.length; _i++) {
                listener = _a[_i];
                if (!listener) {
                    continue;
                }
                listener(this._elems.input.value);
            }
        };
        /**
         * _notifySelectListeners
         *
         * Notify any listeners that we have selected an element
         * @param   selectedOption  The option that was selected
         */
        DynamicSelect.prototype._notifySelectListeners = function (selectedOption) {
            var listener;
            if (!this._selectListeners) {
                return;
            }
            for (var _i = 0, _a = this._selectListeners; _i < _a.length; _i++) {
                listener = _a[_i];
                if (!listener) {
                    continue;
                }
                listener(selectedOption);
            }
        };
        /**................................................................
         * _notifySearchListeners
         * ................................................................
         * @param search
         * ................................................................
         */
        DynamicSelect.prototype._notifySearchListeners = function (search) {
            var listener;
            for (var _i = 0, _a = this._searchListeners; _i < _a.length; _i++) {
                listener = _a[_i];
                if (!listener) {
                    continue;
                }
                listener(search);
            }
        };
        /**...........................................................................
         * _onChange
         * ...........................................................................
         * Handle when the text field changes
         *
         * @param   e   Change event
         * ...........................................................................
         */
        DynamicSelect.prototype._onQueryTextChange = function (e) {
            var curText = this._elems.input.value;
            // update which options are filtered
            this._updateFiltering(curText);
            // let listeners know that we have updates
            this._notifyChangeListeners();
            // run a new query if we can
            this._query(curText);
        };
        /**...........................................................................
         * _onKeyUp
         * ...........................................................................
         * Check if we need to handle an enter press in the text field
         *
         * @param   e   The keyboard event fired
         * ...........................................................................
         */
        DynamicSelect.prototype._onKeyEvent = function (e) {
            var foundNext = false;
            var pair;
            switch (e.keyCode) {
                // enter
                case 13:
                    pair = this._availableOptions.getCurrent();
                    if (pair) {
                        this.select(pair.value);
                    }
                    else {
                        this.search(this._elems.input.value);
                    }
                    break;
                // up arrow
                case 38:
                    pair = this._availableOptions.getCurrent();
                    while (foundNext === false && this._availableOptions.hasNext(true)) {
                        var opt = this._availableOptions.getNext(true).value;
                        foundNext = opt.hilite();
                    }
                    if (foundNext) {
                        if (pair) {
                            pair.value.unhilite();
                        }
                    }
                    break;
                // down arrow
                case 40:
                    pair = this._availableOptions.getCurrent();
                    while (foundNext === false && this._availableOptions.hasNext()) {
                        var opt = this._availableOptions.getNext().value;
                        foundNext = opt.hilite();
                    }
                    if (foundNext) {
                        if (pair) {
                            pair.value.unhilite();
                        }
                    }
                    break;
            }
        };
        /**...........................................................................
         * _onBlur
         * ...........................................................................
         * Handle when focus is lost on the search element
         * @param   event   The focus event
         * ...........................................................................
         */
        DynamicSelect.prototype._onBlur = function (event) {
            this._collapseDrawer();
        };
        /**...........................................................................
         * _onFocus
         * ...........................................................................
         * Handle when focus is given to the search element
         * @param   event   The focus event
         * ...........................................................................
         */
        DynamicSelect.prototype._onFocus = function (event) {
            this._expandDrawer();
            this._availableOptions.resetLoop();
        };
        /**...........................................................................
         * select
         * ...........................................................................
         * Handle selecting an element in the search field
         * @param   selectedOption  The option that was selected
         * ...........................................................................
         */
        DynamicSelect.prototype.select = function (selectedOption) {
            this._collapseDrawer();
            this._elems.input.value = selectedOption.display;
            this._elems.input.blur();
            this._notifySelectListeners(selectedOption);
        };
        /**
         * search
         *
         * Handle searching for a string that wasn't an option in
         * our search results
         *
         * @param searchStr
         */
        DynamicSelect.prototype.search = function (searchStr) {
            this._collapseDrawer();
            this._elems.input.value = searchStr;
            this._elems.input.blur();
            this._notifySearchListeners(searchStr);
        };
        //#endregion
        //#region HANDLE FILTERING
        /**...........................................................................
         * _updateFiltering
         * ...........................................................................
         * make sure our filtered text reflects the most up-to-date value in the text field
         * ...........................................................................
         */
        DynamicSelect.prototype._updateFiltering = function (curText) {
            // split the text by space for smarter filtering
            var words = curText.split(" ");
            this._availableOptions.map(function (elem) {
                elem.tryFilter(words);
            });
        };
        //#endregion
        //#region QUERY HANDLING
        /**...........................................................................
         * _query
         * ...........................................................................
         * Handle querying for additional options to add
         * @param   queryText   The text to search
         * ...........................................................................
         */
        DynamicSelect.prototype._query = function (queryText) {
            var _this = this;
            // quit if we're already running this query
            if (queryText === this._currentQuery) {
                return;
            }
            // if we're in the process of querying, just queue up a new query for next time
            if (this._isQuerying) {
                this._nextQuery = queryText;
                return;
            }
            // if we have nothing to query, quit
            if (!queryText) {
                return;
            }
            this._currentQuery = queryText;
            this._isQuerying = true;
            KIP.removeClass(this._elems.loadingIcon, "hidden");
            this._onQuery(queryText).then(function () {
                _this._currentQuery = "";
                _this._isQuerying = false;
                KIP.addClass(_this._elems.loadingIcon, "hidden");
                // start the next query if appropriate
                if (_this._nextQuery) {
                    _this._query(_this._nextQuery);
                    _this._nextQuery = "";
                }
            });
        };
        //#endregion
        DynamicSelect.prototype.clear = function () {
            this._elems.input.value = "";
            this._updateFiltering("");
            this._notifyChangeListeners();
        };
        /** keep track of the styles associated with this select field */
        DynamicSelect._uncoloredStyles = {
            "@keyframes rotate": {
                "from": { transform: "rotate(0deg)" },
                "to": { transform: "rotate(360deg)" }
            },
            ".dynamicSelect": {
                position: "relative",
                fontFamily: "Segoe UI, Open Sans, Helvetica",
                nested: {
                    "input": {
                        position: "relative",
                        fontSize: "2em",
                    },
                    ".clearBtn": {
                        color: "#555",
                        transition: "all ease-in-out .1s",
                        position: "absolute",
                        left: "calc(100% - 25px)",
                        top: "0",
                        width: "20px",
                        height: "20px",
                        fontSize: "20px",
                        cursor: "pointer",
                        transformOrigin: "50% 100%",
                        nested: {
                            "&:hover": {
                                transform: "scale(1.1)"
                            }
                        }
                    },
                    ".drawer": {
                        boxShadow: "1px 1px 5px 2px rgba(0,0,0,.2)",
                        color: "<0>",
                        backgroundColor: "#FFF",
                        minWidth: "200px",
                        maxHeight: "300px",
                        overflowY: "auto",
                        position: "absolute",
                        left: "0",
                        top: "3em",
                        display: "inline-block",
                        nested: {
                            ".loading": {
                                borderRadius: "100%",
                                border: "2px transparent solid",
                                borderTop: "2px #333 solid",
                                animation: "rotate 1s linear infinite",
                                width: "20px",
                                height: "20px",
                                marginLeft: "auto",
                                marginRight: "auto",
                                transition: "height ease-in-out .1s",
                                padding: "5px",
                                nested: {
                                    "&.hidden": {
                                        display: "none"
                                    }
                                }
                            },
                            "&.collapsed": {
                                maxHeight: "0",
                                overflow: "hidden",
                                opacity: "0"
                            }
                        }
                    }
                }
            }
        };
        return DynamicSelect;
    }(KIP.Drawable));
    KIP.DynamicSelect = DynamicSelect;
    /**...........................................................................
     * @class DynamicOption
     * ...........................................................................
     * Create an option for a dynamic select field
     * @version 1.0
     * @author  Kip Price
     * ...........................................................................
     */
    var DynamicOption = /** @class */ (function (_super) {
        __extends(DynamicOption, _super);
        //#endregion
        /**...........................................................................
         * Create the dynamic option
         *
         * @param   opt     Details of the option we are creating
         * ...........................................................................
         */
        function DynamicOption(opt, parent) {
            var _this = _super.call(this) || this;
            _this._id = opt.id;
            _this._display = opt.display;
            _this._selectParent = parent;
            _this._createElements();
            return _this;
        }
        Object.defineProperty(DynamicOption.prototype, "id", {
            get: function () { return this._id; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicOption.prototype, "display", {
            get: function () { return this._display; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicOption.prototype, "isFiltered", {
            get: function () { return this._isFiltered; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicOption.prototype, "isSelected", {
            get: function () { return this._isSelected; },
            enumerable: true,
            configurable: true
        });
        //#region CREATE ELEMENTS
        /**...........................................................................
         * _shouldSkipCreateElements
         * ...........................................................................
         * Determine if we should avoid creating elements in the constructor
         * @returns True if we should skip the create elements
         * ...........................................................................
         */
        DynamicOption.prototype._shouldSkipCreateElements = function () { return true; };
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Create elements for this option
         * ...........................................................................
         */
        DynamicOption.prototype._createElements = function () {
            var _this = this;
            this._elems = {};
            this._isFiltered = true;
            // create the base element
            this._elems.base = KIP.createElement({
                id: "opt|" + this._id,
                cls: "dynamicOption filtered",
                eventListeners: {
                    click: function () {
                        console.log("click processed");
                        _this._selectParent.select(_this);
                    }
                }
            });
            // create the text element
            this._elems.text = KIP.createElement({
                content: this._display,
                cls: "optText",
                parent: this._elems.base
            });
        };
        //#endregion
        //#region INTERACTION
        /**...........................................................................
         * select
         * ...........................................................................
         * Select this particular element
         * ...........................................................................
         */
        DynamicOption.prototype.select = function () {
            if (this._isFiltered) {
                return false;
            }
        };
        /**...........................................................................
         * hilite
         * ...........................................................................
         * Hilite the current selected element
         * ...........................................................................
         */
        DynamicOption.prototype.hilite = function () {
            if (this._isFiltered) {
                return false;
            }
            KIP.addClass(this._elems.base, "hilite");
            this._elems.base.scrollIntoView();
            return true;
        };
        /**...........................................................................
         * unhilite
         * ...........................................................................
         * ...........................................................................
         */
        DynamicOption.prototype.unhilite = function () {
            KIP.removeClass(this._elems.base, "hilite");
            return true;
        };
        /**...........................................................................
         * _filter
         * ...........................................................................
         * Filter out this option if appropriate
         * ...........................................................................
         */
        DynamicOption.prototype._filter = function () {
            var _this = this;
            if (this._isFiltered) {
                return;
            }
            this._isFiltered = true;
            KIP.transition(this._elems.base, { maxHeight: "<height>", padding: "5px" }, { maxHeight: "0", padding: "0" }, 200).then(function () {
                KIP.addClass(_this._elems.base, "filtered");
            });
        };
        /**...........................................................................
         * _unfilter
         * ...........................................................................
         * Remove filtering for this option if appropriate
         * ...........................................................................
         */
        DynamicOption.prototype._unfilter = function () {
            if (!this._isFiltered) {
                return;
            }
            this._isFiltered = false;
            KIP.removeClass(this._elems.base, "filtered");
            KIP.transition(this._elems.base, { maxHeight: "0", padding: "0" }, { maxHeight: "<height>", padding: "5px" }, 200).then;
        };
        /**...........................................................................
         * tryFilter
         * ...........................................................................
         * Asynchronous call to ensure that options that don't match the current
         * select string are filtered out of the results
         *
         * @param   words   The words required in a relevant string for the option
         *                  in order to not filter
         *
         * @returns Promise that will run the
         * ...........................................................................
         */
        DynamicOption.prototype.tryFilter = function (words) {
            var _this = this;
            return new KIP.KipPromise(function (resolve) {
                window.setTimeout(function () {
                    var word;
                    var notFound = false;
                    // loop through the words that were passed in and ensure all are there
                    for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
                        word = words_1[_i];
                        if (_this._display.indexOf(word) === -1) {
                            if (_this._id.indexOf(word) === -1) {
                                notFound = true;
                                break;
                            }
                        }
                    }
                    // if a word was missing, filter this element
                    if (notFound) {
                        _this._filter();
                    }
                    else {
                        _this._unfilter();
                    }
                    // return that the promise completed
                    resolve();
                }, 0);
            });
        };
        /** track styles for the option field */
        DynamicOption._uncoloredStyles = {
            ".dynamicOption": {
                overflow: "hidden",
                cursor: "pointer",
                padding: "5px",
                nested: {
                    "&.filtered": {
                        maxHeight: "0",
                        padding: "0"
                    },
                    "&:hover, &.hilite": {
                        backgroundColor: "#eee"
                    }
                }
            }
        };
        return DynamicOption;
    }(KIP.Drawable));
    KIP.DynamicOption = DynamicOption;
})(KIP || (KIP = {}));
///<reference path="../drawable.ts" />
var KIP;
(function (KIP) {
    var Shield = /** @class */ (function (_super) {
        __extends(Shield, _super);
        function Shield() {
            return _super.call(this) || this;
        }
        Shield.prototype._createElements = function () {
            this._elems.base = KIP.createElement({
                cls: "kipShield"
            });
            this._elems.shieldContent = KIP.createElement({
                cls: "shieldContent",
                parent: this._elems.base
            });
            this._createShieldDetails();
        };
        ;
        Shield.prototype.draw = function (parent) {
            if (!parent) {
                parent = document.body;
            }
            _super.prototype.draw.call(this, parent);
        };
        Shield._uncoloredStyles = {
            ".kipShield": {
                position: "fixed",
                backgroundColor: "rgba(0,0,0,0.6)",
                width: "100%",
                height: "100%",
                left: "0",
                top: "0",
                zIndex: "100"
            },
            ".kipShield .shieldContent": {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%"
            }
        };
        return Shield;
    }(KIP.Drawable));
    KIP.Shield = Shield;
})(KIP || (KIP = {}));
///<reference path="shield.ts" />
var KIP;
(function (KIP) {
    /**...........................................................................
     * @class LoadingShield
     * ...........................................................................
     * Show a loading indication
     * @version 1.0
     * ...........................................................................
     */
    var LoadingShield = /** @class */ (function (_super) {
        __extends(LoadingShield, _super);
        /**...........................................................................
         * Create a loading shield
         * @param   loadingText   Additional etxt to display while loading
         * ...........................................................................
         */
        function LoadingShield(loadingText) {
            var _this = _super.call(this) || this;
            _this._loadingText = loadingText || "Loading...";
            _this._createElements();
            return _this;
        }
        /** make sure we return the right set of styles */
        LoadingShield.prototype._getUncoloredStyles = function () { return this._mergeThemes(LoadingShield._uncoloredStyles, KIP.Shield._uncoloredStyles); };
        /** skip creating elements before data is set */
        LoadingShield.prototype._shouldSkipCreateElements = function () { return true; };
        LoadingShield.prototype._createShieldDetails = function () {
            this._elems.wrapper = KIP.createElement({
                cls: "loadingContainer",
                parent: this._elems.shieldContent
            });
            this._elems.text = KIP.createElement({
                cls: "loadingText",
                content: this._loadingText,
                parent: this._elems.wrapper
            });
            this._elems.icon = KIP.createElement({
                cls: "loadingIcon",
                parent: this._elems.wrapper
            });
        };
        /** styles for the loading shield */
        LoadingShield._uncoloredStyles = {
            ".kipShield loadingContainer": {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            },
            ".kipShield .loadingText": {
                fontFamily: '"OpenSansLight", "Helvetica"',
                fontSize: "1.4em",
                color: "#FFF"
            },
            ".kipShield .loadingIcon": {
                border: "1px solid transparent",
                borderTop: "1px solid #FFF",
                borderRadius: "25px",
                width: "25px",
                height: "25px",
                animation: "rotate infinite linear 1s",
                margin: "auto"
            }
        };
        return LoadingShield;
    }(KIP.Shield));
    KIP.LoadingShield = LoadingShield;
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    var SVG;
    (function (SVG) {
        /**...........................................................................
         * @class   SVGElem
         * ...........................................................................
         * Creates an element on an SVG Drawable
         * @version 1.1
         * @author  Kip Price
         * ...........................................................................
         */
        var SVGElem = /** @class */ (function (_super) {
            __extends(SVGElem, _super);
            //#endregion
            /**...........................................................................
             * Creates an SVG element
             * @param   attributes  The attributes to create this element with
             * ...........................................................................
             */
            function SVGElem(attributes) {
                var addlArgs = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    addlArgs[_i - 1] = arguments[_i];
                }
                var _this = _super.call(this) || this;
                // initialize the attributes if they weren't included
                if (!attributes) {
                    attributes = {};
                }
                // send all arguments to the _setAttributes function
                addlArgs.splice(0, 0, attributes);
                _this._attributes = _this._setAttributes.apply(_this, addlArgs);
                // create the elements
                _this._createElements(_this._attributes);
                // handle updating the extreme points of this element
                _this._updateExtrema(_this._attributes);
                return _this;
            }
            Object.defineProperty(SVGElem.prototype, "id", {
                //#region PROPERTIES
                /** unique identifier for the element */
                get: function () { return this._attributes.id; },
                set: function (id) { this._attributes.id = id; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SVGElem.prototype, "style", {
                get: function () { return this._style; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SVGElem.prototype, "base", {
                get: function () { return this._elems.base; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SVGElem.prototype, "preventScaling", {
                get: function () { return this._preventScaling; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SVGElem.prototype, "extrema", {
                get: function () { return this._extrema; },
                enumerable: true,
                configurable: true
            });
            /**...........................................................................
             * _shouldSkipCreateElements
             * ...........................................................................
             * Determine whether we should allow elements to be drawn as part of the
             * constructor.
             *
             * @returns True, since we always need attributes
             * ...........................................................................
             */
            SVGElem.prototype._shouldSkipCreateElements = function () {
                return true;
            };
            /**...........................................................................
             * _createElements
             * ...........................................................................
             * Create the elements that make up this SVG Element
             *
             * @param   attributes  Attributes for this element
             * ...........................................................................
             */
            SVGElem.prototype._createElements = function (attributes) {
                if (!attributes) {
                    throw new Error("no attributes provided for SVG Element");
                }
                // determine the type of the SVG element
                var type = attributes.type;
                delete attributes.type;
                // Throw an error if no data was provided
                if (type === "") {
                    throw new Error("no SVG element type provided");
                }
                var elem = KIP.createSVGElem(type, attributes);
                this._elems = {};
                this._elems.base = elem;
                // Add to the appropriate parent
                if (attributes.parent) {
                    attributes.parent.appendChild(elem);
                    delete attributes.parent;
                }
                // track that this element should be non-scaling
                this._preventScaling = attributes.unscalable;
            };
            return SVGElem;
        }(KIP.Drawable));
        SVG.SVGElem = SVGElem;
    })(SVG = KIP.SVG || (KIP.SVG = {}));
})(KIP || (KIP = {}));
///<reference path="svgElement.ts" />
var KIP;
(function (KIP) {
    var SVG;
    (function (SVG) {
        function _isCurvePoint(pt) {
            return (!!pt.controls);
        }
        function _isArcPoint(pt) {
            return !KIP.isNullOrUndefined(pt.radius);
        }
        var SVGShapeEnum;
        (function (SVGShapeEnum) {
            SVGShapeEnum[SVGShapeEnum["CHECKMARK"] = 1] = "CHECKMARK";
            SVGShapeEnum[SVGShapeEnum["X"] = 2] = "X";
            SVGShapeEnum[SVGShapeEnum["PLUS"] = 3] = "PLUS";
        })(SVGShapeEnum = SVG.SVGShapeEnum || (SVG.SVGShapeEnum = {}));
        /**...........................................................................
         * @class   PathElement
         * ...........................................................................
         * @version 1.0
         * @author  Kip Price
         * ...........................................................................
         */
        var PathElement = /** @class */ (function (_super) {
            __extends(PathElement, _super);
            //#endregion
            function PathElement(points, attr) {
                var addlArgs = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    addlArgs[_i - 2] = arguments[_i];
                }
                var _this = this;
                addlArgs.splice(0, 0, points);
                _this = _super.call(this, attr, addlArgs) || this;
                return _this;
            }
            PathElement.prototype._setAttributes = function (attributes, points) {
                this._points = points || [];
                return attributes;
            };
            PathElement.prototype._createElements = function () {
                var path = this._startPath(this._attributes);
                var firstPt = true;
                var points = this._points;
                for (var _i = 0, points_3 = points; _i < points_3.length; _i++) {
                    var pathPt = points_3[_i];
                    if (firstPt) {
                        this.moveTo(pathPt);
                        firstPt = false;
                    }
                    else if (_isCurvePoint(pathPt)) {
                        this.curveTo(pathPt);
                    }
                    else if (_isArcPoint(pathPt)) {
                        this.arcTo(pathPt);
                    }
                    else {
                        this.lineTo(pathPt);
                    }
                }
                if (!this._attributes.noFinish) {
                    this.closePath();
                }
                else {
                    this.finishPathWithoutClosing();
                }
            };
            //#region HANDLE EXTREMA
            PathElement.prototype._updateExtrema = function () {
                this._extrema = {
                    max: null,
                    min: null
                };
                for (var _i = 0, _a = this._points; _i < _a.length; _i++) {
                    var pathPt = _a[_i];
                    this._updateExtremaFromPoint(pathPt);
                }
            };
            PathElement.prototype._updateExtremaFromPoint = function (pt) {
                // handle the base case
                if (!this._extrema.max || !this._extrema.min) {
                    this._extrema.max = pt;
                    this._extrema.min = pt;
                    return;
                }
                // if we're more extreme than the extrema, update
                if (pt.x < this._extrema.min.x) {
                    this._extrema.min.x = pt.x;
                }
                if (pt.y < this._extrema.min.y) {
                    this._extrema.min.y = pt.y;
                }
                if (pt.x > this._extrema.max.x) {
                    this._extrema.max.x = pt.x;
                }
                if (pt.y > this._extrema.max.y) {
                    this._extrema.max.y = pt.y;
                }
            };
            //#endregion
            /**...........................................................................
             * _checkForCurrentPath
             * ...........................................................................
             *
             * ...........................................................................
             */
            PathElement.prototype._checkForCurrentPath = function () {
                if (!this._elems.base) {
                    throw new Error("no path started");
                }
            };
            /**...........................................................................
             * _constructPathAttribute
             * ...........................................................................
             * @param prefix
             * @param point
             * @returns	The appropriate path string
             * ...........................................................................
             */
            PathElement.prototype._constructPathAttribute = function (prefix, point) {
                var out = "";
                out = prefix + this._pointToAttributeString(point) + "\n";
                return out;
            };
            PathElement.prototype._pointToAttributeString = function (point) {
                var out = point.x + " " + point.y;
                return out;
            };
            PathElement.prototype._addToPathAttribute = function (suffix) {
                this._checkForCurrentPath();
                var d = this._elems.base.getAttribute("d");
                d += suffix;
                this._elems.base.setAttribute("d", d);
                return true;
            };
            PathElement.prototype._startPath = function (attr) {
                _super.prototype._createElements.call(this, this._attributes);
                return this._elems.base;
            };
            PathElement.prototype.lineTo = function (point) {
                this._checkForCurrentPath();
                this._addToPathAttribute(this._constructPathAttribute("L", point));
            };
            PathElement.prototype.moveTo = function (point) {
                this._checkForCurrentPath();
                this._addToPathAttribute(this._constructPathAttribute("M", point));
            };
            PathElement.prototype.curveTo = function (point) {
                this._checkForCurrentPath();
                var d;
                d = "C" + this._pointToAttributeString(point.controls[0]) + ", ";
                d += this._pointToAttributeString(point.controls[1]) + ", ";
                d += this._pointToAttributeString(point) + "\n";
                this._addToPathAttribute(d);
            };
            PathElement.prototype.arcTo = function (point) {
                var d;
                d = "A" + this._pointToAttributeString(point.radius) + " ";
                d += point.xRotation + " " + point.largeArc + " " + point.sweepFlag + " ";
                d += this._pointToAttributeString(point) + "\n";
                this._addToPathAttribute(d);
            };
            /** closes the path so it creates an enclosed space */
            PathElement.prototype.closePath = function () {
                this._addToPathAttribute(" Z");
                this.finishPathWithoutClosing();
            };
            /** indicates the path is finished without closing the path */
            PathElement.prototype.finishPathWithoutClosing = function () {
            };
            /**...........................................................................
             * _calculatePolygonPoint
             * ...........................................................................
             * helper function to calculate a polygon's point at a certain angle
             * ...........................................................................
             */
            PathElement.prototype._calculatePolygonPoint = function (centerPt, currentAngle, radius) {
                var out = {
                    x: centerPt.x + KIP.roundToPlace(Math.sin(currentAngle) * radius, 10),
                    y: centerPt.y + KIP.roundToPlace(-1 * Math.cos(currentAngle) * radius, 10)
                };
                return out;
            };
            return PathElement;
        }(SVG.SVGElem));
        SVG.PathElement = PathElement;
    })(SVG = KIP.SVG || (KIP.SVG = {}));
})(KIP || (KIP = {}));
///<reference path="svgElement.ts" />
///<reference path="pathElement.ts" />
var KIP;
(function (KIP) {
    var SVG;
    (function (SVG) {
        /**...........................................................................
         * @class	PathExtensionElement
         * ...........................................................................
         * @version 1.0
         * @author	Kip Price
         * ...........................................................................
         */
        var PathExtensionElement = /** @class */ (function (_super) {
            __extends(PathExtensionElement, _super);
            function PathExtensionElement() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            PathExtensionElement.prototype._setAttributes = function (attr) {
                var addlArgs = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    addlArgs[_i - 1] = arguments[_i];
                }
                this._points = this._generatePoints.apply(this, addlArgs);
                return attr;
            };
            return PathExtensionElement;
        }(SVG.PathElement));
        SVG.PathExtensionElement = PathExtensionElement;
        /**...........................................................................
         * @class	ArcElement
         * ...........................................................................
         * @version	1.0
         * @author	Kip Price
         * ...........................................................................
         */
        var ArcElement = /** @class */ (function (_super) {
            __extends(ArcElement, _super);
            function ArcElement() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ArcElement.prototype._generatePoints = function (attr) {
                return [];
            };
            //#region ADD ARC
            /**...........................................................................
             * addPerfectArc
             * ...........................................................................
             * Adds a perfect arc to the SVG canvas
             * //TODO: make real
             * ...........................................................................
             */
            ArcElement.prototype.addPerfectArc = function (centerPt, radius, startDegree, endDegree, direction, noRadii, attr, group) {
                var padding = 0; //TODO
                var angleDiff = (endDegree - startDegree);
                var adjust = this._style.strokeWidth * Math.sqrt(2);
                var adjustedPoint = {
                    x: centerPt.x + adjust,
                    y: centerPt.y + adjust
                };
                var start = this._calculatePolygonPoint(adjustedPoint, KIP.Trig.degreesToRadians(startDegree), radius);
                var end = this._calculatePolygonPoint(adjustedPoint, KIP.Trig.degreesToRadians(endDegree), radius);
                if (!attr) {
                    attr = {};
                }
                var path = this._startPath(attr);
                this.moveTo(start);
                this.arcTo({
                    x: end.x,
                    y: end.y,
                    largeArc: (angleDiff > 180) ? 1 : 0,
                    radius: { x: radius, y: radius },
                    sweepFlag: direction,
                    xRotation: 0,
                });
                //TODO: doublecheck
                // // auto-resize if appropriate
                // if (this._options.auto_resize) {
                // 	let extrema: IExtrema = this._arcToExtrema(start, end, centerPt, radius, startDegree, endDegree);
                // 	this._updateExtrema(extrema);
                // }
                // If we aren't showing the radius, quit now
                if (noRadii) {
                    this.finishPathWithoutClosing();
                    return path;
                }
                // Otherwise close the segment path
                this.lineTo(centerPt);
                this.closePath();
                return path;
            };
            /**...........................................................................
             * _arcToExtrema
             * ...........................................................................
             * helper function to convert arc params to extrema
             * ...........................................................................
             */
            ArcElement.prototype._arcToExtrema = function (startPt, endPt, centerPt, radius, startDeg, endDeg) {
                var extrema = {
                    max: {
                        x: Math.max(startPt.x, endPt.x),
                        y: Math.max(startPt.y, endPt.y)
                    },
                    min: {
                        x: Math.min(startPt.x, endPt.x),
                        y: Math.min(startPt.y, endPt.y)
                    }
                };
                // O DEGREES : STRAIGHT UP
                if (startDeg < 0 && endDeg > 0) {
                    var maxY = centerPt.y - radius;
                    if (maxY > extrema.max.y) {
                        extrema.max.y = maxY;
                    }
                }
                // 90 DEGREES : TO THE RIGHT
                if (startDeg < 90 && endDeg > 90) {
                    var maxX = centerPt.x + radius;
                    if (maxX > extrema.max.x) {
                        extrema.max.x = maxX;
                    }
                }
                // 180 DEGREES : STRAIGHT DOWN
                if (startDeg < 180 && endDeg > 180) {
                    var minY = centerPt.y + radius;
                    if (minY < extrema.min.y) {
                        extrema.min.y = minY;
                    }
                }
                // 270 DEGREES : TO THE LEFT
                if (startDeg < 270 && endDeg > 270) {
                    var minX = centerPt.x - radius;
                    if (minX < extrema.min.x) {
                        extrema.min.x = minX;
                    }
                }
                return extrema;
            };
            return ArcElement;
        }(PathExtensionElement));
        SVG.ArcElement = ArcElement;
        /**...........................................................................
         * @class	PolygonElement
         * ...........................................................................
         * @version	1.0
         * @author	Kip Price
         * ...........................................................................
         */
        var PolygonElement = /** @class */ (function (_super) {
            __extends(PolygonElement, _super);
            function PolygonElement(centerPt, sides, radius, attr, innerRadius) {
                return _super.call(this, null, attr, centerPt, sides, radius) || this;
            }
            PolygonElement.prototype._generatePoints = function (centerPt, sides, radius, innerRadius) {
                // Generate the point list for the polygon
                var points = [];
                var curAngle = 0;
                var intAngle = KIP.Trig.calculatePolygonInternalAngle(sides);
                for (var i = 0; i < sides; i += 1) {
                    var pt = this._calculatePolygonPoint(centerPt, curAngle, radius);
                    curAngle += intAngle;
                    points.push(pt);
                }
                return points;
            };
            return PolygonElement;
        }(PathExtensionElement));
        SVG.PolygonElement = PolygonElement;
        /**...........................................................................
         * @class	StarElement
         * ...........................................................................
         * @version 1.0
         * @author	Kip Price
         * ...........................................................................
         */
        var StarElement = /** @class */ (function (_super) {
            __extends(StarElement, _super);
            function StarElement(centerPt, numberOfPoints, radius, innerRadius, attr) {
                return _super.call(this, centerPt, numberOfPoints, radius, attr, innerRadius) || this;
            }
            StarElement.prototype._generatePoints = function (centerPt, numberOfPoints, radius, innerRadius) {
                var curAngle = 0;
                var intAngle = (KIP.Trig.calculatePolygonInternalAngle(numberOfPoints) / 2);
                var points = [];
                for (var i = 0; i < numberOfPoints; i += 1) {
                    var pt = void 0;
                    // Outer point
                    pt = this._calculatePolygonPoint(centerPt, curAngle, radius);
                    curAngle += intAngle;
                    points.push(pt);
                    // Inner point
                    pt = this._calculatePolygonPoint(centerPt, curAngle, innerRadius);
                    curAngle += intAngle;
                    points.push(pt);
                }
                return points;
            };
            return StarElement;
        }(PolygonElement));
        SVG.StarElement = StarElement;
        /**...........................................................................
         * @class	CheckElement
         * ...........................................................................
         */
        var CheckElement = /** @class */ (function (_super) {
            __extends(CheckElement, _super);
            function CheckElement() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            CheckElement.prototype._generatePoints = function () {
                var pts = [
                    { x: -0.15, y: 2.95 },
                    { x: 1, y: 4 },
                    { x: 1.25, y: 4 },
                    { x: 3, y: 0.25 },
                    { x: 2.4, y: 0 },
                    { x: 1, y: 3 },
                    { x: 0.3, y: 2.3 }
                ];
                return pts;
            };
            return CheckElement;
        }(PathExtensionElement));
        SVG.CheckElement = CheckElement;
        /**...........................................................................
         * @class	ExElement
         * ...........................................................................
         */
        var ExElement = /** @class */ (function (_super) {
            __extends(ExElement, _super);
            function ExElement() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ExElement.prototype._generatePoints = function () {
                var pts = [
                    { x: 0.25, y: 0.6 },
                    { x: 1, y: 0 },
                    { x: 2, y: 1.1 },
                    { x: 3, y: 0 },
                    { x: 3.75, y: 0.6 },
                    { x: 2.66, y: 1.75 },
                    { x: 3.75, y: 2.9 },
                    { x: 3, y: 3.5 },
                    { x: 2, y: 2.5 },
                    { x: 1, y: 3.5 },
                    { x: 0.25, y: 2.9 },
                    { x: 1.33, y: 1.75 }
                ];
                return pts;
            };
            return ExElement;
        }(PathExtensionElement));
        SVG.ExElement = ExElement;
        /**...........................................................................
         * @class	PlusElement
         * ...........................................................................
         */
        var PlusElement = /** @class */ (function (_super) {
            __extends(PlusElement, _super);
            function PlusElement() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            PlusElement.prototype._generatePoints = function () {
                var pts = [
                    { x: 2, y: 2 },
                    { x: 2, y: 0 },
                    { x: 3, y: 0 },
                    { x: 3, y: 2 },
                    { x: 5, y: 2 },
                    { x: 5, y: 3 },
                    { x: 3, y: 3 },
                    { x: 3, y: 5 },
                    { x: 2, y: 5 },
                    { x: 2, y: 3 },
                    { x: 0, y: 3 },
                    { x: 0, y: 2 }
                ];
                return pts;
            };
            return PlusElement;
        }(PathExtensionElement));
        SVG.PlusElement = PlusElement;
    })(SVG = KIP.SVG || (KIP.SVG = {}));
})(KIP || (KIP = {}));
///<reference path="svgElement.ts" />
var KIP;
(function (KIP) {
    var SVG;
    (function (SVG) {
        /**...........................................................................
         * @class   CircleElement
         * ...........................................................................
         * @version 1.0
         * @author  Kip Price
         * ...........................................................................
         */
        var CircleElement = /** @class */ (function (_super) {
            __extends(CircleElement, _super);
            function CircleElement(center, radius, attributes) {
                return _super.call(this, attributes, center, radius) || this;
            }
            CircleElement.prototype._setAttributes = function (attributes, center, radius) {
                attributes.type = "circle";
                attributes.cx = center.x;
                attributes.cy = center.y;
                attributes.r = radius;
                return attributes;
            };
            CircleElement.prototype._updateExtrema = function (attributes) {
                this._extrema = this._extremaFromCenterPointAndRadius({ x: attributes.cx, y: attributes.cy }, attributes.r);
            };
            /**...........................................................................
             * _extremaFromCenterPointAndRadius
             * ...........................................................................
             * helper function to calculate extrema from a central point and radius
             * ...........................................................................
             */
            CircleElement.prototype._extremaFromCenterPointAndRadius = function (center, radius) {
                var extrema = {
                    max: { x: center.x + radius, y: center.y + radius },
                    min: { x: center.x - radius, y: center.y - radius }
                };
                return extrema;
            };
            return CircleElement;
        }(SVG.SVGElem));
        SVG.CircleElement = CircleElement;
    })(SVG = KIP.SVG || (KIP.SVG = {}));
})(KIP || (KIP = {}));
///<reference path="svgElement.ts" />
var KIP;
(function (KIP) {
    var SVG;
    (function (SVG) {
        /**...........................................................................
         * @class SVGGradientTypeEnum
         * ...........................................................................
         * Handle different types of gradients
         * ...........................................................................
         */
        var SVGGradientTypeEnum;
        (function (SVGGradientTypeEnum) {
            SVGGradientTypeEnum[SVGGradientTypeEnum["Linear"] = 1] = "Linear";
            SVGGradientTypeEnum[SVGGradientTypeEnum["Radial"] = 2] = "Radial";
        })(SVGGradientTypeEnum = SVG.SVGGradientTypeEnum || (SVG.SVGGradientTypeEnum = {}));
        /**...........................................................................
         * @class	GradientElement
         * ...........................................................................
         * @version 1.0
         * @author	Kip Price
         * ...........................................................................
         */
        var GradientElement = /** @class */ (function (_super) {
            __extends(GradientElement, _super);
            /**...........................................................................
             * @param type
             * @param points
             * @param transforms
             * ...........................................................................
             */
            function GradientElement(type, points, transforms) {
                return _super.call(this, {}, type, points, transforms) || this;
            }
            /**...........................................................................
             * _setAttributes
             * ...........................................................................
             * @param attr
             * @param type
             * @param points
             * @param transforms
             * ...........................................................................
             */
            GradientElement.prototype._setAttributes = function (attr, type, points, transforms) {
                var id = attr.id;
                // create the global gradient element
                var gradient;
                gradient = KIP.createSVGElem(SVGGradientTypeEnum[type] + "Gradient", attr);
                this._elems.base = gradient;
                // Apply the points
                this._createPoints(gradient, points);
                // Add to our element & our collection
                attr.parent.appendChild(gradient);
                // Add transform points (BROKEN?)
                this._createTransforms(transforms, id);
                return attr;
            };
            /**...........................................................................
             * _createPoints
             * ...........................................................................
             * @param parent
             * @param points
             * ...........................................................................
             */
            GradientElement.prototype._createPoints = function (parent, points) {
                for (var _i = 0, points_4 = points; _i < points_4.length; _i++) {
                    var point = points_4[_i];
                    var ptElem = KIP.createSVGElem("stop");
                    ptElem.style.stopColor = point.color;
                    ptElem.style.stopOpacity = point.opacity.toString();
                    ptElem.setAttribute("offset", point.offset);
                    parent.appendChild(ptElem);
                }
            };
            /**...........................................................................
             * _createTransforms
             * ...........................................................................
             * @param transforms
             * @param id
             * ...........................................................................
             */
            GradientElement.prototype._createTransforms = function (transforms, id) {
                if (!transforms) {
                    return;
                }
                //let tID: string = "gradient" + this.__gradients.length;
                var tID = ""; //TODO: create real ID
                var type = "linear"; //TODO: create real
                var tGrad = KIP.createSVGElem(type + "Gradient", { id: tID });
                tGrad.setAttribute("x1", transforms.start.x.toString());
                tGrad.setAttribute("x2", transforms.end.x.toString());
                tGrad.setAttribute("y1", transforms.start.y.toString());
                tGrad.setAttribute("y2", transforms.end.y.toString());
                tGrad.setAttribute("xlink:href", "#" + id);
                //this._definitionsElement.appendChild(tGrad);
                //this.__gradients.push(tGrad);
                id = tID;
            };
            /**...........................................................................
             * _updateExtrema
             * ...........................................................................
             */
            GradientElement.prototype._updateExtrema = function () { };
            /**...........................................................................
             * _createElements
             * ...........................................................................
             */
            GradientElement.prototype._createElements = function () { };
            return GradientElement;
        }(SVG.SVGElem));
        SVG.GradientElement = GradientElement;
        var LinearGradient = /** @class */ (function (_super) {
            __extends(LinearGradient, _super);
            function LinearGradient(points, transforms) {
                return _super.call(this, SVGGradientTypeEnum.Linear, points, transforms) || this;
            }
            return LinearGradient;
        }(GradientElement));
        SVG.LinearGradient = LinearGradient;
        var RadialGradient = /** @class */ (function (_super) {
            __extends(RadialGradient, _super);
            function RadialGradient(points, transforms) {
                return _super.call(this, SVGGradientTypeEnum.Radial, points, transforms) || this;
            }
            return RadialGradient;
        }(GradientElement));
        SVG.RadialGradient = RadialGradient;
    })(SVG = KIP.SVG || (KIP.SVG = {}));
})(KIP || (KIP = {}));
///<reference path="svgElement.ts" />
var KIP;
(function (KIP) {
    var SVG;
    (function (SVG) {
        /**...........................................................................
         * @class   GroupElement
         * ...........................................................................
         * @version 1.0
         * @author  Kip Price
         * ...........................................................................
         */
        var GroupElement = /** @class */ (function (_super) {
            __extends(GroupElement, _super);
            function GroupElement() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            GroupElement.prototype._setAttributes = function (attributes) {
                attributes.type = "g";
                return attributes;
            };
            GroupElement.prototype._updateExtrema = function (attributes) { };
            return GroupElement;
        }(SVG.SVGElem));
        SVG.GroupElement = GroupElement;
    })(SVG = KIP.SVG || (KIP.SVG = {}));
})(KIP || (KIP = {}));
///<reference path="svgElement.ts" />
var KIP;
(function (KIP) {
    var SVG;
    (function (SVG) {
        /**...........................................................................
         * @class   RectangleElement
         * ...........................................................................
         * Draw a rectangle on the SVG element
         * @version 1.0
         * @author  Kip Price
         * ...........................................................................
         */
        var RectangleElement = /** @class */ (function (_super) {
            __extends(RectangleElement, _super);
            /**...........................................................................
             * Create a rectangle element
             * @param   x           The horizontal position of the rectangle
             * @param   y           The vertical position of the rectangle
             * @param   width       The width of the rectangle
             * @param   height      The height of the rectangle
             * @param   attributes  Attributes to start with
             * ...........................................................................
             */
            function RectangleElement(x, y, width, height, attributes) {
                return _super.call(this, attributes, x, y, width, height) || this;
            }
            /**...........................................................................
             * _setAttributes
             * ...........................................................................
             * Set the appropriate attributes for this element
             *
             * @param   attributes  Initial set of attributes
             * @param   x           The horizontal coordinate
             * @param   y           The vertical coordinate
             * @param   width       The width of the rectangle
             * @param   height      The height of the rectangle
             *
             * @returns The updated attributes
             * ...........................................................................
             */
            RectangleElement.prototype._setAttributes = function (attributes, x, y, width, height) {
                attributes.type = "rect";
                attributes.x = x;
                attributes.y = y;
                attributes.width = width;
                attributes.height = height;
                return attributes;
            };
            RectangleElement.prototype._updateExtrema = function (attributes) {
                var rect = {
                    x: attributes.x,
                    y: attributes.y,
                    w: attributes.width,
                    h: attributes.height
                };
                this._extrema = this._basicRectToExtrema(rect);
            };
            /**...........................................................................
             * _basicRectToExtrema
             * ...........................................................................
             * helper function to turn a basic rect to extrema
             * @param	rect	Rect to convert
             * @returns	The extrema that correspond with the rect
             * ...........................................................................
             */
            RectangleElement.prototype._basicRectToExtrema = function (rect) {
                var extrema = {
                    min: { x: rect.x, y: rect.y },
                    max: { x: rect.x + rect.w, y: rect.y + rect.h }
                };
                return extrema;
            };
            /**...........................................................................
             * _checkBasicRectForBadData
             * ...........................................................................
             * helper function to check that a rectangle is actually renderable
             * @param	rect	Determine if a rectangle is renderable
             * ...........................................................................
             */
            RectangleElement.prototype._checkBasicRectForBadData = function (rect) {
                var err = false;
                // check for null values first
                if (rect.x !== 0 && !rect.x) {
                    err = true;
                }
                if (rect.y !== 0 && !rect.y) {
                    err = true;
                }
                if (rect.w !== 0 && !rect.w) {
                    err = true;
                }
                if (rect.h !== 0 && !rect.h) {
                    err = true;
                }
                // Then for non-sensical
                if (rect.w < 0) {
                    err = true;
                }
                if (rect.h < 0) {
                    err = true;
                }
                if (err) {
                    throw new Error("invalid basic rectangle values");
                }
            };
            return RectangleElement;
        }(SVG.SVGElem));
        SVG.RectangleElement = RectangleElement;
    })(SVG = KIP.SVG || (KIP.SVG = {}));
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    var SVG;
    (function (SVG) {
        /**...........................................................................
         * @class	SVGStyle
         * ...........................................................................
         * Keep track of style changes for SVG elements
         * @version 1.0
         * @author	Kip Price
         * ...........................................................................
         */
        var SVGStyle = /** @class */ (function () {
            /**...........................................................................
             * Create a SVGStyle object
             * ...........................................................................
             */
            function SVGStyle() {
                this.clear();
                this._needsNewString = true;
            }
            /**...........................................................................
             * _setStyle
             * ...........................................................................
             * Update a particular style
             * @param 	key 	The key
             * @param 	value 	The value
             * ...........................................................................
             */
            SVGStyle.prototype._setStyle = function (key, value) {
                this._innerStyle[key] = value;
                this._needsNewString = true;
            };
            Object.defineProperty(SVGStyle.prototype, "fill", {
                /** fill color or "None" */
                set: function (fill) { this._setStyle("fill", fill); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SVGStyle.prototype, "fillOpacity", {
                /** fill opacity */
                set: function (opacity) { this._setStyle("fillOpacity", opacity); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SVGStyle.prototype, "fontSize", {
                /** font size */
                set: function (size) { this._setStyle("fontSize", size); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SVGStyle.prototype, "fontWeight", {
                /** font weight */
                set: function (weight) { this._setStyle("fontWeight", weight); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SVGStyle.prototype, "fontFamily", {
                /** font family */
                set: function (family) { this._setStyle("fontFamily", family); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SVGStyle.prototype, "stroke", {
                /** stroke color */
                set: function (stroke) { this._setStyle("stroke", stroke); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SVGStyle.prototype, "strokeWidth", {
                /** stroke width */
                set: function (width) { this._setStyle("strokeWidth", width); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SVGStyle.prototype, "strokeOpacity", {
                /** stroke opacity */
                set: function (opacity) { this._setStyle("strokeOpacity", opacity); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SVGStyle.prototype, "strokeLinecap", {
                /** stroke linecap */
                set: function (linecap) { this._setStyle("strokeLinecap", linecap); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SVGStyle.prototype, "strokeLinejoin", {
                /** stroke linejoin */
                set: function (linejoin) { this._setStyle("strokeLinejoin", linejoin); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SVGStyle.prototype, "strokeDashArray", {
                set: function (dashArray) { this._strokeDashArray = dashArray; },
                enumerable: true,
                configurable: true
            });
            /**...........................................................................
             * clear
             * ...........................................................................
             * Clear out our inner styles to defaults
             * ...........................................................................
             */
            SVGStyle.prototype.clear = function () {
                this._innerStyle = {
                    fill: "None",
                    stroke: "None"
                };
            };
            /**...........................................................................
             * assignStyle
             * ...........................................................................
             * @param 	element 	The element to set styles on
             * ...........................................................................
             */
            SVGStyle.prototype.assignStyle = function (element) {
                if (this._needsNewString) {
                    this._generateStyleString();
                }
                element.setAttribute("style", this._generatedStyleString);
                if (this._strokeDashArray) {
                    element.setAttribute;
                }
            };
            /**...........................................................................
             * _generateStyleString
             * ...........................................................................
             * Generate the appropriate string for the current style
             * ...........................................................................
             */
            SVGStyle.prototype._generateStyleString = function () {
                var _this = this;
                this._generatedStyleString = "";
                KIP.map(this._innerStyle, function (propValue, propName) {
                    var formattedPropName = KIP.Styles.getPropertyName(propName);
                    _this._generatedStyleString += KIP.format("{0}: {1};", formattedPropName, propValue.toString());
                });
            };
            return SVGStyle;
        }());
        SVG.SVGStyle = SVGStyle;
    })(SVG = KIP.SVG || (KIP.SVG = {}));
})(KIP || (KIP = {}));
///<reference path="svgElement.ts" />
var KIP;
(function (KIP) {
    var SVG;
    (function (SVG) {
        var TextElement = /** @class */ (function (_super) {
            __extends(TextElement, _super);
            function TextElement() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            TextElement.prototype._setAttributes = function (attr) {
                return attr;
            };
            TextElement.prototype._updateExtrema = function () { };
            /**...........................................................................
             * addtext
             * ...........................................................................
             * Adds a text element to the SVG canvas
             * @param   text     The text to add
             * @param   point    The point at which to add the point
             * @param   originPt If provided, the origin point within the text element that defines where the text is drawn
             * @param   attr     Any attributes that should be applied to the element
             * @param   group    The group to add this element to
             * @returns The text element added to the SVG
             * ...........................................................................
             */
            TextElement.prototype.addText = function (text, point, originPt, attr, group) {
                //TODO: actually use
                return null;
                // if (!attr) { attr = {}; }
                // attr["x"] = point.x;
                // attr["y"] = point.y;
                // let textElem: SVGElement = this._addChild("text", attr, group);
                // textElem.innerHTML = text;
                // let box: IBasicRect;
                // if (originPt) {
                // 	box = this.measureElement(textElem);
                // 	let newPt: IPoint = {
                // 		x: box.w * originPt.x,
                // 		y: (box.h * originPt.y) - box.h
                // 	};
                // 	textElem.setAttribute("x", newPt.x.toString());
                // 	textElem.setAttribute("y", newPt.y.toString());
                // 	box.x = newPt.x;
                // 	box.y = newPt.y;
                // }
                // if (this._options.auto_resize) {
                // 	if (!box) { this.measureElement(textElem); }
                // 	this._updateExtrema({ min: {x: box.x, y: box.y}, max: {x: box.x + box.w, y: box.y + box.h} });
                // }
                // // Make sure we add the unselectable class
                // addClass(textElem as any as HTMLElement, "unselectable");
                // return textElem;
            };
            return TextElement;
        }(SVG.SVGElem));
        SVG.TextElement = TextElement;
    })(SVG = KIP.SVG || (KIP.SVG = {}));
})(KIP || (KIP = {}));
///<reference path="../canvas/canvas.ts" />
var KIP;
(function (KIP) {
    /**...........................................................................
     * ProjectDayFormatting
     * ...........................................................................
     * Keep track of how a day should be formatted
     * ...........................................................................
     */
    var ProjectDayFormatting;
    (function (ProjectDayFormatting) {
        /** regular day */
        ProjectDayFormatting[ProjectDayFormatting["NORMAL"] = 0] = "NORMAL";
        /** weekend day */
        ProjectDayFormatting[ProjectDayFormatting["WEEKEND"] = 1] = "WEEKEND";
        /** holiday */
        ProjectDayFormatting[ProjectDayFormatting["HOLIDAY"] = 2] = "HOLIDAY";
        /** current day */
        ProjectDayFormatting[ProjectDayFormatting["TODAY"] = 3] = "TODAY";
    })(ProjectDayFormatting = KIP.ProjectDayFormatting || (KIP.ProjectDayFormatting = {}));
    ;
    var Timeline = /** @class */ (function (_super) {
        __extends(Timeline, _super);
        //#endregion
        //#region CONSTRUCTOR
        /**...........................................................................
         * Create a representation of timelines
         * @param   Options to used create the timeline
         * ...........................................................................
         */
        function Timeline(options) {
            var _this = _super.call(this, "timeline", options) || this;
            _this._handleCanvasForTimeline();
            return _this;
        }
        Object.defineProperty(Timeline.prototype, "options", {
            get: function () { return this._options; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Timeline.prototype, "needsVerticalAdjustment", {
            set: function (val) { this._needsVerticalAdjustment = true; },
            enumerable: true,
            configurable: true
        });
        /**...........................................................................
         * _createDefaultOptions
         * ...........................................................................
         * create the default options for a project plan
         *
         * @returns The default options
         * ...........................................................................
         */
        Timeline.prototype._createDefaultOptions = function () {
            var _this = this;
            var options = _super.prototype._createDefaultOptions.call(this);
            options.DAY_HEIGHT = 20;
            options.DAY_WIDTH = 20;
            options.CENTRAL_DATE = KIP.Dates.getToday();
            options.SIZE = {
                width: window.innerWidth - 15,
                height: window.innerHeight - 15
            };
            options.MONTH_COLORS = [
                "#D30",
                "#D70",
                "#EA0",
                "#AD0",
                "#0C3",
                "#0D9",
                "#0DC",
                "#05D",
                "#40D",
                "#80D",
                "#A0D",
                "#C07"
            ];
            options.DAY_FORMATTING = {
                NORMAL: "#fafafa",
                WEEKEND: "#ccc",
                HOLIDAY: "#ccc",
                TODAY: "#333"
            };
            options.ZOOM_DELTA = function () {
                var out = {
                    x: 0.03 * _this.zoomFactor.x,
                    y: 0.01 * _this.zoomFactor.y
                };
                return out;
            };
            options.DATE_BG_COLOR = "#FFF";
            options.BORDER_COLOR = "#bbb";
            options.FONT_SIZE = 12;
            options.BETWEEN_GROUP_GAP = 10;
            options.MAX_ZOOM.y = Math.pow(1.01, Math.log(options.MAX_ZOOM.x / 1.03));
            options.MIN_ZOOM.y = Math.pow(1.01, Math.log(options.MIN_ZOOM.x) / Math.log(1.03));
            return options;
        };
        /**...........................................................................
         * _reconcileOptions
         * ...........................................................................
         * reconcile default options with user options
         *
         * @param   options     The options to reconcile
         * ...........................................................................
         */
        Timeline.prototype._reconcileOptions = function (options) {
            this._options = KIP.reconcileOptions(options, this._createDefaultOptions());
        };
        /**...........................................................................
         * _handleCanvasForTimeline
         * ...........................................................................
         * create the canvas upon which we will be drawing our project plan
         * ...........................................................................
         */
        Timeline.prototype._handleCanvasForTimeline = function () {
            var _this = this;
            // save off the central point and coordinate for date - point conversions
            this._centralDateLocation = (this._options.SIZE.width / 2);
            // make sure we draw the right UI as we move around
            this.onPreRender = function () {
                _this._createVisibleBackground();
            };
            // ensure that we have a layer for all of our elements
            this._layers[1] = this._getOrCreateLayer(1);
            this._elemLayer = this._layers[1];
        };
        //#endregion
        //#region HANDLE CONVERSIONS
        /**...........................................................................
         * convertDateToPoint
         * ...........................................................................
         * given a date, turn it into a point on the canvas
         * ...........................................................................
         */
        Timeline.prototype.convertDateToPoint = function (date, absolute) {
            var diff = KIP.Dates.dateDiff(date, this._options.CENTRAL_DATE, true, true);
            var scaledDayWidth = this._options.DAY_WIDTH;
            if (absolute) {
                scaledDayWidth *= this.zoomFactor.x;
            }
            var outPt = {
                x: this._centralDateLocation + (diff * scaledDayWidth),
                y: 0
            };
            return outPt;
        };
        /**...........................................................................
         * convertPointToDate
         * ...........................................................................
         * given a point, turn it into a date on the timeline
         *
         * @param   point       The point to convert
         * @param   absolute    If true, treat the point as absolute
         * ...........................................................................
         */
        Timeline.prototype.convertPointToDate = function (point, absolute) {
            // figure out how far this date is from the central location
            var diff = point.x - this._centralDateLocation;
            // figure out how wide a day is currently
            var scaledDayWidth = this._options.DAY_WIDTH;
            if (absolute) {
                scaledDayWidth *= this.zoomFactor.x;
            }
            // Create the out date and shift by the appropriate amount
            var outDate = new Date(this._options.CENTRAL_DATE);
            KIP.Dates.addToDate(outDate, { days: (diff / scaledDayWidth) });
            return outDate;
        };
        //#endregion
        //#region ADD OR REMOVE DATA
        /**...........................................................................
         * addTimelineElement
         * ...........................................................................
         * add a new project item to the canvas
         *
         * @param   item    The item to add to the canvas
         *
         * @returns True if the element can be added
         * ...........................................................................
         */
        Timeline.prototype.addTimelineElement = function (item) {
            // calculate the appropriate height for the element
            item.adjustDimensions({
                x: 0,
                y: this._elemLayer.dimensions.h + this._options.BETWEEN_GROUP_GAP
            });
            this._elemLayer.addElement(item);
            return true;
        };
        //#endregion
        //*region REARRANGE DATA
        Timeline.prototype.adjustVerticalPosition = function () {
        };
        //#endregion
        //#region HANDLE THE BACKGROUND CREATION
        /**...........................................................................
         * _createVisibleBackground
         * ...........................................................................
         * Create the background that's currently visible
         * ...........................................................................
         */
        Timeline.prototype._createVisibleBackground = function () {
            // calculate the min date visible & max date visible
            var extrema = this._getDateExtrema();
            // create the group to add to
            var bgGroup = new KIP.CanvasGroup("bg", { x: 0, y: 0 });
            bgGroup.layer = 0;
            var headerGroup = new KIP.CanvasGroup("header", { x: 0, y: 0 });
            headerGroup.layer = 99;
            // handle month tracking
            var curMonthStart = this._relativeView.x;
            var curMonthRefDate = extrema.min;
            // figure out what the non-scaled version of our day-height would be
            var unscaledDay = KIP.roundToPlace(this._options.DAY_HEIGHT / this._zoomFactor.y, 10);
            // loop through all dates in this time range
            var diff = KIP.Dates.dateDiff(extrema.max, extrema.min, false, false, false) + 1;
            for (var i = 0; i < diff; i += 1) {
                // create the date to draw currently
                var refDate = KIP.Dates.addToDate(new Date(extrema.min), { days: i });
                refDate = KIP.Dates.clearTimeInfo(refDate);
                // Create the reference point position for the day display
                var refPt = this.convertDateToPoint(refDate);
                refPt.y = this._relativeView.y + unscaledDay;
                // for the first element, the reference point is going to be a little different
                if (i === 0) {
                    refPt.x = this._relativeView.x;
                }
                var lastElem = (i === (diff - 1));
                // Create the day column
                var dayDivGrp = this._createDayDivisions(refDate, refPt);
                bgGroup.addElement(dayDivGrp);
                // create the month header
                var dateMismatch = refDate.getMonth() !== curMonthRefDate.getMonth();
                if (dateMismatch) {
                    var monthGrp = this._createMonthHeader(curMonthRefDate, {
                        x: curMonthStart,
                        y: this._relativeView.y
                    }, {
                        x: refPt.x,
                        y: this._relativeView.y + unscaledDay
                    });
                    curMonthRefDate = refDate;
                    curMonthStart = refPt.x;
                    headerGroup.addElement(monthGrp);
                }
                // if this is the last element, make sure we still finish the month header
                if (lastElem) {
                    var monthGrp = this._createMonthHeader(curMonthRefDate, {
                        x: curMonthStart,
                        y: this._relativeView.y
                    }, {
                        x: this._relativeView.x + this._relativeView.w,
                        y: this._relativeView.y + unscaledDay
                    });
                    curMonthRefDate = refDate;
                    curMonthStart = refPt.x;
                    headerGroup.addElement(monthGrp);
                }
                // create the day header
                var dayGroup = this._createDayHeader(refDate, refPt);
                if (dayGroup !== null) {
                    headerGroup.addElement(dayGroup);
                }
            }
            // remove the old
            this.removeElement("bg");
            this.removeElement("header");
            // and insert the new
            this.addElement(bgGroup);
            this.addElement(headerGroup);
        };
        /**...........................................................................
         * _getDateExtrema
         * ...........................................................................
         * calculate the max & min dates that are visible
         *
         * @returns The extremes of the dates
         * ...........................................................................
         */
        Timeline.prototype._getDateExtrema = function () {
            var viewport = this._relativeView;
            var min = {
                x: viewport.x,
                y: viewport.y
            };
            var max = {
                x: viewport.x + viewport.w,
                y: viewport.y + viewport.h
            };
            var out = {
                max: this.convertPointToDate(max),
                min: this.convertPointToDate(min)
            };
            return out;
        };
        //#region FORMAT THE MONTH HEADER
        /**...........................................................................
         * _createMonthHeader
         * ...........................................................................
         * create a particular header for a month
         *
         * @param   refDate     The reference date for the month
         * @param   start       The start position
         * @param   end         The end position
         *
         * @returns The canvas group representing the month
         * ...........................................................................
         */
        Timeline.prototype._createMonthHeader = function (refDate, start, end) {
            var monthLbl = this._createMonthLabel(refDate); // create the label for the month
            var monthColor = this._createMonthColor(refDate, start, end); // create the background color for the month
            // group around both
            var monthGrp = new KIP.CanvasGroup("month|" + KIP.Dates.shortDate(refDate), { x: start.x, y: start.y });
            monthGrp.addElement(monthColor);
            monthGrp.addElement(monthLbl);
            return monthGrp;
        };
        /**...........................................................................
         * _createMonthLabel
         * ...........................................................................
         * Create the label for the month
         *
         * @param   refDate     The reference date for the month
         *
         * @returns The created text element
         * ...........................................................................
         */
        Timeline.prototype._createMonthLabel = function (refDate) {
            // grab the text that we need for the header
            var monthName = KIP.Dates.getMonthName(refDate, true);
            var year = KIP.Dates.getShortYear(refDate);
            // create the label
            var monthLbl = new KIP.TextElement("month|lbl|" + KIP.Dates.shortDate(refDate), (monthName + " " + year), {
                x: 5,
                y: 0
            });
            // format the label
            monthLbl.style.fillColor = "#FFF";
            monthLbl.style.fontSize = 14;
            monthLbl.fixed = true;
            return monthLbl;
        };
        /**...........................................................................
         * _createMonthColor
         * ...........................................................................
         * Create the month background color
         *
         * @param   refDate     The reference date for the element
         * @param   start       The start point for the month header
         * @param   end         The end point for the month header
         *
         * @returns The created month color
         * ...........................................................................
         */
        Timeline.prototype._createMonthColor = function (refDate, start, end) {
            // create the rectangle element & format
            var monthColor = new KIP.RectangleElement("month|rect|" + KIP.Dates.shortDate(refDate), {
                x: 0,
                y: 0,
                w: (end.x - start.x),
                h: (end.y - start.y)
            });
            monthColor.style.fillColor = this._getMonthColor(refDate.getMonth());
            return monthColor;
        };
        //#endregion
        //#region FORMAT THE DAY HEADER
        /**...........................................................................
         * _createDayHeader
         * ...........................................................................
         * create a particular header for a day
         *
         * @param   refDate     The reference date for the day
         * @param   start       Where the day should start
         *
         * @returns The created group
         * ...........................................................................
         */
        Timeline.prototype._createDayHeader = function (refDate, start) {
            // determine if the day would be too small to be useful
            if ((this._options.DAY_WIDTH * this._zoomFactor.x) < 15) {
                return null;
            }
            // create the day elements
            var dayLbl = this._createDayLabel(refDate); // The label for the day
            var dayBG = this._createDayBackground(refDate); // Background behind the day
            // create the group for the day elements
            var dayGrp = new KIP.CanvasGroup("day|" + KIP.Dates.shortDate(refDate), { x: start.x, y: start.y });
            // add the elements to the group
            dayGrp.addElement(dayBG);
            dayGrp.addElement(dayLbl);
            return dayGrp;
        };
        /**...........................................................................
         * _createDayLabel
         * ...........................................................................
         * Create the text display for the day
         *
         * @param   refDate     The reference date for this date
         *
         * @returns The created text element
         * ...........................................................................
         */
        Timeline.prototype._createDayLabel = function (refDate) {
            // create the element
            var dayLbl = new KIP.TextElement("day|lbl|" + refDate.getDate(), refDate.getDate().toString(), { x: (this._options.DAY_WIDTH / 2), y: 0 });
            // format the label 
            dayLbl.style.fillColor = "#333";
            dayLbl.style.fontSize = 12;
            dayLbl.fixed = true;
            dayLbl.style.textAlign = "center";
            return dayLbl;
        };
        /**...........................................................................
         * _createDayBackground
         * ...........................................................................
         * Create the day background for the date header
         *
         * @param   refDate     The reference date
         *
         * @returns The created rectabgle element
         * ...........................................................................
         */
        Timeline.prototype._createDayBackground = function (refDate) {
            var dayBG = new KIP.RectangleElement("day|rect|" + refDate.getDate(), {
                x: 0,
                y: 0,
                w: this._options.DAY_WIDTH,
                h: (this._options.DAY_HEIGHT / this._zoomFactor.y) * 0.75
            });
            dayBG.style.fillColor = this._options.DATE_BG_COLOR;
            return dayBG;
        };
        //#endregion
        //#region CREATE DAY DIVISIONS
        /**...........................................................................
         * _createDayDivisions
         * ...........................................................................
         * create a day column
         *
         * @param   refDate     The reference date for the column
         * @param   start       The start date
         *
         * @returns The created group
         * ...........................................................................
         */
        Timeline.prototype._createDayDivisions = function (refDate, start) {
            // get the formatting for the date
            var formatting = this._getDayFormatting(refDate);
            // draw the right hand border for the day
            var onePix = 1 / this._zoomFactor.x;
            var borderRight = new KIP.RectangleElement("day|b.left|" + KIP.Dates.shortDate(refDate), {
                x: this._options.DAY_WIDTH - onePix,
                y: 0,
                w: onePix,
                h: this._relativeView.h
            });
            borderRight.style.fillColor = this._options.BORDER_COLOR;
            // draw the BG border for the day
            var bg = new KIP.RectangleElement("day|bg|" + KIP.Dates.shortDate(refDate), {
                x: 0,
                y: 0,
                w: this._options.DAY_WIDTH,
                h: this._relativeView.h
            });
            // determine what the formatting should actually do to this column
            if (formatting === ProjectDayFormatting.TODAY) {
                bg.style.fillColor = this._options.DAY_FORMATTING.TODAY;
            }
            else if (formatting === ProjectDayFormatting.HOLIDAY) {
                bg.style.fillColor = this._options.DAY_FORMATTING.HOLIDAY;
            }
            else if (formatting === ProjectDayFormatting.WEEKEND) {
                bg.style.fillColor = this._options.DAY_FORMATTING.WEEKEND;
            }
            else {
                bg.style.fillColor = this._options.DAY_FORMATTING.NORMAL;
            }
            // create the group that will allow us to show the column
            var dayDivGrp = new KIP.CanvasGroup("day|division|" + KIP.Dates.shortDate(refDate), { x: start.x, y: this._relativeView.y });
            dayDivGrp.addElement(bg);
            dayDivGrp.addElement(borderRight);
            return dayDivGrp;
        };
        /**...........................................................................
         * _getDayFormatting
         * ...........................................................................
         * Format the actual day display
         *
         * @param   date    The date to format
         *
         * @returns The formatting to use for the day
         * ...........................................................................
         */
        Timeline.prototype._getDayFormatting = function (date) {
            // create the day divisions
            var formatting;
            ProjectDayFormatting;
            // HANDLE TODAY
            if (KIP.Dates.isToday(date)) {
                formatting = ProjectDayFormatting.TODAY;
            }
            else if (KIP.Dates.isWeekend(date)) {
                formatting = ProjectDayFormatting.WEEKEND;
            }
            else {
                formatting = ProjectDayFormatting.NORMAL;
            }
            return formatting;
        };
        //#endregion
        /**...........................................................................
         * _getMonthColor
         * ...........................................................................
         * Grab the appropriate color for the month
         *
         * @param   monthID     The month to get a color for
         *
         * @returns The color string for the month
         * ...........................................................................
         */
        Timeline.prototype._getMonthColor = function (monthID) {
            return this._options.MONTH_COLORS[monthID];
        };
        return Timeline;
    }(KIP.HTML5Canvas));
    KIP.Timeline = Timeline;
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    var TimelineEvent = /** @class */ (function (_super) {
        __extends(TimelineEvent, _super);
        // Create an event
        function TimelineEvent(id, date) {
            var _this = _super.call(this, id, []) || this;
            _this._date = date;
            return _this;
        }
        Object.defineProperty(TimelineEvent.prototype, "startDate", {
            get: function () { return this._date; },
            set: function (dt) { },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimelineEvent.prototype, "endDate", {
            get: function () { return this._date; },
            set: function (dt) { },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimelineEvent.prototype, "canvas", {
            /** override the default canvas setting, since we need it to handle the point updates */
            set: function (canvas) {
                this._canvas = canvas;
                var startPt = this._canvas.convertDateToPoint(this._date);
                this._dimensions.x = startPt.x;
                this._setPoints();
            },
            enumerable: true,
            configurable: true
        });
        /** update the points for this path, based on new dimensions */
        TimelineEvent.prototype._setPoints = function () {
            var xOffset = this._dimensions.x;
            var yOffset = this._dimensions.y;
            this._points = [
                { x: -2, y: -14 },
                { x: -2, y: 0 },
                { x: 0, y: 2 },
                { x: 2, y: 2 },
                { x: 2, y: -14 }
            ];
            this._points = [
                { x: 0, y: -2 },
                { x: 1, y: -2 },
                { x: 1, y: 8 },
                { x: 0, y: 8 }
            ];
            var pt;
            for (var _i = 0, _a = this._points; _i < _a.length; _i++) {
                pt = _a[_i];
                pt.x += xOffset;
                pt.y += yOffset;
            }
        };
        return TimelineEvent;
    }(KIP.PathElement));
    KIP.TimelineEvent = TimelineEvent;
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    /** create an item on the project plan */
    var TimelineGroup = /** @class */ (function (_super) {
        __extends(TimelineGroup, _super);
        //#endregion
        /**...........................................................................
         * Creates a timeline group
         *
         * @param   id          The unique ID for the group
         * @param   options     The options to use for the group
         * ...........................................................................
         */
        function TimelineGroup(id, options) {
            var _this = _super.call(this, id) || this;
            /** keep track of whether this group is collapsed */
            _this._isCollapsed = false;
            _this._reconcileOptions(options);
            return _this;
        }
        Object.defineProperty(TimelineGroup.prototype, "startDate", {
            get: function () { return this._startDate; },
            set: function (start) { this._startDate = start; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimelineGroup.prototype, "endDate", {
            get: function () { return this._endDate; },
            set: function (end) { this._endDate = end; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimelineGroup.prototype, "isCollapsed", {
            get: function () { return this._isCollapsed; },
            enumerable: true,
            configurable: true
        });
        /**...........................................................................
         * _createDefaultOptions
         * ...........................................................................
         * Create the default options for the group
         * ...........................................................................
         */
        TimelineGroup.prototype._createDefaultOptions = function () {
            return {
                HORIZONTAL: false,
                ELEMENT_GAP: 2,
                ELEM_HEIGHT: 20
            };
        };
        /**...........................................................................
         * _reconcileOptions
         * ...........................................................................
         * reconcile the options for the group
         *
         * @param   options     The options to use for this group
         * ...........................................................................
         */
        TimelineGroup.prototype._reconcileOptions = function (options) {
            var defaults = this._createDefaultOptions();
            this._options = KIP.reconcileOptions(options, defaults);
        };
        /**...........................................................................
         * addElement
         * ...........................................................................
         * add a new project line
         *
         * @param   elem    The element to add
         * ...........................................................................
         */
        TimelineGroup.prototype.addElement = function (elem) {
            // handle extreme dates
            this._reconcileDates(elem);
            // Set the height if it hasn't been set yet & its not a group
            if ((elem.dimensions.h === 0) && (elem.type !== KIP.ElementType.Group)) {
                elem.dimensions.h = this._options.ELEM_HEIGHT;
            }
            // Horizontal groups don't get their y-position adjusted
            if (!this._options.HORIZONTAL) {
                elem.adjustDimensions({
                    x: 0,
                    y: this._dimensions.h + this._options.ELEMENT_GAP
                });
            }
            _super.prototype.addElement.call(this, elem);
        };
        /**...........................................................................
         * _reconcileDates
         * ...........................................................................
         * Assign dates and update for extrema if needed
         *
         * @param   elem    The element we are reconciling dates for
         * ...........................................................................
         */
        TimelineGroup.prototype._reconcileDates = function (elem) {
            // If the element is missing dates, assign them
            if (!elem.startDate) {
                elem.startDate = this._startDate;
                return;
            }
            var needsUpdate;
            // Otherwise check if our extrema need updating
            if (!this._startDate || (elem.startDate < this._startDate)) {
                this._startDate = elem.startDate;
                needsUpdate = true;
            }
            if (!this._endDate || (elem.endDate > this._endDate)) {
                this._endDate = elem.endDate;
            }
            if (needsUpdate) {
                this._updateLabels();
            }
        };
        /**...........................................................................
         * _setCanvas
         * ...........................................................................
         * @param   canvas  The canvas to set
         * ...........................................................................
         */
        TimelineGroup.prototype._setCanvas = function (canvas) {
            _super.prototype._setCanvas.call(this, canvas);
        };
        // TODO: create sort function
        TimelineGroup.prototype.sort = function (sortFunc) {
        };
        /**...........................................................................
         * _updateLabels
         * ...........................................................................
         * update labels to my start position
         * ...........................................................................
         */
        TimelineGroup.prototype._updateLabels = function () {
            var _this = this;
            this._elements.map(function (elem) {
                if (elem.type === KIP.ElementType.Text) {
                    elem.startDate = _this._startDate;
                }
            });
        };
        return TimelineGroup;
    }(KIP.CanvasGroup));
    KIP.TimelineGroup = TimelineGroup;
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    /**...........................................................................
     * createEmptyPoint
     * ...........................................................................
     * Helper function to create an empty point object
     *
     * @returns The created empty point
     * ...........................................................................
     */
    function createEmptyPoint() {
        return { x: 0, y: 0 };
    }
    /**...........................................................................
     * @class TimelineLabel
     * Creates a label for a timeline element
     * @version 1.0
     * ...........................................................................
     */
    var TimelineLabel = /** @class */ (function (_super) {
        __extends(TimelineLabel, _super);
        /**...........................................................................
         * Create a TimelineLabel
         * @param   id      Unique identifier for the label
         * @param   lbl     What text should be displayed
         * ...........................................................................
         */
        function TimelineLabel(id, lbl) {
            return _super.call(this, id, lbl, createEmptyPoint()) || this;
        }
        Object.defineProperty(TimelineLabel.prototype, "startDate", {
            get: function () { return this._startDate; },
            set: function (start) {
                this._startDate = start;
                this._updatePoint();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimelineLabel.prototype, "endDate", {
            /** we don't have an end date, so just return the start date */
            get: function () { return this._startDate; },
            set: function (dt) { },
            enumerable: true,
            configurable: true
        });
        /**...........................................................................
         * _setCanvas
         * ...........................................................................
         * Override how we set the canvas for this element
         * @param canvas
         * ...........................................................................
         */
        TimelineLabel.prototype._setCanvas = function (canvas) {
            _super.prototype._setCanvas.call(this, canvas);
            this._updatePoint();
        };
        /**...........................................................................
         * _updatePoint
         * ...........................................................................
         * Handle the point being updated for this element
         * ...........................................................................
         */
        TimelineLabel.prototype._updatePoint = function () {
            if (!this._canvas) {
                return;
            }
            if (!this._startDate) {
                return;
            }
            var startPt = this._canvas.convertDateToPoint(this._startDate);
            this._dimensions.x = startPt.x;
        };
        /**...........................................................................
         * updateDimensions
         * ...........................................................................
         * Allow a caller to update the dimensions of display for this element
         *
         * @param   visibleWindow   The new window that's visible
         * ...........................................................................
         */
        TimelineLabel.prototype.updateDimensions = function (visibleWindow) {
            _super.prototype.updateDimensions.call(this, visibleWindow);
            // Quit if we're offscreen because of the y direction
            if (this.isOffScreen) {
                if (this._dimensions.y < visibleWindow.y) {
                    return;
                }
                if ((this._dimensions.y + this._dimensions.h) > (visibleWindow.y + visibleWindow.h)) {
                    return;
                }
            }
            if (this._dimensions.x < visibleWindow.x) {
                this._displayDimensions.x = 0;
                this._isOffScreen = false;
            }
        };
        return TimelineLabel;
    }(KIP.TextElement));
    KIP.TimelineLabel = TimelineLabel;
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    /** helper function to create an empty rect */
    function _createEmptyDimensions() {
        return {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        };
    }
    var Timespan = /** @class */ (function (_super) {
        __extends(Timespan, _super);
        //#endregion
        function Timespan(id, start, end) {
            var _this = _super.call(this, id, _createEmptyDimensions()) || this;
            _this._startDate = start;
            _this._endDate = end;
            return _this;
        }
        Object.defineProperty(Timespan.prototype, "startDate", {
            get: function () { return this._startDate; },
            set: function (dt) { },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Timespan.prototype, "endDate", {
            get: function () { return this._endDate; },
            set: function (dt) { },
            enumerable: true,
            configurable: true
        });
        /** create the default set of options */
        Timespan.prototype._constructDefaultOptions = function () {
            return {
                COLOR: "#333",
                FONT_SIZE: 10
            };
        };
        Object.defineProperty(Timespan.prototype, "canvas", {
            /** override the canvas being set to find the appropriate position */
            set: function (canvas) {
                this._canvas = canvas;
                this._calculatePosition();
            },
            enumerable: true,
            configurable: true
        });
        /** sets the appropriate position for the element */
        Timespan.prototype._calculatePosition = function () {
            // Quit if we don't have a parent or a canvas element
            if (!this._parent) {
                return;
            }
            if (!this._canvas) {
                return;
            }
            // Calculate the date positions
            var startPt = this._canvas.convertDateToPoint(this._startDate);
            var endPt = this._canvas.convertDateToPoint(this._endDate);
            // Create the appropriately sized rect
            var dim = {
                x: startPt.x,
                y: this._dimensions.y,
                w: (endPt.x - startPt.x),
                h: this._dimensions.h
            };
            // Set the dimensions on our rectangle
            this._dimensions = dim;
        };
        return Timespan;
    }(KIP.RectangleElement));
    KIP.Timespan = Timespan;
})(KIP || (KIP = {}));
///<reference path="../drawable.ts" />
///<reference path="interfaces.ts" />
var KIP;
(function (KIP) {
    /** generic class to show a tutorial step */
    var TutorialStep = /** @class */ (function (_super) {
        __extends(TutorialStep, _super);
        /** create this particular step */
        function TutorialStep(parent, title) {
            var _this = _super.call(this, { cls: "tutorialStep" }) || this;
            _this._defaultDetailsClass = "details";
            _this._title = title;
            _this._parentTutorial = parent;
            _this._details = [];
            _this._createElements();
            return _this;
        }
        //==================
        // CREATE ELEMENTS
        //==================
        /** create generic version of the createElements set */
        TutorialStep.prototype._createElements = function () {
            // Implemented by sub classes
        };
        ;
        /** create the title for the step */
        TutorialStep.prototype._createTitle = function () {
            var title = KIP.createSimpleElement("", "title", this._title);
            this.base.appendChild(title);
        };
        /** create the details container of the tutorial details */
        TutorialStep.prototype._createDetailContainer = function () {
            this._detailContainer = KIP.createSimpleElement("", "details");
            this.base.appendChild(this._detailContainer);
        };
        /** create details of the step */
        TutorialStep.prototype._createDetailElement = function (pair) {
            if (!pair) {
                return;
            }
            // Default the class
            pair.cls = pair.cls || this._defaultDetailsClass;
            // Create the detail element & add it to our container
            var detailElem = KIP.createSimpleElement("", pair.cls, pair.details);
            this._detailContainer.appendChild(detailElem);
        };
        ;
        //==================
        // ADD TO THE STEP
        //==================
        /** set the hilited element for the tutorial */
        TutorialStep.prototype.addHilitedElement = function (elem) {
            // Implemented by sub-classes
        };
        /** add details to the step */
        TutorialStep.prototype.addDetails = function (content, cssClass) {
            var pair = {
                details: content,
                cls: cssClass
            };
            // Add to our array
            this._details.push(pair);
            // Add the UI for the details
            this._createDetailElement(pair);
        };
        return TutorialStep;
    }(KIP.Drawable));
    KIP.TutorialStep = TutorialStep;
})(KIP || (KIP = {}));
///<reference path="tutorialStep.ts" />
var KIP;
(function (KIP) {
    //============================
    // FULL SCREEN TUTORIAL PAGE
    //============================
    /** display a particular screen of a tutorial */
    var TutorialScreen = /** @class */ (function (_super) {
        __extends(TutorialScreen, _super);
        function TutorialScreen() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._defaultDetailsClass = "fullscreenDetails";
            return _this;
        }
        //=================================
        // CREATE ELEMENTS FOR FULLSCREEN
        //=================================
        /** create the elements for this particular step */
        TutorialScreen.prototype._createElements = function () {
            this._createTitle();
            this._createDetailContainer();
        };
        //======================
        // ADD TO THE TUTORIAL
        //======================
        /** add a particular element to hilite */
        TutorialScreen.prototype.addHilitedElement = function (elem, text) {
        };
        return TutorialScreen;
    }(KIP.TutorialStep));
    KIP.TutorialScreen = TutorialScreen;
})(KIP || (KIP = {}));
///<reference path="../drawable.ts" />
///<reference path="interfaces.ts" />
var KIP;
(function (KIP) {
    /** create the class for the actual tutorial */
    var Tutorial = /** @class */ (function (_super) {
        __extends(Tutorial, _super);
        //========================
        // INITIALIZE THE CLASS
        //========================
        /** create the actual tutorial class */
        function Tutorial(options) {
            var _this = _super.call(this, { cls: "tutorial" }) || this;
            _this._initializeVariables();
            _this._reconcileOptions(options);
            _this._createElements();
            return _this;
        }
        /** initiailize our properties */
        Tutorial.prototype._initializeVariables = function () {
            this._steps = [];
            this._currentStep = -1;
        };
        /** take options passed to the tutorial & reconcile with our defaults */
        Tutorial.prototype._reconcileOptions = function (options) {
            var defaults = {
                loopAround: true,
                useStandardStyles: true,
                inlineMargin: 5
            };
            KIP.reconcileOptions(options, defaults);
        };
        //===========================
        // CREATE STANDARD STYLES
        //===========================
        /** create the HTML pieces of the tutorial */
        Tutorial.prototype._createElements = function () {
            // Each individual implementation should implement this
        };
        ;
        /** create the container for the individual steps */
        Tutorial.prototype._createStepContainer = function () {
            this._stepContainer = KIP.createSimpleElement("", "tutorialSteps");
            this.base.appendChild(this._stepContainer);
        };
        //=============================
        // ADD A STEP TO THE TUTORIAL
        //=============================
        /** adds a step to the tutorial */
        Tutorial.prototype.addStep = function (title, details) {
            // This should be overridden by a child class
            return null;
        };
        /** add the step we created to our internal collection */
        Tutorial.prototype._addStepToCollection = function (step) {
            // Add to our collection
            var idx = this._steps.length;
            this._steps[idx] = step;
            return idx;
        };
        //==========================
        // SHOW A PARTICULAR STEP
        //==========================
        /** show a particular step in this tutorial */
        Tutorial.prototype.showStep = function (idx) {
            var curStep;
            // Check if we're already showing a tutorial step
            if (this._currentStep !== -1) {
                curStep = this._steps[this._currentStep];
            }
            // Stop showing the current step
            if (curStep) {
                curStep.erase();
                this._currentStep = -1;
            }
            // Get the next step that we want to show
            var step = this._steps[idx];
            // Quit if there is no step to show
            if (!step) {
                return;
            }
            // Show the next step
            step.draw(this.base);
            // Track the currently shown step
            this._currentStep = idx;
        };
        /** show the next step in the tutorial */
        Tutorial.prototype.nextStep = function () {
            var idx = this._currentStep;
            idx += 1;
            if (this._options.loopAround) {
                idx %= this._steps.length;
            }
            this.showStep(idx);
        };
        /** show the previous step in the tutorial */
        Tutorial.prototype.previousStep = function () {
            var idx = this._currentStep;
            idx -= 1;
            if (idx < 0 && this._options.loopAround) {
                idx = (this._steps.length - 1);
            }
            this.showStep(idx);
        };
        //===========================
        // SHOW / HIDE THE TUTORIAL
        //===========================
        /** show the tutorial */
        Tutorial.prototype.show = function () {
            // Make sure we show at least one step
            if (this._currentStep === -1) {
                this.showStep(0);
            }
            // Draw the tutorial if needed
            this.draw(document.body);
            // Add the appropriate class
            KIP.addClass(this._elems.base, "visible");
        };
        /** remove the tutorial from view */
        Tutorial.prototype.hide = function () {
            if (!this.base.parentNode) {
                return;
            }
            KIP.removeClass(this._elems.base, "visible");
            // Call the callback if anyone is listening
            if (this.onTutorialHidden) {
                this.onTutorialHidden();
            }
        };
        return Tutorial;
    }(KIP.Drawable));
    KIP.Tutorial = Tutorial;
})(KIP || (KIP = {}));
///<reference path="tutorial.ts" />
var KIP;
(function (KIP) {
    //=======================
    // FULL-SCREEN TUTORIAL
    //=======================
    var FullScreenTutorial = /** @class */ (function (_super) {
        __extends(FullScreenTutorial, _super);
        function FullScreenTutorial() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //#endregion
        //#region CREATE ALL ELEMENTS
        /** create the elements to actually show the tutorial */
        FullScreenTutorial.prototype._createElements = function () {
            this._createOverlay();
            this._createStepContainer();
            this._createCloseButton();
            this._createNavigationalElements();
        };
        ;
        /** creates the background element */
        FullScreenTutorial.prototype._createOverlay = function () {
            var overlay = KIP.createSimpleElement("", "overlay");
            this.base.appendChild(overlay);
        };
        /** create the close button for the tutorial */
        FullScreenTutorial.prototype._createCloseButton = function () {
            var _this = this;
            var closeBtn = KIP.createSimpleElement("", "close btn", "CLOSE");
            this.base.appendChild(closeBtn);
            closeBtn.addEventListener("click", function () {
                _this.hide();
            });
        };
        /** create buttons to navigate the tutorial */
        FullScreenTutorial.prototype._createNavigationalElements = function () {
            var navContainer = KIP.createSimpleElement("", "tutorialNavButtons");
            // Previous button
            this.__createPreviousBtn(navContainer);
            // Holds the dots for each step
            this.__navStepContainer = KIP.createSimpleElement("", "tutorialStepsNav");
            // Next button
            this.__createNextBtn(navContainer);
        };
        /** create the previous button */
        FullScreenTutorial.prototype.__createPreviousBtn = function (parent) {
            var _this = this;
            var prevBtn = KIP.createSimpleElement("", "prev btn", "PREV");
            parent.appendChild(prevBtn);
            prevBtn.addEventListener("click", function () {
                _this.previousStep();
            });
        };
        /** create the next button */
        FullScreenTutorial.prototype.__createNextBtn = function (parent) {
            var _this = this;
            var nextBtn = KIP.createSimpleElement("", "next btn", "NEXT");
            parent.appendChild(nextBtn);
            nextBtn.addEventListener("click", function () {
                _this.nextStep();
            });
        };
        //#endregion
        //#region ADD A PARTICULAR STEP
        /** add a particular step to the tutorial */
        FullScreenTutorial.prototype.addStep = function (title, details) {
            var screen = new KIP.TutorialScreen(this, title);
            screen.addDetails(details);
            // Add to our collection of steps
            var idx = this._addStepToCollection(screen);
            // Add a step in our navigator
            this.__addStepNavigator(idx);
            // Return the screen we created
            return screen;
        };
        /** show a particular step in the tutorial */
        FullScreenTutorial.prototype.__addStepNavigator = function (idx) {
            var _this = this;
            var stepNav = KIP.createSimpleElement("", "navStep");
            this.__navStepContainer.appendChild(stepNav);
            stepNav.addEventListener("click", function () {
                _this.showStep(idx);
            });
        };
        FullScreenTutorial._uncoloredStyles = {
            ".tutorial": {
                top: "0",
                left: "0",
                position: "fixed",
                width: "100%",
                height: "100%",
                opacity: "0",
                transition: "opacity 0.2s ease-in-out",
                fontFamily: "Segoe UI, Calibri, Helvetica",
                userSelect: "none",
                pointerEvents: "none"
            },
            ".tutorial.visible": {
                opacity: "1",
                pointerEvents: "auto"
            },
            ".tutorial .overlay": {
                backgroundColor: "rgba(0,0,0,0.8)",
                position: "absolute",
                left: "0",
                top: "0"
            },
            ".tutorial .content .title": {
                color: "#FFF",
                fontSize: "2em"
            }
        };
        return FullScreenTutorial;
    }(KIP.Tutorial));
    KIP.FullScreenTutorial = FullScreenTutorial;
})(KIP || (KIP = {}));
///<reference path="tutorialStep.ts" />
var KIP;
(function (KIP) {
    /**...........................................................................
     * @class	TutorialTip
     * ...........................................................................
     * display a particular help tip for the tutorial
     * @version	1.0
     * @author	Kip Price
     * ...........................................................................
     */
    var TutorialTip = /** @class */ (function (_super) {
        __extends(TutorialTip, _super);
        function TutorialTip() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._defaultDetailsClass = "inlineDetails";
            return _this;
            //#endregion
        }
        //==================================
        // CREATE ELEMENTS FOR INLINE HELP
        //==================================
        /** create the elements for this particular step */
        TutorialTip.prototype._createElements = function () {
            this._createTitle();
            this._createDetailContainer();
            this._createButtonContainer();
            this._createCloseButton();
        };
        /** create the close button for inline help */
        TutorialTip.prototype._createCloseButton = function () {
            var closeBtn = KIP.createSimpleElement("", "close btn", "X");
            this.base.appendChild(closeBtn);
        };
        /** create the container for the buttons */
        TutorialTip.prototype._createButtonContainer = function () {
            var btns = KIP.createSimpleElement("", "buttonContainer");
            this.base.appendChild(btns);
            this.__createPreviousButton(btns);
            this.__createNextButton(btns);
        };
        /** create the next button for the inline help step */
        TutorialTip.prototype.__createNextButton = function (parent) {
            var _this = this;
            var nextBtn = KIP.createSimpleElement("", "next btn", "NEXT");
            parent.appendChild(nextBtn);
            nextBtn.addEventListener("click", function () {
                _this._parentTutorial.nextStep();
            });
        };
        /** create the previous button for the inline help step */
        TutorialTip.prototype.__createPreviousButton = function (parent) {
            var _this = this;
            var prevBtn = KIP.createSimpleElement("", "prev btn", "PREVIOUS");
            parent.appendChild(prevBtn);
            prevBtn.addEventListener("click", function () {
                _this._parentTutorial.previousStep();
            });
        };
        //=======================
        //#region ADD DETAILS
        //=======================
        /** add a particular element to hilite */
        TutorialTip.prototype.addHilitedElement = function (elem) {
            this._hilitedElement = elem;
            // Resize the 
        };
        TutorialTip.prototype.__findAppropriatePoint = function () {
            var srcBox, pt, needsSourceMeasure, max, bblPt;
            //TODO: fix
            // Measure the hilited element
            var tmpBox = this._hilitedElement.getBoundingClientRect();
            var elemBox = {
                x: tmpBox.left - this._options.inlineMargin,
                y: tmpBox.top,
                w: tmpBox.width + (2 * this._options.inlineMargin),
                h: tmpBox.height
            };
            max = {
                x: (window.innerWidth - elemBox.w),
                y: (window.innerHeight - elemBox.h)
            };
            pt = { x: null, y: null };
            var obj;
            // FIRST LOOK TO THE ACTUAL POINTS SET BY THE USER (AS LONG AS THEY ARE WITHIN BOUNDS)
            if (obj.x !== undefined) {
                pt.x = Math.min(obj.x, max.x);
            }
            if (obj.y !== undefined) {
                pt.y = Math.min(obj.y, max.y);
            }
            // IF THERE IS NO SOURCE ELEMENT, THIS IS THE BEST WE CAN DO
            if (!obj.srcElem) {
                return pt;
            }
            // CALCULATE THE SIZE OF THE SOURCE ELEMENT
            srcBox = obj.srcElem.getBoundingClientRect();
            // USE THE SOURCE ELEMENT TO DETERMINE THE BEST POINTS
            //bblPt = KIP.Functions.FindBestPositionForBubbleAroundElement(srcBox, elemBox);
            if (pt.x === null) {
                pt.x = bblPt.x;
            }
            if (pt.y === null) {
                pt.y = bblPt.y;
            }
            return pt;
        };
        return TutorialTip;
    }(KIP.TutorialStep));
    KIP.TutorialTip = TutorialTip;
})(KIP || (KIP = {}));
///<reference path="tutorial.ts" />
var KIP;
(function (KIP) {
    /**...........................................................................
     * @class HelpTipTutorial
     * Creates a helptip version of a tutorial (as opposed to a full screen one
     * @version 1.0
     * ...........................................................................
     */
    var HelpTipTutorial = /** @class */ (function (_super) {
        __extends(HelpTipTutorial, _super);
        function HelpTipTutorial() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //#endregion
        //#region CREATE ALL ELEMENTS
        /** create the elements to actually show the tutorial */
        HelpTipTutorial.prototype._createElements = function () {
            this._createStepContainer();
        };
        //#endregion
        //#region ADD A PARTICULAR STEP
        /** add a particular step to the the tutorial */
        HelpTipTutorial.prototype.addStep = function (title, details) {
            var tip = new KIP.TutorialTip(this, title);
            tip.addDetails(details);
            // Add to our collection of steps
            this._addStepToCollection(tip);
            // Return the help tip we created
            return tip;
        };
        //#region ADD CSS STYLES FOR THE HELP-TIP TUTORIAL
        HelpTipTutorial._uncoloredStyles = {
            ".inlineHelp": {
                position: "absolute",
                backgroundColor: "#eee",
                padding: "10px",
                boxShadow: "1px 1px 13px 5px rgba(0,0,0,.1)",
                borderRadius: "3px",
                maxWidth: "35%"
            },
            ".inlineHelp .title": {
                fontSize: "1.1em",
                fontWeight: "bold",
                textTransform: "uppercase",
                marginBottom: "5px"
            },
            ".tutorial .inlineHelp .content": {
                display: "block"
            },
            ".tutorialHilite": {
                border: "5px #333 dotted",
                boxShadow: "1px 1px 8px 4px rgba(0,0,0, 0.2)"
            },
            ".tutorialHilite:before": {
                content: '""',
                position: "absolute",
                width: "140%",
                height: "140%",
                top: "-20%",
                left: "-20%",
                zIndex: "-1",
                backgroundColor: "rgba(0,0,0,.1)",
                boxShadow: "1px 1px 25px 10px rgba(0,0,0,.1)"
            },
            ".inlineBtns": {
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px"
            },
            ".inlineBtn": {
                cursor: "pointer",
                transition: "all .1s ease-in-out"
            },
            ".inlineBtn:hover": {
                transform: "scale(1.1)"
            },
            ".close.inlineBtn": {
                position: "absolute",
                left: "calc(100% - 18px)",
                top: "-5px",
                borderRadius: "15px",
                padding: "2px 7px"
            }
        };
        return HelpTipTutorial;
    }(KIP.Tutorial));
    KIP.HelpTipTutorial = HelpTipTutorial;
})(KIP || (KIP = {}));
var KIP;
(function (KIP) {
    var UnitTestUI = /** @class */ (function (_super) {
        __extends(UnitTestUI, _super);
        //#endregion
        /**...........................................................................
         * Construct a new instance of the UnitTestUI
         * ...........................................................................
         */
        function UnitTestUI() {
            var _this = _super.call(this) || this;
            _this._addClassName("UnitTestUI");
            return _this;
        }
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Create the elements needed for the drawable
         * ...........................................................................
         */
        UnitTestUI.prototype._createElements = function () {
            this._elems.base = KIP.createElement({ cls: "tests" });
            this._elems.testContainer = KIP.createElement({ cls: "testContainer", parent: this._elems.base });
            this._elems.groups = [];
        };
        /**...........................................................................
         * tset
         * ...........................................................................
         * State the result of whether a certain test passed or failed
         *
         * @param 	name 			The name of the assertion
         * @param 	actualResult 	What the result of the test was
         * @param 	expectedResult 	What should have been the result
         * @param 	message 		If provided, the additional message to display
         * ...........................................................................
         */
        UnitTestUI.prototype.test = function (name, actualResult, expectedResult, message) {
            var pass = this.testEquality(actualResult, expectedResult);
            var value = actualResult.toString() + " " + (pass ? "===" : "!==") + " " + expectedResult.toString();
            var valueStr = this._buildValueString(pass, actualResult, expectedResult);
            message = message || "";
            this._constructTestUI(name, pass, valueStr, message);
            this._logTest(name, pass, valueStr, message);
        };
        /**...........................................................................
         * assert
         * ...........................................................................
         * Asserts whether the passed in evaluation is true or false
         *
         * @param 	name 			Name of the test we are running
         * @param 	pass 			Evaluation of pass
         * @param 	trueMessage 	What to show if the evaluation passes
         * @param 	falseMessage 	What to show if the evaluation fails
         * ...........................................................................
         */
        UnitTestUI.prototype.assert = function (name, pass, trueMessage, falseMessage) {
            var msg = pass ? trueMessage : falseMessage;
            this._constructTestUI(name, pass, msg);
            this._logTest(name, pass, msg);
        };
        /**...........................................................................
         * startGroup
         * ...........................................................................
         * Creates a group of tests
         *
         * @param 	groupName 	The name of the group to display
         * ...........................................................................
         */
        UnitTestUI.prototype.startGroup = function (groupName) {
            console.log("\n=== " + groupName + " ===");
            // Create the group
            var group = KIP.createElement({ cls: "group", parent: this._elems.testContainer });
            this._elems.groups.push(group);
            // add the name of the group
            KIP.createElement({ cls: "groupName", parent: group, content: groupName });
        };
        /**...........................................................................
         * testFunction
         * ...........................................................................
         *
         * @param funcToTest
         * @param title
         * @param tests
         * ...........................................................................
         */
        UnitTestUI.prototype.testFunction = function (funcToTest, title, tests) {
            var parent = this._elems.groups[this._elems.groups.length - 1] || this._elems.testContainer;
            // create the title element for this group of elems
            var titleElem = KIP.createElement({ cls: "functionTitle", content: title, parent: parent });
            // Loop through each of the tests and verify each is working
            for (var idx = 0; idx < tests.length; idx += 1) {
                var testDetails = tests[idx];
                var result = funcToTest.apply(window, testDetails.params);
                var pass = this.testEquality(result, testDetails.result);
                var valueString = this._buildValueString(pass, result, testDetails.result);
                this._constructTestUI(testDetails.details, pass, valueString);
                this._logTest(testDetails.details, pass, valueString);
            }
        };
        /**...........................................................................
         * visualTest
         * ...........................................................................
         * @param title
         * @param buttons
         * ...........................................................................
         */
        UnitTestUI.prototype.visualTest = function (title, buttons) {
            var parent = this._elems.groups[this._elems.groups.length - 1] || this._elems.testContainer;
            var titleElem = KIP.createElement({ cls: "functionTitle", content: title, parent: parent });
            var _loop_2 = function (idx) {
                var btnDetails = buttons[idx];
                var btnElem = KIP.createElement({ cls: "visualTestBtn", parent: parent, children: [{ content: btnDetails.label, cls: "innerBtn" }] });
                btnElem.addEventListener("click", function () { btnDetails.callback(); });
            };
            // loop through the 
            for (var idx = 0; idx < buttons.length; idx += 1) {
                _loop_2(idx);
            }
        };
        /**...........................................................................
         * test
         * ...........................................................................
         * Check if the actual and expected results actually match
         *
         * @param actualResult 		What the test returned
         * @param expectedResult 	What the test should have returned
         *
         * @returns	True if the actual result matches the expected result
         * ...........................................................................
         */
        UnitTestUI.prototype.testEquality = function (actualResult, expectedResult) {
            if (actualResult.equals) {
                return actualResult.equals(expectedResult);
            }
            return (actualResult === expectedResult);
        };
        /**...........................................................................
         * _buildValueString
         * ...........................................................................
         * Build the string that will show whether the result is a match or not
         *
         * @param	pass			If true, builds the pass string
         * @param	actualResult	The value that was received
         * @param	expectedResult	The value we should have gotten
         *
         * @returns	A string that's appropriate for this test's result
         * ...........................................................................
         */
        UnitTestUI.prototype._buildValueString = function (pass, actualResult, expectedResult) {
            if (pass) {
                return KIP.format("'{0}' = '{1}'", actualResult, expectedResult);
            }
            else {
                return KIP.format("'{0}' != '{1}'", actualResult, expectedResult);
            }
        };
        /**...........................................................................
         * _buildTestString
         * ...........................................................................
         * Creates a test element for the div
         *
         * @param	name			What to display as the name of the test
         * @param 	pass    		True if the test passed
         * @param	value_string	The value to display for a pass
         * @param 	message 		Message to display with test
         *
         * @returns	The string displaying the result of the test
         * ...........................................................................
         */
        UnitTestUI.prototype._buildTestString = function (name, pass, value_string, message) {
            var content = "\t\t";
            content += this._passToString(pass).toUpperCase();
            content += ": " + name;
            content += (!pass ? " [" + value_string + "]" : "");
            content += (message ? " - " + message : "");
            return content;
        };
        /**...........................................................................
         * _passToString
         * ...........................................................................
         * Display whether the test passed or failed
         *
         * @param 	pass	True if the test passed
         *
         * @returns	Display string for the pass result
         * ...........................................................................
         */
        UnitTestUI.prototype._passToString = function (pass) {
            return (pass ? "pass" : "fail");
        };
        /**...........................................................................
         * _constructTestUI
         * ...........................................................................
         * Create the display elements for a test
         *
         * @param 	name 			Name of the test
         * @param 	pass 			True if the test passed
         * @param 	value_string 	The value of the test
         * @param 	message 		Optional message to go with the test
         * ...........................................................................
         */
        UnitTestUI.prototype._constructTestUI = function (name, pass, value_string, message) {
            var pass_str = this._passToString(pass);
            var group = this._elems.groups[this._elems.groups.length - 1];
            var test = KIP.createElement({ cls: "test", parent: group, attr: { title: value_string } });
            KIP.createElement({ cls: pass_str, content: pass_str.toUpperCase(), parent: test });
            KIP.createElement({ cls: "name", content: name, parent: test });
            if (!pass) {
                KIP.createElement({ cls: "err", content: value_string, parent: test });
                KIP.createElement({ cls: "message", content: message, parent: test });
            }
        };
        /**...........................................................................
         * _logTest
         * ...........................................................................
         * Adds the test to the console
         *
         * @param 	name 		Name of the test
         * @param 	pass 		True if the test passed
         * @param 	value_str 	What the test returned
         * @param 	message 	Optional messgae to go with the test
         * ...........................................................................
         */
        UnitTestUI.prototype._logTest = function (name, pass, value_str, message) {
            var content = this._buildTestString(name, pass, value_str, message);
            console.log(content);
        };
        //#region PROPERTIES
        /** styles to use for this unit test */
        UnitTestUI._uncoloredStyles = {
            ".hidden": {
                display: "none"
            },
            ".group": {
                marginBottom: "10px",
                display: "#666",
                borderCollapse: "collapse",
                width: "20%"
            },
            ".groupName": {
                fontSize: "1.6em",
                color: "#666"
            },
            ".functionTitle": {
                fontSize: "1.3em",
                color: "#888",
                marginLeft: "5px"
            },
            ".tests": {
                marginLeft: "50px",
                fontFamily: "Segoe UI, Calibri, Helvetica"
            },
            ".tests .testContainer": {
                display: "flex",
                flexWrap: "wrap"
            },
            ".test": {
                display: "table-row"
            },
            ".test > div": {
                border: "solid transparent",
                borderWidth: "10px",
                borderRightWidth: "20px",
                marginRight: "10px",
                display: "table-cell"
            },
            ".test .fail": {
                color: "rgb(190,50,30)",
                fontWeight: "bold"
            },
            ".test .pass": {
                color: "rgb(50,190,30)",
                fontWeight: "bold",
                marginRight: "10px",
                display: "table-cell"
            },
            ".test .name": {
                color: "#333",
                marginRight: "10px",
                display: "table-cell"
            },
            ".test .err": {
                fontStyle: "italic",
                color: "#666",
                fontSize: "0.8em"
            },
            ".test .message": {
                color: "#888",
                marginRight: "10px",
                display: "table-cell"
            },
            ".visualTestBtn": {
                color: "#FFF",
                padding: "2px 10px",
                borderRadius: "3px",
                cursor: "pointer",
                width: "auto",
                marginBottom: "8px"
            },
            ".innerBtn": {
                backgroundColor: "#06C",
                display: "inline-block",
                padding: "2px 10px"
            }
        };
        return UnitTestUI;
    }(KIP.Drawable));
    KIP.UnitTestUI = UnitTestUI;
})(KIP || (KIP = {}));
///<reference path="../drawable.ts" />
var KIP;
(function (KIP) {
    var Web = /** @class */ (function () {
        function Web(parentElem, canvasOptions) {
            this._parent = parentElem || document.body;
            this._canvas = new KIP.HTML5Canvas("web", canvasOptions);
            if (this._parent) {
                this._canvas.draw(this._parent);
            }
        }
        Web.prototype.addWebElement = function (newElem) {
            this._elements.push(newElem);
            this.draw();
        };
        Web.prototype.draw = function (parent) {
            if (!this._parent) {
                this._parent = parent;
            }
            // TODO
        };
        Web.prototype.erase = function () {
            // TODO
        };
        Web.prototype.createWebElementFromContent = function (content) {
            return null;
        };
        return Web;
    }());
    KIP.Web = Web;
})(KIP || (KIP = {}));
///<reference path="../drawable.ts" />
var KIP;
(function (KIP) {
    var WebElement = /** @class */ (function () {
        /** Create an element that will display in a web */
        function WebElement(content) {
            this._content = content;
        }
        Object.defineProperty(WebElement.prototype, "content", {
            get: function () { return this._content; },
            set: function (data) { this._content = data; },
            enumerable: true,
            configurable: true
        });
        WebElement.prototype.addChildElement = function (child) {
            this._childElements.push(child);
            child.draw();
            return;
        };
        WebElement.prototype.addLinkedElement = function (link) {
        };
        WebElement.prototype.draw = function () { };
        WebElement.prototype.erase = function () { };
        return WebElement;
    }());
    KIP.WebElement = WebElement;
})(KIP || (KIP = {}));
//# sourceMappingURL=kip.js.map