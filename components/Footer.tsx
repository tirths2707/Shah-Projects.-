export default function Footer() {
  return (
    <footer className="border-t-2 border-outline bg-cocoa-light text-parchment">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-extrabold uppercase">SnackIt</p>
          <p className="mt-1 text-sm text-parchment/60">
            Craving something real? That&rsquo;s SnackIt.
          </p>
        </div>
        <div className="font-label text-xs uppercase tracking-wide text-parchment/60">
          <p>Nadiad, Gujarat, India</p>
          <p className="mt-1">&copy; {new Date().getFullYear()} SnackIt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
