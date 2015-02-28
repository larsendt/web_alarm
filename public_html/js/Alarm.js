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
            <div className="alarm-descriptor">Tuesday 09:00:00 AM</div>
        )
    },
});

var Alarm = React.createClass({
    deleteAlarm: function() {
        this.props.deleteAlarm(this.props.alarm_id);
    },
    render: function() {
        return (
            <div className="alarm">
                <AlarmCountdown trigger_time={this.props.trigger_time} 
                                time={this.props.time} />
                <AlarmDescriptor />
                <AlarmDeleteButton onClick={this.deleteAlarm} />
            </div>
        );
    },
});


