import './styles.css';

interface PercentageDisplayProps {
  value: number;
}

export default function PercentageDisplay({ value }: PercentageDisplayProps) {
  const percentVote = value * 10 + '%';

  return (
    <div className="percentage-display">
      <div className="percentage-display__inner">{percentVote}</div>
    </div>
  );
}
