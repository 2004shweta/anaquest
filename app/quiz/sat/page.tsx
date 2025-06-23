import React from 'react';
import AssessmentCard from '@/components/AssessmentCard';

const assessments = [
  { testName: 'SAT Reading', testType: 'Reading', questions: 52, minutes: 65, imageUrl: '/file.svg' },
  { testName: 'SAT Writing and Language', testType: 'Writing', questions: 44, minutes: 35, imageUrl: '/file.svg' },
  { testName: 'SAT Math (No Calculator)', testType: 'Math', questions: 20, minutes: 25, imageUrl: '/file.svg' },
  { testName: 'SAT Math (Calculator)', testType: 'Math', questions: 38, minutes: 55, imageUrl: '/file.svg' },
];

const SATQuizPage = () => {
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

export default SATQuizPage; 