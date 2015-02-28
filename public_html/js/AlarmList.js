/** @jsx React.DOM */

function alarm_time() {
    var now = new Date().getTime();
    var t = now + (Math.random() * 24 * 60 * 60 * 1000);
    return new Date(t);
}

var AlarmList = React.createClass({
    getInitialState: function() {
        return {
            alarm_times: {
                1:alarm_time(), 
                2:alarm_time(), 
                3:alarm_time()
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
                               trigger_time={this.state.alarm_times[i]}
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
