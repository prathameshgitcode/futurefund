import type { KnowledgeArticle } from "@/types";

export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: "mutual-funds-101",
    title: "Mutual Funds 101: A Beginner's Guide",
    excerpt:
      "Everything you need to know before starting your first investment in Mutual Funds.",
    category: "Basics",
    level: "Beginner",
    readTime: "6 min read",
    image: "/images/knowledge/mutual-funds-101.jpg",
    author: "Expert Panel",
    date: "2024-01-12",
    tags: ["basics", "mutual funds"],
    content: `A mutual fund pools money from thousands of investors and uses that combined capital to buy a basket of stocks, bonds, or other securities. Instead of picking individual shares yourself, a professional fund manager does the research and makes the calls, and you own a proportional slice of everything the fund holds through "units."

The biggest advantage for a beginner is instant diversification. A single mutual fund unit might represent ownership across 40-60 different companies, which is far more spread out than most individual investors could manage on their own with a small amount of capital.

Funds are typically categorized by what they invest in — equity funds buy stocks, debt funds buy bonds and fixed-income instruments, and hybrid funds mix both. Within equity, funds are further split by company size (large cap, mid cap, small cap) and strategy (value, growth, sectoral).

Every fund publishes a Net Asset Value (NAV) each business day, which is simply the per-unit price of the fund's total holdings. When you invest, you buy units at that day's NAV; when you redeem, you sell them back at the prevailing NAV.

For a first-time investor, starting with a large cap or flexi cap fund through a monthly SIP is usually the most sensible entry point — it keeps volatility manageable while you get comfortable with how markets move.`,
  },
  {
    id: "sip-vs-lumpsum",
    title: "SIP vs Lumpsum: Which is for you?",
    excerpt:
      "Comparing the two most popular ways to invest seeing which fits your current situation.",
    category: "Strategy",
    level: "Intermediate",
    readTime: "7 min read",
    image: "/images/knowledge/sip-vs-lumpsum.jpg",
    author: "Expert Panel",
    date: "2024-02-03",
    tags: ["sip", "lumpsum", "strategy"],
    content: `A Systematic Investment Plan (SIP) lets you invest a fixed amount every month, while a lumpsum investment puts your entire capital to work on day one. Both are valid ways to enter mutual funds — the right choice depends on your cash flow and your read on market valuations.

SIPs shine for salaried investors who receive predictable monthly income. By spreading purchases over time, you automatically buy more units when prices are low and fewer when prices are high — a mechanism known as rupee cost averaging. This removes the emotional burden of trying to time the market.

Lumpsum investing tends to outperform SIPs mathematically when markets are on a sustained upward run, simply because your full capital is compounding for longer. The catch is that a poorly timed lumpsum — say, right before a correction — can be psychologically difficult to sit through.

A practical middle ground many investors use: if you've received a windfall (bonus, inheritance, maturity proceeds), split it into a lumpsum portion for a stable hybrid or large cap fund, and stagger the rest into equity over 6-12 months via a Systematic Transfer Plan (STP).

There's no universally "correct" answer — what matters is choosing an approach you can stay disciplined with through a full market cycle.`,
  },
  {
    id: "managing-volatility",
    title: "Managing Volatility like a Pro",
    excerpt:
      "How to keep your cool when markets get bumpy and why staying invested is key.",
    category: "Market Insights",
    level: "Intermediate",
    readTime: "5 min read",
    image: "/images/knowledge/managing-volatility.jpg",
    author: "Expert Panel",
    date: "2024-02-20",
    tags: ["volatility", "market insights"],
    content: `Market volatility is not a bug in the system — it's the price of admission for equity returns. Historically, the years with the best long-term outcomes for SIP investors often included some of the sharpest intra-year drawdowns.

The single biggest destroyer of wealth isn't a market crash — it's an investor who panics and exits near the bottom, locking in losses that would otherwise have recovered. Data from multiple market cycles shows that missing just the 10 best trading days over a decade can cut total returns by more than half.

A few practical anchors help during turbulent periods: review your asset allocation only on a fixed schedule (quarterly or half-yearly), avoid checking your portfolio value daily during a downturn, and remind yourself that a SIP actually benefits from lower prices since it buys more units per installment.

If a market fall genuinely changes your risk tolerance — not just your mood — that's a signal to revisit your asset allocation with an advisor, not to make an emotional snap decision.

Volatility is the toll you pay for the higher long-term returns equity offers over debt. Staying invested through it, rather than around it, is what separates compounding wealth from compounding regret.`,
  },
  {
    id: "5-mistakes-sip-investors",
    title: "5 Mistakes Every SIP Investor Should Avoid",
    excerpt:
      "Common pitfalls like stopping SIPs during market lows or ignoring inflation can derail your financial goals.",
    category: "Strategy",
    level: "Intermediate",
    readTime: "8 min read",
    image: "/images/knowledge/5-mistakes.jpg",
    author: "Expert Panel",
    date: "2024-03-01",
    tags: ["mistakes", "sip"],
    featured: true,
    content: `1. Stopping SIPs during a downturn. This is the costliest mistake an investor can make — it converts a temporary paper loss into a permanent one and forfeits the extra units you'd have bought at depressed prices.

2. Ignoring inflation when setting goals. A target corpus calculated in today's rupees will fall badly short 15-20 years from now. Always inflate your target expense before working backward to a required SIP amount.

3. Chasing last year's top-performing fund. Past performance, especially over a single year, has almost no predictive power for future returns. Category consistency over 5-7 years matters far more than a recent hot streak.

4. Never increasing the SIP amount. Keeping your monthly investment flat for a decade while your income grows means your savings rate is quietly shrinking. A step-up SIP that rises 10% annually compounds dramatically better.

5. Over-diversifying across too many funds. Holding 12-15 funds across the same category doesn't reduce risk meaningfully — it just creates an unmanageable, overlapping portfolio that's hard to track or rebalance.`,
  },
  {
    id: "2024-market-outlook",
    title: "The 2024 Market Outlook: Navigating Volatility with SIPs",
    excerpt:
      "Learn why staying disciplined during market fluctuations is the key to creating long-term wealth in the current economy.",
    category: "Market Insights",
    level: "Advanced",
    readTime: "10 min read",
    image: "/images/knowledge/2024-outlook.jpg",
    author: "Expert Panel",
    date: "2024-01-05",
    tags: ["outlook", "market insights"],
    featured: true,
    content: `Indian equity markets enter this year carrying a mix of structural tailwinds — resilient domestic consumption, a broadening manufacturing base, and steady retail SIP inflows — alongside familiar headwinds like global rate uncertainty and geopolitical risk.

Domestic SIP flows have become a genuine stabilizing force. Where foreign portfolio flows can reverse sharply on global cues, the steady monthly inflow from retail SIPs has increasingly absorbed volatility that would previously have caused deeper corrections.

Valuations across large caps remain closer to long-term averages than mid and small caps, which have run ahead of earnings growth in several pockets. This divergence argues for a portfolio tilted toward quality large and flexi cap exposure, with measured, not aggressive, exposure to smaller companies.

For SIP investors specifically, the macro noise matters far less than the math of staying invested through a full cycle. A well-diversified equity SIP, continued without interruption through both up and down years, has historically delivered returns that comfortably outpace inflation and most alternative asset classes over a 7-10 year horizon.

The discipline to keep contributing — not the ability to predict the next quarter's headlines — remains the dominant driver of long-term outcomes.`,
  },
  {
    id: "sip-basics-101",
    title: "SIP Basics 101",
    excerpt:
      "Start your investment journey with foundational concepts of Systematic Investment Plans.",
    category: "Basics",
    level: "Beginner",
    readTime: "5 min read",
    image: "/images/knowledge/sip-basics.jpg",
    author: "Expert Panel",
    date: "2024-01-02",
    tags: ["basics", "sip"],
    content: `A Systematic Investment Plan, or SIP, is simply a standing instruction to invest a fixed sum into a mutual fund on a set date each month — much like a recurring deposit, but into market-linked assets instead of a fixed-rate account.

Setting one up takes minutes: choose a fund, decide an amount (most platforms allow as little as ₹500), pick a debit date, and authorize an auto-debit mandate from your bank account. From there, the investment happens automatically every month without further action.

The two structural benefits of a SIP are discipline and rupee cost averaging. Discipline, because the money leaves your account before you have a chance to spend it elsewhere. Rupee cost averaging, because a fixed rupee amount buys more units when the market is down and fewer when it's up — smoothing your average purchase price over time.

SIPs can be paused, increased, decreased, or stopped at any time with no penalty, which makes them a flexible starting point for anyone beginning their investing journey, regardless of income level.`,
  },
  {
    id: "power-of-compounding",
    title: "Power of Compounding",
    excerpt:
      "Understand the 8th wonder of the world and how it builds wealth silently over decades.",
    category: "Basics",
    level: "Beginner",
    readTime: "4 min read",
    image: "/images/knowledge/compounding.jpg",
    author: "Expert Panel",
    date: "2024-01-08",
    tags: ["basics", "compounding"],
    content: `Compounding is the process of earning returns not just on your original investment, but on the returns it has already generated. Over short periods, the effect looks negligible. Over decades, it becomes the single biggest driver of wealth creation.

Consider a monthly SIP of ₹10,000 earning a steady 12% annually. After 10 years, the invested amount is ₹12 lakh, but the corpus has grown to roughly ₹23 lakh. After 20 years, the invested amount doubles to ₹24 lakh, but the corpus balloons to nearly ₹1 crore — the extra decade didn't just add proportional growth, it multiplied it.

The reason compounding feels invisible early on is that the absolute rupee gains in year one or two are small. It's only once the base capital grows large enough that the annual gains themselves start to resemble a meaningful income that the curve visibly bends upward.

The practical takeaway: time in the market consistently beats timing the market. Starting five years earlier, even with a smaller monthly amount, will usually outperform starting later with a larger one — simply because compounding needs runway more than it needs size.`,
  },
  {
    id: "asset-allocation-strategies",
    title: "Asset Allocation Strategies",
    excerpt:
      "Level up your strategy with diversification techniques for long-term growth.",
    category: "Intermediate",
    level: "Intermediate",
    readTime: "7 min read",
    image: "/images/knowledge/asset-allocation.jpg",
    author: "Expert Panel",
    date: "2024-01-18",
    tags: ["strategy", "allocation"],
    content: `Asset allocation — how you split your money across equity, debt, gold, and cash — has a far bigger impact on long-term portfolio outcomes than which individual fund you pick within any single category.

A common starting framework is the "100 minus age" rule: subtract your age from 100 to get a rough equity allocation percentage, with the remainder in debt. A 30-year-old might hold 70% equity, 30% debt; a 55-year-old might flip that closer to 40/60. It's a starting point, not a rigid formula — risk tolerance and goal timelines matter just as much as age.

Within equity, diversifying across large, mid, and flexi cap categories spreads company-size risk. Within debt, mixing short-duration and corporate bond funds balances interest-rate sensitivity against credit risk.

Rebalancing — periodically selling some of what's grown and buying more of what's lagged to restore your target ratios — is the unglamorous discipline that actually protects returns. Without it, a portfolio that started at 70/30 equity-debt can silently drift to 85/15 after a strong equity rally, taking on far more risk than originally intended.`,
  },
  {
    id: "rupee-cost-averaging",
    title: "Rupee Cost Averaging",
    excerpt:
      "How investing a fixed amount regularly smooths out market volatility over time.",
    category: "Intermediate",
    level: "Intermediate",
    readTime: "5 min read",
    image: "/images/knowledge/rupee-cost-averaging.jpg",
    author: "Expert Panel",
    date: "2024-01-22",
    tags: ["strategy", "rupee cost averaging"],
    content: `Rupee cost averaging is the mechanism that makes SIPs resilient to market timing risk. Because you invest the same fixed amount each month regardless of price, you automatically purchase more fund units when the NAV is low and fewer when it's high.

Over time, this means your average cost per unit tends to land below the simple average of the NAV across the period — a mathematical quirk that works in the investor's favor specifically because the investment amount is fixed, not the unit count.

This is most powerful during sideways or declining markets, where a lumpsum investor sees their capital stagnate or shrink while a SIP investor is quietly accumulating units at increasingly favorable prices, setting up for outsized gains whenever the market recovers.

The trade-off is that in a market that rises steadily without major dips, a lumpsum investment will usually outperform a SIP, since all the capital was compounding from day one. Rupee cost averaging is a volatility-management tool, not a guarantee of higher absolute returns — its real value is reducing the regret and risk of bad timing.`,
  },
  {
    id: "advanced-market-insights",
    title: "Advanced Market Insights",
    excerpt:
      "Deep dive into market cycles, technical indicators, and rebalancing strategies.",
    category: "Advanced",
    level: "Advanced",
    readTime: "12 min read",
    image: "/images/knowledge/advanced-insights.jpg",
    author: "Expert Panel",
    date: "2024-02-10",
    tags: ["advanced", "market cycles"],
    content: `Market cycles typically move through four broad phases: accumulation (smart money quietly buying after a downturn), markup (the visible bull run), distribution (institutional selling into retail enthusiasm), and markdown (the correction). Recognizing which phase dominates sentiment — without trying to pinpoint exact turning points — helps frame portfolio decisions more rationally.

Valuation indicators like trailing and forward P/E ratios, and metrics such as market-cap-to-GDP, are useful as broad temperature gauges rather than precise timing signals. Extreme readings in either direction have historically preceded mean reversion, but "extreme" can persist for longer than most investors expect.

For systematic rebalancing, a threshold-based approach (rebalance whenever an asset class drifts more than 5 percentage points from target) tends to outperform purely calendar-based rebalancing (e.g. every January), since it responds to actual portfolio drift rather than an arbitrary date.

Sector rotation — the tendency for capital to flow from one sector to another as the economic cycle progresses — is a genuine phenomenon, but acting on it requires both correctly reading the macro environment and being early enough to capture the rotation before it's already priced in. For most long-term SIP investors, a diversified flexi cap allocation captures the benefit of sector rotation passively, without the timing risk of active sector calls.`,
  },
  {
    id: "tax-harvesting-in-sips",
    title: "Tax Harvesting in SIPs",
    excerpt:
      "Sophisticated portfolio rebalancing strategies to optimize your tax outgo.",
    category: "Advanced",
    level: "Advanced",
    readTime: "9 min read",
    image: "/images/knowledge/tax-harvesting.jpg",
    author: "Expert Panel",
    date: "2024-02-15",
    tags: ["advanced", "tax"],
    content: `Tax loss harvesting involves strategically redeeming units that are sitting at a loss to book that loss for tax purposes, then reinvesting in a similar (not identical) fund to maintain your market exposure. The booked loss can offset capital gains elsewhere in your portfolio, reducing your overall tax liability.

For equity mutual funds in India, long-term capital gains (holdings over one year) up to ₹1.25 lakh in a financial year are tax-exempt, with gains above that taxed at 12.5%. Short-term gains (under one year) are taxed at 20%. Because each SIP installment has its own purchase date, a single SIP can contain units that are both long-term and short-term simultaneously — redemptions are matched on a first-in-first-out basis.

A practical harvesting approach: each financial year, identify underperforming or overlapping fund holdings, redeem just enough long-term units to realize gains up to the ₹1.25 lakh exemption threshold (resetting your cost basis tax-free), and reinvest the proceeds.

This requires care — frequent trading purely for tax purposes can also trigger exit loads and disrupt your compounding. Tax harvesting works best as an annual, disciplined exercise rather than a frequent trading strategy, and is generally most useful for larger, more mature portfolios where the tax-exempt threshold is regularly being exceeded.`,
  },
];
