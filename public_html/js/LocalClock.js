/** @jsx React.DOM */

var LocalClock = React.createClass({
    render: function() {
        var s = this.props.time.format("hh:mm:ss A ZZ");
        return (
           <div id="clock">{s}</div>
       ); 
    }
});
