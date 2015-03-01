/** @jsx React.DOM */

var AlarmPage = React.createClass({
    getInitialState: function() {
        return {
            time: moment(),
            password: null,
            auth_ok: "pending",
        };
    },
    setPassword: function(password) {
        this.setState({password: password});
    },
    authSucceeded: function(ok) {
        this.setState({auth_ok: ok});
    },
    updateTime: function() {
        this.setState({time: moment()});
    },
    componentWillMount: function() {
        this.updateTime();
        setInterval(this.updateTime, 1000);
    },
    render: function() {
        var auth_elem = <span></span>;
        if(this.state.auth_ok !== true) {
            auth_elem = <AuthForm setPassword={this.setPassword} />;
        }

        var alarm_list_elem = <span></span>;
        if(this.state.password != null) {
            alarm_list_elem = <AlarmList time={this.state.time}
                                         password={this.state.password} 
                                         authSucceeded={this.authSucceeded} />;
        }

        var error_elem = <span></span>
        if(!this.state.auth_ok && this.state.password != null) {
            error_elem = <div className="error">Authentication failed</div>; 
        }

        return (
            <div id="alarm-page">
                <LocalClock time={this.state.time} />
                {error_elem}
                {auth_elem}
                {alarm_list_elem}
            </div>
        );
    }
});

React.render(<AlarmPage />, document.getElementById("alarm-component"));
