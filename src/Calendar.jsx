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
  // State to control the visibility of the note preview
  const [showNotePreview, setShowNotePreview] = useState(false);
  // State to store the popup position
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  // Ref for tracking double clicks
  const clickTimeoutRef = useRef(null);
  const lastClickTimeRef = useRef(0);
  const calendarRef = useRef(null);

  // Function to handle date change in the calendar
  const onChange = (newDate) => {
    setDate(newDate);
  };

  // Function to handle clicks on a date tile
  const handleDateClick = (value, event) => {
    const currentTime = new Date().getTime();
    const timeBetweenClicks = currentTime - lastClickTimeRef.current;
    
    // Update last click time
    lastClickTimeRef.current = currentTime;

    // Clear any existing timeout
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    // If time between clicks is less than 300ms, it's a double click
    if (timeBetweenClicks < 300) {
      const dateStr = value.toISOString().split('T')[0];
      setSelectedDate(value);
      
      if (notes[dateStr]) {
        // Calculate position relative to the clicked tile
        const rect = event.target.getBoundingClientRect();
        const calendarRect = calendarRef.current.getBoundingClientRect();
        
        const top = rect.top - calendarRect.top + rect.height;
        const left = rect.left - calendarRect.left;

        setPopupPosition({ top, left });
        setCurrentNote(notes[dateStr]);
        setShowNotePreview(true);
      } else {
        // Open modal to add new note
        setCurrentNote('');
        setShowModal(true);
      }
    } else {
      // Single click - just select the date
      setSelectedDate(value);
    }
  };

  // Function to handle saving a note
  const handleSaveNote = () => {
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      if (currentNote.trim()) {
        setNotes(prevNotes => ({
          ...prevNotes,
          [dateStr]: currentNote
        }));
      } else {
        // If the note is empty, remove it from the notes object
        const newNotes = { ...notes };
        delete newNotes[dateStr];
        setNotes(newNotes);
      }
    }
    setShowModal(false);
    setShowNotePreview(false);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setShowNotePreview(false);
    setCurrentNote('');
  };

  // Function to handle editing a note
  const handleEditNote = () => {
    setShowNotePreview(false);
    setShowModal(true);
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
    <div className="calendar-container" ref={calendarRef}>
      <Calendar 
        onChange={onChange} 
        value={date}
        minDetail="month"
        nextLabel="→"
        prevLabel="←"
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
        onClickDay={(value, event) => handleDateClick(value, event)}
        tileContent={tileContent}
      />
      <div className="calendar-instructions">
        Double-click a date to view or add a note
      </div>

      {showNotePreview && (
        <>
          <div className="note-preview-overlay" onClick={() => setShowNotePreview(false)} />
          <div 
            className="note-preview"
            style={{
              top: `${popupPosition.top}px`,
              left: `${popupPosition.left}px`
            }}
          >
            <h3>{selectedDate?.toLocaleDateString()}</h3>
            <div className="note-content">{currentNote}</div>
            <div className="note-actions">
              <button 
                className="note-button edit-button"
                onClick={handleEditNote}
              >
                Edit
              </button>
              <button 
                className="note-button close-button"
                onClick={() => setShowNotePreview(false)}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}

      {showModal && (
        <>
          <div className="modal-overlay" onClick={handleCloseModal} />
          <div className="note-modal">
            <h3>{notes[selectedDate?.toISOString().split('T')[0]] ? 'Edit' : 'Add'} Note for {selectedDate?.toLocaleDateString()}</h3>
            <textarea
              className="note-input"
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              placeholder="Enter your note here..."
              rows={4}
              autoFocus
            />
            <div className="note-actions">
              <button 
                className="note-button cancel-button"
                onClick={handleCloseModal}
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
    </div>
  );
};

export default MyCalendar;