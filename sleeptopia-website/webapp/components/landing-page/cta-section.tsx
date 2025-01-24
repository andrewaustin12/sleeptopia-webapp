import config from '@/config';

export default function CTA() {
  return (
    <section className={`bg-[${config.theme.colors.secondary}] py-24`}>
      <div className="container px-4 mx-auto max-w-4xl text-center">
        <h2 className="text-6xl font-bold mb-6">
          Ready To Sleep Better Tonight?
        </h2>
        <p className="text-gray-400 text-xl mb-8">
          Join thousands of people whove improved their sleep quality with our proven methods and expert guidance.
        </p>
        <button 
          onClick={() => window.open('https://apps.apple.com/us/app/sleep-apnea-snore-exercises/id6572302789', '_blank')}
          className={`text-gray font-semibold px-8 py-3 rounded-md flex items-center gap-2 mx-auto hover:opacity-90`} 
          style={{ backgroundColor: config.theme.colors.primary }}
        >
          <svg 
            viewBox="0 0 24 24"
            fill="white"
            className="w-5 h-5"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Start Your Sleep Journey
        </button>
      </div>
    </section>
  );
}