'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  Bot,
  Briefcase,
  Settings,
  Sparkles,
  RefreshCw,
  TrendingUp,
  Users,
  Shield,
  Zap,
  Target,
  Brain,
  Globe,
  Heart,
  PenTool,
  Code,
  Camera,
  Calendar,
  DollarSign,
  Rocket,
} from 'lucide-react';

type PromptExample = {
  title: string;
  query: string;
  icon: React.ReactNode;
};

const allPrompts: PromptExample[] = [
  {
    title: 'Market research dashboard',
    query:
      'Build an interactive market research dashboard for the SaaS industry using Python and Plotly. Analyze industry trends from top sources, segment customers from `customers.csv` using K-Means, and profile 5 key competitors. Conclude with three actionable recommendations for a new market entrant.',
    icon: <BarChart3 className="text-green-700 dark:text-green-400" size={16} />,
  },
  {
    title: 'Recommendation engine',
    query:
      'Create a hybrid e-commerce recommendation engine in Python. Use collaborative filtering (SVD) on `ratings.csv` and content-based filtering (TF-IDF) on `products.csv`. Evaluate both models, combine them, and serve the top 10 recommendations for a user via a simple Flask API endpoint.',
    icon: <Bot className="text-blue-700 dark:text-blue-400" size={16} />,
  },
  {
    title: 'Go-to-market strategy',
    query:
      'Create a 12-month go-to-market strategy in Markdown for a new B2B project management SaaS. Include market sizing (TAM, SAM, SOM), user personas, acquisition channels (SEO, paid ads), a three-tiered pricing model, and a detailed launch timeline with key marketing and product milestones.',
    icon: <Briefcase className="text-rose-700 dark:text-rose-400" size={16} />,
  },
  {
    title: 'Data pipeline automation',
    query:
      'Build a daily ETL pipeline using Python and Airflow. Extract data from PostgreSQL, Salesforce, and Google Analytics. Transform it by cleaning, joining sources, and validating with Great Expectations. Load the final model into Snowflake or BigQuery. Ensure robust error handling and email alerts.',
    icon: <Settings className="text-purple-700 dark:text-purple-400" size={16} />,
  },
  {
    title: 'Productivity system',
    query:
      "Design a personal productivity system based on the PARA method. Create the directory structure and a detailed Markdown guide. The guide should cover task management workflows, goal tracking with OKR templates, a habit scorecard, and a time-blocking strategy. Provide all templates as MD files.",
    icon: <Target className="text-orange-700 dark:text-orange-400" size={16} />,
  },
  {
    title: 'Content marketing plan',
    query:
      'Create a 6-month content marketing plan in a PDF for an eco-friendly home goods startup. Define 2 target personas and 4 content pillars. Build a weekly content calendar with topics, formats, and keywords. Include a list of 50 SEO keywords, define performance KPIs, and write a sample blog post.',
    icon: <PenTool className="text-indigo-700 dark:text-indigo-400" size={16} />,
  },
  {
    title: 'Portfolio analysis',
    query:
      'Build a portfolio analysis web app with Python and Streamlit. Users will upload a CSV of transactions. The app must fetch live prices with yfinance, calculate portfolio value and risk (Beta), and visualize asset allocation. Plot performance against the S&P 500 and recommend rebalancing.',
    icon: <DollarSign className="text-emerald-700 dark:text-emerald-400" size={16} />,
  },
  {
    title: 'Customer journey map',
    query:
      'Create a customer journey map for a meditation app using Mermaid.js. The map and a report should detail 5 stages: Awareness, Consideration, Conversion, Retention, and Advocacy. For each stage, define user actions, touchpoints, emotions, pain points, and suggest optimization opportunities.',
    icon: <Users className="text-cyan-700 dark:text-cyan-400" size={16} />,
  },
  {
    title: 'A/B testing framework',
    query:
      'Create a PDF guide for an A/B testing framework. Cover hypothesis formulation, test design with sample size calculation, and statistical significance using p-values. Include a Python script for analysis, a guide on interpreting results, and a comparison of tools like Google Optimize and VWO.',
    icon: <TrendingUp className="text-teal-700 dark:text-teal-400" size={16} />,
  },
  {
    title: 'Code review automation',
    query:
      'Create a GitHub Actions workflow (`.yml` file) for automated code review on pull requests. The workflow must run a security scan with Snyk or Trivy, perform performance linting with pylint/eslint, and enforce coding standards with Black/Prettier. Post a summary comment on the PR.',
    icon: <Code className="text-violet-700 dark:text-violet-400" size={16} />,
  },
  {
    title: 'Risk assessment matrix',
    query:
      'Develop a risk assessment framework for a small business. Deliver a Markdown guide on identifying, analyzing (with a 5x5 matrix), and prioritizing risks. Also provide a reusable Excel template with formulas for a risk matrix heat map and include a section on mitigation strategies.',
    icon: <Shield className="text-red-700 dark:text-red-400" size={16} />,
  },
  {
    title: 'Learning path generator',
    query:
      'Build a Python CLI application that generates a personalized learning path. Prompt the user for their goal (e.g., Web Development), skill level, and preferred learning style. The script should output a weekly plan in Markdown with curated links to courses, videos, and articles.',
    icon: <Brain className="text-pink-700 dark:text-pink-400" size={16} />,
  },
  {
    title: 'Social media automation',
    query:
      'Build a social media automation tool for Twitter using Python. Create a script to schedule posts from a CSV file. Write a second script that runs daily to track engagement analytics (followers, impressions) and emails a summary report using smtplib. Provide setup instructions in a README.',
    icon: <Globe className="text-blue-600 dark:text-blue-300" size={16} />,
  },
  {
    title: 'Health tracking dashboard',
    query:
      'Create a personal health dashboard with Python and Streamlit from a user-uploaded CSV (`date`, `steps`, `calories`, `sleep`, `weight`). Visualize weight trends, daily steps vs. calories, and sleep patterns. Include a weekly report with avg/min/max for each metric. Deliver one Python file.',
    icon: <Heart className="text-red-600 dark:text-red-300" size={16} />,
  },
  {
    title: 'Project automation',
    query:
      'Write a Python script to automate project management tasks using the Jira, Asana, or Trello API. When a new task is labeled "Urgent," it should auto-assign to a senior member, set a 48-hour due date, post a notification to Slack, and add a confirmation comment to the task.',
    icon: <Calendar className="text-amber-700 dark:text-amber-400" size={16} />,
  },
  {
    title: 'Sales funnel optimizer',
    query:
      'Analyze a SaaS sales funnel using `sales_data.csv`. Calculate and visualize conversion rates for each stage with Plotly. Perform a cohort analysis to track monthly performance. Based on the data, propose three A/B test hypotheses to improve conversions. Deliver a detailed Jupyter Notebook.',
    icon: <Zap className="text-yellow-600 dark:text-yellow-300" size={16} />,
  },
  {
    title: 'Startup pitch deck',
    query:
      'Create a 12-slide pitch deck in PowerPoint for "ConnectSphere," a social network for remote workers. The deck should cover the problem, solution, market size, product demo, business model (freemium), GTM strategy, competition, team, financial projections, and the funding ask.',
    icon: <Rocket className="text-orange-600 dark:text-orange-300" size={16} />,
  },
  {
    title: 'Photography workflow',
    query:
      'Create a PDF guide detailing a wedding photography workflow. Cover pre-shoot prep, on-site data management, file ingest and culling in Lightroom, non-destructive editing with presets, exporting for web and print, client delivery via a gallery service, and long-term archiving with the 3-2-1 rule.',
    icon: <Camera className="text-slate-700 dark:text-slate-400" size={16} />,
  },
  {
    title: 'Supply chain analysis',
    query:
      'Analyze `inventory_data.xlsx` for a retail supply chain report. Evaluate and rank vendors based on lead time and cost. Identify cost-reduction opportunities for high-cost products, recommend backup suppliers to mitigate risk, and calculate the EOQ for top SKUs. Deliver a PDF with visualizations.',
    icon: <Briefcase className="text-stone-700 dark:text-stone-400" size={16} />,
  },
  {
    title: 'UX research framework',
    query:
      'Create a "UX Research Playbook" with Markdown templates. Include a guide to research methods (interviews, usability tests), and templates for user personas, interview scripts, usability test plans, and presenting findings. Also include a guide on how to analyze data with an affinity map.',
    icon: <Sparkles className="text-fuchsia-700 dark:text-fuchsia-400" size={16} />,
  },
];

// Function to get random prompts
const getRandomPrompts = (count: number = 3): PromptExample[] => {
  const shuffled = [...allPrompts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const Examples = ({
  onSelectPrompt,
}: {
  onSelectPrompt?: (query: string) => void;
}) => {
  const [displayedPrompts, setDisplayedPrompts] = useState<PromptExample[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Initialize with random prompts on mount
  useEffect(() => {
    setDisplayedPrompts(getRandomPrompts(3));
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setDisplayedPrompts(getRandomPrompts(3));
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-muted-foreground font-medium">Try it out:</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
        >
          <motion.div
            animate={{ rotate: isRefreshing ? 360 : 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <RefreshCw size={10} />
          </motion.div>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {displayedPrompts.map((prompt, index) => (
          <motion.div
            key={`${prompt.title}-${index}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              delay: index * 0.05,
              ease: "easeOut"
            }}
          >
            <Card
              className="group cursor-pointer h-full shadow-none transition-all bg-sidebar hover:bg-neutral-100 dark:hover:bg-neutral-800/60 p-0 justify-center"
              onClick={() => onSelectPrompt && onSelectPrompt(prompt.query)}
            >
              <CardHeader className="p-2 grid-rows-1">
                <div className="flex items-start justify-center gap-1.5">
                  <div className="flex-shrink-0 mt-0.5">
                    {React.cloneElement(prompt.icon as React.ReactElement, { size: 14 })}
                  </div>
                  <CardTitle className="font-normal group-hover:text-foreground transition-all text-muted-foreground text-xs leading-relaxed line-clamp-3">
                    {prompt.title}
                  </CardTitle>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};