/** @jsx React.DOM */

var AlarmCountdown = React.createClass({
    render: function() {
        var d = this.props.trigger_time.getTime() - this.props.time.getTime();
        return (
            <div className="alarm-countdown">Trigger in {fmt_diff(d)}</div>
        );
    },
});

var AlarmDeleteButton = React.createClass({
    render: function() {
        return (
            <div onClick={this.props.onClick} className="alarm-close-button">X</div>
        );
    }
});

var AlarmDescriptor = React.createClass({
    render: function() {
        return (
            <div className="alarm-descriptor">{this.props.alarm_string}</div>
        )
    },
});

var Alarm = React.createClass({
    deleteAlarm: function() {
        this.props.deleteAlarm(this.props.alarm.id);
    },
    render: function() {
        var className = "alarm";
        if(this.props.alarm.next_occurence() - this.props.time < (15 * 60 * 1000)) {
            className += " active-alarm"; 
        }
        return (
            <div className={className}>
                <AlarmCountdown trigger_time={this.props.alarm.next_occurence()} 
                                time={this.props.time} />
                <AlarmDescriptor alarm_string={this.props.alarm.to_string()} />
                <AlarmDeleteButton onClick={this.deleteAlarm} />
            </div>
        );
    },
});


