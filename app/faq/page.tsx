import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React, { Fragment } from "react";
import { MainLayout } from "@/app/Layouts/mainLayout";
import { Navbar } from "@/app/Components/Navbar";
import { Footer } from "@/app/Components/Footer";

type QA = {
  question: string;
  answer: string;
};

const FAQS = () => {
  const q: QA[] = [
    {
      question: "What is creators",
      answer:
        "Creators is the easiest way for you to start making an income directly from your fans where you can accept donations",
    },
    {
      question: "How much does it cost?",
      answer: "Free forever.",
    },
    {
      question: "How do I get paid?",
      answer:
        "You get paid from your supporters directly into your Stripe account. We take 0% fees from donations.",
    },
  ];

  return (
    <Fragment>
      <Navbar />
      <MainLayout>
        <div className="mt-32 flex items-center justify-center py-6">
          <Accordion type="single" collapsible className="w-10/12 rounded-2xl">
            {q.map(({ question, answer }: QA, idx: number) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="mb-4 ml-6 rounded-xl bg-white px-6 py-2 drop-shadow-sm"
              >
                <AccordionTrigger className="font-lg font-bold text-gray-800">
                  {question}
                </AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </MainLayout>
      <Footer />
    </Fragment>
  );
};

export default FAQS;
