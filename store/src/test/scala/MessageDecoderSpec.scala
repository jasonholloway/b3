import cats.scalatest.EitherMatchers
import io.circe.Json
import org.scalatest.{FlatSpec, Matchers}
import woodpigeon.bb.store._

class HarnessSpec extends FlatSpec with Matchers {

}


class MessageDecoderSpec extends FlatSpec with Matchers with EitherMatchers {

  it should "parse a Message[Nop]" in {
    val json = Json.obj(
      ("type", Json.fromString("nop")),
      ("body", Json.fromString(""))
    )
    MessageDecoder.decodeJson(json).map { message =>
      message.body shouldBe a [Nop]
    } shouldBe right
  }

  it should "parse a Message[Update[PutProduct]]" in {
    val json = Json.obj(
      ("type", Json.fromString("update")),
      ("body", Json.obj(
        ( "id", Json.fromInt(13)),
        ( "type", Json.fromString("putProduct")),
        ( "op", Json.obj(
          ("sku", Json.fromInt(4))
        ))
      ))
    )
    MessageDecoder.decodeJson(json).map { message =>
      message.body shouldBe a [Update[PutProduct]]
    } shouldBe right
  }






}
