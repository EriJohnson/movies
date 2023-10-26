import './styles.css';

interface VoteAverageDisplayProps {
  value: number;
}

export default function VoteAverageDisplay({ value }: VoteAverageDisplayProps) {
  const parsedValue = (value * 10).toFixed(0) + '%';

  return (
    <div className="percentage-display">
      <div className="percentage-display__inner">{parsedValue}</div>
    </div>
  );
}
