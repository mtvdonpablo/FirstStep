import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// Create a new goal
export async function POST(request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { name, dueDate,priority } = await request.json()
  if (!name || !dueDate || priority === undefined || (priority < 1 || priority > 5)) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  const { data, error } = await supabase
    .from('goals')
    .insert({
      name,
      due_date: dueDate,
      priority,
      user_id: user.id,
    })
    .select()
    .single()
    return NextResponse.json({ goal: data, error }, { status: error ? 400 : 201 })
}