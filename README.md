# AI Resume Analyzer

![AI Resume Analyzer](https://placeholder.svg?height=300&width=600&text=AI+Resume+Analyzer)

A modern web application that uses AI to analyze resumes against job descriptions, providing actionable insights to improve job application success rates.

## Features

- **Resume Analysis**: Upload your resume and get AI-powered feedback
- **Job Title Matching**: Compare your resume against specific job titles
- **Comprehensive Insights**: Receive detailed analysis including:
  - Overall match score
  - Keyword matching analysis
  - Section-by-section scoring
  - Suggested improvements for bullet points
  - Missing skills identification
- **Interactive UI**: Modern, responsive interface with animations
- **Error Handling**: Clear error messages with guidance

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Animations**: Framer Motion
- **Charts**: Chart.js
- **API Integration**: Ready for backend integration

## Screenshots

### Upload Page
![Upload Page](https://placeholder.svg?height=300&width=600&text=Upload+Page)

### Results Dashboard
![Results Dashboard](https://placeholder.svg?height=300&width=600&text=Results+Dashboard)

### Analysis Details
![Analysis Details](https://placeholder.svg?height=300&width=600&text=Analysis+Details)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- API key for the resume analysis service

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-resume-analyzer.git
   cd ai-resume-analyzer
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage Guide

### Analyzing a Resume

1. **Upload Your Resume**:
   - Drag and drop your PDF resume or click to browse files
   - Only PDF files are supported

2. **Select a Job Title**:
   - Enter a job title you're applying for
   - Or select from common job title suggestions

3. **Enter Your API Key**:
   - Input your API key for the resume analysis service
   - Contact service provider if you don't have an API key

4. **View Results**:
   - Overall match score
   - Detailed analysis of your resume
   - Suggestions for improvement
   - Keyword matching statistics
   - Section scores

### Understanding Error Messages

- **"Job description is inexistent or invalid"**: The job title you entered couldn't be processed. Try a more common job title.
- **"Resume is too short or not provided"**: Your resume may be too brief or the PDF couldn't be properly parsed. Ensure your PDF is properly formatted.

## API Integration

The application is designed to work with a resume analysis API. To integrate with your own backend:

1. Update the API endpoint in `components/upload-form.tsx`:
   ```
   // Replace with your actual API endpoint
   const response = await fetch('https://your-api-endpoint.com/analyze', {
     method: 'POST',
     headers: {
       'Authorization': `Bearer ${apiKey}`
     },
     body: formData
   });
   ```

2. Ensure your API returns data in the expected format:
   ```
   type ResumeAnalysis = {
     score: number;
     missingSkills: string[];
     suggestions: string[];
     analysis: string;
     keywordMatch: Record<string, number>;
     missingKeywords: string[];
     rewrites: Array<{ original: string; improved: string }>;
     sectionScores: Record<string, number>;
   };
   ```

## Customization

### Styling

The application uses Tailwind CSS for styling. You can customize the look and feel by modifying:

- `tailwind.config.ts` - For theme colors and other Tailwind settings
- Component-specific styles in their respective files

### Job Title Suggestions

To update the job title suggestions, modify the `JOB_TITLE_SUGGESTIONS` array in `components/upload-form.tsx`:

```
const JOB_TITLE_SUGGESTIONS = [
  "Software Engineer",
  "Full Stack Developer",
  // Add or modify job titles here
];
```

## Deployment

This application can be easily deployed to Vercel:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Configure environment variables if needed
4. Deploy

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework used
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [shadcn/ui](https://ui.shadcn.com/) - For UI components
- [Framer Motion](https://www.framer.com/motion/) - For animations
- [Chart.js](https://www.chartjs.org/) - For data visualization
