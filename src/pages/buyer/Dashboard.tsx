import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockProducts, mockOrders, revenueData } from "@/lib/mock-data";
import { useCart } from "@/context/CartContext";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  ShoppingCart,
  Heart,
  Package,
  ArrowRight,
  Star,
  Award,
  MapPin,
  Leaf,
  Wheat,
  Beef,
  Apple,
  Milk,
  Flower2,
  TrendingUp
} from "lucide-react";

const categories = [
  { name: "Vegetables", icon: Leaf, color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/30" },
  { name: "Crops", icon: Wheat, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/30" },
  { name: "Livestock", icon: Beef, color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-950/30" },
  { name: "Poultry", icon: Apple, color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/30" },
  { name: "Fishery", icon: Milk, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/30" },
  { name: "Processed", icon: Flower2, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950/30" },
];

const trustLevelColors = {
  Platinum: "bg-blue-600",
  Gold: "bg-yellow-600",
  Silver: "bg-slate-400",
  Bronze: "bg-orange-700",
};

export default function BuyerDashboard() {
  const { addToCart } = useCart();
  const recentOrders = mockOrders.slice(0, 3);
  const recommendedProducts = mockProducts.slice(0, 4).map(p => ({ ...p, rating: (4 + Math.random()).toFixed(1) }));

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Welcome back, Chidi! 👋</h1>
          <p className="text-muted-foreground mt-1">Discover fresh products from local farmers.</p>
        </div>
        <Link to="/products">
          <Button className="w-full md:w-auto">Start Shopping</Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{mockOrders.length}</p>
              <p className="text-xs text-muted-foreground">Recent Orders</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10">
              <ShoppingCart className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-muted-foreground">Items in Cart</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/10">
              <Heart className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">5</p>
              <p className="text-xs text-muted-foreground">Wishlist Items</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <TrendingUp className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">₦53,500</p>
              <p className="text-xs text-muted-foreground">Total Spent</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Spending Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">My Spending Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData.map(d => ({ ...d, spending: d.revenue / 10 }))}>
                <defs>
                  <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₦${value/1000}k`} />
                <Tooltip formatter={(value) => [`₦${value.toLocaleString()}`, 'Spending']} />
                <Area type="monotone" dataKey="spending" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorSpending)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Shop by Category</h2>
          <Link to="/products" className="text-sm text-primary hover:underline flex items-center gap-1">
            View All <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <Link key={cat.name} to={`/products?category=${cat.name}`}>
              <Card className="hover:border-primary transition-colors cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center gap-2 text-center">
                  <div className={`p-3 rounded-full ${cat.bg}`}>
                    <cat.icon className={`h-6 w-6 ${cat.color}`} />
                  </div>
                  <span className="text-xs font-medium">{cat.name}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recommended Products */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recommended for You</h2>
          <Link to="/products" className="text-sm text-primary hover:underline flex items-center gap-1">
            See More <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendedProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-muted relative">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.farmerVerified && (
                  <Badge className="absolute top-2 left-2 bg-green-600 text-white text-xs">
                    ✓ Verified
                  </Badge>
                )}
                <Badge className={`absolute top-2 right-2 ${trustLevelColors[product.farmerTrustLevel]} text-white gap-1 text-[10px]`}>
                  <Award className="h-2.5 w-2.5" /> {product.farmerTrustLevel}
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-1 mb-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-medium">{(product as any).rating}</span>
                </div>
                <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                <div className="flex flex-col gap-0.5 mt-1">
                  <p className="text-xs font-medium">{product.farmerName}</p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1"><MapPin className="h-2.5 w-2.5" /> {product.location}</p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold text-primary">₦{product.price.toLocaleString()}/{product.unit}</span>
                  <Button
                    size="sm"
                    onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.images[0] })}
                  >
                    <ShoppingCart className="h-3.5 w-3.5 mr-1" /> Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <Link to="/buyer/orders" className="text-sm text-primary hover:underline flex items-center gap-1">
            View All <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid gap-3">
          {recentOrders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <Package className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.orderDate} • {order.items.length} item(s)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    className={
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                        : order.status === "Processing"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                    }
                  >
                    {order.status}
                  </Badge>
                  <span className="font-semibold">₦{order.total.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
