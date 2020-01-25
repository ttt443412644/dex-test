import React from "react";
import { Link } from "react-router-dom";
import { IColumn } from "../../component/table/TablePanel";
import { link } from "../../util/Constant";
import AskDialog from "../../component/dialog/AskDialog";
import { deleteProduct } from "../productsSlice";
import { deleteProperties } from "../propertiesSlice";

//список полей шапки
export function productsColumns(dispatch: any): IColumn[] {
  return [
    {
      id: "name",
      label: "Перечень товаров",
      minWidth: 100,
      canSort: true,
      resultElement: (value?: any, href?: any) => {
        return <Link to={link.product + "/" + href!}>{value}</Link>;
      }
    },
    {
      id: "price",
      label: "Стоимость",
      minWidth: 100,
      canSort: true,
      format: (value: number) =>
        value
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1 ")
          .replace(".00", "") + " $"
    },
    {
      id: "price_dt",
      label: "Дата изменения",
      minWidth: 110,
      canSort: true,
      format: (value: number) => {
        const date = new Date(value);
        return new Intl.DateTimeFormat("ru-RU", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit"
        }).format(date);
      }
    },
    {
      id: "action",
      label: "Управление",
      minWidth: 100,
      align: "right",
      titleAlign: "left",
      canSort: false,
      isRule: true,
      resultElement: (_: any, href?: any) => {
        const deleteHandle = () => {
          href && dispatch(deleteProduct(href as number));
        };

        return (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Link to={link.productEdit + "/" + href!}>{"Ред."}</Link>

            <AskDialog
              title="Удалить"
              content="Вы действительно хотите удалить товар?"
              handle={deleteHandle}
            />
          </div>
        );
      }
    }
  ];
}

export function propertiesColumns(dispatch: any): IColumn[] {
  return [
    {
      id: "name",
      label: "Перечень проперти",
      minWidth: 100,
      canSort: true
    },
    {
      id: "type",
      label: "Тип",
      minWidth: 100,
      canSort: true
    },
    {
      id: "action",
      label: "Управление",
      minWidth: 100,
      align: "right",
      titleAlign: "left",
      canSort: false,
      isRule: true,

      resultElement: (_: any, href?: any) => {
        const deleteHandle = () => {
          href && dispatch(deleteProperties(href as number));
        };

        return (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <AskDialog
              title="Удалить"
              content="Вы действительно хотите удалить проперти?"
              handle={deleteHandle}
            />
          </div>
        );
      }
    }
  ];
}
