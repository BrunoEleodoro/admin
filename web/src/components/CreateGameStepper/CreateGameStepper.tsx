import { CheckIcon } from '@radix-ui/react-icons';

interface Step {
  title: string;
  description: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export function CreateGameStepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="mb-8">
      <ol className="flex items-center w-full">
        {steps.map((step, index) => (
          <li
            key={index}
            className={`flex items-center ${
              index < steps.length - 1 ? 'w-full' : ''
            } ${index < currentStep ? 'text-blue-600' : 'text-gray-500'}`}
          >
            <span className={`flex items-center justify-center w-8 h-8 border ${
              index < currentStep ? 'border-blue-600' : 'border-gray-500'
            } rounded-full lg:h-10 lg:w-10 ${
              index === currentStep ? 'bg-blue-100' : ''
            }`}>
              {index < currentStep ? (
                <CheckIcon className="w-5 h-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </span>
            <span className="ml-2 text-sm">{step.title}</span>
            {index < steps.length - 1 && (
              <div className={`w-full h-0.5 ml-2 ${
                index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
              }`}></div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}