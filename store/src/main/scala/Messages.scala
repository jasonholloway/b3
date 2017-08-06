package woodpigeon.bb {
  package object store {
    type UpdateId = Int
    type ProductId = Int
  }
}

package woodpigeon.bb.store {

  case class Message[B](body: B)

  case class Nop()

  case class Update[Op](id: UpdateId, op: Op)

  case class PutProduct(sku: ProductId)
  case class DeleteProduct(sku: ProductId)

  case class PutCategory()
  case class DeleteCategory()
}

