export default function DateDisplay({
  dateFrom,
  dateTo,
}: {
  dateFrom: Date;
  dateTo: Date;
}) {
  if (dateFrom.getUTCFullYear() === dateTo.getUTCFullYear()) {
    return <>{dateFrom.getUTCFullYear()}</>;
  } else {
    return (
      <>
        {dateFrom.getUTCFullYear()}-{dateTo.getUTCFullYear()}
      </>
    );
  }
}
