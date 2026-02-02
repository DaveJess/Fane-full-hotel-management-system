import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building2, User } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-600 via-green-700 to-blue-600 p-8 md:p-16">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-yellow-400 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white blur-[100px]" />
          </div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-balance">
              Ready to Start Your Journey with Fane?
            </h2>
            <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Whether you&apos;re looking to book your next stay or list your hotel property, Fane provides everything
              you need to succeed.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="font-semibold">
                  <User className="mr-2 h-5 w-5" />
                  Book Hotels Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/signup?type=hotel">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  <Building2 className="mr-2 h-5 w-5" />
                  List Your Hotel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
