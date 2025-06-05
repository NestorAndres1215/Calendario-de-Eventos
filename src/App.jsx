import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import Swal from 'sweetalert2';
import './styles/global.css';

const App = () => {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('eventos');
    return saved ? JSON.parse(saved) : {};
  });

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const handleDayClick = (day) => {
    Swal.fire({
      title: `Nuevo evento: ${day}/${month + 1}`,
      input: 'text',
      inputLabel: 'Título del evento',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
    }).then(result => {
      if (result.isConfirmed && result.value.trim()) {
        const newEvents = { ...events };
        if (!newEvents[day]) newEvents[day] = [];
        newEvents[day].push(result.value);
        setEvents(newEvents);
        Swal.fire('¡Guardado!', 'Evento agregado correctamente.', 'success');
      }
    });
  };

  const clearAllEvents = () => {
    Swal.fire({
      title: '¿Eliminar todos los eventos?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar todo',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.isConfirmed) {
        setEvents({});
        Swal.fire('Eliminado', 'Todos los eventos fueron eliminados.', 'success');
      }
    });
  };

  useEffect(() => {
    localStorage.setItem('eventos', JSON.stringify(events));
  }, [events]);

  return (
    <div className="app">
      <h1>📅 Calendario de Eventos</h1>
      <button onClick={clearAllEvents} className="clear-btn">Eliminar todos</button>
      <Calendar
        daysInMonth={daysInMonth}
        firstDay={firstDay}
        events={events}
        onDayClick={handleDayClick}
      />
    </div>
  );
};

export default App;
