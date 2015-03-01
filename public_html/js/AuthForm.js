/** @jsx React.DOM */

var AuthForm = React.createClass({
    onSubmit: function(event) {
        event.preventDefault();
        this.props.setPassword($("#password-field").val()); 
    },
    render: function() {
        return (
            <div id="auth-wrapper">
                <form id="auth-form" onSubmit={this.onSubmit}>
                    <input type="password" 
                           id="password-field" 
                           placeholder="Password" />
                    <input type="submit" value="Authenticate" />
                </form>
            </div>
        );
    },
});
