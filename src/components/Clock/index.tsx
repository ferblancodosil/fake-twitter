type Props = {
  date: string;
};

export const Clock = ({ date, ...props }: Props) => {
  const currDate = new Date();
  const clockDate = new Date(date);
  const diff = clockDate.getTime() - currDate.getTime();
  const hours = Math.floor(diff / (60 * 60 * 1000)) * -1;
  const mins = Math.floor(diff / (60 * 60 * 60 * 1000)) * -1;
  return (
    <span>{hours < 2 ? mins + 'm' : hours < 24 ? hours + 'h' : clockDate.toLocaleString()}</span>
  );
};
