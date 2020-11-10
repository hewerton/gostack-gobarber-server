import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  providerId: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentRepository: AppointmentsRepository = getCustomRepository(
    AppointmentsRepository,
  );

  public async execute({ providerId, date }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const foundAppointmentInSameDate = await this.appointmentRepository.findByDate(
      appointmentDate,
    );

    if (foundAppointmentInSameDate) {
      throw Error('This appointment is already booked.');
    }

    const appointment = await this.appointmentRepository.create({
      providerId,
      date: appointmentDate,
    });

    await this.appointmentRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentService;
