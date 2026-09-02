export default function CatalogoLoading() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse px-4 py-10 sm:px-6">
      <div className="h-4 w-32 rounded bg-sage" />
      <div className="mt-4 h-9 w-48 rounded bg-sage" />
      <div className="mt-3 h-4 w-96 max-w-full rounded bg-sage" />

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="h-11 w-full max-w-sm rounded-xl bg-sage" />
        <div className="h-11 w-40 rounded-xl bg-sage" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        <div className="hidden space-y-3 lg:block">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-6 rounded bg-sage" />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="aspect-[3/4] rounded-2xl bg-sage" />
          ))}
        </div>
      </div>
    </div>
  );
}
