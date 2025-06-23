import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface AssessmentCardProps {
  testName: string;
  testType: string;
  questions: number;
  minutes: number;
  imageUrl: string;
}

const AssessmentCard: React.FC<AssessmentCardProps> = ({ testName, testType, questions, minutes, imageUrl }) => {
  return (
    <Card className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="bg-purple-200 p-4 relative">
            <div className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded">PRACTICE</div>
            <div className="flex justify-center items-center">
                <Image src={imageUrl} alt={testName} width={100} height={100} />
            </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-bold">{testName}</CardTitle>
        <p className="text-sm text-gray-600">{testType}</p>
        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <span>{questions} questions</span>
          <span>{minutes} minutes</span>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">View</Button>
      </CardFooter>
    </Card>
  );
};

export default AssessmentCard; 