/** @jsx React.DOM */

var AlarmCreator = React.createClass({
    getInitialState: function() {
        return {
            hour_ok: true,
            minute_ok: true,
            second_ok: true,
            error_msg: null,
        };
    },
    submit: function(event) {
        var day = Number($("#day-select").val());
        var hour = Number($("#hour-input").val());
        var minute = Number($("#minute-input").val());
        var second = Number($("#second-input").val());
        var am = $("#am-pm-select").val();

        var ok = true;
        
        var newstate = {
            hour_ok: true,
            minute_ok: true,
            second_ok: true
        };

        if(hour < 1 || hour > 12) {
            newstate.hour_ok = false;
            ok = false;
        }

        if(minute < 0 || minute > 59) {
            newstate.minute_ok = false;
            ok = false;
        }

        if(second < 0 || second > 59) {
            newstate.second_ok = false;
            ok = false;
        }

        if(am == "am") {
            if(hour == 12) {
                hour = 0;
            }
        }
        else {
            if(hour != 12) {
                hour = (hour + 12) % 24;
            }
        }

        if(ok) {
            this.props.createAlarm(day, hour, minute, second); 
        }
        this.setState(newstate);

        event.preventDefault();
    },
    render: function() {
        var hour_style = {};
        var minute_style = {};
        var second_style = {};

        if(!this.state.hour_ok) {
            hour_style.border = "1px solid #f00";    
            hour_style.backgroundColor = "#fcc";
        }

        if(!this.state.minute_ok) {
            minute_style.border = "1px solid #f00";    
            minute_style.backgroundColor = "#fcc";
        }

        if(!this.state.second_ok) {
            second_style.border = "1px solid #f00";    
            second_style.backgroundColor = "#fcc";
        }

        return (
            <div id="alarm-creator">
                <form id="alarm-creation-form" onSubmit={this.submit}> 
                    <select id="day-select">
                        <option value="0">Sunday</option>
                        <option value="1">Monday</option>
                        <option value="2">Tuesday</option>
                        <option value="3">Wednesday</option>
                        <option value="4">Thursday</option>
                        <option value="5">Friday</option>
                        <option value="6">Saturday</option>
                    </select>
                    <input type="number" 
                           defaultValue="12" 
                           id="hour-input" 
                           style={hour_style} />:
                    <input type="number" 
                           defaultValue="00" 
                           id="minute-input" 
                           style={minute_style} />:
                    <input type="number" 
                           defaultValue="00" 
                           id="second-input" 
                           style={second_style} />
                    <select id="am-pm-select">
                        <option value="am">AM</option>
                        <option value="pm">PM</option>
                    </select>
                    <input type="submit" value="Add Alarm" />
                </form>
            </div>
        );
    },
});
