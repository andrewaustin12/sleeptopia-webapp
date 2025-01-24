import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/footer";

const PrivacyPolicy = () => {
  return (
    <>
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8">
          <Button asChild variant="secondary" size="lg">
            <Link href="/" className="gap-2">
              <ArrowLeft size={16} />
              Back
            </Link>
          </Button>
        </div>

        <h1 className="text-3xl font-extrabold pb-6">
          Privacy Policy for Sleeptopia
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Privacy Policy
Effective Date: ${new Date().toLocaleDateString()}

Welcome to Sleeptopia! We prioritize your privacy by operating as a completely data-free application.

1. No Data Collection
We are committed to your privacy and want to be clear: Sleeptopia does not collect, store, or process any personal data. All sleep tracking and calculations are performed locally on your device.

2. How Sleeptopia Works
- All sleep calculations and tracking are done directly on your device
- No information is sent to external servers
- No user accounts are required
- No cookies are used
- No analytics are collected

3. Your Privacy Benefits
- Complete data privacy: your sleep information stays on your device
- No risk of data breaches: we can't lose what we don't collect
- No tracking: your usage of the app is completely private
- No advertisements: we don't collect or share data for advertising

4. Third-Party Services
We do not integrate with any third-party services that would collect your data.

5. Children's Privacy
Our application is safe for users of all ages as we do not collect any personal information from anyone, including children under 13.

6. Future Updates
If our data collection practices ever change, we will update this policy and notify users through the application.

7. Contact Us
If you have any questions about our privacy practices, please contact us at:
Email: privacy@sleeptopia.com

Thank you for choosing Sleeptopia - where your privacy comes first!`}
        </pre>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
