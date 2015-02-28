/** @jsx React.DOM */

var LocalClock = React.createClass({
    render: function() {
        var s = local_date_format(this.props.time);
        return (
           <div id="clock">{s}</div>
       ); 
    }
});
