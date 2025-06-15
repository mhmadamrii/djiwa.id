import { useState } from 'react';
import { JewerlyForm } from '@/components/forms/jewerly-form';
import { createFileRoute } from '@tanstack/react-router';
import { AnimatedStepper } from '@/components/ui/stepper';
import { Card } from '@/components/ui/card';
import { JewerlyUploadForm } from '@/components/forms/jewerly-upload-form';
import { JewerlyPublishForm } from '@/components/forms/jewerly-publish-form';

export const Route = createFileRoute('/_mainLayout/_main/publishing')({
  component: RouteComponent,
});

const steps = [
  {
    number: 1,
    label: 'Asset',
  },
  {
    number: 2,
    label: 'Upload',
  },
  {
    number: 3,
    label: 'Additional',
  },
  {
    number: 4,
    label: 'Publish',
  },
];

function RouteComponent() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleStepClick = (stepNumber: number) => {
    setCurrentStep(stepNumber);
  };

  const getFormStepper = () => {
    switch (currentStep) {
      case 1:
        return <JewerlyForm onStepClick={handleStepClick} />;
      case 2:
        return <JewerlyUploadForm onStepClick={handleStepClick} />;
      case 4:
        return <JewerlyPublishForm />;
      default:
        break;
    }
  };

  return (
    <section className='px-10 flex flex-col gap-5'>
      <h1 className='text-xl font-semibold'>Publishing</h1>
      <Card className='w-full flex flex-col min-h-[600px]'>
        <div className='w-full'>
          <AnimatedStepper
            steps={steps}
            currentStep={currentStep}
            onStepClick={handleStepClick}
          />
        </div>
        {getFormStepper()}
      </Card>
    </section>
  );
}
