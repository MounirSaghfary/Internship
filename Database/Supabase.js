import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://nvtmsgjzwyygnsqmbuqb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52dG1zZ2p6d3l5Z25zcW1idXFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU2MjQyMzgsImV4cCI6MjAwMTIwMDIzOH0.EriwcDiXNtXtsWrho-9Qo80DD3_TwNcgVnzWphVRyVs')