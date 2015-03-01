/** @jsx React.DOM */

var AlarmList = React.createClass({
    getInitialState: function() {
        return {
            alarms: [],
            error_msg: null,
        };
    },
    deleteAlarm: function(alarm_id) {
        $.ajax({
            url: "/api/alarms/delete",
            type: "POST",
            data: {alarm_id: alarm_id},
            success: function(data) {
                var alarms = this.state.alarms;
                var idx = -1;
                for(var i in alarms) {
                    if(alarms[i].id == alarm_id) {
                        idx = i;
                        break;
                    }
                }

                if(idx >= 0) {
                    alarms.splice(idx, 1);
                    this.setState({alarms: alarms, error_msg: null});
                }
                else {
                    console.log("bad id");
                    this.setState({error_msg: "Client side error - this should never happen"});
                }
            }.bind(this),
            error: function(err) {
                this.setState({error_msg: "Failed to delete alarm (" + err.status + ")"});
            }.bind(this),
        });
    },
    createAlarm: function(day, hour, minute, second) {
        var id = Math.floor(Math.random() * 1e15);
        var z_off = moment().utcOffset();
        var new_alarm = make_alarm_object(day, hour, minute, second, id, -z_off)

        var alarm_data = {
            id: new_alarm.id,
            day: new_alarm.day,
            hour: new_alarm.hour,
            minute: new_alarm.minute,
            second: new_alarm.second,
        };

        $.ajax({
            url: "/api/alarms/create",
            type: "POST",
            data: alarm_data,
            success: function(data) {
                this.fetchAlarms();
            }.bind(this),
            error: function(err) {
                this.setState({error_msg: "Failed to create new alarm (" + err.status + ")"});
            }.bind(this)
        });
    },
    fetchAlarms: function() {
        $.ajax({
            url: "/api/alarms", 
            dataType: "json",
            cache: false,
            success: function(data) {
                if(!("alarms" in data)) {
                    this.setState({error_msg: "Invalid json"});
                    return;
                }

                var z_off = moment().utcOffset();

                var alarms = [];
                for(var i in data["alarms"]) {
                    var a = data["alarms"][i];
                    var new_alarm = make_alarm_object(a.day, a.hour, a.minute, a.second, a.id, z_off);
                    alarms.push(new_alarm)
                    this.setState({error_msg: null, alarms: alarms});
                }

                this.props.authSucceeded(true);
            }.bind(this),
            error: function(err) {
                this.setState({error_msg: "Failed to fetch alarms (" + err.status + ")"});
                if(err.status == 403) {
                    this.props.authSucceeded(false);
                }
            }.bind(this),
        });
    },
    componentWillMount: function() {
        this.fetchAlarms();
    },
    render: function() {
        var alarm_elems = [];
        var err_elem = <span></span>;

        if(this.state.error_msg != null) {
            err_elem = <div className="error">{this.state.error_msg}</div>;
        }

        var alarms = this.state.alarms; 
        alarms.sort(function(a, b) {
            return a.next_occurence() - b.next_occurence();
        });


        for(var i in alarms) {
            alarm_elems.push(<Alarm key={i} 
                               alarm={alarms[i]}
                               time={this.props.time} 
                               deleteAlarm={this.deleteAlarm} />);
        }

        return (
            <div id="alarm-list">
                {err_elem}
                {alarm_elems}
                <AlarmCreator createAlarm={this.createAlarm} />
            </div>
        );
    },
});
