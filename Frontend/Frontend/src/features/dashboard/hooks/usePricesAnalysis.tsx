import { useMemo } from "react";
import { Order } from "../../../types/types";
import dayjs from "dayjs";

interface UsePricesAnalysisParams {
  entries: Order[];
  exits: Order[];
}

export function usePricesAnalysis({
  entries,
  exits,
}: UsePricesAnalysisParams) {
  
  const entriesPrices = useMemo(() => {
    return entries.reduce((acc, order) => {
      return acc + (Number(order.total) || 0);
    }, 0);
  }, [entries]);

  const exitsPrices = useMemo(() => {
    return exits.reduce((acc, order) => {
      return acc + (Number(order.total) || 0);
    }, 0);
  }, [exits]);

  const totalProfit = useMemo(
    () => exitsPrices - entriesPrices,
    [exitsPrices, entriesPrices]
  );

  const dataByMonth = useMemo(() => {
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
    ];

    return months.map((month, index) => {
      const monthEntries = entries.filter(
        (o) => dayjs(o.created_at).month() === index
      );
      const monthExits = exits.filter(
        (o) => dayjs(o.created_at).month() === index
      );

      const entriesPricesMonth = monthEntries.reduce((acc, order) => {
        return acc + (Number(order.total) || 0);
      }, 0);

      const exitsPricesMonth = monthExits.reduce((acc, order) => {
        return acc + (Number(order.total) || 0);
      }, 0);

      return {
        name: month,
        entries: monthEntries.length,
        exits: monthExits.length,
        pricesEntries: entriesPricesMonth,
        pricesExits: exitsPricesMonth,
        profit: exitsPricesMonth - entriesPricesMonth,
      };
    });
  }, [entries, exits]);

  const currentMonthProfit = useMemo(
    () => dataByMonth[dayjs().month()].profit,
    [dataByMonth]
  );

  return {
    entriesPrices,
    exitsPrices,
    totalProfit,
    dataByMonth,
    currentMonthProfit,
  };
}