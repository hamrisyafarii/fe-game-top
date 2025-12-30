import { Clock, Shield, Sparkles, Zap } from "lucide-react";

const Features = () => {
  return (
    <section className="container pb-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Zap, title: "Instant Delivery", desc: "Within seconds" },
          {
            icon: Shield,
            title: "100% Secure",
            desc: "Encrypted payments",
          },
          { icon: Clock, title: "24/7 Support", desc: "Always available" },
          {
            icon: Sparkles,
            title: "Best Prices",
            desc: "Guaranteed lowest",
          },
        ].map((feature, i) => (
          <div
            key={feature.title}
            className="p-4 rounded-xl bg-card/50 border border-border/30 text-center group hover:border-primary/30 hover:bg-card transition-all duration-300"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <feature.icon className="h-6 w-6 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-sm text-foreground">
              {feature.title}
            </h3>
            <p className="text-xs text-muted-foreground">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
