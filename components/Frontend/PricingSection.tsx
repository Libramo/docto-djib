"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";

const plans = [
  {
    name: "free",
    price: 0,
    description:
      "Get 20 AI-generated portraits with 2 unique styles and filters.",
    features: [
      "Manage up to 50 appointments per month",
      "Basic patient record management",
      "Email notifications for appointments",
    ],
    buttonText: "Get 20 portraits in 5 hours",
    link: "/register?role=DOCTOR&plan=free",
  },
  {
    name: "Advanced",
    price: 29,
    isRecommended: true,
    description:
      "Get 50 AI-generated portraits with 5 unique styles and filters.",
    features: [
      "3 hours turnaround time",
      "50 AI portraits",
      "Choice of 5 styles",
      "Choice of 5 filters",
      "5 retouch credits",
    ],
    buttonText: "Get 50 portraits in 3 hours",
    isPopular: true,
    link: "/register?role=DOCTOR&plan=advanced",
  },
  {
    name: "Premium",
    price: 49,
    description:
      "Get 100 AI-generated portraits with 10 unique styles and filters.",
    features: [
      "1-hour turnaround time",
      "100 AI portraits",
      "Choice of 10 styles",
      "Choice of 10 filters",
      "10 retouch credits",
    ],
    buttonText: "Get 100 portraits in 1 hour",
    link: "/register?role=DOCTOR&plan=premium",
  },
];

const PricingSection = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-6">
      <h1 className="text-5xl font-bold text-center tracking-tight">Pricing</h1>
      <div className="mt-12 max-w-screen-lg mx-auto grid grid-cols-1 lg:grid-cols-3 items-center gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn("relative border rounded-lg p-6", {
              "border-[2px] border-primary py-10": plan.isPopular,
            })}
          >
            {plan.isPopular && (
              <Badge className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2">
                Most Popular
              </Badge>
            )}
            <h3 className="text-lg font-medium">{plan.name}</h3>
            <p className="mt-2 text-4xl font-bold">${plan.price}</p>
            <p className="mt-4 font-medium text-muted-foreground">
              {plan.description}
            </p>
            <Separator className="my-4" />
            <ul className="space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <CircleCheck className="h-4 w-4 mt-1 text-green-600" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              variant={plan.isPopular ? "default" : "outline"}
              size="lg"
              className="w-full mt-6"
              onClick={() => router.push(plan.link as string)}
            >
              {plan.buttonText}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingSection;
