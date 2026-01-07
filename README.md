arun: Intelligent RTRWH Matrix 🌧️💧

Varun is a high-fidelity Rooftop Rainwater Harvesting (RTRWH) assessment and management platform. It bridges the gap between individual households and technical excellence by providing data-driven harvesting simulations, expert field verification, and a gamified community engagement program.

🚀 Key Features

DIY Assessment Wizard: High-speed simulation engine to calculate rooftop harvesting potential.

Expert Field Audit: Professional workflow for on-site verification with instant digital report generation.

Water Guardian Program: A robust gamification system with XP, Levels, and Badges to encourage environmental action.

Economic Feasibility Engine: Real-time ROI and Payback period analysis based on current utility rates.

PDF Report Generator: One-click professional technical documentation for verified sites.

IoT & Government Dashboards: Scalable infrastructure for real-time node monitoring and compliance tracking.

🧠 Core Algorithms & Formulas

The platform utilizes industry-standard hydrological and economic formulas based on the Central Ground Water Board (CGWB) Manual 2007.

1. Catchment Potential Algorithm

Calculates the maximum harvestable water from a specific surface area.

Formula: $V = A \times R \times C$

A: Rooftop Area ($m^2$)

R: Annual Rainfall ($mm$)

C: Runoff Coefficient (Standardized at $0.85$ for concrete)

2. Optimized Tank Sizing

Clamps storage capacity to ensure economic and spatial efficiency for residential units.

Logic: Targets $10\%$ of annual potential volume.

Minimum Floor: $2,000L$

Maximum Cap: $20,000L$

3. CAPEX Estimation Logic (Direct Storage focus)

Calculates initial investment costs by summing specific system components:

Storage: Capacity $\times$ $₹7.50/L$

Piping: Estimated perimeter length $\times$ $₹350/m$

Fixed Assets: Filtration Unit ($₹12,000$) + Installation Labor ($₹15,000$)

4. Economic ROI Analysis

Annual Benefit: $(\text{Liters Saved} / 1000) \times ₹60$ (Avg. utility cost)

Payback Period: $\text{Total Cost} / \text{Annual Benefit}$

B/C Ratio: $(\text{Annual Benefit} \times 20 \text{ Years}) / \text{Total Cost}$

🎮 Gamification: The Water Guardian Program

To drive adoption, Varun implements a "Water Guardian" XP system:

Action

Reward

Identity Verification

+50 XP

DIY Site Analysis

+100 XP

Field Visit Scheduled

+250 XP

Technical Report Export

+500 XP

Levels: Level increases every 500 XP.
Missions: Users can track community rankings and earn badges like Eco-Pioneer and Earth Keeper.

🛠️ Tech Stack

Frontend: React 18, TypeScript, Tailwind CSS

Animations: Framer Motion

Icons: Lucide-React

Backend: Supabase (PostgreSQL, Auth, Real-time)

Compliance: CGWB 2007 Guidelines

📦 Installation & Setup

Clone the repository

git clone [https://github.com/your-username/varun-rtrwh.git](https://github.com/your-username/varun-rtrwh.git)



Install dependencies

npm install



Environment Variables
Create a .env file and add your Supabase credentials:

VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key



Run Development Server

npm run dev



🏛️ Compliance & Standards

Varun is engineered to follow the regulatory frameworks provided by the Central Ground Water Board (CGWB) and the Ministry of Jal Shakti, Government of India
