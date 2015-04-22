import java.io.FileWriter;
import java.io.PrintWriter;
import java.util.Random;
/**
 * Preprocess
 */
object PreProcess extends App{

	val rand = new Random(System.currentTimeMillis());
	import scala.io.Source
 
	val filename = "DATA/loc-gowalla_totalCheckins.txt"
	val out = new java.io.PrintWriter("DATA/Coordinates.txt");
	try { Source.fromFile(filename).getLines().foreach(line => if(rand.nextDouble()<0.01){
		val strs = line.split("\t");
		out.println(strs(2) + " "+ strs(3))
		}) }
  finally { out.close }

}