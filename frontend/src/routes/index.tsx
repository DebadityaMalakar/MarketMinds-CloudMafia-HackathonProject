import { createFileRoute } from '@tanstack/react-router';
import Landing from '@/components/Landing';
import FeaturesHover from '@/components/FeaturesHover';
import PricingOptimizationSection from '@/components/PricingOptimizationSection';
import SubscriptionPricingPage from '@/components/Pricing';
import FAQSection from '@/components/FAQSection';
import Testimonial from '@/components/Testimonial';
import Footer from '@/components/Footer';

export const Route = createFileRoute('/')({
  component: Index,
})

export default function Index() {
  return (
    <div>
      <Landing/>
      <FeaturesHover/>
      <PricingOptimizationSection/>
      <SubscriptionPricingPage/>
      <Testimonial/>
      <FAQSection/>
      <Footer/>
    </div>
  );
}
