import { NextResponse } from "next/server";
import { getUser } from "@/utils/getUser";


export async function POST(request){
  const {supabase,user} = await getUser()
  if (!user){
    return NextResponse.json({error: 'User not found'}, {status: 401})
  }
  const {listId,task} = await request.json()
  if (  (listId === undefined) || (task === undefined)) {
    return NextResponse.json({error: 'Not info info to create a task'}, {status: 400})
  } 
const {data, error} = await supabase
  .from('lists')
  .select('*')
  .eq('list_id',listId)
  .eq('created_by',user.id)
  .single()

  if (!data){
    return NextResponse.json({error: 'Given list id does not exist'}, {status: 404})
  }
  const {data:taskData, error:taskError} = await supabase
  .from('tasks')
  .insert({
    task,
    list_id:listId,
  })
  .select()
  .single()
    return NextResponse.json({ task: taskData, taskError }, { status: taskError ? 400 : 201 })  
}

// get tasks for a user based on list id
export async function GET(request){
  const {supabase,user} = await getUser()
  if (!user){
    return NextResponse.json({error: 'User not found'}, {status: 401})
  }
  
  const {searchParams} = new URL(request.url)
  const listId = searchParams.get('id')
  if (listId === undefined){
    return NextResponse.json({error: 'list id undefined'},{status: 404})
  }


  const {data,error} = await supabase
    .from('lists')
    .select('*')
    .eq('list_id',listId)
    .eq('created_by',user.id)
    .single()
  if (!data){
    return NextResponse.json({error: 'Given list id does not exist'}, {status: 404})
  }
  const {data:taskData, error:taskError} = await supabase
  .from('tasks')
  .select('*')
  .eq('list_id',listId)

  return NextResponse.json({tasks:taskData,taskError},{status: taskError ? 400:200})
}