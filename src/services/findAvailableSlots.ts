"use server";

import { addMinutes, addDays, isBefore, set } from 'date-fns'
import { prisma } from '@/db/prisma'

export async function findAvailableSlots(serviceId: number, professionalId: number) {
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    select: { duration: true },
  })

  if (!service) throw new Error('Servicio no encontrado')

  const duration = service.duration
  const durationMs = duration * 60 * 1000
  const now = roundUpToNextSlot(new Date(), duration)
  const end = addDays(now, 1)

  // Confirmar que el profesional ofrece ese servicio
  const professionalService = await prisma.professionalService.findFirst({
    where: {
      active: true,
      professionalId,
      serviceId,
    },
  })

  if (!professionalService) throw new Error('Servicio profesional no encontrado')

  // Obtener todos los ProfessionalService del profesional
  const allProfessionalServices = await prisma.professionalService.findMany({
    where: { professionalId },
    select: { id: true, serviceId: true, Service: { select: { duration: true } } },
  })

  const psIds = allProfessionalServices.map(ps => ps.id)

  // Obtener todas las citas del profesional (de cualquier servicio)
  const appointments = await prisma.appointment.findMany({
    where: {
      date: {
        gte: now,
        lte: end,
      },
      ProfessionalService: {
        some: {
          id: { in: psIds },
        },
      },
    },
    include: {
      ProfessionalService: {
        select: {
          Service: {
            select: { duration: true },
          },
        },
      },
    },
  })

  // Calcular slots ocupados
  const occupiedSlots = appointments.map((appt) => {
    // Si la cita tiene múltiples servicios, tomamos el primero (ajusta si es necesario)
    const duration = appt.ProfessionalService[0]?.Service.duration || 0
    const start = new Date(appt.date)
    const end = new Date(start.getTime() + duration * 60 * 1000)
    return { start, end }
  })

  const results = []
  let slot = now

  while (isBefore(slot, end)) {
    const slotEnd = set(new Date(slot.getTime() + durationMs), {
      seconds: 0,
      milliseconds: 0,
    })

    const conflict = occupiedSlots.find(
      (appt) => slot < appt.end && slotEnd > appt.start
    )

    if (conflict) {
      results.push({
        date: new Date(slot),
        available: false,
        professionalId,
      })
      slot = new Date(conflict.end)
    } else {
      results.push({
        date: new Date(slot),
        available: true,
        professionalId,
      })
      slot = addMinutes(slot, duration)
    }
  }

  return results
}

function roundUpToNextSlot(date: Date, intervalMinutes: number) {
  const ms = date.getTime()
  const intervalMs = intervalMinutes * 60 * 1000
  return new Date(Math.ceil(ms / intervalMs) * intervalMs)
}