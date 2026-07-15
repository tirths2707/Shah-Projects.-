export default function Footer() {
  return (
    <footer className="border-t border-espresso/10 bg-espresso text-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display flex items-center gap-1.5 text-lg font-bold">
            <span>🥪</span> SnackIt
          </p>
          <p className="mt-1 text-sm text-cream/60">
            Craving something real? That&rsquo;s SnackIt.
          </p>
        </div>
        <div className="text-sm text-cream/60">
          <p>Nadiad, Gujarat, India</p>
          <p className="mt-1">&copy; {new Date().getFullYear()} SnackIt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
