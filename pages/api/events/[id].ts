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
  const { id } = req.query
  const result = events.find((e) => e.id === Number(id))

  if (!result) {
    res.status(404).send('The server cannot find the requested resource.')
    return
  }
  const index = events.indexOf(result)

  const resultIndex = events.indexOf(result)
  console.log(resultIndex)

  if (req.method === 'GET') {
    res.status(200).json(result)
    return
  }

  if (req.method === 'PATCH') {
    const patchedEvent: Event = {
      id: events[index].id,
      ...req.body,
    }
    events[index] = patchedEvent
    res.status(201).json(patchedEvent)
    return
  }

  if (req.method === 'DELETE') {
    events.splice(index, 1)
    res.status(200).send('Resource deleted successfully.')
    return
  }
  res.status(400).send(`Bad request ${req.method} is not a valid call for this route.`)
}
