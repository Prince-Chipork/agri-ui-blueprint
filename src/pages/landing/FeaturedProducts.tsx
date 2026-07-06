import { mockProducts } from "@/lib/mock-data";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<typeof mockProducts>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(mockProducts.slice(0, 4));
      setLoading(false);
    }, 1000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Fresh & Quality</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight">Today's Featured Harvest</h3>
            <p className="mt-4 text-muted-foreground text-lg">
                Discover premium agricultural products sourced directly from our Platinum and Gold tier verified farmers.
            </p>
          </div>
          <Button variant="ghost" className="text-primary hover:text-primary/80 font-bold gap-2 text-lg h-auto p-0" asChild>
            <Link to="/products">Explore Marketplace <ArrowRight className="h-5 w-5" /></Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading 
            ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : products.map((product) => <ProductCard key={product.id} product={product} />)
          }
        </div>
      </div>
    </section>
  )
}
