function local_date_format(date) {
    var h = date.getHours();
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

    return h + ":" + m + ":" + s;
}

function fmt_diff(diff) {
    diff = diff / 1000;
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
    
    if(seconds > 0) {
        str += " " + seconds + " second";
        if(seconds > 1) {
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

