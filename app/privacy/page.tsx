// DRAFT — generated as a starting point, not reviewed by a lawyer. Have
// counsel review before relying on this, especially given real payment
// processing in the Calgary market. Fill in the bracketed placeholders
// (legal business name, contact email, registered address) before publishing.

export const metadata = {
  title: "Privacy Policy — SnackIt",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl font-bold text-espresso">Privacy Policy</h1>
      <p className="mt-2 text-sm text-espresso/50">Last updated: [DATE]</p>

      <div className="prose-none mt-8 space-y-8 text-sm leading-relaxed text-espresso/80">
        <section>
          <p>
            This policy explains what information SnackIt (&ldquo;we&rdquo;, &ldquo;us&rdquo;)
            collects through this website, why, and how it&rsquo;s handled. SnackIt operates in
            Nadiad, Gujarat, India and Calgary, Alberta, Canada.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-espresso">
            Information we collect
          </h2>
          <p className="mt-2">We collect information you give us directly:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong>Waitlist signups:</strong> name, email, phone number (optional), and city
              (optional).
            </li>
            <li>
              <strong>Orders:</strong> name, phone number, email, pickup location, order
              contents, and any special instructions you provide.
            </li>
            <li>
              <strong>Payment (Calgary orders only):</strong> handled entirely by our payment
              processor, Stripe. We never receive or store your card number — Stripe passes us
              only a payment confirmation and a session reference.
            </li>
          </ul>
          <p className="mt-2">
            We also set one cookie (<code>snackit-region</code>) to remember which market
            (Nadiad or Calgary) you&rsquo;re browsing, so pricing and currency display
            correctly. This cookie is functional, not used for advertising or tracking, and
            doesn&rsquo;t require consent under most cookie laws for that reason. We don&rsquo;t
            currently use any analytics or advertising trackers on this site.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-espresso">
            How we use this information
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>To prepare and fulfill your order for pickup.</li>
            <li>To contact you about your order or waitlist signup.</li>
            <li>To let you know when SnackIt opens in your area, if you&rsquo;ve joined the waitlist.</li>
            <li>To understand which markets our visitors are browsing from, so we can plan launches.</li>
          </ul>
          <p className="mt-2">We do not sell your information to third parties.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-espresso">
            Who we share it with
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong>Supabase</strong> — our database provider, which stores order and waitlist
              records.
            </li>
            <li>
              <strong>Stripe</strong> — our payment processor for Calgary orders. Stripe has its
              own privacy policy governing how it handles payment data.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-espresso">Data retention</h2>
          <p className="mt-2">
            We keep order and waitlist records for as long as needed to fulfill orders, respond
            to inquiries, and meet our own business and legal record-keeping needs. [Specify a
            concrete retention period once decided, e.g. &ldquo;orders are retained for 2 years
            for tax purposes.&rdquo;]
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-espresso">Your choices</h2>
          <p className="mt-2">
            To access, correct, or delete the information we hold about you, contact us at
            [CONTACT EMAIL]. Residents of jurisdictions with statutory data rights (e.g. GDPR,
            PIPEDA) may have additional rights — contact us and we&rsquo;ll address your request.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-espresso">Changes</h2>
          <p className="mt-2">
            We may update this policy as SnackIt grows. We&rsquo;ll update the date at the top of
            this page when we do.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-espresso">Contact</h2>
          <p className="mt-2">
            [BUSINESS LEGAL NAME]
            <br />
            [REGISTERED ADDRESS]
            <br />
            [CONTACT EMAIL]
          </p>
        </section>
      </div>
    </div>
  );
}
