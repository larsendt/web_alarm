/** @jsx React.DOM */

var AlarmPage = React.createClass({
    getInitialState: function() {
        return {
            time: new Date()
        };
    },
    updateTime: function() {
        this.setState({time: new Date()});
    },
    componentWillMount: function() {
        this.updateTime();
        setInterval(this.updateTime, 1000);
    },
    render: function() {
        return (
            <div id="alarm-page">
                <LocalClock time={this.state.time} />
                <AlarmList time={this.state.time} />
            </div>
        );
    }
});

React.render(<AlarmPage />, document.getElementById("alarm-component"));
