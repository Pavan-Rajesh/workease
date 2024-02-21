import { client } from "@/db";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export async function GET(request) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // console.log(session);
  const { id, email } = session.user;

  /**
   *   here the query should be modified so that we will be getting all the workers that are assigned to head
   *
   */
  const workers =
    await client`select workers from owners_duplicate where userid=${id}`;

  return NextResponse.json({
    workers,
  });
}

export async function POST(request) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // console.log(session);
  const { id, email } = session.user;

  const ownerRatingData = await request.json();
  console.log(ownerRatingData);
  const giveRating =
    await client`select giveRatingToWorker(${ownerRatingData.workerid},${ownerRatingData.rating},${id})`;

  return NextResponse.json({
    ok: "ok",
  });
}