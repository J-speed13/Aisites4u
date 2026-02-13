import { Feature, PricingPlan, Game } from './types';

export const FEATURES: Feature[] = [
  {
    id: 'reasoning',
    title: 'Advanced Reasoning',
    description: 'Solve complex problems, analyze logic, and get step-by-step breakdowns of difficult concepts.',
    iconName: 'Brain'
  },
  {
    id: 'coding',
    title: 'Code Generation',
    description: 'Generate, debug, and optimize code in Python, JavaScript, TypeScript, and more.',
    iconName: 'Terminal'
  },
  {
    id: 'creative',
    title: 'Creative Studio',
    description: 'Write stories, poems, scripts, or marketing copy with a unique and engaging voice.',
    iconName: 'PenTool'
  },
  {
    id: 'analysis',
    title: 'Data Analysis',
    description: 'Extract insights from text, summarize long documents, and structure information efficiently.',
    iconName: 'BarChart'
  },
  {
    id: 'vision',
    title: 'Computer Vision',
    description: 'Analyze images, detect objects, and extract text from visual inputs with high precision.',
    iconName: 'Eye'
  },
  {
    id: 'audio',
    title: 'Audio Synthesis',
    description: 'Generate lifelike speech and sound effects from text descriptions instantly.',
    iconName: 'Music'
  }
];

export const SUGGESTED_PROMPTS = [
  "Explain quantum computing like I'm 5",
  "Write a Python script to scrape a website",
  "Draft a professional email to a client",
  "What are the latest trends in AI?",
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$0',
    period: '/mo',
    description: 'Perfect for exploring AI capabilities.',
    features: ['Unlimited Chat', 'Basic Reasoning', 'Standard Response Speed', 'Community Support'],
    buttonText: 'Get Started',
    highlight: false
  },
  {
    id: 'pro',
    name: 'Pro Builder',
    price: '$29',
    period: '/mo',
    description: 'For power users and creators.',
    features: ['Unlimited App Generation', 'Pro Model Access', 'Priority Processing', 'Code Export', 'NO LIMITS on Usage'],
    buttonText: 'Go Limitless',
    highlight: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Scalable solutions for teams.',
    features: ['Dedicated API Keys', 'Custom Model Tuning', 'SSO & Security', '24/7 Dedicated Support'],
    buttonText: 'Contact Sales',
    highlight: false
  }
];

export const GAMES: Game[] = [];