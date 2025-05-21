import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CalculatorPage } from '../../pages/calculator';

export const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CalculatorPage />} />
      {/* Роутер оставлен для будущего расширения */}
    </Routes>
  );
}; 