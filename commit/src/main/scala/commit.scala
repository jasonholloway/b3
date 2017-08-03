package woodpigeon.bb {

  import java.util.UUID
  import io.circe.generic.auto._
  import io.github.mkotsur.aws.handler.Lambda._
  import io.github.mkotsur.aws.handler.Lambda
  import scala.async.Async.{async, await}

  package object commit {
    type UpdateId = Int
  }

  package commit {

    case class Update(id: UpdateId, updateType: String)

    case class UpdateResponse(ok: Boolean)

    trait UpdateStore {
      def commit(update: Update)
    }

    trait UpdateRegistry {
      def getVersion: UpdateId
      def pushHead(id: UpdateId)
    }

    trait Lock {
      def release(): Unit
    }


    class UpdateHandler extends Lambda[Update, UpdateResponse] {

      val store: UpdateStore = null
      val registry: UpdateRegistry = null

      def takeLock: Lock = ???

      def getHead: UpdateId = ???

      override def handle(update: Update): Either[Throwable, UpdateResponse] = {

        Right(UpdateResponse(true))

//        val lock = takeLock
//
//        //instead of a lock, go for optimistic concurrency
//        //the initial check is just a sanity check to stop us performing work we don't have to do
//        //the important bit is at the end - the head pushing must be atomic. We need to see if SimpleDB
//        //offers atomicity. I've a feeling it will do.
//
//        try {
//          val version = registry.getVersion
//
//          val headId = getHead
//
//          if(batch.prevId != headId) {
//            return Left(new RuntimeException())
//          }
//
//          //check batch is of correct version - ie we've not been gazumped
//          //all batches will have a version number
//
//          store.save(batch)
//          registry.pushHead(batch.id)   //when this is pushed, the transaction is complete
//
//          Right(UpdateResponse(true))
//        }
//        finally {
//          lock.release()
//        }
      }
    }



  }
}

