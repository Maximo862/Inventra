import { useContext, useMemo } from "react"
import { ProductContext } from "../context/ProductsContext"
import dayjs from "dayjs";

export function useProductsAlert() {
  const {products} = useContext(ProductContext)!
  
   
  const alerts = useMemo(() => {
    const lowerStockProducts = products.filter(
      (p) => p.alert_threshold && p.stock <= p.alert_threshold!
    );

    const expiringSoon = products.filter(
      (p) =>
        p.expiration_date &&
        dayjs(p.expiration_date).diff(dayjs(), "day") <= 5 &&
        dayjs(p.expiration_date).isAfter(dayjs(), "day")
    );

    const expired = products.filter(
      (p) => p.expiration_date && dayjs(p.expiration_date).isBefore(dayjs(), "day")
    );

    return {
      lowerStockProducts,
      expiringSoon,
      expired,
    };
  }, [products]);
  
    return alerts
}

