import { NextResponse } from "next/server";
import { legacyQmetaExtendedMetadata } from "../../lib/site-config";

export function GET() {
  return NextResponse.json(legacyQmetaExtendedMetadata);
}
