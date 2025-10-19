import { Home } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Home className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-card-foreground">UniTrail Housing</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Helping international students find their home away from home since 2020.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-card-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#features" className="text-muted-foreground hover:text-primary">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-muted-foreground hover:text-primary">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq" className="text-muted-foreground hover:text-primary">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-card-foreground">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#privacy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#cookies" className="text-muted-foreground hover:text-primary">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#gdpr" className="text-muted-foreground hover:text-primary">
                  GDPR Compliance
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-card-foreground">About UniTrail</h3>
            <p className="text-sm text-muted-foreground">
              UniTrail Housing is an independent division of UniTrail, dedicated exclusively to student accommodation
              services.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              <a href="https://unitrail.com" className="text-primary hover:underline">
                Visit main UniTrail website →
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} UniTrail Housing. All rights reserved.</p>
          <p className="mt-2">We are committed to protecting your privacy and complying with GDPR regulations.</p>
        </div>
      </div>
    </footer>
  )
}
