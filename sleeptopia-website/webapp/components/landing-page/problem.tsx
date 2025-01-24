import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import config from "@/config";

export default function Problem() {
  const { problem } = config.landingPage;
  const APP_STORE_URL = 'https://apps.apple.com/us/app/sleep-apnea-snore-exercises/id6572302789';

  return (
    <section id="problem" className="py-8 sm:py-12 bg-secondary/95">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="text-center mb-6 sm:mb-8">
          <Badge 
            className="mb-4 text-sm sm:text-base" 
            variant="secondary" 
            style={{ 
              backgroundColor: problem.badgeColor, 
              color: problem.badgeTextColor 
            }}
          >
            {problem.badge}
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-3 sm:mb-4 px-2">
            {problem.title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground px-2">
            {problem.description}
          </p>
        </div>

        <Card className="border-2 border-border bg-card/50">
          <CardContent className="pt-4 px-3 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {problem.problems.map((problem, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 p-3 sm:p-4 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <ExclamationTriangleIcon 
                    className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" 
                    style={{ color: config.theme.colors[problem.color as keyof typeof config.theme.colors] }} 
                  />
                  <div className="flex flex-col">
                    <span 
                      className="font-semibold text-lg sm:text-xl" 
                      style={{ color: config.theme.colors[problem.color as keyof typeof config.theme.colors] }}
                    >
                      {problem.value}
                    </span>
                    <span className="text-sm sm:text-base text-muted-foreground">{problem.metric}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 mt-4 border-t border-border text-center">
              <span 
                className="font-semibold text-3xl sm:text-4xl" 
                style={{ color: config.theme.colors[problem.badgeTextColor as keyof typeof config.theme.colors] }}
              >
                {problem.summaryValue}
              </span>
              <p className="text-sm sm:text-base text-muted-foreground mt-2 px-2">{problem.summary}</p>
            </div>
          </CardContent>
        </Card>
        <div className="text-center mt-6">
          <p className="text-base sm:text-lg text-muted-foreground mb-3">There&apos;s a better way</p>
          <button 
            onClick={() => window.open(APP_STORE_URL, '_blank')}
            className="text-white font-semibold px-8 py-3 rounded-md flex items-center gap-2 mx-auto hover:opacity-90 transition-opacity" 
            style={{ backgroundColor: config.theme.colors.primary }}
          >
            <svg 
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
            </svg>
            Download on the App Store
          </button>
        </div>
      </div>
    </section>
  );
}