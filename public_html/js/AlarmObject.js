function AlarmObject(day_of_week, hour, minute, second, tzoffset, id) {
    var DAYS = 60 * 60 * 24;
    var HOURS = 60 * 60;
    var MINUTES = 60;

    this.day = day_of_week;
    this.hour = hour;
    this.minute = minute;
    this.second = second;
    this.tzoffset = tzoffset;
    this.id = id;
    this.server_error = false;

    this.next_occurence = function() {
        var now = moment();

        var days_diff = this.day - now.day();
        var hours_diff = this.hour - now.hour();
        var minutes_diff = this.minute - now.minute();
        var seconds_diff = this.second - now.second();

        if(seconds_diff < 0) {
            seconds_diff += 60;
            minutes_diff -= 1;
        }

        if(minutes_diff < 0) {
            minutes_diff += 60;
            hours_diff -= 1;
        }

        if(hours_diff < 0) {
            hours_diff += 24;
            days_diff -= 1;
        }

        if(days_diff < 0) {
            days_diff += 7;
        }

        var total_diff = (days_diff * DAYS) + (hours_diff * HOURS) + (minutes_diff * MINUTES) + seconds_diff;
        return moment.unix(now.unix() + total_diff);
    }

    this.to_string = function() {
        var day_names = ["Sunday", "Monday", "Tuesday", "Wednesday", 
            "Thursday", "Friday", "Saturday"];
        var no = this.next_occurence();
        return day_names[no.weekday()] + no.format(" hh:mm:ss A ZZ");
    }
}




