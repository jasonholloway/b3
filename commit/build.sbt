name:="bb-commit"
organization:="woodpigeon"
scalaVersion:="2.12.2"

libraryDependencies ++= Seq(
  "io.github.mkotsur" %% "aws-lambda-scala" % "0.0.7",
  "org.scala-lang.modules" %% "scala-async" % "0.9.6",
  "io.circe" %% "circe-parser" % "0.7.0"
)

mainClass := Some("woodpigeon.bb.commit.Main")

javacOptions += "-g"
