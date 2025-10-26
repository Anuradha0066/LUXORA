import { BookForm, HeroSlider, Rooms, ScrollToTop } from '../components';

const Home = () => {

  return (
    <div>
      <ScrollToTop />

      <HeroSlider />

      <div className='container mx-auto relative'>

        <div className='bg-accent/20 mt-4 p-4 lg:absolute lg:left-0 lg:right-0 lg:p-0 lg:-top-12 lg:z-30 lg:shadow-xl'>
          <BookForm />
        </div>

      </div>

      <section id="rooms" className="rooms-section">
        <Rooms />
      </section>

      <section id="contact" className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 md:px-0">
          <h2 className="text-3xl font-bold mb-4 text-center">Contact Us</h2>
          <p className="text-center text-gray-600 mb-8">Have questions? Reach out and we'll get back to you shortly.</p>

          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
            <form onSubmit={(e) => { e.preventDefault(); alert('Message sent (mock)'); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required name="name" type="text" placeholder="Your name" className="border p-3 rounded w-full" />
                <input required name="email" type="email" placeholder="Your email" className="border p-3 rounded w-full" />
              </div>
              <textarea required name="message" rows={5} placeholder="Your message" className="border p-3 rounded w-full mt-4" />
              <div className="text-right mt-4">
                <button type="submit" className="bg-primary text-white px-6 py-2 rounded">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
