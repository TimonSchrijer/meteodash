import { NextResponse } from 'next/server'

let cachedData: any = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes in ms

export async function GET() {
  const now = Date.now()
  if (cachedData && now - cacheTimestamp < CACHE_DURATION) {
    return NextResponse.json(cachedData)
  }

  try {
    const res = await fetch('https://forecast-staging.buienradar.nl/3.0/beach')
    if (!res.ok) throw new Error('Failed to fetch')
    const data = await res.json()
    cachedData = data
    cacheTimestamp = now
    return NextResponse.json(data)
  } catch (e) {
    if (cachedData) {
      // Return old cache with a warning
      return NextResponse.json({ ...cachedData, warning: 'Stale cache: failed to refresh data.' })
    }
    return NextResponse.json({ error: 'Failed to fetch data and no cache available' }, { status: 500 })
  }
} 