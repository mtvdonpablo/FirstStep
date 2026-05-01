import { NextResponse } from 'next/server'
import { getUser } from '@/utils/getUser'
// Create a new goal
export async function POST(request) {
  const { supabase, user } = await getUser()
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
    .select() // returns the data row just created into an array
    .single() // unwraps into into an object
    return NextResponse.json({ goal: data, error }, { status: error ? 400 : 201 })
}

// GET all goals for the authenticated user
export async function GET() {
  const { supabase, user } = await getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false }) // order from newest to oldest
  return NextResponse.json({ goals: data, error }, { status: error ? 400 : 200 })
}

// PATCH to update a goal by ID
export async function PATCH(request) {
  const { supabase, user } = await getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { searchParams } = new URL(request.url)
  const goalId = searchParams.get('id')
  if (!goalId) {
    return NextResponse.json({ error: 'Missing goal ID' }, { status: 400 })
  }
  const { name, dueDate, priority } = await request.json()
  if (priority !== undefined && (priority < 1 || priority > 5)) {
    return NextResponse.json({ error: 'Priority must be between 1 and 5' }, { status: 400 })
  }
  const updates = {}
  if (name) updates.name = name
  if (dueDate) updates.due_date = dueDate
  if (priority !== undefined) updates.priority = priority
  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
  }
  const { data, error } = await supabase
    .from('goals')
    .update(updates)
    .eq('id', goalId)
    .eq('user_id', user.id)
    .select()
    .single()
  return NextResponse.json({ goal: data, error }, { status: error ? 400 : 200 })
}

// DELETE a goal by ID
export async function DELETE(request) {
  const { supabase, user } = await getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { searchParams } = new URL(request.url)
  const goalId = searchParams.get('id')
  if (!goalId) {
    return NextResponse.json({ error: 'Missing goal ID' }, { status: 400 })
  }
  const { error } = await supabase
    .from('goals')
    .delete()
    .eq('id', goalId)
    .eq('user_id', user.id)
  return NextResponse.json({ error }, { status: error ? 400 : 200 })
}