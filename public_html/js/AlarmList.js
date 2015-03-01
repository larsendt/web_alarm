/** @jsx React.DOM */

var AlarmList = React.createClass({
    getInitialState: function() {
        return {
            alarms: [],
            error_msg: null,
        };
    },
    deleteAlarm: function(alarm_id) {
        console.log("delete alarm: " + alarm_id);
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
            this.setState({alarms: alarms});
        }
        else {
            console.log("bad id");
        }
    },
    createAlarm: function(day, hour, minute, second) {
        var id = Math.floor(Math.random() * 1e15);
        var alarms = this.state.alarms; 
        var new_alarm = new AlarmObject(day, hour, minute, second, id);

        $.ajax({
            url: "/api/alarms/create",
            type: "POST",
            data: new_alarm,
            success: function(data) {
                alarms.push(new_alarm);
                this.setState({error_msg: null, alarms: alarms});
            }.bind(this),
            error: function(err) {
                this.setState({error_msg: "Failed to create new alarm (" + err.status + ")"});
            }.bind(this)
        });
    },
    componentWillMount: function() {
        $.ajax({
            url: "/api/alarms", 
            dataType: "json",
            cache: false,
            success: function(data) {
                if(!("alarms" in data)) {
                    this.setState({error_msg: "Invalid json"});
                    return;
                }
                var alarms = this.state.alarms;
                for(var i in data["alarms"]) {
                    var a = data["alarms"][i];
                    var new_alarm = new AlarmObject(a.day, a.hour, a.minute, a.second, a.id);
                    alarms.push(new_alarm)
                    this.setState({error_msg: null, alarms: alarms});
                }
            }.bind(this),
            error: function(err) {
                this.setState({error_msg: "Failed to fetch alarms (" + err.status + ")"})
            }.bind(this),
        });
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
