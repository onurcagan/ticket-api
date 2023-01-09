import { NextApiRequest } from 'next'
import { Event, Pick } from '../types/apiTypes'

export function sanitize(req: NextApiRequest): Partial<Event> {
  if (
    !req.body ||
    !req.body.name ||
    !req.body.date ||
    !req.body.time ||
    !req.body.location ||
    !req.body.tickets_available ||
    !req.body.ticket_price
  ) {
    throw new Error('Bad request: Invalid request body')
  }
  const event = req.body
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
