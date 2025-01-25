import React, { useState, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

const MyCalendar = () => {
  // State for the currently selected date
  const [date, setDate] = useState(new Date());
  // State to store notes for each date
  const [notes, setNotes] = useState({});
  // State to control the visibility of the modal
  const [showModal, setShowModal] = useState(false);
  // State to store the date selected for adding a note
  const [selectedDate, setSelectedDate] = useState(null);
  // State to store the current note being edited
  const [currentNote, setCurrentNote] = useState('');
  // Ref to manage the timeout for single/double click detection
  const clickTimeoutRef = useRef(null);
  // Ref to count the number of clicks
  const clickCountRef = useRef(0);

  // Function to handle date change in the calendar
  const onChange = (newDate) => {
    setDate(newDate);
  };

  // Function to handle clicks on a date tile
  const handleDateClick = (value) => {
    // Increment the click counter
    clickCountRef.current += 1;
    
    // Clear any existing timeout
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    // If it's the first click, set a timeout
    if (clickCountRef.current === 1) {
      clickTimeoutRef.current = setTimeout(() => {
        // If it's still a single click after the timeout
        if (clickCountRef.current === 1) {
          // Single click: select the date and load any existing note
          setSelectedDate(value);
          setCurrentNote(notes[value.toISOString().split('T')[0]] || '');
        }
        // Reset the click counter
        clickCountRef.current = 0;
      }, 300);
    } else if (clickCountRef.current === 2) {
      // Double click: select the date, load any existing note, and show the modal
      setSelectedDate(value);
      setCurrentNote(notes[value.toISOString().split('T')[0]] || '');
      setShowModal(true);
      // Reset the click counter
      clickCountRef.current = 0;
    }
  };

  // Function to handle saving a note
  const handleSaveNote = () => {
    // If a date is selected and there's a note, save it
    if (selectedDate && currentNote) {
      setNotes({
        ...notes,
        [selectedDate.toISOString().split('T')[0]]: currentNote
      });
    }
    // Close the modal
    setShowModal(false);
  };

  // Function to render a dot on dates with notes
  const tileContent = ({ date }) => {
    const dateStr = date.toISOString().split('T')[0];
    if (notes[dateStr]) {
      return <div className="calendar-note" />;
    }
    return null;
  };

  return (
    <>
      <div className="calendar-container">
        <Calendar 
          onChange={onChange} 
          value={date}
          minDetail="month"
          nextLabel="→"
          prevLabel="←"
          next2Label={null}
          prev2Label={null}
          showNeighboringMonth={false}
          onClickDay={handleDateClick}
          tileContent={tileContent}
        />
      </div>

      {showModal && (
        <>
          <div className="modal-overlay" onClick={() => setShowModal(false)} />
          <div className="note-modal">
            <h3>Add Note for {selectedDate?.toLocaleDateString()}</h3>
            <textarea
              className="note-input"
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              placeholder="Enter your note here..."
              rows={4}
            />
            <div className="note-actions">
              <button 
                className="note-button cancel-button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button 
                className="note-button save-button"
                onClick={handleSaveNote}
              >
                Save Note
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyCalendar;