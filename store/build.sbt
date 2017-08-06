name:="bb-store"
organization:="woodpigeon"
scalaVersion:="2.12.2"

libraryDependencies ++= Seq(
  "com.amazonaws" % "aws-lambda-java-core" % "1.1.0",
  "io.circe" %% "circe-core" % "0.7.0",
  "io.circe" %% "circe-parser" % "0.7.0",
  "io.circe" %% "circe-generic" % "0.7.0",
  "org.scalactic" %% "scalactic" % "3.0.1",
  "org.scalatest" %% "scalatest" % "3.0.1" % "test",
  "com.ironcorelabs" %% "cats-scalatest" % "2.2.0" % "test"
)

mainClass := Some("woodpigeon.bb.store.Main")

//javacOptions += "-g"
