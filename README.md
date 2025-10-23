NaijaBiz Shield - Nigerian SME Digital Resilience Platform


<img width="1366" height="768" alt="Screenshot (32)" src="https://github.com/user-attachments/assets/44fb4751-7122-4866-b346-cf5c7a46d348" />
<img width="1366" height="768" alt="Screenshot (36)" src="https://github.com/user-attachments/assets/d7de49c5-5d39-4047-bf7f-a7429d6c6b7c" />
<img width="1366" height="768" alt="Screenshot (35)" src="https://github.com/user-attachments/assets/349b5f47-fbd9-4ccc-909b-ec12dae2e6a6" />
<img width="1366" height="768" alt="Screenshot (38)" src="https://github.com/user-attachments/assets/e9dd52de-7fcd-4c7e-b068-ec499b580d59" />


Overview
NaijaBiz Shield is a comprehensive digital security assessment platform specifically designed for Nigerian Small and Medium Enterprises (SMEs). The platform helps businesses identify security vulnerabilities, receive personalized recommendations, and build resilience against cyber threats tailored to the Nigerian business context.

Features
🔒 Security Assessment
10-minute comprehensive assessment covering various security domains

Risk scoring algorithm tailored for Nigerian businesses

Personalized recommendations based on business profile and risk level

PDF report generation with actionable insights

🚨 Threat Intelligence
Real-time threat alerts specific to Nigerian businesses

Current scam patterns and fraud techniques

Localized security recommendations

📊 Business Insights
Risk level classification (Low, Medium, High, Critical)

Industry-specific recommendations

Progress tracking and security improvement guidance

Tech Stack
Backend
FastAPI - Modern Python web framework

SQLAlchemy - Database ORM with async support

PostgreSQL/SQLite - Database options

ReportLab - PDF report generation

Pydantic - Data validation

Frontend
Next.js 14 - React framework with App Router

TypeScript - Type-safe development

Tailwind CSS - Utility-first styling

Lucide React - Modern icons

Project Structure
text
naijabiz-shield/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── security_assessment.py  # Assessment endpoints
│   │   │   └── reports.py              # Statistics endpoints
│   │   ├── core/
│   │   │   ├── config.py               # Application settings
│   │   │   └── database.py             # Database configuration
│   │   ├── models/
│   │   │   └── assessment.py           # Database models
│   │   ├── services/
│   │   │   ├── assessment_service.py   # Business logic
│   │   │   └── pdf_service.py          # Report generation
│   │   └── main.py                     # FastAPI application
│   └── requirements.txt
└── frontend/
    ├── app/
    │   ├── layout.tsx                  # Root layout
    │   ├── page.tsx                    # Homepage
    │   ├── globals.css                 # Global styles
    │   └── security-assessment/        # Assessment pages
    └── components/
        └── assessment/                 # React components

API Endpoints
Security Assessment
GET /api/v1/security/questions - Get assessment questions

GET /api/v1/security/threats - Get current threats

POST /api/v1/security/assess - Submit assessment

GET /api/v1/security/report/{assessment_id} - Generate PDF report

GET /api/v1/security/assessments - Get recent assessments


Reports
GET /api/v1/reports/stats - Get overall statistics

Installation & Setup
Prerequisites
Python 3.8+

Node.js 16+

PostgreSQL (optional, SQLite included for development)

Backend Setup
Clone the repository

bash
git clone <repository-url>
cd naijabiz-shield/backend
Create virtual environment

bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
Install dependencies

bash
pip install -r requirements.txt
Environment configuration
Create a .env file:

env
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/naijabiz_shield
OPENAI_API_KEY=your_openai_key_optional
SECRET_KEY=your-secret-key
Run the application

bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
Frontend Setup
Navigate to frontend directory

bash
cd ../frontend
Install dependencies

bash
npm install
Run the development server

bash
npm run dev
Access the application

Frontend: http://localhost:3000

Backend API: http://localhost:8000

API Documentation: http://localhost:8000/docs

Database Setup
The application supports both PostgreSQL and SQLite:

SQLite (Development - Default)
No setup required - automatically creates naijabiz_dev.db

PostgreSQL (Production)
Create a PostgreSQL database

Update DATABASE_URL in .env

Tables are automatically created on startup

Assessment Categories
The security assessment covers:

Online Payments & Financial Security

Authentication & Access Control

Website & Digital Presence

Social Media Security

Employee Training & Awareness

Software Maintenance

Data Protection & Backups

Business Scale Considerations

Risk Calculation
The platform uses a weighted scoring system:

Low Risk: < 25%

Medium Risk: 25% - 50%

High Risk: 50% - 75%

Critical Risk: > 75%

Threat Alerts
Current threats monitored for Nigerian businesses:

WhatsApp Business Account Hijacking

Fake Bank Alert Scams

Social Engineering Attacks

Payment Fraud

Brand Impersonation

Deployment
Backend Deployment
The FastAPI application can be deployed on:

AWS EC2/Lambda

Google Cloud Run

Heroku

DigitalOcean App Platform

Frontend Deployment
The Next.js application can be deployed on:

Vercel (recommended)

Netlify

AWS Amplify

Railway

Contributing
Fork the repository

Create a feature branch

Commit your changes

Push to the branch

Create a Pull Request

License
This project is proprietary software developed by InspireNova Enterprises for Nigerian SMEs.

Support
For technical support or security concerns:

Create an issue in the repository

Contact the development team

Report security vulnerabilities responsibly

Security Features
CORS protection with allowed origins

Input validation with Pydantic

SQL injection prevention with ORM

Secure file download endpoints

Error handling and logging

Built with ❤️ for Nigerian SMEs by InspireNova Enterprises
