"use client"

import type { Sweet } from "@/lib/types"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

interface SweetCardProps {
  sweet: Sweet
  onPurchase?: (id: string) => void
  isPurchasing?: boolean
}

export function SweetCard({ sweet, onPurchase, isPurchasing }: SweetCardProps) {
  const isOutOfStock = sweet.quantity === 0

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{sweet.name}</CardTitle>
          <Badge variant={isOutOfStock ? "destructive" : "default"}>
            {isOutOfStock ? "Out of Stock" : `${sweet.quantity} left`}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{sweet.description}</p>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{sweet.category}</Badge>
            <span className="text-lg font-semibold">${sweet.price.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => onPurchase?.(sweet.id)} disabled={isOutOfStock || isPurchasing}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isOutOfStock ? "Out of Stock" : "Purchase"}
        </Button>
      </CardFooter>
    </Card>
  )
}
