/* 自问清单英文内容（按 group id / section 顺序 / item 顺序覆盖 checklist-data.js 的中文字段） */
const CHECKLIST_EN = {
  categories: {
    yuanjian: {
      name: 'Book: The Long View',
      desc: 'Brian Fetherstonhaugh, The Long View: Career Strategies to Start Strong, Reach High, and Go Far'
    },
    others: {
      name: 'Other Books',
      desc: 'Jingjin · A More Beautiful Question · How to Know a Person · Zhang Xiaoyu’s Business Case Course'
    }
  },
  groups: {
    'yj-01': {
      book: 'The Long View',
      title: 'Career Math · Long-Term Thinking',
      intro: ['Think about your career in the long term. Start with these numbers from career math.'],
      purpose: 'Use a few key numbers to calibrate your expectations for career length, skill-building pace, and the wealth curve—and set a long-term time horizon.',
      sections: [
        {
          heading: '5 Numbers',
          items: [
            { t: 'Career length: subtract your current age from 62.', note: 'A career has three stages of roughly 15 years, each with its own dominant strategy: ① Add fuel and start strong; ② Focus on your strengths and reach your peak; ③ Optimize your long tail and keep contributing.' },
            { t: 'Time to master a skill: at least 10,000 hours of intensive training and practice.' },
            { t: 'Percentage of personal wealth earned after 40: 85–90%. Most people build wealth slowly and only hit their stride at 40, 50, or even 60.' },
            { t: 'Social currency: more is not always better.', note: 'Count how many you have: contacts, experts, critical colleagues, and supporters.' },
            { t: 'Number of career supporters: find 3–5 people who can truly be called mentors.' }
          ]
        }
      ]
    },
    'yj-02': {
      book: 'The Long View',
      title: 'Career Fuel 1 · Transferable Skills',
      intro: ['Transferable skills are the abilities you build throughout your career—the ones you can take from job to job, company to company, and industry to industry.'],
      purpose: 'Inventory the skill assets you can take with you—credentials, languages, strengths others repeatedly mention, and emotional-intelligence feedback—to see your true transferable capital.',
      sections: [
        {
          heading: 'Inventory Your Transferable Skills',
          items: [
            { t: 'Degrees and professional certifications.' },
            { t: 'Languages, including music and computer languages.' },
            { t: 'Strengths your managers and colleagues often mention in 360-degree performance reviews.' },
            { t: 'What managers and colleagues say about your social and emotional skills (EQ).' },
            { t: 'Your “talent account”: list the people you have hired and/or promoted. Have they continued to grow and advance in their careers? Are the best of them willing to work for you again?' }
          ]
        }
      ]
    },
    'yj-03': {
      book: 'The Long View',
      title: 'Career Fuel 2 · Meaningful Experiences',
      intro: ['Write down meaningful experiences—inside or outside work—that show the diversity of your life and career so far.'],
      purpose: 'Look back on diverse experiences inside and outside work and build a library of evidence for your uniqueness and adaptability.',
      sections: [
        {
          heading: 'A List of Meaningful Experiences',
          items: [
            { t: 'Personal travel.' },
            { t: 'Work experience abroad.' },
            { t: 'Business management or entrepreneurship.' },
            { t: 'Community or volunteer work.' },
            { t: 'Large events, product launches, or well-known projects where you made a personal contribution.' },
            { t: 'Public speaking, writing, or performing.' },
            { t: 'Teaching, consulting, or mentoring.' },
            { t: 'Hobbies, side interests, and passions outside work.' },
            { t: 'Other life experiences and challenges.' }
          ]
        }
      ]
    },
    'yj-04': {
      book: 'The Long View',
      title: 'Career Fuel 3 · Enduring Relationships',
      intro: [],
      purpose: 'Review five kinds of relationships—bosses, clients, business partners, talent around you, and peer communities—to assess the health of your career ecosystem.',
      sections: [
        {
          heading: 'Your Direct Manager',
          items: [
            { t: 'Are you learning the best methods and habits for doing your job?' },
            { t: 'Are you working for a high-performing, respected professional?' },
            { t: 'Are you learning from an entrepreneur who can teach you how to take risks and build other transferable skills?' }
          ]
        },
        {
          heading: 'Clients',
          items: [
            { t: 'If clients truly value you, they will stay with you when you move to another role, company, or even industry.' },
            { t: 'If you were put up for auction online, which clients would bid for you and ask for you by name?' }
          ]
        },
        {
          heading: 'Business Partners',
          items: [
            { t: 'Are you working with excellent business partners—advisors, partner organizations, technology vendors, or headhunters who support and advance your career?' }
          ]
        },
        {
          heading: 'Talent Around You',
          items: [
            { t: 'Did you meet top leaders and experts in your field early in your career?' },
            { t: 'If I started a company, whom around me would I want to bring along? And would they accept my invitation?' }
          ]
        },
        {
          heading: 'Find Your Kindred Spirits',
          items: [
            { t: 'Career networks are increasingly built around communities—take stock of your professional network.' }
          ]
        }
      ]
    },
    'yj-06': {
      book: 'The Long View',
      title: 'Career Paths · Sweet Spot',
      intro: [
        'Sweet spot = the intersection of what you are good at, what you love, and what the world needs.',
        'Follow the thinking chain: define your career vision → inventory your current fuel by Fuel 1/2/3 → add career paths one by one, tick the fuel type for each path, and fill in “fuel you have” and “fuel needed to reach the goal” → needed fuel is automatically summarized above.'
      ],
      purpose: 'Walk through the full worksheet chain: career vision → three types of current fuel → roles and needed fuel for each path (auto-summarized) → find your sweet-spot direction.',
      sections: [
        {
          heading: 'Your Career Vision',
          items: [
            { t: 'Time horizon: how many years will it take?', ph: 'e.g. 10' },
            { t: 'Career vision: what do you want to become or achieve?', ph: 'e.g. a recognized expert in my field' }
          ]
        }
      ]
    },
    'yj-05': {
      book: 'The Long View',
      title: 'Five Big Questions · The Long Term',
      intro: [],
      purpose: 'Use five long-term questions to stress-test your career plan: automation risk, how you will find work, how you will spend your time, financial security, and happiness.',
      foot: 'This note only had the general “Self-Question Checklist” tag on flomo, with no book title. The five questions come from The Long View’s look at the future of careers, so they are grouped here and can be moved later.',
      sections: [
        {
          heading: 'Long-Term Questions',
          items: [
            { t: 'How can I avoid being replaced by machines?' },
            { t: 'Where and how can I find work?' },
            { t: 'How will I spend my time in the future?' },
            { t: 'Will I run out of money?' },
            { t: 'How can work make me happier?' }
          ]
        }
      ]
    },
    'yj-07': {
      book: 'The Long View',
      title: 'Career Inventory · The Four Golden Questions',
      intro: [
        'Review your most useful skills, experiences, and relationships; assess your current career stage; and map your career ecosystem—the contacts, experts, colleagues, and supporters that are critical to your success.',
        'Set career goals and use the four golden questions to produce an Annual Career Value Assessment: in the coming year, what matters most—learning, impact, fun, or reward?'
      ],
      purpose: 'Use the four golden questions for an annual career value assessment: how much weight do learning, impact, fun, and reward each carry? Set goals for next year.',
      sections: [
        {
          heading: 'The Four Golden Questions (set goals for next year; assign weights that add up to 100%)',
          items: [
            { t: 'Am I learning and growing?' },
            { t: 'Am I having an impact on people, my company, or society?' },
            { t: 'Am I having fun?' },
            { t: 'Am I being appropriately rewarded and creating economic value?' }
          ]
        }
      ]
    },
    'yj-08': {
      book: 'The Long View',
      title: 'The 100-Day Audit',
      intro: [
        'If you take your career seriously, you need to learn more about how the company works: how it was built, what it believes, how it makes money, who its key people are, and where it is headed.',
        'If the usual onboarding presentations do not answer these questions, make finding the answers your first 100-day task.'
      ],
      purpose: 'Treat your first 100 days as an audit: understand how the company works, build your career ecosystem, and choose an early topic to master.',
      sections: [
        {
          heading: 'Your First 100 Days',
          items: [
            { t: 'Do your job well, read the annual report, and find external analysts’ assessments of the company.' },
            { t: 'Over coffee breaks, ask new and long-serving employees about the company’s internal news.' },
            { t: 'Join internal clubs, teams, or professional networks to get more involved.' },
            { t: 'Volunteer to help at company events and give it your best.' },
            { t: 'Build your career ecosystem of contacts, experts, critical colleagues, and supporters.' }
          ]
        },
        {
          heading: 'Master an Early Specialty',
          items: [
            { t: 'Early in your career, choose a few topics to master and become the person others consult—it does not have to be deep technical expertise; recurring problems or topics work well.' }
          ]
        }
      ]
    },
    'ot-01': {
      book: 'A More Beautiful Question',
      title: 'Essential Questions · Adapting to Change',
      intro: ['Figuring out what a new situation means for you and what opportunities it creates requires a plan to improve yourself. Before acting, the most important step is to ask foundational questions. We need more than a one-off adaptation: we need to keep changing and adapting skillfully.'],
      purpose: 'When facing change, start with foundational questions: what is changing in your field, how trends affect you, what skills to learn, and whether to work for others or start your own business.',
      sections: [
        {
          heading: '5 Foundational Questions',
          items: [
            { t: 'What is changing in my field or industry?' },
            { t: 'Which trends affect my field most? How will they play out over the next few years?' },
            { t: 'Which of my skills is most useful and best equips me to adapt? What new skills do I need to learn?' },
            { t: 'Should I develop many skills or master just one?' },
            { t: 'Should I think more about finding a job, or should I start my own business?' }
          ]
        }
      ]
    },
    'ot-02': {
      book: 'Zhang Xiaoyu’s Business Case Course',
      title: 'Four Thought Experiments · Is This Worth Doing?',
      intro: ['Main question: Is this something you want to do—something worth doing? Is your main reason the thing itself, or some side benefit?'],
      purpose: 'Use four thought experiments to separate intrinsic from extrinsic motivation and judge whether something is truly worth doing.',
      sections: [
        {
          heading: 'Four Thought Experiments',
          items: [
            { t: 'Thought experiment 1: If you were given all the side benefits of doing this, would you still want to do it?' },
            { t: 'Thought experiment 2: If you could only do this quietly and could never tell anyone, would you still want to do it?', note: 'This question separates intrinsic motivation from extrinsic motivation.' },
            { t: 'Thought experiment 3: Suppose you want to know whether A is something you truly love. Imagine another thing you love just as much, B. An alien says: I can give you unlimited resources to help you slowly master A over the rest of your life—but only if you never do B again. Would you accept?', note: 'To judge what you truly love, do not ask how much pleasure it gives you; ask what you are willing to give up, sacrifice, or pay for it.' },
            { t: 'Thought experiment 4: If you knew you would die in ten years, would you still want to do this?' }
          ]
        }
      ]
    },
    'ot-03': {
      book: 'Jingjin: Becoming Formidable (Revised)',
      title: 'Auditing and Adjusting Your Time Perspective',
      intro: [],
      purpose: 'Audit your time perspective (past / present / future orientation) and create an actionable plan for how you use your time.',
      sections: [
        {
          heading: 'Audit Your Current Time Perspective',
          items: [
            { t: 'Do you often think about the past? Mostly happy or unhappy memories? How do they affect your present life?' },
            { t: 'Do you believe the most important thing is to enjoy the present and do what you love? Do you often ignore consequences or give in to temptation and do things that harm your future?' },
            { t: 'Do you feel powerless to change many things through your own efforts? Or that the future is too uncertain to plan for?' },
            { t: 'Do you have goals for the future and a plan to achieve them? Do you often pursue those goals at the expense of your health, rest, or the feelings of people around you?' }
          ]
        },
        {
          heading: 'Adjust How You Use Your Time',
          items: [
            { t: 'Name 3–5 things that went wrong in the past and write down the positive message each may carry. How might they benefit your future?' },
            { t: 'Review what you have done recently: what only benefits the present but has little or even negative value for the future? Which of these will you do less often? How will you avoid them?' },
            { t: 'List 3–5 achievements that gave you the greatest sense of fulfillment. What impact did they have on you or others?' },
            { t: 'Write down 3–5 goals you want to achieve in the next five years and how you will achieve them.' },
            { t: 'Apart from work, write down 3–5 things you plan to do every week to relax.' },
            { t: 'Write down one hobby you want to keep long term and how many hours a week you will devote to it.' }
          ]
        }
      ]
    },
    'ot-04': {
      book: 'How to Know a Person',
      title: 'Three Themes and Three Cards',
      intro: ['Questions around three themes—to help me step back from daily distractions and think from a broader perspective.'],
      purpose: 'Use three themes and three cards to compare “what I want to do” with “what I am actually doing,” and write an action strategy to close the gap.',
      sections: [
        {
          heading: '3 Themes',
          desc: 'Answer the three questions together to see your goals, skills, and schedule.',
          items: [
            { t: 'My ultimate goal: What do you want to contribute to the world?' },
            { t: 'My skills: When do you feel most alive?' },
            { t: 'My schedule: How do you spend each day?' }
          ]
        },
        {
          heading: '3 Cards',
          desc: 'For each theme above, write what you want to do, what you are actually doing, and your action strategy.',
          items: [
            { t: 'Card 1: List what I truly want to do.' },
            { t: 'Card 2: List what I am actually doing.' },
            { t: 'Card 3: Write a strategy for making what I am doing align more closely with what I want to do.' }
          ]
        }
      ]
    }
  }
};

if (typeof module !== 'undefined' && module.exports) module.exports = CHECKLIST_EN;
