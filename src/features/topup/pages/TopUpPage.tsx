import { Header } from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import type { PaymentMethods, Products, TopUp } from "@/types/TopUp";
import { ArrowLeft, Info, MapPin, ShoppingCart, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiamondOption } from "../components/DiamondOptions";
import { toast } from "sonner";
import { PaymentMethod } from "../components/PaymentMethods";
import { formatPrice } from "@/lib/toRupiah";
import { ConfirmationModal } from "../components/ConfirmationModal";

const TopUpPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const navigate = useNavigate();

  const [game, setGame] = useState<TopUp | null>(null);
  const [userId, setUserId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [selectedPackage, setSelectedPackage] = useState<Products | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethods | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleOrder = () => {
    if (!userId.trim()) {
      toast.error("Please enter your User ID");
      return;
    }
    if (!selectedPackage) {
      toast.error("Please select a package");
      return;
    }
    if (!selectedPayment) {
      toast.error("Please select a payment method");
      return;
    }
    setShowConfirmation(true);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const { data } = await axiosInstance.get(`/api/v1/products/${slug}`);

        setGame(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [slug]);

  const eWallets = game?.payment_methods.filter((p) => p.type === "ewallet");
  const virtualAccounts = game?.payment_methods.filter(
    (va) => va.type === "va"
  );

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        Laoding...
      </div>
    );

  if (!game)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-gaming text-2xl text-foreground">
            Game not found
          </h1>
          <Button variant="outline" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="container pt-6">
          <Button
            variant="default"
            onClick={() => navigate("/")}
            className="gap-2 bg-background hover:bg-background text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Games
          </Button>
        </div>

        {/* Game Header */}
        <section className="container py-8">
          <div className="flex items-center gap-6">
            <img
              src={game.image}
              alt={game.name}
              className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border border-border/50"
            />
            <div>
              <h1 className="font-gaming text-2xl md:text-3xl font-bold text-foreground mt-2">
                {game.name}
              </h1>
              <p className="text-muted-foreground">{game.publisher}</p>
            </div>
          </div>
        </section>

        <div className="container pb-24 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: User Info */}
            <div className="p-6 rounded-2xl glass-card bg-primary/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center glow-primary">
                  <span className="font-gaming text-sm text-foreground">1</span>
                </div>
                <h2 className="font-gaming text-lg text-foreground">
                  Enter Account Details
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <User className="h-4 w-4" />
                    User ID
                  </label>
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter your User ID"
                    className="w-full h-12 px-4 glass border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:glow-primary transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    Zone ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={zoneId}
                    onChange={(e) => setZoneId(e.target.value)}
                    placeholder="Enter your Zone ID"
                    className="w-full h-12 px-4 glass border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:glow-primary transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 p-3 rounded-xl bg-primary/5 border border-primary/20">
                <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  Find your User ID in game settings. Make sure to enter the
                  correct ID as we cannot process refunds for incorrect IDs.
                </p>
              </div>
            </div>
            {/* Step 2: Diamond */}
            <div className="p-6 rounded-2xl glass-card bg-primary/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center glow-primary">
                  <span className="text-sm text-foreground">2</span>
                </div>
                <h2 className="font-gaming text-lg text-foreground">
                  Select {game.currency}
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {game.products.map((pkg) => (
                  <DiamondOption
                    key={pkg.slug}
                    currency={game.currency}
                    package_={pkg}
                    selected={selectedPackage?.slug === pkg.slug}
                    onClick={() => setSelectedPackage(pkg)}
                  />
                ))}
              </div>
            </div>
            {/* Step 3: Payment Method */}
            <div className="p-6 rounded-2xl glass-card bg-primary/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center glow-primary">
                  <span className="text-sm text-foreground">3</span>
                </div>
                <h2 className="font-gaming text-lg text-foreground">
                  Select Payment Method
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    E-Wallets
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {eWallets?.map((method) => (
                      <PaymentMethod
                        key={method.slug}
                        method={method}
                        selected={selectedPayment?.slug === method.slug}
                        onClick={() => setSelectedPayment(method)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    Virtual Account
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {virtualAccounts?.map((method) => (
                      <PaymentMethod
                        key={method.slug}
                        method={method}
                        selected={selectedPayment?.slug === method.slug}
                        onClick={() => setSelectedPayment(method)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky bg-primary/5 top-24 p-6 rounded-2xl glass-premium space-y-6">
              <h3 className="font-gaming text-lg text-foreground flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                Order Summary
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Game</span>
                  <span className="text-foreground font-medium">
                    {game.name}
                  </span>
                </div>

                {userId && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">User ID</span>
                    <span className="text-foreground font-mono">{userId}</span>
                  </div>
                )}

                {selectedPackage && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {game.currency}
                      </span>
                      <span className="text-foreground font-gaming">
                        {selectedPackage.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="pt-4 border-t border-border/30">
                      <div className="flex justify-between">
                        <span className="font-medium text-foreground">
                          Total
                        </span>
                        <span className="font-gaming text-xl text-gradient">
                          {formatPrice(selectedPackage.price)}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <Button
                variant="default"
                size="default"
                className="w-full"
                onClick={handleOrder}
                disabled={!userId || !selectedPackage || !selectedPayment}
              >
                Order Now
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By ordering, you agree to our Terms of Service
              </p>
            </div>
          </div>
        </div>
      </main>

      <ConfirmationModal
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        gameName={game.name}
        currency={game.currency}
        userId={userId}
        zoneId={zoneId}
        selectedPackage={selectedPackage}
        selectedPayment={selectedPayment}
      />
    </div>
  );
};

export default TopUpPage;
