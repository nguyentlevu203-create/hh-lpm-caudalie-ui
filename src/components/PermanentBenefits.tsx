import { Award, Gift, Sparkles, Truck } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Free delivery",
    subtitle: "over €39*",
  },
  {
    icon: Award,
    title: "MYCAUDALIE loyalty program",
    subtitle: "100 points = 1 gift",
  },
  {
    icon: Gift,
    title: "A FREE travel-size product of your choice",
    subtitle: "when you spend €49",
  },
  {
    icon: Sparkles,
    title: "Exclusive offers",
    subtitle: "all year round",
  },
];

export function PermanentBenefits() {
  return (
    <section className="bg-primary text-[#f4f3f1] py-16 px-4">
      <h2 className="text-xl font-normal text-center">
        Your permanent benefits
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {benefits.map(({ icon: Icon, title, subtitle }) => (
          <div
            key={title}
            className="flex flex-col items-center text-center gap-2"
          >
            <Icon size={40} className="text-white" strokeWidth={1.5} />
            <p className="font-medium">{title}</p>
            <p className="text-sm text-[#f4f3f1]/70">{subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PermanentBenefits;
