import Image from 'next/image';
import Link from 'next/link';

interface AppPromotionProps {
  title?: string;
  description?: string;
}

export default function AppPromotion({ 
  title = "Download the Sleeptopia App",
  description = "Track your sleep, follow guided exercises, and join a community of people improving their sleep quality."
}: AppPromotionProps) {
  return (
    <div className="mt-16 mb-8">
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-2xl mx-auto">
          <div className="md:order-2 shrink-0">
            <div className="w-[120px] h-[120px] relative shadow-lg rounded-[28px] overflow-hidden">
              <Image
                src="/SleeptopiaAppIcon.ico"
                alt="Sleeptopia App Icon"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="flex-1 md:order-1 text-center md:text-left space-y-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">{title}</h3>
              <p className="text-muted-foreground text-lg">
                {description}
              </p>
            </div>
            <Link
              href="https://apps.apple.com/us/app/sleep-apnea-snore-exercises/id6572302789"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-90 transition-opacity"
            >
              <Image
                src="/appstorebadge.png"
                alt="Download on the App Store"
                width={180}
                height={60}
                className="h-[44px] w-auto"
                style={{ objectFit: 'contain' }}
                priority
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 