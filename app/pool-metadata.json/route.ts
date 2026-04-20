import { NextResponse } from "next/server";
import { poolMetadata } from "../../lib/site-config";

export function GET() {
  return NextResponse.json(poolMetadata);
}
