"use client";
import { useState } from "react";
import {
  ChevronDown,
  FileText,
  Image,
  Mic,
  CreditCard,
  HelpCircle,
  Users,
  Shield,
  Lock,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
  category: string;
}

interface NavLink {
  label: string;
  category: string;
  icon: React.ReactNode;
}

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("general");

  const navLinks: NavLink[] = [
    { label: "General", category: "general", icon: <Users className="h-4 w-4" /> },
    { label: "Pricing", category: "pricing", icon: <CreditCard className="h-4 w-4" /> },
    { label: "DocBot", category: "docbot", icon: <FileText className="h-4 w-4" /> },
    { label: "ArtSynth", category: "artsynth", icon: <Image className="h-4 w-4" /> },
    { label: "VoiceWiz", category: "voicewiz", icon: <Mic className="h-4 w-4" /> },
  ];

  const allFaqs: FAQItem[] = [
    // General FAQs
    {
      question: "What is Genie AI?",
      answer:
        "Genie AI is an all-in-one platform that lets you interact with PDFs, generate images, and transcribe audio seamlessly, designed to boost productivity and creativity.",
      icon: <Users className="h-5 w-5" />,
      category: "general",
    },
    {
      question: "Is Genie AI secure?",
      answer:
        "Yes, Genie AI uses industry-standard encryption to keep your data safe. Your interactions with our services are fully secure and private.",
      icon: <Shield className="h-5 w-5" />,
      category: "general",
    },
    // Pricing FAQs
    {
      question: "What plans are available?",
      answer:
        "Genie AI offers a Free tier with limited access and a Pro version at $20/month with enhanced features across DocBot, ArtSynth, and VoiceWiz.",
      icon: <CreditCard className="h-5 w-5" />,
      category: "pricing",
    },
    {
      question: "What is included in the Free tier?",
      answer:
        "The Free tier includes 10 DocBot chats, 5 image generations via ArtSynth, and 5 audio transcriptions with VoiceWiz.",
      icon: <HelpCircle className="h-5 w-5" />,
      category: "pricing",
    },
    {
      question: "What does the Pro version offer?",
      answer:
        "The Pro plan includes unlimited DocBot chats, 50 image generations, 50 audio transcriptions, and access to advanced features, including GPT-4.",
      icon: <Lock className="h-5 w-5" />,
      category: "pricing",
    },
    // DocBot FAQs
    {
      question: "How does DocBot work?",
      answer:
        "DocBot allows you to chat with PDFs, retrieving information quickly without manually searching through documents.",
      icon: <FileText className="h-5 w-5" />,
      category: "docbot",
    },
    {
      question: "Is there a limit on DocBot chats?",
      answer:
        "In the Free tier, you get 10 DocBot chats. The Pro version includes unlimited DocBot interactions.",
      icon: <HelpCircle className="h-5 w-5" />,
      category: "docbot",
    },
    // ArtSynth FAQs
    {
      question: "What is ArtSynth?",
      answer:
        "ArtSynth is Genie AI’s image generation tool, allowing you to create professional-grade images with ease.",
      icon: <Image className="h-5 w-5" />,
      category: "artsynth",
    },
    {
      question: "How many images can I generate?",
      answer:
        "The Free tier allows 5 image generations. In the Pro version, you can generate up to 50 images per month.",
      icon: <HelpCircle className="h-5 w-5" />,
      category: "artsynth",
    },
    // VoiceWiz FAQs
    {
      question: "What does VoiceWiz do?",
      answer:
        "VoiceWiz transcribes audio files, including meeting recordings and YouTube videos, into text.",
      icon: <Mic className="h-5 w-5" />,
      category: "voicewiz",
    },
    {
      question: "How many transcriptions are included?",
      answer:
        "The Free tier includes 5 transcriptions per month. With the Pro version, you can transcribe up to 50 files monthly.",
      icon: <HelpCircle className="h-5 w-5" />,
      category: "voicewiz",
    },
  ];

  const filteredFaqs = allFaqs.filter((faq) => faq.category === activeCategory);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-center text-2xl md:text-4xl font-semibold pb-6 md:pb-10">
        Frequently Asked Questions
      </h2>
      
      {/* Horizontal Scrollable Navigation */}
      <div className="relative mb-8 md:mb-12">
        <div className="overflow-x-auto scrollbar-hide">
          <nav className="flex items-center gap-2 md:gap-4 pb-4 min-w-max mx-auto justify-center">
            {navLinks.map((link) => (
              <button
                key={link.category}
                onClick={() => {
                  setActiveCategory(link.category);
                  setActiveIndex(null);
                }}
                className={`flex items-center gap-2 py-2 px-3 md:px-4 rounded-full text-xs md:text-sm transition-all duration-200 whitespace-nowrap ${
                  activeCategory === link.category
                    ? "bg-[rgb(15,23,42)] text-white font-medium"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, index) => (
          <div
            key={index}
            className="border border-border/5 rounded-lg overflow-hidden bg-white shadow-sm"
          >
            <button
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              className="w-full p-4 md:p-6 flex items-center justify-between group hover:bg-primary/[0.02] transition-colors"
            >
              <div className="flex items-center gap-4 text-left">
                <span className="text-primary/40 group-hover:text-primary/60 transition-colors">
                  {faq.icon}
                </span>
                <span className="text-base md:text-lg font-light group-hover:text-primary transition-colors">
                  {faq.question}
                </span>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-primary/40 group-hover:text-primary/60 transition-all duration-200 flex-shrink-0 ml-4 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {activeIndex === index && (
              <div className="px-6 pb-6 pt-2 text-sm md:text-base text-muted-foreground/80">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-border/5 text-center">
        <div className="space-y-4">
          <p className="text-sm md:text-base text-muted-foreground">
            Still have questions? We're here to help.
          </p>
          <a
            href="mailto:support@genieai.dev"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm md:text-base"
          >
            <HelpCircle className="h-4 w-4" />
            <span>Contact Support</span>
          </a>
        </div>
      </div>
    </div>
  );
}
