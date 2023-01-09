// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { events } from '../../../mockDatabase/database'
import * as fs from 'fs'
import { Event } from '../../../src/types/apiTypes'
import { sanitize } from '../../../src/helpers/sanitize'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const result = events.find((e) => e.id === Number(id))

  if (!result) {
    res.status(404).send('The server cannot find the requested resource.')
    return
  }
  const index = events.indexOf(result)

  if (req.method === 'GET') {
    res.status(200).json(result)
    return
  }

  if (req.method === 'PATCH') {
    const currentEvent = events[index]
    const patchedEvent: Event = {
      ...currentEvent,
      ...req.body,
      updated_at: new Date().toISOString(),
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
