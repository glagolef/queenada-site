import { NextResponse } from "next/server";
import { poolExtendedMetadata } from "../../lib/site-config";

export function GET() {
  return NextResponse.json(poolExtendedMetadata);
}
