import { Users, Briefcase, DollarSign, Clock, ShieldCheck } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Users className="w-12 h-12 text-blue-500" />,
      title: "Diverse Talent Pool",
      description:
        "Connect with skilled professionals across multiple industries. Whether you need developers, designers, or marketers, our platform brings the right talent to your project."
    },
    {
      icon: <Briefcase className="w-12 h-12 text-blue-500" />,
      title: "Smart Task Posting",
      description:
        "Post tasks with clear requirements, set deadlines, and budgets. Our system ensures your tasks reach the most relevant freelancers quickly."
    },
    {
      icon: <DollarSign className="w-12 h-12 text-blue-500" />,
      title: "Fair Bidding System",
      description:
        "Freelancers bid competitively while you maintain full control over selection. Choose the best offer based on skills, budget, and reviews."
    },
    {
      icon: <Clock className="w-12 h-12 text-blue-500" />,
      title: "Time-Saving Workflow",
      description:
        "Our streamlined dashboard keeps everything in one place — bids, deadlines, and progress tracking — so you can focus on results, not management hassle."
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-blue-500" />,
      title: "Secure & Transparent",
      description:
        "Payments, contracts, and communication are all managed securely within the platform, giving both freelancers and employers peace of mind."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-8xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Why Choose Us?</h2>
        <div className="w-full flex justify-center flex-wrap gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col  basis-1/4 items-center text-center">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
