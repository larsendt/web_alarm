/** @jsx React.DOM */

var AlarmList = React.createClass({
    getInitialState: function() {
        return {
            alarm_times: {
                1:new AlarmObject(0, 0, 0, 0), 
                2:new AlarmObject(1, 0, 0, 0), 
                3:new AlarmObject(2, 0, 0, 0)
            }
        };
    },
    deleteAlarm: function(alarm_id) {
        console.log("delete alarm: " + alarm_id);
        var times = this.state.alarm_times;
        delete times[alarm_id];
        this.setState({alarm_times: times});
    },
    render: function() {
        var alarms = [];
        for(var i in this.state.alarm_times) {
            alarms.push(<Alarm key={i} 
                               alarm_id={i}
                               alarm={this.state.alarm_times[i]}
                               time={this.props.time} 
                               deleteAlarm={this.deleteAlarm} />);
        }

        return (
            <div id="alarm-list">
                {alarms}
                <AlarmCreator />
            </div>
        );
    },
});
