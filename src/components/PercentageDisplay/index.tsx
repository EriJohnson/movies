import './styles.css';

interface PercentageDisplayProps {
  value: string;
}

export default function PercentageDisplay({ value }: PercentageDisplayProps) {
  return (
    <div className="percentage-display">
      <div className="percentage-display__inner">{value}</div>
    </div>
  );
}
