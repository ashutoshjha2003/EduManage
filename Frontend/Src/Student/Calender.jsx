import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 

const CustomCalendar = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="flex justify-center items-center p-4 rounded-xl w-full">
      <style>
        {`
          .react-calendar {
            background: transparent !important;
            color: #333 !important;
            border-radius: 12px !important;
            width: 100%;
            border: none;
            font-family: 'Arial', sans-serif;
          }

          .react-calendar__navigation {
            background: transparent !important;
            color: #333 !important;
          }

          .react-calendar__tile {
            background: transparent !important;
            color: #333 !important;
            border-radius: 8px !important;
            padding: 10px !important;
            transition: background-color 0.2s ease;
          }

          .react-calendar__tile:hover {
            background-color: rgba(0, 0, 0, 0.05) !important;
          }

          .react-calendar__month-view__weekdays {
            background: transparent !important;
            color: #333 !important;
          }

          .react-calendar__tile--active {
            background: rgba(0, 123, 255, 0.8) !important;
            color: #fff !important;
          }

          .react-calendar__tile--now {
            background: rgba(255, 255, 0, 0.2) !important;
            color: #333 !important;
          }

          .react-calendar__tile--now:enabled:active,
          .react-calendar__tile--now:enabled:focus {
            background: rgba(0, 0, 255, 0.5) !important;
            color: #fff !important;
          }
        `}
      </style>

      <Calendar
        onChange={handleDateChange}
        value={date}
        tileClassName={({ date, view }) => view === 'month' ? 'react-calendar__tile' : ''}
      />
    </div>
  );
};

export default CustomCalendar;