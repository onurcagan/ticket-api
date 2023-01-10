import { NextApiRequest } from 'next'
import { Event, Pick } from '../types/apiTypes'

export function sanitize(req: NextApiRequest): Partial<Event> | undefined {
  const event = JSON.parse(req.body)
  if (!event || !event.name || !event.date || !event.time || !event.location || !event.tickets_available || !event.ticket_price) {
    return undefined
  }
  const allowedKeys = ['name', 'date', 'time', 'location', 'tickets_available', 'ticket_price']
  const sanitizedEvent = pick(event, allowedKeys)
  return sanitizedEvent
}

function pick<T, F extends keyof T>(object: T, fields: F[]): Pick<T, F> {
  const newObject: Partial<T> = {}
  for (const field of fields) {
    newObject[field] = object[field]
  }
  return newObject as Pick<T, F>
}
