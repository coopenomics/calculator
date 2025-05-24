import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CalculatorPage, WizardCalculatorPage } from '../../pages/calculator';

export const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CalculatorPage />} />
      <Route path="/wizard" element={<WizardCalculatorPage />} />
      {/* Роутер оставлен для будущего расширения */}
    </Routes>
  );
}; 