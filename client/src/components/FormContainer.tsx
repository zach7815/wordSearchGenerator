import { FormEvent } from 'react';
import { useMultistepForm } from '../hooks/useMultipageForm';
import { Headers } from './ChooseHeaders';
import { DifficultiesAndWords } from './difficultiesAndWordsInput';
import useAppContext from '../hooks/useContext';
import { FormContainerProps } from '../../../Types';
import { DynamicWordList } from './dynamicWordlist';

export function FormContainer({ handleSave }: Readonly<FormContainerProps>) {
  const steps = [
    <Headers key={1} />,
    <DifficultiesAndWords key={2} />,
    <DynamicWordList key={3} />,
  ];
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
    <div className="relative p-2 m-2 font-roboto bg-white">
      <form onSubmit={onSubmit}>
        {/* div to show current step in form */}
        <div
          className="form-outer-wrapper"
          style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
        >
          {currentStepIndex + 1}/{steps.length}
        </div>
        {step}
        <div className="form-inner-wrapper">
          {!isFirstStep && (
            <button type="button" onClick={back}>
              Back
            </button>
          )}

          <button type="submit">{isLastStep ? 'Finish' : 'Next'}</button>
        </div>
      </form>
    </div>
  );
}
