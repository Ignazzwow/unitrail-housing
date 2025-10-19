import { Search, CheckCircle, Key, Heart } from "lucide-react"
import Image from "next/image"

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Browse & Search",
    description: "Explore our verified properties filtered by location, budget, and preferences.",
    image: "/student-browsing-apartment-listings-on-laptop.jpg",
  },
  {
    icon: CheckCircle,
    number: "02",
    title: "Apply Online",
    description: "Submit your application with our simple online form. We'll guide you through every step.",
    image: "/student-filling-out-online-application-form-happil.jpg",
  },
  {
    icon: Key,
    number: "03",
    title: "Get Approved",
    description: "Our team reviews your application quickly and helps with all necessary documentation.",
    image: "/friendly-housing-agent-reviewing-documents-with-st.jpg",
  },
  {
    icon: Heart,
    number: "04",
    title: "Move In",
    description: "Collect your keys and settle into your new home. Welcome to your student journey!",
    image: "/excited-student-holding-keys-to-new-apartment.jpg",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-secondary/20 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            How It Works
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Finding your perfect student accommodation is easy with UniTrail Housing. Just four simple steps to your new
            home.
          </p>
        </div>

        <div className="mx-auto max-w-6xl space-y-16">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`flex flex-col gap-8 items-center ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
            >
              <div className="flex-1">
                <div className="relative aspect-square max-w-md mx-auto overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src={step.image || "/placeholder.svg"}
                    alt={step.title}
                    width={400}
                    height={400}
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 text-center lg:text-left">
                <div className="mb-4 flex items-center justify-center lg:justify-start gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <div className="text-4xl font-bold text-primary/30">{step.number}</div>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">{step.title}</h3>
                <p className="text-lg text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
