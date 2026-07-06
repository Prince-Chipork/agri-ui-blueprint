import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockProducts } from "@/lib/mock-data";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingCart, Trash2, Star } from "lucide-react";

const wishlistProducts = [
  { ...mockProducts[0], rating: 4.8, inStock: true },
  { ...mockProducts[1], rating: 4.5, inStock: true },
  {
    id: "p5",
    name: "Organic Honey",
    category: "Herbs",
    description: "Pure raw organic honey.",
    quantity: 25,
    unit: "kg" as const,
    price: 12.0,
    harvestDate: "2024-03-10",
    location: "Thika",
    images: ["https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80"],
    deliveryOptions: ["Delivery"],
    farmerId: "3",
    farmerName: "Farmer Alice",
    farmerVerified: false,
    rating: 4.7,
    inStock: true,
  },
  {
    id: "p6",
    name: "Fresh Basil",
    category: "Herbs",
    description: "Aromatic fresh basil bunch.",
    quantity: 0,
    unit: "bunch" as const,
    price: 1.5,
    harvestDate: "2024-03-22",
    location: "Nairobi",
    images: ["https://images.unsplash.com/photo-1618377086163-edbccc9c4b02?w=800&q=80"],
    deliveryOptions: ["Pickup"],
    farmerId: "2",
    farmerName: "Farmer Bob",
    farmerVerified: true,
    rating: 4.3,
    inStock: false,
  },
];

export default function BuyerWishlist() {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState(wishlistProducts);

  const removeFromWishlist = (id: string) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground text-sm mt-1">{wishlist.length} items saved</p>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg">Your wishlist is empty</h3>
            <p className="text-muted-foreground mt-1">Save products you love to find them easily later.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {wishlist.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-video bg-muted relative">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 bg-background/80 hover:bg-background"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="secondary" className="text-sm">Out of Stock</Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-1 mb-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-medium">{product.rating}</span>
                </div>
                <h3 className="font-semibold text-sm">{product.name}</h3>
                <p className="text-xs text-muted-foreground">{product.farmerName}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold text-primary">${product.price.toFixed(2)}/{product.unit}</span>
                  <Button
                    size="sm"
                    disabled={!product.inStock}
                    onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.images[0] })}
                  >
                    <ShoppingCart className="h-3.5 w-3.5 mr-1" /> Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
