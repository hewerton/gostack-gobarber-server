import { Router } from 'express';
import { parseISO } from 'date-fns';

import { getCustomRepository } from 'typeorm';
import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', async (request, response) => {
  const createAppointmentService = new CreateAppointmentService();

  const { provider_id: providerId, date } = request.body;

  const parsedDate = parseISO(date);

  const appointment = await createAppointmentService.execute({
    providerId,
    date: parsedDate,
  });
  return response.json(appointment);
});

appointmentsRouter.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentsRepository);
  const all = await appointmentRepository.find();
  return response.json(all);
});

export default appointmentsRouter;
