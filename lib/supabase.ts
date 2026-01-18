import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL_SECOND!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_SECOND!

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
