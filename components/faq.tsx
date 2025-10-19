import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What documents do I need to apply for accommodation?",
    answer:
      "You'll typically need: a valid passport, proof of enrollment at your university (acceptance letter or student ID), proof of financial support (bank statements or scholarship letter), and a guarantor if required. We'll guide you through the specific requirements for your chosen property.",
  },
  {
    question: "Can I view properties before arriving in the country?",
    answer:
      "Yes! We offer virtual tours via video call for all our properties. You can explore rooms, common areas, and the neighborhood from anywhere in the world. Our team will answer all your questions during the tour.",
  },
  {
    question: "What is included in the rent?",
    answer:
      "This varies by property, but typically includes utilities (water, electricity, heating), internet access, and basic furnishings. Some properties also include cleaning services and contents insurance. All inclusions are clearly listed on each property page.",
  },
  {
    question: "How do I pay my rent?",
    answer:
      "We accept international bank transfers, credit/debit cards, and online payment platforms. You can set up automatic monthly payments or pay manually. All payment methods are secure and GDPR-compliant.",
  },
  {
    question: "What if I need to cancel my accommodation?",
    answer:
      "Cancellation policies vary by property and lease length. Generally, we offer flexible cancellation up to 30 days before move-in. After moving in, standard notice periods apply (usually 1-2 months). Contact us to discuss your specific situation.",
  },
  {
    question: "Is UniTrail Housing different from UniTrail?",
    answer:
      "Yes, UniTrail Housing is a specialized division focused exclusively on student accommodation. While we share the UniTrail commitment to supporting international students, we operate independently with dedicated housing experts and resources.",
  },
  {
    question: "Do you offer support after I move in?",
    answer:
      "Our support doesn't end at move-in. We provide 24/7 emergency support, regular property maintenance, and a dedicated student support team to help with any issues or questions throughout your stay.",
  },
  {
    question: "Are the properties safe and secure?",
    answer:
      "Safety is our top priority. All properties are verified and inspected regularly. Most include secure entry systems, CCTV, and 24/7 security. We also provide safety guides and emergency contacts for all residents.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Got questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-foreground">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
