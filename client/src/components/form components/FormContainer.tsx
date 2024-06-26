import { FormEvent } from 'react';
import { useMultistepForm } from '../../hooks/useMultipageForm.js';
import { Headers } from './FormPartOne.js';
import useAppContext from '../../hooks/useContext.js';
import { FormContainerProps } from '../../../../Types/index.js';
import DynamicTest from './dynamicWordList.js';

export function FormContainer({ handleSave }: Readonly<FormContainerProps>) {
  const steps = [<Headers key={1} />, <DynamicTest key={3} />];
  const { userSubmission } = useAppContext();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (isLastStep) {
      handleSave(userSubmission);
    } else {
      next();
    }
  }

  const { currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm(steps);
  return (
    <div className="relative p-2 m-2 font-roboto bg-white min-w-[33rem]">
      <form onSubmit={onSubmit}>
        {/* div to show current step in form */}
        <div className=" h-96 absolute top-0.5 right-0.5 ">
          {currentStepIndex + 1}/{steps.length}
        </div>
        {step}
        <div className="w-max mt-2 flex ml-auto">
          {!isFirstStep && (
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l border-r-2"
              onClick={back}
            >
              Back
            </button>
          )}

          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            type="submit"
          >
            {isLastStep ? 'Finish' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
}
