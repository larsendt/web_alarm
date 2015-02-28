/** @jsx React.DOM */

var AlarmCreator = React.createClass({
    render: function() {
        return (
            <div id="alarm-creator">
                <form id="alarm-creation-form"> 
                    <select id="day-select">
                        <option value="sun">Sunday</option>
                        <option value="mon">Monday</option>
                        <option value="tues">Tuesday</option>
                        <option value="wed">Wednesday</option>
                        <option value="thu">Thursday</option>
                        <option value="fri">Friday</option>
                        <option value="sat">Saturday</option>
                    </select>
                    <input type="text" placeholder="00" />:
                    <input type="text" placeholder="00" />:
                    <input type="text" placeholder="00" />
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
