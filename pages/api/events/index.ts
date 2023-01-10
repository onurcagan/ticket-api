// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { events } from '../../../mockDatabase/database'
import * as fs from 'fs'
import { Event } from '../../../src/types/apiTypes'
import { sanitize } from '../../../src/helpers/sanitize'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const body = sanitize(req)
    if (!body || !body.name || !body.date || !body.time || !body.location || !body.tickets_available || !body.ticket_price) {
      res
        .status(400)
        .send(
          "Bad request: Invalid request body. allowedKeys = ['name', 'date', 'time', 'location', 'tickets_available', 'ticket_price']",
        )
      return
    }
    const newEvent: Event = {
      id: Date.now(),
      name: body.name!,
      date: body.date!,
      time: body.time!,
      location: body.location!,
      tickets_available: body.tickets_available!,
      ticket_price: body.ticket_price!,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    events.push(newEvent)
    res.status(201).json(newEvent)
    return
  }

  if (req.method === 'GET') {
    res.status(200).json(events)
    return
  }
  res.status(400).send(`Bad request ${req.method} is not a valid call for this route.`)
}
