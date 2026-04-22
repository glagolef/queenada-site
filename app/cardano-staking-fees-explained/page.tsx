import Link from "next/link";
import JsonLd from "../../components/json-ld";
import { createWebPageJsonLd } from "../../lib/seo";
import { getPageByKey, getPageMetadata } from "../../lib/site-config";

const page = getPageByKey("cardanoStakingFeesExplained");

export const metadata = getPageMetadata("cardanoStakingFeesExplained");

export default function CardanoStakingFeesExplainedPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-stone-100">
      <JsonLd data={createWebPageJsonLd({ title: page.title, description: page.description, path: page.href })} />
      <div className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Cardano staking fees explained</h1>
        <p className="mt-6 text-lg leading-8 text-stone-300">
          Cardano stake pool fees usually include a fixed fee and a variable fee. Understanding both helps delegators
          compare pools more accurately.
        </p>

        <section className="mt-10 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold">Fixed fee</h2>
          <p className="text-stone-300">
            The fixed fee is deducted from epoch rewards before the remaining rewards are distributed. This is why the
            effective fee can appear higher when total epoch rewards are smaller.
          </p>
        </section>

        <section className="mt-6 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold">Variable fee (margin)</h2>
          <p className="text-stone-300">
            The variable fee is a percentage applied to remaining rewards after the fixed fee. Comparing this percentage
            alone is not enough; delegators should consider both fixed and variable components.
          </p>
        </section>

        <section className="mt-6 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold">How to compare pools fairly</h2>
          <ul className="space-y-3 text-stone-300">
            <li>Look at long-term reliability and not only one epoch.</li>
            <li>Check fee transparency and communication quality.</li>
            <li>Review decentralization alignment and operator accountability.</li>
          </ul>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link className="rounded-2xl bg-violet-100 px-5 py-3 font-medium text-slate-900" href="/fees">
            See QUEEN fees
          </Link>
          <Link className="rounded-2xl border border-white/20 px-5 py-3" href="/performance">
            See QUEEN performance
          </Link>
        </div>
      </div>
    </main>
  );
}
