import AuthorCard from "../components/AuthorCard";
import Carousel from "../components/Carousel";
import { authors } from "../data/authors";

export default function Authors() {
  return (
    <section id="authors" className="panel panel-light py-16 sm:py-24" aria-labelledby="authors-heading">
      <div className="panel-inner w-full">
        <p className="eyebrow text-amber-500">Recommended reading</p>
        <h2
          id="authors-heading"
          className="section-title mt-3"
        >
          Must-read authors &amp; books
        </h2>

        <Carousel
          label="authors"
          className="mt-8 sm:mt-10"
          itemClassName="w-[80%] min-[520px]:w-[calc((100%-10px)/2)] md:w-[calc((100%-20px)/3)] lg:w-[calc((100%-30px)/4)] xl:w-[calc((100%-40px)/5)]"
        >
          {authors.map((author, index) => (
            <AuthorCard key={author.slug} author={author} tone={index} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
