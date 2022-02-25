import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, utils } from "react-modern-calendar-datepicker";

const App = () => {
    const [selectedDay, setSelectedDay] = useState(null);
    // set to local storage
    localStorage.setItem("pickup_day", JSON.stringify(selectedDay))
    return (
        <>
            <Calendar
                value={selectedDay}
                onChange={setSelectedDay}
                minimumDate={utils().getToday()}
                calendarClassName="responsive-calendar" // added this
                shouldHighlightWeekends
            />
        </>
    );
};

export default App;