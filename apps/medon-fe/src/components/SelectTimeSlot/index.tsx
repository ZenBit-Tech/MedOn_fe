import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { timeSlots } from 'utils/constants/options/hourOptions';
import dayjs from 'dayjs';
import { Container, DrText, SlotActive, TimeSlot, TimeText } from './styles';
import { SelectTimeSlotProps } from './types';

export default function SelectTimeSlot({
  setStartTime,
  setEndTime,
  setIsActive,
  isActive,
  selectTimeAppointments,
  data,
  setSelectedDoctorsById,
  selectedDate,
}: SelectTimeSlotProps) {
  const { t } = useTranslation();
  const [timeSlotsAvailability, setTimeSlotsAvailability] = useState<{
    [doctorId: number]: boolean[];
  }>({});

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const availability: { [doctorId: number]: boolean[] } = {};

      data.forEach((slot) => {
        const { doctor } = slot;
        const startTime = new Date(slot.startTime).getHours();
        const endTime = new Date(slot.endTime).getHours();

        if (!availability[doctor.id]) {
          availability[doctor.id] = timeSlots.map(() => false);
        }

        for (let i = startTime; i < endTime; i += 1) {
          availability[doctor.id][i] = true;
        }
      });

      setTimeSlotsAvailability(availability);
    }
  }, [data]);

  const selectTime = (time: string) => {
    const doctorAvailability = Object.entries(timeSlotsAvailability);
    const start = dayjs(selectedDate)
      .hour(+time.split(':')[0])
      .minute(0)
      .toDate();
    const end = dayjs(selectedDate)
      .hour(+time.split(':')[0] + 1)
      .minute(0)
      .toDate();

    if (
      doctorAvailability.some(
        ([doctorId, availability]) => availability[timeSlots.indexOf(time)]
      )
    ) {
      selectTimeAppointments(time);
      setIsActive(time);

      const selectedDoctorsIds = doctorAvailability
        .filter(
          ([doctorId, availability]) => availability[timeSlots.indexOf(time)]
        )
        .map(([doctorId]) => parseInt(doctorId, 10));

      setSelectedDoctorsById(selectedDoctorsIds);
    }
    setStartTime(start);
    setEndTime(end);
  };

  return (
    <Container>
      {timeSlots.map((timeSlot, index) => (
        <TimeSlot
          onClick={() => selectTime(timeSlot)}
          key={timeSlot}
          style={isActive === timeSlot ? SlotActive : {}}
          disabled={
            !Object.values(timeSlotsAvailability).some(
              (availability) => availability[index]
            )
          }
        >
          <TimeText>{timeSlot}</TimeText>
          <DrText>
            <span>{t('appointment.availableDr')}</span>
            <span>
              {
                Object.values(timeSlotsAvailability).filter(
                  (availability) => availability[index]
                ).length
              }
            </span>
          </DrText>
        </TimeSlot>
      ))}
    </Container>
  );
}
