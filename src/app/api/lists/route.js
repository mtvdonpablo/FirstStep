import { NextResponse } from "next/server";
import { getUser } from "@/utils/getUser";

// create a new list
export async function POST(){
  const {supabase,user} = await getUser()
  if (!user){
    return NextResponse.json({error: 'Unauthorized'}, {status: 401})
  }
  const {data,error} = await supabase
  .from('lists')
  .insert({
    created_by: user.id
  })
  .select()
  .single()
  return NextResponse.json({list:data,error}, {status: error ? 400:201})
}
// get all lists for a user
export async function GET(request){
  const {supabase,user} = await getUser()
  if (!user){
    return NextResponse.json({error: 'Unauthorized'}, {status: 401})
  }
  const {data,error} = await supabase
  .from('lists')
  .select('*')
  .eq('created_by',user.id)
  .order('created_at', { ascending: false }) 
  return NextResponse.json({lists:data,error}, {status: error ? 400:200})
}


// delete a list- remove the tasks as well as the list
export async function DELETE(request) {
  const {supabase,user} = await getUser()
  if (!user){
    return NextResponse.json({error: 'Unauthorized'},{status: 401})
  }
  const {searchParams} = new URL(request.url)
  const listId = searchParams.get('id')
  if (!listId){
    return NextResponse.json({error: 'Missing list id'},{status:400})
  }
  const {error} = await supabase
  .from('lists')
  .delete()
  .eq('list_id',listId)
  .eq('created_by',user.id)
  return NextResponse.json({error},{status: error ?400: 200})
}
