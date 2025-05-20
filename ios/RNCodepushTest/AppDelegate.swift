import UIKit
import React
// CodePush'u Swift'te kullanmak için aşağıdaki importu ekliyoruz
// Eğer Bridging-Header tanımlıysa bu import çalışacaktır

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    let jsCodeLocation: URL
    #if DEBUG
      jsCodeLocation = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")!
    #else
      jsCodeLocation = CodePush.bundleURL() // CodePush'u kullanmak için
    #endif

    let rootView = RCTRootView(
      bundleURL: jsCodeLocation,
      moduleName: "RNCodepushTest",
      initialProperties: nil,
      launchOptions: launchOptions
    )

    let rootViewController = UIViewController()
    rootViewController.view = rootView

    self.window = UIWindow(frame: UIScreen.main.bounds)
    self.window?.rootViewController = rootViewController
    self.window?.makeKeyAndVisible()

    return true
  }
}
