import Carousel from "../components/Carousel";
import { testimonials } from "../data/content";

export default function Testimonials() {
  return (
    <section className="bg-[#111314] py-16 text-white sm:py-28">
      <div className="w-full px-[10px]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-400">
            Real stories
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-black leading-tight sm:text-5xl">
            Transformative Testimonials from Senior Masters
          </h2>
        </div>

        <Carousel
          label="testimonials"
          theme="dark"
          className="mt-10"
          itemClassName="w-[84%] min-[560px]:w-[46%] lg:w-[calc((100%-20px)/3)]"
        >
          {testimonials.map((item) => (
            <article
              key={item.title}
              className="flex h-full flex-col overflow-hidden rounded-2xl bg-white text-black"
            >
              <img
                src={`/assets/${item.image}`}
                alt=""
                loading="lazy"
                decoding="async"
                draggable="false"
                className="aspect-[3/2] w-full object-cover object-[50%_25%]"
              />
              <div className="flex-1 p-5 sm:p-6">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-600">
                  {item.title}
                </p>
                <p className="mt-3 text-lg font-bold leading-snug lg:text-xl">{item.copy}</p>
              </div>
            </article>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
