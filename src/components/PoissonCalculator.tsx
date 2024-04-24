import React, { useState } from 'react';
import styles from './Calculator.module.css';

interface PoissonCalculatorProps {
    numbers: number[];
}

const PoissonCalculator: React.FC<PoissonCalculatorProps> = ({ numbers }) => {
    const [lambda, setLambda] = useState<number>(0);
    const [calcType, setCalcType] = useState<string>('greater');
    const [value, setValue] = useState<number>(0);
    const [percentage, setPercentage] = useState<string>('');

    const factorial = (n: number): number => {
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    };

    const poissonPMF = (lambda: number, k: number): number => {
        return Math.exp(-lambda) * Math.pow(lambda, k) / factorial(k);
    };

    const handleCalculate = () => {
        let cumulativeProbability = 0;
        const maxK = Math.max(...numbers);

        switch (calcType) {
            case 'greater':
                for (let i = value + 1; i <= maxK; i++) {
                    cumulativeProbability += poissonPMF(lambda, i);
                }
                break;
            case 'greater_equal':
                for (let i = value; i <= maxK; i++) {
                    cumulativeProbability += poissonPMF(lambda, i);
                }
                break;
            case 'less':
                for (let i = 0; i < value; i++) {
                    cumulativeProbability += poissonPMF(lambda, i);
                }
                break;
            case 'less_equal':
                for (let i = 0; i <= value; i++) {
                    cumulativeProbability += poissonPMF(lambda, i);
                }
                break;
            case 'equal':
                cumulativeProbability = poissonPMF(lambda, value);
                break;
        }
        setPercentage((cumulativeProbability * 100).toFixed(2) + '%');
    };

    return (
        <div>
            <div>
                <label>λ (tasa media de ocurrencia): </label>
                <input
                    type="number"
                    value={lambda}
                    onChange={e => setLambda(Number(e.target.value))}
                />
            </div>
            <div>
                <label>Calcular probabilidad: </label>
                <select value={calcType} onChange={e => setCalcType(e.target.value)}>
                    <option value="greater">P(X &gt; a)</option>
                    <option value="greater_equal">P(X ≥ a)</option>
                    <option value="less">P(X &lt; a)</option>
                    <option value="less_equal">P(X ≤ a)</option>
                    <option value="equal">P(X = a)</option>
                </select>
            </div>
            <div>
                <label>
                  {calcType === 'greater' ? 'X > ' :
                  calcType === 'greater_equal' ? 'X ≥ ' :
                  calcType === 'less' ? 'X < ' :
                  calcType === 'less_equal' ? 'X ≤ ' : 'X = '}
                </label>
                <input type="number" value={value} onChange={e => setValue(Number(e.target.value))} />
            </div>
            <button className={styles.calculateButton} onClick={handleCalculate}>Calcular</button>
            <div className={styles.percentageContainer}>
                <h3>Probabilidad: {percentage}</h3>
            </div>
        </div>
    );
};

export default PoissonCalculator;
