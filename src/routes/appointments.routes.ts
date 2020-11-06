import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();
const createAppointmentService = new CreateAppointmentService(
  appointmentRepository,
);

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const appointment = createAppointmentService.execute({
      provider,
      date: parsedDate,
    });
    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

appointmentsRouter.get('/', (request, response) => {
  return response.json(appointmentRepository.all());
});

export default appointmentsRouter;
