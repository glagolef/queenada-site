import Link from "next/link";
import JsonLd from "../../components/json-ld";
import { createWebPageJsonLd } from "../../lib/seo";
import { getPageByKey, getPageMetadata, poolIds } from "../../lib/site-config";

const page = getPageByKey("bestCardanoStakePool");

export const metadata = getPageMetadata("bestCardanoStakePool");

export default function BestCardanoStakePoolPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-stone-100">
      <JsonLd data={createWebPageJsonLd({ title: page.title, description: page.description, path: page.href })} />
      <div className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          How to choose the best Cardano stake pool
        </h1>
        <p className="mt-6 text-lg leading-8 text-stone-300">
          There is no universal best Cardano stake pool for every delegator. The right choice is a pool with
          consistent operations, transparent fees, and clear accountability over time.
        </p>

        <section className="mt-10 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold">What to evaluate before delegating ADA</h2>
          <ul className="space-y-3 text-stone-300">
            <li>Reliable block production and healthy long-term performance.</li>
            <li>Transparent fixed and variable fees, not vague marketing claims.</li>
            <li>Sustainable decentralization commitments, including single-pool alignment.</li>
            <li>Public operator identity and direct communication channels.</li>
            <li>Security discipline including node maintenance and KES rotations.</li>
          </ul>
        </section>

        <section className="mt-8 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold">Why delegators consider QUEEN</h2>
          <p className="text-stone-300">
            QUEEN is independently operated by Phil since the ITN era with a focus on reliability, transparent
            communication, and long-term Cardano decentralization.
          </p>
          <p className="break-all font-mono text-sm text-stone-400">Pool ID: {poolIds.hex}</p>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link className="rounded-2xl bg-violet-100 px-5 py-3 font-medium text-slate-900" href="/delegate">
            Delegate to QUEEN
          </Link>
          <Link className="rounded-2xl border border-white/20 px-5 py-3" href="/performance">
            Review performance
          </Link>
          <Link className="rounded-2xl border border-white/20 px-5 py-3" href="/fees">
            Review fees
          </Link>
        </div>
      </div>
    </main>
  );
}
