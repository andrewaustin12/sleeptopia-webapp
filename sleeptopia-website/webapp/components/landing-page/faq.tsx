import config from "@/config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
// Just import the FAQ & add your FAQ content to the config.js file under the landingPage.faq array
// The FAQ component will automatically generate the FAQ section of your landing page
export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-secondary">
      <div className="container px-4 mx-auto max-w-3xl">
        <Badge 
          className="mb-4 mx-auto block w-fit" 
          variant="outline"
          style={{ 
            borderColor: config.theme.colors.primary,
            color: config.theme.colors.primary,
            backgroundColor: `${config.theme.colors.primary}10`
          }}
        >
          FAQ
        </Badge>
        <h2 className="text-5xl font-bold text-center mb-12">
          Common Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {config.landingPage.faq.map((item, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger className="text-xl">{item.question}</AccordionTrigger>
              <AccordionContent className="text-lg">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
} 