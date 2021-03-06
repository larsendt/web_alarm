function local_date_format(date) {
    var h = date.getHours();
    var am = true;

    if(h > 12) {
        h -= 12;
        am = false;
    }

    if(h < 10) {
        h = "0" + h;
    }

    var m = date.getMinutes();
    if(m < 10) {
        m = "0" + m;
    }

    var s = date.getSeconds();
    if(s < 10) {
        s = "0" + s;
    }

    var postfix = " PM";
    if(am) {
        postfix = " AM";
    }

    return h + ":" + m + ":" + s + postfix;
}

function fmt_diff(diff) {
    var neg = diff < 0;
    diff = Math.abs(diff);

    var days = Math.floor(diff / (60 * 60 * 24));
    diff -= days * 60 * 60 * 24;

    var hours = Math.floor(diff / (60 * 60));
    diff -= hours * 60 * 60; 

    var minutes = Math.floor(diff / 60);
    diff -= minutes * 60;

    var seconds = Math.floor(diff);

    var str = "";
    if(days > 0) {
        str += days + " day";
        if(days > 1) {
            str += "s";
        }
    }

    if(hours > 0) {
        str += " " + hours + " hour";
        if(hours > 1) {
            str += "s";
        }
    }

    if(minutes > 0) {
        str += " " + minutes + " minute";
        if(minutes > 1) {
            str += "s";
        }
    }
    
    if(seconds >= 0) {
        str += " " + seconds + " second";
        if(seconds != 1) {
            str += "s";
        }
    }

    if(neg) {
        return "-" + str;
    }
    else {
        return str;
    }
}

function make_alarm_object(day, hour, minute, second, id, minutes_offset) {
    var hdiff = Math.floor(minutes_offset / 60);
    var mdiff = Math.floor(minutes_offset - (hdiff * 60));

    minute -= mdiff;
    hour -= hdiff;

    if(minute < 0) {
        minute += 60;
        hour -= 1;
    }
    if(minute > 59) {
        minute -= 60;
        hour += 1;
    }

    if(hour < 0) {
        hour += 24;
        day -= 1;
    }
    else if(hour > 23) {
        hour -= 24;
        day += 1;
    }

    if(day < 0) {
        day += 7;
    }
    else if(day > 6) {
        day -= 7;
    }

    return new AlarmObject(day, hour, minute, second, id);
}

function make_hmac(password, data) {
    var datastr = "";
    var keys = Object.keys(data);
    keys.sort();
    for(var i in keys) {
        var key = keys[i];
        datastr += key + "=" + data[key] + ",";
    }
    
    // timestamp with 3 second window to prevent replay attacks
    var t = moment().unix();
    datastr += "hmac-timestamp=" + (t - (t % 3));
    return "hmac-sha256=" + CryptoJS.HmacSHA256(datastr, password);
}



