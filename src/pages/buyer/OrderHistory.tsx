import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockOrders, mockProducts } from "@/lib/mock-data";
import { Package, Eye, RotateCcw } from "lucide-react";

const getProduct = (productId: string) => mockProducts.find(p => p.id === productId);

export default function BuyerOrderHistory() {
  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Order History</h1>
          <p className="text-muted-foreground text-sm mt-1">Track and manage your orders</p>
        </div>
      </div>

      <div className="space-y-4">
        {mockOrders.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-lg">No orders yet</h3>
              <p className="text-muted-foreground mt-1">Your order history will appear here.</p>
            </CardContent>
          </Card>
        ) : (
          mockOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle className="text-base">Order #{order.id}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">Placed on {order.orderDate}</p>
                </div>
                <Badge
                  className={
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                      : order.status === "Processing"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
                      : order.status === "Cancelled"
                      ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                  }
                >
                  {order.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {order.items.map((item, idx) => {
                    const product = getProduct(item.productId);
                    return (
                      <div key={idx} className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
                        {product?.images[0] && (
                          <img src={product.images[0]} alt={product.name} className="h-10 w-10 rounded object-cover" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{product?.name || "Unknown Product"}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                        </div>
                        <span className="text-sm font-semibold">${(item.quantity * item.price).toFixed(2)}</span>
                      </div>
                    );
                  })}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="text-sm text-muted-foreground">
                      <span>Shipping: ${order.shippingCost.toFixed(2)}</span>
                      <span className="mx-2">•</span>
                      <span>Address: {order.deliveryAddress}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3.5 w-3.5 mr-1" /> Details
                        </Button>
                        {order.status === "Delivered" && (
                          <Button variant="outline" size="sm">
                            <RotateCcw className="h-3.5 w-3.5 mr-1" /> Return
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
