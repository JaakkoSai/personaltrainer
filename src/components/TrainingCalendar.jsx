import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function TrainingCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchTrainingsUrl =
      "https://traineeapp.azurewebsites.net/gettrainings";

    const fetchTrainings = async () => {
      try {
        const response = await fetch(fetchTrainingsUrl);
        const trainingsArray = await response.json();

        const calendarEvents = trainingsArray.map((training) => {
          return {
            title: `${training.activity} / ${training.customer.firstname} ${training.customer.lastname}`,
            start: training.date,

            end: new Date(
              new Date(training.date).getTime() + training.duration * 60000
            ),
          };
        });

        setEvents(calendarEvents);
      } catch (error) {
        console.error("Error fetching trainings:", error);
      }
    };

    fetchTrainings();
  }, []);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
      }}
      events={events}
      eventColor="#378006"
    />
  );
}
