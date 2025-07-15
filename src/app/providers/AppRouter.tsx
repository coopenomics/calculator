import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CalculatorPage, WizardCalculatorPage } from '../../pages/calculator';
import { useUrlParams } from '../../shared';

export const AppRouter: FC = () => {
  const urlParams = useUrlParams();
  
  return (
    <Routes>
      <Route path="/" element={<CalculatorPage initialParams={urlParams} />} />
      <Route path="/wizard" element={<WizardCalculatorPage initialParams={urlParams} />} />
      {/* Роутер оставлен для будущего расширения */}
    </Routes>
  );
}; 