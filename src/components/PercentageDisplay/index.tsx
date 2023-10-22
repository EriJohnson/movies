import './styles.css';

interface PercentageDisplayProps {
  value: number;
}

export default function PercentageDisplay({ value }: PercentageDisplayProps) {
  const parsedValue = (value * 10).toFixed(0) + '%';

  return (
    <div className="percentage-display">
      <div className="percentage-display__inner">{parsedValue}</div>
    </div>
  );
}
