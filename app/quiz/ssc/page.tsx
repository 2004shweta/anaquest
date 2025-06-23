import React from 'react';
import AssessmentCard from '@/components/AssessmentCard';

const assessments = [
  { testName: 'SSC General Intelligence', testType: 'Reasoning', questions: 25, minutes: 60, imageUrl: '/file.svg' },
  { testName: 'SSC General Awareness', testType: 'GK', questions: 25, minutes: 60, imageUrl: '/file.svg' },
  { testName: 'SSC Quantitative Aptitude', testType: 'Math', questions: 25, minutes: 60, imageUrl: '/file.svg' },
  { testName: 'SSC English Comprehension', testType: 'English', questions: 25, minutes: 60, imageUrl: '/file.svg' },
];

const SSCQuizPage = () => {
  return (
    <div className="container mx-auto p-4">
        <h2 className="text-xl font-semibold my-8 text-gray-800 dark:text-white">113 Assessments</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {assessments.map((assessment, index) => (
            <AssessmentCard key={index} {...assessment} />
          ))}
        </div>
    </div>
  );
};

export default SSCQuizPage; 