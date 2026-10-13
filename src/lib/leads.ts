export interface Lead {
  name: string
  contact: string
  grade: number
  language: string
  message: string
  page_lang: string
}

const URL = import.meta.env.VITE_SUPABASE_URL as string | undefined
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const backendReady = Boolean(URL && KEY)

/**
 * Sends the enquiry to Supabase (RPC `submit_lead`) once the project is connected.
 * Until then nothing can be delivered: the live site reports a failure and points to the phone
 * (a fake "sent" would lose the parent's enquiry); only the dev server simulates success.
 */
export async function submitLead(lead: Lead): Promise<void> {
  if (!backendReady) {
    await new Promise((r) => setTimeout(r, 500))
    if (import.meta.env.DEV) return
    throw new Error('lead backend is not connected')
  }
  const res = await fetch(`${URL}/rest/v1/rpc/submit_lead`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', apikey: KEY!, Authorization: `Bearer ${KEY}` },
    body: JSON.stringify({ payload: lead }),
  })
  if (!res.ok) throw new Error(`submit_lead ${res.status}`)
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function isValidContact(value: string): boolean {
  const v = value.trim()
  if (EMAIL.test(v)) return true
  const digits = v.replace(/\D/g, '')
  return /^[+\d][\d\s\-()]*$/.test(v) && digits.length >= 9 && digits.length <= 15
}
