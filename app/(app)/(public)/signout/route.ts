import { createSupabaseForRouteHandler } from "@/lib/supabase.server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await createSupabaseForRouteHandler().auth.signOut();
    return NextResponse.redirect(new URL('/login', request.url));
}