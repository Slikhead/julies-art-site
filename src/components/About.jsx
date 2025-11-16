export default function About() {
  return (
    <section id="about" className="bg-white py-16 px-6 text-center max-w-4xl mx-auto">
      <h3 className="text-3xl font-bold mb-6">About Julie</h3>
      <div className="md:flex md:items-center md:gap-8 text-left">
        <img
          src="https://picsum.photos/seed/julieportrait/400/400"
          alt="Portrait of Julie - artist at work"
          className="w-48 h-48 object-cover rounded-full mx-auto md:mx-0 mb-6 md:mb-0 shadow-md"
        />
        <p className="text-lg text-gray-700 leading-relaxed">
          Julie is a painter based in New Zealand, working mainly in oil and acrylic. Her art explores colour, texture, and emotion — from expressive landscapes to intimate portraits and playful abstracts.
          <br /><br />
          Alongside her painting, she crafts quirky handmade earrings and small wearable artworks that share the same sense of creativity and individuality.
          <br /><br />
          Each piece reflects her love for curiosity, warmth, and the stories found in everyday moments.
        </p>
      </div>
    </section>
  );
}
