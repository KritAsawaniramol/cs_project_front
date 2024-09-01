import React from "react";
import dayjs from "dayjs";

export default function Info(props) {
  const { data } = props;
  const startDate = dayjs(data?.start_date).format("DD/MM/YYYY");
  const endDate = dayjs(data?.end_date).format("DD/MM/YYYY");
  return (
    <>
      <h2 style={{ paddingRight: `0.5rem` }}>Tournament Info:</h2>
      <div>
        {" "}
        <span>{"Name: " + data?.name}</span>
        <div>{"Status: " + data?.status}</div>
        <span>
          {startDate && endDate !== ""
            ? "Date: " + startDate + " - " + endDate
            : "Date: -"}
        </span>
        <div>
          {data?.address.house_number &&
          data?.address.village &&
          data?.address.district &&
          data?.address.subdistrict &&
          data?.address.postal_code &&
          data?.address.country === ""
            ? "Address: -"
            : "Address: " +
              data?.address.house_number +
              " " +
              data?.address.village +
              " " +
              data?.address.district +
              " " +
              data?.address.subdistrict +
              " " +
              data?.address.postal_code +
              " " +
              data?.address.country}
        </div>
        <span>{data?.sport === "" ? "Sport: -" : "Sport: " + data?.sport}</span>
        <div>{data?.sex !== "" ? "Gender: " + data?.sex : "Gender: -"}</div>
        <span>
          {data?.age_over && data?.age_under !== 0
            ? "Age: " + data?.age_over + " - " + data?.age_under + " years old"
            : "Age: -"}
        </span>
        <div>
          {data?.application_type !== ""
            ? "Application type: " + data?.application_type
            : "Application type: -"}
        </div>
        <span>{data?.type !== "" ? "Type: " + data?.type : "Type: -"}</span>
        <div>
          {data?.organizer_info.name !== ""
            ? "Organizer: " + data?.organizer_info.name
            : "Organizer: -"}
        </div>
      </div>
    </>
  );
}
