import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { toast } from "sonner";

export default function FarmerProducts() { 
    return (
        <EmptyState 
            icon={<Package className="h-16 w-16" />}
            title="You have no products yet"
            description="Start by adding your first product to see it here."
            action={{
                text: "Add Product",
                onClick: () => toast.success("Redirecting to Add Product page...")
            }}
        />
    );
}