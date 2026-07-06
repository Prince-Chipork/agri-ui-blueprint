import { useParams, Link } from "react-router-dom";
import { mockProducts } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Heart, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  ArrowLeft,
  Award,
  Truck,
  Package,
  Star,
  ChevronRight,
  Verified
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const trustLevelColors = {
  Platinum: "bg-blue-600",
  Gold: "bg-yellow-600",
  Silver: "bg-slate-400",
  Bronze: "bg-orange-700",
};

export default function ProductDetailsPage() {
  const { id } = useParams();
  const product = mockProducts.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Button asChild className="mt-4"><Link to="/products">Back to Marketplace</Link></Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        image: product.images[0] 
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Link to="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden border bg-muted relative">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            {product.farmerVerified && (
              <Badge className="absolute top-4 right-4 bg-green-600 text-white gap-1 px-3 py-1 text-sm shadow-lg">
                <Verified className="h-4 w-4" /> Verified Farmer
              </Badge>
            )}
            <Badge className={`absolute top-4 left-4 ${trustLevelColors[product.farmerTrustLevel]} text-white gap-1 px-3 py-1 text-sm shadow-lg`}>
              <Award className="h-4 w-4" /> FarmLink {product.farmerTrustLevel}
            </Badge>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <div key={i} className="aspect-square rounded-lg overflow-hidden border cursor-pointer hover:opacity-80 transition-opacity">
                <img src={img} alt={`${product.name} ${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col h-full">
          <div className="space-y-2">
            <Badge variant="outline" className="text-primary border-primary">{product.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center text-amber-500 font-semibold">
                    <Star className="h-4 w-4 fill-current mr-1" /> 4.9 (24 Reviews)
                </div>
                <div className="text-muted-foreground">|</div>
                <div className="flex items-center text-green-600 font-medium">
                    <ShieldCheck className="h-4 w-4 mr-1" /> FarmLink Trust Protected
                </div>
            </div>
          </div>

          <div className="mt-8 mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary">₦{product.price.toLocaleString()}</span>
              <span className="text-xl text-muted-foreground">/ {product.unit}</span>
            </div>
            <p className="text-sm text-green-600 font-medium mt-1">In Stock: {product.quantity} {product.unit}s available</p>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-8">
            {product.description}
          </p>

          <Card className="bg-muted/30 border-none mb-8">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="font-semibold">Farm Location</p>
                  <p className="text-muted-foreground">{product.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="font-semibold">Harvest Date</p>
                  <p className="text-muted-foreground">{new Date(product.harvestDate).toLocaleDateString('en-NG', { dateStyle: 'long' })}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="font-semibold">Delivery Options</p>
                  <p className="text-muted-foreground">{product.deliveryOptions.join(", ")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-auto space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg overflow-hidden h-12">
                <button 
                    className="px-4 hover:bg-muted transition-colors disabled:opacity-50"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                >
                    -
                </button>
                <div className="px-4 font-semibold w-12 text-center">{quantity}</div>
                <button 
                    className="px-4 hover:bg-muted transition-colors"
                    onClick={() => setQuantity(quantity + 1)}
                >
                    +
                </button>
              </div>
              <Button size="lg" className="flex-1 h-12 text-lg shadow-lg" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="h-12 w-12 p-0">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-xl border border-dashed border-primary/40 bg-primary/5">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${trustLevelColors[product.farmerTrustLevel]}`}>
                        <Award className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-sm font-bold">{product.farmerName}</p>
                        <p className="text-xs text-muted-foreground">FarmLink {product.farmerTrustLevel} Member</p>
                    </div>
                </div>
                <Link to="#" className="text-primary text-xs font-bold flex items-center hover:underline">
                    View Farmer Profile <ChevronRight className="h-3 w-3" />
                </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 mb-8">
            <TabsTrigger 
              value="details" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 py-4"
            >
              Product Details
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 py-4"
            >
              Reviews (24)
            </TabsTrigger>
            <TabsTrigger 
              value="farmer" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 py-4"
            >
              About the Farmer
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold">Nutritional Value & Quality</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        Our products are grown with the utmost care for quality and nutritional value. 
                        This {product.name.toLowerCase()} is sourced directly from {product.farmerName}'s farm in {product.location}. 
                        FarmLink ensures that all products listed on our platform meet our strict quality guidelines.
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {["100% Organic", "Pest Free", "Nutrient Rich", "Traceable Origin", "Sustainable Farming", "Fair Price Guaranteed"].map((item, i) => (
                            <li key={i} className="flex items-center text-sm text-muted-foreground">
                                <CheckCircle2 className="h-4 w-4 text-primary mr-2" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-muted/20 p-6 rounded-2xl border">
                    <h4 className="font-bold mb-4 flex items-center gap-2"><Truck className="h-5 w-5 text-primary" /> Shipping & Handling</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                        We offer several delivery methods to ensure your products arrive fresh. 
                        Standard delivery takes 1-3 working days within the same state, and 3-5 days across states.
                    </p>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm py-2 border-b">
                            <span>Same State Delivery</span>
                            <span className="font-bold">₦1,500 - ₦3,000</span>
                        </div>
                        <div className="flex justify-between text-sm py-2 border-b">
                            <span>Interstate Delivery</span>
                            <span className="font-bold">₦5,000 - ₦15,000</span>
                        </div>
                        <div className="flex justify-between text-sm py-2">
                            <span>Farm Pickup</span>
                            <span className="font-bold text-green-600">Free</span>
                        </div>
                    </div>
                </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews">
             <div className="py-8 text-center bg-muted/20 rounded-2xl">
                <Star className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold">Real Customer Reviews</h3>
                <p className="text-muted-foreground mt-1 max-w-md mx-auto">
                    Check out what other buyers are saying about this product and the farmer.
                </p>
                <Button variant="outline" className="mt-6">Load More Reviews</Button>
             </div>
          </TabsContent>
          <TabsContent value="farmer">
             <Card>
                <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-3xl shrink-0 border-2 border-primary/20">
                        {product.farmerName.charAt(0)}
                    </div>
                    <div className="flex-1 space-y-4 text-center md:text-left">
                        <div>
                            <h3 className="text-2xl font-bold flex items-center justify-center md:justify-start gap-2">
                                {product.farmerName} 
                                {product.farmerVerified && <Badge className="bg-green-600">Verified</Badge>}
                            </h3>
                            <p className="text-muted-foreground">FarmLink {product.farmerTrustLevel} Member since 2022</p>
                        </div>
                        <p className="text-muted-foreground">
                            Passionate about sustainable agriculture and providing the best quality produce to Nigerian households. 
                            Specializes in {product.category.toLowerCase()} and value-added agricultural products.
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <div className="px-4 py-2 bg-muted rounded-full text-xs font-bold">500+ Orders Completed</div>
                            <div className="px-4 py-2 bg-muted rounded-full text-xs font-bold">98% Positive Feedback</div>
                            <div className="px-4 py-2 bg-muted rounded-full text-xs font-bold">Top 5% Farmers</div>
                        </div>
                    </div>
                </CardContent>
             </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

const CheckCircle2 = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/>
    </svg>
);
