"use client"

import type { Sweet } from "@/lib/types"
import { TableCell, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, ShoppingCart, Trash2 } from "lucide-react"

interface SweetTableRowProps {
  sweet: Sweet
  onPurchase?: (id: string) => void
  onEdit?: (sweet: Sweet) => void
  onDelete?: (id: string) => void
  isAdmin?: boolean
  isPurchasing?: boolean
}

export function SweetTableRow({ sweet, onPurchase, onEdit, onDelete, isAdmin, isPurchasing }: SweetTableRowProps) {
  const isOutOfStock = sweet.quantity === 0

  return (
    <TableRow>
      <TableCell className="font-medium">{sweet.name}</TableCell>
      <TableCell>{sweet.category}</TableCell>
      <TableCell>${sweet.price.toFixed(2)}</TableCell>
      <TableCell>
        <Badge variant={isOutOfStock ? "destructive" : "default"}>
          {isOutOfStock ? "Out of Stock" : sweet.quantity}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          {!isAdmin && (
            <Button size="sm" onClick={() => onPurchase?.(sweet.id)} disabled={isOutOfStock || isPurchasing}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Purchase
            </Button>
          )}
          {isAdmin && (
            <>
              <Button size="sm" variant="outline" onClick={() => onEdit?.(sweet)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => onDelete?.(sweet.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  )
}
