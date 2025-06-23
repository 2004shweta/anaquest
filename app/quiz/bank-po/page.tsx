import React from 'react';
import AssessmentCard from '@/components/AssessmentCard';

const assessments = [
  { testName: 'Bank PO Reasoning', testType: 'Reasoning', questions: 35, minutes: 20, imageUrl: '/file.svg' },
  { testName: 'Bank PO Quantitative Aptitude', testType: 'Quantitative', questions: 35, minutes: 20, imageUrl: '/file.svg' },
  { testName: 'Bank PO English Language', testType: 'English', questions: 30, minutes: 20, imageUrl: '/file.svg' },
];

const BankPOQuizPage = () => {
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

export default BankPOQuizPage; 