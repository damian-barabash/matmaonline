import Foundation
import Vision
import CoreImage
import AppKit

let args = CommandLine.arguments
let url = URL(fileURLWithPath: args[1])
let handler = VNImageRequestHandler(url: url, options: [:])
let req = VNGenerateForegroundInstanceMaskRequest()
try handler.perform([req])
guard let obs = req.results?.first else { print("no result"); exit(1) }
print("instances:", obs.allInstances.count)
let ctx = CIContext()
func save(_ set: IndexSet, _ path: String) throws {
  let buf = try obs.generateScaledMaskForImage(forInstances: set, from: handler)
  let ci = CIImage(cvPixelBuffer: buf)
  let cg = ctx.createCGImage(ci, from: ci.extent)!
  let rep = NSBitmapImageRep(cgImage: cg)
  try rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: path))
}
for i in obs.allInstances { try save(IndexSet(integer: i), "\(args[2])_\(i).png") }
