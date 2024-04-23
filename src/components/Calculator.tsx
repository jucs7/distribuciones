/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styles from './Calculator.module.css';
import ExponentialCalculator from './ExponentialCalculator';

interface CalculatorProps {
    distribution: string;
    numbers: number[];
}

const Calculator: React.FC<CalculatorProps> = ({ distribution, numbers }) => {

    const renderDistributionCalculator = () => {
        switch (distribution) {
            case 'Exponencial':
                return <ExponentialCalculator numbers={numbers}/>;
            // Agregar casos para otras distribuciones
            default:
                return <div>Seleccione una distribución válida</div>;
        }
    };

    return (
        <div className={styles.calculatorContainer}>
            <h2 className={styles.heading}>Distribución {distribution}</h2>
            <h3>Números pseudoaleatorios</h3>
            <div className={styles.numbersContainer}>
                {numbers.map((number, index) => (
                    <div key={index}>{number}</div>
                ))}
            </div>
            {renderDistributionCalculator()}
        </div>
    );
};

export default Calculator;
