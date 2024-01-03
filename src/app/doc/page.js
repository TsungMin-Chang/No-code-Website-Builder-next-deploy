import ReactSwagger from '@/app/doc/swagger';

export default async function IndexPage() {
  return (
    <section className="container">
      <ReactSwagger />
    </section>
  );
}