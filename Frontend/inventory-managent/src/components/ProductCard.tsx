import dayjs from "dayjs";

interface Props {
  name: string;
  features?: React.ReactNode;
  onDelete: () => Promise<void>;
  onEdit: () => Promise<void>;
  disabled: boolean;
  expiration_date?: string;
  alert_threshold?: number;
  stock?: number;
}

export function ProductCard({
  name,
  features,
  onDelete,
  onEdit,
  disabled,
  expiration_date,
  alert_threshold,
  stock,
}: Props) {
  const isExpired = expiration_date
    ? dayjs(expiration_date).isBefore(dayjs(), "day")
    : false;

  const isExpiringSoon = expiration_date
    ? dayjs(expiration_date).diff(dayjs(), "day") <= 5
    : false;

  const isLowerStock =
    alert_threshold && stock ? stock <= alert_threshold : false;
  console.log(stock, alert_threshold);
  return (
    <div>
      <h4>{name}</h4>
      {expiration_date && (
        <p
          style={{
            color: isExpired ? "red" : isExpiringSoon ? "orange" : "green",
            fontWeight: isExpired || isExpiringSoon ? "bold" : "normal",
          }}
        >
          {isExpired
            ? `⚠️ Vencido (${dayjs(expiration_date).format("DD/MM/YYYY")})`
            : isExpiringSoon
            ? `⚠️ Vence pronto (${dayjs(expiration_date).format("DD/MM/YYYY")})`
            : `Vence el ${dayjs(expiration_date).format("DD/MM/YYYY")}`}
        </p>
      )}
      {isLowerStock ? (
        <p style={{ color: "orange", fontWeight: "bold" }}>
          ⚠️ Bajo stock (mínimo permitido: {alert_threshold})
        </p>
      ) : stock ? (
        <p style={{ color: "green", fontWeight: "bold" }}>
          Stock (mínimo permitido: {alert_threshold})
        </p>
      ) : (
        ""
      )}
      {features}
      <button onClick={onDelete} disabled={disabled}>
        Eliminar
      </button>
      <button onClick={onEdit} disabled={disabled}>
        Editar
      </button>
    </div>
  );
}
