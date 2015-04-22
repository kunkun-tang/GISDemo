package models

import play.api.Play.current
import play.api.libs.json._

import java.util.Calendar
import java.util.Date

import scala.language.postfixOps


case class Point(val coorx: Double, val coory: Double, val title: String)

object Point{

  import scala.io.Source;
  val filename ="DATA/Coordinates.txt";

  implicit val PointWrites = new Writes[Point] {
    def writes(pl: Point) = Json.obj(
      "coorx" -> pl.coorx,
      "coory" -> pl.coory,
      "reserved" -> pl.title
    )
  }

  def points={

    Source.fromFile(filename).getLines().map(line => {
      val coordinates = line.split(" ")
      new Point(coordinates(0).toDouble, coordinates(1).toDouble, "a");
      }).toList

  }

  def show() = Json.toJson(points)
}

// object Parkinglot{

//   val today = Calendar.getInstance().getTime();

//   implicit val ParkinglotWrites = new Writes[Parkinglot] {
//     def writes(pl: Parkinglot) = Json.obj(
//       "id" -> pl.id,
//       "name" -> pl.name,
//       "price" -> pl.price,
//       "coorx" -> pl.coorx,
//       "coory" -> pl.coory,
//       "max" -> pl.max,
//       "available" -> pl.available,
//       "lastCheck" -> pl.lastCheck.toString,
//       "reserved" -> pl.reserved
//     )
//   }

//   val parkinglot1 = Parkinglot( "1", "magnolia", 3.23, 52, 23, 100, 20, Calendar.getInstance().getTime(), false);
//   val parkinglot2 = Parkinglot( "2", "glen", 3.23, 42, 23, 100, 20, Calendar.getInstance().getTime(), false);

//   val json = Json.toJson(Seq(parkinglot1, parkinglot2))

//   def show() = json
// }

