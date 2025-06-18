import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CustomCalendar = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const calendarStyleOverride = `
    .react-calendar {
      background: transparent !important;
      color: #333 !important;
      border-radius: 12px !important;
      border: none !important;
    }

    .react-calendar__navigation {
      background: transparent !important;
      color: #333 !important;
    }

    .react-calendar__month-view__weekdays {
      background: transparent !important;
      color: #333 !important;
    }

    .react-calendar__tile {
      background: transparent !important;
      color: #333 !important;
      border-radius: 8px !important;
      padding: 10px !important;
      transition: all 0.2s ease-in-out !important;
    }

    .react-calendar__tile--active {
      background: rgba(0, 123, 255, 0.8) !important;
      color: white !important;
    }

    .react-calendar__tile--now {
      background: rgba(255, 255, 0, 0.2) !important;
      color: #333 !important;
    }

    .react-calendar__tile--now:enabled:active,
    .react-calendar__tile--now:enabled:focus {
      background: rgba(0, 0, 255, 0.5) !important;
      color: white !important;
    }

    .react-calendar__tile:hover {
      background: rgba(0, 0, 0, 0.05) !important;
    }
  `;

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-xl shadow-md bg-white/30 backdrop-blur-md">
      <style>{calendarStyleOverride}</style>
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileClassName={({ date, view }) =>
          view === 'month' ? 'react-calendar__tile' : null
        }
      />
    </div>
  );
};

export default CustomCalendar;