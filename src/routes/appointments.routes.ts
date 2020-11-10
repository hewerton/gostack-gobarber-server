import { Router } from 'express';
import { parseISO } from 'date-fns';

import { getCustomRepository } from 'typeorm';
import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

appointmentsRouter.post('/', async (request, response) => {
  const createAppointmentService = new CreateAppointmentService();
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const appointment = await createAppointmentService.execute({
      provider,
      date: parsedDate,
    });
    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

appointmentsRouter.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentsRepository);
  const all = await appointmentRepository.find();
  return response.json(all);
});

export default appointmentsRouter;
