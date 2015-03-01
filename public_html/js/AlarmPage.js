/** @jsx React.DOM */

var AlarmPage = React.createClass({
    getInitialState: function() {
        return {
            time: moment()
        };
    },
    updateTime: function() {
        this.setState({time: moment()});
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
