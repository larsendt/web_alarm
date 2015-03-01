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
        var id = Math.floor(Math.random() * 1e10);
        var alarms = this.state.alarms; 
        alarms.push(new AlarmObject(day, hour, minute, second, id));
        alarms.sort(function(a, b) {
            return a.next_occurence() - b.next_occurence();
        });
        this.setState({alarms: alarms});
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
                for(var i in data["alarms"]) {
                    var a = data["alarms"][i];
                    this.createAlarm(a.day, a.hour, a.minute, a.second);
                    this.setState({error_msg: null});
                }
            }.bind(this),
            error: function(err) {
                this.setState({error_msg: "Failed to fetch alarms (" + err.status + ")"})
            }.bind(this),
        });
    },
    render: function() {
        var alarms = [];
        var err_elem = <span></span>;

        if(this.state.error_msg != null) {
            err_elem = <div className="error">{this.state.error_msg}</div>;
        }

        for(var i in this.state.alarms) {
            alarms.push(<Alarm key={i} 
                               alarm={this.state.alarms[i]}
                               time={this.props.time} 
                               deleteAlarm={this.deleteAlarm} />);
        }

        return (
            <div id="alarm-list">
                {err_elem}
                {alarms}
                <AlarmCreator createAlarm={this.createAlarm} />
            </div>
        );
    },
});
