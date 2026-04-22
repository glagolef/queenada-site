import Link from "next/link";
import JsonLd from "../../components/json-ld";
import { createWebPageJsonLd, stakeHowToJsonLd } from "../../lib/seo";
import { getPageByKey, getPageMetadata, poolIds } from "../../lib/site-config";

const page = getPageByKey("howToStakeAda");

export const metadata = getPageMetadata("howToStakeAda");

export default function HowToStakeAdaPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-stone-100">
      <JsonLd
        data={[createWebPageJsonLd({ title: page.title, description: page.description, path: page.href }), stakeHowToJsonLd]}
      />
      <div className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">How to stake ADA safely</h1>
        <p className="mt-6 text-lg leading-8 text-stone-300">
          Staking ADA with a Cardano stake pool takes only a few steps and remains non-custodial. Your ADA stays in
          your wallet at all times.
        </p>

        <ol className="mt-10 space-y-4">
          <li className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold">1. Open staking in your wallet</h2>
            <p className="mt-2 text-stone-300">Use Vespr, Lace, Eternl, or your preferred Cardano wallet.</p>
          </li>
          <li className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold">2. Search for QUEEN</h2>
            <p className="mt-2 text-stone-300">Find ticker QUEEN or verify the pool ID directly to avoid impersonation.</p>
            <p className="mt-2 break-all font-mono text-sm text-stone-400">{poolIds.hex}</p>
          </li>
          <li className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold">3. Confirm staking delegation</h2>
            <p className="mt-2 text-stone-300">Approve delegation in your wallet and wait for epochs to progress.</p>
          </li>
          <li className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold">4. Keep your wallet secure</h2>
            <p className="mt-2 text-stone-300">
              Never share seed phrases or private keys. No legitimate operator will ask for them.
            </p>
          </li>
        </ol>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link className="rounded-2xl bg-violet-100 px-5 py-3 font-medium text-slate-900" href="/delegate">
            Open full delegation guide
          </Link>
          <Link className="rounded-2xl border border-white/20 px-5 py-3" href="/contact">
            Contact and security
          </Link>
        </div>
      </div>
    </main>
  );
}
