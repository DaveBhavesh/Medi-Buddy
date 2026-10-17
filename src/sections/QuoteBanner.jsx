/** Banner quote (reference: photo on the left, big quote on the right). */
export default function QuoteBanner() {
  return (
    <section className="bg-white py-4 sm:py-8">
      <div className="w-full px-[10px]">
        <figure className="relative isolate overflow-hidden rounded-[1.5rem] bg-[#5a3a12] sm:rounded-[2.25rem]">
          <img
            src="/assets/img-026.jpg"
            alt="Paramahansa Yogananda"
            width="1879"
            height="1080"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-[20%_30%]"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-black/35 to-black/70 max-md:bg-black/55" />
          <div className="grid min-h-[22rem] items-center px-6 py-12 sm:px-10 md:min-h-[26rem] md:grid-cols-2 lg:min-h-[30rem]">
            <span className="hidden md:block" aria-hidden="true" />
            <blockquote>
              <p className="text-[clamp(1.5rem,3.2vw,3.25rem)] font-black leading-[1.1] tracking-[-0.03em] text-white">
                <span className="text-amber-300">
                  &ldquo;Live quietly in the moment and see the beauty of all before you.
                </span>{" "}
                The future will take care of itself.&rdquo;
              </p>
              <figcaption className="mt-6 text-right font-serif text-xl italic text-white/90 sm:text-2xl">
                &mdash; Paramahansa Yogananda
              </figcaption>
            </blockquote>
          </div>
        </figure>
      </div>
    </section>
  );
}
