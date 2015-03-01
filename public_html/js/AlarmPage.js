/** @jsx React.DOM */

var AlarmPage = React.createClass({
    getInitialState: function() {
        return {
            time: moment(),
            password: null,
            auth_error: null,
            auth_ok: false,
        };
    },
    setPassword: function(password) {
        this.setState({password: password});

        $.ajax({
            url: "/api",
            headers: {
                "Authorization": make_hmac(password, {}),
            },
            success: function(data) {
                this.setState({auth_error: null, auth_ok: true});
            }.bind(this),
            error: function(err) {
                if(err.status == 403) {
                    this.setState({auth_error: "Authentication failed", auth_ok: false});
                }
                else {
                    this.setState({auth_error: "Unknown error (" + err.status + ")", auth_ok: false});
                }
            }.bind(this),
        });
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
        if(!this.state.auth_ok) {
            auth_elem = <AuthForm setPassword={this.setPassword} />;
        }

        var alarm_list_elem = <span></span>;
        if(this.state.auth_ok) {
            alarm_list_elem = <AlarmList time={this.state.time}
                                         password={this.state.password} />
        }

        var error_elem = <span></span>
        if(this.state.auth_error != null) {
            error_elem = <div className="error">{this.state.auth_error}</div>; 
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
