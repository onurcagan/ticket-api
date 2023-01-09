// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { events } from '../../../mockDatabase/database'
import * as fs from 'fs'

export type Event = {
  id: number
  name: string
  date: string
  time: string
  location: string
  tickets_available: number
  ticket_price: number
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    if (
      !req.body ||
      !req.body.name ||
      !req.body.date ||
      !req.body.time ||
      !req.body.location ||
      !req.body.tickets_available ||
      !req.body.ticket_price
    ) {
      res.status(400).send('Bad request: Invalid request body')
      return
    }
    const newEvent: Event = {
      id: Date.now(),
      ...req.body,
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
