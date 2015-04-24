name := "GISDemo"

version := "0.0.1"

scalaVersion := "2.11.4"

libraryDependencies ++= Seq(
  jdbc,
  anorm,
  "org.webjars" % "jquery" % "2.1.1",
  "org.webjars" % "bootstrap" % "3.3.1"
)

val commonSettings = Seq(
  organization := "AU",
  version := "0.1",
  scalaVersion := "2.11.2",
  scalacOptions := Seq("-unchecked", "-deprecation", "-encoding", "utf8")
)

lazy val common = project.in(file("common"))
  .settings(commonSettings:_*)

lazy val playApp = project.in(file("playApp"))
  .settings(commonSettings:_*).enablePlugins(PlayScala)

lazy val main = project.in(file("."))
  .aggregate(common, playApp)

resolvers += "Typesafe repository" at
  "http://repo.typesafe.com/typesafe/releases/"