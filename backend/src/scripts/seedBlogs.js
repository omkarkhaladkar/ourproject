import connectDB from '../config/db.js';
import Blog from '../models/Blog.js';

const sampleBlogs = [
  {
    title: 'Why Purandar Is Emerging as Pune’s Next Real Estate Growth Corridor',
    slug: 'why-purandar-is-emerging-as-punes-next-real-estate-growth-corridor',
    featuredImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
    shortDescription: 'A practical look at infrastructure momentum, land availability, and buyer demand shaping Purandar’s real estate story.',
    content: `
      <h2>Growth is no longer speculative</h2>
      <p>Purandar has moved from fringe attention to serious end-user and investor interest. Wider road links, better access to Pune corridors, and the spread of plotted and township-style projects are making the area far more visible.</p>
      <h2>What buyers are responding to</h2>
      <p>Affordability still plays a major role, but buyers are also paying attention to project planning, gated communities, and long-term appreciation potential. That combination is making Purandar stand out against more saturated micro-markets.</p>
      <h3>Key takeaway</h3>
      <p>For buyers who want a balance of entry pricing and future upside, Purandar is becoming a market worth tracking closely.</p>
    `,
    author: 'Purandar Research Desk',
    category: 'Market Trends',
    tags: ['Purandar', 'Pune Real Estate', 'Growth Corridor'],
    metaTitle: 'Why Purandar Is Emerging as Pune’s Next Real Estate Growth Corridor',
    metaDescription: 'Understand why Purandar is attracting growing real estate attention from buyers and investors across Pune.',
    publishDate: new Date('2026-04-01T09:00:00.000Z'),
    status: 'published',
  },
  {
    title: '5 Things to Check Before Buying a New Launch Project in Pune',
    slug: '5-things-to-check-before-buying-a-new-launch-project-in-pune',
    featuredImage: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1400&q=80',
    shortDescription: 'A simple checklist covering RERA, developer track record, possession timeline, pricing structure, and location quality.',
    content: `
      <h2>1. Verify RERA details</h2>
      <p>Always confirm the registration status and promised deliverables of the project before making any booking decision.</p>
      <h2>2. Review the developer’s track record</h2>
      <p>Past delivery quality, handover timelines, and post-possession support matter just as much as brochure design.</p>
      <h2>3. Understand pricing clearly</h2>
      <p>Look beyond the headline rate. Check floor rise, maintenance deposits, parking, taxes, and payment milestones.</p>
      <h2>4. Compare possession realism</h2>
      <p>Ambitious timelines can create buyer frustration. Match promises against construction stage and approvals.</p>
      <h2>5. Study the micro-market</h2>
      <p>Connectivity, demand drivers, and future infrastructure should justify the project story.</p>
    `,
    author: 'Editorial Team',
    category: 'Buying Guide',
    tags: ['New Launch', 'Buying Guide', 'Pune'],
    metaTitle: '5 Things to Check Before Buying a New Launch Project in Pune',
    metaDescription: 'Use this practical checklist before booking a new launch project in Pune or nearby growth corridors.',
    publishDate: new Date('2026-03-28T10:30:00.000Z'),
    status: 'published',
  },
  {
    title: 'Plots vs Apartments in Purandar: Which Investment Fits You Better?',
    slug: 'plots-vs-apartments-in-purandar-which-investment-fits-you-better',
    featuredImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80',
    shortDescription: 'A side-by-side view of capital growth, liquidity, holding period, and end-use flexibility for two popular asset types.',
    content: `
      <h2>Plots offer flexibility</h2>
      <p>Plots attract buyers who want independent future use, lower maintenance overhead, and a longer investment horizon.</p>
      <h2>Apartments offer convenience</h2>
      <p>Ready or under-construction apartments are easier for many buyers to visualize, finance, and occupy or rent out.</p>
      <h2>How to choose</h2>
      <p>If your priority is near-term usability and community infrastructure, apartments usually fit better. If your focus is land-led appreciation and custom use later, plots may be a stronger match.</p>
    `,
    author: 'Investment Insights',
    category: 'Investment',
    tags: ['Plots', 'Apartments', 'Investment'],
    metaTitle: 'Plots vs Apartments in Purandar: Which Investment Fits You Better?',
    metaDescription: 'Compare plots and apartments in Purandar by flexibility, appreciation, convenience, and buyer suitability.',
    publishDate: new Date('2026-03-20T08:15:00.000Z'),
    status: 'published',
  },
];

const run = async () => {
  await connectDB();

  for (const blog of sampleBlogs) {
    await Blog.findOneAndUpdate(
      { slug: blog.slug },
      { $set: blog },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  }

  console.log(`Seeded ${sampleBlogs.length} blog posts.`);
  process.exit(0);
};

run().catch((error) => {
  console.error('Failed to seed blogs', error);
  process.exit(1);
});
