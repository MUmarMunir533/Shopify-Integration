import { NextResponse } from "next/server";

export async function GET() {
  const shopifyDomainName = process.env.SHOPIFY_DOMAIN_NAME;
  if (!shopifyDomainName) {
    return NextResponse.json(
      { error: "Missing SHOPIFY_DOMAIN_NAME" },
      { status: 500 }
    );
  }
  const shopifyStoreUrl = `https://${shopifyDomainName}`;
  return NextResponse.json({ shopifyStoreUrl });
}
