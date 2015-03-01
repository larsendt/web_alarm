function AlarmObject(day_of_week, hour, minute, second, id) {
    var DAYS = 60 * 60 * 24;
    var HOURS = 60 * 60;
    var MINUTES = 60;

    this.day = day_of_week;
    this.hour = hour;
    this.minute = minute;
    this.second = second;
    this.id = id;
    this.server_error = false;

    this.next_occurence = function() {
        var now = new Date();
        
        var days_diff = this.day - now.getDay();
        var hours_diff = this.hour - now.getHours();
        var minutes_diff = this.minute - now.getMinutes();
        var seconds_diff = this.second - now.getSeconds();

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
        total_diff *= 1000;
        return new Date(now.getTime() + total_diff);
    }

    this.to_string = function() {
        var day_names = ["Sunday", "Monday", "Tuesday", "Wednesday", 
            "Thursday", "Friday", "Saturday"];

        var s = "";
        var am = true;

        s += day_names[this.day] + " ";

        var hr = this.hour;
        if(hr > 12) {
            am = false;
            hr -= 12;
        }

        if(hr == 0) {
            hr = 12;
        }

        if(hr < 10) {
            hr = "0" + hr;
        }

        s += " " + hr + ":";

        var min = this.minute;
        if(minute < 10) {
            min = "0" + min;
        }

        s += min + ":";

        var sec = this.second;
        if(sec < 10) {
            sec = "0" + sec;
        }

        s += sec; 

        if(am) {
            s += " AM";
        }
        else {
            s += " PM";
        }

        return s;
    }
}




